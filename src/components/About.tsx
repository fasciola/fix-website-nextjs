'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );
        observer.observe(section);
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 px-6 max-w-6xl mx-auto reveal">
            <div className="md:flex md:items-center md:justify-between gap-12">
                <div className="md:w-1/2">
                    <span className="text-gold font-semibold tracking-wider text-sm uppercase border-l-4 border-gold pl-3">About studio</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4">Crafting digital <span className="text-gold">masterpieces</span></h2>
                    <p className="text-cream/80 text-lg leading-relaxed mt-6">Fix Website Design is a boutique digital studio in Dubai that transforms bold ideas into pixel-perfect digital experiences. We craft websites that don’t just look good — they perform exceptionally.</p>
                    <div className="mt-8 flex gap-6">
                        <div><i className="fas fa-map-marker-alt text-gold text-xl"></i><p className="text-sm text-cream/70 mt-1">Dubai Design District</p></div>
                        <div><i className="fas fa-globe text-gold text-xl"></i><p className="text-sm text-cream/70 mt-1">Global Clientele</p></div>
                    </div>
                </div>
                <div className="md:w-1/2 mt-10 md:mt-0 relative group">
                    <div className="bg-gradient-to-br from-gold/20 to-transparent rounded-3xl p-1 transition-all group-hover:shadow-[0_0_30px_#C9A03D]">
                        <div className="bg-deep-charcoal rounded-2xl overflow-hidden">
                            <Image
                                src="/images/about-office.jpg"
                                alt="Fix Website Design office"
                                width={500}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-6 text-center">
                                <i className="fas fa-quote-right text-4xl text-gold opacity-70 mb-3"></i>
                                <p className="italic text-cream/80">"We don't just fix websites — we elevate digital experiences into cinematic journeys."</p>
                                <p className="mt-4 font-semibold text-gold">— Founder, Fix Website Design</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}