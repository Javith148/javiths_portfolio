import React, { useEffect, useState } from 'react';
import back2 from './assets/back2.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import { API_BASE } from '../config/api';

function Projectmain() {
    const [projects, setProjects] = useState([]);

    const getIconForTech = (techName, skillMap) => {
        if (!techName) return 'https://skillicons.dev/icons?i=code';
        const lower = techName.toLowerCase().trim();
        if (skillMap[lower]) return skillMap[lower];

        return `https://skillicons.dev/icons?i=${lower.replace(/[^a-z0-9]/g, '')}`;
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });

        Promise.all([
            fetch(`${API_BASE}/projects`).then(r => r.json()).catch(() => ({ projects: [] })),
            fetch(`${API_BASE}/skills`).then(r => r.json()).catch(() => ({ skills: [] }))
        ]).then(([pData, sData]) => {
            const skillMap = {};
            if (sData.skills && Array.isArray(sData.skills)) {
                sData.skills.forEach(s => {
                    if (s.name && s.icon_url) {
                        skillMap[s.name.toLowerCase()] = s.icon_url;
                    }
                });
            }

            if (pData.projects && Array.isArray(pData.projects)) {
                // Filter only chosen/featured projects
                const visibleProjects = pData.projects.filter(p => p.is_featured !== false);
                const formatted = visibleProjects.map(p => ({
                    title: p.title,
                    description: p.description,
                    shortDesc: p.short_desc || (p.description ? p.description.substring(0, 100) : ''),
                    image: p.image_url || '',
                    gradient: p.gradient || 'linear-gradient(175deg, #7F17DA 0%, #737373 100%)',
                    liveLink: p.live_link || '#',
                    githubLink: p.github_link || '#',
                    stack: Array.isArray(p.tags) 
                        ? p.tags.map(t => ({ name: t, icon: getIconForTech(t, skillMap) })) 
                        : []
                }));
                setProjects(formatted);
            }
        });
    }, []);

    const handleProjectClick = (proj) => {
        const url = (proj.liveLink && proj.liveLink !== '#') ? proj.liveLink : ((proj.githubLink && proj.githubLink !== '#') ? proj.githubLink : null);
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section 
            className="w-full min-h-screen bg-[#0D0C0C] text-white flex flex-col items-center pt-24 pb-0 font-['Outfit'] overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${back2})` }}
        >
            {/* Header */}
            <h1 data-aos="slide-up" className="text-4xl md:text-[50px] font-bold mb-32 text-white">
                Created <span className="bg-linear-to-r from-[#d91a1a] via-[#e340d8] to-[#d91a1a] bg-clip-text text-transparent animate-gradient">works</span>
            </h1>

            {/* Projects Container */}
            <div className="w-full max-w-[1200px] px-6 flex flex-col gap-32 md:gap-48 mb-32">
                {projects.map((project, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col gap-12 items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                        {/* Project Card (Image Side) */}
                        <div 
                            data-aos="slide-up"
                            onClick={() => handleProjectClick(project)}
                            title={project.liveLink && project.liveLink !== '#' ? `Open ${project.liveLink}` : 'Click to view project'}
                            className="relative w-full max-w-[650px] h-[400px] p-2 bg-[#4D4C4C99] backdrop-blur-md rounded-[30px] border border-white/10 shadow-[inset_-4px_2px_4px_rgba(219,219,219,0.3)] group overflow-hidden cursor-pointer hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(227,64,216,0.3)] transition-all duration-300"
                        >
                            <div 
                                className="w-full h-full rounded-[25px] flex flex-col items-center p-8 transition-all duration-500"
                                style={{ background: project.gradient }}
                            >
                                <p className="relative z-10 text-white text-sm md:text-base text-justify font-medium mb-6 -translate-y-[10px]">
    {project.shortDesc}
</p>
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full max-w-[500px] h-[260px] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Project Info (Text Side) */}
                        <div className="flex-1 w-full max-w-[500px] space-y-6">
                            <h2 
                                data-aos="fade-left" 
                                onClick={() => handleProjectClick(project)}
                                className="text-3xl md:text-4xl font-bold cursor-pointer hover:text-[#e340d8] transition-colors"
                            >
                                {project.title}
                            </h2>
                            <p data-aos="fade-left" data-aos-delay="200" className="text-[#B3B3B3] text-justify leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            {project.stack && project.stack.length > 0 && (
                                <div data-aos="slide-up" data-aos-delay="300" className="flex flex-wrap gap-3 pt-4">
                                    {project.stack.map((tech, i) => (
                                        <div 
                                            key={i}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#4D4C4C99] backdrop-blur-md border border-white/5 rounded-xl shadow-[inset_-1px_1px_4px_rgba(219,219,219,0.3)]"
                                        >
                                            {tech.icon && <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />}
                                            <span className="text-white text-sm font-medium">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="w-full mt-auto">
                <Footer transparent={true} />
            </div>
        </section>
    );
}

export default Projectmain;
