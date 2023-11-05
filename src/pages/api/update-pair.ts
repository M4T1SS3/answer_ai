import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const hfToken = process.env.NEXT_PUBLIC_HF_TOKEN!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const hf = new HfInference(hfToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id, question, answer } = req.body;

      // Encode the question using Hugging Face's feature extraction model
    //   const output = await hf.featureExtraction({
    //     model: 'sentence-transformers/all-mpnet-base-v2',
    //     inputs: question,
    //   });

    //   // Check if the output contains the expected data
    //   if (!output || !Array.isArray(output) || output.length === 0) {
    //     throw new Error('Invalid embedding output from Hugging Face.');
    //   }

    //   const embedding = output; // Assuming the embedding is the first element

      // Update the question-answer pair along with the embedding into Supabase
      const { data, error } = await supabase
        .from('knowledge_base')
        .update({ question, answer })
        .match({ id }); // This targets the record with the given id

      if (error) {
        console.error('Error updating pair:', error);
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error in /update-pair:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
