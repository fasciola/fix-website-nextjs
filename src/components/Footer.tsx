export default function Footer() {
    return (
        <footer id="footer" className="bg-deep-charcoal border-t border-gold/20 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <i className="fas fa-code text-gold text-2xl"></i>
                        <span className="font-bold text-xl text-white">
                            Fix<span className="text-gold">Website</span>Design
                        </span>
                    </div>
                    <p className="text-cream/70 text-sm">
                        Dubai-based premium web studio crafting cinematic, high-converting digital experiences.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-3">Explore</h4>
                    <ul className="space-y-2 text-cream/70 text-sm">
                        <li><a href="#home" className="hover:text-gold transition">Home</a></li>
                        <li><a href="#services" className="hover:text-gold transition">Services</a></li>
                        <li><a href="#portfolio" className="hover:text-gold transition">Portfolio</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-3">Contact</h4>
                    <ul className="space-y-2 text-cream/70 text-sm">
                        <li><i className="fas fa-map-marker-alt text-gold w-5 mr-2"></i> Dubai - Silicon Oasis, UAE</li>
                        <li><i className="fas fa-envelope text-gold w-5 mr-2"></i> fixwebsitedesign@gmail.com</li>
                        <li><i className="fas fa-phone-alt text-gold w-5 mr-2"></i> +971 50 385 5279</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-3">Follow</h4>
                    <div className="flex gap-4 text-2xl">
                        <a href="#"><i className="fab fa-instagram hover:text-gold transition text-cream/70"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in hover:text-gold transition text-cream/70"></i></a>
                        <a href="#"><i className="fab fa-behance hover:text-gold transition text-cream/70"></i></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-cream/20 mt-12 pt-8 text-center text-cream/50 text-sm">
                © 2026 Fix Website Design. All Rights Reserved.
            </div>
        </footer>
    );
}