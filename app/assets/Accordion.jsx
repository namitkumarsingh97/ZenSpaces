import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function Accordion1() {
  const [open, setOpen] = React.useState(3);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
      <AccordionHeader className="text-white border-opacity-50 hover:text-[#AF8C3E] font-jost text-xl" onClick={() => handleOpen(3)}>What Is Astrology?</AccordionHeader>
        <AccordionBody className="text-white font-jost text-lg">
        Astrology is the study of the positions and movements of celestial bodies—such as planets and stars—and their influence on human affairs and natural phenomena. It involves interpreting these cosmic patterns to gain insights into personal traits, life events, and potential future trends.
        </AccordionBody>
      </Accordion>
      <Accordion  open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader className="text-white border-opacity-50 hover:text-[#AF8C3E] font-jost text-xl" onClick={() => handleOpen(1)}>What can Astrology do for me ?</AccordionHeader>
        <AccordionBody className="text-white font-jost text-lg">
        Astrology can help you understand your personality, strengths, and weaknesses, providing insights for personal growth. It aids in making informed decisions regarding career, relationships, and life choices. Astrology also helps identify favorable and challenging periods for important events, offering guidance on timing. Additionally, it can analyze relationship compatibility, giving insights into how well you might connect with others.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
      <AccordionHeader className="text-white border-opacity-50 hover:text-[#AF8C3E] font-jost text-xl" onClick={() => handleOpen(2)}>What is the purpose of astrology? Why do people use it or come to it?</AccordionHeader>
        <AccordionBody className="text-white font-jost text-lg">
          Astrology helps people understand their personality, gain guidance for decisions, identify favorable times, analyze relationship compatibility, and explore spiritual insights. It offers a framework for self-awareness and navigating life&apos;s complexities.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
      <AccordionHeader className="text-white border-opacity-50 hover:text-[#AF8C3E] font-jost text-xl" onClick={() => handleOpen(4)}>How do I choose an astrologer?</AccordionHeader>
        <AccordionBody className="text-white font-jost text-lg">
        To choose an astrologer, consider their credentials, experience, and specialization. Check their reputation through reviews and recommendations. Ensure their consultation style and communication align with your preferences and that they follow ethical practices.
        </AccordionBody>
      </Accordion>
    </>
  );
}