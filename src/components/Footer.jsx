import React from 'react'
import { Github, Instagram, Mail, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Footer({ transparent = false }) {
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About Me', href: '#about-me' },
        { name: 'Skills', href: '#Skill-Cointainer' },
        { name: 'Certificates', href: '#certificate' },
        { name: 'Projects', href: '#Project' },
        { name: 'Contact', href: '#contact' },
    ];

    const moreLinks = [
        { name: 'Resume', href: '#' },
        { name: 'Beyond Code', href: '#' },
        { name: 'My Favorites', href: '#' },
        { name: 'Inspiration', href: '#' },
    ];

    const socialLinks = [
        { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/Javith148' },
        { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://www.instagram.com/_.j.a.v.i._.x148' },
        { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/javith-sukkur' },
    ];

    const specialties = [
        { name: 'Web Development', href: '#' },
        { name: 'App Development', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Backend Systems', href: '#' },
    ];

    return (
        <footer className={`w-full ${transparent ? 'bg-linear-to-b from-transparent via-black/30 to-black' : 'bg-black'} text-white font-['Outfit'] overflow-hidden`}>
            {/* Top CTA Section */}
            <div className="relative py-24 px-4 flex flex-col items-center justify-center text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-[32px] md:text-[48px] font-light leading-none">
                        FROM CONCEPT TO <span className="font-bold">CREATION</span>
                    </h1>
                    <h1 className="text-[32px] md:text-[48px] font-light leading-none">
                        LET'S MAKE IT <span className="font-bold">HAPPEN!</span>
                    </h1>

                    <div className="flex flex-col items-center gap-6 pt-10">
                        {/* Connect Button */}
                        <button
                            className="relative w-[180px] h-[55px] bg-white/10 rounded-[34.34px] backdrop-blur-[20px] text-white text-[16px] font-light text-left pl-[20px] overflow-hidden transition-colors duration-500 group cursor-pointer border-none flex items-center"
                            onClick={() => navigate("/contact")}
                        >
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Let's Connect</span>
                            <div className="absolute right-[7%] top-1/2 -translate-y-1/2 w-[42px] h-[42px] bg-white rounded-full z-10 flex items-center justify-center">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGASURBVHgBzVU9j4JAEB2QRBuNpZWFJiYWlvb8AH+Bhb2FlYmljX/BysRaE2qoKeipKGgIBTR0hAbCxxy7l72Ld3rCniS+hGzBzrx9b2Z2BUSUoUEIJQFCgxChYbwvQZqmUMXd2gQkqeu6MJ/PwbbtSgG1kOc5Xq9XlCQJB4MBmqaJRVE83F+bgJFcLhcURRH7/T7quv5aAobj8UhJOp0OKoryeoIsy6iSdrtNLTudTlTdXYKfP6qC+E/qMBwOURAEPBwONzWRWLF3ux1YlgW86Ha7dN3v99Dr9WCz2UBJ+NlFhFGWZdLU3B85PVsXi8WXAoFZFQQBhGEIPCDx2+0WVFWF0WgEhmFA2cLfCnhBlCdJgqvVinbTeDzGcghv9vyLIIoiagexZTqdoud5v4aOi4AkcRwHJ5MJtlotXC6XGMfx3YmuTUCS+L6Ps9mM2rJer2mLP7ouuBScz2d68rKwT+eH+y7SNK3SXu4nk4XRVvwDEnDiWWKGxp9MokCHBvEBGJIvmllDQSsAAAAASUVORK5CYII="
                                    alt=""
                                    className="w-[22px] h-[22px]"
                                />
                            </div>
                            <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[35px] h-[35px] bg-white rounded-full scale-0 group-hover:scale-[15] transition-transform duration-500 origin-center z-0"></div>
                        </button>

                        <p className="text-[#827E7E] text-base md:text-lg max-w-[400px] leading-relaxed">
                            I thrive on building high-performance mobile and web applications while delivering seamless user experiences across all platforms.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Info Section */}
            <div className="max-w-8xl mx-auto px-6 py-16 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-24 items-start">
                    {/* Brand/About */}
                    <div className="space-y-6 " >
                        <div className="text-white font-light text-[17px] leading-relaxed">
                            <p>I'm Javith — a Flutter, React, and Django Developer passionate about building scalable mobile and web applications.</p>
                            <p className="mt-2">Thanks for checking out my site!</p>
                        </div>

                    </div>

                    {/* Columns 2, 3 & 4: Links */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 col-span-1 md:col-span-2 lg:col-span-3">
                        <div className="space-y-6">
                            <h3 className="text-white font-medium text-lg">General</h3>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[#827E7E] text-sm hover:text-white transition-colors duration-300 relative group block w-max">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-white font-medium text-lg">Specialties</h3>
                            <ul className="space-y-3">
                                {specialties.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[#827E7E] text-sm hover:text-white transition-colors duration-300 relative group block w-max">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-white font-medium text-lg">More</h3>
                            <ul className="space-y-3">
                                {moreLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[#827E7E] text-sm hover:text-white transition-colors duration-300 relative group block w-max">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Socials */}
                        <div className="flex flex-col items-center md:items-end gap-6 h-full">
                            <h3 className="text-white font-medium text-lg hidden md:block">Connect</h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <div key={social.name} className="relative group">
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {social.icon}
                                        </a>
                                        {/* Tooltip */}
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                            {social.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <p className="text-white text-[15px] text-center ">© 2026 Javith. Designed & Developed</p>
            </div>
        </footer>
    )
}

export default Footer