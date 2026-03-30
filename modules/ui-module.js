/**
 * ui-module.js
 * 공통 UI 효과 및 애니메이션 유틸리티 (Global Namespace 방식)
 */
(function() {
  /**
   * 숫자가 목표값까지 올라가는 애니메이션
   */
  function animateCount(element, start, end, duration = 1500) {
    if (!element) return;
    
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      const current = Math.floor(easedProgress * (end - start) + start);
      element.textContent = current;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  /**
   * 간단한 토스트 메시지 출력
   */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'ui-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '25px',
      zIndex: '10000',
      fontSize: '0.9rem',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });

    setTimeout(() => toast.style.opacity = '1', 10);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * 배경 부유 아이콘 및 특수 효과 초기화
   */
  function initVisualEffects(containerId, emojiList = ['✨', '🌟', '💫', '🔥', '⚡']) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const item = document.createElement('div');
      item.className = 'floating-item';
      item.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
      
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;
      
      item.style.left = `${left}%`;
      item.style.top = `${top}%`;
      item.style.animationDelay = `${delay}s`;
      item.style.setProperty('--duration', `${duration}s`);
      
      container.appendChild(item);
    }
  }

  /**
   * 폭죽(Confetti) 효과 생성
   */
  function createConfetti() {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      const colors = ['#f2d74e', '#95c3de', '#ff9a91', '#85e3c0', '#a18cd1'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.left = Math.random() * 100 + 'vw';
      const duration = 2 + Math.random() * 3;
      confetti.style.setProperty('--duration', `${duration}s`);
      confetti.style.opacity = Math.random();
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), duration * 1000);
    }
  }

  // Global namespace 에 등록
  window.UIModule = {
    animateCount,
    showToast,
    initVisualEffects,
    createConfetti
  };
})();
