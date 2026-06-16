import React, { useState, useEffect, useRef } from 'react';
import bg from './assets/ChatGPT Image Jun 17, 2025, 12_41_35 AM.png';
import myImage from './assets/mee.jpg';
import docimg from './assets/docimg.png'
import res from './assets/javith resume.jpg'
import ImageSlider from './ImageSlider';
import Skills from './Skills';
import Certificate from './Certificate';
import Project from './Project';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const email = "javithsukkur@gmail.com";

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="font-['Outfit'] overflow-x-hidden">
            {/* Hero Section */}
            <div
                id="home"
                className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat z-[900]"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="max-w-[890px] w-full px-4 text-center mt-[-10vh]">
                    <h1
                        data-aos="slide-right"
                        className="text-white text-[32px] sm:text-[45px] md:text-[55px] font-semibold leading-tight md:leading-[70px] mb-8"
                    >
                        I help founders turn ideas<br className="hidden md:block" /> into seamless "
                        <span className="font-['Norican'] font-extralight bg-linear-to-b from-white/10 to-[#b5b3b3] bg-clip-text text-transparent italic">
                            digital experiences
                        </span> "
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 text-lg md:text-2xl mb-12">
                        <p className="flex items-center flex-wrap justify-center gap-2">
                            Hey there! I’m Javith
                            <img src={myImage} alt="Me" className="w-[70px] h-[43px] rounded-[20px] object-cover mx-2" />
                            I bring ideas to life on the App & Web.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        {/* Connect Button */}
                        <button
                            className="relative w-[160px] h-[50px] bg-white/10 rounded-[34.34px] backdrop-blur-[20px] text-white text-[15px] font-light text-left pl-[16px] overflow-hidden transition-colors duration-500 group cursor-pointer border-none flex items-center"
                            onClick={() => navigate("/contact")}
                        >
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Let's Connect</span>
                            <div className="absolute right-[7%] top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white rounded-full z-10 flex items-center justify-center">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGASURBVHgBzVU9j4JAEB2QRBuNpZWFJiYWlvb8AH+Bhb2FlYmljX/BysRaE2qoKeipKGgIBTR0hAbCxxy7l72Ld3rCniS+hGzBzrx9b2Z2BUSUoUEIJQFCgxChYbwvQZqmUMXd2gQkqeu6MJ/PwbbtSgG1kOc5Xq9XlCQJB4MBmqaJRVE83F+bgJFcLhcURRH7/T7quv5aAobj8UhJOp0OKoryeoIsy6iSdrtNLTudTlTdXYKfP6qC+E/qMBwOURAEPBwONzWRWLF3ux1YlgW86Ha7dN3v99Dr9WCz2UBJ+NlFhFGWZdLU3B85PVsXi8WXAoFZFQQBhGEIPCDx2+0WVFWF0WgEhmFA2cLfCnhBlCdJgqvVinbTeDzGcghv9vyLIIoiagexZTqdoud5v4aOi4AkcRwHJ5MJtlotXC6XGMfx3YmuTUCS+L6Ps9mM2rJer2mLP7ouuBScz2d68rKwT+eH+y7SNK3SXu4nk4XRVvwDEnDiWWKGxp9MokCHBvEBGJIvmllDQSsAAAAASUVORK5CYII="
                                    alt=""
                                    className="w-[22px] h-[22px]"
                                />
                            </div>
                            <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full scale-0 group-hover:scale-[15] transition-transform duration-500 origin-center z-0"></div>
                        </button>

                        {/* Email Copy Button */}
                        <div
                            className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full cursor-pointer hover:bg-white/10 transition-all group relative"
                            onClick={copyEmail}
                        >
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-400 text-lg md:text-xl group-hover:text-white transition-colors font-medium">
                                {email}
                            </span>

                            {/* Copy Feedback Tooltip */}
                            {copied && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-lg animate-bounce">
                                    Copied!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* About Me Section */}
            <div id='about-me' className="relative bg-linear-to-t from-[#0D0C0C] to-[#060511] w-full min-h-screen py-24 px-4 md:px-[4%] flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 w-full">
                    <h6 className="text-white font-extralight text-base ">About Me</h6>
                    <div className="mb-1 mt-[-8px]">
                        <h1 className="text-white text-[40px] md:text-[50px] flex flex-wrap md:flex-nowrap items-center gap-4">
                            Hi there! I'm
                            <span className="text-[40px] md:text-[60px] font-['Norican'] font-bold bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] bg-[length:400%_400%] bg-clip-text text-transparent animate-[gradientMove_8s_linear_infinite]">
                                Javith
                            </span>
                        </h1>
                    </div>
                    <p className="max-w-[1000px] text-white/50 text-justify text-base md:text-lg mb-8">
                        I'm a passionate Flutter, React, and Django Developer with a strong focus on building scalable, high-performance mobile and web applications. I enjoy transforming ideas into modern digital solutions that combine great user experiences with robust backend architecture. <br /><br />
                        My expertise includes Flutter, Dart, React, JavaScript, HTML, CSS, Django, Python, REST APIs, Firebase, and MySQL. I specialize in developing cross-platform mobile apps, responsive web applications, and secure backend systems that work seamlessly together. <br /><br />
                        When I'm not coding, I enjoy exploring new technologies, improving my development skills, and staying updated with the latest trends in software engineering.
                    </p>

                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <ImageSlider />
                </div>
            </div>

            <Skills />
            <Project />
            <Certificate />
            <Footer />
        </div>
    );
}

export default Nav;
