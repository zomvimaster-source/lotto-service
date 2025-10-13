// 랜덤 숫자 생성
export function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 배열 섞기 (Fisher-Yates)
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 중복 제거 생성
export function generateUniqueNumbers(count, min, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(randomFromRange(min, max));
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

// 로또 번호 생성 전략들
export const strategies = {
  hot: {
    id: 'hot',
    name: '🔥 최다 출현 번호',
    description: '과거에 가장 많이 나온 번호들',
    color: 'bg-strategy-hot',
    icon: 'TrendingUp',
    algorithm: () => {
      const hotNumbers = [12, 21, 33, 16, 38, 6, 7, 18, 19, 13, 31, 24, 1, 2, 4];
      return shuffleArray(hotNumbers).slice(0, 6).sort((a, b) => a - b);
    }
  },
  
  cold: {
    id: 'cold',
    name: '❄️ 최소 출현 번호',
    description: '이제 나올 차례라고 믿는 번호들',
    color: 'bg-strategy-cold',
    icon: 'TrendingDown',
    algorithm: () => {
      const coldNumbers = [5, 32, 20, 25, 22, 9, 40, 8, 29, 23, 35, 42, 44, 11, 15];
      return shuffleArray(coldNumbers).slice(0, 6).sort((a, b) => a - b);
    }
  },
  
  balanced: {
    id: 'balanced',
    name: '⚖️ 균형 전략',
    description: '구간별로 골고루 선택',
    color: 'bg-strategy-balanced',
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
  },
  
  oddEven: {
    id: 'oddEven',
    name: '🎭 홀짝 조화',
    description: '홀수 3개 + 짝수 3개 (가장 흔한 패턴 32.9%)',
    color: 'bg-strategy-oddeven',
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
  },
  
  highNumber: {
    id: 'highNumber',
    name: '💎 고숫자 전략',
    description: '32~45 포함 (당첨금 독식 확률 UP)',
    color: 'bg-strategy-high',
    icon: 'Sparkles',
    algorithm: () => {
      // 32-45 범위에서 2개
      const highNums = [];
      while (highNums.length < 2) {
        const num = randomFromRange(32, 45);
        if (!highNums.includes(num)) {
          highNums.push(num);
        }
      }
      
      // 1-31 범위에서 4개
      const lowNums = [];
      while (lowNums.length < 4) {
        const num = randomFromRange(1, 31);
        if (!lowNums.includes(num) && !highNums.includes(num)) {
          lowNums.push(num);
        }
      }
      
      return [...highNums, ...lowNums].sort((a, b) => a - b);
    }
  },
  
  random: {
    id: 'random',
    name: '🎲 완전 랜덤',
    description: '순수한 운에 맡기기',
    color: 'bg-strategy-random',
    icon: 'Shuffle',
    algorithm: () => {
      return generateUniqueNumbers(6, 1, 45);
    }
  }
};

// 현재 회차 계산
export function getCurrentRound() {
  const firstDrawDate = new Date('2002-12-07');
  const today = new Date();
  const weeksDiff = Math.floor(
    (today - firstDrawDate) / (7 * 24 * 60 * 60 * 1000)
  );
  return weeksDiff + 1;
}

// 로또 API 호출
export async function getLottoData(round) {
  try {
    const API_URL = 'https://www.dhlottery.co.kr/common.do';
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

// 세금 계산
export function calculateTax(winAmount) {
  const amount = parseInt(winAmount);
  
  if (isNaN(amount) || amount <= 0) {
    return null;
  }
  
  let incomeTax = 0;
  let localTax = 0;
  let taxRate = 0;
  
  if (amount <= 50000000) {
    // 5천만원 이하: 비과세
    incomeTax = 0;
    localTax = 0;
    taxRate = 0;
  } else if (amount <= 300000000) {
    // 5천만원 ~ 3억: 22%
    incomeTax = amount * 0.22;
    localTax = incomeTax * 0.1;
    taxRate = 22;
  } else {
    // 3억 초과: 33%
    incomeTax = amount * 0.33;
    localTax = incomeTax * 0.1;
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
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}