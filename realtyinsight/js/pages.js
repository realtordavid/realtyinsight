/**
 * =============================================
 *  pages.js  –  사이트 전체 페이지 목록 관리
 * =============================================
 *
 *  ✅ 블로그 글 / 가이드 / 계산기를 추가할 때마다
 *     이 파일에만 항목을 추가하면 됩니다!
 *
 *  sitemap.xml 자동 생성: /sitemap-generator.html 에서 클릭 한 번!
 *
 *  각 필드 설명:
 *    url          – 사이트 루트 기준 상대경로
 *    lastmod      – 마지막 수정일 (YYYY-MM-DD)
 *    changefreq   – 업데이트 빈도 (always/hourly/daily/weekly/monthly/yearly/never)
 *    priority     – 중요도 0.0 ~ 1.0 (메인=1.0, 블로그=0.8, 계산기=0.7)
 *    title        – 관리 편의용 제목 (sitemap에는 포함 안 됨)
 */

const SITE_BASE_URL = 'https://realtordavid.github.io/realtyinsight';

const SITE_PAGES = [

    /* ───────────────── 메인 ───────────────── */
    {
        url:         '/',
        lastmod:     '2026-04-23',
        changefreq:  'weekly',
        priority:    '1.0',
        title:       '메인 페이지'
    },

    /* ───────────────── 블로그 ───────────────── */
    // 새 블로그 글을 추가하면 아래에 복사해서 붙여넣으세요 ↓
    {
        url:         '/blog/la-home-buying-5-mistakes/',
        lastmod:     '2026-02-27',
        changefreq:  'monthly',
        priority:    '0.8',
        title:       'LA 집살 때 가장 많이 망하는 포인트 5가지'
    },
    // {
    //     url:         '/blog/california-escrow-guide/',
    //     lastmod:     '2026.02.25',
    //     changefreq:  'monthly',
    //     priority:    '0.8',
    //     title:       '캘리포니아 에스크로 완벽하게 이해하기'
    // },

    /* ───────────────── 계산기 ───────────────── */
    {
        url:         '/calculator/mortgage-calculator.html',
        lastmod:     '2026-04-23',
        changefreq:  'monthly',
        priority:    '0.7',
        title:       '모기지 계산기'
    },
    {
        url:         '/calculator/property-tax-calculator.html',
        lastmod:     '2026-04-23',
        changefreq:  'monthly',
        priority:    '0.7',
        title:       '재산세 계산기'
    },
    {
        url:         '/calculator/total-cost-calculator.html',
        lastmod:     '2026-04-23',
        changefreq:  'monthly',
        priority:    '0.7',
        title:       '전체 구매 비용 계산기'
    },

    /* ───────────────── 가이드 (추후 추가) ───────────────── */
    // {
    //     url:         '/guides/first-buyer-guide/',
    //     lastmod:     '2026-05-01',
    //     changefreq:  'monthly',
    //     priority:    '0.8',
    //     title:       '첫 구매자를 위한 5단계 완벽 가이드'
    // },

];
