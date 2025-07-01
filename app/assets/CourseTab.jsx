"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaGraduationCap, FaPhone, FaVideo } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import Overview from "./Overview";
import Content from "./Content";
import Instructor from "./Instructor";
import Help from "./Help";

export function CourseTab({ overview, syllabus, instructor }) {
  const data = [
    {
      icon: <FaVideo size={20} />,
      label: "Overview",
      value: "overview",
      desc: <Overview overview={overview} />,
    },
    {
      icon: <IoBook size={20} />,
      label: "Content",
      value: "content",
      desc: <Content syllabus={syllabus} />,
    },
    {
      icon: <FaGraduationCap size={20} />,
      label: "Instructor",
      value: "instructor",
      desc: <Instructor instructor={instructor} />,
    },

    {
      icon: <FaPhone size={20} />,
      label: "Help",
      value: "help",
      desc: <Help />,
    },
  ];

  return (
    <div className="z-10">
      <Tabs id="custom-animation" value="overview">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab
              className="font-jost text-black font-medium"
              key={value}
              value={value}
            >
              <div className="flex items-center gap-2">
                <div className="hidden md:block">{icon}</div>
                <div>{label}</div>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
