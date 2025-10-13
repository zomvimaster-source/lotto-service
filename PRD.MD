# 🎰 로또 종합 서비스 - 완전판 개발 문서

> **"번호 추천부터 당첨 인증까지, 대한민국 최고의 로또 플랫폼"**

---

## 📋 목차

### PART 1: 프로젝트 개요
1. [비전과 목표](#1-비전과-목표)
2. [핵심 차별점](#2-핵심-차별점)
3. [수익 모델](#3-수익-모델)
4. [타겟 사용자](#4-타겟-사용자)

### PART 2: 디자인 시스템
5. [컬러 팔레트](#5-컬러-팔레트)
6. [타이포그래피](#6-타이포그래피)
7. [컴포넌트 스타일](#7-컴포넌트-스타일)
8. [반응형 디자인](#8-반응형-디자인)

### PART 3: 기능 명세
9. [번호 생성기 (6가지 전략)](#9-번호-생성기)
10. [회차별 조회](#10-회차별-조회)
11. [1등 판매점](#11-1등-판매점)
12. [실수령액 계산기](#12-실수령액-계산기)
13. [당첨 인증 시스템 ⭐](#13-당첨-인증-시스템)

### PART 4: 기술 스택
14. [Frontend](#14-frontend)
15. [Backend](#15-backend)
16. [Database](#16-database)
17. [Infrastructure](#17-infrastructure)

### PART 5: 개발 로드맵
18. [Phase 1: MVP (2주)](#18-phase-1-mvp)
19. [Phase 2: 성장 (1개월)](#19-phase-2-성장)
20. [Phase 3: 수익화 (2개월)](#20-phase-3-수익화)
21. [Phase 4: 확장 (3개월~)](#21-phase-4-확장)

### PART 6: SEO & 마케팅
22. [SEO 최적화](#22-seo-최적화)
23. [마케팅 전략](#23-마케팅-전략)
24. [성장 해킹](#24-성장-해킹)

### PART 7: 법적 & 운영
25. [법적 체크리스트](#25-법적-체크리스트)
26. [운영 가이드](#26-운영-가이드)
27. [리스크 관리](#27-리스크-관리)

---

# PART 1: 프로젝트 개요

## 1. 비전과 목표

### 🎯 비전
**"대한민국 로또 구매자의 필수 플랫폼"**

### 📊 목표 (12개월)
```
월 방문자: 100,000명
구독자: 2,000명
월 매출: 500만원
```

### 💡 핵심 가치 제안
1. **편의성**: 클릭 한 번으로 번호 생성
2. **신뢰성**: 592회차 데이터 분석 기반
3. **투명성**: 실제 당첨자 공개
4. **커뮤니티**: 함께하는 행운

---

## 2. 핵심 차별점

### 🌟 경쟁사 대비 우위

| 기능 | 우리 | 경쟁사 A | 경쟁사 B |
|------|------|----------|----------|
| 번호 생성 전략 | 6가지 | 2-3가지 | 1-2가지 |
| 실수령액 계산 | ✅ | ❌ | ✅ |
| 1등 판매점 | ✅ 지도 연동 | ✅ 리스트만 | ❌ |
| **당첨 인증** | ✅ **독점!** | ❌ | ❌ |
| UI/UX | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 모바일 최적화 | ✅ | 부분 | ❌ |

### 🎯 킬러 기능: 당첨 인증 시스템
```
"우리 사이트에서 생성한 번호로 실제 3등 당첨!"
→ 소셜 프루프 + 바이럴 효과
→ 타 사이트에 없는 유일한 기능
```

---

## 3. 수익 모델

### 💰 4가지 수익원

#### 1) Google AdSense (메인)
```
예상 월 수익 (6개월 후):
- 방문자: 10,000명
- 페이지뷰: 50,000
- CPC: $0.5
- 수익: 50만~100만원
```

#### 2) 구독 서비스 (프리미엄)
```
월 990원:
- 무제한 번호 저장
- 5등까지 당첨 알림 (SMS)
- 광고 제거
- 통계 분석

예상 수익:
- 구독자 500명: 월 49.5만원
- 구독자 1,000명: 월 99만원
```

#### 3) 제휴 마케팅
```
- 쿠팡 파트너스
- 로또 관련 서적
- 행운의 부적
예상 수익: 월 10~30만원
```

#### 4) 프리미엄 기능
```
- 1회성 결제:
  - 과거 전체 데이터 다운로드: 5,000원
  - 맞춤 분석 리포트: 10,000원
```

### 📊 총 예상 수익 (12개월 후)
```
AdSense: 200만원
구독: 200만원
제휴: 50만원
기타: 50만원
─────────────
총합: 500만원/월
연 매출: 6,000만원
```

---

## 4. 타겟 사용자

### 👥 주요 페르소나

#### 페르소나 1: "데이터 민수" (35세, 직장인)
```
특징:
- 데이터 기반 의사결정 선호
- 통계에 관심 많음
- 주 1회 로또 구매 (5,000원)

니즈:
- 번호 선택에 고민 많음
- 전략적 접근 원함
- 당첨 확률 정보 필요

해결책:
- 6가지 데이터 기반 전략
- 통계 정보 제공
- 과거 패턴 분석
```

#### 페르소나 2: "편의 지향 영희" (28세, 프리랜서)
```
특징:
- 바쁜 일상
- 모바일 위주 사용
- 간편함 추구

니즈:
- 빠른 번호 선택
- 언제 어디서나 접근
- 간단한 인터페이스

해결책:
- 클릭 한 번 번호 생성
- 모바일 최적화
- 직관적 UI
```

#### 페르소나 3: "커뮤니티 철수" (42세, 자영업)
```
특징:
- 로또 커뮤니티 활동
- 경험 공유 좋아함
- SNS 활발

니즈:
- 다른 사람 전략 궁금
- 당첨 사례 보고 싶음
- 소통 욕구

해결책:
- 당첨자 명예의 전당
- SNS 공유 기능
- 전략별 통계
```

---

# PART 2: 디자인 시스템

## 5. 컬러 팔레트

### 🎨 브랜드 컬러

#### Primary Colors
```css
/* 메인 브랜드 컬러 */
--purple-600: #9333ea;  /* 주 액션 버튼 */
--purple-700: #7e22ce;  /* 호버 상태 */
--purple-50: #faf5ff;   /* 배경 강조 */

/* 서브 컬러 */
--pink-600: #db2777;    /* 강조 포인트 */
--pink-50: #fce7f3;     /* 배경 */
```

#### Strategy Colors (전략별 색상)
```css
/* 각 전략 고유 색상 */
--strategy-hot: #ef4444;      /* 🔥 최다 출현 - 빨강 */
--strategy-cold: #3b82f6;     /* ❄️ 최소 출현 - 파랑 */
--strategy-balanced: #10b981; /* ⚖️ 균형 - 초록 */
--strategy-oddeven: #a855f7;  /* 🎭 홀짝 - 보라 */
--strategy-high: #eab308;     /* 💎 고숫자 - 노랑 */
--strategy-random: #6b7280;   /* 🎲 랜덤 - 회색 */
```

#### Lotto Ball Colors (로또 공 색상)
```css
/* 실제 로또 공 색상 재현 */
--ball-1-10: #facc15;    /* 1-10번: 노랑 */
--ball-11-20: #60a5fa;   /* 11-20번: 파랑 */
--ball-21-30: #f87171;   /* 21-30번: 빨강 */
--ball-31-40: #4b5563;   /* 31-40번: 회색 */
--ball-41-45: #10b981;   /* 41-45번: 초록 */
```

#### Semantic Colors
```css
/* 상태 표시 */
--success: #10b981;  /* 성공, 당첨 */
--warning: #f59e0b;  /* 경고 */
--error: #ef4444;    /* 에러 */
--info: #3b82f6;     /* 정보 */
```

#### Gradient Backgrounds
```css
/* 메인 배경 */
.bg-main {
  background: linear-gradient(
    to bottom right,
    #e0e7ff,  /* indigo-100 */
    #fce7f3,  /* pink-100 */
    #fce7f3
  );
}

/* 프리미엄 배경 */
.bg-premium {
  background: linear-gradient(
    135deg,
    #9333ea,  /* purple-600 */
    #db2777   /* pink-600 */
  );
}

/* 당첨 배너 배경 */
.bg-winner {
  background: linear-gradient(
    90deg,
    #fbbf24,  /* yellow-400 */
    #f97316   /* orange-500 */
  );
}
```

---

## 6. 타이포그래피

### 📝 폰트 시스템

#### Font Family
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
                'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
                sans-serif;
```

#### Heading Styles
```css
/* H1 - 메인 타이틀 */
h1 {
  font-size: 2.25rem;    /* 36px */
  font-weight: 700;      /* bold */
  line-height: 1.2;
  color: #1f2937;        /* gray-800 */
  letter-spacing: -0.025em;
}

/* H2 - 섹션 타이틀 */
h2 {
  font-size: 1.875rem;   /* 30px */
  font-weight: 700;
  line-height: 1.3;
  color: #1f2937;
}

/* H3 - 서브 타이틀 */
h3 {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;      /* semibold */
  line-height: 1.4;
  color: #374151;        /* gray-700 */
}

/* H4 - 카드 타이틀 */
h4 {
  font-size: 1.25rem;    /* 20px */
  font-weight: 600;
  line-height: 1.5;
  color: #374151;
}
```

#### Body Text
```css
/* 일반 본문 */
.text-body {
  font-size: 1rem;       /* 16px */
  font-weight: 400;      /* normal */
  line-height: 1.6;
  color: #4b5563;        /* gray-600 */
}

/* 작은 텍스트 */
.text-small {
  font-size: 0.875rem;   /* 14px */
  line-height: 1.5;
  color: #6b7280;        /* gray-500 */
}

/* 미세 텍스트 */
.text-xs {
  font-size: 0.75rem;    /* 12px */
  line-height: 1.4;
  color: #9ca3af;        /* gray-400 */
}
```

#### Special Text
```css
/* 강조 텍스트 */
.text-emphasis {
  font-weight: 600;
  color: #9333ea;        /* purple-600 */
}

/* 당첨 금액 표시 */
.text-prize {
  font-size: 2rem;       /* 32px */
  font-weight: 700;
  color: #9333ea;
  font-variant-numeric: tabular-nums;
}

/* 번호 표시 */
.text-number {
  font-size: 1.5rem;     /* 24px */
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
```

---

## 7. 컴포넌트 스타일

### 🧩 재사용 컴포넌트

#### 1) Lotto Ball (로또 공)
```css
.lotto-ball {
  /* 기본 스타일 */
  width: 4rem;           /* 64px */
  height: 4rem;
  border-radius: 9999px; /* 완전한 원 */
  
  /* 레이아웃 */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 텍스트 */
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  
  /* 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
              0 2px 4px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;
}

.lotto-ball:hover {
  transform: scale(1.1);
}

/* 크기 변형 */
.lotto-ball-sm {
  width: 2.5rem;   /* 40px */
  height: 2.5rem;
  font-size: 1rem;
}

.lotto-ball-lg {
  width: 5rem;     /* 80px */
  height: 5rem;
  font-size: 2rem;
}
```

#### 2) Strategy Card (전략 카드)
```css
.strategy-card {
  /* 레이아웃 */
  background: white;
  border-radius: 1rem;   /* 16px */
  padding: 1.5rem;       /* 24px */
  
  /* 그림자 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* 애니메이션 */
  transition: all 0.3s ease;
  cursor: pointer;
}

.strategy-card:hover {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

/* 전략 아이콘 */
.strategy-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* 전략 제목 */
.strategy-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

/* 전략 설명 */
.strategy-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* 생성 버튼 */
.strategy-button {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  color: white;
  transition: opacity 0.2s;
}

.strategy-button:hover {
  opacity: 0.9;
}
```

#### 3) Winner Banner (당첨 배너)
```css
.winner-banner {
  /* 레이아웃 */
  background: linear-gradient(90deg, #fbbf24, #f97316);
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  
  /* 애니메이션 */
  animation: pulse 2s infinite;
  box-shadow: 0 10px 15px rgba(251, 191, 36, 0.3);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

.winner-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.winner-info {
  flex: 1;
}

.winner-nickname {
  font-weight: 700;
  font-size: 1.125rem;
}

.winner-details {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-top: 0.25rem;
}
```

#### 4) Tab Navigation (탭 네비게이션)
```css
.tab-container {
  background: white;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.tab-button {
  /* 기본 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
  
  /* 비활성 상태 */
  color: #6b7280;
  background: transparent;
}

.tab-button:hover {
  background: #f3f4f6;
}

/* 활성 상태 */
.tab-button.active {
  background: #9333ea;
  color: white;
  box-shadow: 0 4px 6px rgba(147, 51, 234, 0.3);
}

.tab-icon {
  width: 1.25rem;
  height: 1.25rem;
}
```

#### 5) Result Card (결과 카드)
```css
.result-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.result-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.result-numbers {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-info {
  font-size: 0.875rem;
  color: #6b7280;
}
```

#### 6) Store Card (판매점 카드)
```css
.store-card {
  background: linear-gradient(
    to right,
    #fef3c7,  /* yellow-50 */
    #fed7aa   /* orange-50 */
  );
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.store-info {
  flex: 1;
}

.store-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.store-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.store-badge {
  background: #eab308;  /* yellow-500 */
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.store-address {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.store-actions {
  display: flex;
  gap: 0.5rem;
}

.store-action-btn {
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.store-action-btn.copy {
  background: white;
  color: #6b7280;
}

.store-action-btn.copy:hover {
  background: #f3f4f6;
}

.store-action-btn.navigate {
  background: #9333ea;
  color: white;
}

.store-action-btn.navigate:hover {
  background: #7e22ce;
}
```

---

## 8. 반응형 디자인

### 📱 Breakpoints (Tailwind 기준)

```css
/* Mobile First 접근 */

/* Extra Small (기본) */
/* 0px ~ 639px */
.container {
  padding: 1rem;
}

/* Small (sm) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }
  
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Medium (md) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
  
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tab-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Large (lg) */
@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .lotto-ball {
    width: 5rem;
    height: 5rem;
    font-size: 2rem;
  }
}

/* Extra Large (xl) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }
}
```

### 📐 반응형 유틸리티 클래스

```css
/* 텍스트 크기 */
.text-responsive {
  font-size: 1rem;      /* Mobile */
}

@media (min-width: 768px) {
  .text-responsive {
    font-size: 1.125rem; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .text-responsive {
    font-size: 1.25rem;  /* Desktop */
  }
}

/* 간격 */
.spacing-responsive {
  margin-bottom: 1rem;  /* Mobile */
}

@media (min-width: 768px) {
  .spacing-responsive {
    margin-bottom: 1.5rem; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .spacing-responsive {
    margin-bottom: 2rem; /* Desktop */
  }
}
```

---

# PART 3: 기능 명세

## 9. 번호 생성기

### 🎰 6가지 전략

#### 전략 1: 🔥 최다 출현 번호
```javascript
strategy: {
  id: 'hot',
  name: '🔥 최다 출현 번호',
  description: '과거에 가장 많이 나온 번호들',
  color: 'bg-red-500',
  icon: 'TrendingUp',
  
  algorithm: () => {
    const hotNumbers = [12, 21, 33, 16, 38, 6, 7, 18, 19, 13];
    return shuffleArray(hotNumbers).slice(0, 6).sort((a, b) => a - b);
  },
  
  stats: {
    totalGenerated: 15234,
    winners: {
      rank1: 0,
      rank2: 1,
      rank3: 8,
      rank4: 45,
      rank5: 123
    }
  }
}
```

#### 전략 2: ❄️ 최소 출현 번호
```javascript
strategy: {
  id: 'cold',
  name: '❄️ 최소 출현 번호',
  description: '이제 나올 차례라고 믿는 번호들',
  color: 'bg-blue-500',
  icon: 'TrendingDown',
  
  algorithm: () => {
    const coldNumbers = [5, 32, 20, 25, 22, 9, 40, 8, 29, 23];
    return shuffleArray(coldNumbers).slice(0, 6).sort((a, b) => a - b);
  }
}
```

#### 전략 3: ⚖️ 균형 전략
```javascript
strategy: {
  id: 'balanced',
  name: '⚖️ 균형 전략',
  description: '구간별로 골고루 선택',
  color: 'bg-green-500',
  icon: 'Target',
  
  algorithm: () => {
    const sections = [
      randomFromRange(1, 9),
      randomFromRange(10, 19),
      randomFromRange(20, 29),
      randomFromRange(30, 39),
      randomFromRange(40, 45),
      randomFromRange(1, 45)
    ];
    return [...new Set(sections)].slice(0, 6).sort((a, b) => a - b);
  }
}
```

#### 전략 4: 🎭 홀짝 조화
```javascript
strategy: {
  id: 'oddEven',
  name: '🎭 홀짝 조화',
  description: '홀수 3개 + 짝수 3개 (가장 흔한 패턴 32.9%)',
  color: 'bg-purple-500',
  icon: 'Zap',
  
  algorithm: () => {
    const odds = [];
    const evens = [];
    
    while (odds.length < 3) {
      const num = randomFromRange(1, 45);
      if (num % 2 === 1 && !odds.includes(num)) {
        odds.push(num);
      }
    }
    
    while (evens.length < 3) {
      const num = randomFromRange(1, 45);
      if (num % 2 === 0 && !evens.includes(num)) {
        evens.push(num);
      }
    }
    
    return [...odds, ...evens].sort((a, b) => a - b);
  }
}
```

#### 전략 5: 💎 고숫자 전략
```javascript
strategy: {
  id: 'highNumber',
  name: '💎 고숫자 전략',
  description: '32~45 포함 (당첨금 독식 확률 UP)',
  color: 'bg-yellow-500',
  icon: 'Sparkles',
  
  algorithm: () => {
    // 32-45 범위에서 2개
    const highNums = [
      randomFromRange(32, 45),
      randomFromRange(32, 45)
    ];
    
    // 1-31 범위에서 4개
    const lowNums = Array.from(
      {length: 4}, 
      () => randomFromRange(1, 31)
    );
    
    return [...new Set([...highNums, ...lowNums])]
      .slice(0, 6)
      .sort((a, b) => a - b);
  },
  
  advantage: '대부분 1-31(생일) 선택 → 32-45 포함 시 당첨금 독식!'
}
```

#### 전략 6: 🎲 완전 랜덤
```javascript
strategy: {
  id: 'random',
  name: '🎲 완전 랜덤',
  description: '순수한 운에 맡기기',
  color: 'bg-gray-500',
  icon: 'Shuffle',
  
  algorithm: () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(randomFromRange(1, 45));
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }
}
```

### 🔧 핵심 유틸리티 함수

```javascript
// 랜덤 숫자 생성
function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 배열 섞기 (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 중복 제거 생성
function generateUniqueNumbers(count, min, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(randomFromRange(min, max));
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

// 공 색상 결정
function getBallColor(num) {
  if (num <= 10) return 'bg-yellow-400';
  if (num <= 20) return 'bg-blue-400';
  if (num <= 30) return 'bg-red-400';
  if (num <= 40) return 'bg-gray-600';
  return 'bg-green-500';
}
```

---

## 10. 회차별 조회

### 📊 동행복권 API 연동

#### API 명세
```javascript
// Endpoint
const API_URL = 'https://www.dhlottery.co.kr/common.do';

// Parameters
{
  method: 'getLottoNumber',
  drwNo: 1192  // 회차 번호
}

// Response
{
  "returnValue": "success",
  "drwNo": 1192,
  "drwNoDate": "2025-10-04",
  "drwtNo1": 10,
  "drwtNo2": 16,
  "drwtNo3": 23,
  "drwtNo4": 36,
  "drwtNo5": 39,
  "drwtNo6": 40,
  "bnusNo": 11,
  "firstWinamnt": 2489736750,
  "firstPrzwnerCo": 12
}
```

#### 구현 코드
```javascript
async function getLottoData(round) {
  try {
    const response = await fetch(
      `${API_URL}?method=getLottoNumber&drwNo=${round}`
    );
    const data = await response.json();
    
    if (data.returnValue !== 'success') {
      throw new Error('Invalid round number');
    }
    
    return {
      round: data.drwNo,
      date: data.drwNoDate,
      numbers: [
        data.drwtNo1,
        data.drwtNo2,
        data.drwtNo3,
        data.drwtNo4,
        data.drwtNo5,
        data.drwtNo6
      ],
      bonus: data.bnusNo,
      firstWinAmount: data.firstWinamnt,
      firstWinners: data.firstPrzwnerCo
    };
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

// 최신 회차 자동 계산
function getCurrentRound() {
  const firstDrawDate = new Date('2002-12-07');
  const today = new Date();
  const weeksDiff = Math.floor(
    (today - firstDrawDate) / (7 * 24 * 60 * 60 * 1000)
  );
  return weeksDiff + 1;
}

// 사용 예시
const latestRound = getCurrentRound();
const data = await getLottoData(latestRound);
```

#### Rate Limiting 처리
```javascript
class LottoAPI {
  constructor() {
    this.cache = new Map();
    this.lastRequest = 0;
    this.minInterval = 1000; // 1초
  }
  
  async getData(round) {
    // 캐시 확인
    if (this.cache.has(round)) {
      return this.cache.get(round);
    }
    
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(
          resolve, 
          this.minInterval - timeSinceLastRequest
        )
      );
    }
    
    // API 호출
    const data = await getLottoData(round);
    this.lastRequest = Date.now();
    this.cache.set(round, data);
    
    return data;
  }
}
```

---

## 11. 1등 판매점

### 🏆 판매점 데이터 구조

```javascript
const winningStore = {
  id: 1,
  name: '행운로또',
  address: '서울 강남구 테헤란로 123',
  addressDetail: '1층',
  lat: 37.5665,
  lng: 126.9780,
  count: 15,  // 1등 배출 횟수
  phone: '02-1234-5678',
  businessHours: '08:00-22:00',
  recentWin: {
    round: 1180,
    date: '2025.07.20',
    amount: 2450000000
  }
};
```

### 📍 주요 기능

#### 1) 주소 복사
```javascript
async function copyAddress(address) {
  try {
    await navigator.clipboard.writeText(address);
    showToast('주소가 복사되었습니다!', 'success');
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = address;
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('주소가 복사되었습니다!', 'success');
  }
}
```

#### 2) 카카오맵 길찾기
```javascript
function openNavigation(address) {
  const kakaoUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
  window.open(kakaoUrl, '_blank');
}

// 네이버 지도 (대안)
function openNaverMap(address) {
  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
  window.open(naverUrl, '_blank');
}
```

#### 3) 가까운 판매점 찾기 (Phase 2)
```javascript
function findNearestStore(userLat, userLng, stores) {
  // Haversine formula로 거리 계산
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반경 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * 
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  return stores
    .map(store => ({
      ...store,
      distance: calculateDistance(
        userLat, userLng, 
        store.lat, store.lng
      )
    }))
    .sort((a, b) => a.distance - b.distance);
}

// 사용자 위치 가져오기
navigator.geolocation.getCurrentPosition(
  position => {
    const nearest = findNearestStore(
      position.coords.latitude,
      position.coords.longitude,
      winningStores
    );
    displayStores(nearest);
  },
  error => {
    console.error('Location error:', error);
    displayStores(winningStores); // 기본 리스트 표시
  }
);
```

---

## 12. 실수령액 계산기

### 💰 세금 계산 로직

#### 세율 구조
```javascript
const TAX_RATES = {
  tier1: {
    threshold: 50000000,    // 5천만원
    incomeTax: 0,           // 비과세
    localTax: 0
  },
  tier2: {
    threshold: 300000000,   // 3억
    incomeTax: 0.22,        // 22%
    localTax: 0.1           // 소득세의 10%
  },
  tier3: {
    threshold: Infinity,
    incomeTax: 0.33,        // 33%
    localTax: 0.1
  }
};
```

#### 계산 함수
```javascript
function calculateTax(winAmount) {
  const amount = parseInt(winAmount);
  
  if (isNaN(amount) || amount <= 0) {
    return null;
  }
  
  let incomeTax = 0;
  let localTax = 0;
  let taxRate = 0;
  
  if (amount <= TAX_RATES.tier1.threshold) {
    // 5천만원 이하: 비과세
    incomeTax = 0;
    localTax = 0;
    taxRate = 0;
  } else if (amount <= TAX_RATES.tier2.threshold) {
    // 5천만원 ~ 3억: 22%
    incomeTax = amount * TAX_RATES.tier2.incomeTax;
    localTax = incomeTax * TAX_RATES.tier2.localTax;
    taxRate = 22;
  } else {
    // 3억 초과: 33%
    incomeTax = amount * TAX_RATES.tier3.incomeTax;
    localTax = incomeTax * TAX_RATES.tier3.localTax;
    taxRate = 33;
  }
  
  return {
    original: amount,
    incomeTax: Math.floor(incomeTax),
    localTax: Math.floor(localTax),
    totalTax: Math.floor(incomeTax + localTax),
    finalAmount: Math.floor(amount - incomeTax - localTax),
    taxRate,
    taxPercentage: ((incomeTax + localTax) / amount * 100).toFixed(1)
  };
}

// 숫자 포맷팅
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 사용 예시
const result = calculateTax(2000000000);
console.log(`
  당첨금: ${formatNumber(result.original)}원
  소득세: -${formatNumber(result.incomeTax)}원 (${result.taxRate}%)
  지방세: -${formatNumber(result.localTax)}원 (10%)
  총 세금: -${formatNumber(result.totalTax)}원 (${result.taxPercentage}%)
  실수령: ${formatNumber(result.finalAmount)}원
`);
```

#### 예시 케이스
```javascript
const testCases = [
  { amount: 50000000, expected: 50000000 },     // 비과세
  { amount: 100000000, expected: 75680000 },    // 22%
  { amount: 300000000, expected: 227040000 },   // 22%
  { amount: 2000000000, expected: 1267200000 }  // 33%
];

testCases.forEach(tc => {
  const result = calculateTax(tc.amount);
  console.log(`
    입력: ${formatNumber(tc.amount)}원
    실수령: ${formatNumber(result.finalAmount)}원
    예상: ${formatNumber(tc.expected)}원
    일치: ${result.finalAmount === tc.expected ? '✅' : '❌'}
  `);
});
```

---

## 13. 당첨 인증 시스템 ⭐

### 🏆 핵심 기능

#### Database Schema
```sql
-- 생성된 번호 저장
CREATE TABLE generated_numbers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- 번호 정보
  numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 6),
  strategy VARCHAR(50) NOT NULL,
  round INTEGER NOT NULL,
  
  -- 사용자 정보
  user_identifier VARCHAR(255),  -- 닉네임 or IP hash
  user_type VARCHAR(20),          -- 'nickname' or 'anonymous'
  ip_hash VARCHAR(64),            -- SHA-256 hashed IP
  
  -- 당첨 정보
  is_checked BOOLEAN DEFAULT FALSE,
  matched_count INTEGER DEFAULT 0,
  prize_rank INTEGER,             -- 1~5등, NULL = 낙첨
  prize_amount BIGINT,
  bonus_matched BOOLEAN DEFAULT FALSE,
  
  -- 공유 정보
  is_public BOOLEAN DEFAULT TRUE,
  share_count INTEGER DEFAULT 0,
  
  INDEX idx_round (round),
  INDEX idx_user (user_identifier),
  INDEX idx_prize (prize_rank),
  INDEX idx_created (created_at DESC)
);

-- 통계 테이블
CREATE TABLE winning_stats (
  id UUID PRIMARY KEY,
  strategy VARCHAR(50) NOT NULL,
  round INTEGER NOT NULL,
  total_generated INTEGER DEFAULT 0,
  rank_1_count INTEGER DEFAULT 0,
  rank_2_count INTEGER DEFAULT 0,
  rank_3_count INTEGER DEFAULT 0,
  rank_4_count INTEGER DEFAULT 0,
  rank_5_count INTEGER DEFAULT 0,
  
  UNIQUE(strategy, round)
);

-- 사용자 세션
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY,
  user_identifier VARCHAR(255) UNIQUE,
  nickname VARCHAR(50),
  total_generated INTEGER DEFAULT 0,
  best_rank INTEGER,
  total_prize_amount BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW()
);
```

#### 번호 저장 API
```javascript
// POST /api/save-numbers
async function saveNumbers(req, res) {
  const { numbers, strategy, nickname } = req.body;
  
  // IP 해싱
  const ipHash = crypto
    .createHash('sha256')
    .update(req.ip || 'unknown')
    .digest('hex');
  
  // 현재 회차
  const currentRound = getCurrentRound();
  
  // 저장
  const { data, error } = await supabase
    .from('generated_numbers')
    .insert({
      numbers,
      strategy,
      round: currentRound,
      user_identifier: nickname || ipHash,
      user_type: nickname ? 'nickname' : 'anonymous',
      ip_hash: ipHash
    })
    .select()
    .single();
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  // 고유 URL 생성
  const uniqueUrl = `/my-numbers/${data.id}`;
  
  res.json({
    success: true,
    id: data.id,
    url: uniqueUrl,
    message: '번호가 저장되었습니다!'
  });
}
```

#### 자동 당첨 확인 (Cron Job)
```javascript
// Vercel Cron: 매주 토요일 21:00
export const config = {
  schedule: '0 21 * * 6'  // Cron expression
};

export default async function checkWinning(req, res) {
  const currentRound = getCurrentRound();
  
  // 1. 당첨번호 조회
  const winningData = await fetch(
    `${API_URL}?method=getLottoNumber&drwNo=${currentRound}`
  ).then(r => r.json());
  
  const winningNumbers = [
    winningData.drwtNo1,
    winningData.drwtNo2,
    winningData.drwtNo3,
    winningData.drwtNo4,
    winningData.drwtNo5,
    winningData.drwtNo6
  ];
  const bonusNumber = winningData.bnusNo;
  
  // 2. 미확인 번호 조회
  const { data: generatedNumbers } = await supabase
    .from('generated_numbers')
    .select('*')
    .eq('round', currentRound)
    .eq('is_checked', false);
  
  // 3. 당첨 확인
  const updates = [];
  const winners = [];
  
  for (const record of generatedNumbers) {
    const matched = countMatches(
      record.numbers, 
      winningNumbers
    );
    const bonusMatch = record.numbers.includes(bonusNumber);
    
    const rank = determineRank(matched, bonusMatch);
    const amount = rank ? getPrizeAmount(rank, winningData) : null;
    
    updates.push({
      id: record.id,
      is_checked: true,
      matched_count: matched,
      bonus_matched: bonusMatch,
      prize_rank: rank,
      prize_amount: amount
    });
    
    if (rank) {
      winners.push({
        ...record,
        rank,
        amount
      });
      
      // 알림 발송
      await sendNotification(record, rank, amount);
    }
  }
  
  // 4. 일괄 업데이트
  await supabase
    .from('generated_numbers')
    .upsert(updates);
  
  // 5. 통계 업데이트
  await updateStats(currentRound, updates);
  
  res.json({
    success: true,
    checked: generatedNumbers.length,
    winners: winners.length,
    details: winners
  });
}

// 매칭 확인
function countMatches(generated, winning) {
  return generated.filter(n => winning.includes(n)).length;
}

// 등수 결정
function determineRank(matched, bonusMatch) {
  if (matched === 6) return 1;
  if (matched === 5 && bonusMatch) return 2;
  if (matched === 5) return 3;
  if (matched === 4) return 4;
  if (matched === 3) return 5;
  return null;
}

// 당첨금 추정
function getPrizeAmount(rank, winningData) {
  const firstPrize = winningData.firstWinamnt;
  
  const amounts = {
    1: firstPrize,
    2: Math.floor(firstPrize * 0.4),  // 추정
    3: Math.floor(firstPrize * 0.05), // 추정
    4: 50000,
    5: 5000
  };
  
  return amounts[rank];
}
```

#### 명예의 전당 API
```javascript
// GET /api/hall-of-fame
async function getHallOfFame(req, res) {
  const { 
    rank,           // 필터: 1~5
    strategy,       // 필터: hot/cold/etc
    limit = 20, 
    offset = 0 
  } = req.query;
  
  let query = supabase
    .from('generated_numbers')
    .select('*')
    .not('prize_rank', 'is', null)
    .eq('is_public', true)
    .order('prize_amount', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (rank) {
    query = query.eq('prize_rank', parseInt(rank));
  }
  
  if (strategy) {
    query = query.eq('strategy', strategy);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  // 개인정보 제거
  const sanitized = data.map(({ ip_hash, ...rest }) => rest);
  
  res.json({
    winners: sanitized,
    total: data.length,
    hasMore: data.length === limit
  });
}
```

#### Frontend 컴포넌트

##### SaveNumberModal.jsx
```jsx
import { useState } from 'react';

export default function SaveNumberModal({ 
  numbers, 
  strategy, 
  onSave, 
  onClose 
}) {
  const [nickname, setNickname] = useState('');
  
  async function handleSave() {
    const response = await fetch('/api/save-numbers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numbers, strategy, nickname })
    });
    
    const data = await response.json();
    onSave(data);
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">
          🎉 번호가 생성되었습니다!
        </h3>
        
        {/* 번호 표시 */}
        <div className="flex justify-center gap-2 mb-6">
          {numbers.map((num, i) => (
            <div 
              key={i}
              className={`
                ${getBallColor(num)}
                w-12 h-12 rounded-full
                flex items-center justify-center
                text-white font-bold text-lg
              `}
            >
              {num}
            </div>
          ))}
        </div>
        
        {/* 저장 안내 */}
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-900 mb-2">
            💾 <strong>저장하면 좋은 점:</strong>
          </p>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 당첨 시 자동 알림</li>
            <li>• 명예의 전당 등록 (당첨 시)</li>
            <li>• 내 번호 히스토리 확인</li>
          </ul>
        </div>
        
        {/* 닉네임 입력 */}
        <input
          type="text"
          placeholder="닉네임 (선택사항)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
          className="
            w-full px-4 py-3 
            border-2 border-gray-300 rounded-lg
            focus:border-purple-500 outline-none
            mb-4
          "
        />
        
        <p className="text-xs text-gray-500 mb-6">
          닉네임을 입력하지 않으면 익명으로 저장됩니다.
        </p>
        
        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="
              flex-1 bg-purple-600 text-white
              py-3 rounded-lg font-semibold
              hover:bg-purple-700 transition
            "
          >
            저장하고 확인
          </button>
          <button
            onClick={onClose}
            className="
              px-6 bg-gray-200 text-gray-700
              py-3 rounded-lg font-semibold
              hover:bg-gray-300 transition
            "
          >
            저장 안함
          </button>
        </div>
      </div>
    </div>
  );
}
```

##### WinnerBanner.jsx
```jsx
import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

export default function WinnerBanner() {
  const [latestWinner, setLatestWinner] = useState(null);
  
  useEffect(() => {
    fetchLatestWinner();
    const interval = setInterval(fetchLatestWinner, 30000);
    return () => clearInterval(interval);
  }, []);
  
  async function fetchLatestWinner() {
    const res = await fetch('/api/hall-of-fame?limit=1');
    const { winners } = await res.json();
    if (winners[0]) setLatestWinner(winners[0]);
  }
  
  if (!latestWinner) return null;
  
  const rankInfo = {
    1: { emoji: '🏆', label: '1등' },
    2: { emoji: '🥈', label: '2등' },
    3: { emoji: '🥉', label: '3등' },
    4: { emoji: '🎖️', label: '4등' },
    5: { emoji: '🎗️', label: '5등' }
  };
  
  const info = rankInfo[latestWinner.prize_rank];
  
  return (
    <div className="
      bg-gradient-to-r from-yellow-400 to-orange-500
      text-white p-4 rounded-2xl shadow-lg
      animate-pulse mb-6
    ">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{info.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span className="font-bold text-lg">
              실시간 당첨 소식!
            </span>
          </div>
          <p className="text-sm mt-1">
            <strong>{latestWinner.user_identifier}</strong>님이
            <strong className="mx-1">
              {getStrategyName(latestWinner.strategy)}
            </strong>
            으로
            <strong className="mx-1">{info.label} 당첨!</strong>
          </p>
          <p className="text-xs opacity-90">
            💰 {latestWinner.prize_amount?.toLocaleString()}원
            · 📅 {latestWinner.round}회
          </p>
        </div>
        <button className="
          bg-white text-orange-600
          px-4 py-2 rounded-lg font-bold
          hover:bg-orange-50 transition
        ">
          나도 생성하기
        </button>
      </div>
    </div>
  );
}
```

---

# PART 4: 기술 스택

## 14. Frontend

### ⚛️ React 18
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

**선택 이유:**
- 컴포넌트 기반 아키텍처
- 풍부한 생태계
- 뛰어난 성능
- 대규모 커뮤니티

### ⚡ Vite
```json
{
  "vite": "^5.4.2",
  "@vitejs/plugin-react": "^4.3.1"
}
```

**선택 이유:**
- 빠른 개발 서버 (HMR)
- 최적화된 번들링
- 간단한 설정
- Vercel 호환성

### 🎨 Tailwind CSS
```json
{
  "tailwindcss": "^3.4.1",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47"
}
```

**선택 이유:**
- 유틸리티 퍼스트
- 빠른 개발 속도
- 작은 번들 크기
- 반응형 간편

### 🎯 Lucide React (아이콘)
```json
{
  "lucide-react": "^0.263.1"
}
```

**선택 이유:**
- 깔끔한 디자인
- Tree-shaking 지원
- 가벼움
- React 최적화

---

## 15. Backend

### 🔥 Vercel Serverless Functions
```javascript
// /api/example.js
export default async function handler(req, res) {
  res.json({ message: 'Hello' });
}
```

**선택 이유:**
- 무료 티어 넉넉
- 자동 스케일링
- Edge Network
- 간단한 배포

### ⏰ Vercel Cron Jobs
```javascript
// vercel.json
{
  "crons": [{
    "path": "/api/check-winning",
    "schedule": "0 21 * * 6"  // 매주 토요일 21:00
  }]
}
```

---

## 16. Database

### 🗄️ Supabase (PostgreSQL)
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
```

**선택 이유:**
- PostgreSQL 기반
- 실시간 구독
- 무료 티어 500MB
- Row Level Security

---

## 17. Infrastructure

### 🚀 배포: Vercel
- 무료 호스팅
- 자동 HTTPS
- Global CDN
- Git 연동 CI/CD

### 📊 분석: Google Analytics 4
- 무료
- 실시간 분석
- 이벤트 트래킹

### 💰 결제: Toss Payments
- 간편 결제
- 정기 결제
- 수수료 3.3%

### 📱 SMS: Aligo
- 건당 15원
- 높은 도달률
- API 간편

---

# PART 5: 개발 로드맵

## 18. Phase 1: MVP (2주)

### 🎯 목표
**"핵심 기능으로 빠른 출시"**

### ✅ 필수 기능
```
Week 1:
□ 프로젝트 셋업
□ 번호 생성기 (6가지 전략)
□ 회차별 조회 (API 연동)
□ 반응형 UI

Week 2:
□ 1등 판매점 리스트
□ 실수령액 계산기
□ SEO 최적화
□ Vercel 배포
```

### 📦 기술 스택
- React + Vite + Tailwind
- Vercel 배포
- 동행복권 API

### 🎨 디자인
- 현재 만든 UI 그대로
- Purple-Pink 그라데이션
- 로또 공 색상 정확히

---

## 19. Phase 2: 성장 (1개월)

### 🎯 목표
**"트래픽 모으고 사용자 확보"**

### 📈 기능 추가
```
Week 3-4:
□ Google AdSense 신청 및 승인
□ 번호 저장 기능 (localStorage)
□ 내 번호 히스토리
□ SNS 공유 기능

Week 5-6:
□ Supabase 연동
□ 회원가입 (선택적)
□ 번호 저장 DB화
□ 당첨 확인 수동 기능
```

### 🔧 기술 업그레이드
- Supabase 추가
- Google Analytics 고도화
- 콘텐츠 SEO 강화

### 📊 목표 지표
- 일 방문자: 500명
- 페이지뷰: 2,500
- 번호 생성: 200회/일

---

## 20. Phase 3: 수익화 (2개월)

### 🎯 목표
**"구독 모델 출시 및 수익 발생"**

### 💰 수익화 기능
```
Week 7-10:
□ 자동 당첨 확인 크론잡
□ 당첨자 명예의 전당
□ 실시간 당첨 배너
□ 전략별 통계

Week 11-14:
□ 구독 서비스 개발
□ Toss Payments 연동
□ SMS 알림 (Aligo API)
□ 프리미엄 기능
```

### 🎁 프리미엄 기능
```
무료:
- 번호 생성 무제한
- 저장 월 5개
- 3등 이상 알림

프리미엄 (월 990원):
- 저장 무제한
- 5등까지 알림 (SMS)
- 광고 제거
- 통계 분석
```

### 📊 목표 지표
- 일 방문자: 3,000명
- 구독자: 200명
- 월 수익: 100만원

---

## 21. Phase 4: 확장 (3개월~)

### 🎯 목표
**"시장 지배력 확보"**

### 🚀 고급 기능
```
Month 4-6:
□ AI 번호 추천
□ 커뮤니티 기능
□ 당첨자 인터뷰
□ 판매점 리뷰 시스템
□ 모바일 앱 (React Native)
□ 다른 복권 지원 (연금복권)
```

### 🌏 확장 전략
- B2B 판매점 솔루션
- API 판매
- 해외 진출 (파워볼)

---

# PART 6: SEO & 마케팅

## 22. SEO 최적화

### 📝 메타 태그 (완료)
```html
<title>로또 번호 추천 | 당첨번호 조회 | 실수령액 계산기</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="twitter:card" content="...">
```

### 🗺️ Sitemap (완료)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lotto-service.vercel.app/</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 🤖 robots.txt (완료)
```
User-agent: *
Allow: /
Sitemap: https://lotto-service.vercel.app/sitemap.xml
```

### 📊 타겟 키워드
```
1차: 로또 번호 추천 (9,900/월)
2차: 로또 번호 생성 (3,600/월)
3차: 로또 계산기 (1,900/월)
4차: 1등 판매점 (1,300/월)
```

---

## 23. 마케팅 전략

### 🎯 무료 채널
```
1. SEO (장기)
   - 블로그 콘텐츠 발행
   - 롱테일 키워드 공략

2. 커뮤니티 (즉시)
   - 네이버 카페 활동
   - 디시인사이드
   - 에펨코리아

3. SNS (중기)
   - 인스타그램
   - 페이스북 그룹
```

### 💰 유료 채널
```
1. 네이버 검색광고
   - 예산: 월 30만원
   - CPC: 300원
   - 클릭: 1,000회

2. 카카오 키워드
   - 예산: 월 20만원
   - 모바일 타겟
```

---

## 24. 성장 해킹

### 🔥 바이럴 전략
```
1. 공유 인센티브
   "친구 공유 시 저장 슬롯 +3개!"

2. 당첨자 스토리
   1등 당첨자 인터뷰 → 언론 배포

3. 리더보드
   "이번 달 가장 많이 맞춘 전략"
```

---

# PART 7: 법적 & 운영

## 25. 법적 체크리스트

### ✅ 출시 전 필수
```
□ 사업자 등록 (간이과세자)
□ 개인정보처리방침
□ 이용약관
□ "도박 중독 1336" 표시
□ "만 19세 미만 불가" 표시
□ "당첨 보장 안함" 명시
```

### ⚠️ 절대 금지 표현
```
❌ "100% 당첨"
❌ "당첨 예측"
❌ "확률 UP"
✅ "번호 추천"
✅ "정보 제공"
```

---

## 26. 운영 가이드

### 📅 일일 운영
- 사이트 정상 작동 확인
- 댓글/문의 응대
- 통계 확인

### 📅 주간 운영
- 토요일 21시: 당첨번호 확인
- 일요일: 당첨자 공개
- 콘텐츠 1개 발행

### 📅 월간 운영
- Google Analytics 분석
- 수익 정산
- 전략 수정

---

## 27. 리스크 관리

### 🚨 기술적 리스크
```
1. API 장애
   → Fallback 메시지
   → 캐싱 전략

2. 트래픽 폭증
   → Vercel 자동 스케일링
   → CDN 활용

3. DB 부하
   → 인덱싱
   → Read Replica
```

### ⚖️ 법적 리스크
```
1. 과장 광고 신고
   → 투명한 통계
   → 면책 문구

2. 개인정보 유출
   → IP 해싱
   → 최소 수집
```

---

# 🎯 최종 체크리스트

## Phase 1 출시 (2주)
```
□ React + Vite 프로젝트 생성
□ Tailwind 설정
□ 6가지 전략 구현
□ 동행복권 API 연동
□ 반응형 UI
□ SEO 메타태그
□ robots.txt, sitemap.xml
□ Vercel 배포
□ Google Analytics 연동
```

## Phase 2 성장 (1개월)
```
□ AdSense 신청
□ Supabase 연동
□ 번호 저장 기능
□ 내 번호 히스토리
□ SNS 공유
```

## Phase 3 수익화 (2개월)
```
□ 자동 당첨 확인
□ 당첨자 명예의 전당
□ 구독 서비스
□ Toss Payments 연동
□ SMS 알림
```

---

# 💰 예상 성과 (12개월)

## 트래픽
- 월 방문자: 100,000명
- 페이지뷰: 500,000

## 수익
- AdSense: 200만원
- 구독: 200만원
- 제휴: 50만원
- **총합: 월 450만원**

---

# 🚀 지금 바로 시작하기

## Step 1: 프로젝트 생성
```bash
npm create vite@latest lotto-service -- --template react
cd lotto-service
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Step 2: 파일 복사
- 앞서 만든 모든 파일 복사
- App.jsx, index.html 등

## Step 3: 로컬 실행
```bash
npm run dev
```

## Step 4: GitHub 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git push
```

## Step 5: Vercel 배포
- vercel.com 접속
- GitHub 연동
- Deploy!

---

**🎉 이제 부자 되실 준비 완료! 화이팅! 💰**