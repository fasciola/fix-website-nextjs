'use client';

import { useEffect, useRef } from 'react';

const steps = [
    { icon: 'fas fa-search', title: 'Discovery & Strategy', desc: 'Deep-dive research, competitor analysis & roadmap' },
    { icon: 'fas fa-pencil-ruler', title: 'Design & Prototyping', desc: 'Wireframes, high-fidelity UI & interactive prototypes' },
    { icon: 'fas fa-code', title: 'Development & Magic', desc: 'Clean code, animations, CMS integration & testing' },
    { icon: 'fas fa-rocket', title: 'Launch & Optimization', desc: 'Performance tuning, SEO & flawless deployment' },
    { icon: 'fas fa-chart-line', title: 'Growth & Support', desc: 'Analytics, maintenance & iterative improvements' },
];

export default function Process() {
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
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(section);

        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.classList.add('visible');
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="process" ref={sectionRef} className="py-24 px-6 bg-dark-teal/70 reveal">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-accent font-semibold uppercase tracking-wider">Methodology</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2">The <span className="text-accent">fix</span> workflow</h2>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-accent before:via-neutral-light before:to-accent before:opacity-40 before:z-0 max-md:before:hidden">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 bg-dark-teal p-6 rounded-2xl border border-neutral-light/20 text-center transition-all hover:scale-105 hover:border-accent hover:shadow-[0_0_25px_#36FFDB] group">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-all">
                                <i className={`${step.icon} text-3xl text-accent group-hover:text-dark-teal transition-colors`}></i>
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-neutral-light text-sm mt-2">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}