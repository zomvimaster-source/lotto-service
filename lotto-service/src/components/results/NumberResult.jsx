import React from 'react';
import LottoBall from '../common/LottoBall';
import { Share2, RefreshCw } from 'lucide-react';

const NumberResult = ({ result, onGenerateNew, onShare }) => {
  if (!result) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🎉 생성 완료!
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">{result.strategyName}</span>으로 생성된 번호입니다
          </p>
        </div>

        {/* 번호 표시 */}
        <div className="flex justify-center gap-3 mb-8">
          {result.numbers.map((number, index) => (
            <LottoBall
              key={index}
              number={number}
              size="lg"
              className="animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '1s',
                animationFillMode: 'both'
              }}
            />
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="bg-purple-50 rounded-2xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">홀수</span>
              <p className="font-semibold text-purple-600">
                {result.numbers.filter(n => n % 2 === 1).length}개
              </p>
            </div>
            <div>
              <span className="text-gray-500">짝수</span>
              <p className="font-semibold text-purple-600">
                {result.numbers.filter(n => n % 2 === 0).length}개
              </p>
            </div>
            <div>
              <span className="text-gray-500">합계</span>
              <p className="font-semibold text-purple-600">
                {result.numbers.reduce((sum, n) => sum + n, 0)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">구간 분포</span>
              <p className="font-semibold text-purple-600">
                {Math.max(...result.numbers) - Math.min(...result.numbers)}
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={onGenerateNew}
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            다시 생성
          </button>
          <button
            onClick={() => onShare(result)}
            className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            공유하기
          </button>
        </div>

        {/* 주의사항 */}
        <p className="text-xs text-gray-400 mt-4">
          ⚠️ 당첨을 보장하지 않습니다. 책임감 있는 구매를 권장합니다.
        </p>
      </div>
    </div>
  );
};

export default NumberResult;