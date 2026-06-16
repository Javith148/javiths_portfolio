import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back2 from './assets/back2.png';
import pro1 from './assets/pro1.png';
import html from './assets/html.png';
import css from './assets/css.png';
import figma from './assets/figma.png';
import pro2 from './assets/pro (1).png';
import reactimg from './assets/react.png';
import javascript from './assets/javascript.png';
import pro3 from './assets/pro (2).png';
import python from './assets/python.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Project() {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    const projects = [
        {
            title: "Curryard",
            description: "Curryard is a creatively themed restaurant website built to attract food enthusiasts with a taste for adventure. It blends bold visuals, Halloween-inspired branding, and engaging UI elements to create a unique dining atmosphere online. From eye-catching menus to seamless reservation flow, every detail is crafted to reflect the eerie-yet-enticing vibe of the brand.",
            shortDesc: "A spooky-themed restaurant landing page designed for food lovers who crave a unique dining experience.",
            image: pro1,
            gradient: "linear-gradient(175deg, #EB7B18 0%, #737373 100%)",
            stack: [
                { name: "HTML", icon: html },
                { name: "CSS", icon: css },
                { name: "Figma", icon: figma }
            ]
        },
        {
            title: "Portfolio",
            description: "This portfolio is a React-powered web application designed to highlight my expertise in frontend development and UI/UX design. Crafted with a sleek, modern layout, it offers a seamless user experience with smooth scrolling, responsive design, and interactive elements.",
            shortDesc: "A clean, responsive portfolio to showcase my skills, projects, and personal brand — built for smooth navigation and modern UI.",
            image: pro2,
            gradient: "linear-gradient(175deg, #7F17DA 0%, #737373 100%)",
            stack: [
                { name: "React", icon: reactimg },
                { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
                { name: "JavaScript", icon: javascript }
            ]
        }
    ];

    return (
        <section 
            id="Project"
            className="w-full bg-[#0D0C0C] text-white flex flex-col items-center py-24 font-['Outfit'] overflow-hidden px-4 md:px-[4%]"
        >
            {/* Header */}
            <h1 data-aos="slide-up" className="text-4xl md:text-[50px] font-bold mb-32 text-white text-center">
                Created <span className="bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] bg-clip-text text-transparent animate-gradient">works</span>
            </h1>

            {/* Projects Container */}
            <div className="w-full max-w-[1200px] flex flex-col gap-32 md:gap-40 mb-20">
                {projects.map((project, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col gap-12 items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                        {/* Project Card (Image Side) */}
                        <div 
                            data-aos="slide-up"
                            className="relative w-full max-w-[650px] h-[350px] md:h-[400px] p-2 bg-[#4D4C4C99] backdrop-blur-md rounded-[30px] border border-white/10 shadow-[inset_-4px_2px_4px_rgba(219,219,219,0.3)] group overflow-hidden"
                        >
                            <div 
                                className="w-full h-full rounded-[25px] flex flex-col items-center p-8 transition-all duration-500"
                                style={{ background: project.gradient }}
                            >
                                <p className="text-white text-sm md:text-base text-justify font-medium mb-6">
                                    {project.shortDesc}
                                </p>
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full max-w-[500px] h-[220px] md:h-[260px] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Project Info (Text Side) */}
                        <div className="flex-1 w-full max-w-[500px] space-y-6">
                            <h2 
                                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} 
                                className="text-3xl md:text-4xl font-bold"
                            >
                                {project.title}
                            </h2>
                            <p 
                                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} 
                                data-aos-delay="200" 
                                className="text-[#B3B3B3] text-justify leading-relaxed"
                            >
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div 
                                data-aos="slide-up" 
                                data-aos-delay="300" 
                                className="flex flex-wrap gap-3 pt-4"
                            >
                                {project.stack.map((tech, i) => (
                                    <div 
                                        key={i}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#4D4C4C99] backdrop-blur-md border border-white/5 rounded-xl shadow-[inset_-1px_1px_4px_rgba(219,219,219,0.3)]"
                                    >
                                        <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
                                        <span className="text-white text-xs font-medium">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <div 
                data-aos="slide-up"
                className="mt-12 flex items-center gap-4 cursor-pointer group"
                onClick={() => navigate("/projects")}
            >
                <p className="text-white font-extralight text-lg">More Projects</p>
                <div className="w-[32px] h-[32px] bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 shadow-[inset_-1px_1px_4px_rgba(219,219,219,0.4)] backdrop-blur-lg">
                    <span className="text-white text-sm font-bold transform transition-transform group-hover:translate-x-0.5">➜</span>
                </div>
            </div>
        </section>
    );
}

export default Project;