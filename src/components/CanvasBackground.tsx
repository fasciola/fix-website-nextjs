'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ScrollManager } from '@/lib/scrollManager';

// Simple Simplex noise implementation (lightweight, no external deps)
// Based on Stefan Gustavson's paper
class SimplexNoise {
    private grad3: number[][];
    private p: number[];
    private perm: number[];
    private gradP: number[][];

    constructor() {
        this.grad3 = [
            [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
            [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
            [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
        ];
        this.p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
            190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136,
            171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46,
            245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
            164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16,
            58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253,
            19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81,
            51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
            93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
        this.perm = new Array(512);
        this.gradP = new Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i % 256];
            this.gradP[i] = this.grad3[this.perm[i] % this.grad3.length];
        }
    }

    dot(g: number[], x: number, y: number, z: number) {
        return g[0] * x + g[1] * y + g[2] * z;
    }

    noise3D(x: number, y: number, z: number) {
        let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
        let s = (x + y + z) / 3.0;
        let i = Math.floor(x + s);
        let j = Math.floor(y + s);
        let k = Math.floor(z + s);
        let t = (i + j + k) / 6.0;
        let X0 = i - t;
        let Y0 = j - t;
        let Z0 = k - t;
        let x0 = x - X0;
        let y0 = y - Y0;
        let z0 = z - Z0;
        let i1, j1, k1;
        let i2, j2, k2;
        if (x0 >= y0) {
            if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
            else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
            else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
        } else {
            if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
            else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
            else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
        }
        let x1 = x0 - i1 + 1.0 / 6.0;
        let y1 = y0 - j1 + 1.0 / 6.0;
        let z1 = z0 - k1 + 1.0 / 6.0;
        let x2 = x0 - i2 + 2.0 / 6.0;
        let y2 = y0 - j2 + 2.0 / 6.0;
        let z2 = z0 - k2 + 2.0 / 6.0;
        let x3 = x0 - 1.0;
        let y3 = y0 - 1.0;
        let z3 = z0 - 1.0;
        let ii = i & 255;
        let jj = j & 255;
        let kk = k & 255;
        let gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
        let gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
        let gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
        let gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) n0 = 0; else { t0 *= t0; n0 = t0 * t0 * this.dot(this.gradP[gi0], x0, y0, z0); }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) n1 = 0; else { t1 *= t1; n1 = t1 * t1 * this.dot(this.gradP[gi1], x1, y1, z1); }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) n2 = 0; else { t2 *= t2; n2 = t2 * t2 * this.dot(this.gradP[gi2], x2, y2, z2); }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) n3 = 0; else { t3 *= t3; n3 = t3 * t3 * this.dot(this.gradP[gi3], x3, y3, z3); }
        return 32.0 * (n0 + n1 + n2 + n3);
    }
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    phase: number;
}

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();
    const scrollProgressRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const lastTimestampRef = useRef<number>(0);
    const simplexRef = useRef<SimplexNoise>(new SimplexNoise());

    const initParticles = useCallback((width: number, height: number) => {
        const count = 180; // optimal performance/richness
        const particles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: 1.5 + Math.random() * 2.5,
                phase: Math.random() * Math.PI * 2,
            });
        }
        return particles;
    }, []);

    const getIntensity = useCallback(() => {
        const t = scrollProgressRef.current;
        // exponential ease-out for dramatic build-up
        return 0.3 + Math.pow(t, 1.4) * 1.8;
    }, []);

    const updateParticles = useCallback((deltaFactor: number, width: number, height: number) => {
        const intensity = getIntensity();
        const time = timeRef.current;
        const simplex = simplexRef.current;
        const curlStrength = 0.8 + intensity * 2.0;
        const speedFactor = 0.5 + intensity * 1.5;

        for (const p of particlesRef.current) {
            // Curl noise field: sample simplex at particle position + time
            const nx = p.x * 0.006;
            const ny = p.y * 0.006;
            const nz = time * 0.8;
            const noiseX = simplex.noise3D(nx, ny, nz);
            const noiseY = simplex.noise3D(nx + 100, ny + 50, nz + 200);
            // Curl-like velocity (rotate noise gradients)
            const targetVx = -noiseY * curlStrength;
            const targetVy = noiseX * curlStrength;

            // Scroll-driven additional drift
            const scrollDriftX = Math.sin(p.phase + time) * intensity * 0.6;
            const scrollDriftY = Math.cos(p.phase * 1.3 + time) * intensity * 0.6;

            p.vx += (targetVx + scrollDriftX - p.vx) * 0.05;
            p.vy += (targetVy + scrollDriftY - p.vy) * 0.05;

            const maxSpeed = 1.2 + intensity * 2.2;
            p.vx = Math.min(maxSpeed, Math.max(-maxSpeed, p.vx));
            p.vy = Math.min(maxSpeed, Math.max(-maxSpeed, p.vy));

            p.x += p.vx * speedFactor * deltaFactor;
            p.y += p.vy * speedFactor * deltaFactor;

            if (p.x < -50) p.x = width + 50;
            if (p.x > width + 50) p.x = -50;
            if (p.y < -50) p.y = height + 50;
            if (p.y > height + 50) p.y = -50;
        }
    }, [getIntensity]);

    const drawNetwork = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const intensity = getIntensity();
        const particles = particlesRef.current;
        const maxDistance = 100 + intensity * 60;
        const lineWidth = 0.6 + intensity * 1.2;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDistance) {
                    const opacity = 0.25 * (1 - dist / maxDistance) * (0.4 + intensity * 0.8);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(201, 160, 61, ${opacity})`; // gold connections
                    ctx.lineWidth = lineWidth;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }, [getIntensity]);

    const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const intensity = getIntensity();
        const time = timeRef.current;
        for (const p of particlesRef.current) {
            // Gold/warm bronze color shift with scroll intensity
            const hue = 45 + intensity * 20; // gold range
            const sat = 60 + intensity * 30;
            const light = 55 + intensity * 15;
            const radius = p.size * (0.7 + intensity * 0.8);
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${0.7 + intensity * 0.2})`;
            ctx.shadowBlur = intensity * 6;
            ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.6)`;
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }, [getIntensity]);

    const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const intensity = getIntensity();
        // Luxury gradient: deep charcoal to warm bronze
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `hsl(0, 0%, 8%)`); // near black
        grad.addColorStop(0.5, `hsl(30, 25%, 12%)`);
        grad.addColorStop(1, `hsl(35, 30%, 10%)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle gold mist at high scroll
        if (intensity > 0.6) {
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = `rgba(201, 160, 61, ${(intensity - 0.6) * 0.15})`;
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';
        }
    }, [getIntensity]);

    const renderFrame = useCallback((timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
        let delta = Math.min(0.033, (timestamp - lastTimestampRef.current) / 1000);
        if (delta < 0.005) delta = 0.016;
        lastTimestampRef.current = timestamp;

        timeRef.current += delta * 0.7;
        updateParticles(delta * 25, width, height);
        drawBackground(ctx, width, height);
        drawNetwork(ctx, width, height);
        drawParticles(ctx, width, height);

        animationRef.current = requestAnimationFrame(renderFrame);
    }, [updateParticles, drawBackground, drawNetwork, drawParticles]);

    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }
            particlesRef.current = initParticles(width, height);
        };

        resizeCanvas();
        const unsubscribe = ScrollManager.getInstance().subscribe((progress) => {
            scrollProgressRef.current = progress;
        });
        animationRef.current = requestAnimationFrame(renderFrame);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            unsubscribe();
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [initParticles, renderFrame]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-90" />;
}