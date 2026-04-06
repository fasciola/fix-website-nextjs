/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Luxury palette
                'deep-charcoal': '#1A1A1A',
                'gold': '#C9A03D',
                'warm-bronze': '#8B5E3C',
                'cream': '#F5F0E8',
                'dark-cream': '#E8DFD0',
                'charcoal': '#2C2C2C',
            },
            fontFamily: {
                'playfair': ['var(--font-playfair)', 'serif'],
                'inter': ['var(--font-inter)', 'sans-serif'],
                'montserrat': ['var(--font-montserrat)', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-ring': 'pulseRing 1.8s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(3deg)' },
                },
                pulseRing: {
                    '0%': { boxShadow: '0 0 0 0 rgba(201, 160, 61, 0.5)' },
                    '70%': { boxShadow: '0 0 0 15px rgba(201, 160, 61, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(201, 160, 61, 0)' },
                },
            },
        },
    },
    plugins: [],
};