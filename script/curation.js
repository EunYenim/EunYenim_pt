const imageColumns = document.querySelectorAll('.image_column');
const outerWrapper = document.querySelector('.outer_wrapper'); 
const textContainers = document.querySelectorAll('.third_column > div'); // 텍스트 컨테이너 선택
const numberImages = document.querySelectorAll('.number_img'); // 넘버 이미지 선택
const fourthColumnTexts = document.querySelectorAll('.fourth_column > div'); // fourth_column 텍스트 선택

function handleScroll(column) {
    const scrollTop = column.scrollTop; // 현재 스크롤 위치
    const viewportHeight = window.innerHeight; // 뷰포트 높이
    const images = column.querySelectorAll('.scroll_image');

    let closestImage = null;
    let closestDistance = Infinity;
    let selectedIndex = 0;

    // 마지막 이미지를 선택하지 않도록 제한
    const lastImageIndex = images.length - 1;

    // 모든 이미지에서 selected 클래스 제거
    images.forEach((img, index) => {
        img.classList.remove('selected');

        const imageRect = img.getBoundingClientRect();
        const imageCenter = imageRect.top + imageRect.height / 2;

        // 뷰포트 중앙과 이미지 중앙 간의 거리 계산
        const distance = Math.abs(viewportHeight / 2 - imageCenter);

        if (distance < closestDistance && index < lastImageIndex) { // 마지막 이미지는 제외
            closestImage = img;
            closestDistance = distance;
            selectedIndex = index;
        }
    });

    // 선택된 이미지에 selected 클래스 추가
    if (closestImage) {
        closestImage.classList.add('selected');

        // 모든 텍스트 및 넘버 이미지 숨김 처리
        textContainers.forEach((textContainer) => {
            textContainer.style.display = 'none'; // 텍스트 숨기기
        });
        numberImages.forEach((numImg) => {
            numImg.style.display = 'none'; // 넘버 이미지 숨기기
        });

        // 선택된 이미지에 해당하는 텍스트 및 넘버 이미지 표시
        if (textContainers[selectedIndex]) {
            textContainers[selectedIndex].style.display = 'block';
        }
        if (numberImages[selectedIndex]) {
            numberImages[selectedIndex].style.display = 'block'; // 넘버 이미지 표시
        }

        // fourth_column 텍스트 업데이트: 선택된 인덱스에 맞는 텍스트만 표시
        fourthColumnTexts.forEach((fourthText, index) => {
            fourthText.style.display = (index === selectedIndex) ? 'block' : 'none';
        });

        const selectedImageRect = closestImage.getBoundingClientRect();
        const selectedImageCenter = selectedImageRect.top + selectedImageRect.height / 2;

        // 선택된 이미지의 중앙을 뷰포트의 중앙에 맞추기
        let offset = selectedImageCenter - viewportHeight / 2;
        let newScrollTop = scrollTop + offset;

        column.scrollTo({ top: newScrollTop, behavior: 'smooth' });

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

        // 첫 번째 이미지에 맞는 텍스트 및 넘버 이미지 표시
        textContainers.forEach((textContainer, index) => {
            textContainer.style.display = (index === 0) ? 'block' : 'none';
        });
        numberImages.forEach((numImg, index) => {
            numImg.style.display = (index === 0) ? 'block' : 'none';
        });
        // 첫 번째 이미지에 맞는 fourth_column 텍스트 표시
        fourthColumnTexts.forEach((fourthText, index) => {
            fourthText.style.display = (index === 0) ? 'block' : 'none';
        });

        console.log(`Selected image index: 0`); // 첫 번째 이미지 인덱스 출력
    }
});

// click img animation

const scrollImages = document.querySelectorAll('.scroll_image');

scrollImages.forEach((img) => {
    img.addEventListener('click', function() {
        // 기존 애니메이션 클래스 제거 (다시 클릭 시에도 애니메이션이 작동하도록)
        img.classList.remove('clicked_img');
        
        // 강제로 재실행할 수 있도록 짧은 시간 후에 다시 추가
        void img.offsetWidth; 
        img.classList.add('clicked_img');
    });
});

// loading img animation_margin
document.addEventListener("DOMContentLoaded", function() {
    const firstImg = document.querySelector(".scroll_image.first_img");
    const loadingSection = document.getElementById("loading");
    const expandableImg = document.querySelector(".expandable_img");

    firstImg.addEventListener("click", function() {
        // 로딩 섹션을 표시
        loadingSection.style.display = "block";

        // 이미지가 작아지는 효과 추가
        expandableImg.classList.add("shrink-grow");

        // 이미지가 다시 커지는 애니메이션 적용
        setTimeout(function() {
            expandableImg.classList.remove("shrink-grow");
            expandableImg.classList.add("grow-back");
        }, 500); // 축소 후 500ms 후에 다시 커짐
    });
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
