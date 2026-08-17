import React, { useEffect, useState, useRef } from 'react';
import NavBar from './NavBar';
import ImageSlider from './ImageSlider';
import Footer from './Footer';
import me from './assets/me.jpg';
import backAbt from './assets/backAbt.png';
import {
    FaGraduationCap,
    FaBriefcase,
    FaRocket,
    FaAward,
    FaChevronLeft,
    FaChevronRight,
    FaCalendarAlt,
    FaMapMarkerAlt
} from 'react-icons/fa';

import { API_BASE } from '../config/api';

const getJourneyIconAndBadge = (type) => {
    switch (type) {
        case 'Education':
            return {
                icon: <FaGraduationCap className="text-cyan-400 text-xl" />,
                badgeStyle: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
            };
        case 'Work Experience':
            return {
                icon: <FaBriefcase className="text-purple-400 text-xl" />,
                badgeStyle: "bg-purple-500/10 text-purple-300 border-purple-500/30"
            };
        case 'Milestone':
            return {
                icon: <FaAward className="text-emerald-400 text-xl" />,
                badgeStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
            };
        default:
            return {
                icon: <FaRocket className="text-red-400 text-xl" />,
                badgeStyle: "bg-red-500/10 text-red-300 border-red-500/30"
            };
    }
};

function AboutMe() {
    const sectionRef = useRef(null);
    const journeyContainerRef = useRef(null);
    const journeyTrackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [journeyProgress, setJourneyProgress] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const [moreAboutContent, setMoreAboutContent] = useState([]);
    const [journeyItems, setJourneyItems] = useState([]);

    const handleMoveJourney = (direction) => {
        if (!journeyContainerRef.current) return;
        const containerTop = journeyContainerRef.current.getBoundingClientRect().top + window.scrollY;
        const scrollAmount = 420;

        if (direction === 'prev') {
            const target = Math.max(containerTop, window.scrollY - scrollAmount);
            window.scrollTo({ top: target, behavior: 'smooth' });
        } else {
            const target = window.scrollY + scrollAmount;
            window.scrollTo({ top: target, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Fetch dynamic About Me content & Journey items from Backend
        fetch(`${API_BASE}/about/content`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.content)) {
                    setMoreAboutContent([...data.content].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)));
                }
            })
            .catch(() => { });

        fetch(`${API_BASE}/about/journey`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.journey)) {
                    setJourneyItems([...data.journey].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)));
                }
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        const updateJourneyScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const total = rect.height;
                const current = -rect.top;
                const p = Math.max(0, Math.min(1, (current / (total - windowHeight))));
                setProgress(p);
            }

            if (journeyContainerRef.current && journeyTrackRef.current) {
                const trackWidth = journeyTrackRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                const padding = viewportWidth < 768 ? 40 : 140;
                const maxScrollX = Math.max(0, trackWidth - viewportWidth + padding);

                // Set container height dynamically so horizontal scroll completes right before unpinning
                const totalHeight = maxScrollX + window.innerHeight;
                journeyContainerRef.current.style.height = `${totalHeight}px`;

                const rect = journeyContainerRef.current.getBoundingClientRect();
                const currentScroll = -rect.top;
                const clampedScroll = Math.max(0, Math.min(maxScrollX, currentScroll));

                setTranslateX(clampedScroll);
                setJourneyProgress(maxScrollX > 0 ? clampedScroll / maxScrollX : 0);
            }
        };

        window.addEventListener('scroll', updateJourneyScroll, { passive: true });
        window.addEventListener('resize', updateJourneyScroll);
        updateJourneyScroll();
        const timer = setTimeout(updateJourneyScroll, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', updateJourneyScroll);
            window.removeEventListener('resize', updateJourneyScroll);
        };
    }, [journeyItems]);



    return (
        <div className="w-full min-h-screen bg-black font-['Outfit'] overflow-x-clip">
            <NavBar />

            {/* Hero Section */}
            <section
                className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center pt-20"
                style={{ backgroundImage: `url(${backAbt})` }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" />

                <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    <div className="flex-1 w-full max-w-[700px] py-12">
                        <h6 className="text-[#B3B3B3] text-sm uppercase tracking-[0.2em] mb-4">About Me</h6>
                        <div className="mb-6">
                            <h1 className="text-white text-[40px] md:text-[50px] flex flex-wrap md:flex-nowrap items-center gap-4 font-bold leading-tight">
                                Hi there! I'm
                                <span className="font-['Norican'] bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] bg-clip-text text-transparent animate-gradient px-2">
                                    Javith
                                </span>
                            </h1>
                        </div>

                        <p className="text-white/80 text-lg md:text-xl text-justify leading-relaxed">
                            I'm a passionate Flutter, React, and Django Developer with a strong focus on building scalable, high-performance mobile and web applications. I enjoy transforming ideas into modern digital solutions that combine great user experiences with robust backend architecture. <br /><br />
                            My expertise includes Flutter, Dart, React, JavaScript, HTML, CSS, Django, Python, REST APIs, Firebase, and MySQL. I specialize in developing cross-platform mobile apps, responsive web applications, and secure backend systems that work seamlessly together. <br /><br />
                            When I'm not coding, I enjoy exploring new technologies, improving my development skills, and staying updated with the latest trends in software engineering.
                        </p>
                    </div>

                    <div className="flex-1 w-full max-w-[700px] flex justify-center lg:justify-end pb-12 lg:pb-0">
                        <ImageSlider />
                    </div>
                </div>
            </section>



            {/* My Journey Section (Sticky Vertical-to-Horizontal Scroll) */}
            <section ref={journeyContainerRef} className="relative w-full bg-[#0a0a0a] border-t border-white/10">
                {/* Sticky Viewport Container */}
                <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden relative">
                    {/* Top Progress Line */}
                    <div className="w-full bg-white/10 h-1 absolute top-0 left-0 z-20">
                        <div
                            className="h-full bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF] transition-all duration-75"
                            style={{ width: `${journeyProgress * 100}%` }}
                        />
                    </div>

                    {/* Ambient background glow */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-[1400px] w-full mx-auto space-y-8 relative z-10 py-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 px-6 md:px-16">
                            <div>
                                <h6 className="text-[#B3B3B3] text-sm uppercase tracking-[0.2em] mb-1">My Timeline</h6>
                                <h2 className="text-white text-4xl md:text-6xl font-light">
                                    My <span className="bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF] bg-clip-text text-transparent animate-gradient font-bold">Journey</span>
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
                                    Scroll or use move buttons to step through the milestones, education, and experiences that shaped my developer story
                                </p>
                            </div>

                            {/* Move Controls & Progress Indicator */}
                            <div className="flex items-center gap-3">
                                {/* Move Left Button */}
                                <button
                                    onClick={() => handleMoveJourney('prev')}
                                    disabled={journeyProgress <= 0.01}
                                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer shadow-lg active:scale-95"
                                    title="Move Left"
                                >
                                    <FaChevronLeft className="text-sm" />
                                </button>

                                {/* Move Right Button */}
                                <button
                                    onClick={() => handleMoveJourney('next')}
                                    disabled={journeyProgress >= 0.99}
                                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer shadow-lg active:scale-95"
                                    title="Move Right"
                                >
                                    <FaChevronRight className="text-sm" />
                                </button>

                                {/* Progress Percentage Indicator Badge */}
                                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e340d8] animate-pulse" />
                                    <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
                                        {Math.round(journeyProgress * 100)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Horizontal Cards Track translated by translateX */}
                        <div
                            ref={journeyTrackRef}
                            className="flex gap-6 px-6 md:px-16 transition-transform duration-75 ease-out will-change-transform"
                            style={{
                                transform: `translateX(-${translateX}px)`
                            }}
                        >
                            {journeyItems.map((item, index) => {
                                const { icon, badgeStyle } = getJourneyIconAndBadge(item.type);
                                const displayId = String(index + 1).padStart(2, '0');
                                return (
                                    <div
                                        key={item.id || index}
                                        className="shrink-0 w-[300px] sm:w-[360px] md:w-[420px] bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(227,64,216,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                                    >
                                        <div>
                                            {/* Card Header: ID & Badge */}
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-3xl font-black text-white/10 group-hover:text-white/30 transition-colors">
                                                    {displayId}
                                                </span>
                                                <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2 ${badgeStyle}`}>
                                                    {icon}
                                                    <span>{item.type}</span>
                                                </div>
                                            </div>

                                            {/* Title & Organization */}
                                            <h3 className="text-white text-xl md:text-2xl font-bold mb-2 group-hover:text-[#e340d8] transition-colors leading-snug">
                                                {item.title}
                                            </h3>
                                            <h4 className="text-gray-300 text-sm font-medium mb-4">
                                                {item.organization}
                                            </h4>

                                            {/* Metadata: Period & Location */}
                                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-5">
                                                <div className="flex items-center gap-1.5">
                                                    <FaCalendarAlt className="text-purple-400 text-xs" />
                                                    <span>{item.period}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FaMapMarkerAlt className="text-red-400 text-xs" />
                                                    <span>{item.location}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-justify">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Beyond the Code Section */}
            <section ref={sectionRef} className="relative w-full bg-black py-32 px-6">
                <div className="container mx-auto text-center space-y-8 mb-24">
                    <h6 className="text-[#B3B3B3] text-sm uppercase tracking-[0.2em]">More About Me</h6>
                    <h2 className="text-white text-5xl md:text-7xl font-light">
                        Beyond the Code
                    </h2>
                    <p className="max-w-4xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
                        Being a developer is more than writing code—it's about creating solutions that improve people's lives. As a{' '}
                        <span className="bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] bg-clip-text text-transparent animate-gradient font-medium italic">
                            Flutter, React, and Backend Developer
                        </span>
                        , I'm passionate about building responsive applications, developing robust APIs, and continuously learning new technologies to deliver better user experiences.
                    </p>
                </div>

                {/* Timeline and Content */}
                <div className="container mx-auto flex justify-center gap-6 md:gap-12 lg:gap-32">
                    {/* Sticky Sidebar */}
                    <div className="flex flex-col items-center sticky top-40 h-[1000px] md:h-[1200px] pt-4 px-4 md:px-12">
                        <div className="relative w-[12px] h-full flex flex-col items-center">
                            {/* Background Bar */}
                            <div className="absolute w-[12px] h-full bg-[#1a1a1a] rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,1)] overflow-hidden">
                                {/* Gradient Progress Fill */}
                                <div
                                    className="absolute top-0 w-full bg-linear-to-b from-[#00c6ff] via-[#c084fc] to-[#e340d8] shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-all duration-75 ease-out"
                                    style={{ height: `${progress * 100}%` }}
                                />
                            </div>

                            {/* Floating Image Unit - Sit perfectly on top of the bar */}
                            <div
                                className="absolute z-[100] transition-all duration-75 ease-out pointer-events-none"
                                style={{ top: `calc(${progress * 100}% - ${window.innerWidth < 768 ? '24px' : '40px'})` }}
                            >
                                <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
                                    {/* Perfect Circle Portrait Container */}
                                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-[#1a1a1a] shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-hidden bg-[#1a1a1a] relative z-10 pointer-events-auto">
                                        <img
                                            src={me}
                                            alt="Javith portrait"
                                            className="w-full h-full object-cover transition-transform duration-300"
                                            style={{ transform: `rotate(${progress * 1000}deg)` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Blocks */}
                    <div className="flex flex-col items-center gap-20 md:gap-28 pr-4">
                        {moreAboutContent.map((item, index) => (
                            <div key={index} className="space-y-6 max-w-[550px] flex flex-col items-start w-full">
                                <h3 className="text-white text-2xl md:text-3xl font-bold flex items-center gap-4 text-left">
                                    <span className="text-3xl md:text-4xl">{item.title.split(' ')[0]}</span>
                                    {item.title.split(' ').slice(1).join(' ')}
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed text-justify">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="pt-20">
                <Footer transparent={true} />
            </div>
        </div>
    );
}

export default AboutMe;