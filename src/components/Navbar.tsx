'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#footer' },
];

export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const navContainerRef = useRef<HTMLDivElement>(null);

    // Update active index based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            let current = 0;
            for (let i = 0; i < navItems.length; i++) {
                const section = document.querySelector(navItems[i].href);
                if (section) {
                    const sectionTop = (section as HTMLElement).offsetTop;
                    const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        current = i;
                        break;
                    }
                }
            }
            setActiveIndex(current);
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate the magic indicator to the active item
    useEffect(() => {
        if (!indicatorRef.current) return;
        const activeLi = navItemsRef.current[activeIndex];
        if (activeLi) {
            const parent = activeLi.parentElement;
            if (parent) {
                const left = activeLi.offsetLeft;
                const width = activeLi.offsetWidth;
                gsap.to(indicatorRef.current, {
                    x: left,
                    width: width,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            }
        }
    }, [activeIndex]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
        e.preventDefault();
        setActiveIndex(idx);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-deep-charcoal/90 backdrop-blur-xl border-b border-gold/30' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <i className="fas fa-code text-gold text-2xl"></i>
                            <span className="text-white font-bold text-xl tracking-tight">
                                Fix<span className="text-gold">Website</span>Design
                            </span>
                        </div>

                        {/* Desktop Menu with Magic Indicator */}
                        <div className="hidden md:block relative">
                            <div
                                ref={navContainerRef}
                                className="relative bg-deep-charcoal/40 backdrop-blur-sm rounded-full px-2 py-1"
                            >
                                <ul className="flex items-center gap-1 relative">
                                    {navItems.map((item, idx) => (
                                        <li
                                            key={item.name}
                                            ref={(el) => {
                                                navItemsRef.current[idx] = el;
                                            }}
                                            className="relative z-10"
                                        >
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href, idx)}
                                                className={`block px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeIndex === idx
                                                        ? 'text-deep-charcoal'
                                                        : 'text-cream/80 hover:text-gold'
                                                    }`}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    ref={indicatorRef}
                                    className="absolute top-1 left-0 h-[calc(100%-8px)] bg-gold rounded-full shadow-lg transition-all duration-300"
                                    style={{ width: '0px', willChange: 'transform, width' }}
                                />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gold text-2xl focus:outline-none"
                        >
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="bg-deep-charcoal/95 backdrop-blur-xl border-t border-gold/30 px-6 py-4">
                        <ul className="flex flex-col gap-3">
                            {navItems.map((item, idx) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href, idx)}
                                        className={`block py-2 px-4 rounded-lg transition-all ${activeIndex === idx
                                                ? 'bg-gold text-deep-charcoal font-semibold'
                                                : 'text-cream/80 hover:text-gold'
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="h-16 md:h-20" />
        </>
    );
}