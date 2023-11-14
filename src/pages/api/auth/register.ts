import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


// export default async function register(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password, organisation_name, activity, writer_name } = req.body;

//     // Use Supabase Auth to sign up a new user
//     const { data, error: signUpError } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (signUpError) {
//       return res.status(400).json({ error: signUpError.message });
//     }

//     if (!data.user) {
//       return res.status(400).json({ error: 'User was not created.' });
//     }

//     // After successful signup, update the additional fields in the 'users' table
//     const { data: updateData, error: updateError } = await supabase
//       .from('users')
//       .update({ organisation_name, activity, writer_name })
//       .eq('id', data.user.id);

//     if (updateError) {
//       return res.status(400).json({ error: updateError.message });
//     }

//     return res.status(201).json(updateData);
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }



export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, organisation_name, activity, writer_name } = req.body;

    // Check if the user already exists
    const { data: userExists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert the new user into the database
    const { data, error } = await supabase.from('users').insert([
        {
          email,
          hashed_password: hashedPassword,
          organisation_name,
          activity,
          writer_name,
        },
      ]);
      if (error) {
        throw error;
      }
    
      if (!data) {
        // Handle the case where data is null
        return res.status(500).json({ message: 'Failed to create user.' });
      }
    
      // Continue with your logic, now that you've ensured data is not null
      return res.status(201).json({ user: data[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
