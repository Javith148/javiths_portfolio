
import React, { useState, useEffect } from 'react';=======


import cor1 from './assets/1.jpg'
import cor2 from './assets/2.jpg'
import cor3 from './assets/3.jpg'
import cor4 from './assets/4.jpg'
import cor5 from './assets/5.jpg'
import cor6 from './assets/6.jpg'
import cor7 from './assets/7.jpg'
import cor8 from './assets/8.jpg'
import cor9 from './assets/9.jpg'
import cor10 from './assets/10.jpg'

import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import back2 from './assets/back2.png';
import { API_BASE } from '../config/api';

function Certificatemain() {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });

        fetch(`${API_BASE}/certificates`)
            .then(res => res.json())
            .then(data => {
                if (data.certificates && Array.isArray(data.certificates)) {
                    const visibleCerts = data.certificates.filter(c => c.is_featured !== false);
                    const formatted = visibleCerts.map(c => ({
                        title: c.title,
                        platform: c.issuer || 'Certification',
                        description: c.description || 'Verified achievement certificate',
                        image: c.image_url || ''
                    }));
                    setCertificates(formatted);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <section
            className="w-full min-h-screen bg-[#0D0C0C] text-white flex flex-col items-center pt-24 pb-0 font-['Outfit'] overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${back2})` }}
        >

            <div className="flex flex-col items-center text-center gap-4 mb-20 px-4">
                <h6 data-aos="slide-up" className="text-white text-base font-extralight tracking-widest uppercase opacity-70">
                    Badges of Brilliance
                </h6>
                <h1 data-aos="slide-up" className="text-4xl md:text-[50px] font-bold text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                    My Achievements
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1200px] w-full px-6 justify-items-center mb-24">
                {certificates.map((cert, index) => (
                    <div
                        key={index}
                        data-aos="slide-up"
                        data-aos-delay={index * 50}
                        className="group flex flex-col justify-between p-6 bg-[#4D4C4C99] backdrop-blur-md rounded-2xl border border-white/10 shadow-[inset_0_0_8px_rgba(219,219,219,0.3)] w-full max-w-[340px] min-h-[260px] transition-all duration-500 hover:-translate-y-2 hover:bg-[#5E5D5D99] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(237,44,224,0.2)]"
                    >
                        <div>
                            <h3 className="text-white text-base font-semibold mb-1 line-clamp-2 min-h-[44px]">
                                {cert.title}
                            </h3>
                            <p className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">
                                {cert.platform}
                            </p>
                            <p className="text-[#B3B3B3] text-xs leading-relaxed text-justify mb-6 line-clamp-4">
                                {cert.description}
                            </p>
                        </div>

                        <button
                            onClick={() => window.open(cert.image, '_blank')}
                            className="self-center w-[60px] h-[28px] bg-[#D9D9D9] hover:bg-white rounded-full text-[#0D0C0C] text-xs font-medium transition-all duration-300 cursor-pointer"
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full mt-auto">
                <Footer transparent={true} />
            </div>
        </section>
    );
}

export default Certificatemain;
