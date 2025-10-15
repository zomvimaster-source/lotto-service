# 📋 iPhone 로또 자동 업데이트 - 빠른 설정

## ⚡ 5분 완성 체크리스트

### 1단계: GitHub 토큰 발급 (2분)
- [ ] GitHub.com → Settings → Developer settings → Personal access tokens
- [ ] "Generate new token (classic)"
- [ ] 권한: `repo` ✅ + `workflow` ✅
- [ ] 토큰 복사해서 안전한 곳에 저장

### 2단계: 단축어 생성 (2분)
- [ ] 단축어 앱 → "+" → 새로운 단축어
- [ ] 이름: `로또 업데이트` / 아이콘: 🎰

**액션 추가:**
1. [ ] **알림 표시:** "🎰 로또 업데이트 시작..."
2. [ ] **웹의 콘텐츠 가져오기:**
   - URL: `https://api.github.com/repos/zomvimaster-source/lotto-service/actions/workflows/update-lotto-data.yml/dispatches`
   - 방법: `POST`
   - 헤더: `Authorization: token 여기에토큰붙여넣기`
   - 본문: `{"ref": "main"}`
3. [ ] **알림 표시:** "✅ 업데이트 완료! 5분 후 사이트 반영"

### 3단계: 자동화 설정 (1분)
- [ ] 단축어 앱 → 자동화 → "+" → 시간
- [ ] 매주 토요일 오후 9:05 설정
- [ ] 동작: "로또 업데이트" 단축어 실행
- [ ] "실행 전에 묻지 않기" ✅

## 🎯 완성! 

**이제 매주 토요일 9시 5분마다 자동으로 로또 데이터가 업데이트됩니다!**

### 즉시 테스트
- [ ] 홈 화면에서 단축어 실행해보기
- [ ] "로또 업데이트" Siri 명령 테스트
- [ ] 웹사이트에서 업데이트 확인

---

## 🔗 빠른 링크
- **GitHub 토큰:** https://github.com/settings/tokens
- **웹사이트:** https://lotto-service.vercel.app
- **GitHub Actions:** https://github.com/zomvimaster-source/lotto-service/actions

## 💡 팁
- 토큰은 절대 공유하지 마세요
- 문제 발생 시 토큰 재생성
- 자동화는 iPhone이 켜져있을 때만 작동