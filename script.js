/* ========================================
   BIRTHDAY CELEBRATION PAGE — SCRIPT.JS
   For Tini 🎂
   ======================================== */

(function () {
    'use strict';

    // ================== CONFIG ==================
    const CONFIG = {
        anniversaryDate: new Date('2021-11-09T00:00:00'),
        birthdayDate: new Date('2003-05-10'), // Tanggal lahir Tini
        waNumber: '6282285054021',
        partnerName: 'Tini',
        birthdayMessage: `Dear Tini,

Happy Birthday Love! 🩶🩶🩶

Today isn’t just about getting a year older; it’s about celebrating the presence of someone who means so much to me. Every moment with you always feels special, and I’m grateful that fate brought us together.

Ever since we met, you’ve brought a warmth that’s hard to put into words. Your smile is soothing, your care makes me feel at home, and your presence makes my days far more beautiful than before.

On your special day, I want you to know that you are one of the biggest reasons I believe love can feel so comforting and genuine. You’re not just someone I love, but also the best person to share stories, laughter, dreams, and even the simplest little things with.

I hope that in this new chapter of your life, all good things will always find their way to you. May every step you take be filled with happiness, health, and all the dreams that slowly come true. And may I still be the one standing by your side on every journey of your life.

Thank you for being here and making my life feel more complete. Thank you for always being the home I long for the most..

"Hoping for you now
I pray for you now
Feels the same as the way I am"

Happy Birthday, my love! 🎂🎂🎂 🩶🩶🩶
Always yours,
🩶🩶🩶`
    };

    // ================== MOBILE OPTIMIZATIONS ==================
    // Prevent zoom on double tap for iOS (only on specific elements, not document)
    const preventZoomElements = document.querySelectorAll('button, .voucher-card, .polaroid-card');
    preventZoomElements.forEach(element => {
        let lastTouchEnd = 0;
        element.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    });

    // Smooth scroll polyfill for older mobile browsers
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

    // ================== CALCULATE AGE ==================
    function calculateAge() {
        const today = new Date();
        const birthDate = CONFIG.birthdayDate;
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        document.getElementById('currentAge').textContent = age;
    }

    calculateAge();

    // ================== ANIMATED COUNTDOWN (FROM BIRTH TO NOW) ==================
    let countdownInterval = null;
    let animationComplete = false;

    function calculateTimeDifference(startDate, endDate) {
        // Calculate total difference
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();
        
        // Calculate time difference
        let hours = endDate.getHours() - startDate.getHours();
        let minutes = endDate.getMinutes() - startDate.getMinutes();
        let seconds = endDate.getSeconds() - startDate.getSeconds();
        
        // Adjust negatives for time
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        
        // Adjust negatives for date
        if (days < 0) {
            const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { 
            months += 12; 
            years--; 
        }

        return { years, months, days, hours, minutes, seconds };
    }

    function animateCountdownFromBirth() {
        const startDate = new Date('2003-05-10T00:00:00'); // Tanggal lahir Tini
        const targetDate = new Date('2026-05-10T00:00:00'); // Target tanggal ulang tahun
        
        // Calculate final values for animation
        const finalValues = calculateTimeDifference(startDate, targetDate);

        const el = (id) => document.getElementById(id);
        const countYearsEl = el('countYears');
        const countMonthsEl = el('countMonths');
        const countDaysEl = el('countDays');
        const countHoursEl = el('countHours');
        const countMinutesEl = el('countMinutes');
        const countSecondsEl = el('countSeconds');

        // Animation settings
        const duration = 3000; // 3 seconds animation
        const fps = 60;
        const totalFrames = (duration / 1000) * fps;
        let currentFrame = 0;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function animate() {
            currentFrame++;
            const progress = easeOutQuart(currentFrame / totalFrames);

            // Animate numbers
            const currentYears = Math.floor(finalValues.years * progress);
            const currentMonths = Math.floor(finalValues.months * progress);
            const currentDays = Math.floor(finalValues.days * progress);
            const currentHours = Math.floor(finalValues.hours * progress);
            const currentMinutes = Math.floor(finalValues.minutes * progress);
            const currentSeconds = Math.floor(finalValues.seconds * progress);

            countYearsEl.textContent = currentYears;
            countMonthsEl.textContent = currentMonths;
            countDaysEl.textContent = currentDays;
            countHoursEl.textContent = currentHours;
            countMinutesEl.textContent = currentMinutes;
            countSecondsEl.textContent = currentSeconds;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - start real-time countdown
                animationComplete = true;
                startRealTimeCountdown();
                
                // Check if we've reached the target date
                const now = new Date();
                if (now >= targetDate) {
                    // Show "23 Years of Awesomeness!" message
                    setTimeout(() => {
                        showAgeAchievement();
                    }, 500);
                }
            }
        }

        // Start animation
        animate();
    }

    function startRealTimeCountdown() {
        const startDate = new Date('2003-05-10T00:00:00');
        
        function updateRealTime() {
            const now = new Date();
            const diff = calculateTimeDifference(startDate, now);

            const el = (id) => document.getElementById(id);
            
            // Add flip animation class
            const elements = [
                { id: 'countYears', value: diff.years },
                { id: 'countMonths', value: diff.months },
                { id: 'countDays', value: diff.days },
                { id: 'countHours', value: diff.hours },
                { id: 'countMinutes', value: diff.minutes },
                { id: 'countSeconds', value: diff.seconds }
            ];

            elements.forEach(({ id, value }) => {
                const element = el(id);
                const currentValue = parseInt(element.textContent);
                
                if (currentValue !== value) {
                    element.classList.add('flip');
                    element.textContent = value;
                    
                    setTimeout(() => {
                        element.classList.remove('flip');
                    }, 600);
                }
            });
        }

        // Update immediately
        updateRealTime();
        
        // Update every second
        countdownInterval = setInterval(updateRealTime, 1000);
    }

    function showAgeAchievement() {
        const countdownContainer = document.querySelector('.countdown-container');
        const countdownLabel = document.querySelector('.countdown-label');
        
        // Update label
        countdownLabel.style.transition = 'all 0.5s ease';
        countdownLabel.style.opacity = '0';
        
        setTimeout(() => {
            countdownLabel.textContent = 'TIME TOGETHER: OUR JOURNEY SO FAR';
            countdownLabel.style.opacity = '1';
        }, 500);

        // Add celebration effect to countdown items
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.1)';
                item.style.borderColor = 'var(--party-pink)';
                item.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.6)';
                
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 300);
            }, index * 100);
        });

        // Show age achievement banner
        setTimeout(() => {
            showAgeBanner();
        }, 1000);
    }

    function showAgeBanner() {
        // Create achievement banner
        const banner = document.createElement('div');
        banner.className = 'age-achievement-banner';
        banner.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, rgba(155, 89, 182, 0.95) 0%, rgba(255, 105, 180, 0.95) 100%);
            padding: 40px 60px;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            text-align: center;
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            max-width: 600px;
        `;

        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px; justify-content: center; flex-wrap: wrap;">
                <div style="font-family: var(--font-display); font-size: 6rem; font-weight: 700; color: var(--party-yellow); text-shadow: 0 0 30px rgba(241, 196, 15, 0.8); line-height: 1;">23</div>
                <div style="font-family: var(--font-script); font-size: 2.5rem; color: var(--party-pink); text-shadow: 0 0 20px rgba(255, 105, 180, 0.8); line-height: 1.3;">Years of<br>Awesomeness!</div>
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; font-size: 2rem;">
                🎉 🎂 ✨ 🎈 💖
            </div>
        `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
            }
            @keyframes popOut {
                0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(0) rotate(10deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(banner);

        // Add floating confetti around banner
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎊', '🎉', '✨', '💖', '🌟'][Math.floor(Math.random() * 5)];
            confetti.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                font-size: 2rem;
                pointer-events: none;
                z-index: 9998;
                animation: floatAway ${2 + Math.random() * 2}s ease-out forwards;
            `;
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 150 + Math.random() * 100;
            confetti.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            confetti.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }

        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes floatAway {
                0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
                20% { opacity: 1; }
                100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(floatStyle);

        // Remove banner after 3 seconds
        setTimeout(() => {
            banner.style.animation = 'popOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            setTimeout(() => banner.remove(), 400);
        }, 3000);

        // Click to dismiss
        banner.addEventListener('click', () => {
            banner.style.animation = 'popOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            setTimeout(() => banner.remove(), 400);
        });
    }

    // Start the animated countdown
    animateCountdownFromBirth();

    // ================== BLOW CANDLES ANIMATION ==================
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');
    const candles = document.querySelectorAll('.candle');
    let candlesBlown = false;

    blowCandlesBtn.addEventListener('click', function () {
        if (candlesBlown) return;
        
        candlesBlown = true;
        
        // Blow out candles one by one
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.classList.add('blown');
            }, index * 300);
        });

        // Change button text
        setTimeout(() => {
            blowCandlesBtn.innerHTML = '<span>✨ Wish Made! Continue ✨</span>';
            blowCandlesBtn.onclick = () => {
                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
            };
        }, 1500);

        // Trigger confetti
        triggerConfetti();
    });

    // ================== CONFETTI ANIMATION ==================
    function triggerConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiPieces = [];
        const colors = ['#FF69B4', '#9B59B6', '#3498DB', '#F1C40F', '#E67E22', '#2ECC71'];

        class ConfettiPiece {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.size = 5 + Math.random() * 10;
                this.speedY = 2 + Math.random() * 3;
                this.speedX = (Math.random() - 0.5) * 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height + 20) this.reset();
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            confettiPieces.push(new ConfettiPiece());
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiPieces.forEach((piece) => {
                piece.update();
                piece.draw();
            });
            requestAnimationFrame(animateConfetti);
        }

        animateConfetti();
    }

    // Start confetti on load
    triggerConfetti();

    // ================== SCROLL REVEAL (Intersection Observer) ==================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15,
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
        scrollObserver.observe(el);
    });

    // ================== POLAROID CAROUSEL ==================
    const carousel = document.getElementById('polaroidCarousel');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDots = document.getElementById('carouselDots');
    const polaroidCards = document.querySelectorAll('.polaroid-card');

    // Create dots
    polaroidCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToCard(index));
        carouselDots.appendChild(dot);
    });

    function scrollToCard(index) {
        const card = polaroidCards[index];
        carousel.scrollTo({
            left: card.offsetLeft - 50,
            behavior: 'smooth'
        });
        updateActiveDot(index);
    }

    function updateActiveDot(index) {
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    carouselPrev.addEventListener('click', () => {
        carousel.scrollBy({ left: -350, behavior: 'smooth' });
    });

    carouselNext.addEventListener('click', () => {
        carousel.scrollBy({ left: 350, behavior: 'smooth' });
    });

    // Update active dot on scroll
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = polaroidCards[0].offsetWidth + 30;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        updateActiveDot(activeIndex);
    });

    // ================== TYPEWRITER EFFECT FOR BIRTHDAY MESSAGE ==================
    const typewriterElement = document.getElementById('typewriterMessage');
    let typewriterStarted = false;

    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !typewriterStarted) {
                typewriterStarted = true;
                startTypewriter();
            }
        });
    }, { threshold: 0.3 });

    messageObserver.observe(document.getElementById('birthdayMessage'));

    function startTypewriter() {
        const text = CONFIG.birthdayMessage;
        let index = 0;
        const cursor = typewriterElement.querySelector('.typewriter-cursor');
        
        typewriterElement.textContent = '';
        typewriterElement.appendChild(cursor);

        function type() {
            if (index < text.length) {
                const char = text.charAt(index);
                const textNode = document.createTextNode(char);
                typewriterElement.insertBefore(textNode, cursor);
                index++;
                
                // Variable speed for more natural typing
                const speed = char === '\n' ? 100 : (Math.random() * 50 + 30);
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ================== PREMIUM VOUCHER REDEMPTION (SINGLE GIFT) ==================
    const premiumRedeemBtn = document.getElementById('premiumRedeemBtn');
    
    if (premiumRedeemBtn) {
        premiumRedeemBtn.addEventListener('click', function() {
            // Set the gift title
            selectedVoucher = 'Special Birthday Gift 🎁';
            confirmText.textContent = selectedVoucher;
            confirmModal.classList.add('active');
        });
    }

    // ================== VOUCHER SELECTION — WhatsApp (OLD CODE UPDATED) ==================
    const confirmModal = document.getElementById('confirmModal');
    const confirmText = document.getElementById('confirmModalText');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    let selectedVoucher = '';

    // Remove old voucher card event listeners (no longer needed)
    // Old code removed: document.querySelectorAll('.voucher-redeem-btn')
    // Old code removed: document.querySelectorAll('.voucher-card')

    confirmNo.addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });

    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) confirmModal.classList.remove('active');
    });

    confirmYes.addEventListener('click', () => {
        confirmModal.classList.remove('active');
        const message = encodeURIComponent(
            `Hi Love! 💌\n\nI want to redeem this birthday voucher:\n"${selectedVoucher}"\n\nI want to redeem my birthday voucher 🎁\n\nThank you for making this birthday feel even more meaningful💖`
        );
        const waUrl = `https://wa.me/${CONFIG.waNumber}?text=${message}`;
        window.open(waUrl, '_blank');
    });

    // ================== "MAKE A WISH" BUTTON ==================
    const birthdayCelebration = document.getElementById('birthdayCelebration');
    const celebrationConfetti = document.getElementById('celebrationConfetti');

    document.getElementById('birthdayWishBtn').addEventListener('click', () => {
        birthdayCelebration.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Generate celebration confetti
        celebrationConfetti.innerHTML = '';
        const confettiEmojis = ['🎉', '🎊', '🎁', '🎂', '🎈', '✨', '💖', '🌟', '🎀', '🍰'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('span');
            confetti.classList.add('celebration-confetti-piece');
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.fontSize = (1 + Math.random() * 2) + 'rem';
            celebrationConfetti.appendChild(confetti);
        }

        // Auto close after 5s
        setTimeout(() => {
            birthdayCelebration.classList.remove('active');
            document.body.style.overflow = '';
        }, 5000);
    });

    birthdayCelebration.addEventListener('click', () => {
        birthdayCelebration.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ================== BACKGROUND MUSIC ==================
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    const musicLabel = musicToggle.querySelector('.music-label');

    // Create audio element dynamically
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.03;
    let isMusicPlaying = false;

    // Try loading a local file first
    audio.src = 'assets/music.mp3';

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            audio.pause();
            musicIcon.textContent = '🎵';
            musicLabel.textContent = 'Play';
            musicToggle.classList.remove('playing');
        } else {
            audio.play().catch(() => {
                console.log('Letakkan file musik di assets/music.mp3');
            });
            musicIcon.textContent = '🔊';
            musicLabel.textContent = 'On';
            musicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // ================== WINDOW RESIZE HANDLER ==================
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confettiCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

})();
