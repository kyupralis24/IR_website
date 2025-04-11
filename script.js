document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const backgroundSections = document.querySelectorAll('.background-section');
    const header = document.querySelector('header');

    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '▼';
    document.body.appendChild(scrollIndicator);

    // Add parallax effect to header and backgrounds
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Update header parallax
        header.style.backgroundPositionY = -(scrolled * 0.5) + 'px';

        // Update background sections
        backgroundSections.forEach((bg, index) => {
            const sectionTop = sections[index]?.offsetTop || 0;
            const sectionBottom = sectionTop + (sections[index]?.offsetHeight || 0);

            if (scrolled >= sectionTop - windowHeight * 0.5 &&
                scrolled <= sectionBottom + windowHeight * 0.5) {
                bg.classList.add('active');
            } else {
                bg.classList.remove('active');
            }

            // Add parallax effect
            bg.style.transform = `translateY(${scrolled * 0.2}px)`;
        });

        // Hide scroll indicator when scrolled
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';

                // Add glitch effect to headings
                const heading = entry.target.querySelector('h2');
                if (heading) {
                    heading.classList.add('glitch');
                    setTimeout(() => {
                        heading.classList.remove('glitch');
                    }, 1000);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Add initial styles and observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) rotate(2deg)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Enhanced 8-bit style cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // Add cursor trail
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update cursor position
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Animate trail
        const animate = () => {
            const diffX = mouseX - trailX;
            const diffY = mouseY - trailY;

            trailX += diffX * 0.1;
            trailY += diffY * 0.1;

            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';

            requestAnimationFrame(animate);
        };

        animate();
    });

    // Enhanced click effect
    document.addEventListener('click', (e) => {
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.left = e.clientX + 'px';
        clickEffect.style.top = e.clientY + 'px';
        document.body.appendChild(clickEffect);

        // Add multiple particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.transform = `rotate(${i * 45}deg)`;
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        setTimeout(() => {
            clickEffect.remove();
        }, 1000);
    });

    // Add keyboard interaction
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        }
    });
}); 