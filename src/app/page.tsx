'use client'

import axios from "axios";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");

  const handlePost = async () => {
    try {
      const response = await axios.post("/api/post", { title });
      console.log("Post Created:", response.data);
      alert("Post added!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add post");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handlePost}>Create Post</button>
    </div>
  );
}
