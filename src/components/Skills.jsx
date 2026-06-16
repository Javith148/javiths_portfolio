import React from 'react';
import html from './assets/html.png'
import css from './assets/css.png'
import JavaScript from './assets/javascript.png'
import react from './assets/react.png'
import Figma from './assets/figma.png'
import python from './assets/python.png'
import mysql from './assets/mysql.png'
import github from './assets/github.png'
import git from './assets/git.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Skills() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);

    const skillsData = [
        { name: 'HTML', icon: html },
        { name: 'CSS', icon: css },
        { name: 'Javascript', icon: JavaScript },
        { name: 'React', icon: react },
        { name: 'Flutter', icon: 'https://skillicons.dev/icons?i=flutter' },
        { name: 'Dart', icon: 'https://skillicons.dev/icons?i=dart' },
        { name: 'Django', icon: 'https://skillicons.dev/icons?i=django' },
        { name: 'Firebase', icon: 'https://skillicons.dev/icons?i=firebase' },
        { name: 'MySQL', icon: mysql },
        { name: 'Python', icon: python },
        { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman' },
        { name: 'REST API', icon: 'https://www.svgrepo.com/show/375531/api.svg' },
        { name: 'Canva', icon: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg' },
        { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' },
        { name: 'Figma', icon: Figma },
        { name: 'GitHub', icon: github },
        { name: 'Git', icon: git },
    ];

    return (
        <section id="skills" className="w-full min-h-screen bg-[#0D0C0C] text-white flex flex-col items-center overflow-hidden py-24 font-['Outfit']">

            {/* Header section with Flexbox centering */}
            <div className="flex flex-col items-center text-center gap-4 mb-20 px-4">
                <h6 data-aos="slide-up" className="text-white text-base font-extralight tracking-widest uppercase opacity-70">My Skills</h6>
                <h1 data-aos="slide-up" className="text-4xl md:text-[50px] font-bold text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                    The Secret <span className="px-2 bg-gradient-to-r from-[#B52020] via-[#ED2CE0] to-[#4851FF] bg-clip-text text-transparent">Sauce</span>
                </h1>
            </div>

            {/* Skills Grid - Centered and Responsive */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-[1000px] px-6 mx-auto">
                {skillsData.map((skill, index) => (
                    <div
                        key={index}
                        data-aos="zoom-in"
                        data-aos-delay={index * 50}
                        className="group flex flex-col items-center justify-center p-3 transition-all duration-500 hover:-translate-y-1 cursor-pointer
                        bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg
                        w-[70px] h-[70px] md:w-[85px] md:h-[85px] 
                        hover:bg-white/10 hover:border-white/20 
                        hover:shadow-[0_0_20px_rgba(237,44,224,0.2)]"
                    >
                        <div className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center mb-1.5 transition-transform duration-500 group-hover:scale-110">
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-white/80 group-hover:text-white text-[8px] md:text-[10px] font-medium transition-colors duration-300">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Skill Ribbons at the bottom - Crossing in the center using Flexbox/Grid logic */}
            <div className="w-full mt-40 flex flex-col items-center">
                <div 
                    data-aos="slide-right"
                    className="w-[150vw] h-[80px] bg-gradient-to-r from-[#B52020] to-[#ED2CE0] rotate-[8deg] shadow-2xl z-10"
                ></div>
                <div 
                    data-aos="slide-left"
                    className="w-[150vw] h-[80px] bg-gradient-to-r from-[#ED2CE0] to-[#B52020] -rotate-[8deg] -mt-20 shadow-2xl z-0"
                ></div>
            </div>
        </section>
    );
}

export default Skills;
