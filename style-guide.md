# Voyagé — Style Guide
> Tailwind CSS 기준 | Osmo-inspired White-first Design System | v2.0

---

## 목차

1. [색상 팔레트](#1-색상-팔레트)
2. [타이포그래피 스케일](#2-타이포그래피-스케일)
3. [간격 시스템](#3-간격-시스템)
4. [컴포넌트 규칙](#4-컴포넌트-규칙)
   - [버튼](#41-버튼)
   - [카드](#42-카드)
   - [인풋](#43-인풋)
5. [tailwind.config.js 전체 설정](#5-tailwindconfigjs-전체-설정)

---

## 1. 색상 팔레트

### 설계 원칙

- **White-first** — 순백 `#FFFFFF` 배경 위에 크림·린넨 서피스 레이어를 쌓는다
- **블랙 타이포** — 모든 헤딩·본문은 순수 블랙 계열
- **포인트 2개만** — Violet(CTA·포커스)과 Lime(NEW 배지·하이라이트)으로 채도 대비를 만든다
- **잉크 다크 카드** — 상세 정보 섹션에서 `#141412` 다크 서피스로 극적 대비를 연출

---

### 1-1. Primary — Neutral Scale

> 배경, 서피스, 보더, 텍스트 위계에 사용

| Token | Hex | Tailwind 클래스 | 용도 |
|-------|-----|----------------|------|
| `white` | `#FFFFFF` | `bg-white` | 페이지 기본 배경 |
| `cream` | `#F5F4EF` | `bg-cream` | 헤더·섹션 서피스 ★ |
| `linen` | `#EDECEA` | `bg-linen` | 카드 hover·구분 배경 |
| `smoke` | `#E0DED9` | `bg-smoke` / `border-smoke` | 기본 보더 |
| `silver` | `#B8B6B0` | `text-silver` | 보조 텍스트·placeholder |
| `ash` | `#6E6C66` | `text-ash` | muted 텍스트·캡션 |
| `charcoal` | `#2A2926` | `text-charcoal` | 강조 텍스트 |
| `black` | `#0D0D0B` | `text-black` / `bg-black` | 헤딩·Primary CTA ★ |

```js
// tailwind.config.js
colors: {
  white:    '#FFFFFF',
  cream:    '#F5F4EF',
  linen:    '#EDECEA',
  smoke:    '#E0DED9',
  silver:   '#B8B6B0',
  ash:      '#6E6C66',
  charcoal: '#2A2926',
  black:    '#0D0D0B',
}
```

---

### 1-2. Secondary — Accent Colors

> 시선을 유도하는 채도 강한 포인트. 절제해서 사용

| Token | Hex | Tailwind 클래스 | 용도 |
|-------|-----|----------------|------|
| `violet` | `#7B5CF6` | `bg-violet` / `text-violet` | CTA 버튼·포커스 링·AI 배지 ★ |
| `violet-lt` | `#EDE8FF` | `bg-violet-lt` | 날짜 선택 범위·hover 배경 |
| `lime` | `#C8F135` | `bg-lime` | NEW 배지·강조 하이라이트 ★ |
| `ink` | `#141412` | `bg-ink` | 다크 카드·코드블록 배경 |
| `ink-card` | `#1C1C1A` | `bg-ink-card` | 다크 카드 내부 |
| `ink-border` | `#2E2E2C` | `border-ink-border` | 다크 카드 보더 |

```js
// tailwind.config.js
colors: {
  violet:      '#7B5CF6',
  'violet-lt': '#EDE8FF',
  lime:        '#C8F135',
  ink:         '#141412',
  'ink-card':  '#1C1C1A',
  'ink-border':'#2E2E2C',
}
```

---

### 1-3. Neutral — Supporting Palette

> 날씨·환율·여행 정보 등 기능별 맥락 색상

| 용도 | Light BG | Main | Tailwind |
|------|----------|------|----------|
| 날씨·맑음 (Sky) | `#E8F1FF` | `#2F7CF6` | `bg-sky-lt` / `text-sky` |
| 환율·가격 (Amber) | `#FEF3D7` | `#F0A500` | `bg-amber-lt` / `text-amber` |
| 무비자·자연 (Green) | `#E8FFF1` | `#1AAB54` | `bg-green-lt` / `text-green` |
| 경고·오류 (Red) | `#FFF0EF` | `#E53935` | `bg-red-lt` / `text-red` |

---

### 1-4. Semantic Colors

> 상태 표시 전용. UI 기능 의미를 명확히 전달

| 상태 | Background | Text | 용도 |
|------|-----------|------|------|
| **Danger** | `#FFF0EF` | `#CC2B1A` | 오류 메시지, 입력 에러 |
| **Success** | `#EDFFF0` | `#1A7A2E` | 완료, 무비자 확인 |
| **Warning** | `#FFFBEA` | `#A36200` | 우기 경고, 주의사항 |
| **Info** | `#EEF3FF` | `#2B4ECC` | 여행 팁, 안내 메시지 |

```js
// tailwind.config.js
colors: {
  'sky-lt':    '#E8F1FF',  sky:    '#2F7CF6',
  'amber-lt':  '#FEF3D7',  amber:  '#F0A500',
  'green-lt':  '#E8FFF1',  green:  '#1AAB54',
  'red-lt':    '#FFF0EF',  red:    '#E53935',

  'danger-bg': '#FFF0EF',  'danger-tx': '#CC2B1A',
  'success-bg':'#EDFFF0',  'success-tx':'#1A7A2E',
  'warn-bg':   '#FFFBEA',  'warn-tx':   '#A36200',
  'info-bg':   '#EEF3FF',  'info-tx':   '#2B4ECC',
}
```

---

### 1-5. Surface Hierarchy

```
Page BG     →  bg-white     #FFFFFF   (기본 페이지)
Surface 1   →  bg-cream     #F5F4EF   (헤더, 섹션 배경)
Surface 2   →  bg-linen     #EDECEA   (카드 hover, 구분)
Border      →  border-smoke #E0DED9   (기본 선)
Dark Card   →  bg-ink       #141412   (다크 정보 카드)
```

---

## 2. 타이포그래피 스케일

### 폰트 패밀리

| 역할 | 폰트 | 웨이트 | 특징 |
|------|------|--------|------|
| **Display** | `Syne` | 400·500·600·700·800 | 타이트한 자간, 에디토리얼 헤딩 |
| **Body** | `DM Sans` | 300·400·500 | 가독성 중심, UI 전반 |

```html
<!-- Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
```

```js
// tailwind.config.js
fontFamily: {
  display: ['Syne', 'sans-serif'],
  body:    ['DM Sans', 'sans-serif'],
  sans:    ['DM Sans', 'sans-serif'], // base override
},
```

---

### 타입 스케일

| Role | 클래스 | 크기 | 웨이트 | 자간 | 행간 | 폰트 |
|------|--------|------|--------|------|------|------|
| **Hero** | `text-7xl` | 72px | 800 | `-0.04em` | `0.92` | Syne |
| **Display** | `text-5xl` | 48px | 700 | `-0.03em` | `1.0` | Syne |
| **H1** | `text-4xl` | 36px | 700 | `-0.025em` | `1.1` | Syne |
| **H2** | `text-2xl` | 24px | 600 | `-0.02em` | `1.2` | Syne |
| **H3** | `text-xl` | 20px | 600 | `-0.015em` | `1.3` | Syne |
| **Body Large** | `text-base` | 16px | 400 | `0` | `1.7` | DM Sans |
| **Body** | `text-sm` | 14px | 400 | `0` | `1.6` | DM Sans |
| **Caption / Label** | `text-xs` | 12px | 500 | `0.12em` | `1.5` | DM Sans |
| **Overline** | `text-[10px]` | 10px | 600 | `0.18em` | `—` | DM Sans |

```html
<!-- Hero -->
<h1 class="font-display text-7xl font-extrabold tracking-[-0.04em] leading-[0.92] text-black">
  Where to?
</h1>

<!-- H1 -->
<h1 class="font-display text-4xl font-bold tracking-[-0.025em] text-black">
  추천 여행지
</h1>

<!-- Body -->
<p class="font-body text-sm font-normal text-ash leading-relaxed">
  환율: 1 THB = 38.2 KRW · 비자 불필요
</p>

<!-- Caption / Overline -->
<span class="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-silver">
  동남아시아 · 단기 여행 최적
</span>
```

---

## 3. 간격 시스템

### 기본 원칙

- **4px 기반 8-포인트 그리드** — 모든 간격은 4의 배수
- Tailwind 기본 spacing scale 그대로 사용 (`space-1` = 4px, `space-2` = 8px …)
- 컴포넌트 내부 gap은 `px` 단위, 섹션 간 여백은 `rem` 단위

---

### 토큰 참조표

| Token | px | Tailwind | 주요 용도 |
|-------|----|----------|-----------|
| `space-1` | 4px | `p-1`, `gap-1` | 아이콘 갭, 인라인 미세 간격 |
| `space-2` | 8px | `p-2`, `gap-2` | 배지 패딩, 컴팩트 UI |
| `space-3` | 12px | `p-3`, `gap-3` | 카드 내부 항목 간격 |
| `space-4` | 16px | `p-4`, `gap-4` | 카드 기본 패딩 |
| `space-5` | 20px | `p-5`, `gap-5` | 인풋 좌우 패딩 |
| `space-6` | 24px | `p-6`, `gap-6` | 그리드 gap, 섹션 내 간격 |
| `space-8` | 32px | `p-8`, `gap-8` | 컴포넌트 간 주요 간격 |
| `space-10` | 40px | `p-10` | 섹션 패딩 (컴팩트) |
| `space-12` | 48px | `p-12` | 섹션 헤더 여백 |
| `space-16` | 64px | `p-16` | 페이지 섹션 분리 |
| `space-20` | 80px | `p-20` | 히어로 상하 패딩 |
| `space-24` | 96px | `p-24` | 페이지 최상단 큰 여백 |

---

### Border Radius

| Token | px | Tailwind | 용도 |
|-------|----|----------|------|
| `r-xs` | 4px | `rounded-sm` | 배지, 코드 스니펫 |
| `r-sm` | 8px | `rounded-lg` | 버튼(기본), 인풋 |
| `r-md` | 12px | `rounded-xl` | 작은 카드, 모달 |
| `r-lg` | 20px | `rounded-[20px]` | 인포 카드 |
| `r-xl` | 28px | `rounded-[28px]` | Destination 카드 ★ |
| `r-pill` | 9999px | `rounded-full` | 필터 태그, 배지 |

---

## 4. 컴포넌트 규칙

---

### 4-1. 버튼

#### 버튼 위계

| Variant | 배경 | 텍스트 | 보더 | 용도 |
|---------|------|--------|------|------|
| **Primary** | `bg-black` | `text-white` | 없음 | 주요 CTA |
| **Accent** | `bg-violet` | `text-white` | 없음 | AI 추천, 특별 CTA |
| **Lime** | `bg-lime` | `text-black` | 없음 | NEW, 긴급 하이라이트 |
| **Secondary** | `bg-transparent` | `text-black` | `border-[1.5px] border-black` | 보조 액션 |
| **Ghost** | `bg-transparent` | `text-ash` | 없음 | 취소, 텍스트 링크 |

#### Primary Button

```html
<button class="
  inline-flex items-center gap-1.5
  bg-black text-white
  text-sm font-medium
  px-[22px] py-[11px]
  rounded-lg
  hover:bg-charcoal hover:-translate-y-px
  transition-all duration-150
">
  여행지 추천받기
</button>
```

#### Accent Button (Violet)

```html
<button class="
  inline-flex items-center gap-1.5
  bg-violet text-white
  text-sm font-medium
  px-[22px] py-[11px]
  rounded-lg
  hover:bg-[#6848E0] hover:-translate-y-px
  transition-all duration-150
">
  ✦ AI 추천 보기
</button>
```

#### Lime Highlight Button

```html
<button class="
  inline-flex items-center
  bg-lime text-black
  text-[13px] font-semibold
  px-[18px] py-[8px]
  rounded-full
  hover:bg-[#B2DC28]
  transition-colors duration-150
">
  NEW ↗
</button>
```

#### Secondary (Outlined)

```html
<button class="
  inline-flex items-center
  bg-transparent text-black
  text-sm font-medium
  px-[21px] py-[10px]
  rounded-lg
  border-[1.5px] border-black
  hover:bg-black hover:text-white
  transition-all duration-150
">
  더 보기
</button>
```

#### Ghost

```html
<button class="
  inline-flex items-center
  bg-transparent text-ash
  text-sm font-medium
  px-4 py-[10px]
  rounded-lg
  hover:text-black hover:bg-linen
  transition-all duration-150
">
  취소
</button>
```

#### 사이즈

```html
<!-- Small -->
<button class="text-xs px-[14px] py-[7px] rounded-sm ...">Small</button>

<!-- Default -->
<button class="text-sm px-[22px] py-[11px] rounded-lg ...">Default</button>

<!-- Large -->
<button class="text-base px-[28px] py-[14px] rounded-xl ...">Large — 출발하기</button>
```

#### 필터 태그 (Filter Tag)

```html
<!-- Default -->
<button class="
  inline-flex items-center gap-1.5
  bg-white text-ash
  text-xs font-medium tracking-[0.03em]
  px-[14px] py-[6px]
  rounded-full
  border-[1.5px] border-smoke
  hover:border-black hover:text-black
  transition-all duration-150
">
  🏝 아시아
</button>

<!-- Active -->
<button class="
  inline-flex items-center gap-1.5
  bg-black text-white
  text-xs font-medium tracking-[0.03em]
  px-[14px] py-[6px]
  rounded-full
  border-[1.5px] border-black
">
  🌏 전체
</button>
```

#### 아이콘 버튼

```html
<button class="
  w-[38px] h-[38px]
  inline-flex items-center justify-center
  bg-white text-ash
  rounded-lg
  border-[1.5px] border-smoke
  hover:border-black hover:text-black
  transition-all duration-150
">
  ♡
</button>
```

---

### 4-2. 카드

#### Destination Card (여행지 추천 카드)

```html
<div class="
  bg-white
  border-[1.5px] border-smoke
  rounded-[28px]
  overflow-hidden
  cursor-pointer
  hover:border-black hover:-translate-y-[3px]
  transition-all duration-200
  w-[214px]
">
  <!-- 이미지 영역 -->
  <div class="relative h-[130px] bg-linen flex items-center justify-center text-[40px]">
    🏯
    <!-- 배지 -->
    <span class="
      absolute top-[10px] left-[10px]
      text-[9px] font-semibold tracking-[0.1em] uppercase
      px-[9px] py-[3px]
      rounded-full
      bg-white text-black border border-smoke
    ">아시아</span>

    <!-- NEW 배지 (lime) -->
    <!-- <span class="absolute top-[10px] left-[10px] text-[9px] font-semibold tracking-[0.1em] uppercase px-[9px] py-[3px] rounded-full bg-lime text-black">NEW</span> -->
  </div>

  <!-- 카드 바디 -->
  <div class="p-4">
    <p class="font-display text-lg font-bold tracking-[-0.02em] text-black mb-0.5">방콕</p>
    <p class="text-xs text-silver mb-2">태국 · Bangkok</p>
    <p class="text-[11px] text-ash leading-[1.5] mb-3 line-clamp-2">
      겨울에도 따뜻한 28°C, 단기 여행에 최적인 도시
    </p>
    <div class="flex items-center justify-between">
      <span class="font-display text-xl font-bold tracking-[-0.02em] text-black">28°C</span>
      <span class="text-[11px] text-silver">1 THB ≈ 38원</span>
    </div>
  </div>
</div>
```

#### Info Card — Dark Surface (상세 정보 카드)

```html
<div class="
  bg-ink-card
  border border-ink-border
  rounded-2xl
  p-5
  hover:border-[#555553]
  transition-colors duration-200
">
  <p class="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#888886] mb-2">
    🌤 현재 날씨
  </p>
  <p class="font-display text-2xl font-bold tracking-[-0.025em] text-cream">
    28°C
  </p>
  <p class="text-xs text-[#666664] mt-0.5">맑음 · 습도 65%</p>
</div>
```

#### 배지

```html
<!-- AI 추천 — Lime -->
<span class="
  inline-flex items-center gap-1
  text-[10px] font-semibold tracking-[0.06em] uppercase
  px-2 py-[3px] rounded-full
  bg-lime text-black
">
  <span class="w-[5px] h-[5px] rounded-full bg-black"></span>
  AI 추천
</span>

<!-- 무비자 — Success -->
<span class="
  inline-flex items-center gap-1
  text-[10px] font-semibold tracking-[0.06em] uppercase
  px-2 py-[3px] rounded-full
  bg-success-bg text-success-tx
">
  <span class="w-[5px] h-[5px] rounded-full bg-success-tx"></span>
  무비자
</span>

<!-- 우기 주의 — Warning -->
<span class="
  inline-flex items-center gap-1
  text-[10px] font-semibold tracking-[0.06em] uppercase
  px-2 py-[3px] rounded-full
  bg-warn-bg text-warn-tx
">
  <span class="w-[5px] h-[5px] rounded-full bg-warn-tx"></span>
  우기 주의
</span>
```

---

### 4-3. 인풋

#### Text Input

```html
<!-- Base -->
<input
  type="text"
  placeholder="출발지를 입력하세요"
  class="
    w-full
    bg-white text-black text-sm
    px-4 py-[11px]
    rounded-lg
    border-[1.5px] border-smoke
    placeholder:text-silver
    hover:border-charcoal
    focus:border-black focus:ring-[3px] focus:ring-black/[0.08]
    outline-none
    transition-all duration-150
  "
/>

<!-- Error -->
<input
  type="text"
  class="
    w-full
    bg-white text-black text-sm
    px-4 py-[11px]
    rounded-lg
    border-[1.5px] border-red
    ring-[3px] ring-red/10
    outline-none
  "
/>
```

#### Input Label & Helper Text

```html
<div class="flex flex-col gap-1.5">
  <!-- Label -->
  <label class="text-[11px] font-semibold tracking-[0.1em] uppercase text-ash">
    출발 도시
  </label>

  <!-- Input -->
  <input type="text" placeholder="출발지를 입력하세요" class="..." />

  <!-- Hint -->
  <p class="text-[11px] text-silver">서울(ICN) 기준 항공편으로 계산됩니다</p>

  <!-- Error message -->
  <!-- <p class="text-[11px] text-red">출발일은 오늘 이후 날짜여야 합니다</p> -->
</div>
```

#### Date Picker (react-day-picker CSS 오버라이드)

```css
/* globals.css */
:root {
  --rdp-cell-size: 36px;
  --rdp-accent-color: #0D0D0B;           /* 선택 날짜 배경 = black */
  --rdp-background-color: #EDE8FF;       /* 범위 배경 = violet-lt */
  --rdp-accent-color-dark: #0D0D0B;
  --rdp-background-color-dark: #EDE8FF;
  --rdp-outline: 2px solid #0D0D0B;
  --rdp-outline-selected: 2px solid #0D0D0B;
}

/* 선택 범위 스타일 */
.rdp-day_range_middle {
  background-color: var(--rdp-background-color) !important;
  color: #0D0D0B !important;
  border-radius: 0;
}
.rdp-day_range_start,
.rdp-day_range_end {
  background-color: #0D0D0B !important;
  color: #FFFFFF !important;
  border-radius: 4px !important;
}

/* nav 버튼 */
.rdp-nav_button {
  background: #EDECEA;
  border: 1px solid #E0DED9;
  border-radius: 4px;
  transition: all 0.15s;
}
.rdp-nav_button:hover {
  background: #0D0D0B;
  color: #FFFFFF;
  border-color: #0D0D0B;
}
```

#### AI 분석 결과 박스 (Date Picker 하단)

```html
<div class="
  p-3 mt-3
  bg-violet-lt
  border border-[#C4B8FF]
  rounded-xl
">
  <p class="text-[10px] font-bold tracking-[0.1em] uppercase text-violet mb-1">AI 분석</p>
  <p class="text-xs text-[#4A3A9A]">겨울 · 단기여행 · 따뜻한 기후 추천</p>
</div>
```

---

## 5. tailwind.config.js 전체 설정

```js
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      // ── Colors ──────────────────────────────────────────
      colors: {
        // Neutral scale
        cream:    '#F5F4EF',
        linen:    '#EDECEA',
        smoke:    '#E0DED9',
        silver:   '#B8B6B0',
        ash:      '#6E6C66',
        charcoal: '#2A2926',
        // black: Tailwind 기본 black (#000) 대신 커스텀 사용 시 아래 추가
        // black: '#0D0D0B',

        // Accent
        violet:       '#7B5CF6',
        'violet-lt':  '#EDE8FF',
        lime:         '#C8F135',

        // Dark surface
        ink:          '#141412',
        'ink-card':   '#1C1C1A',
        'ink-border': '#2E2E2C',

        // Supporting
        sky:          '#2F7CF6',
        'sky-lt':     '#E8F1FF',
        amber:        '#F0A500',
        'amber-lt':   '#FEF3D7',
        'brand-green': '#1AAB54',
        'green-lt':   '#E8FFF1',
        red:          '#E53935',
        'red-lt':     '#FFF0EF',

        // Semantic
        'danger-bg':  '#FFF0EF',
        'danger-tx':  '#CC2B1A',
        'success-bg': '#EDFFF0',
        'success-tx': '#1A7A2E',
        'warn-bg':    '#FFFBEA',
        'warn-tx':    '#A36200',
        'info-bg':    '#EEF3FF',
        'info-tx':    '#2B4ECC',
      },

      // ── Typography ──────────────────────────────────────
      fontFamily: {
        display: ['Syne', ...fontFamily.sans],
        body:    ['DM Sans', ...fontFamily.sans],
        sans:    ['DM Sans', ...fontFamily.sans],
      },

      fontSize: {
        // Hero
        '7xl': ['72px', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        // Display
        '5xl': ['48px', { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        // H1
        '4xl': ['36px', { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        // H2
        '2xl': ['24px', { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        // H3
        'xl':  ['20px', { lineHeight: '1.3',  letterSpacing: '-0.015em' }],
        // Body Large
        'base':['16px', { lineHeight: '1.7',  letterSpacing: '0' }],
        // Body
        'sm':  ['14px', { lineHeight: '1.6',  letterSpacing: '0' }],
        // Caption
        'xs':  ['12px', { lineHeight: '1.5',  letterSpacing: '0.12em' }],
      },

      // ── Spacing ─────────────────────────────────────────
      // Tailwind 기본 spacing scale 사용 (4px 단위)
      // 커스텀 추가 시 아래에 정의
      spacing: {
        // 필요 시 명시적 토큰 추가
        // 'section': '80px',
      },

      // ── Border Radius ────────────────────────────────────
      borderRadius: {
        'none': '0',
        'sm':   '4px',
        'DEFAULT': '8px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '20px',
        '2xl':  '28px',   // Destination Card
        '3xl':  '32px',
        'full': '9999px', // 필터 태그, 배지
      },

      // ── Box Shadow ───────────────────────────────────────
      boxShadow: {
        // Osmo-style: 그림자 최소화, 보더로 깊이 표현
        'focus': '0 0 0 3px rgba(13,13,11,0.08)',
        'focus-violet': '0 0 0 3px rgba(123,92,246,0.2)',
        'focus-red': '0 0 0 3px rgba(229,57,53,0.1)',
      },

      // ── Transitions ──────────────────────────────────────
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // card-reason line-clamp-2
  ],
};
```

---

## 6. 사용 패턴 요약

### 색상 사용 우선순위

```
헤딩          → text-black (또는 text-[#0D0D0B])
본문          → text-ash (#6E6C66)
보조 텍스트   → text-silver (#B8B6B0)
CTA 버튼      → bg-black 또는 bg-violet
강조 배지     → bg-lime text-black
배경 (기본)   → bg-white
배경 (섹션)   → bg-cream
카드 (기본)   → bg-white border-smoke
카드 (다크)   → bg-ink-card border-ink-border
보더 (기본)   → border-smoke
보더 (hover)  → border-black
포커스 링     → ring-3 ring-black/8
```

### 컴포넌트 hover 패턴 (Osmo-style)

```
버튼 hover  → bg-charcoal -translate-y-px
카드 hover  → border-black -translate-y-[3px]
인풋 hover  → border-charcoal
아이콘 버튼 → border-black text-black
필터 태그   → border-black text-black
다크 카드   → border-[#555553]
```

---

*— Voyagé Style Guide v2.0 | Osmo-inspired White-first —*
