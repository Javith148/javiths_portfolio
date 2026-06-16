import React, { useEffect, useState, useRef } from 'react';
import NavBar from './NavBar';
import ImageSlider from './ImageSlider';
import Footer from './Footer';
import me from './assets/me.jpg';
import backAbt from './assets/backAbt.png';

function AboutMe() {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const total = rect.height;
                const current = -rect.top;
                const p = Math.max(0, Math.min(1, (current / (total - windowHeight))));
                setProgress(p);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const moreAboutContent = [
        {
            title: "🎨 Creative at Heart",
            description: "I love bringing ideas to life visually before a single line of code is written. Whether it’s sketching wireframes on paper or designing sleek UI components in Figma, creativity is always at the core of what I do. Design, to me, isn’t just about how it looks — it’s about how it works."
        },
        {
            title: "🎧 Fueled by Music",
            description: "My best work is often accompanied by the rhythm of music. From chill lo-fi beats during deep focus sessions to energizing tracks when pushing deadlines — music keeps my mind sharp and my flow uninterrupted"
        },
        {
            title: "🌙 Late-Night Dev Flow",
            description: "There’s something magical about building features in the quiet of the night — when everything’s still, and ideas flow effortlessly. It’s my favorite time to get into deep focus and bring concepts to life."
        },
        {
            title: "🎮 Play = Progress",
            description: "Gaming is more than just fun — it sharpens my problem-solving mindset. Whether it’s strategy, storytelling, or UI in game menus, I find design inspiration in the digital worlds I explore."
        },
        {
            title: "🌐 Passion for the Devlopement",
            description: "There’s something exciting about the web’s endless possibility. I love building things that live online — accessible, responsive, and open to the world. Each project is a chance to contribute something useful and beautiful to the internet."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-black font-['Outfit'] overflow-x-hidden">
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