import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { calculateTax, formatNumber } from '../../utils/lottoUtils';

const TaxCalculator = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const taxResult = calculateTax(amount);
    setResult(taxResult);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
      setAmount(value);
      // 실시간 계산
      const taxResult = calculateTax(value);
      setResult(taxResult);
    } else if (value === '') {
      setAmount('');
      setResult(null);
    }
  };

  const presetAmounts = [
    { label: '1등 평균', value: 2000000000 },
    { label: '2등 평균', value: 50000000 },
    { label: '3등 고정', value: 1500000 }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">실수령액 계산기</h2>
          </div>
          <p className="text-gray-600">
            로또 당첨금에서 세금을 제외한 실제 받을 수 있는 금액을 계산해보세요
          </p>
        </div>

        {/* 금액 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            당첨금액 입력
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={amount ? formatNumber(parseInt(amount)) : ''}
              onChange={handleAmountChange}
              placeholder="예: 2,000,000,000"
              className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none text-lg font-semibold"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              원
            </span>
          </div>
        </div>

        {/* 빠른 선택 */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">빠른 선택</p>
          <div className="flex gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setAmount(preset.value.toString());
                  setResult(calculateTax(preset.value));
                }}
                className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* 계산 결과 */}
        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 gap-4">
                {/* 원래 금액 */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">당첨금액</span>
                  <span className="text-xl font-bold text-gray-800">
                    {formatNumber(result.original)}원
                  </span>
                </div>

                <hr className="border-gray-200" />

                {/* 세금 내역 */}
                {result.taxRate > 0 && (
                  <>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-red-600">소득세 ({result.taxRate}%)</span>
                      <span className="text-red-600 font-semibold">
                        -{formatNumber(result.incomeTax)}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-red-600">지방세 (10%)</span>
                      <span className="text-red-600 font-semibold">
                        -{formatNumber(result.localTax)}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 bg-red-50 -mx-2 px-2 rounded">
                      <span className="text-red-700 font-medium">총 세금</span>
                      <span className="text-red-700 font-bold">
                        -{formatNumber(result.totalTax)}원
                      </span>
                    </div>

                    <hr className="border-gray-200" />
                  </>
                )}

                {/* 실수령액 */}
                <div className="flex justify-between items-center py-3 bg-green-50 -mx-2 px-2 rounded-lg">
                  <span className="text-green-700 font-bold text-lg">실수령액</span>
                  <span className="text-green-700 font-bold text-2xl">
                    {formatNumber(result.finalAmount)}원
                  </span>
                </div>

                {/* 세율 표시 */}
                {result.taxRate > 0 && (
                  <div className="text-center pt-2">
                    <span className="text-sm text-gray-500">
                      총 세율: {result.taxPercentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 세금 안내 */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">💡 세금 안내</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 5천만원 이하: 비과세</li>
                <li>• 5천만원 ~ 3억: 소득세 22% + 지방세 2.2%</li>
                <li>• 3억 초과: 소득세 33% + 지방세 3.3%</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;