import React from 'react'
import './certificate.css'
import cor1 from './assets/1.jpg'
import cor2 from './assets/2.jpg'
import cor3 from './assets/3.jpg'
import cor4 from './assets/4.jpg'
import cor5 from './assets/5.jpg'
import cor6 from './assets/6.jpg'
import Certificatemain from './Certificatemain'
import { useNavigate } from 'react-router-dom';
import React1, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Certificate() {
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    const certificates = [
        {
            title: "Introduction to artificial intelligence (AI)",
            platform: "coursera",
            description: "Gained foundational understanding of AI concepts including machine learning, neural networks, and intelligent systems. Explored real-world applications and ethical implications of AI.",
            image: cor1
        },
        {
            title: "javascript animation for website, Storytelling data visualization and games",
            platform: "coursera",
            description: "Learned how to create dynamic, smooth animations using JavaScript and libraries like GSAP. Gained experience in enhancing UX through transitions, motion effects, and interactive visuals.",
            image: cor2
        },
        {
            title: "Build a Twitter clone front-end with react",
            platform: "coursera",
            description: "Created a functional Twitter-like interface using React. Developed core features such as real-time feeds, tweet creation, likes, and UI responsiveness with component-based architecture.",
            image: cor3
        },
        {
            title: "Java for beginners : getting started",
            platform: "coursera",
            description: "Introduced to the fundamentals of Java programming including variables, data types, loops, and object-oriented principles. Built simple applications to understand core syntax and logic.",
            image: cor4
        },
        {
            title: "AWS S3 Basics",
            platform: "coursera",
            description: "Gained a foundational understanding of Amazon S3, including how to store, manage, and retrieve data securely. Learned about buckets, objects, permissions, versioning, and static website hosting.",
            image: cor5
        },
        {
            title: "Hosting a Static website (HTML/CSS/Javascript) in AWS S3",
            platform: "coursera",
            description: "Learned how to deploy static websites built with HTML, CSS, and JavaScript using Amazon S3. Configured bucket settings, enabled static hosting, and integrated custom domains for live deployment.",
            image: cor6
        }
    ];

    return (
        <section id="certificates" className="w-full bg-[#0D0C0C] text-white flex flex-col items-center py-12 md:py-24 font-['Outfit'] overflow-hidden px-4 md:px-[4%]">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 mb-20 animate-fade-in">
                <h6 data-aos="slide-up" className="text-white text-base font-extralight tracking-widest uppercase opacity-70">Badges of Brilliance</h6>
                <h1 data-aos="slide-up" className="text-4xl md:text-[50px] font-bold text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                    My Achievements
                </h1>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1200px] w-full justify-items-center">
                {certificates.slice(0, 3).map((cert, index) => (
                    <div 
                        key={index}
                        data-aos="slide-up"
                        data-aos-delay={index * 50}
                        className="group flex flex-col justify-between p-6 bg-[#4D4C4C99] backdrop-blur-md rounded-2xl border border-white/10 shadow-[inset_0_0_8px_rgba(219,219,219,0.3)] w-full max-w-[340px] min-h-[260px] transition-all duration-500 hover:-translate-y-2 hover:bg-[#5E5D5D99] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(237,44,224,0.2)] cursor-default"
                    >
                        <div>
                            <h3 className="text-white text-base font-semibold mb-1 line-clamp-2 min-h-[44px]">
                                {cert.title}
                            </h3>
                            <p className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">
                                {cert.platform}
                            </p>
                            <p className="text-[#B3B3B3] text-xs leading-relaxed text-justify mb-6">
                                {cert.description}
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => window.open(cert.image, '_blank')}
                            className="self-center w-[60px] h-[28px] bg-[#D9D9D9] hover:bg-white rounded-full text-[#0D0C0C] text-xs font-medium transition-all duration-300 transform active:scale-95"
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <div 
                data-aos="slide-up"
                className="mt-20 flex items-center gap-4 cursor-pointer group"
                onClick={() => navigate("/certificate")}
            >
                <p className="text-white font-extralight text-lg">More Certificates</p>
                <div className="w-[32px] h-[32px] bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 shadow-[inset_-1px_1px_4px_rgba(219,219,219,0.4)] backdrop-blur-lg">
                    <span className="text-white text-sm font-bold transform transition-transform group-hover:translate-x-0.5">➜</span>
                </div>
            </div>
        </section>
    );
}

export default Certificate;