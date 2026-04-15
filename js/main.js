/* ============================================
   LA/OC 부동산 인사이트 - 메인 스크립트
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ========== 문의 폼 제출 ==========
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('상담 신청이 접수되었습니다. 2시간 내에 연락드리겠습니다.');
            this.reset();
        });
    }


    // ========== 블로그 그리드 드래그 스크롤 ==========
    document.querySelectorAll('.blog-grid').forEach(function (grid) {
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener('mousedown', function (e) {
            isDown = true;
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
            grid.style.userSelect = 'none';
        });

        grid.addEventListener('mouseleave', function () {
            isDown = false;
        });

        grid.addEventListener('mouseup', function () {
            isDown = false;
            grid.style.userSelect = '';
        });

        grid.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 1.5;
            grid.scrollLeft = scrollLeft - walk;
        });
    });

});
