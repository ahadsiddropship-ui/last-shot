
window.addEventListener("load", () => {
    const reveal = document.createElement("div");

    reveal.className = "opening-reveal";

    document.body.appendChild(reveal);

    requestAnimationFrame(() => {
        reveal.classList.add("reveal-active");
    });

    setTimeout(() => {
        reveal.remove();
    }, 1800);
});
