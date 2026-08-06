import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Hide Navbar on Admin routes
    if (['/open', '/admin', '/super'].some(path => location.pathname.startsWith(path))) {
        return null;
    }

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Certificate', path: '/certificate' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    const itemClasses = ({ isActive }) =>
        `flex items-center justify-center transition-all duration-300 text-white font-medium text-sm h-[30px] rounded-[32px] ${isActive
            ? 'bg-linear-to-br from-white/10 to-white/5 backdrop-blur-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/20 px-[12px]'
            : 'hover:text-gray-300 px-[3px]'
        }`;

    const mobileItemClasses = ({ isActive }) =>
        `block py-4 px-6 text-xl transition-colors duration-300 border-b border-white/5 ${isActive ? 'text-white bg-white/10 font-bold' : 'text-gray-400 font-medium'
        }`;

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-2.5 left-1/2 -translate-x-1/2 w-fit px-5 max-w-[95%] z-[1000] p-[5px] bg-white/10 rounded-[30.34px] shadow-[inset_-0.69px_0.69px_2.76px_rgba(219,219,219,0.3)] backdrop-blur-[10px] hidden md:block border border-white/5">
                <div className="flex gap-7 p-1 justify-center items-center">
                    {navItems.map((item) => (
                        <NavLink key={item.path} to={item.path} className={itemClasses}>
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 left-6 z-[1001] md:hidden p-3 bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-white shadow-lg active:scale-95 transition-transform"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Slider Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1002] md:hidden transition-opacity duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Slider Menu Content */}
            <aside
                className={`fixed top-0 left-0 h-full w-[280px] bg-white/10 backdrop-blur-2xl z-[1003] md:hidden transition-transform duration-300 ease-in-out shadow-2xl border-r border-white/20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full pt-20">
                    <div className="px-6 mb-10">
                        <h2 className="text-white text-3xl font-bold font-['Norican'] drop-shadow-md">Javith</h2>
                        <p className="text-white/60 text-sm">Portfolio Menu</p>
                    </div>

                    <div className="flex flex-col">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={mobileItemClasses}
                                onClick={closeMenu}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="mt-auto p-10 text-center">
                        <p className="text-white/40 text-xs">© 2025 Javith Portfolio</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default NavBar;
