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


// sec3
document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.trigger_text div');
    const imageElements = document.querySelectorAll('.triggr_img_container .triggr_img');
    let currentIndex = 0; // 현재 인덱스 추적
    const textSection = document.querySelector('.trigger_sec');
    let isAnimating = false; // 애니메이션 진행 중인지 여부

    const updateVisibility = () => {
        textElements.forEach((el) => {
            el.classList.remove('visible'); // 모든 텍스트 숨기기
        });

        imageElements.forEach((img) => {
            img.style.display = 'none'; // 모든 이미지 숨기기
        });

        if (currentIndex < textElements.length) {
            textElements[currentIndex].classList.add('visible'); // 현재 텍스트 보이기
            imageElements[currentIndex].style.display = 'block'; // 현재 이미지 보이기
        }
    };

    const onScroll = (event) => {
        // 기본 스크롤 방지
        event.preventDefault();

        if (isAnimating) return; // 애니메이션 진행 중이면 아무것도 하지 않음

        // 아래로 스크롤
        if (event.deltaY > 0) {
            if (currentIndex < textElements.length - 1) {
                isAnimating = true; // 애니메이션 시작
                currentIndex++;
                updateVisibility(); // 텍스트 및 이미지 업데이트
                setTimeout(() => { isAnimating = false; }, 800); // 애니메이션 지속 시간을 800ms로 설정
            } else if (currentIndex === textElements.length - 1) {
                // 마지막 텍스트가 보이면 다음 섹션으로 이동
                document.querySelector('.trigger_overview_sec').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // 위로 스크롤
        if (event.deltaY < 0) {
            if (currentIndex > 0) {
                isAnimating = true; // 애니메이션 시작
                currentIndex--;
                updateVisibility(); // 텍스트 및 이미지 업데이트
                setTimeout(() => { isAnimating = false; }, 800); // 애니메이션 지속 시간을 800ms로 설정
            } else if (currentIndex === 0) {
                // 첫 번째 텍스트가 보이면 위의 섹션으로 이동
                document.querySelector('.overview_sec').scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    updateVisibility(); // 페이지 로드 후 첫 번째 텍스트 및 이미지 표시

    textSection.addEventListener('wheel', onScroll, { passive: false });
});
