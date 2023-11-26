import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the shape of the request body for enhancement
interface EnhanceRequest {
  question: string;
  answer: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { question, answer }: EnhanceRequest = req.body;

      // Fetch user context from Supabase
      const { data: userData, error } = await supabase
        .from('users')
        .select('organisation_name, activity, writer_name')
        .eq('id', 5) // Assuming you want to fetch the context for a specific user ID
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

      // Enhance the answer using the provided question, answer, and context
      const enhancedAnswer = await enhanceAnswer(question, answer, context);

      res.status(200).send(enhancedAnswer);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    // If the request method is not POST, send a 405 Method Not Allowed status
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Enhance the answer using the provided question, answer, and context
async function enhanceAnswer(question: string, answer: string, context: any): Promise<string> {
    // Initialize LangChain components
    const llm = new ChatOpenAI({
      temperature: 0,
      openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI,
      modelName: "gpt-3.5-turbo-16k-0613"
    });
    const promptTemplate = new PromptTemplate({
      template: `
        You are helping answering customer messages at {organisation_name}, specializing in {activity}.
        Answer in the language of the question.
        Answer friendly. Make sure to be concise.

        Customer's question: "{question}"
        My initial response was: "{initialAnswer}"
        
        Please follow the content of my response answer with an enhanced version of the initial response.
      `,
      inputVariables: ['question', 'initialAnswer', 'organisation_name', 'activity'],
    });
  
    // Prepare the inputs for the chain
    const chainInputs = {
      question: question,
      initialAnswer: answer,
      organisation_name: context.organisation_name,
      activity: context.activity,
    };
  
    const llmChain = new LLMChain({
      llm: llm,
      prompt: promptTemplate
    });
  
    // Generate the enhanced answer
    let response = await llmChain.predict(chainInputs);
  
  
    return response;
  }
  
  // Function to clean the response string
  function cleanString(text: string) {
    // Remove backslashes followed by quotes, and quotes followed by backslashes
  let cleanedText = text.replace(/\\+"/g, '"').replace(/"+\\/g, '"');
  // Remove any remaining backslashes
  cleanedText = cleanedText.replace(/\\/g, '');
  // Trim for any leading/trailing whitespace
  cleanedText = cleanedText.trim();
  return cleanedText;
  }
  