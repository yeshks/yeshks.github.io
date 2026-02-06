/* ==========================================
   Yesh Singh Portfolio - Interactive Terminal & Easter Eggs
   ========================================== */

// ==========================================
// Terminal Commands
// ==========================================
const commands = {
    help: `Available commands:
  whoami      - Who is Yesh?
  experience  - Work history
  skills      - Tech stack
  contact     - Get in touch
  clear       - Clear terminal
  sudo hire-me - ???`,

    whoami: `Senior Software Engineer @ Slack
Building AI infrastructure & developer tools
Seattle, WA`,

    experience: `Slack (2025-Present)
  Senior SWE - Platform Technical Architecture
  Building MCP server for AI integrations

Amazon (2020-2025)
  SDE II - 5 years
  Fintech compliance, event-driven systems
  VP Award + Director Recognition

Walmart (2019-2020)
  SWE III - Search & Personalization
  $2M+ weekly revenue impact`,

    skills: `Languages: Java, Python, TypeScript, Hack, Go, Scala, Rust

Cloud: AWS, Azure, Kubernetes, Terraform, Docker

AI/ML: MCP, LLM Tools, AI Agents, OpenAI, Claude

Arch: Distributed Systems, Event-Driven, System Design`,

    contact: `Email:    yeshkumar95@gmail.com
LinkedIn: linkedin.com/in/yeshks
GitHub:   github.com/yeshks

Or just scroll down :)`,

    'sudo hire-me': 'EASTER_EGG'
};

// ==========================================
// Terminal Logic
// ==========================================
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const initialResponse = document.getElementById('initial-response');

// Initial typing animation
setTimeout(() => {
    initialResponse.textContent = commands.whoami;
}, 1200);

// Handle terminal input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        processCommand(cmd);
        terminalInput.value = '';
    }
});

function processCommand(cmd) {
    // Add the command to output
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="prompt">$</span> ${escapeHtml(cmd)}`;
    terminalOutput.appendChild(cmdLine);

    // Process and add response
    const response = document.createElement('div');
    response.className = 'terminal-response';

    if (cmd === 'clear') {
        // Clear terminal
        terminalOutput.innerHTML = '';
        return;
    } else if (cmd === 'sudo hire-me') {
        // Easter egg! Transform terminal into job offer
        response.innerHTML = `<span style="color: #2EB67D;">Password accepted...</span>`;
        terminalOutput.appendChild(response);

        // Trigger the terminal transformation
        setTimeout(() => {
            transformTerminalToOffer();
        }, 800);
        return; // Don't add response again
    } else if (commands[cmd]) {
        response.textContent = commands[cmd];
    } else if (cmd === '') {
        return;
    } else {
        response.innerHTML = `<span style="color: #E01E5A;">Command not found: ${escapeHtml(cmd)}</span>
Type 'help' for available commands.`;
    }

    terminalOutput.appendChild(response);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// Konami Code Easter Egg
// ==========================================
const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    // Skip if typing in terminal
    if (document.activeElement === terminalInput) return;

    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Konami code complete!
            triggerKonamiEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerKonamiEasterEgg() {
    triggerConfetti();
    document.body.classList.add('easter-egg-active');
    setTimeout(() => document.body.classList.remove('easter-egg-active'), 2000);

    // Show message in terminal
    const response = document.createElement('div');
    response.className = 'terminal-response';
    response.innerHTML = `<span style="color: #ECB22E;">
 KONAMI CODE ACTIVATED!

You found the secret! You're clearly someone
who pays attention to details. I like that.

Here's a virtual high-five: </span>`;

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="prompt">$</span> <span style="color: #36C5F0;">[secret]</span>`;

    terminalOutput.appendChild(cmdLine);
    terminalOutput.appendChild(response);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// ==========================================
// Confetti Animation
// ==========================================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.colors = ['#4A154B', '#36C5F0', '#2EB67D', '#ECB22E', '#E01E5A'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.speedY += 0.05; // gravity
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;

        if (this.shape === 'rect') {
            ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

function triggerConfetti() {
    // Create initial burst of particles
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new ConfettiParticle());
    }

    // Add more particles over time for continuous effect
    const intervalId = setInterval(() => {
        for (let i = 0; i < 20; i++) {
            confettiParticles.push(new ConfettiParticle());
        }
    }, 200);

    // Start animation if not running
    if (!animationId) {
        animateConfetti();
    }

    // Stop after 3 seconds
    setTimeout(() => {
        clearInterval(intervalId);
    }, 3000);

    // Clean up after 5 seconds
    setTimeout(() => {
        confettiParticles = [];
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 5000);
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw all particles
    for (let i = 0; i < confettiParticles.length; i++) {
        confettiParticles[i].update();
        confettiParticles[i].draw();
    }

    // Remove off-screen particles (filter instead of splice during iteration)
    confettiParticles = confettiParticles.filter(p => p.y <= canvas.height + 50);

    if (confettiParticles.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    } else {
        animationId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ==========================================
// Terminal Transformation Easter Egg
// ==========================================
function transformTerminalToOffer() {
    const terminal = document.querySelector('.terminal');
    const terminalBody = document.getElementById('terminal-output');
    const inputLine = document.querySelector('.terminal-input-line');
    const backdrop = document.getElementById('terminal-backdrop');

    // Show backdrop
    backdrop.classList.add('active');

    // Add transformation class (slight delay for smooth animation)
    setTimeout(() => {
        terminal.classList.add('terminal-hired');
    }, 50);

    // Hide input line
    inputLine.style.display = 'none';

    // Transform content with animation
    terminalBody.innerHTML = `
        <div class="hire-animation">
            <div class="checkmark-circle">
                <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" stroke="#2EB67D" stroke-width="2"/>
                    <path fill="none" stroke="#2EB67D" stroke-width="3" d="M14 27l7 7 16-16" class="checkmark-path"/>
                </svg>
            </div>
            <h3 class="hire-title">OFFER ACCEPTED!</h3>
            <p class="hire-subtitle">Welcome to the team, recruiter!</p>
            <div class="hire-details">
                <p>Position: <strong>Your Next Great Hire</strong></p>
                <p>Start Date: <strong>Whenever you're ready</strong></p>
                <p>Salary: <strong>Let's talk</strong></p>
            </div>
            <div class="hire-contact">
                <p>Seriously though, I'm open to opportunities!</p>
                <a href="mailto:yeshkumar95@gmail.com" class="hire-btn">
                    <i class="fas fa-envelope"></i> Get in Touch
                </a>
            </div>
            <button class="reset-terminal" onclick="resetTerminal()">
                <i class="fas fa-redo"></i> Back to Terminal
            </button>
        </div>
    `;

    // Trigger background effect
    document.body.classList.add('easter-egg-active');
    setTimeout(() => document.body.classList.remove('easter-egg-active'), 2000);
}

function resetTerminal() {
    const terminal = document.querySelector('.terminal');
    const terminalBody = document.getElementById('terminal-output');
    const inputLine = document.querySelector('.terminal-input-line');
    const backdrop = document.getElementById('terminal-backdrop');

    // Remove transformation class
    terminal.classList.remove('terminal-hired');

    // Hide backdrop
    backdrop.classList.remove('active');

    // Show input line
    inputLine.style.display = 'flex';

    // Reset content
    terminalBody.innerHTML = `
        <div class="terminal-line">
            <span class="prompt">$</span> <span>whoami</span>
        </div>
        <div class="terminal-response">Senior Software Engineer @ Slack
Building AI infrastructure & developer tools
Seattle, WA</div>
    `;

    // Focus input
    document.getElementById('terminal-input').focus();
}

// ==========================================
// Focus terminal on page load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Optional: focus terminal after a short delay
    setTimeout(() => {
        terminalInput.focus();
    }, 2000);

    // Close modal when clicking backdrop
    document.getElementById('terminal-backdrop').addEventListener('click', () => {
        if (document.querySelector('.terminal').classList.contains('terminal-hired')) {
            resetTerminal();
        }
    });

    // Initialize photo carousel
    initPhotoCarousel();
});

// ==========================================
// Photo Carousel Easter Egg
// ==========================================
const photos = [
    'https://picsum.photos/id/1018/1200/800', // Mountain landscape
    'https://picsum.photos/id/1015/1200/800', // River
    'https://picsum.photos/id/1019/1200/800', // Nature
    'https://picsum.photos/id/1043/1200/800', // Ocean
    'https://picsum.photos/id/1047/1200/800', // Beach
    'https://picsum.photos/id/1039/1200/800'  // Mountains
];

let photoClickCount = 0;
let photoClickTimer = null;
let currentPhotoIndex = 0;

function initPhotoCarousel() {
    const photoTrigger = document.getElementById('photo-trigger');
    const carousel = document.getElementById('photo-carousel');
    const carouselImage = document.getElementById('carousel-image');
    const carouselCounter = document.getElementById('carousel-counter');
    const closeBtn = document.getElementById('carousel-close');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    // Click counter for emoji
    photoTrigger.addEventListener('click', () => {
        photoClickCount++;

        // Reset timer on each click
        clearTimeout(photoClickTimer);
        photoClickTimer = setTimeout(() => {
            photoClickCount = 0;
        }, 1000);

        // Wiggle animation on each click
        photoTrigger.classList.add('wiggle');
        setTimeout(() => photoTrigger.classList.remove('wiggle'), 300);

        // Trigger on 3rd click
        if (photoClickCount >= 3) {
            photoClickCount = 0;
            clearTimeout(photoClickTimer);

            // Explode animation
            photoTrigger.classList.add('explode');
            setTimeout(() => {
                photoTrigger.classList.remove('explode');
                openCarousel();
            }, 400);
        }
    });

    // Open carousel
    function openCarousel() {
        currentPhotoIndex = 0;
        updateCarouselImage();
        carousel.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close carousel
    function closeCarousel() {
        carousel.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update displayed image
    function updateCarouselImage() {
        carouselImage.classList.add('fade-out');
        setTimeout(() => {
            carouselImage.src = photos[currentPhotoIndex];
            carouselImage.onload = () => {
                carouselImage.classList.remove('fade-out');
            };
            carouselCounter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
        }, 150);
    }

    // Navigate to next photo
    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateCarouselImage();
    }

    // Navigate to previous photo
    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateCarouselImage();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeCarousel);
    nextBtn.addEventListener('click', nextPhoto);
    prevBtn.addEventListener('click', prevPhoto);

    // Close on backdrop click
    carousel.addEventListener('click', (e) => {
        if (e.target === carousel) {
            closeCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!carousel.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeCarousel();
                break;
            case 'ArrowRight':
                nextPhoto();
                break;
            case 'ArrowLeft':
                prevPhoto();
                break;
        }
    });
}

