import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { title } = req.body;
      console.log(title);
      
      // Validate input
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Create post with Prisma
      const newPost = await prisma.post.create({
        data: { title }
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error('Post creation error:', error);
      res.status(500).json({ error: 'Unable to create post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}