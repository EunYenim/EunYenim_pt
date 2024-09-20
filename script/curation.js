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

// img text animation
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".music_image");
    const textBlocks = document.querySelectorAll(".img_num"); 
    const textBlocks2 = document.querySelectorAll(".img_text");

    images.forEach((image, index) => {
        image.addEventListener("click", function() {
            // 모든 텍스트를 회색으로 되돌림
            textBlocks.forEach(text => text.classList.remove("active"));
            textBlocks2.forEach(text => text.classList.remove("active"));

            // 클릭된 이미지에 해당하는 텍스트만 흰색으로 변경
            textBlocks[index].classList.add("active");
            textBlocks2[index].classList.add("active");
        });
    });
});
// loading animation

document.addEventListener("DOMContentLoaded", function() {
    const numberDisplay = document.getElementById("numberDisplay");
    let currentNumber = 1;
    let interval;
    let hasAnimated = false; // 애니메이션이 이미 실행되었는지 확인하는 변수

    function updateNumber() {
        numberDisplay.textContent = currentNumber;

        if (currentNumber < 100) {
            if (currentNumber < 50) {
                currentNumber += Math.ceil(Math.random() * 5); // 앞부분은 빠르게 증가
            } else if (currentNumber < 98) {
                currentNumber += 1; // 중간 부분은 일정하게 증가
            } else if (currentNumber === 98) {
                setTimeout(() => {
                    currentNumber += 1; // 99로 증가
                }, 1000); // 1초 대기 후 증가
            } else {
                currentNumber += 1; // 99에서 100으로 증가
            }
        } else {
            clearInterval(interval); // 100에 도달하면 멈춤
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Loading wrapper is in view!"); // 감지 로그 추가
                if (!hasAnimated) {
                    hasAnimated = true; // 애니메이션 실행 상태 변경
                    interval = setInterval(updateNumber, 50); // 50ms 간격으로 업데이트
                }
            }
        });
    });

    // loading.wrapper 요소를 관찰합니다.
    const loadingWrapper = document.querySelector("loading");
    observer.observe(loadingWrapper);
});
