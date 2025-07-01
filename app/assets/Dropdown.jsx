import { Option, Select } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const Dropdown = ({ onStatusChange }) => {
  return (
    <div>
      <Select
        label="Status"
        color="black"
        onChange={(value) => onStatusChange(value)}
      >
        <Option value="">All</Option>
        <Option value="upcoming">Upcoming</Option>
        <Option value="past">Past</Option>
        <Option value="ongoing">Ongoing</Option>
      </Select>
    </div>
  );
};

const Dropdown1 = () => {
  return (
    <div>
      <Select label="Duration" color="black">
        <Option>30 Min</Option>
        <Option>45 Min</Option>
        <Option>60 Min</Option>
      </Select>
    </div>
  );
};

const Dropdown2 = () => {
  return (
    <div>
      <Select label="Course Type" color="black">
        <Option>Live Course</Option>
        <Option>Video Course</Option>
      </Select>
    </div>
  );
};

const Dropdown3 = ({ onChange, value }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/view-courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Select
        label="Select Course"
        color="black"
        value={value}
        onChange={(e) => onChange(e)}
      >
        {courses.map((course) => (
          <Option key={course._id} value={course.name}>
            {course.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

const Dropdown4 = ({ onChange, value }) => {
  return (
    <div>
      <Select
        label="Select Instructor"
        color="black"
        value={value}
        onChange={(e) => onChange(e)}
      >
        <Option value="Raman Singh">Raman Singh</Option>
      </Select>
    </div>
  );
};

const Dropdown5 = ({ onChange, value }) => {
  return (
    <div>
      <Select
        label="Select Duration Type"
        color="black"
        value={value}
        onChange={(e) => onChange(e)}
      >
        <Option value="Week">Week</Option>
        <Option value="Month">month</Option>
        <Option value="Year">year</Option>
      </Select>
    </div>
  );
};

export { Dropdown, Dropdown1, Dropdown2, Dropdown3, Dropdown4, Dropdown5 };
