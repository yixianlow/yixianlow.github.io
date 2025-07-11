// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all section content elements
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive floating elements
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.2) rotate(10deg)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
        
        // Add click interaction
        element.addEventListener('click', () => {
            const messages = [
                'Hello! 👋',
                'Nice to meet you! ✨',
                'Let\'s code together! 💻',
                'Ready to build! 🚀',
                'Woof! 🐕'
            ];
            
            // Create a temporary message bubble
            const message = document.createElement('div');
            message.textContent = messages[index % messages.length];
            message.style.cssText = `
                position: absolute;
                background: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                font-size: 1rem;
                font-weight: 600;
                color: #667eea;
                pointer-events: none;
                z-index: 1000;
                animation: messagePop 2s ease-out forwards;
            `;
            
            // Position the message near the element
            const rect = element.getBoundingClientRect();
            message.style.left = rect.left + 'px';
            message.style.top = (rect.top - 50) + 'px';
            
            document.body.appendChild(message);
            
            // Remove message after animation
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 2000);
        });
    });
});

// Add CSS for message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes messagePop {
        0% {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
        }
        20% {
            opacity: 1;
            transform: translateY(-5px) scale(1.1);
        }
        80% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add typing effect to the tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, originalText, 80);
        }, 1000);
    }
});

// Add hover effects to skill tags
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add particle effect to the hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    particle.style.animation = `particleFloat ${duration}s ${delay}s linear infinite`;
    
    document.querySelector('.hero').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 2000);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        });
        
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        });
        
        if (currentSection) {
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.tagName === 'SECTION') {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Add confetti effect on social link clicks
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Create confetti effect
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createConfetti(e.clientX, e.clientY);
                }, i * 100);
            }
        });
    });
    
    // Hide scroll indicator when user scrolls
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
                scrollIndicator.style.transition = 'all 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
            }
        });
    }
});

function createConfetti(x, y) {
    const confetti = document.createElement('div');
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#ffe66d'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: ${color};
        border-radius: 2px;
        pointer-events: none;
        z-index: 10000;
        animation: confettiFall 1s ease-out forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 1000);
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(100px) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle); 