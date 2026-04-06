'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollManager } from '@/lib/scrollManager';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const headlineWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const btnGroupRef = useRef<HTMLDivElement>(null);
    const trustTextRef = useRef<HTMLParagraphElement>(null);
    const particlesContainerRef = useRef<HTMLDivElement>(null);

    // Magnetic hover effect for buttons
    const magneticHover = (btn: HTMLAnchorElement) => {
        const rect = btn.getBoundingClientRect();
        const boundMagnitude = 12;
        const onMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;
            const moveX = deltaX * boundMagnitude;
            const moveY = deltaY * boundMagnitude;
            gsap.to(btn, {
                x: moveX,
                y: moveY,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: true,
            });
            gsap.to(btn, {
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)',
                duration: 0.2,
            });
        };
        const onMouseLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)',
            });
            gsap.to(btn, {
                boxShadow: btn.classList.contains('btn-primary')
                    ? '0 8px 20px rgba(212, 175, 55, 0.3)'
                    : 'none',
                duration: 0.3,
            });
        };
        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);
        return () => {
            btn.removeEventListener('mousemove', onMouseMove);
            btn.removeEventListener('mouseleave', onMouseLeave);
        };
    };

    // Create floating particles
    const createParticles = () => {
        const container = particlesContainerRef.current;
        if (!container) return;
        // Clear existing
        container.innerHTML = '';
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 60 + 15;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = `${Math.random() * 0.25 + 0.05}`;
            container.appendChild(particle);

            // Random floating animation
            const randomY = (Math.random() * 20) - 10;
            const randomX = (Math.random() * 20) - 10;
            const duration = 3 + Math.random() * 3;
            const delay = Math.random() * 2;
            gsap.to(particle, {
                y: randomY,
                x: randomX,
                duration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay,
            });
            gsap.to(particle, {
                rotate: (Math.random() * 30) - 15,
                duration: duration + 1,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                delay,
            });
        }
    };

    useEffect(() => {
        // Check reduced motion
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            // Skip animations – just reveal everything
            headlineWordsRef.current.forEach((span) => {
                if (span) gsap.set(span, { opacity: 1, y: 0, filter: 'blur(0px)' });
            });
            if (subheadlineRef.current) gsap.set(subheadlineRef.current, { opacity: 1, y: 0 });
            if (btnGroupRef.current) gsap.set(btnGroupRef.current.children, { opacity: 1, scale: 1 });
            return;
        }

        // GSAP Timeline
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Headline staggered fade-up + blur removal
        const words = headlineWordsRef.current.filter(Boolean) as HTMLSpanElement[];
        tl.fromTo(words,
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.12, duration: 0.9 }
        );

        // 2. Subheadline fade-up (0.5s after headline starts)
        if (subheadlineRef.current) {
            tl.fromTo(subheadlineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '+=0.45'
            );
        }

        // 3. Buttons scale entrance
        if (btnGroupRef.current) {
            const btns = Array.from(btnGroupRef.current.children);
            tl.fromTo(btns,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1 },
                '-=0.3'
            );
        }

        // 4. Magnetic hover effect on buttons
        const primaryBtn = document.querySelector('#btnPrimary') as HTMLAnchorElement;
        const outlineBtn = document.querySelector('#btnOutline') as HTMLAnchorElement;
        if (primaryBtn) magneticHover(primaryBtn);
        if (outlineBtn) magneticHover(outlineBtn);

        // 5. Create floating particles
        createParticles();

        // 6. Parallax scroll for trust text (0.5x speed)
        const trustEl = trustTextRef.current;
        const handleScroll = () => {
            if (trustEl) {
                const scrolled = window.scrollY;
                const yOffset = scrolled * 0.5;
                trustEl.style.transform = `translateY(${Math.min(40, Math.max(-40, yOffset))}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        // 7. Marquee duplication for seamless infinite scroll
        const track = document.querySelector('.marquee-track') as HTMLDivElement;
        if (track) {
            const items = Array.from(track.children);
            // Ensure enough width
            if (track.scrollWidth < window.innerWidth * 1.5) {
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    track.appendChild(clone);
                });
            }
        }

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (primaryBtn) primaryBtn.removeEventListener('mousemove', () => { });
            if (outlineBtn) outlineBtn.removeEventListener('mousemove', () => { });
        };
    }, []);

    // Scroll parallax for the title (existing)
    useEffect(() => {
        const unsubscribe = ScrollManager.getInstance().subscribe((progress) => {
            if (titleRef.current) {
                titleRef.current.style.transform = `translateY(${progress * 30}px)`;
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            {/* Floating particles container */}
            <div ref={particlesContainerRef} className="particles-container" />

            <section
                id="home"
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24 md:py-32"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Hero background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-deep-charcoal/60 via-deep-charcoal/40 to-[#0f1f1e]/50 z-0" />

                {/* Floating blobs (optional) */}
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/10 blur-2xl animate-float z-0" />
                <div
                    className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gold/5 blur-3xl animate-float z-0"
                    style={{ animationDelay: '2s' }}
                />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    {/* Headline with split words */}
                    <h1 ref={titleRef} className="hero-headline font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
                        <span ref={(el) => { headlineWordsRef.current[0] = el; }}>Your</span>{' '}
                        <span ref={(el) => { headlineWordsRef.current[1] = el; }}>Website.</span>{' '}
                        <span ref={(el) => { headlineWordsRef.current[2] = el; }} className="text-gold shimmer">Fixed.</span>
                    </h1>

                    {/* Subheadline */}
                    <p ref={subheadlineRef} className="subheadline font-inter text-cream text-lg md:text-xl max-w-2xl mx-auto mt-6 drop-shadow-md">
                        We design and build stunning, high-performance websites that actually convert. Dubai-based. Globally loved.
                    </p>

                    {/* Buttons group */}
                    <div ref={btnGroupRef} className="flex flex-wrap justify-center gap-5 mt-10">
                        <a
                            id="btnPrimary"
                            href="#portfolio"
                            className="btn-primary font-montserrat inline-flex items-center gap-2 bg-gold text-deep-charcoal font-semibold py-3 px-8 rounded-full transition-all hover:shadow-[0_0_20px_#C9A03D]"
                        >
                            See Our Work <i className="fas fa-arrow-right"></i>
                        </a>
                        <a
                            id="btnOutline"
                            href="#final-cta"
                            className="btn-outline font-montserrat inline-flex items-center gap-2 border border-white text-white py-3 px-8 rounded-full hover:border-gold hover:text-gold transition-all"
                        >
                            Get Your Free Consultation <i className="fas fa-calendar-alt"></i>
                        </a>
                    </div>

                    {/* Infinite marquee for industry tags */}
                    <div className="marquee-wrapper">
                        <div className="marquee-track">
                            <div className="marquee-item"><i className="fas fa-gem"></i> Beauty</div>
                            <div className="marquee-item"><i className="fas fa-building"></i> Real Estate</div>
                            <div className="marquee-item"><i className="fas fa-car"></i> Automotive</div>
                            <div className="marquee-item"><i className="fas fa-spa"></i> Wellness</div>
                            <div className="marquee-item"><i className="fas fa-crown"></i> Luxury Retail</div>
                            <div className="marquee-item"><i className="fas fa-chart-line"></i> Finance</div>
                            {/* Duplicate for seamless loop */}
                            <div className="marquee-item"><i className="fas fa-gem"></i> Beauty</div>
                            <div className="marquee-item"><i className="fas fa-building"></i> Real Estate</div>
                            <div className="marquee-item"><i className="fas fa-car"></i> Automotive</div>
                            <div className="marquee-item"><i className="fas fa-spa"></i> Wellness</div>
                            <div className="marquee-item"><i className="fas fa-crown"></i> Luxury Retail</div>
                            <div className="marquee-item"><i className="fas fa-chart-line"></i> Finance</div>
                        </div>
                    </div>

                    {/* Trust text with parallax */}
                    <p ref={trustTextRef} className="trust-text text-cream/70 text-sm mt-6 tracking-wide">
                        Trusted by 200+ luxury brands worldwide ✦ 4.9/5 Client Satisfaction
                    </p>
                </div>
            </section>
        </>
    );
}