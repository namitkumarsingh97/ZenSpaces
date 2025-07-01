"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Ratings } from "../app/assets/Ratings";
import { FaRegHeart,FaHeart } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import { PopUp } from '../app/assets/PopUpButton'; // Ensure you import the PopUp component


const CONTENTS = [
  {
    img: "/bracelet.png",
    name: "Feng-Shui Bracelet",
    price: "₹ 2,500",
    description : "Very Good Product.The structured shoulders and sleek detailing",
    category : "Vaastu",
  },
  {
    img: "/gemstone.png",
    name: "Gem Stone",
    price: "₹ 2,300",
    description : "Very Good Product.The structured shoulders and sleek detailing",
    category : "Astrology",
  },
  {
    img: "/mala.png",
    name: "Rudraksh Mala",
    price: "₹ 1,240",
    description : "Very Good Product.The structured shoulders and sleek detailing",
    category : "Pooja",
  },
  {
    img: "/lalkitab.png",
    name: "Lal Kitab",
    price: "₹ 5,240",
    description : "Very Good Product.The structured shoulders and sleek detailing",
    category : "Vaastu",
  },
];

export function ProductListCard({
  img,
  name,
  price,
  description,
  category,
  handleOpen,
}) 

{
  const [like, setLike] = useState(false);
  const handleLike=()=>setLike(!like);
 
  return (
    <Card shadow={false} className="border border-gray-300">
      {/* <CardHeader className="w-[30%] absolute mb-2 hover:scale-105 transform duration-300 right-0 border hover:bg-white hover:border-black top-10 rounded">
        <Typography className="font-jost text-center cursor-pointer border-[#AF8C3E] transform duration-300 text-white hover:text-black hover:bg-white bg-[#AF8C3E] text-sm p-1"></Typography>
      </CardHeader> */}
      <CardBody className="pb-0">
        <div className="flex items-center pt-16 justify-center h-[25vh]">
        <img src={img} alt={img} className="w-[140px] hover:scale-110 transform translate duration-500" />
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            variant="h5"
            className="text-gray-600 font-jost"
          >
            {price}
          </Typography>
          <div className="flex justify-center items-center">
  <Typography color="blue-gray" className="font-jost mt-10" variant="h5">
    {name}
  </Typography>
</div>

          {/* <Ratings/> */}
          <Typography
            className="text-gray-400 font-jost mb-4"
          >
            {description}
          </Typography>
          {/* <div className="flex mb-4 items-center justify-center gap-5">
          <Button className="font-jost w-full border border-black hover:bg-white hover:text-black hover:scale-105 transform duration-300 max-w-[80%]">Add To Cart</Button>
          <div onClick={handleLike} className="cursor-pointer">
          {like === false? <FaRegHeart size={24} title="Add To Wishlist" className="hover:scale-125 transform duration-300 text-black" />: <FaHeart size={24} title="Remove From WishList" className="hover:scale-125 transform duration-300 text-black"/>}
          </div>
          </div> */}
        </div>
        <CardFooter>
        <Button
            onClick={() => handleOpen(name, category)} // Pass name and category to handleOpen
            className="font-jost w-full border border-black hover:bg-white hover:text-black hover:scale-105 transform duration-300"
          >
            I am interested
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}



export function ProductsSection() {
  return (
    <div className="w-full bg-cover flex justify-center relative">
      <section className="w-full 2xl:py-20 blur-sm py-10 mx-auto lg:max-w-[80%] max-w-[90%]">
      <div className="mx-auto text-center 2xl:mb-10 mb-5">
        <Typography className="font-ibarra text-[#AF8C3E] italic md:text-2xl text-lg">
          From Our Exclusive Collection
        </Typography>
        <Typography className="2xl:my-4 mt-2 font-ibarra text-4xl md:text-5xl 2xl:text-6xl">
          Exlpore Our Products
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4 md:grid-cols-2">
          {CONTENTS.map(({ img, name, price,description,category }, index) => (
            <ProductListCard
              key={index}
              img={img}
              name={name}
              price={price}
              description={description}
              category={category}
            />
          ))}
        </div>
      </div>
      <div className="flex 2xl:mt-10 mt-5 justify-center">
      <Button disabled className='font-jost rounded-sm bg-opacity-60 border-dotted border border-white hover:scale-110 hover:bg-opacity-100 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm hover:rounded-none lg:max-w-[20%] w-[80%]'>Explore More</Button>
      </div>
    </section>
    <Image src={"/coming.png"} height={800} width={800} className='absolute top-0' />
    </div>
  );
}

export default ProductsSection;