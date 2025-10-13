// 동행복권 로또 API 연동
const LOTTO_API_BASE = 'https://www.dhlottery.co.kr/common.do';

/**
 * 특정 회차의 로또 당첨번호 조회
 * @param {number} drwNo 회차 번호
 * @returns {Promise<Object>} 당첨번호 데이터
 */
export async function getLottoNumbers(drwNo) {
  try {
    const response = await fetch(`${LOTTO_API_BASE}?method=getLottoNumber&drwNo=${drwNo}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // API 응답이 성공적인지 확인
    if (data.returnValue !== 'success') {
      throw new Error('로또 데이터를 가져올 수 없습니다.');
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
      ].sort((a, b) => a - b),
      bonus: data.bnusNo,
      firstWinAmount: data.firstWinamnt,
      firstWinners: data.firstPrzwnerCo,
      totalSales: data.totSellamnt
    };
  } catch (error) {
    console.error('로또 API 호출 오류:', error);
    throw error;
  }
}

/**
 * 최신 회차 번호 가져오기
 * @returns {Promise<Object>} 최신 회차 당첨번호
 */
export async function getLatestLottoNumbers() {
  try {
    // 현재 날짜 기준으로 대략적인 최신 회차 계산
    // 로또는 2002년 12월 7일부터 시작, 매주 토요일 추첨
    const startDate = new Date('2002-12-07');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const estimatedRound = diffWeeks + 1;
    
    // 최신 회차부터 역순으로 확인 (최대 10회차까지)
    for (let i = 0; i < 10; i++) {
      const tryRound = estimatedRound - i;
      try {
        const data = await getLottoNumbers(tryRound);
        return data;
      } catch (error) {
        // 해당 회차가 없으면 다음 회차 시도
        continue;
      }
    }
    
    throw new Error('최신 로또 데이터를 찾을 수 없습니다.');
  } catch (error) {
    console.error('최신 로또 번호 조회 오류:', error);
    throw error;
  }
}

/**
 * 여러 회차 데이터 한번에 가져오기
 * @param {number} startRound 시작 회차
 * @param {number} endRound 끝 회차
 * @returns {Promise<Array>} 회차별 당첨번호 배열
 */
export async function getLottoRangeNumbers(startRound, endRound) {
  try {
    const promises = [];
    for (let round = startRound; round <= endRound; round++) {
      promises.push(getLottoNumbers(round));
    }
    
    const results = await Promise.allSettled(promises);
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
  } catch (error) {
    console.error('범위 로또 데이터 조회 오류:', error);
    throw error;
  }
}

/**
 * 번호 출현 빈도 분석
 * @param {Array} lottoDataArray 로또 데이터 배열
 * @returns {Object} 번호별 출현 빈도
 */
export function analyzeNumberFrequency(lottoDataArray) {
  const frequency = {};
  
  // 1-45까지 모든 번호 초기화
  for (let i = 1; i <= 45; i++) {
    frequency[i] = 0;
  }
  
  // 각 회차의 당첨번호 카운트
  lottoDataArray.forEach(data => {
    data.numbers.forEach(num => {
      frequency[num]++;
    });
  });
  
  // 빈도순으로 정렬
  const sorted = Object.entries(frequency)
    .map(([num, count]) => ({ number: parseInt(num), count }))
    .sort((a, b) => b.count - a.count);
  
  return {
    frequency,
    hotNumbers: sorted.slice(0, 10).map(item => item.number),
    coldNumbers: sorted.slice(-10).map(item => item.number).reverse()
  };
}

/**
 * CORS 프록시를 사용한 API 호출 (개발 환경용)
 */
export async function getLottoNumbersWithProxy(drwNo) {
  try {
    // 개발 환경에서 CORS 문제 해결을 위한 프록시 사용
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent(`${LOTTO_API_BASE}?method=getLottoNumber&drwNo=${drwNo}`);
    
    const response = await fetch(`${proxyUrl}${targetUrl}`);
    const result = await response.json();
    const data = JSON.parse(result.contents);
    
    if (data.returnValue !== 'success') {
      throw new Error('로또 데이터를 가져올 수 없습니다.');
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
      ].sort((a, b) => a - b),
      bonus: data.bnusNo,
      firstWinAmount: data.firstWinamnt,
      firstWinners: data.firstPrzwnerCo,
      totalSales: data.totSellamnt
    };
  } catch (error) {
    console.error('프록시를 통한 로또 API 호출 오류:', error);
    throw error;
  }
}