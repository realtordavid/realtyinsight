/* ============================================
   블로그 관리자 페이지 스크립트
   ============================================ */

const ADMIN_PASSWORD = '1234';
const STORAGE_KEY    = 'blogs';

/* ──────────────────────────────────────────
   초기화
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

    // 세션이 유지되어 있으면 비밀번호 화면 건너뜀
    if (sessionStorage.getItem('blogAdmin') === 'true') {
        showAdminContent();
    }

    // Enter 키로 로그인
    document.getElementById('password-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') checkPassword();
    });

    // 폼 제출 이벤트
    document.getElementById('blog-form').addEventListener('submit', handleFormSubmit);
});


/* ──────────────────────────────────────────
   인증
────────────────────────────────────────── */
function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorEl = document.getElementById('error-msg');

    if (input === ADMIN_PASSWORD) {
        sessionStorage.setItem('blogAdmin', 'true');
        showAdminContent();
    } else {
        errorEl.classList.add('show');
        document.getElementById('password-input').value = '';
    }
}

function showAdminContent() {
    document.getElementById('password-screen').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
}

// 인라인 onclick에서 호출 가능하도록 전역 노출
window.checkPassword = checkPassword;


/* ──────────────────────────────────────────
   탭 전환
────────────────────────────────────────── */
function switchTab(tabName, btnEl) {
    // 모든 탭 콘텐츠 숨김
    document.querySelectorAll('.tab-content').forEach(function (tab) {
        tab.classList.add('hidden');
    });
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.classList.remove('active');
    });

    // 선택한 탭 표시
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    btnEl.classList.add('active');

    if (tabName === 'edit') {
        loadBlogList();
    }
}

window.switchTab = switchTab;


/* ──────────────────────────────────────────
   마크다운 → HTML 변환
────────────────────────────────────────── */
function convertMarkdownToHtml(markdown) {
    let html = markdown;

    // 제목 변환 (## → h2, ### → h3, #### → h4)
    html = html.replace(/^## (.+)$/gm,
        '<h2 style="font-size:1.8rem;color:#1a365d;margin-top:2rem;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:3px solid #d4af37;">$1</h2>');
    html = html.replace(/^### (.+)$/gm,
        '<h3 style="font-size:1.3rem;color:#1a365d;margin-top:1.5rem;margin-bottom:0.75rem;">$1</h3>');
    html = html.replace(/^#### (.+)$/gm,
        '<h4 style="font-size:1.1rem;color:#1a365d;margin-top:1rem;margin-bottom:0.5rem;">$1</h4>');

    // 굵은 텍스트 / 이탤릭
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g,     '<em>$1</em>');

    // 리스트 아이템 변환
    html = html.replace(/^\- (.+)$/gm,
        '<li style="margin-bottom:0.75rem;">$1</li>');

    // 연속된 <li> 묶기
    html = html.replace(/(<li[\s\S]*?<\/li>(?:\s*<li[\s\S]*?<\/li>)*)/g, function (m) {
        return '<ul style="margin-left:2rem;margin-bottom:1.5rem;">' + m + '</ul>';
    });

    // 단락 처리 (빈 줄 기준)
    const lines  = html.split('\n');
    let result   = '';
    let paragraph = '';

    function flushParagraph() {
        const text = paragraph.trim();
        if (!text) return;
        if (text.startsWith('<h') || text.startsWith('<ul') || text.startsWith('<li')) {
            result += text;
        } else {
            result += '<p style="margin-bottom:1.5rem;color:#555;line-height:1.8;">' + text + '</p>';
        }
        paragraph = '';
    }

    lines.forEach(function (line) {
        const trimmed = line.trim();

        if (trimmed === '') {
            flushParagraph();
            return;
        }

        if (trimmed.startsWith('<h') || trimmed.startsWith('<ul')) {
            flushParagraph();
            result += trimmed;
        } else {
            paragraph += (paragraph ? ' ' : '') + trimmed;
        }
    });

    flushParagraph(); // 마지막 단락 처리

    return result;
}


/* ──────────────────────────────────────────
   생성될 블로그 HTML 템플릿
────────────────────────────────────────── */
function buildBlogHtml(data) {
    const { title, meta, keywords, banner, category, author, date, bodyHtml } = data;

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - LA/OC 부동산</title>
    <meta name="description" content="${meta}">
    <meta name="keywords" content="${keywords}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.8; color: #333; background: #f9f9f9; }
        header { background: white; padding: 1rem 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        header h1 { color: #1a365d; margin: 0; font-size: 1.3rem; }
        main { max-width: 800px; margin: 0 auto; padding: 3rem 2rem; }
        .back-link { color: #1a365d; text-decoration: none; margin-bottom: 2rem; display: inline-block; font-weight: 500; }
        .back-link:hover { text-decoration: underline; }
        .banner {
            background:
                linear-gradient(135deg, rgba(26,54,93,0.7) 0%, rgba(212,175,55,0.5) 100%),
                url('${banner}') center/cover no-repeat;
            height: 400px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            margin-bottom: 2rem;
        }
        .banner h1 { font-size: 2rem; max-width: 640px; line-height: 1.3; padding: 0 1rem; }
        .article { background: white; padding: 2.5rem; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .meta { display: flex; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 2px solid #ecf0f1; flex-wrap: wrap; align-items: center; }
        .category { background: #1a365d; color: #d4af37; padding: 0.4rem 0.9rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem; }
        .meta-info { color: #999; font-size: 0.9rem; }
        footer { background: #1a365d; color: #ecf0f1; padding: 2rem; margin-top: 3rem; text-align: center; font-size: 0.9rem; }
    </style>
</head>
<body>
    <header>
        <h1>🏠 LA/OC 부동산 인사이트</h1>
    </header>
    <main>
        <a href="../../index.html" class="back-link">← 돌아가기</a>
        <div class="banner">
            <h1>${title}</h1>
        </div>
        <article class="article">
            <div class="meta">
                <span class="category">${category}</span>
                <span class="meta-info">📅 ${date}</span>
                <span class="meta-info">👤 ${author}</span>
            </div>
            ${bodyHtml}
        </article>
    </main>
    <footer>
        <p>&copy; 2026 LA/OC 부동산 구매 가이드. All rights reserved.</p>
    </footer>
</body>
</html>`;
}


/* ──────────────────────────────────────────
   폼 제출 처리 (새 글 작성 / 수정)
────────────────────────────────────────── */
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const title    = document.getElementById('title').value.trim();
    const meta     = document.getElementById('meta-description').value.trim();
    const slug     = document.getElementById('slug').value.trim();
    const category = document.getElementById('category').value;
    const author   = document.getElementById('author').value.trim();
    const keywords = document.getElementById('keywords').value.trim();
    const content  = document.getElementById('content').value.trim();
    const banner   = document.getElementById('banner-image').value.trim()
                     || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80';

    if (!title || !meta || !slug || !category || !keywords || !content) {
        alert('모든 필수 항목을 작성해주세요.');
        return;
    }

    const date = new Date().toLocaleDateString('ko-KR');

    // localStorage 저장
    const blogs     = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const editIndex = form.dataset.editIndex;

    const blogData = { title, meta, slug, category, author, keywords, content, banner, date };

    if (editIndex !== undefined && editIndex !== '') {
        blogs[parseInt(editIndex)] = blogData;
        delete form.dataset.editIndex;
    } else {
        blogs.push(blogData);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));

    // HTML 파일 생성 및 다운로드
    const bodyHtml  = convertMarkdownToHtml(content);
    const htmlFile  = buildBlogHtml({ title, meta, keywords, banner, category, author, date, bodyHtml });

    const link      = document.createElement('a');
    link.href       = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlFile);
    link.download   = slug + '-index.html';
    link.click();

    // 성공 메시지
    const successEl = document.getElementById('success-msg');
    successEl.textContent = '✅ ' + slug + '-index.html 파일이 다운로드되었습니다!';
    successEl.classList.add('show');
    setTimeout(function () { successEl.classList.remove('show'); }, 4000);

    // 초기화
    document.querySelector('.btn-submit').textContent = '✅ HTML 생성';
    form.reset();
}


/* ──────────────────────────────────────────
   미리보기
────────────────────────────────────────── */
function showPreview() {
    const title   = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !content) {
        alert('제목과 본문을 먼저 작성해주세요.');
        return;
    }

    const bodyHtml  = convertMarkdownToHtml(content);
    const banner    = document.getElementById('banner-image').value.trim()
                      || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80';
    const category  = document.getElementById('category').value  || '미분류';
    const author    = document.getElementById('author').value.trim() || 'David Lee';
    const meta      = document.getElementById('meta-description').value.trim() || '';
    const keywords  = document.getElementById('keywords').value.trim() || '';
    const date      = new Date().toLocaleDateString('ko-KR');

    const previewHtml = buildBlogHtml({ title, meta, keywords, banner, category, author, date, bodyHtml });

    const previewWin = window.open('', '_blank');
    if (previewWin) {
        previewWin.document.write(previewHtml);
        previewWin.document.close();
    } else {
        alert('팝업 차단이 활성화되어 있습니다. 팝업을 허용한 뒤 다시 시도해주세요.');
    }
}

window.showPreview = showPreview;


/* ──────────────────────────────────────────
   블로그 목록 (수정 탭)
────────────────────────────────────────── */
function loadBlogList() {
    const blogs     = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const container = document.getElementById('blog-list-container');

    if (blogs.length === 0) {
        container.innerHTML = '<p class="blog-list-empty">작성된 글이 없습니다.</p>';
        return;
    }

    container.innerHTML = blogs.map(function (blog, index) {
        return `
        <div class="blog-list-item">
            <div class="blog-list-item-info">
                <h3>${escapeHtml(blog.title)}</h3>
                <p>${escapeHtml(blog.slug)} &nbsp;|&nbsp; ${escapeHtml(blog.category)} &nbsp;|&nbsp; ${escapeHtml(blog.date)}</p>
            </div>
            <div class="blog-list-item-actions">
                <button class="btn-edit"   onclick="editBlog(${index})">✏️ 수정</button>
                <button class="btn-delete" onclick="deleteBlog(${index})">🗑️ 삭제</button>
            </div>
        </div>`;
    }).join('');
}

window.loadBlogList = loadBlogList;


/* ──────────────────────────────────────────
   글 수정
────────────────────────────────────────── */
function editBlog(index) {
    const blogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const blog  = blogs[index];
    if (!blog) return;

    document.getElementById('title').value            = blog.title;
    document.getElementById('meta-description').value = blog.meta;
    document.getElementById('slug').value             = blog.slug;
    document.getElementById('category').value         = blog.category;
    document.getElementById('author').value           = blog.author;
    document.getElementById('keywords').value         = blog.keywords;
    document.getElementById('content').value          = blog.content;
    document.getElementById('banner-image').value     = blog.banner;

    // 수정 모드 플래그 저장
    document.getElementById('blog-form').dataset.editIndex = index;

    // 글 작성 탭으로 전환
    document.querySelectorAll('.tab-content').forEach(function (tab) { tab.classList.add('hidden'); });
    document.querySelectorAll('.tab-btn').forEach(function (btn) { btn.classList.remove('active'); });
    document.getElementById('write-tab').classList.remove('hidden');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');

    // 버튼 텍스트 변경
    document.querySelector('.btn-submit').textContent = '✅ 글 업데이트';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.editBlog = editBlog;


/* ──────────────────────────────────────────
   글 삭제
────────────────────────────────────────── */
function deleteBlog(index) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const blogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    blogs.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    loadBlogList();
    alert('글이 삭제되었습니다.');
}

window.deleteBlog = deleteBlog;


/* ──────────────────────────────────────────
   유틸리티
────────────────────────────────────────── */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;');
}
