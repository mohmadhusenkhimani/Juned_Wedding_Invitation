/* =========================================================
   WEDDING WEBSITE CONFIGURATION
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
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeWeddingWebsite();

});


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

function initializeWeddingWebsite() {

    setupWeddingNames();

    setupOpeningScreen();

    setupCountdown();

    setupScratchCard();

    setupGallery();

    setupRSVP();

    setupMusic();

    setupScrollReveal();

}


/* =========================================================
   WEDDING NAMES / DATE
========================================================= */

function setupWeddingNames() {

    /*
     * The HTML already contains the names and date.
     * These values are kept here so the main details can
     * easily be changed from CONFIG in the future.
     */

    const openingTitle = document.querySelector(".opening-title");
    const openingDate = document.querySelector(".opening-date");

    const invitationNames =
        document.querySelector(".invitation-names");

    const invitationDate =
        document.querySelector(".invitation-date");

    const heroDate =
        document.querySelector(".hero-date");

    const heroTime =
        document.querySelector(".hero-time");

    const footerTitle =
        document.querySelector(".footer h2");

    const footerDate =
        document.querySelector(".footer > p");

    if (openingTitle) {
        openingTitle.textContent =
            `${CONFIG.groomName} & ${CONFIG.brideName}`;
    }

    if (openingDate) {
        openingDate.textContent =
            CONFIG.displayDate;
    }

    if (invitationNames) {
        invitationNames.textContent =
            `${CONFIG.groomName} & ${CONFIG.brideName}`;
    }

    if (invitationDate) {
        invitationDate.textContent =
            CONFIG.displayDate;
    }

    if (heroDate) {
        heroDate.textContent =
            CONFIG.displayDate;
    }

    if (heroTime) {
        heroTime.textContent =
            CONFIG.displayDayTime;
    }

    if (footerTitle) {
        footerTitle.textContent =
            `${CONFIG.groomName} & ${CONFIG.brideName}`;
    }

    if (footerDate) {
        footerDate.textContent =
            CONFIG.displayDate;
    }

}


/* =========================================================
   OPENING SCREEN
========================================================= */

function setupOpeningScreen() {

    const openingScreen =
        document.getElementById("openingScreen");

    const openButton =
        document.getElementById("openInvitationButton");

    const mainContent =
        document.getElementById("mainContent");

    if (!openingScreen || !openButton || !mainContent) {
        return;
    }

    document.body.classList.add("no-scroll");

    openButton.addEventListener("click", () => {

        openingScreen.classList.add("hide");

        mainContent.classList.add("show");

        document.body.classList.remove("no-scroll");

        /*
         * Start music only if the browser allows it.
         * Usually browsers require a user interaction,
         * and this button click qualifies as one.
         */
        tryStartMusic();

    });

}


/* =========================================================
   COUNTDOWN
========================================================= */

function setupCountdown() {

    const daysElement =
        document.getElementById("countdownDays");

    const hoursElement =
        document.getElementById("countdownHours");

    const minutesElement =
        document.getElementById("countdownMinutes");

    const secondsElement =
        document.getElementById("countdownSeconds");

    const finishedElement =
        document.getElementById("countdownFinished");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    const targetDate =
        new Date(CONFIG.weddingDate).getTime();

    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            targetDate - now;

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            if (finishedElement) {
                finishedElement.hidden = false;
            }

            clearInterval(countdownInterval);

            return;
        }

        const days =
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (difference % (1000 * 60 * 60 * 24))
                / (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (difference % (1000 * 60 * 60))
                / (1000 * 60)
            );

        const seconds =
            Math.floor(
                (difference % (1000 * 60))
                / 1000
            );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }

    updateCountdown();

    const countdownInterval =
        setInterval(updateCountdown, 1000);

}


/* =========================================================
   SCRATCH CARD
========================================================= */

function setupScratchCard() {

    const canvas =
        document.getElementById("scratchCanvas");

    const scratchCard =
        document.getElementById("scratchCard");

    const revealButton =
        document.getElementById("revealDateButton");

    if (!canvas || !scratchCard) {
        return;
    }

    const context =
        canvas.getContext("2d");

    if (!context) {
        return;
    }

    let isScratching = false;

    let scratchedPercentage = 0;

    const scratchThreshold = 45;


    /* -----------------------------------------------------
       RESIZE CANVAS
    ----------------------------------------------------- */

    function resizeCanvas() {

        const rect =
            scratchCard.getBoundingClientRect();

        const devicePixelRatio =
            window.devicePixelRatio || 1;

        canvas.width =
            rect.width * devicePixelRatio;

        canvas.height =
            rect.height * devicePixelRatio;

        canvas.style.width =
            `${rect.width}px`;

        canvas.style.height =
            `${rect.height}px`;

        context.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );

        drawScratchSurface();

    }


    /* -----------------------------------------------------
       DRAW SCRATCH SURFACE
    ----------------------------------------------------- */

    function drawScratchSurface() {

        const width =
            scratchCard.clientWidth;

        const height =
            scratchCard.clientHeight;

        context.globalCompositeOperation =
            "source-over";

        context.fillStyle =
            "#c7a86b";

        context.fillRect(
            0,
            0,
            width,
            height
        );

        /*
         * Decorative scratch surface
         */
        context.fillStyle =
            "rgba(255,255,255,0.14)";

        for (
            let x = -height;
            x < width + height;
            x += 25
        ) {

            context.save();

            context.translate(x, 0);

            context.rotate(
                -Math.PI / 4
            );

            context.fillRect(
                0,
                0,
                8,
                height * 2
            );

            context.restore();
        }

        context.globalCompositeOperation =
            "source-over";

        context.fillStyle =
            "#fffaf5";

        context.font =
            "600 12px Montserrat, sans-serif";

        context.textAlign =
            "center";

        context.textBaseline =
            "middle";

        context.fillText(
            "SCRATCH TO REVEAL",
            width / 2,
            height / 2
        );

    }


    /* -----------------------------------------------------
       GET POINTER POSITION
    ----------------------------------------------------- */

    function getPointerPosition(event) {

        const rect =
            canvas.getBoundingClientRect();

        let clientX;
        let clientY;

        if (event.touches && event.touches.length) {

            clientX =
                event.touches[0].clientX;

            clientY =
                event.touches[0].clientY;

        } else {

            clientX =
                event.clientX;

            clientY =
                event.clientY;

        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };

    }


    /* -----------------------------------------------------
       SCRATCH
    ----------------------------------------------------- */

    function scratch(event) {

        if (!isScratching) {
            return;
        }

        event.preventDefault();

        const position =
            getPointerPosition(event);

        context.globalCompositeOperation =
            "destination-out";

        context.beginPath();

        context.arc(
            position.x,
            position.y,
            25,
            0,
            Math.PI * 2
        );

        context.fill();

        checkScratchProgress();

    }


    /* -----------------------------------------------------
       CHECK SCRATCH PROGRESS
    ----------------------------------------------------- */

    function checkScratchProgress() {

        const width =
            canvas.width;

        const height =
            canvas.height;

        const imageData =
            context.getImageData(
                0,
                0,
                width,
                height
            );

        let transparentPixels = 0;

        /*
         * Check every 16th pixel for better performance.
         */
        for (
            let i = 3;
            i < imageData.data.length;
            i += 16
        ) {

            if (imageData.data[i] === 0) {
                transparentPixels++;
            }

        }

        const totalSamples =
            Math.floor(
                imageData.data.length / 16
            );

        scratchedPercentage =
            (transparentPixels / totalSamples) * 100;

        if (
            scratchedPercentage >=
            scratchThreshold
        ) {

            revealScratchCard();

        }

    }


    /* -----------------------------------------------------
       REVEAL CARD
    ----------------------------------------------------- */

    function revealScratchCard() {

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.style.pointerEvents =
            "none";

        if (revealButton) {
            revealButton.textContent =
                "Date Revealed";
        }

    }


    /* -----------------------------------------------------
       POINTER EVENTS
    ----------------------------------------------------- */

    canvas.addEventListener(
        "mousedown",
        () => {
            isScratching = true;
        }
    );

    canvas.addEventListener(
        "mousemove",
        scratch
    );

    window.addEventListener(
        "mouseup",
        () => {
            isScratching = false;
        }
    );


    /* -----------------------------------------------------
       TOUCH EVENTS
    ----------------------------------------------------- */

    canvas.addEventListener(
        "touchstart",
        (event) => {

            isScratching = true;

            event.preventDefault();

        },
        {
            passive: false
        }
    );

    canvas.addEventListener(
        "touchmove",
        scratch,
        {
            passive: false
        }
    );

    canvas.addEventListener(
        "touchend",
        () => {
            isScratching = false;
        }
    );


    /* -----------------------------------------------------
       REVEAL BUTTON
    ----------------------------------------------------- */

    if (revealButton) {

        revealButton.addEventListener(
            "click",
            () => {

                revealScratchCard();

            }
        );

    }


    /* -----------------------------------------------------
       INITIALIZE
    ----------------------------------------------------- */

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

}


/* =========================================================
   GALLERY
========================================================= */

function setupGallery() {

    const galleryGrid =
        document.getElementById("galleryGrid");

    const photoInput =
        document.getElementById("photoInput");

    if (!galleryGrid || !photoInput) {
        return;
    }


    photoInput.addEventListener(
        "change",
        (event) => {

            const files =
                Array.from(
                    event.target.files || []
                );

            if (!files.length) {
                return;
            }

            files.forEach(
                (file) => {

                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {
                        return;
                    }

                    const imageURL =
                        URL.createObjectURL(file);

                    const galleryItem =
                        document.createElement("div");

                    galleryItem.className =
                        "gallery-item";

                    const image =
                        document.createElement("img");

                    image.src =
                        imageURL;

                    image.alt =
                        "Wedding memory";

                    image.loading =
                        "lazy";

                    galleryItem.appendChild(
                        image
                    );

                    galleryGrid.appendChild(
                        galleryItem
                    );

                }
            );

            /*
             * Reset input so the same image can
             * be selected again later.
             */
            photoInput.value = "";

        }
    );

}


/* =========================================================
   RSVP
========================================================= */

function setupRSVP() {

    const form =
        document.getElementById("rsvpForm");

    const guestName =
        document.getElementById("guestName");

    const guestCount =
        document.getElementById("guestCount");

    const status =
        document.getElementById("rsvpStatus");

    if (
        !form ||
        !guestName ||
        !guestCount
    ) {
        return;
    }


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                guestName.value.trim();

            const numberOfGuests =
                guestCount.value;


            if (!name) {

                showRSVPStatus(
                    "Please enter your name."
                );

                guestName.focus();

                return;

            }


            if (!numberOfGuests) {

                showRSVPStatus(
                    "Please select the number of guests."
                );

                guestCount.focus();

                return;

            }


            /*
             * Create WhatsApp RSVP message.
             */
            const message =
                `Wedding RSVP

Name: ${name}
Number of Guests: ${numberOfGuests}

Wedding Date: ${CONFIG.displayDate}`;

            const whatsappURL =
                `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;


            /*
             * Open WhatsApp.
             */
            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            showRSVPStatus(
                "Thank you! Your RSVP message is ready to send on WhatsApp."
            );


            /*
             * Reset form after submission.
             */
            form.reset();

        }
    );


    function showRSVPStatus(message) {

        if (!status) {
            return;
        }

        status.textContent =
            message;

    }

}


/* =========================================================
   MUSIC
========================================================= */

function setupMusic() {

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");

    if (!music || !musicButton) {
        return;
    }

    /*
     * Make sure the configured music file
     * is used.
     */
    const source =
        music.querySelector("source");

    if (source) {

        source.src =
            CONFIG.musicFile;

        music.load();

    }


    musicButton.addEventListener(
        "click",
        async () => {

            if (music.paused) {

                await playMusic(
                    music,
                    musicButton
                );

            } else {

                pauseMusic(
                    music,
                    musicButton
                );

            }

        }
    );


    music.addEventListener(
        "play",
        () => {

            musicButton.classList.add(
                "playing"
            );

            musicButton.textContent =
                "❚❚";

            musicButton.setAttribute(
                "aria-label",
                "Pause wedding music"
            );

            musicButton.setAttribute(
                "title",
                "Pause Music"
            );

        }
    );


    music.addEventListener(
        "pause",
        () => {

            musicButton.classList.remove(
                "playing"
            );

            musicButton.textContent =
                "♪";

            musicButton.setAttribute(
                "aria-label",
                "Play wedding music"
            );

            musicButton.setAttribute(
                "title",
                "Play Music"
            );

        }
    );

}


/* =========================================================
   TRY START MUSIC
========================================================= */

async function tryStartMusic() {

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");

    if (!music || !musicButton) {
        return;
    }

    try {

        await music.play();

    } catch (error) {

        /*
         * Browser may block automatic playback.
         * User can use the music button instead.
         */

        musicButton.classList.remove(
            "playing"
        );

    }

}


/* =========================================================
   PLAY MUSIC
========================================================= */

async function playMusic(
    music,
    musicButton
) {

    try {

        await music.play();

    } catch (error) {

        console.warn(
            "Music could not be played:",
            error
        );

        if (musicButton) {

            musicButton.classList.remove(
                "playing"
            );

        }

    }

}


/* =========================================================
   PAUSE MUSIC
========================================================= */

function pauseMusic(
    music,
    musicButton
) {

    music.pause();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupScrollReveal() {

    /*
     * Add reveal class to major sections.
     */
    const sections =
        document.querySelectorAll(
            ".section-container"
        );

    sections.forEach(
        (section) => {

            section.classList.add(
                "reveal"
            );

        }
    );


    /*
     * Intersection Observer
     */
    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   OPTIONAL: UPDATE SCRATCH CARD DATE
========================================================= */

function updateScratchCardDate() {

    const dateElement =
        document.querySelector(
            ".revealed-date p"
        );

    if (dateElement) {

        dateElement.textContent =
            CONFIG.displayDate;

    }

}


/* =========================================================
   OPTIONAL: UPDATE PAGE TITLE
========================================================= */

function updatePageTitle() {

    document.title =
        `${CONFIG.groomName} & ${CONFIG.brideName} | Wedding Invitation`;

}


/* =========================================================
   RUN OPTIONAL CONFIG UPDATES
========================================================= */

updateScratchCardDate();

updatePageTitle();