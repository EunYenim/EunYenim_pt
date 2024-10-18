// img_select
const imageColumns = document.querySelectorAll('.image_column');
const outerWrapper = document.querySelector('.outer_wrapper'); // outer_wrapper 요소 선택
const numberImages = document.querySelectorAll('.number_img'); // 넘버 이미지 선택

function handleScroll(column) {
    const scrollTop = column.scrollTop; // 현재 스크롤 위치
    const viewportHeight = window.innerHeight; // 뷰포트 높이
    const images = column.querySelectorAll('.scroll_image');

    let closestImage = null;
    let closestDistance = Infinity;
    let selectedIndex = 0;

    // 모든 이미지에서 selected 클래스 제거
    images.forEach((img, index) => {
        img.classList.remove('selected');

        const imageRect = img.getBoundingClientRect();
        const imageCenter = imageRect.top + imageRect.height / 2;

        // 뷰포트 중앙과 이미지 중앙 간의 거리 계산
        const distance = Math.abs(viewportHeight / 2 - imageCenter);

        if (distance < closestDistance) {
            closestImage = img;
            closestDistance = distance;
            selectedIndex = index;
        }
    });

    // 선택된 이미지에 selected 클래스 추가
    if (closestImage) {
        closestImage.classList.add('selected');

        const selectedImageRect = closestImage.getBoundingClientRect();
        const selectedImageCenter = selectedImageRect.top + selectedImageRect.height / 2;

        // 선택된 이미지의 중앙을 뷰포트의 중앙에 맞추기
        let offset = selectedImageCenter - viewportHeight / 2;
        let newScrollTop = scrollTop + offset;

        column.scrollTo({ top: newScrollTop, behavior: 'smooth' });

        // 넘버 이미지를 모두 숨기고, 선택된 인덱스에 맞는 이미지만 표시
        numberImages.forEach((numImg, index) => {
            if (index === selectedIndex) {
                numImg.style.display = 'block'; // 선택된 넘버 이미지 보이기
            } else {
                numImg.style.display = 'none'; // 나머지 넘버 이미지 숨기기
            }
        });

        // 선택된 이미지의 인덱스를 콘솔에 출력
        console.log(`Selected image index: ${selectedIndex}`);
    }
}

// 디바운스 함수: 이벤트가 지나치게 자주 발생하지 않도록 제한
function debounceScroll(callback, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), delay);
    };
}

// 각 이미지 컬럼에 스크롤 이벤트 리스너 추가
imageColumns.forEach((column) => {
    column.addEventListener('scroll', debounceScroll(() => {
        handleScroll(column);
    }, 100)); // 100ms로 디바운스 적용
});

// 페이지 시작 시 첫 번째 이미지 선택
imageColumns.forEach((column) => {
    const firstImage = column.querySelector('.scroll_image');
    if (firstImage) {
        firstImage.classList.add('selected');
        const firstImageRect = firstImage.getBoundingClientRect();
        const firstImageCenter = firstImageRect.top + firstImageRect.height / 2;

        // 첫 번째 이미지의 중앙을 뷰포트의 중앙에 맞추기
        const offset = firstImageCenter - window.innerHeight / 2;
        const newScrollTop = column.scrollTop + offset;

        column.scrollTo({ top: newScrollTop, behavior: 'smooth' });

        // 첫 번째 이미지에 맞는 넘버 이미지 표시
        numberImages.forEach((numImg, index) => {
            if (index === 0) {
                numImg.style.display = 'block'; // 첫 번째 넘버 이미지 보이기
            } else {
                numImg.style.display = 'none'; // 나머지 넘버 이미지 숨기기
            }
        });

        console.log(`Selected image index: 0`); // 첫 번째 이미지 인덱스 출력
    }
});




















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
