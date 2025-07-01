'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { notify } from './Toastify';
import { BASE_URL } from '@/utils/apiClient';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextsEditor = ({
  courseId,
  isEditing,
  onComplete,
  placeholder,
  prefilledData,
}) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [zoomMeetings, setZoomMeetings] = useState([]);

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
      notify('Content cannot be empty.', 'info');
      return;
    }

    if (!courseId) {
      notify('Course ID is required for this action.', 'info');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isEditing
        ? `${BASE_URL}/api/edits/step3`
        : `${BASE_URL}/api/add-course/step3`;

      const payload = { courseId, syllabus: value };

      const response = isEditing
        ? await axios.put(endpoint, payload)
        : await axios.post(endpoint, payload);

      if (response.status === 200) {
        const successMessage = isEditing
          ? 'Syllabus updated successfully!'
          : 'Syllabus added successfully!';
        notify(successMessage, 'success');
        onComplete(successMessage);
      }

      fetchCourseData();
    } catch (error) {
      console.error('Failed to submit syllabus:', error);
      notify(
        error.response?.data?.error ||
          'Failed to save syllabus. Please try again.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true);

      const courseResponse = await axios.get(
        `${BASE_URL}/api/courses/${courseId}`,
      );

      const course = courseResponse.data.course;
      const enrollment = course && course._id === courseId ? course : null;

      if (!enrollment) {
        notify('Course not found!', 'warn');
        setLoading(false);
        return;
      }

      if (!course || course._id !== courseId) {
        notify('Course not found!', 'warn');
        setLoading(false);
        return;
      }

      if (course.courseType !== 'live') {
        notify('Zoom meetings can only be created for live courses.', 'info');
        setLoading(false);
        return;
      }

      const courseDuration = {
        years: enrollment.durationType === 'Year' ? enrollment.duration : 0,
        months:
          enrollment.durationType === 'Month'
            ? parseInt(enrollment.duration, 10)
            : 0,
        weeks: enrollment.durationType === 'Week' ? enrollment.duration : 0,
      };

      const selectedDays = enrollment.days
        ? JSON.parse(enrollment.days[0])
        : [];
      if (!selectedDays || selectedDays.length === 0) {
        notify('Selected days are missing!', 'warn');
        setLoading(false);
        return;
      }

      const start_date = enrollment.startDate;
      if (!start_date) {
        notify(
          'Start date or time range is missing for this enrollment.',
          'warn',
        );
        setLoading(false);
        return;
      }

      const payload = {
        courseId,
        courseDuration,
        selectedDays,
        start_date,
        meeting_duration: 60,
      };

      const missingFields = [];
      Object.entries(payload).forEach(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          missingFields.push(key);
        }
      });

      if (missingFields.length > 0) {
        notify(
          `The following fields are missing: ${missingFields.join(', ')}`,
          'warn',
        );
        setLoading(false);
        return;
      }

      try {
        const existingMeetingResponse = await axios.get(
          `${BASE_URL}/api/zoom/${courseId}`,
        );
        if (
          existingMeetingResponse.status === 200 &&
          existingMeetingResponse.data.meeting
        ) {
          setZoomMeetings(existingMeetingResponse.data.meeting);
          notify('Zoom meeting already exists for this course.', 'info');
          setLoading(false);
          return;
        }
      } catch (checkError) {
        if (checkError.response?.status !== 404) {
          console.error('Error checking existing meeting:', checkError);
          notify(
            checkError.response?.data?.error ||
              'Failed to check existing meeting details.',
            'error',
          );
          return;
        }
      }

      try {
        const response = await axios.post(`${BASE_URL}/api/zoom`, payload);

        if (response.status === 201) {
          setZoomMeetings(response.data.meeting);
          notify('Zoom meeting created successfully!', 'success');
        }
      } catch (createError) {
        console.error(
          'Error creating Zoom meeting:',
          createError.response?.data || createError.message,
        );
        notify(
          createError.response?.data?.error || 'Failed to create Zoom meeting.',
          'error',
        );
      }
    } catch (error) {
      console.error(
        'Error fetching course details:',
        error.response?.data || error.message,
      );
      notify(
        error.response?.data?.error || 'Failed to fetch course details.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  return (
    <div className="mt-5">
      <ReactQuill
        value={value}
        onChange={handleChange}
        theme="snow"
        placeholder={placeholder || 'Write something amazing...'}
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#AF8C3E]'
          }`}
        >
          {loading ? 'Saving...' : 'Save and Submit'}
        </button>
      </div>
    </div>
  );
};

export default TextsEditor;
