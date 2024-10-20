'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImage =[
    {Imgrul:'../../assets/images/hero-1.svg',alt:'smartwatch'},
    {Imgrul:'../../assets/images/hero-2.svg',alt:'bag'},
    {Imgrul:'../../assets/images/hero-3.svg',alt:'lamp'},
    {Imgrul:'../../assets/images/hero-4.svg',alt:'air frayer'},
    {Imgrul:'../../assets/images/hero-5.svg',alt:'chair'},
]
function HeroCarousel() {
  return (
      
<div className='hero-carousel  dark:bg-darkTheme'>
    <Carousel
      showThumbs={false}
      // autoPlay
      infiniteLoop
      interval={2000}
      showArrows={false}
      showStatus={false}
      >
       {heroImage.map(images=>(
        <Image
         src={images.Imgrul}
         alt={images.alt}
         width={484}
         height={484}
         key={images.alt}
         
        />
       ))}
    </Carousel>
    <Image
      src={"../../assets/icons/hand-drawn-arrow.svg"}
      alt={"hand drawn arrow"}
      width={175}
      height={175}
      className='max-xl:hidden absolute -left-[15%] bottom-0'
     />

</div> 
  )
}

export default HeroCarousel