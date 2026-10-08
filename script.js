/* =========================================================
   JUNED & YASMIN — MODERN LUXURY WEDDING
   script.js
========================================================= */


/* =========================================================
   01. CONFIGURATION
========================================================= */

const CONFIG = {

    groomName: "Juned",

    brideName: "Yasmin",

    weddingDate: "2026-11-29T22:00:00+05:30",

    displayDate: "29 November 2026",

    displayDayTime: "Sunday • 10:00 PM",

    whatsappNumber: "918154957669",

    musicFile: "music.mp3"

};


/* =========================================================
   02. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNames();

    initializeOpeningScreen();

    initializeSmoothNavigation();

    initializeCountdown();

    initializeScratchCard();

    initializeGallery();

    initializeRSVP();

    initializeMusic();

    initializeScrollReveal();

    updatePageTitle();

});


/* =========================================================
   03. INITIALIZE NAMES
========================================================= */

function initializeNames() {

    const nameElements = document.querySelectorAll(
        "[data-groom], [data-bride]"
    );

    nameElements.forEach((element) => {

        if (element.hasAttribute("data-groom")) {
            element.textContent = CONFIG.groomName;
        }

        if (element.hasAttribute("data-bride")) {
            element.textContent = CONFIG.brideName;
        }

    });

}


/* =========================================================
   04. OPENING SCREEN
========================================================= */

function initializeOpeningScreen() {

    const openingScreen =
        document.getElementById("openingScreen");

    const openButton =
        document.getElementById("openInvitationButton");

    const mainContent =
        document.getElementById("mainContent");


    if (!openingScreen || !openButton) {
        return;
    }


    document.body.classList.add("no-scroll");


    if (mainContent) {
        mainContent.style.opacity = "0";
    }


    openButton.addEventListener("click", () => {

        openingScreen.classList.add("is-hidden");

        document.body.classList.remove("no-scroll");


        if (mainContent) {

            mainContent.style.transition =
                "opacity 1.2s ease";

            mainContent.style.opacity = "1";

        }


        setTimeout(() => {

            openingScreen.remove();

        }, 1200);

    });

}


/* =========================================================
   05. SMOOTH NAVIGATION
========================================================= */

function initializeSmoothNavigation() {

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (!targetId || targetId === "#") {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerOffset = 10;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   06. COUNTDOWN
========================================================= */

function initializeCountdown() {

    const container =
        document.getElementById(
            "countdownContainer"
        );


    const daysElement =
        document.getElementById(
            "countdownDays"
        );


    const hoursElement =
        document.getElementById(
            "countdownHours"
        );


    const minutesElement =
        document.getElementById(
            "countdownMinutes"
        );


    const secondsElement =
        document.getElementById(
            "countdownSeconds"
        );


    const finishedElement =
        document.getElementById(
            "countdownFinished"
        );


    if (
        !container ||
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    const targetDate =
        new Date(
            CONFIG.weddingDate
        ).getTime();


    let previousValues = {

        days: null,

        hours: null,

        minutes: null,

        seconds: null

    };


    function updateCountdownValue(
        element,
        value,
        key
    ) {

        if (
            previousValues[key] === value
        ) {

            return;

        }


        element.style.transform =
            "translateY(-8px)";

        element.style.opacity =
            "0.3";


        setTimeout(() => {

            element.textContent = value;

            element.style.transform =
                "translateY(0)";

            element.style.opacity =
                "1";

        }, 100);


        previousValues[key] = value;

    }


    function updateCountdown() {

        const now =
            Date.now();


        let difference =
            targetDate - now;


        if (difference <= 0) {

            container.hidden = true;

            if (finishedElement) {
                finishedElement.hidden = false;
            }

            clearInterval(countdownInterval);

            return;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        updateCountdownValue(
            daysElement,
            String(days).padStart(2, "0"),
            "days"
        );


        updateCountdownValue(
            hoursElement,
            String(hours).padStart(2, "0"),
            "hours"
        );


        updateCountdownValue(
            minutesElement,
            String(minutes).padStart(2, "0"),
            "minutes"
        );


        updateCountdownValue(
            secondsElement,
            String(seconds).padStart(2, "0"),
            "seconds"
        );

    }


    updateCountdown();


    const countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =========================================================
   07. SCRATCH TO CELEBRATE
========================================================= */

function initializeScratchCard() {

    const scratchCard =
        document.getElementById(
            "scratchCard"
        );


    const canvas =
        document.getElementById(
            "scratchCanvas"
        );


    const revealButton =
        document.getElementById(
            "revealDateButton"
        );


    if (
        !scratchCard ||
        !canvas
    ) {

        return;

    }


    const context =
        canvas.getContext("2d");


    let isDrawing = false;

    let isRevealed = false;

    let scratchedPixels = 0;

    let lastPoint = null;


    function getDevicePixelRatio() {

        return Math.max(
            1,
            window.devicePixelRatio || 1
        );

    }


    function resizeCanvas() {

        const rect =
            scratchCard.getBoundingClientRect();


        const ratio =
            getDevicePixelRatio();


        canvas.width =
            Math.floor(
                rect.width * ratio
            );


        canvas.height =
            Math.floor(
                rect.height * ratio
            );


        canvas.style.width =
            `${rect.width}px`;


        canvas.style.height =
            `${rect.height}px`;


        context.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        drawScratchSurface();

    }


    function drawScratchSurface() {

        const width =
            scratchCard.clientWidth;


        const height =
            scratchCard.clientHeight;


        context.globalCompositeOperation =
            "source-over";


        const gradient =
            context.createLinearGradient(
                0,
                0,
                width,
                height
            );


        gradient.addColorStop(
            0,
            "#c8aa78"
        );


        gradient.addColorStop(
            0.45,
            "#dfc99f"
        );


        gradient.addColorStop(
            1,
            "#a9895c"
        );


        context.fillStyle =
            gradient;


        context.fillRect(
            0,
            0,
            width,
            height
        );


        /* Soft highlight */

        const glow =
            context.createRadialGradient(
                width * 0.5,
                height * 0.4,
                10,
                width * 0.5,
                height * 0.4,
                width * 0.65
            );


        glow.addColorStop(
            0,
            "rgba(255,255,255,0.28)"
        );


        glow.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );


        context.fillStyle =
            glow;


        context.fillRect(
            0,
            0,
            width,
            height
        );


        /* Scratch surface pattern */

        context.globalAlpha = 0.22;

        for (
            let x = -height;
            x < width + height;
            x += 18
        ) {

            context.beginPath();

            context.moveTo(
                x,
                0
            );

            context.lineTo(
                x + height,
                height
            );

            context.strokeStyle =
                "#ffffff";

            context.lineWidth = 1;

            context.stroke();

        }


        context.globalAlpha = 1;


        /* Center text */

        context.fillStyle =
            "rgba(255,255,255,0.92)";

        context.textAlign =
            "center";

        context.textBaseline =
            "middle";


        context.font =
            "600 10px 'DM Sans', Arial, sans-serif";


        context.fillText(
            "SCRATCH TO REVEAL",
            width / 2,
            height / 2 - 7
        );


        context.font =
            "18px 'Cormorant Garamond', Georgia, serif";


        context.fillText(
            "✦",
            width / 2,
            height / 2 + 22
        );

    }


    function getPointerPosition(event) {

        const rect =
            canvas.getBoundingClientRect();


        if (event.touches && event.touches.length) {

            return {

                x:
                    event.touches[0].clientX -
                    rect.left,

                y:
                    event.touches[0].clientY -
                    rect.top

            };

        }


        return {

            x:
                event.clientX -
                rect.left,

            y:
                event.clientY -
                rect.top

        };

    }


    function scratchAt(point) {

        context.save();


        context.globalCompositeOperation =
            "destination-out";


        context.lineWidth = 48;

        context.lineCap =
            "round";

        context.lineJoin =
            "round";


        if (lastPoint) {

            context.beginPath();

            context.moveTo(
                lastPoint.x,
                lastPoint.y
            );

            context.lineTo(
                point.x,
                point.y
            );

            context.stroke();

        } else {

            context.beginPath();

            context.arc(
                point.x,
                point.y,
                24,
                0,
                Math.PI * 2
            );

            context.fill();

        }


        context.restore();


        lastPoint = point;


        checkScratchProgress();

    }


    function startScratch(event) {

        if (isRevealed) {
            return;
        }


        event.preventDefault();


        isDrawing = true;

        lastPoint =
            getPointerPosition(event);


        scratchAt(lastPoint);

    }


    function moveScratch(event) {

        if (
            !isDrawing ||
            isRevealed
        ) {

            return;

        }


        event.preventDefault();


        const point =
            getPointerPosition(event);


        scratchAt(point);

    }


    function stopScratch() {

        isDrawing = false;

        lastPoint = null;

    }


    function checkScratchProgress() {

        if (isRevealed) {
            return;
        }


        scratchedPixels++;


        /*
         * Checking every scratch stroke would be
         * unnecessarily expensive.
         */

        if (
            scratchedPixels % 8 !== 0
        ) {

            return;

        }


        const width =
            canvas.width;


        const height =
            canvas.height;


        const sampleSize = 10;


        let transparentPixels = 0;

        let totalSamples = 0;


        const imageData =
            context.getImageData(
                0,
                0,
                width,
                height
            );


        /*
         * Sample the canvas instead of checking
         * every single pixel.
         */

        for (
            let y = 0;
            y < height;
            y += sampleSize
        ) {

            for (
                let x = 0;
                x < width;
                x += sampleSize
            ) {

                const index =
                    (
                        y * width + x
                    ) * 4;


                if (
                    imageData.data[index + 3] < 80
                ) {

                    transparentPixels++;

                }


                totalSamples++;

            }

        }


        const percentage =
            transparentPixels /
            totalSamples;


        if (percentage >= 0.48) {

            revealScratch();

        }

    }


    function revealScratch() {

        if (isRevealed) {
            return;
        }


        isRevealed = true;


        scratchCard.classList.add(
            "revealed"
        );


        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        if (revealButton) {

            revealButton.innerHTML =
                "<span>Celebration Revealed</span><i>✦</i>";

            revealButton.disabled = true;

            revealButton.style.opacity =
                "0.65";

            revealButton.style.cursor =
                "default";

        }


        createCelebrationEffect();

    }


    function revealWithButton() {

        revealScratch();

    }


    canvas.addEventListener(
        "mousedown",
        startScratch
    );


    canvas.addEventListener(
        "mousemove",
        moveScratch
    );


    window.addEventListener(
        "mouseup",
        stopScratch
    );


    canvas.addEventListener(
        "touchstart",
        startScratch,
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchmove",
        moveScratch,
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchend",
        stopScratch
    );


    if (revealButton) {

        revealButton.addEventListener(
            "click",
            revealWithButton
        );

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();

}


/* =========================================================
   08. CELEBRATION EFFECT
========================================================= */

function createCelebrationEffect() {

    const colors = [
        "#b79662",
        "#d8bd8c",
        "#b9827a",
        "#ead8d3",
        "#ffffff"
    ];


    const container =
        document.createElement("div");


    container.className =
        "celebration-particles";


    container.style.position =
        "fixed";

    container.style.inset = "0";

    container.style.pointerEvents =
        "none";

    container.style.zIndex =
        "9998";

    container.style.overflow =
        "hidden";


    document.body.appendChild(
        container
    );


    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.textContent =
            i % 3 === 0
                ? "✦"
                : "•";


        particle.style.position =
            "absolute";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${35 + Math.random() * 15}%`;


        particle.style.color =
            colors[
            Math.floor(
                Math.random() *
                colors.length
            )
            ];


        particle.style.fontSize =
            `${7 + Math.random() * 12}px`;


        particle.style.opacity =
            "0";


        particle.style.transform =
            "translateY(0) rotate(0deg)";


        particle.style.transition =
            `transform ${1.5 + Math.random() * 1.8
            }s cubic-bezier(.2,.8,.3,1),
             opacity .25s ease`;


        container.appendChild(
            particle
        );


        requestAnimationFrame(() => {

            particle.style.opacity =
                "0.9";


            particle.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 250}px,
                    ${180 + Math.random() * 420}px
                )
                rotate(
                    ${Math.random() * 720 - 360}deg
                )`;

        });

    }


    setTimeout(() => {

        container.style.opacity =
            "0";

        container.style.transition =
            "opacity .6s ease";

    }, 2200);


    setTimeout(() => {

        container.remove();

    }, 3000);

}


/* =========================================================
   09. GALLERY
========================================================= */

function initializeGallery() {

    const photoInput =
        document.getElementById(
            "photoInput"
        );


    const galleryGrid =
        document.querySelector(
            ".gallery-grid"
        );


    if (
        !photoInput ||
        !galleryGrid
    ) {

        return;

    }


    photoInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];


            if (!file) {
                return;
            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please choose a valid image."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = (loadEvent) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "gallery-item";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    loadEvent.target.result;


                image.alt =
                    "Added wedding photo";


                const overlay =
                    document.createElement(
                        "div"
                    );


                overlay.className =
                    "gallery-overlay";


                const number =
                    document.createElement(
                        "span"
                    );


                const existingItems =
                    galleryGrid.querySelectorAll(
                        ".gallery-item"
                    );


                number.textContent =
                    String(
                        existingItems.length + 1
                    ).padStart(2, "0");


                overlay.appendChild(
                    number
                );


                item.appendChild(
                    image
                );


                item.appendChild(
                    overlay
                );


                const uploadLabel =
                    galleryGrid.querySelector(
                        ".gallery-upload"
                    );


                galleryGrid.insertBefore(
                    item,
                    uploadLabel
                );


                photoInput.value = "";

            };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   10. RSVP
========================================================= */

function initializeRSVP() {

    const form =
        document.getElementById(
            "rsvpForm"
        );


    const status =
        document.getElementById(
            "rsvpStatus"
        );


    const nameInput =
        document.getElementById(
            "guestName"
        );


    const guestCount =
        document.getElementById(
            "guestCount"
        );


    if (
        !form ||
        !nameInput ||
        !guestCount
    ) {

        return;

    }


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                nameInput.value.trim();


            const numberOfGuests =
                guestCount.value;


            if (!name) {

                showRSVPStatus(
                    status,
                    "Please enter your name."
                );

                nameInput.focus();

                return;

            }


            if (!numberOfGuests) {

                showRSVPStatus(
                    status,
                    "Please select the number of guests."
                );

                guestCount.focus();

                return;

            }


            const message =
                `Wedding RSVP

Name: ${name}
Number of Guests: ${numberOfGuests}

Wedding Date: ${CONFIG.displayDate}`;


            const whatsappURL =
                `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;


            showRSVPStatus(
                status,
                "Opening WhatsApp..."
            );


            setTimeout(() => {

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }, 400);

        }
    );

}


/* =========================================================
   11. RSVP STATUS
========================================================= */

function showRSVPStatus(
    element,
    message
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.style.opacity =
        "0";


    requestAnimationFrame(() => {

        element.style.transition =
            "opacity .35s ease";

        element.style.opacity =
            "1";

    });

}


/* =========================================================
   12. MUSIC
========================================================= */

function initializeMusic() {

    const music =
        document.getElementById(
            "weddingMusic"
        );


    const musicButton =
        document.getElementById(
            "musicButton"
        );


    if (
        !music ||
        !musicButton
    ) {

        return;

    }


    musicButton.addEventListener(
        "click",
        async () => {

            if (
                music.paused
            ) {

                try {

                    await music.play();

                    setMusicButtonState(
                        musicButton,
                        true
                    );

                } catch (error) {

                    showMusicMessage(
                        musicButton
                    );

                }

            } else {

                music.pause();

                setMusicButtonState(
                    musicButton,
                    false
                );

            }

        }
    );


    music.addEventListener(
        "play",
        () => {

            setMusicButtonState(
                musicButton,
                true
            );

        }
    );


    music.addEventListener(
        "pause",
        () => {

            setMusicButtonState(
                musicButton,
                false
            );

        }
    );

}


/* =========================================================
   13. MUSIC BUTTON STATE
========================================================= */

function setMusicButtonState(
    button,
    playing
) {

    if (playing) {

        button.classList.add(
            "is-playing"
        );

        button.textContent = "Ⅱ";

        button.setAttribute(
            "aria-label",
            "Pause wedding music"
        );

        button.setAttribute(
            "title",
            "Pause Music"
        );

    } else {

        button.classList.remove(
            "is-playing"
        );

        button.textContent = "♪";

        button.setAttribute(
            "aria-label",
            "Play wedding music"
        );

        button.setAttribute(
            "title",
            "Play Music"
        );

    }

}


/* =========================================================
   14. MUSIC ERROR MESSAGE
========================================================= */

function showMusicMessage(
    button
) {

    const originalTitle =
        button.getAttribute(
            "title"
        );


    button.setAttribute(
        "title",
        "Add music.mp3 to the website folder"
    );


    setTimeout(() => {

        button.setAttribute(
            "title",
            originalTitle || "Play Music"
        );

    }, 3000);

}


/* =========================================================
   15. SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const elements =
        document.querySelectorAll(
            `
            .section-heading,
            .invitation-card,
            .scratch-card,
            .events-grid,
            .countdown-container,
            .story-layout,
            .gallery-grid,
            .venue-card,
            .rsvp-wrapper,
            .final-inner
            `
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "revealed"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    elements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   16. PAGE TITLE
========================================================= */

function updatePageTitle() {

    document.title =
        `${CONFIG.groomName} & ${CONFIG.brideName} — Wedding Invitation`;

}


/* =========================================================
   17. PREVENT IMAGE DRAGGING
========================================================= */

document.addEventListener(
    "dragstart",
    (event) => {

        if (
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   18. WINDOW LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.documentElement.classList.add(
            "page-loaded"
        );

    }
);
