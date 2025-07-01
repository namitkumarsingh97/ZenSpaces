import { Typography } from '@material-tailwind/react'
import React from 'react'

const Help = () => {
  return (
    <div>
       <div className='mt-10 flex flex-col min-h-[80vh] gap-10 text-black'>
        <div className='flex flex-col gap-3'>
            <Typography className='font-jost 2xl:text-3xl text-2xl font-medium'>For more details about the course</Typography>
            <Typography className='font-jost 2xl:text-xl text-base font-normal'>If you have any question regarding the course and couldn&apos;t find the answer on this page, feel free to contact us</Typography>
            <Typography className='font-ibarra text-4xl 2xl:text-6xl font-medium'>+91 9810800988</Typography>
        </div>
        </div>
    </div>
  )
}

export default Help
