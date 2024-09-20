document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.wrapper');
    let currentSection = 0;

    const startButton = document.querySelector('.start_button'); 
    const nextText = document.querySelector('.next_text');

    startButton.addEventListener('click', function() {
        if (currentSection < sections.length - 1) {
            currentSection++; 
            scrollToSection(currentSection); 
        }
    });

    nextText.addEventListener('click', function() {
        if (currentSection < sections.length - 1) {
            currentSection++; 
            scrollToSection(currentSection); 
        }
    });

    function scrollToSection(index) {
        sections[index].scrollIntoView({ behavior: 'smooth' }); 
    }
});

// img selected
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.img img');
    const resetButton = document.querySelector('.reset_button'); 


    images.forEach(img => {
        img.addEventListener('click', function() {
            images.forEach(image => image.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Reset 버튼 클릭 시 초기화
    resetButton.addEventListener('click', function() {
        images.forEach(image => image.classList.remove('selected')); // 모든 이미지에서 selected 클래스 제거
    });
});


//current music

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.music_image');
    const items = document.querySelectorAll('.music_item');
    const notPlayingText = document.querySelector('.not_playing');
    let currentIndex = -1;

    images.forEach(image => {
        image.addEventListener('click', () => {
            const index = parseInt(image.getAttribute('data-index'));

            if (index !== currentIndex) {
                
                const currentItem = currentIndex === -1 ? notPlayingText : items[currentIndex];
                const newItem = index === 4 ? notPlayingText : items[index];

                
                currentItem.classList.add('exit');
                currentItem.addEventListener('animationend', () => {
                    currentItem.classList.remove('show', 'exit');
                }, { once: true });

               
                newItem.classList.add('show', 'enter');
                newItem.addEventListener('animationend', () => {
                    newItem.classList.remove('enter');
                }, { once: true });

                
                if (currentIndex !== -1 && index === 4) {
                    notPlayingText.style.opacity = '1';
                } else if (index !== 4) {
                    notPlayingText.style.opacity = '0';
                }

                currentIndex = index;
            }
        });
    });
});
