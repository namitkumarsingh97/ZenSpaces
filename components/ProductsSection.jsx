'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { Ratings } from '../app/assets/Ratings';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useState } from 'react';
import Image from 'next/image';
import { PopUp } from '../app/assets/PopUpButton'; // Ensure you import the PopUp component

const CONTENTS = [
  {
    img: '/bracelet.png',
    name: 'Feng-Shui Bracelet',
    price: '₹ 2,500',
    description:
      'Very Good Product.The structured shoulders and sleek detailing',
    category: 'Vaastu',
  },
  {
    img: '/gemstone.png',
    name: 'Gem Stone',
    price: '₹ 2,300',
    description:
      'Very Good Product.The structured shoulders and sleek detailing',
    category: 'Astrology',
  },
  {
    img: '/mala.png',
    name: 'Rudraksh Mala',
    price: '₹ 1,240',
    description:
      'Very Good Product.The structured shoulders and sleek detailing',
    category: 'Pooja',
  },
  {
    img: '/lalkitab.png',
    name: 'Lal Kitab',
    price: '₹ 5,240',
    description:
      'Very Good Product.The structured shoulders and sleek detailing',
    category: 'Vaastu',
  },
];

export function ProductListCard({
  img,
  name,
  price,
  description,
  category,
  handleOpen,
}) {
  const [like, setLike] = useState(false);
  const handleLike = () => setLike(!like);

  return (
    <Card shadow={false} className="border border-gray-300 bg-[#CCE3DE">
      {/* <CardHeader className="w-[30%] absolute mb-2 hover:scale-105 transform duration-300 right-0 border hover:bg-white hover:border-black top-10 rounded">
        <Typography className="font-mulish text-center cursor-pointer border-[#AF8C3E] transform duration-300 text-white hover:text-black hover:bg-white bg-[#AF8C3E] text-sm p-1"></Typography>
      </CardHeader> */}
      <CardBody className="pb-0">
        <div className="flex items-center pt-16 justify-center h-[25vh]">
          <img
            src={img}
            alt={img}
            className="w-[140px] hover:scale-110 transform translate duration-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" className="text-gray-600 font-mulish">
            {price}
          </Typography>
          <div className="flex justify-center items-center">
            <Typography
              color="blue-gray"
              className="font-mulish mt-10"
              variant="h5"
            >
              {name}
            </Typography>
          </div>

          {/* <Ratings/> */}
          <Typography className="text-[#2C3E50] font-mulish mb-4">
            {description}
          </Typography>
        </div>
        <CardFooter>
          <Button
            onClick={() => handleOpen(name, category)}
            className="font-mulish w-full rounded-sm bg-[#70A9A1] border border-white hover:scale-110 transform transition duration-500 capitalize font-medium text-sm text-[#2C3E50] hover:rounded-none"
          >
            ADD TO BAG
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

export function ProductsSection() {
  return (
    <div className="w-full bg-cover flex justify-center relative">
      <section className="w-full 2xl:py-20 py-10 mx-auto lg:max-w-[80%] max-w-[90%]">
        <div className="mx-auto text-center 2xl:mb-10 mb-5">
          <Typography className="font-manrope text-[#6C7A89] md:text-2xl text-lg">
            LATEST COLLECTION
          </Typography>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-4 md:grid-cols-2">
            {CONTENTS.map(
              ({ img, name, price, description, category }, index) => (
                <ProductListCard
                  key={index}
                  img={img}
                  name={name}
                  price={price}
                  description={description}
                  category={category}
                />
              ),
            )}
          </div>
        </div>
        <div className="flex 2xl:mt-10 mt-5 justify-center">
          <Button
            onClick={() => router('/products')} // Ensure you import useRouter from 'next/navigation'
            className="font-mulish rounded-sm bg-[#70A9A1] border-dotted border border-white hover:scale-110 transform transition duration-500 capitalize font-medium text-sm text-[#2C3E50] hover:rounded-none lg:max-w-[20%] w-[80%]"
          >
            EXPLORE MORE
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ProductsSection;
