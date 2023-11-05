import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function getKnowledgeBase(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
      .from('knowledge_base')
      .select('*');

  if (error) {
      console.error('Error fetching knowledge base:', error);
      return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}
