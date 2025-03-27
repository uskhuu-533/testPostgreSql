"use client";


import { Category } from "@prisma/client";
import axios from "axios";

import { useEffect, useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category[]>([]);

  const getCategory = async () => {
    try {
      const response = await axios.get("/api/category");  // This should be a GET request
      console.log("Post Created:", response.data);
      setCategory(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const addCategory = async () => {
    try {
      const res = await axios.post('api/category', {title:title})
      console.log(res);
      getCategory()
      setTitle('')
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addCategory}>add category</button>
      {category.map((category, index)=>(
        <div key={index}>{category.title}</div>
      ))}
    </div>
  );
}
