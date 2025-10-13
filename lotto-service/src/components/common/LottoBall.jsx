import React from 'react';

const LottoBall = ({ number, size = 'md', className = '' }) => {
  // 로또 공 색상과 그라디언트 결정
  const getBallStyle = (num) => {
    if (num <= 10) return {
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
      shadow: 'shadow-yellow-400/30'
    };
    if (num <= 20) return {
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
      shadow: 'shadow-blue-400/30'
    };
    if (num <= 30) return {
      background: 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
      shadow: 'shadow-red-400/30'
    };
    if (num <= 40) return {
      background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
      shadow: 'shadow-gray-400/30'
    };
    return {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
      shadow: 'shadow-green-400/30'
    };
  };

  // 크기별 스타일
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl'
  };

  const ballStyle = getBallStyle(number);

  return (
    <div 
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        text-white font-black
        shadow-2xl ${ballStyle.shadow}
        transition-all duration-300
        hover:scale-110 hover:rotate-12
        border-2 border-white/20
        relative
        ${className}
      `}
      style={{
        background: ballStyle.background,
        boxShadow: `
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04),
          inset 0 2px 4px 0 rgba(255, 255, 255, 0.3),
          inset 0 -2px 4px 0 rgba(0, 0, 0, 0.1)
        `
      }}
    >
      {/* 하이라이트 효과 */}
      <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full blur-sm"></div>
      
      {/* 번호 */}
      <span className="relative z-10 drop-shadow-lg">
        {number}
      </span>
    </div>
  );
};

export default LottoBall;