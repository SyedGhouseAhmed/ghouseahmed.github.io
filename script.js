// ============================================
// GHOUSE AHMED SYED — Keeper of the Bridge
// script.js — All Animations & Interactions
// ============================================

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        // Animate hero heading lines
        document.querySelectorAll('.hh-line').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150 + 200);
        });
        // Start counters
        startCounters();
    }, 1800);
});


// ===== CUSTOM CURSOR =====
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});

(function followRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(followRing);
})();

document.querySelectorAll('a, button, .camp-top, .dc, .cq-card, .arcat-pills span, .edu-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
        ring.style.borderColor = 'rgba(201,168,76,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'rgba(201,168,76,0.5)';
    });
});


// ===== NAVBAR =====
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});


// ===== STAT COUNTERS =====
function startCounters() {
    document.querySelectorAll('.hstat-n').forEach(el => {
        const target = parseInt(el.dataset.count);
        let count = 0;
        const inc = target / 60;
        const t = setInterval(() => {
            count += inc;
            if (count >= target) { el.textContent = target; clearInterval(t); }
            else el.textContent = Math.floor(count);
        }, 28);
    });
}


// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
    '.dc, .camp, .arcat, .cq-card, .edu-card, .plink, .form-card, .about-grid, .sec-label, .sec-title, .sec-quote'
);
revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
});
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));


// ===== CAMPAIGN ACCORDION =====
function toggleCampaign(header) {
    const camp = header.parentElement;
    const isOpen = camp.classList.contains('open');
    document.querySelectorAll('.camp').forEach(c => c.classList.remove('open'));
    if (!isOpen) camp.classList.add('open');
}


// ============================================
// CANVAS ANIMATIONS
// ============================================

// ===== BIFROST HERO CANVAS =====
(function initBifrost() {
    const canvas = document.getElementById('bifrost-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.6 ? '201,168,76' : Math.random() > 0.5 ? '240,237,230' : '11,123,110'
        });
    }

    // Light beams (Bifrost effect)
    const beams = [
        { x: canvas.width * 0.8, angle: -0.3, color: 'rgba(201,168,76,', width: 2 },
        { x: canvas.width * 0.85, angle: -0.1, color: 'rgba(11,123,110,', width: 1.5 },
        { x: canvas.width * 0.9, angle: 0.1, color: 'rgba(139,26,47,', width: 1 },
    ];

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        // Draw subtle grid
        ctx.strokeStyle = 'rgba(240,237,230,0.02)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < canvas.width; x += 80) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 80) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Draw light beams
        beams.forEach((beam, idx) => {
            const pulse = Math.sin(frame * 0.01 + idx * 1.5) * 0.05 + 0.08;
            const gradient = ctx.createLinearGradient(beam.x, 0, beam.x + Math.sin(beam.angle) * canvas.height, canvas.height);
            gradient.addColorStop(0, beam.color + '0)');
            gradient.addColorStop(0.3, beam.color + pulse + ')');
            gradient.addColorStop(0.7, beam.color + (pulse * 0.5) + ')');
            gradient.addColorStop(1, beam.color + '0)');
            ctx.save();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = beam.width + Math.sin(frame * 0.008) * 0.5;
            ctx.beginPath();
            ctx.moveTo(beam.x, 0);
            ctx.lineTo(beam.x + Math.sin(beam.angle) * canvas.height, canvas.height);
            ctx.stroke();
            ctx.restore();
        });

        // Draw particles & connections
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = `rgb(${p.color})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });

        // Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    ctx.save();
                    ctx.globalAlpha = (1 - d / 100) * 0.06;
                    ctx.strokeStyle = '#C9A84C';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== NEURAL NETWORK — ABOUT =====
(function initNeural() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    const nodes = [];
    for (let i = 0; i < 40; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 3 + 1,
            pulse: Math.random() * Math.PI * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy; n.pulse += 0.03;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        });

        // Draw connections
        nodes.forEach((a, i) => {
            nodes.slice(i + 1).forEach(b => {
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < 150) {
                    ctx.save();
                    ctx.globalAlpha = (1 - d / 150) * 0.08;
                    ctx.strokeStyle = '#C9A84C';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                    ctx.restore();
                }
            });
        });

        // Draw nodes
        nodes.forEach(n => {
            const glow = Math.sin(n.pulse) * 0.2 + 0.3;
            ctx.save();
            ctx.globalAlpha = glow;
            ctx.fillStyle = '#C9A84C';
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== DATA STREAMS — EXPERIENCE =====
(function initStream() {
    const canvas = document.getElementById('stream-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    const streams = [];
    for (let i = 0; i < 12; i++) {
        streams.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.15 + 0.05,
            color: Math.random() > 0.5 ? '201,168,76' : '11,123,110'
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        streams.forEach(s => {
            s.y += s.speed;
            if (s.y > canvas.height + s.length) { s.y = -s.length; s.x = Math.random() * canvas.width; }
            const grad = ctx.createLinearGradient(s.x, s.y - s.length, s.x, s.y);
            grad.addColorStop(0, `rgba(${s.color},0)`);
            grad.addColorStop(1, `rgba(${s.color},${s.opacity})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(s.x, s.y - s.length); ctx.lineTo(s.x, s.y); ctx.stroke();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== GRID — SKILLS =====
(function initGrid() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;
        const size = 40;
        for (let x = 0; x < canvas.width; x += size) {
            for (let y = 0; y < canvas.height; y += size) {
                const d = Math.hypot(x - canvas.width / 2, y - canvas.height / 2);
                const pulse = Math.sin(d * 0.01 - frame * 0.03) * 0.5 + 0.5;
                ctx.fillStyle = `rgba(201,168,76,${pulse * 0.04})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += size) {
            const a = Math.sin(frame * 0.01 + y * 0.01) * 0.03;
            ctx.strokeStyle = `rgba(240,237,230,${Math.abs(a)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== CONSTELLATION — PROJECTS =====
(function initConstellation() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    for (let i = 0; i < 60; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            pulse: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.01
        });
    }
    const lines = [];
    for (let i = 0; i < 12; i++) {
        const a = Math.floor(Math.random() * stars.length);
        let b = Math.floor(Math.random() * stars.length);
        while (b === a) b = Math.floor(Math.random() * stars.length);
        lines.push([a, b]);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => { s.pulse += s.speed; });

        lines.forEach(([ai, bi]) => {
            ctx.save();
            ctx.globalAlpha = 0.06;
            ctx.strokeStyle = '#C9A84C';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[ai].x, stars[ai].y);
            ctx.lineTo(stars[bi].x, stars[bi].y);
            ctx.stroke();
            ctx.restore();
        });

        stars.forEach(s => {
            const a = Math.sin(s.pulse) * 0.3 + 0.4;
            ctx.save();
            ctx.globalAlpha = a;
            ctx.fillStyle = '#F0EDE6';
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== STARS — EDUCATION =====
(function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1, pulse: Math.random() * Math.PI * 2, speed: Math.random() * 0.015 + 0.005 });
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.pulse += s.speed;
            ctx.save();
            ctx.globalAlpha = Math.sin(s.pulse) * 0.3 + 0.1;
            ctx.fillStyle = '#C9A84C';
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== PORTAL — CONTACT =====
(function initPortal() {
    const canvas = document.getElementById('portal-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;
        const cx = canvas.width * 0.5;
        const cy = canvas.height * 0.5;
        for (let r = 20; r < Math.max(canvas.width, canvas.height) * 0.8; r += 40) {
            const a = Math.sin(frame * 0.01 - r * 0.02) * 0.05 + 0.03;
            ctx.save();
            ctx.globalAlpha = a * (1 - r / (Math.max(canvas.width, canvas.height)));
            ctx.strokeStyle = '#C9A84C';
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== ECG / HEALTHCARE MINI CANVAS =====
(function initECG() {
    const canvas = document.getElementById('ecg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement ? canvas.offsetWidth : 200;
    canvas.height = 50;

    let offset = 0;
    function drawECG() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#8B1A2F';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const w = canvas.width;
        const h = canvas.height;
        const mid = h / 2;
        ctx.moveTo(0, mid);
        for (let x = 0; x < w; x++) {
            const t = (x + offset) / w;
            const seg = (t * 4) % 1;
            let y = mid;
            if (seg < 0.1) y = mid;
            else if (seg < 0.15) y = mid - h * 0.3;
            else if (seg < 0.2) y = mid + h * 0.4;
            else if (seg < 0.25) y = mid - h * 0.6;
            else if (seg < 0.3) y = mid - h * 0.1;
            else if (seg < 0.35) y = mid;
            else if (seg < 0.4) y = mid - h * 0.15;
            else if (seg < 0.45) y = mid;
            else y = mid;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        offset += 1;
        requestAnimationFrame(drawECG);
    }
    drawECG();
})();


// ===== ENERGY WAVE MINI CANVAS =====
(function initEnergy() {
    const canvas = document.getElementById('energy-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.height = 50;
    let frame = 0;
    function draw() {
        canvas.width = canvas.parentElement ? canvas.offsetWidth : 200;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#0B7B6E';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + Math.sin((x + frame) * 0.08) * 12 + Math.sin((x + frame) * 0.2) * 5;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        frame += 2;
        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== AI DOTS MINI CANVAS =====
(function initAI() {
    const canvas = document.getElementById('ai-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.height = 50;
    const nodes = [];
    for (let i = 0; i < 8; i++) nodes.push({ x: (i + 1) * 0.1, y: Math.random(), pulse: Math.random() * Math.PI * 2 });
    function draw() {
        canvas.width = canvas.parentElement ? canvas.offsetWidth : 200;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(n => { n.pulse += 0.05; n.y = 0.5 + Math.sin(n.pulse) * 0.3; });
        for (let i = 0; i < nodes.length - 1; i++) {
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.strokeStyle = '#C9A84C';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * canvas.width, nodes[i].y * canvas.height);
            ctx.lineTo(nodes[i + 1].x * canvas.width, nodes[i + 1].y * canvas.height);
            ctx.stroke();
            ctx.restore();
        }
        nodes.forEach(n => {
            ctx.save();
            ctx.fillStyle = '#C9A84C';
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(n.x * canvas.width, n.y * canvas.height, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();


// ===== CONTACT FORM =====
document.getElementById('sendBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('sendBtn');
    const name = document.querySelector('.form-card .fi[type="text"]')?.value;
    const email = document.querySelector('.form-card .fi[type="email"]')?.value;
    const msg = document.querySelector('.form-card .fi-ta')?.value;
    if (name && email && msg) {
        btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        btn.style.background = '#2ECC71';
        setTimeout(() => {
            btn.innerHTML = 'Send Through the Portal <i class="fas fa-paper-plane"></i>';
            btn.style.background = '';
        }, 3000);
    } else {
        btn.innerHTML = 'Please fill all fields <i class="fas fa-exclamation"></i>';
        btn.style.background = '#E74C3C';
        setTimeout(() => {
            btn.innerHTML = 'Send Through the Portal <i class="fas fa-paper-plane"></i>';
            btn.style.background = '';
        }, 2000);
    }
});
