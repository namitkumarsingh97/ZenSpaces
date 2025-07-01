"use client"

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; 
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextEditor = () => {
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Text Editor</h2>
      <ReactQuill
        value={value}
        onChange={handleChange}
        theme="snow"
        placeholder="Write something amazing..."
      />
      <div className="mt-4">
        <h3 className="font-semibold">Preview:</h3>
        <div
          className="border p-4 mt-2 rounded bg-gray-100"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
