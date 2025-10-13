import React from 'react';
import { TrendingUp, TrendingDown, Target, Zap, Sparkles, Shuffle } from 'lucide-react';

const iconMap = {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Sparkles,
  Shuffle
};

const StrategyCard = ({ strategy, onGenerate, isLoading }) => {
  const IconComponent = iconMap[strategy.icon];

  const getGradientColors = (color) => {
    const gradients = {
      'bg-strategy-hot': 'from-red-500 to-orange-500',
      'bg-strategy-cold': 'from-blue-500 to-cyan-500',
      'bg-strategy-balanced': 'from-green-500 to-emerald-500',
      'bg-strategy-oddeven': 'from-purple-500 to-indigo-500',
      'bg-strategy-high': 'from-yellow-500 to-amber-500',
      'bg-strategy-random': 'from-gray-500 to-slate-500'
    };
    return gradients[color] || 'from-purple-500 to-pink-500';
  };

  return (
    <div className="glass rounded-3xl p-8 card-shadow hover:scale-105 transition-all duration-500 cursor-pointer transform float group">
      <div className="flex items-center gap-5 mb-6">
        <div className={`w-16 h-16 bg-gradient-to-br ${getGradientColors(strategy.color)} rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-300`}>
          <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white drop-shadow-lg mb-1">{strategy.name}</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
        </div>
      </div>
      
      <p className="text-white/90 text-sm mb-8 leading-relaxed font-medium">
        {strategy.description}
      </p>
      
      <button
        onClick={() => onGenerate(strategy)}
        disabled={isLoading}
        className={`
          w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 transform
          bg-gradient-to-r ${getGradientColors(strategy.color)}
          shadow-2xl relative overflow-hidden group
          ${isLoading 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-3xl active:scale-95'
          }
        `}
      >
        {/* 버튼 하이라이트 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <span className="relative z-10 text-lg">
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              생성 중...
            </span>
          ) : (
            '🎲 번호 생성하기'
          )}
        </span>
      </button>
    </div>
  );
};

export default StrategyCard;