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
                isAnimating = true;
                currentIndex--;
                updateVisibility();
                setTimeout(() => { isAnimating = false; }, 800); 
            } else if (currentIndex === 0) {
                document.querySelector('.overview_sec').scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    updateVisibility();

    textSection.addEventListener('wheel', onScroll, { passive: false });
});

// main animation 
document.addEventListener('DOMContentLoaded', function() {
    const whatElements = document.querySelectorAll('.main_box span');
    const whatSection = document.querySelector('.what_conetent');
    const contentDetail1 = document.querySelector('.content_detail_l');
    const contentDetail2 = document.querySelector('.content_detail_2');
    let currentIndex = 0; // 현재 인덱스 추적
    let isAnimating = false; // 애니메이션 진행 중인지 여부

    // 텍스트 및 디테일 섹션 업데이트 함수
    const updateVisibility = () => {
        whatElements.forEach((el, index) => {
            el.style.display = index === currentIndex ? 'inline' : 'none'; // 현재 인덱스의 텍스트만 표시
        });

        console.log('현재 인덱스:', currentIndex);

        // main일 때 content_detail 표시, sub일 때 content_detail_2 표시
        if (currentIndex === 0) {
            contentDetail1.classList.add('fade-in');
            contentDetail1.style.display = 'flex';
            contentDetail2.classList.remove('fade-in');
            contentDetail2.style.display = 'none';
        } else {
            contentDetail1.classList.remove('fade-in');
            contentDetail1.style.display = 'none';
            contentDetail2.classList.add('fade-in');
            contentDetail2.style.display = 'flex';
        }
    };

    // 스크롤 이벤트 처리
    const onScroll = (event) => {
        event.preventDefault();

        if (isAnimating) return; // 애니메이션 진행 중이면 아무것도 하지 않음

        isAnimating = true;

        // 아래로 스크롤
        if (event.deltaY > 0) {
            if (currentIndex < whatElements.length - 1) {
                currentIndex++;
                updateVisibility();
            } else {
                // 마지막 텍스트에서 한 번 더 스크롤하면 다음 섹션으로 이동
                document.querySelector('.background').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // 위로 스크롤
        else if (event.deltaY < 0) {
            if (currentIndex > 0) {
                currentIndex--;
                updateVisibility();
            } else {
                // 첫 번째 텍스트에서 위로 스크롤하면 이전 섹션으로 이동
                document.querySelector('.main_content_sec').scrollIntoView({ behavior: 'smooth' });
            }
        }

        // 애니메이션 종료 후 상태 초기화
        setTimeout(() => {
            isAnimating = false;
        }, 800); // 800ms 동안 애니메이션
    };

    updateVisibility(); // 페이지 로드 후 첫 번째 텍스트 표시

    // 섹션에서 스크롤 이벤트 리스너 추가
    whatSection.addEventListener('wheel', onScroll, { passive: false });
});

//

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section'); // 모든 섹션 선택
    let isAnimating = false; // 애니메이션 진행 중인지 여부

    // 섹션이 화면에 맞춰지도록 하는 함수
    const scrollToSection = (section) => {
        if (!isAnimating) {
            isAnimating = true; // 애니메이션 시작
            section.scrollIntoView({ behavior: 'smooth' }); // 해당 섹션으로 부드럽게 스크롤
            setTimeout(() => { isAnimating = false; }, 800); // 800ms 후 애니메이션 종료
        }
    };

    // IntersectionObserver 설정
    const observerOptions = {
        root: null, // 뷰포트를 기준으로 관찰
        threshold: 0.5 // 섹션의 50%가 화면에 들어오면 트리거
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) { // 섹션이 화면에 50% 이상 들어왔을 때
                scrollToSection(entry.target); // 해당 섹션으로 부드럽게 스크롤
            }
        });
    }, observerOptions);

    // 각 섹션을 관찰하도록 설정
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});


