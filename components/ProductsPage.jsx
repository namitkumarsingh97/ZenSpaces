"use client";

import { Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { ProductListCard } from './ProductsSection';
import { PopUp } from '../app/assets/PopUpButton';


const rudrakshaImages = {
  '1 Mukhi': '/Picture20.png',
  '2 Mukhi': '/Picture2.png',
  '3 Mukhi': '/Picture3.png',
  '4 Mukhi': '/Picture4.png',
  '5 Mukhi': '/Picture5.png',
  '6 Mukhi': '/Picture6.png',
  '7 Mukhi': '/Picture7.png',
  '8 Mukhi': '/Picture8.png',
  '9 Mukhi': '/Picture9.png',
  '10 Mukhi': '/Picture10.png',
  '11 Mukhi': '/Picture11.png',
  '12 Mukhi': '/Picture12.png',
  '13 Mukhi': '/Picture13.png',
  '14 Mukhi': '/Picture14.png',
  'Ganesh Mukhi': '/Picture15.png',
  'Gauri Shankar': '/Picture16.png',
  'Garab grah': '/Picture17.png',
  '21 Mukhi': '/Picture38.png',
  'Rudraksha Mala': '/Picture21.png',
};

const brassVastuImages = {
  'Swastik': '/Picture22.png',
  'Deer': '/Picture23.png',
  'Eagle': '/Picture24.png',
  'Kuber': '/Picture25.png',
  'Owl': '/Picture26.png',
  'Black and white rabbit': '/Picture27.png',
  'Swan Pair': '/Picture28.png',
  'Brass sun': '/Picture29.png',
  'Springs pair of 3 each colour': '/Picture30.png',
  'Brass tortoise': '/Picture31.png',
  'Pair of white Horses': '/Picture32.png',
  'Pair of 12 Red Horses': '/Picture33.png',
  'Kaam denu Gaye': '/Picture34.png',
  'Krishan Arjun Geeta Gyan Photo Frame': '/Picture35.png',
  'Dhanvantri Ji Photo Frame': '/Picture36.png',
  'Plastic Pyramid': '/Picture37.png',
};

const vastuStripImages = {
  '8 ft X 1" Aluminum Strip': '/Picture39.png',
  '8 ft X 1" Stainless Strip': '/Picture40.png',
  '8 ft X 1" Copper Strip': '/Picture41.png',
  '8 ft X 1" Brass Strip': '/Picture42.png',
  '8 ft X .5" Iron Strip': '/Picture43.png',
  '8 ft X 3" Vinyl Each Colour': '/Picture44.png',
  '7 White Horses Photo Frame': '/Picture45.png',
};

const gemstoneImages = {
  'gemstone1': '/Picture46.png',
 
  // Add more gemstones as needed
};

const ProductsPage = () => {
  // State for PopUp management
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');

  // Define product items
  const rudrakshaItems = Object.keys(rudrakshaImages);
  const brassVastuItems = Object.keys(brassVastuImages);
  const vastuStrips = Object.keys(vastuStripImages);
  const gemstones = Object.keys(gemstoneImages);

  const handleOpen = (name, category) => {
    setProductName(name);
    setProductCategory(category);
    setOpen(true);
  };

  return (
    <div className='w-full'>
    {/* Hero Section */}
    <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
            <Typography className="font-ibarra xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
              Products
            </Typography>
          </div>
  
    {/* Main Content Section */}
    <div className='w-full max-w-[90%] mx-auto py-16 md:py-20'>
      {/* Rudraksha Section */}
      <Typography className='text-2xl md:text-3xl font-bold text-center mb-6'>Rudraksha</Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {rudrakshaItems.map((item) => (
          <ProductListCard
            key={item}
            img={rudrakshaImages[item]}
            name={item}
            price={''}
            description={''}
            // category={'Rudraksha'}
            handleOpen={handleOpen}
          />
        ))}
      </div>
  
      {/* Brass Vastu Items Section */}
      <Typography className='text-2xl md:text-3xl font-bold text-center mt-12 mb-6'>Brass Vastu Items</Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {brassVastuItems.map((item) => (
          <ProductListCard
            key={item}
            img={brassVastuImages[item]}
            name={item}
            price={''} 
            description={''}
            // category={'Brass Vastu'}
            handleOpen={handleOpen} 
          />
        ))}
      </div>
  
      {/* Vastu Strips Section */}
      <Typography className='text-2xl md:text-3xl font-bold text-center mt-12 mb-6'>Vastu</Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {vastuStrips.map((item) => (
          <ProductListCard
            key={item}
            img={vastuStripImages[item]}
            name={item}
            price={''}
            description={''}
            // category={'Vastu Strips'}
            handleOpen={handleOpen} 
          />
        ))}
      </div>
  
      {/* Gemstones Section */}
      <Typography className='text-2xl md:text-3xl font-bold text-center mt-12 mb-6'>Gemstones</Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {gemstones.map((item) => (
          <ProductListCard
            key={item}
            img={gemstoneImages[item]}
            name={item}
            price={''}
            description={''}
            // category={'Gemstones'}
            handleOpen={handleOpen} 
          />
        ))}
      </div>
  
      {/* Inquiry Message */}
      <Typography className='text-lg font-semibold text-center mt-12 mb-4'>
        For enquiry please call: <span className='text-[#AF8C3E]'>9810800988</span>
      </Typography>
  
      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <Button className='font-jost rounded-lg bg-[#AF8C3E] text-white hover:bg-[#8B6B2C] transition duration-300 transform hover:scale-105'>
          Load More
        </Button>
      </div>
    </div>
  
    {/* PopUp Component */}
    <PopUp
      productName={productName}
      productCategory={productCategory}
      open={open}
      setOpen={setOpen}
    />
  </div>
  );
}

export default ProductsPage;
