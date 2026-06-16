import React, { useState, useEffect } from 'react';

import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';

const images = [
    { src: img1, caption: 'I Learn' },
    { src: img2, caption: 'I Code' },
    { src: img3, caption: 'I Design' }
];

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(1);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[420px] w-full max-w-[700px] mx-auto flex justify-center items-center overflow-visible [perspective:1000px]">
            {images.map((item, index) => {
                const isActive = index === currentIndex;
                const isLeft = index === (currentIndex - 1 + images.length) % images.length;
                const isRight = index === (currentIndex + 1) % images.length;

                let stateClasses = 'opacity-0 scale-[0.8] z-10';
                if (isActive) {
                    stateClasses = 'translate-x-0 scale-100 opacity-100 z-20';
                } else if (isLeft) {
                    stateClasses = '-translate-x-[120px] md:-translate-x-[180px] scale-[0.85] [transform:rotateY(10deg)] opacity-60 z-0';
                } else if (isRight) {
                    stateClasses = 'translate-x-[120px] md:translate-x-[180px] scale-[0.85] [transform:rotateY(-10deg)] opacity-60 z-0';
                }

                return (
                    <div 
                        key={index} 
                        className={`absolute flex flex-col items-center text-center transition-all duration-500 ease-in-out ${stateClasses}`}
                    >
                        <img 
                            src={item.src} 
                            alt="" 
                            className="w-[180px] h-[280px] md:w-[250px] md:h-[350px] object-cover rounded-[20px]" 
                        />
                        <div className="mt-3 font-['Outfit'] text-white text-xl font-medium">
                            {item.caption}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}