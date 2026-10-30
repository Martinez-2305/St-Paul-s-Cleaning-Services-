// Shows the sticky WhatsApp button (mobile only, see whatsapp.css)
// once the visitor has scrolled past the top of the page.
(function () {
    var btn = document.querySelector('.wa-sticky');
    if (!btn) return;
    var ticking = false;
    function update() {
        var threshold = Math.min(window.innerHeight * 0.6, 480);
        btn.classList.toggle('is-visible', window.scrollY > threshold);
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
})();
