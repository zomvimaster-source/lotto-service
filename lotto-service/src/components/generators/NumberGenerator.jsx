import React, { useState } from 'react';
import StrategyCard from './StrategyCard';
import { strategies } from '../../utils/lottoUtils';

const NumberGenerator = ({ onNumbersGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (strategy) => {
    setIsLoading(true);
    
    // 생성 애니메이션을 위한 지연
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const numbers = strategy.algorithm();
    onNumbersGenerated({
      numbers,
      strategy: strategy.id,
      strategyName: strategy.name
    });
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
            <span className="text-4xl">🎰</span>
          </div>
          <h1 className="text-5xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            로또 매직 생성기
          </h1>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce delay-100">
            <span className="text-4xl">🍀</span>
          </div>
        </div>
        
        <p className="text-xl text-white/90 font-semibold mb-8 max-w-2xl mx-auto">
          ✨ 6가지 특별한 전략으로 당신만의 행운 번호를 찾아보세요 ✨
        </p>
        
        {/* 통계 정보 */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="glass rounded-2xl px-6 py-3">
            <div className="text-2xl font-bold text-white">🎯 6가지</div>
            <div className="text-white/80 text-sm">검증된 전략</div>
          </div>
          <div className="glass rounded-2xl px-6 py-3">
            <div className="text-2xl font-bold text-white">⚡ 즉시</div>
            <div className="text-white/80 text-sm">번호 생성</div>
          </div>
          <div className="glass rounded-2xl px-6 py-3">
            <div className="text-2xl font-bold text-white">🎲 무료</div>
            <div className="text-white/80 text-sm">무제한 사용</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Object.values(strategies).map((strategy, index) => (
          <div 
            key={strategy.id}
            style={{ animationDelay: `${index * 150}ms` }}
            className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
          >
            <StrategyCard
              strategy={strategy}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberGenerator;