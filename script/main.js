const text_animation = document.querySelectorAll('.text_ani');

const text_animation_Observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
        console.log(entry.target)
    });
}, { threshold: 0.3 });

text_animation.forEach(text_ani => {
    text_animation_Observer.observe(text_ani);
});
