import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure that the method is DELETE
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { id } = req.body.id ? req.body : req.query;

    // Perform the delete operation
    const { data, error } = await supabase
        .from('knowledge_base')
        .delete()
        .match({ id }); // This targets the record with the given id

    if (error) {
        console.error('Error deleting the record:', error);
        return res.status(400).json({ error: error.message });
    }

    // Send back the response
    res.status(200).json({ message: 'Record deleted successfully', data });
}
