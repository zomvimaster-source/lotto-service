import { useEffect } from 'react';

// AdSense 광고 컴포넌트
export default function AdSense({ 
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = {}
}) {
  useEffect(() => {
    try {
      // AdSense 광고 로드
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-6106116790010876"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

// 사전 정의된 광고 스타일 컴포넌트들
export function HeaderBanner({ className = '' }) {
  return (
    <AdSense
      adSlot="1234567890" // 실제 AdSense에서 생성된 슬롯 ID로 교체
      adFormat="banner"
      className={`text-center my-4 ${className}`}
      style={{ minHeight: '90px' }}
    />
  );
}

export function SidebarAd({ className = '' }) {
  return (
    <AdSense
      adSlot="2345678901" // 실제 AdSense에서 생성된 슬롯 ID로 교체
      adFormat="vertical"
      className={`${className}`}
      style={{ minHeight: '600px', width: '300px' }}
    />
  );
}

export function InContentAd({ className = '' }) {
  return (
    <AdSense
      adSlot="3456789012" // 실제 AdSense에서 생성된 슬롯 ID로 교체
      adFormat="rectangle"
      className={`text-center my-6 ${className}`}
      style={{ minHeight: '250px' }}
    />
  );
}

export function FooterBanner({ className = '' }) {
  return (
    <AdSense
      adSlot="4567890123" // 실제 AdSense에서 생성된 슬롯 ID로 교체
      adFormat="banner"
      className={`text-center mt-8 mb-4 ${className}`}
      style={{ minHeight: '90px' }}
    />
  );
}