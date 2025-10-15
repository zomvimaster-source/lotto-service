import { useState } from 'react';
import { Calculator, DollarSign, FileText, Info, AlertTriangle } from 'lucide-react';

export default function TaxCalculator({ darkMode }) {
  const [winningAmount, setWinningAmount] = useState('');
  const [calculationResult, setCalculationResult] = useState(null);

  const calculateTax = (amount) => {
    const numAmount = parseInt(amount.replace(/,/g, ''));
    
    if (isNaN(numAmount) || numAmount <= 0) {
      return null;
    }

    let incomeTax = 0;
    let localTax = 0;
    let totalTax = 0;
    let netAmount = 0;
    let taxRate = 0;

    if (numAmount <= 50000000) {
      // 5천만원 이하 - 비과세
      incomeTax = 0;
      localTax = 0;
      totalTax = 0;
      netAmount = numAmount;
      taxRate = 0;
    } else if (numAmount <= 300000000) {
      // 5천만원 초과 ~ 3억원 이하
      incomeTax = Math.floor(numAmount * 0.22);
      localTax = Math.floor(incomeTax * 0.1);
      totalTax = incomeTax + localTax;
      netAmount = numAmount - totalTax;
      taxRate = 24.2;
    } else {
      // 3억원 초과
      incomeTax = Math.floor(numAmount * 0.33);
      localTax = Math.floor(incomeTax * 0.1);
      totalTax = incomeTax + localTax;
      netAmount = numAmount - totalTax;
      taxRate = 36.3;
    }

    return {
      originalAmount: numAmount,
      incomeTax,
      localTax,
      totalTax,
      netAmount,
      taxRate
    };
  };

  const handleCalculate = () => {
    const result = calculateTax(winningAmount);
    setCalculationResult(result);
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setWinningAmount(value);
  };

  const formatInputValue = (value) => {
    if (!value) return '';
    return parseInt(value).toLocaleString();
  };

  const exampleCalculations = [
    { amount: 15000000000, label: '1등 당첨금 150억원' },
    { amount: 5000000000, label: '1등 당첨금 50억원' },
    { amount: 100000000, label: '2등 당첨금 1억원' },
    { amount: 50000000, label: '3등 당첨금 5천만원' },
    { amount: 1500000, label: '3등 당첨금 150만원' }
  ];

  return (
    <div className="space-y-8">
      {/* 세금 계산기 섹션 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-green-500" />
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            로또 당첨금 세금 계산기
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 계산기 입력 */}
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                당첨금액을 입력하세요
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatInputValue(winningAmount)}
                  onChange={handleInputChange}
                  placeholder="예: 1,000,000,000"
                  className={`w-full p-4 text-xl border-2 rounded-xl ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:border-green-500 focus:outline-none`}
                />
                <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  원
                </span>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!winningAmount}
              className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all ${
                winningAmount
                  ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              세금 계산하기
            </button>

            {/* 예시 금액 버튼들 */}
            <div className="space-y-3">
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                빠른 계산
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {exampleCalculations.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setWinningAmount(example.amount.toString())}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="font-semibold">{example.label}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {formatNumber(example.amount)}원
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 계산 결과 */}
          <div className="space-y-6">
            {calculationResult ? (
              <div className={`p-6 rounded-xl border-2 ${
                darkMode ? 'border-green-500 bg-gray-700' : 'border-green-500 bg-green-50'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  계산 결과
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-300">
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      당첨금액
                    </span>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {formatNumber(calculationResult.originalAmount)}원
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      소득세 ({calculationResult.taxRate > 0 ? (calculationResult.taxRate > 30 ? '33%' : '22%') : '0%'})
                    </span>
                    <span className={`text-red-600 font-bold`}>
                      -{formatNumber(calculationResult.incomeTax)}원
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      지방소득세 ({calculationResult.taxRate > 0 ? (calculationResult.taxRate > 30 ? '3.3%' : '2.2%') : '0%'})
                    </span>
                    <span className={`text-red-600 font-bold`}>
                      -{formatNumber(calculationResult.localTax)}원
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t-2 border-gray-400">
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      총 세금
                    </span>
                    <span className={`text-xl font-bold text-red-600`}>
                      -{formatNumber(calculationResult.totalTax)}원
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t-2 border-green-500 bg-green-100 dark:bg-green-900 rounded-lg px-4">
                    <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      실수령액
                    </span>
                    <span className={`text-2xl font-bold text-green-600`}>
                      {formatNumber(calculationResult.netAmount)}원
                    </span>
                  </div>

                  {calculationResult.taxRate > 0 && (
                    <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          세율 정보
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        총 세율: {calculationResult.taxRate}% 
                        ({calculationResult.originalAmount > 300000000 ? '3억원 초과 구간' : '5천만원~3억원 구간'})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-xl border-2 border-dashed ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-center">
                  <DollarSign className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    당첨금액을 입력하고 계산하기 버튼을 눌러주세요
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 세금 정보 상세 가이드 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-blue-500" />
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            로또 당첨금 세금 완전 가이드
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 세금 구간별 정보 */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              당첨금 구간별 세금 정보
            </h3>

            <div className="space-y-4">
              {/* 5천만원 이하 */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                  💚 5천만원 이하 (비과세)
                </h4>
                <ul className={`space-y-1 text-sm ${darkMode ? 'text-green-200' : 'text-green-700'}`}>
                  <li>• 세금: 0원 (완전 비과세)</li>
                  <li>• 실수령액: 당첨금 전액</li>
                  <li>• 해당 등급: 4등, 5등, 3등 일부</li>
                </ul>
              </div>

              {/* 5천만원 초과 ~ 3억원 이하 */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  💛 5천만원 초과 ~ 3억원 이하
                </h4>
                <ul className={`space-y-1 text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                  <li>• 소득세: 22%</li>
                  <li>• 지방소득세: 2.2% (소득세의 10%)</li>
                  <li>• 총 세율: 24.2%</li>
                  <li>• 해당 등급: 2등, 3등 대부분</li>
                </ul>
              </div>

              {/* 3억원 초과 */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                  ❤️ 3억원 초과 (최고세율)
                </h4>
                <ul className={`space-y-1 text-sm ${darkMode ? 'text-red-200' : 'text-red-700'}`}>
                  <li>• 소득세: 33%</li>
                  <li>• 지방소득세: 3.3% (소득세의 10%)</li>
                  <li>• 총 세율: 36.3%</li>
                  <li>• 해당 등급: 1등 당첨금 대부분</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 수령 방법 및 주의사항 */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              당첨금 수령 방법
            </h3>

            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  💰 5만원 이하 (4등, 5등)
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  전국 로또 판매점에서 즉시 수령 가능
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  💰 5만원 초과 ~ 10만원 이하
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  로또 판매점 또는 농협 지역본부
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  💰 10만원 초과 (고액 당첨)
                </h4>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• 농협 지역본부 또는 농협중앙회</li>
                  <li>• 신분증과 당첨복권 지참 필수</li>
                  <li>• 당첨일로부터 1년 이내 수령</li>
                </ul>
              </div>
            </div>

            {/* 중요 주의사항 */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-orange-900 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h4 className={`font-bold ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                  중요 주의사항
                </h4>
              </div>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                <li>• 당첨복권 분실 시 당첨금 수령 불가</li>
                <li>• 1년 이내 미수령 시 복권기금 귀속</li>
                <li>• 온라인 구매 시 5만원 이하 자동 입금</li>
                <li>• 세금은 수령 시 자동 차감</li>
                <li>• 당첨금 양도 및 담보 제공 금지</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 실제 당첨 사례 */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            실제 당첨금 계산 사례
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-50 border border-blue-200'}`}>
              <h4 className={`font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                1등 당첨 (20억원)
              </h4>
              <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>당첨금: 2,000,000,000원</p>
                <p className="text-red-600">세금: -726,000,000원</p>
                <p className="font-bold text-green-600">실수령: 1,274,000,000원</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-50 border border-blue-200'}`}>
              <h4 className={`font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                2등 당첨 (1억원)
              </h4>
              <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>당첨금: 100,000,000원</p>
                <p className="text-red-600">세금: -24,200,000원</p>
                <p className="font-bold text-green-600">실수령: 75,800,000원</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-50 border border-blue-200'}`}>
              <h4 className={`font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                3등 당첨 (150만원)
              </h4>
              <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>당첨금: 1,500,000원</p>
                <p className="text-green-600">세금: 0원 (비과세)</p>
                <p className="font-bold text-green-600">실수령: 1,500,000원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}