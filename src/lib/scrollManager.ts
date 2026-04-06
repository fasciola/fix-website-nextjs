export class ScrollManager {
    private static instance: ScrollManager;
    private progress: number = 0;
    private listeners: Set<(progress: number) => void> = new Set();

    private constructor() {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll, { passive: true });
            window.addEventListener('resize', this.handleScroll);
            this.handleScroll();
        }
    }

    static getInstance(): ScrollManager {
        if (!ScrollManager.instance) {
            ScrollManager.instance = new ScrollManager();
        }
        return ScrollManager.instance;
    }

    private handleScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        this.progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
        this.listeners.forEach(listener => listener(this.progress));
    };

    subscribe(listener: (progress: number) => void): () => void {
        this.listeners.add(listener);
        listener(this.progress);
        return () => this.listeners.delete(listener);
    }

    getProgress(): number {
        return this.progress;
    }
}