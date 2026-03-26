/**
 * share-module.js
 * 공유 기능을 담당하는 모듈입니다.
 */

const ShareModule = {
  /**
   * 클립보드에 현재 URL을 복사합니다.
   */
  copyUrl: function() {
    const currentUrl = window.location.href;
    
    // 복사 성공 시 트리거할 콜백이 있다면 실행 (모달 오픈 등)
    return navigator.clipboard.writeText(currentUrl)
      .then(() => true)
      .catch(err => {
        console.error('URL 복사 실패:', err);
        return false;
      });
  },

  /**
   * SNS 플랫폼별로 결과를 공유합니다.
   */
  shareToSNS: function(platform, data) {
    const text = `덕력 감별소 결과! 나는 [${data.category} 퀴즈]에서 [${data.grade}] 등급을 받았어! 내 점수는 ${data.score}점! 너도 도전해봐!`;
    const url = window.location.href;
    
    let shareUrl = '';

    switch (platform) {
      case 'x':
        // X(Twitter) 공유
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        // 인스타그램은 직접 공유 API가 없으므로 알림 처리 (일반적으로 스토리 공유는 앱 내 기능을 사용)
        alert('인스타그램 앱에서 이 페이지의 스크린샷을 찍어 스토리로 공유해보세요! 📸');
        return;
      case 'kakao':
        // 카카오톡 공유 (JS SDK가 필요한 경우를 위해 일단 기본 링크 공유 방식 제안)
        // 실제 운영 시에는 카카오 개발자 센터의 JS Key가 필요합니다.
        // 여기서는 간단한 웹 공유 URL 방식을 사용합니다.
        shareUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=YOUR_KAKAO_KEY&short_url=${encodeURIComponent(url)}`;
        alert('카카오톡 공유를 위해 팀 프로젝트의 카카오 API 키가 필요합니다. 현재는 링크 복사를 이용해 주세요! 💬');
        return;
      default:
        console.warn('지원하지 않는 플랫폼입니다:', platform);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }
};
