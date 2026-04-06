'use client';

import { useEffect, useRef } from 'react';

const services = [
    { icon: 'fas fa-pen-fancy', title: 'Custom Web Design', desc: 'Luxury, conversion-first interfaces tailored to your brand DNA.' },
    { icon: 'fas fa-tachometer-alt', title: 'High-Performance Dev', desc: 'Blazing fast code, SEO-optimized, smooth animations & scalability.' },
    { icon: 'fas fa-film', title: 'Brand & Motion Design', desc: 'Cinematic storytelling & identity that resonates in premium markets.' },
    { icon: 'fas fa-shopping-cart', title: 'E-commerce Solutions', desc: 'High-converting online stores with seamless UX and secure checkout.' },
    { icon: 'fas fa-sync-alt', title: 'Website Redesign & Optimization', desc: 'Revamp outdated sites and boost performance, speed & aesthetics.' },
    { icon: 'fas fa-chart-line', title: 'Ongoing Maintenance & Growth', desc: 'Dedicated support, updates, and analytics-driven enhancements.' },
];

export default function Services() {
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
        <section id="services" ref={sectionRef} className="py-24 px-6 bg-dark-teal/50 reveal">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-accent font-semibold text-sm uppercase tracking-wider">What we deliver</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2">Elite <span className="text-accent">services</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, idx) => (
                        <div key={idx} className="service-card bg-dark-teal border border-neutral-light/20 rounded-2xl p-7 transition-all card-3d hover:border-accent group">
                            <i className={`${s.icon} text-5xl text-accent mb-5 inline-block transition-all group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#36FFDB]`}></i>
                            <h3 className="text-2xl font-bold">{s.title}</h3>
                            <p className="text-neutral-light mt-3">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}