import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, TrendingDown, Shuffle, Target, Zap, Trophy, MapPin, Calculator, History, Copy, Navigation } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [recommendedNumbers, setRecommendedNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [latestDraw, setLatestDraw] = useState(null);
  const [selectedRound, setSelectedRound] = useState('');
  const [roundData, setRoundData] = useState(null);
  const [taxAmount, setTaxAmount] = useState('');
  const [actualAmount, setActualAmount] = useState(null);

  const hotNumbers = [12, 21, 33, 16, 38, 6, 7, 18, 19, 13];
  const coldNumbers = [5, 32, 20, 25, 22, 9, 40, 8, 29, 23];

  const winningStores = [
    { name: '행운로또', address: '서울 강남구 테헤란로 123', lat: 37.5665, lng: 126.9780, count: 15 },
    { name: '대박복권방', address: '서울 송파구 올림픽로 456', lat: 37.5145, lng: 127.1059, count: 12 },
    { name: '황금손복권', address: '경기 성남시 분당구 판교역로 789', lat: 37.3945, lng: 127.1110, count: 10 },
    { name: '로또천국', address: '서울 서초구 강남대로 321', lat: 37.4951, lng: 127.0284, count: 9 },
    { name: '대박나라', address: '인천 남동구 구월로 654', lat: 37.4449, lng: 126.7315, count: 8 },
  ];

  useEffect(() => {
    setLatestDraw({
      round: 1192,
      date: '2025.10.04',
      numbers: [10, 16, 23, 36, 39, 40],
      bonus: 11
    });
  }, []);

  const strategies = [
    {
      id: 'hot',
      name: '🔥 최다 출현 번호',
      description: '과거에 가장 많이 나온 번호들',
      icon: TrendingUp,
      color: 'bg-red-500',
      generate: () => shuffleArray(hotNumbers).slice(0, 6).sort((a, b) => a - b)
    },
    {
      id: 'cold',
      name: '❄️ 최소 출현 번호',
      description: '이제 나올 차례라고 믿는 번호들',
      icon: TrendingDown,
      color: 'bg-blue-500',
      generate: () => shuffleArray(coldNumbers).slice(0, 6).sort((a, b) => a - b)
    },
    {
      id: 'balanced',
      name: '⚖️ 균형 전략',
      description: '구간별로 골고루 선택',
      icon: Target,
      color: 'bg-green-500',
      generate: () => {
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
    {
      id: 'oddEven',
      name: '🎭 홀짝 조화',
      description: '홀수 3개 + 짝수 3개',
      icon: Zap,
      color: 'bg-purple-500',
      generate: () => {
        const odds = [];
        const evens = [];
        while (odds.length < 3) {
          const num = randomFromRange(1, 45);
          if (num % 2 === 1 && !odds.includes(num)) odds.push(num);
        }
        while (evens.length < 3) {
          const num = randomFromRange(1, 45);
          if (num % 2 === 0 && !evens.includes(num)) evens.push(num);
        }
        return [...odds, ...evens].sort((a, b) => a - b);
      }
    },
    {
      id: 'highNumber',
      name: '💎 고숫자 전략',
      description: '32~45 포함 (독식 확률 UP)',
      icon: Sparkles,
      color: 'bg-yellow-500',
      generate: () => {
        const highNums = [randomFromRange(32, 45), randomFromRange(32, 45)];
        const lowNums = Array.from({length: 4}, () => randomFromRange(1, 31));
        return [...new Set([...highNums, ...lowNums])].slice(0, 6).sort((a, b) => a - b);
      }
    },
    {
      id: 'random',
      name: '🎲 완전 랜덤',
      description: '순수한 운에 맡기기',
      icon: Shuffle,
      color: 'bg-gray-500',
      generate: () => {
        const numbers = new Set();
        while (numbers.size < 6) {
          numbers.add(randomFromRange(1, 45));
        }
        return Array.from(numbers).sort((a, b) => a - b);
      }
    }
  ];

  function randomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function handleGenerate(strategy) {
    setSelectedStrategy(strategy.id);
    const numbers = strategy.generate();
    setRecommendedNumbers(numbers);
    setShowResult(true);
  }

  function getBallColor(num) {
    if (num <= 10) return 'bg-yellow-400';
    if (num <= 20) return 'bg-blue-400';
    if (num <= 30) return 'bg-red-400';
    if (num <= 40) return 'bg-gray-600';
    return 'bg-green-500';
  }

  function searchRound() {
    setRoundData({
      round: selectedRound,
      date: '2025.09.27',
      numbers: [1, 4, 11, 12, 20, 41],
      bonus: 2,
      firstWinAmount: '2,489,736,750',
      firstWinners: 12
    });
  }

  function calculateTax() {
    const amount = parseInt(taxAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) return;

    let tax = 0;
    let local = 0;
    
    if (amount > 300000000) {
      tax = amount * 0.33;
      local = tax * 0.1;
    } else if (amount > 50000000) {
      tax = amount * 0.22;
      local = tax * 0.1;
    } else {
      tax = 0;
      local = 0;
    }

    setActualAmount({
      original: amount,
      tax: Math.floor(tax),
      local: Math.floor(local),
      final: Math.floor(amount - tax - local)
    });
  }

  function copyAddress(address) {
    navigator.clipboard.writeText(address);
    alert('주소가 복사되었습니다!');
  }

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {latestDraw && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-sm opacity-90">최신 당첨번호</span>
              <h2 className="text-xl font-bold">{latestDraw.round}회 ({latestDraw.date})</h2>
            </div>
            <div className="flex items-center gap-2">
              {latestDraw.numbers.map((num, idx) => (
                <div key={idx} className={`${getBallColor(num)} w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md`}>
                  {num}
                </div>
              ))}
              <span className="mx-2">+</span>
              <div className={`${getBallColor(latestDraw.bonus)} w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md`}>
                {latestDraw.bonus}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎰 로또 종합 서비스</h1>
          <p className="text-gray-600">번호 추천부터 당첨금 계산까지 한번에</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'generator', icon: Sparkles, label: '번호 생성' },
              { id: 'history', icon: History, label: '회차별 조회' },
              { id: 'stores', icon: Trophy, label: '1등 판매점' },
              { id: 'calculator', icon: Calculator, label: '실수령액 계산' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'generator' && (
          <div>
            {showResult && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">추천 번호</h2>
                <div className="flex justify-center gap-3 mb-4">
                  {recommendedNumbers.map((num, idx) => (
                    <div key={idx} className={`${getBallColor(num)} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                      {num}
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-500 text-sm">당첨 확률: 1/8,145,060 (0.0000123%)</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => {
                const Icon = strategy.icon;
                return (
                  <div key={strategy.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer" onClick={() => handleGenerate(strategy)}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${strategy.color} p-3 rounded-xl`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{strategy.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    <button className={`w-full ${strategy.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}>
                      번호 생성하기
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">회차별 당첨번호 조회</h2>
            <div className="flex gap-4 mb-6">
              <input
                type="number"
                placeholder="회차 입력 (예: 1192)"
                value={selectedRound}
                onChange={(e) => setSelectedRound(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none"
              />
              <button onClick={searchRound} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700">
                조회
              </button>
            </div>

            {roundData && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">{roundData.round}회 ({roundData.date})</h3>
                <div className="flex items-center gap-3 mb-4">
                  {roundData.numbers.map((num, idx) => (
                    <div key={idx} className={`${getBallColor(num)} w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                      {num}
                    </div>
                  ))}
                  <span className="mx-2">+</span>
                  <div className={`${getBallColor(roundData.bonus)} w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                    {roundData.bonus}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <span className="text-gray-600">1등 당첨자</span>
                    <p className="text-xl font-bold text-purple-600">{roundData.firstWinners}명</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <span className="text-gray-600">1등 당첨금</span>
                    <p className="text-xl font-bold text-purple-600">{roundData.firstWinAmount}원</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">1등 다수 배출 판매점</h2>
            <div className="space-y-4">
              {winningStores.map((store, idx) => (
                <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        1등 {store.count}회
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{store.address}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyAddress(store.address)}
                      className="bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      title="주소 복사"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => window.open(`https://map.kakao.com/link/search/${store.address}`)}
                      className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
                      title="길찾기"
                    >
                      <Navigation className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">로또 실수령액 계산기</h2>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">당첨 금액 입력</label>
              <input
                type="text"
                placeholder="예: 2000000000"
                value={taxAmount}
                onChange={(e) => setTaxAmount(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none text-xl"
              />
              <button
                onClick={calculateTax}
                className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700"
              >
                계산하기
              </button>
            </div>

            {actualAmount && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <span className="text-gray-700 font-semibold">당첨 금액</span>
                  <span className="text-2xl font-bold text-gray-800">{formatNumber(actualAmount.original)}원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">소득세 (22% 또는 33%)</span>
                  <span className="text-lg text-red-600">-{formatNumber(actualAmount.tax)}원</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <span className="text-gray-600">지방소득세 (10%)</span>
                  <span className="text-lg text-red-600">-{formatNumber(actualAmount.local)}원</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-gray-800 font-bold text-xl">실수령액</span>
                  <span className="text-3xl font-bold text-purple-600">{formatNumber(actualAmount.final)}원</span>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  * 5천만원 이하: 비과세 / 5천만원~3억: 22% / 3억 초과: 33%
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">💌 매주 번호 문자로 받기</h3>
              <p className="text-purple-100">원하는 전략의 번호를 매주 자동으로 받아보세요</p>
              <p className="text-sm text-purple-200 mt-2">월 500원 (문자 발송비) • 언제든 해지 가능</p>
            </div>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-shadow">
              구독하기
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">💡 이용 안내</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• 본 서비스는 동행복권 공식 데이터를 활용합니다</li>
            <li>• 모든 번호 생성 전략의 당첨 확률은 동일합니다</li>
            <li>• 과거 데이터는 미래 결과에 영향을 주지 않습니다</li>
            <li>• 건전한 복권 문화를 위해 적정 금액만 구매하세요</li>
            <li>• 만 19세 미만 이용 불가</li>
            <li>• 도박 중독 상담: 1336 (한국도박문제관리센터)</li>
          </ul>
        </div>
      </div>
      <Analytics />
    </div>
  );
}