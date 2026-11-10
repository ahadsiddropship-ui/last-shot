
const storm = document.querySelector(".storm");
const cloudy = document.querySelector(".cloudy");
const peaceful = document.querySelector(".peaceful");

const rain = document.querySelector(".rain");
const sun = document.querySelector(".sun");
const lightning = document.querySelector(".lightning");

// Generate individual raindrops

if (rain) {
    for (let i = 0; i < 180; i++) {
        const drop = document.createElement("div");
        drop.classList.add("raindrop");

        drop.style.setProperty("--left", `${Math.random() * 120 - 10}%`);
        drop.style.setProperty("--length", `${12 + Math.random() * 22}px`);
        drop.style.setProperty("--speed", `${0.6 + Math.random() * 0.9}s`);
        drop.style.setProperty("--delay", `${-Math.random() * 3}s`);
        drop.style.setProperty("--opacity", `${0.2 + Math.random() * 0.6}`);

        rain.appendChild(drop);
    }
}

// Control weather through scrolling

if (storm && cloudy && peaceful && rain && sun && lightning) {

    function updateWeather() {

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? window.scrollY / scrollableHeight
            : 0;

        const transition = Math.max(
            0,
            Math.min(1, (progress - 0.25) / 0.4)
        );

        const sunshine = Math.max(
            0,
            Math.min(1, (progress - 0.6) / 0.4)
        );

        storm.style.opacity = 1 - transition;
        cloudy.style.opacity = transition * (1 - sunshine);
        peaceful.style.opacity = sunshine;

        rain.style.opacity = 0.85 * (1 - progress);
        sun.style.opacity = sunshine;
        lightning.style.opacity = 1 - sunshine;
    }

    window.addEventListener("scroll", updateWeather);
    updateWeather();
}
// =========================================
// VOICE NOTE PLAYERS
// =========================================

const voiceNotes = document.querySelectorAll(".voice-note");

voiceNotes.forEach((note) => {
    const audio = note.querySelector("audio");
    const button = note.querySelector(".note-play");

    if (!audio || !button) return;

    button.addEventListener("click", async () => {

        // Pause every other recording
        voiceNotes.forEach((otherNote) => {
            const otherAudio = otherNote.querySelector("audio");
            const otherButton = otherNote.querySelector(".note-play");

            if (otherAudio && otherAudio !== audio) {
                otherAudio.pause();
                otherNote.classList.remove("audio-open");

                if (otherButton) {
                    otherButton.textContent = "▶";
                }
            }
        });

        // Reveal controls
        note.classList.add("audio-open");

        if (audio.paused) {
            try {
                await audio.play();
                button.textContent = "Ⅱ";
            } catch (error) {
                button.textContent = "!";
                button.title = "This audio format could not be played by the browser.";
                console.error("Voice note playback failed:", error);
            }
        } else {
            audio.pause();
            button.textContent = "▶";
        }
    });

    audio.addEventListener("play", () => {
        button.textContent = "Ⅱ";
    });

    audio.addEventListener("pause", () => {
        button.textContent = "▶";
    });

    audio.addEventListener("ended", () => {
        button.textContent = "▶";
    });
});


// =========================================
// MAKE THE LANDSCAPE FULLY SUNNY
// =========================================

const voiceLandscape = document.querySelector(".voice-landscape");

if (voiceLandscape) {
    function keepVoiceLandscapeSunny() {

        const position = voiceLandscape.getBoundingClientRect();

        if (position.top < window.innerHeight * 0.75) {

            const storm = document.querySelector(".storm");
            const cloudy = document.querySelector(".cloudy");
            const peaceful = document.querySelector(".peaceful");
            const rain = document.querySelector(".rain");
            const sun = document.querySelector(".sun");
            const lightning = document.querySelector(".lightning");

            if (storm) storm.style.opacity = 0;
            if (cloudy) cloudy.style.opacity = 0;
            if (peaceful) peaceful.style.opacity = 1;
            if (rain) rain.style.opacity = 0;
            if (sun) sun.style.opacity = 1;
            if (lightning) lightning.style.opacity = 0;
        }
    }

    window.addEventListener("scroll", keepVoiceLandscapeSunny);
    keepVoiceLandscapeSunny();
}