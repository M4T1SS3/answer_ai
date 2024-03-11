import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { data } from 'autoprefixer';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Hugging Face Inference API client
const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

// Define the shape of the request body for asking questions
interface AskRequest {
  query: string;
}

// Define the shape of the response for similar questions
interface SimilarQuestion {
  id?: number;
  question: string;
  answer: string;
}

interface SimilarityResult {
  score: number;
  index: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { query }: AskRequest = req.body;
     
      const similarQuestions = await findSimilarQuestions(query, hf);
      const response = await generateResponse(query, similarQuestions);
     
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    // If the request method is not POST, send a 405 Method Not Allowed status
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function findSimilarQuestions(query: string, hf: HfInference, topK: number = 3): Promise<SimilarQuestion[]> {
  // Fetch all questions from Supabase
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('id, question, answer');

  if (error) {
    throw new Error('Failed to fetch questions from Supabase');
  }

  // Extract just the questions for similarity comparison
  const questions = data.map(item => item.question);

  // Use Hugging Face's sentence similarity model
  const similarityScores: number[] = await hf.sentenceSimilarity({
    model: 'sentence-transformers/paraphrase-xlm-r-multilingual-v1',
    inputs: {
      source_sentence: query,
      sentences: questions,
    },
  }) as unknown as number[]; // Assuming the response is an array of scores

  // Find the indices of the top K scores
  const topKIndices = similarityScores
    .map((score, index) => ({ score, index })) // Create objects with score and index
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, topK) // Take top K
    .map(item => item.index); // Extract the indices

  // Map the top K indices back to the original questions and answers
  const topKResults = topKIndices.map(index => data[index]);

  return topKResults;
}

async function generateResponse(query: string, similarQuestions: SimilarQuestion[]): Promise<string> {
  // Fetch user context from Supabase
  const { data: userData, error } = await supabase
    .from('users')
    .select('organisation_name, activity, writer_name')
    .eq('id', 5)
    .single();
  if (error) {
    throw new Error('Failed to fetch user context from Supabase');
  }
  // Assuming userData is not null and contains the required fields
  const context = {
    organisation_name: userData.organisation_name,
    activity: userData.activity,
    writer_name: userData.writer_name,
  };

  // Initialize LangChain components
  const llm = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI,
    modelName: "gpt-3.5-turbo-16k-0613"
  });

  const promptTemplate = new PromptTemplate({
    template: `
      You are representing and helping {writer_name} at {organisation_name}, a company specializing in {activity}, to answer customer messages.
      Answer in the language of the question.
      Answer friendly, clear and short.
      Make sure to be concise.
      Use informal & personal language.
      Aim to help, not to sell.
      Below is a message I received from a customer:
      {message}
      
      Here are some of the ways we've previously responded:
      {best_practice}
    `,
    inputVariables: ['message', 'best_practice', 'organisation_name', 'activity', 'writer_name'],
  });

  // Prepare the inputs for the chain
  const chainInputs = {
    message: query,
    best_practice: similarQuestions.map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n'),
    organisation_name: context.organisation_name,
    activity: context.activity,
    writer_name: context.writer_name,
  };

  const llmChain = new LLMChain({
    llm: llm,
    prompt: promptTemplate
  });
  
  const response = await llmChain.predict(chainInputs);
  // Assuming the response is a string, otherwise you may need to process it to get a string
  return response;
}