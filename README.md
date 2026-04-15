# LA/OC 부동산 구매 가이드 - 미국 부동산 인사이트

## 프로젝트 개요
LA/OC 지역 한인 대상 부동산 구매 정보 제공 정적 웹사이트.  
공인중개사 David Lee (CA License #02218947) 운영.

---

## ✅ 완료된 기능

### 메인 페이지 (`index.html`)
- 헤더 네비게이션 (블로그, 가이드, 문의, 블로그 관리)
- 히어로 섹션 (CTA 버튼 포함)
- 전문가 프로필 (사진 로드 실패 시 이모지 대체)
- 최신 블로그 카드 (가로 드래그 스크롤)
- 무료 가이드 다운로드 섹션
- 도구 & 계산기 섹션 (색상별 카드 - 파랑/초록/주황)
- 무료 상담 문의 폼
- 푸터 (연락처, 콘텐츠 링크)

### 블로그
- `blog/la-home-buying-5-mistakes/index.html` - LA 집살 때 망하는 포인트 5가지

### 계산기 (3개 완성)
- `calculator/mortgage-calculator.html` - 모기지 계산기
  - 입력: 구매가, 다운페이, 이자율, 대출기간, 재산세, 보험, HOA
  - 출력: 월간 총 비용, 대출 정보, 이자율 비교표
  - 기능: 슬라이더, 초기화, 결과 다운로드(.txt)

- `calculator/property-tax-calculator.html` - 재산세 계산기
  - 입력: 구매가, 지역 선택(7개), 감면액, 집값 상승률
  - 출력: 연간/월간 재산세, 5년 예측(Prop 13 기준), 지역별 비교표
  - 기능: 사용자 정의 세율, 초기화, 결과 다운로드(.txt)

- `calculator/total-cost-calculator.html` - 전체 구매 비용 계산기
  - 입력: 구매가, 다운페이(비율/금액), 클로징비용, 검사비, 감정료, 타이틀보험, PMI, 기타
  - 출력: 클로징 시 필요 총 현금, 월간 비용(6.5% 30년 기준), 첫 해 비용 요약
  - 기능: 비율↔금액 자동 연동, 초기화, 결과 다운로드(.txt)

### 블로그 관리자 (`blog-admin.html`)
- 비밀번호 로그인 (비밀번호: 1234)
- 새 글 작성 / 글 수정 탭
- 마크다운 → HTML 변환
- HTML 파일 생성 및 다운로드
- localStorage 기반 글 목록 관리

---

## 📂 파일 구조

```
index.html                          # 메인 페이지
blog-admin.html                     # 블로그 관리자 페이지
README.md

css/
  style.css                         # 메인 스타일
  blog.css                          # 블로그 글 공통 스타일
  calculator.css                    # 계산기 공통 스타일 (3개 공유)
  admin.css                         # 블로그 관리자 스타일

js/
  main.js                           # 메인 페이지 스크립트
  admin.js                          # 블로그 관리자 스크립트

images/
  suk.jpg                           # 전문가 프로필 사진

blog/
  la-home-buying-5-mistakes/
    index.html                      # 블로그 글 1

calculator/
  mortgage-calculator.html          # 모기지 계산기
  property-tax-calculator.html      # 재산세 계산기
  total-cost-calculator.html        # 전체 구매 비용 계산기
```

---

## 🔗 주요 URL 경로

| 경로 | 설명 |
|------|------|
| `/index.html` | 메인 페이지 |
| `/blog-admin.html` | 블로그 관리자 |
| `/blog/la-home-buying-5-mistakes/index.html` | 블로그 글 1 |
| `/calculator/mortgage-calculator.html` | 모기지 계산기 |
| `/calculator/property-tax-calculator.html` | 재산세 계산기 |
| `/calculator/total-cost-calculator.html` | 전체 구매 비용 계산기 |

---

## 🎨 디자인 시스템

| 컬러 | 용도 |
|------|------|
| `#1a365d` | Primary Navy (헤더, 제목) |
| `#d4af37` | Accent Gold (버튼, 강조) |
| `#b8860b` | Dark Gold (호버) |
| `#f9f9f9` | Background |
| `#333` | Body Text |

---

## ❌ 미구현 기능

- 추가 블로그 글
- 폼 백엔드 연동 (Formspree / EmailJS - 나중에 추가 예정)
- 지역정보 섹션
- PDF 가이드 실제 다운로드
- sitemap.xml / robots.txt
- Google Analytics
- 개인정보처리방침 / 이용약관 페이지

---

## 🚀 권장 다음 개발 순서

1. 블로그 글 추가 (blog-admin.html 이용)
2. 폼 연동 (Formspree 추천, 월 50건 무료)
3. 지역정보 섹션 추가
4. SEO 강화 (sitemap.xml, og:image)
5. Cloudflare Pages 배포

---

## 📞 연락처
- Email: info@yoursite.com
- Phone: (424) 123-4567
- Location: Los Angeles, CA
- Instagram: [@realestate_insight_](https://instagram.com/realestate_insight_)

© 2026 LA/OC 부동산 구매 가이드
