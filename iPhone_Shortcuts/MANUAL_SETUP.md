# 📱 로또 업데이트 단축어 - 완전 수동 설정 가이드

## 🎯 5분만에 완성하는 단축어

### 1단계: GitHub 토큰 준비
먼저 GitHub Personal Access Token이 필요합니다.

1. **GitHub.com 로그인** → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **"Generate new token (classic)"**
4. **권한 선택:**
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. **토큰 복사** (안전한 곳에 저장!)

### 2단계: 단축어 생성

#### 기본 설정
1. **단축어 앱** 열기
2. **"+"** 버튼 터치
3. **이름:** `로또 업데이트`
4. **아이콘:** 🎰 선택
5. **색상:** 주황색 또는 보라색

#### 액션 추가 (정확한 순서대로!)

**🔴 액션 1: 시작 알림**
```
동작 추가 → "알림" 검색 → "알림 표시" 선택

설정:
- 제목: 🎰 로또 업데이트
- 메시지: 로또 데이터 업데이트를 시작합니다...
```

**🔴 액션 2: API 호출**
```
+ 버튼 → "웹" 검색 → "웹의 콘텐츠 가져오기" 선택

URL 설정:
https://api.github.com/repos/zomvimaster-source/lotto-service/actions/workflows/update-lotto-data.yml/dispatches

방법: POST 선택

헤더 추가 (+ 헤더 버튼):
1. Authorization: token 여기에실제토큰붙여넣기
2. Accept: application/vnd.github.v3+json  
3. Content-Type: application/json

요청 본문: JSON 선택
{
  "ref": "main"
}
```

**🔴 액션 3: 완료 알림**
```
+ 버튼 → "알림 표시" 다시 선택

설정:
- 제목: ✅ 업데이트 완료
- 메시지: 로또 데이터 업데이트가 시작되었습니다!
웹사이트에 5분 후 반영됩니다.
```

### 3단계: 자동화 설정

1. **단축어 앱** → **자동화** 탭
2. **"+" 버튼** → **개인용 자동화 만들기**
3. **시간** 선택
4. **시간 설정:**
   - 시간: 오후 9:05
   - 반복: 매주
   - 요일: 토요일만 체크 ✅
5. **다음** → **동작 추가**
6. **단축어 실행** 선택
7. **"로또 업데이트"** 선택
8. **다음** → **"실행 전에 묻지 않기"** ✅
9. **완료**

### 4단계: 테스트

1. **단축어 목록**에서 "로또 업데이트" 터치
2. **알림 확인:**
   - 🎰 시작 알림 → ✅ 완료 알림
3. **GitHub Actions 확인:**
   - https://github.com/zomvimaster-source/lotto-service/actions
   - 새로운 실행 기록 확인

### 5단계: 추가 설정 (선택사항)

#### 홈 화면에 추가
1. **단축어 목록** → **"로또 업데이트"** → **⋯**
2. **"홈 화면에 추가"**
3. **이름:** `🎰 로또`

#### Siri 설정
1. **단축어 편집** → **설정** → **Siri에 추가**
2. **"로또 업데이트"** 녹음

## 🔧 문제 해결

### "권한 오류" 발생 시
- GitHub 토큰 재확인
- `repo`, `workflow` 권한 있는지 확인

### "404 오류" 발생 시  
- URL 오타 확인
- 저장소 이름 확인: `zomvimaster-source/lotto-service`

### 알림이 안 올 때
- 설정 → 알림 → 단축어 → 알림 허용

## ✅ 완성!

이제 다음이 모두 가능합니다:
- 🎰 홈 화면 아이콘으로 수동 실행
- 🗣️ "로또 업데이트" Siri 음성 명령
- ⏰ 매주 토요일 9:05 자동 실행
- 📱 어디서든 iPhone만 있으면 업데이트!