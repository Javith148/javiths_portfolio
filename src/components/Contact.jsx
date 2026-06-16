import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaCalendarCheck, FaPaperPlane } from 'react-icons/fa';
import bg from './assets/back2.png';

const Contact = () => {
    const [activeTab, setActiveTab] = useState("form");
    const [message, setMessage] = useState("");
    const phone = "919677987432";

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const text = `Hello, I'm ${name}. My email is ${email}. Message: ${message}`;
        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/${phone}?text=${encodedText}`;
        window.open(url, "_blank");
    };

    return (
        <section 
            className="w-full min-h-screen flex flex-col items-center justify-end font-['Outfit'] bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div 
                id="contact"
                className="w-full max-w-[900px] bg-[#111111CC] backdrop-blur-md rounded-t-[30px] rounded-b-none p-8 md:p-10 shadow-[0_-5px_30px_rgba(0,0,0,0.6)] animate-fade-in"
            >
                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-8 text-2xl">
                    <a href="https://www.linkedin.com/in/javith-sukkur" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/Javith148" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaGithub />
                    </a>
                    <a href="https://www.instagram.com/_.j.a.v.i._.x148" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaInstagram />
                    </a>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button 
                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${activeTab === "quick" ? "bg-[#333] text-white shadow-lg" : "bg-[#222] text-gray-400 hover:bg-[#2a2a2a]"}`}
                        onClick={() => setActiveTab("quick")}
                    >
                        Quick connect
                    </button>
                    <button 
                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${activeTab === "form" ? "bg-[#333] text-white shadow-lg" : "bg-[#222] text-gray-400 hover:bg-[#2a2a2a]"}`}
                        onClick={() => setActiveTab("form")}
                    >
                        Fill a form
                    </button>
                </div>

                {/* Content */}
                <div className="w-full">
                    {activeTab === "quick" ? (
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <a 
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=javithjavi148@gmail.com" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 flex items-center gap-5 p-6 bg-linear-to-br from-[#1a1a1a] to-[#111] border border-white/5 rounded-2xl hover:bg-[#222] transition-all duration-300 group"
                            >
                                <div className="text-4xl p-3 rounded-xl bg-white/5 text-[#4ea8de] group-hover:scale-110 transition-transform">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-semibold">Email</h3>
                                    <p className="text-gray-400 text-sm">Open Gmail to send a message</p>
                                </div>
                            </a>
                            
                            <a 
                                href="https://calendar.google.com/calendar/u/0/r/eventedit" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 flex items-center gap-5 p-6 bg-linear-to-br from-[#1a1a1a] to-[#111] border border-white/5 rounded-2xl hover:bg-[#222] transition-all duration-300 group"
                            >
                                <div className="text-4xl p-3 rounded-xl bg-white/5 text-[#c084fc] group-hover:scale-110 transition-transform">
                                    <FaCalendarCheck />
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-semibold">Schedule Meeting</h3>
                                    <p className="text-gray-400 text-sm">Create a meeting in Google Calendar</p>
                                </div>
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} className="max-w-[700px] mx-auto flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-400 text-sm font-medium ml-1">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Your name" 
                                        required 
                                        className="w-full bg-[#1f1f1f] text-white border border-white/10 p-3.5 rounded-xl text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-gray-600"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-400 text-sm font-medium ml-1">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="your.email@example.com" 
                                        required 
                                        className="w-full bg-[#1f1f1f] text-white border border-white/10 p-3.5 rounded-xl text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-gray-600"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-400 text-sm font-medium ml-1">Message</label>
                                <textarea
                                    name="message"
                                    placeholder="What would you like to discuss?"
                                    maxLength={1000}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="w-full bg-[#1f1f1f] text-white border border-white/10 p-4 rounded-xl text-sm min-h-[120px] focus:border-blue-500 focus:outline-none transition-colors placeholder:text-gray-600 resize-none"
                                />
                                <div className="text-[11px] text-gray-500 text-right mt-1">
                                    {message.length}/1000 characters
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full mt-2 bg-linear-to-r from-[#3a47d5] to-[#00c6ff] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-opacity hover:opacity-90 active:scale-[0.98]"
                            >
                                <FaPaperPlane /> Send message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
