'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const projects = [
    { name: 'Four Pillars Cosmetic Trading', category: 'Cosmetics', link: 'https://four-pillars-cosmetics.netlify.app/', img: '/images/project-four-pillars.jpg' },
    { name: 'OLIVARA', category: 'Luxury Candles', link: 'https://boisterous-sable-18bb0c.netlify.app/', img: '/images/project-olivara.jpg' },
    { name: 'NOIR ATLAS', category: 'Cinematic Digital', link: 'https://moonlit-maamoul-cfcdd5.netlify.app/', img: '/images/project-noir-atlas.jpg' },
    { name: 'CarCare Hub', category: 'Automotive', link: 'https://car-care-hub.netlify.app/', img: '/images/project-carcare.jpg' },
    { name: 'Dark Matter Elevators', category: 'Luxury Elevators', link: 'https://wonderful-nasturtium-105135.netlify.app/', img: '/images/project-elevators.jpg' },
    { name: 'Elite Estates Dubai', category: 'Real Estate', link: 'https://deft-sundae-510258.netlify.app/', img: '/images/project-elite-estates.jpg' },
    { name: 'Éclat', category: 'Jewelry', link: 'https://papaya-vacherin-fee6b2.netlify.app/', img: '/images/project-eclat.jpg' },
    { name: 'EnergyLink Pro', category: 'Energy Solutions', link: 'https://admirable-custard-0ec2e2.netlify.app/', img: '/images/project-energylink.jpg' },
];

export default function Portfolio() {
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
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );
        observer.observe(section);
        if (section.getBoundingClientRect().top < window.innerHeight - 80) {
            section.classList.add('visible');
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section id="portfolio" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto reveal">
            <div className="text-center mb-14">
                <span className="text-gold font-semibold text-sm uppercase tracking-wider">Case studies</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">Recent <span className="text-gold">creations</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {projects.map((proj, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-2xl border border-cream/20 hover-glow card-3d bg-deep-charcoal">
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={proj.img}
                                alt={proj.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-60"></div>
                        </div>
                        <div className="p-5 relative z-10">
                            <h3 className="text-xl font-bold">{proj.name}</h3>
                            <p className="text-cream/60 text-sm">{proj.category}</p>
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gold text-sm font-medium mt-2 inline-block">View Live →</a>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-charcoal/95 to-gold/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                            <a href={proj.link} target="_blank" className="bg-gold text-deep-charcoal px-5 py-2 rounded-full font-semibold">Launch Site</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}