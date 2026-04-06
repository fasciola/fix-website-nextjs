'use client';

import { useEffect, useRef } from 'react';

export default function CTA() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = ref.current;
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

    const handleBookCall = () => {
        alert(
            '📞 Book your free 30-min strategy call:\n\n' +
            '📍 Dubai - Silicon Oasis\n' +
            '📧 fixwebsitedesign@gmail.com\n' +
            '📱 +971 50 385 5279\n\n' +
            'We’ll get back to you within 2 hours.'
        );
    };

    return (
        <section id="final-cta" ref={ref} className="py-28 px-6 text-center relative overflow-hidden reveal">
            <div className="absolute inset-0 bg-gold/10 blur-3xl -z-10"></div>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">Ready to <span className="text-gold">Fix</span> Your Website?</h2>
                <p className="text-cream/80 text-xl mt-4">Let’s create something extraordinary together.</p>
                <div className="mt-10">
                    <button
                        onClick={handleBookCall}
                        className="bg-gold text-deep-charcoal text-lg px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_#C9A03D]"
                    >
                        <i className="fas fa-calendar-check"></i> Book a Free 30-Min Strategy Call
                    </button>
                </div>
            </div>
        </section>
    );
}