'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const CanvasBackground = dynamic(() => import('@/components/CanvasBackground'), { ssr: false });

export default function Home() {
    const showContact = () => {
        alert(
            '📞 Get in touch with us:\n\n' +
            '📍 Dubai - Silicon Oasis\n' +
            '📧 fixwebsitedesign@gmail.com\n' +
            '📱 +971 50 385 5279\n\n' +
            'We’ll respond within 2 hours.'
        );
    };

    return (
        <>
            <CanvasBackground />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <Process />
                <CTA />
                <Footer />
            </main>
            {/* Floating Quote Button with Font Awesome - Luxury Gold */}
            <div
                onClick={showContact}
                className="fixed bottom-8 right-8 z-[999] w-14 h-14 rounded-full bg-gold text-deep-charcoal flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-ring"
            >
                <i className="fas fa-file-invoice-dollar text-2xl"></i>
            </div>
        </>
    );
}