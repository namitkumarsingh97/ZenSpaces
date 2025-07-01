'use client';
import { notify } from './Toastify';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextEditor = ({ courseId, prefilledData, onComplete }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefilledData) {
      setValue(prefilledData);
    }
  }, [prefilledData]);

  const handleChange = (content) => {
    setValue(content);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      notify('Please write an overview before proceeding.', 'info');
      return;
    }

    setLoading(true);

    try {
      const endpoint = courseId
        ? `${BASE_URL}/api/edits/step2`
        : `${BASE_URL}/api/add-course/step2`;

      const payload = {
        courseId,
        overview: value,
      };

      const response = await axios.put(endpoint, payload);

      if (response.status === 200) {
        notify(
          courseId
            ? 'Overview updated successfully!'
            : 'Overview saved successfully!',
          'success',
        );
        onComplete();
      }
    } catch (error) {
      console.error('Failed to save overview:', error);
      notify('Failed to save the overview. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <ReactQuill
        value={value}
        onChange={handleChange}
        theme="snow"
        placeholder="Write something amazing..."
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#AF8C3E]'
          }`}
        >
          {loading ? 'Saving...' : 'Save and Proceed'}
        </button>
      </div>
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
