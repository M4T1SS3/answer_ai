import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';
import { unescape } from 'querystring';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Hugging Face Inference API client
const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

// Define the shape of the request body
interface QA_Pair {
  question: string;
  answer: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { question, answer }: QA_Pair = req.body;

      // Encode the question using Hugging Face's feature extraction model
      // const output = await hf.featureExtraction({
      //   model: 'sentence-transformers/all-mpnet-base-v2',
      //   inputs: question,
      // });

      // const embedding = output;

      // Insert the question-answer pair along with the embedding into Supabase
      const { data, error } = await supabase
      .from('knowledge_base')
      .insert([{ question, answer }])
      .select('id, question, answer')
      .single();
      if (error) {
        console.error('Error adding new pair:', error);
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json(data);
    } catch (error) {
      console.error('Error in /add-pair:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
