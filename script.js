/* ========================================
   VALENTINE LANDING PAGE — SCRIPT.JS
   For Tini 💕
   ======================================== */

(function () {
    'use strict';

    // ================== CONFIG ==================
    const CONFIG = {
        anniversaryDate: new Date('2021-11-09T00:00:00'),
        waNumber: '6282285054021',
        partnerName: 'Tini',
    };

    // ================== COUNTDOWN TIMER ==================
    function updateCountdown() {
        const now = new Date();
        const start = CONFIG.anniversaryDate;

        // Calculate total difference
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();
        let hours = now.getHours() - start.getHours();
        let minutes = now.getMinutes() - start.getMinutes();
        let seconds = now.getSeconds() - start.getSeconds();

        // Adjust negatives
        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        // Update DOM
        const el = (id) => document.getElementById(id);
        el('countYears').textContent = years;
        el('countMonths').textContent = months;
        el('countDays').textContent = days;
        el('countHours').textContent = String(hours).padStart(2, '0');
        el('countMinutes').textContent = String(minutes).padStart(2, '0');
        el('countSeconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ================== SMOOTH SCROLL — "Buka Pesan" BUTTON ==================
    document.getElementById('openMessageBtn').addEventListener('click', function () {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    });

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
                // Don't unobserve letter lines so they stay visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal, .letter-line').forEach((el) => {
        scrollObserver.observe(el);
    });

    // ================== LIGHTBOX GALLERY ==================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const galleryItems = document.querySelectorAll('.masonry-item');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption');

        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ================== DATE PICKER — WhatsApp ==================
    const confirmModal = document.getElementById('confirmModal');
    const confirmText = document.getElementById('confirmModalText');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    let selectedDate = '';

    document.querySelectorAll('.date-card').forEach((card) => {
        card.addEventListener('click', function () {
            selectedDate = this.getAttribute('data-date');
            confirmText.textContent = selectedDate;
            confirmModal.classList.add('active');
        });
    });

    confirmNo.addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });

    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) confirmModal.classList.remove('active');
    });

    confirmYes.addEventListener('click', () => {
        confirmModal.classList.remove('active');
        const message = encodeURIComponent(
            `Hai sayang! 💕 Aku pilih: ${selectedDate}\n\nHappy Valentine's Day! ❤️`
        );
        const waUrl = `https://wa.me/${CONFIG.waNumber}?text=${message}`;
        window.open(waUrl, '_blank');
    });

    // ================== "I LOVE YOU TOO" BUTTON ==================
    const loveExplosion = document.getElementById('loveExplosion');
    const explosionHearts = document.getElementById('explosionHearts');

    document.getElementById('iLoveYouBtn').addEventListener('click', () => {
        loveExplosion.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Generate explosion hearts
        explosionHearts.innerHTML = '';
        const heartEmojis = ['💖', '💕', '❤️', '💗', '💓', '💘', '💝', '🌹', '✨', '💐'];
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('span');
            heart.classList.add('explosion-heart');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
            explosionHearts.appendChild(heart);
        }

        // Auto close after 5s
        setTimeout(() => {
            loveExplosion.classList.remove('active');
            document.body.style.overflow = '';
        }, 5000);
    });

    loveExplosion.addEventListener('click', () => {
        loveExplosion.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ================== BACKGROUND MUSIC ==================
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    const musicLabel = musicToggle.querySelector('.music-label');

    // Create audio element dynamically
    const audio = new Audio();
    // Use a royalty-free romantic piano piece (placeholder URL — user can replace)
    // We'll use a data URI of silence as placeholder since we don't have a real file
    audio.loop = true;
    audio.volume = 0.4;
    let isMusicPlaying = false;

    // Try loading a local file first, fallback gracefully
    audio.src = 'assets/music.mp3';

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            audio.pause();
            musicIcon.textContent = '🎵';
            musicLabel.textContent = 'Play';
            musicToggle.classList.remove('playing');
        } else {
            audio.play().catch(() => {
                // Audio file not found - show a subtle hint
                console.log('Letakkan file musik di assets/music.mp3');
            });
            musicIcon.textContent = '🔊';
            musicLabel.textContent = 'On';
            musicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // ================== FLOATING HEARTS CANVAS ==================
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');
    let hearts = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Heart {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = 8 + Math.random() * 16;
            this.speedY = 0.3 + Math.random() * 0.8;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.opacity = 0.1 + Math.random() * 0.25;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
            this.rotation += this.rotationSpeed;

            if (this.y < -30) this.reset();
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `hsl(${340 + Math.random() * 20}, 80%, 70%)`;
            ctx.font = `${this.size}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('♥', 0, 0);
            ctx.restore();
        }
    }

    // Initialize hearts
    for (let i = 0; i < 25; i++) {
        hearts.push(new Heart());
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((heart) => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animateHearts);
    }

    animateHearts();

})();
