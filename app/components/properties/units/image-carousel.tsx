import React, { Component } from 'react';
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ImageCarousel({ images }: { images: string[]}) {
    return (
        <Carousel>
            {images.map((image, index) => {
                return (
                    <div key={index}>
                        <Image 
                            src={`${image}`} 
                            alt='image'
                            width={500}
                            height={500}
                            style={{ objectFit: 'cover' }}
                        />
                        <p className="legend">Image {index}</p>
                    </div>
                )
            })}
        </Carousel>
    );
}