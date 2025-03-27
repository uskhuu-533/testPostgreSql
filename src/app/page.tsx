'use client';

import axios from 'axios';
import { useState } from 'react';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // IMPORTANT: Correct API route path
      const response = await axios.post('/api', { 
        title 
      });
      console.log(response.data);
    } catch (error) {
      // Detailed error logging
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      console.error('Full error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />
      <button type="submit">Create Post</button>
    </form>
  );
}