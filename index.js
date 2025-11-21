class Toroid3D {
    constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.rotation = { x: 0, y: 0, z: 0 };
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            this.animate();
            }

    resizeCanvas() {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
            }

    draw() {
                const ctx = this.ctx;
                const w = this.canvas.width;
                const h = this.canvas.height;
                const centerX = w / 2;
                const centerY = h / 2;

                ctx.clearRect(0, 0, w, h);
                ctx.strokeStyle = '#32b8c6';
                ctx.lineWidth = 1.5;

                const R = 80;
                const r = 40;
                const steps = 60;

                for (let i = 0; i < steps; i++) {
                    const theta = (i / steps) * Math.PI * 2;
                    for (let j = 0; j < steps; j++) {
                        const phi = (j / steps) * Math.PI * 2;
                        
                        const x = (R + r * Math.cos(phi)) * Math.cos(theta);
                        const y = (R + r * Math.cos(phi)) * Math.sin(theta);
                        const z = r * Math.sin(phi);

                        const rotatedX = x * Math.cos(this.rotation.y) - z * Math.sin(this.rotation.y);
                        const rotatedZ = x * Math.sin(this.rotation.y) + z * Math.cos(this.rotation.y);
                        const rotatedY = y * Math.cos(this.rotation.x) - rotatedZ * Math.sin(this.rotation.x);

                        const screenX = centerX + rotatedX;
                        const screenY = centerY + rotatedY;

                        if (j > 0) {
                            ctx.lineTo(screenX, screenY);
                        } else {
                            ctx.beginPath();
                            ctx.moveTo(screenX, screenY);
                        }
                    }
                    ctx.stroke();
                }

                this.rotation.x += 0.003;
                this.rotation.y += 0.005;
            }

    animate() {
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

class PerlinMesh {
        constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.time = 0;
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                this.animate();
            }

        resizeCanvas() {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
            }

        noise(x, y, t) {
                return Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t * 0.7) * 0.5 + 0.5;
            }

        draw() {
                const ctx = this.ctx;
                const w = this.canvas.width;
                const h = this.canvas.height;

                ctx.clearRect(0, 0, w, h);
                ctx.strokeStyle = '#2da6b2';
                ctx.lineWidth = 1;

                const gridSize = 30;
                const cols = Math.floor(w / gridSize);
                const rows = Math.floor(h / gridSize);

                for (let i = 0; i < rows; i++) {
                    ctx.beginPath();
                    for (let j = 0; j <= cols; j++) {
                        const x = j * gridSize;
                        const y = i * gridSize + this.noise(j, i, this.time) * 20;
                        if (j === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.stroke();
                }

                for (let j = 0; j < cols; j++) {
                    ctx.beginPath();
                    for (let i = 0; i <= rows; i++) {
                        const x = j * gridSize + this.noise(j, i, this.time) * 20;
                        const y = i * gridSize;
                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.stroke();
                }

                this.time += 0.01;
            }

        animate() {
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

class SphereWaves {
        constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.rotation = 0;
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                this.animate();
            }

        resizeCanvas() {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
            }

        draw() {
                const ctx = this.ctx;
                const w = this.canvas.width;
                const h = this.canvas.height;
                const centerX = w / 2;
                const centerY = h / 2;

                ctx.clearRect(0, 0, w, h);
                ctx.strokeStyle = '#32b8c6';
                ctx.lineWidth = 1.5;

                const radius = 60;
                const latitudes = 15;
                const longitudes = 20;

                for (let lat = 0; lat < latitudes; lat++) {
                    ctx.beginPath();
                    for (let lon = 0; lon <= longitudes; lon++) {
                        const theta = (lon / longitudes) * Math.PI * 2;
                        const phi = (lat / latitudes) * Math.PI;

                        const wave = Math.sin(phi * 3 + this.rotation * 2) * 5;
                        const r = radius + wave;

                        const x2 = r * Math.sin(phi) * Math.cos(theta + this.rotation);
                        const y2 = r * Math.sin(phi) * Math.sin(theta + this.rotation);

                        const screenX = centerX + x2;
                        const screenY = centerY + y2;

                        if (lon === 0) {
                            ctx.moveTo(screenX, screenY);
                        } else {
                            ctx.lineTo(screenX, screenY);
                        }
                    }
                    ctx.stroke();
                }

                this.rotation += 0.01;
            }

        animate() {
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

class RotatingCube {
    constructor(canvas) {
                this.canvas = canvas instanceof HTMLCanvasElement ? canvas : document.getElementById(canvas);
                if (!this.canvas) return;
                this.ctx = this.canvas.getContext('2d');
                this.rotation = { x: 0, y: 0 };
                this.animate();
            }

    draw() {
                const ctx = this.ctx;
                const w = this.canvas.width;
                const h = this.canvas.height;
                const centerX = w / 2;
                const centerY = h / 2;

                ctx.clearRect(0, 0, w, h);
                ctx.strokeStyle = '#2da6b2';
                ctx.lineWidth = 1.5;

                const size = 20;
                const vertices = [
                    [-size, -size, -size], [size, -size, -size],
                    [size, size, -size], [-size, size, -size],
                    [-size, -size, size], [size, -size, size],
                    [size, size, size], [-size, size, size]
                ];

                const edges = [
                    [0, 1], [1, 2], [2, 3], [3, 0],
                    [4, 5], [5, 6], [6, 7], [7, 4],
                    [0, 4], [1, 5], [2, 6], [3, 7]
                ];

                const scale = Math.min(w, h) / 50;
                const rotated = vertices.map(v => {
                    let [x, y, z] = v;
                    x *= scale;
                    y *= scale;
                    z *= scale;
                    
                    const x1 = x * Math.cos(this.rotation.y) - z * Math.sin(this.rotation.y);
                    const z1 = x * Math.sin(this.rotation.y) + z * Math.cos(this.rotation.y);
                    
                    const y1 = y * Math.cos(this.rotation.x) - z1 * Math.sin(this.rotation.x);
                    const z2 = y * Math.sin(this.rotation.x) + z1 * Math.cos(this.rotation.x);
                    
                    return [centerX + x1, centerY + y1, z2];
                });

                edges.forEach(([i, j]) => {
                    ctx.beginPath();
                    ctx.moveTo(rotated[i][0], rotated[i][1]);
                    ctx.lineTo(rotated[j][0], rotated[j][1]);
                    ctx.stroke();
                });

                this.rotation.x += 0.01;
                this.rotation.y += 0.015;
            }

    animate() {
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

class ParticleNetwork {
    constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.resizeCanvas();
                this.createParticles();
                window.addEventListener('resize', () => {
                    this.resizeCanvas();
                    this.createParticles();
                });
                this.animate();
            }

    resizeCanvas() {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
            }

    createParticles() {
                this.particles = [];
                const numParticles = 40;
                for (let i = 0; i < numParticles; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        z: Math.random() * 200 - 100,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        vz: (Math.random() - 0.5) * 0.5
                    });
                }
            }

    draw() {
                const ctx = this.ctx;
                const w = this.canvas.width;
                const h = this.canvas.height;

                ctx.clearRect(0, 0, w, h);

                this.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.z += p.vz;

                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                    if (p.z < -100 || p.z > 100) p.vz *= -1;
                });

                ctx.strokeStyle = '#32b8c6';
                ctx.lineWidth = 0.5;

                for (let i = 0; i < this.particles.length; i++) {
                    for (let j = i + 1; j < this.particles.length; j++) {
                        const p1 = this.particles[i];
                        const p2 = this.particles[j];
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dz = p1.z - p2.z;
                        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                        if (dist < 120) {
                            const alpha = 1 - dist / 120;
                            ctx.strokeStyle = `rgba(50, 184, 198, ${alpha * 0.3})`;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }

                this.particles.forEach(p => {
                    const scale = 1 + p.z / 200;
                    const size = 2 * scale;
                    ctx.fillStyle = '#32b8c6';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

    animate() {
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'David Daza',
                'Full Stack and Data Science',

            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navbarLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
}

document.addEventListener('DOMContentLoaded', () => {
initNavbar();
initTypewriter();
new Toroid3D('heroToroid');
new PerlinMesh('skillsPerlin');
new SphereWaves('sphereWaves');
new ParticleNetwork('particleNetwork');
            
setTimeout(() => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        const canvas = document.createElement('canvas');
        canvas.className = 'project-card-corner';
        canvas.width = 50;
        canvas.height = 50;
        card.style.position = 'relative';
        card.appendChild(canvas);
        new RotatingCube(canvas);
    });
}, 100);
            
setTimeout(() => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card) => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '8px';
        canvas.style.right = '8px';
        canvas.style.width = '40px';
        canvas.style.height = '40px';
        canvas.style.opacity = '0.2';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.width = 40;
        canvas.height = 40;
        card.appendChild(canvas);
        new RotatingCube(canvas);
    });
}, 200);
});


