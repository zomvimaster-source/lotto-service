import lottoHistory from '../data/lottoHistory.json';

// 실제 로또 데이터 기반 통계 분석 유틸리티

/**
 * 지정된 기간의 로또 데이터를 가져옵니다
 * @param {string} period - 'recent' | 'quarter' | 'half' | 'year'
 * @returns {Array} 필터링된 로또 데이터
 */
export const getLottoDataByPeriod = (period) => {
  const periodMap = {
    recent: 30,    // 최근 30회차
    quarter: 13,   // 최근 13회차 (약 3개월)
    half: 26,      // 최근 26회차 (약 6개월) 
    year: 52       // 최근 52회차 (약 1년)
  };

  const rounds = periodMap[period] || 30;
  return lottoHistory.slice(0, rounds);
};

/**
 * 번호별 출현 빈도를 계산합니다
 * @param {Array} data - 로또 데이터 배열
 * @returns {Object} 번호별 출현 빈도 객체
 */
export const calculateNumberFrequency = (data) => {
  const frequency = {};
  
  // 1부터 45까지 모든 번호 초기화
  for (let i = 1; i <= 45; i++) {
    frequency[i] = 0;
  }

  // 각 회차의 당첨번호를 카운트
  data.forEach(draw => {
    draw.numbers.forEach(num => {
      frequency[num]++;
    });
    // 보너스 번호도 포함
    frequency[draw.bonus]++;
  });

  return frequency;
};

/**
 * HOT/COLD 번호를 계산합니다
 * @param {Object} frequency - 번호별 출현 빈도
 * @returns {Object} { hotNumbers, coldNumbers }
 */
export const getHotColdNumbers = (frequency) => {
  const sortedNumbers = Object.entries(frequency)
    .map(([num, freq]) => ({ number: parseInt(num), frequency: freq }))
    .sort((a, b) => b.frequency - a.frequency);

  return {
    hotNumbers: sortedNumbers.slice(0, 10),
    coldNumbers: sortedNumbers.slice(-10).reverse()
  };
};

/**
 * 구간별 번호 분석을 수행합니다
 * @param {Object} frequency - 번호별 출현 빈도
 * @returns {Object} 구간별 분석 결과
 */
export const analyzeSectionDistribution = (frequency) => {
  const sections = {
    '1-10': [],
    '11-20': [],
    '21-30': [],
    '31-40': [],
    '41-45': []
  };

  Object.entries(frequency).forEach(([num, freq]) => {
    const number = parseInt(num);
    const item = { number, frequency: freq };

    if (number >= 1 && number <= 10) {
      sections['1-10'].push(item);
    } else if (number >= 11 && number <= 20) {
      sections['11-20'].push(item);
    } else if (number >= 21 && number <= 30) {
      sections['21-30'].push(item);
    } else if (number >= 31 && number <= 40) {
      sections['31-40'].push(item);
    } else if (number >= 41 && number <= 45) {
      sections['41-45'].push(item);
    }
  });

  // 각 구간을 빈도순으로 정렬
  Object.keys(sections).forEach(section => {
    sections[section].sort((a, b) => b.frequency - a.frequency);
  });

  return sections;
};

/**
 * 홀짝 번호 분석을 수행합니다
 * @param {Object} frequency - 번호별 출현 빈도
 * @returns {Object} 홀짝 분석 결과
 */
export const analyzeOddEvenDistribution = (frequency) => {
  let oddTotal = 0;
  let evenTotal = 0;

  Object.entries(frequency).forEach(([num, freq]) => {
    const number = parseInt(num);
    if (number % 2 === 1) {
      oddTotal += freq;
    } else {
      evenTotal += freq;
    }
  });

  const total = oddTotal + evenTotal;

  return {
    odd: {
      count: oddTotal,
      percentage: ((oddTotal / total) * 100).toFixed(1)
    },
    even: {
      count: evenTotal,
      percentage: ((evenTotal / total) * 100).toFixed(1)
    }
  };
};

/**
 * 연속 번호 패턴을 분석합니다
 * @param {Array} data - 로또 데이터 배열
 * @returns {Object} 연속 번호 패턴 분석 결과
 */
export const analyzeConsecutivePatterns = (data) => {
  let consecutivePairs = 0;
  let consecutiveTriples = 0;
  let totalDraws = data.length;

  data.forEach(draw => {
    const sortedNumbers = draw.numbers.sort((a, b) => a - b);
    
    // 연속된 2개 번호 체크
    for (let i = 0; i < sortedNumbers.length - 1; i++) {
      if (sortedNumbers[i + 1] - sortedNumbers[i] === 1) {
        consecutivePairs++;
        break; // 한 회차에서 한 번만 카운트
      }
    }

    // 연속된 3개 번호 체크
    for (let i = 0; i < sortedNumbers.length - 2; i++) {
      if (sortedNumbers[i + 1] - sortedNumbers[i] === 1 && 
          sortedNumbers[i + 2] - sortedNumbers[i + 1] === 1) {
        consecutiveTriples++;
        break; // 한 회차에서 한 번만 카운트
      }
    }
  });

  return {
    consecutivePairs: {
      count: consecutivePairs,
      percentage: ((consecutivePairs / totalDraws) * 100).toFixed(1)
    },
    consecutiveTriples: {
      count: consecutiveTriples,
      percentage: ((consecutiveTriples / totalDraws) * 100).toFixed(1)
    }
  };
};

/**
 * 번호 합계 분석을 수행합니다
 * @param {Array} data - 로또 데이터 배열
 * @returns {Object} 합계 분석 결과
 */
export const analyzeSumDistribution = (data) => {
  const sums = data.map(draw => 
    draw.numbers.reduce((sum, num) => sum + num, 0)
  );

  const minSum = Math.min(...sums);
  const maxSum = Math.max(...sums);
  const avgSum = (sums.reduce((sum, val) => sum + val, 0) / sums.length).toFixed(1);

  // 합계 구간별 분포
  const ranges = {
    '21-90': 0,    // 매우 낮은 합계
    '91-120': 0,   // 낮은 합계
    '121-150': 0,  // 보통 합계
    '151-180': 0,  // 높은 합계
    '181-270': 0   // 매우 높은 합계
  };

  sums.forEach(sum => {
    if (sum >= 21 && sum <= 90) ranges['21-90']++;
    else if (sum >= 91 && sum <= 120) ranges['91-120']++;
    else if (sum >= 121 && sum <= 150) ranges['121-150']++;
    else if (sum >= 151 && sum <= 180) ranges['151-180']++;
    else if (sum >= 181 && sum <= 270) ranges['181-270']++;
  });

  return {
    minSum,
    maxSum,
    avgSum,
    ranges,
    mostCommonRange: Object.entries(ranges).reduce((max, [range, count]) => 
      count > max.count ? { range, count } : max, { range: '', count: 0 }
    )
  };
};

/**
 * 종합 통계를 생성합니다
 * @param {string} period - 분석 기간
 * @returns {Object} 종합 통계 결과
 */
export const generateStatistics = (period) => {
  const data = getLottoDataByPeriod(period);
  const frequency = calculateNumberFrequency(data);
  const { hotNumbers, coldNumbers } = getHotColdNumbers(frequency);
  const sectionAnalysis = analyzeSectionDistribution(frequency);
  const oddEvenAnalysis = analyzeOddEvenDistribution(frequency);
  const consecutivePatterns = analyzeConsecutivePatterns(data);
  const sumAnalysis = analyzeSumDistribution(data);

  const periodLabels = {
    recent: '최근 30회차',
    quarter: '최근 13회차 (약 3개월)',
    half: '최근 26회차 (약 6개월)',
    year: '최근 52회차 (약 1년)'
  };

  return {
    period: {
      rounds: data.length,
      label: periodLabels[period] || '최근 30회차',
      dateRange: data.length > 0 ? `${data[data.length - 1].date} ~ ${data[0].date}` : ''
    },
    hotNumbers,
    coldNumbers,
    sectionAnalysis,
    oddEvenAnalysis,
    consecutivePatterns,
    sumAnalysis,
    totalDraws: data.length,
    lastUpdated: new Date().toLocaleDateString(),
    dataSource: 'actual', // 실제 데이터임을 표시
    mostRecentDraw: data[0] || null
  };
};

// 기본 export
export default {
  getLottoDataByPeriod,
  calculateNumberFrequency,
  getHotColdNumbers,
  analyzeSectionDistribution,
  analyzeOddEvenDistribution,
  analyzeConsecutivePatterns,
  analyzeSumDistribution,
  generateStatistics
};