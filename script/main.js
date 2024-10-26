// intro vedio
// document.addEventListener("DOMContentLoaded", () => {
//     const introSection = document.getElementById("intro_video");

//     // 20초 대기 후 스크롤
//     setTimeout(() => {
//         document.querySelector(".intro_logo").scrollIntoView({ behavior: 'smooth' });
//     }, 20000); // 20초 (밀리초 단위)
// });
//trigger_text animation 
document.addEventListener("DOMContentLoaded", () => {
    const triggerText = document.querySelectorAll(".trigger_intro .trigger_text p");

    // Intersection Observer 생성
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerText.forEach((p, index) => {
                    setTimeout(() => {
                        p.classList.add("show");
                    }, index * 300); // 순차적으로 나타나도록 딜레이 설정
                });
            } else {
                // 섹션이 보이지 않으면 다시 초기화 (원한다면 제거 가능)
                triggerText.forEach(p => {
                    p.classList.remove("show");
                });
            }
        });
    }, { threshold: 0.5 }); // 섹션이 50% 보이면 애니메이션 시작

    // .trigger_intro 섹션 감시
    const triggerIntroSection = document.querySelector(".trigger_intro");
    observer.observe(triggerIntroSection);
});

//trigger_img 
document.addEventListener('DOMContentLoaded', () => {
    const triggerMain = document.querySelector('.trigger_main');
    const triCon = document.querySelector('.tri_con'); // tri_con 섹션
    const triIntro = document.querySelector('.trigger_intro'); // trigger_intro 섹션
    const imgContainers = document.querySelectorAll('.tri_img_container div');
    const textContainers = document.querySelectorAll('.tri_text_containter div');
    let currentIndex = 0;
    let isScrolling = false;
    let isActive = false;
    let hasReset = false; // 이미지 리셋 여부를 추적하는 플래그
  
    // 이미지 및 텍스트 변경 함수
    const changeImage = (index) => {
      imgContainers.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
          img.classList.add('active');
        }
      });
  
      textContainers.forEach((text, i) => {
        text.classList.remove('active');
        if (i === index) {
          text.classList.add('active');
        }
      });
    };
  
    // 기본 스크롤 이벤트 방지
    const preventScroll = (e) => {
      if (isActive) { // 섹션이 활성화된 상태일 때만 스크롤 방지
        e.preventDefault();
      }
    };
  
    // 스크롤 이벤트 처리 함수
    const onScroll = (e) => {
      if (!isActive || isScrolling) return;
  
      const deltaY = e.deltaY;
  
      // 첫 번째 이미지에서 위로 스크롤 허용
      if (currentIndex === 0 && deltaY < 0) {
        // 이전 섹션으로 이동
        window.removeEventListener('wheel', onScroll);
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        setTimeout(() => {
          window.addEventListener('wheel', onScroll, { passive: false });
        }, 500);
        return;
      }
  
      // 네 번째 이미지에서 아래로 스크롤 허용
      if (currentIndex === imgContainers.length - 1 && deltaY > 0) {
        // 다음 섹션으로 이동
        window.removeEventListener('wheel', onScroll);
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        setTimeout(() => {
          window.addEventListener('wheel', onScroll, { passive: false });
        }, 500);
        return;
      }
  
      // 스크롤 애니메이션을 위한 로직
      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 500);
  
      if (deltaY > 0 && currentIndex < imgContainers.length - 1) {
        currentIndex++;
      } else if (deltaY < 0 && currentIndex > 0) {
        currentIndex--;
      }
  
      changeImage(currentIndex);
    };
  
    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isActive = true;
  
          // 섹션으로 처음 진입 시 한 번만 이미지 리셋
          if (!hasReset) {
            changeImage(0);
            hasReset = true; // 한 번 리셋되었음을 표시
          }
  
          // 자연스럽게 섹션이 화면에 맞춰지도록 스크롤 조정
          entry.target.scrollIntoView({ behavior: 'smooth' });
          // 기본 스크롤 동작 방지 활성화
          window.addEventListener('wheel', preventScroll, { passive: false });
        } else {
          isActive = false;
          // 기본 스크롤 동작 방지 비활성화
          window.removeEventListener('wheel', preventScroll);
        }
      });
    }, { threshold: 0.3 });
  
    observer.observe(triggerMain);
    window.addEventListener('wheel', onScroll, { passive: false });
  });
  
  // tri_con animation
  document.addEventListener('scroll', () => {
    const triggerCon = document.querySelector('.trigger_con');
    const text0 = triggerCon.querySelector('.tri_con_text0');
    const text = triggerCon.querySelector('.tri_con_text');

    const rect = triggerCon.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        if (!text0.classList.contains('animate')) {
            text0.classList.add('animate');
        }
        if (!text.classList.contains('animate')) {
            text.classList.add('animate');
        }
    } else {
        text0.classList.remove('animate');
        text.classList.remove('animate');
    }
});

// music img
document.addEventListener('scroll', () => {
  const container = document.querySelector('.music_img_container');
  const images = container.querySelectorAll('img');

  const rect = container.getBoundingClientRect();
  if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 2) {
      images.forEach((img) => {
          if (!img.classList.contains('animate')) {
              img.classList.add('animate');
          }
      });
  } else {
      images.forEach((img) => {
          img.classList.remove('animate');
      });
  }
});

//music img curve
document.addEventListener('scroll', () => {
  const container = document.querySelector('.music_img_container');
  const images = container.querySelectorAll('.img_box img');
  const svgObject01 = document.querySelector('#svgObject01');
  const svgObject02 = document.querySelector('#svgObject02');
  const svgObject03 = document.querySelector('#svgObject03');
  const objects = container.querySelectorAll('object');

  const rect = container.getBoundingClientRect();
  if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 2) {
    // 이미지 애니메이션 트리거
    images.forEach((img) => {
      img.classList.add('animate');
    });

    // 이미지 애니메이션이 모두 끝난 후 첫 번째와 두 번째 SVG 애니메이션 시작
    images[images.length - 1].addEventListener('transitionend', () => {
      // 첫 번째와 두 번째 SVG 애니메이션을 동시에 시작
      svgObject01.classList.add('animate');
      svgObject02.classList.add('animate');

      // 두 번째 SVG 애니메이션이 끝난 후 세 번째 SVG 애니메이션 시작
      svgObject02.addEventListener('transitionend', () => {
        svgObject03.classList.add('animate');
      }, { once: true });
    }, { once: true });
  } else {
    // 섹션이 뷰포트 밖으로 나가면 초기 상태로 복귀
    images.forEach((img) => {
      img.classList.remove('animate');
    });

    // 모든 SVG 애니메이션 초기화
    objects.forEach((object) => {
      object.classList.remove('animate');
    });
  }
});








  
  
  




