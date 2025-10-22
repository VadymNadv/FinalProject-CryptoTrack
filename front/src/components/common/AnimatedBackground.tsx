// src/components/common/AnimatedBackground.tsx

import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;


            constructor(canvas: HTMLCanvasElement) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() - 0.5;
                this.speedY = Math.random() - 0.5;
            }

            update(canvas: HTMLCanvasElement) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = 'rgba(240, 185, 11, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                //Передаємо canvas при створенні нової частинки
                particles.push(new Particle(canvas));
            }
        };
        init();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const particle of particles) {
                particle.update(canvas);
                particle.draw(ctx);
            }

            connectParticles(ctx);
            animationFrameId = requestAnimationFrame(animate);
        };

        const connectParticles = (ctx: CanvasRenderingContext2D) => {
            const connectRadius = 100;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectRadius) {
                        ctx.strokeStyle = `rgba(240, 185, 11, ${1 - distance / connectRadius})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        animate();

        const handleResize = () => {
            resizeCanvas();
            init();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0"
        />
    );
};

export default AnimatedBackground;