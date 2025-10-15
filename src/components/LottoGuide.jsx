import { useState } from 'react';
import { Book, Award, Calculator, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function LottoGuide({ darkMode }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const guideData = [
    {
      id: 'basic',
      title: '로또 기본 정보',
      icon: Book,
      content: `
        로또 6/45는 대한민국에서 가장 인기 있는 복권 게임입니다. 1부터 45까지의 숫자 중 6개를 선택하여 구매하며, 매주 토요일 오후 8시 35분에 추첨이 진행됩니다.

        **구매 방법:**
        • 전국 로또 판매점에서 직접 구매
        • 동행복권 홈페이지에서 온라인 구매
        • 동행복권 모바일 앱을 통한 구매

        **구매 가격:** 게임당 1,000원

        **구매 시간:** 매주 토요일 오후 8시까지 (추첨일 당일)

        **최소 구매 연령:** 만 19세 이상

        **당첨번호 발표:** 매주 토요일 오후 8시 35분 MBC를 통해 생방송으로 진행됩니다. 추첨 후 동행복권 홈페이지에서도 즉시 확인할 수 있습니다.
      `
    },
    {
      id: 'probability',
      title: '당첨 확률 및 등급별 상금',
      icon: Award,
      content: `
        로또의 당첨 확률을 정확히 알고 구매하는 것이 중요합니다.

        **1등 (6개 번호 모두 일치)**
        • 확률: 1/8,145,060 (약 0.0000123%)
        • 상금: 총 당첨금의 75% (평균 15~20억원)

        **2등 (5개 번호 + 보너스번호 일치)**
        • 확률: 1/1,357,510 (약 0.0000736%)
        • 상금: 총 당첨금의 12.5% (평균 5천만~1억원)

        **3등 (5개 번호 일치)**
        • 확률: 1/35,724 (약 0.0028%)
        • 상금: 총 당첨금의 12.5% (평균 150~200만원)

        **4등 (4개 번호 일치)**
        • 확률: 1/733 (약 0.136%)
        • 상금: 고정 5만원

        **5등 (3개 번호 일치)**
        • 확률: 1/45 (약 2.22%)
        • 상금: 고정 5천원

        **전체 당첨 확률:** 약 1/6.8 (약 14.7%)

        매주 당첨자가 없을 경우 1등 상금은 다음 회차로 이월되어 더욱 큰 금액이 됩니다.
      `
    },
    {
      id: 'tax',
      title: '당첨금 세금 및 수령 방법',
      icon: Calculator,
      content: `
        로또 당첨금에는 세금이 부과되므로 실제 수령액을 미리 계산해보는 것이 중요합니다.

        **세금 계산 방법:**

        **5천만원 이하**
        • 세금 없음 (비과세)
        • 당첨금 전액 수령

        **5천만원 초과 ~ 3억원 이하**
        • 소득세: 22%
        • 지방소득세: 소득세의 10% (즉, 당첨금의 2.2%)
        • 총 세율: 24.2%

        **3억원 초과**
        • 소득세: 33%
        • 지방소득세: 소득세의 10% (즉, 당첨금의 3.3%)
        • 총 세율: 36.3%

        **당첨금 수령 방법:**

        **5만원 이하 (4등, 5등)**
        • 전국 로또 판매점에서 즉시 수령 가능

        **5만원 초과 ~ 10만원 이하**
        • 로또 판매점 또는 농협 지역본부에서 수령

        **10만원 초과**
        • 농협 지역본부 또는 농협중앙회에서 수령
        • 신분증과 당첨복권 지참 필수
        • 당첨일로부터 1년 이내 수령해야 함

        **주의사항:** 당첨복권 분실 시 당첨금 수령이 불가능하므로 안전한 곳에 보관하세요.
      `
    }
  ];

  const faqData = [
    {
      question: "로또를 처음 구매하는데 어떻게 해야 하나요?",
      answer: "가까운 로또 판매점을 방문하여 마킹지에 원하는 번호를 표시하거나 '자동'을 선택하면 됩니다. 온라인으로는 동행복권 홈페이지나 앱에서 회원가입 후 구매할 수 있습니다. 만 19세 이상만 구매 가능합니다."
    },
    {
      question: "자동 번호와 수동 번호 중 어느 것이 더 좋나요?",
      answer: "당첨 확률은 완전히 동일합니다. 자동 번호는 컴퓨터가 무작위로 선택하며, 수동 번호는 본인이 직접 선택하는 것입니다. 중요한 것은 번호 선택 방식이 아니라 운입니다."
    },
    {
      question: "같은 번호로 계속 구매하는 것이 유리한가요?",
      answer: "매회 당첨 확률은 동일하므로 같은 번호를 계속 구매하는 것과 매번 다른 번호를 구매하는 것의 당첨 확률은 같습니다. 다만 심리적 안정감을 위해 같은 번호를 고집하는 분들이 많습니다."
    },
    {
      question: "로또 당첨번호는 어떻게 생성되나요?",
      answer: "매주 토요일 추첨에서 전자동 추첨기를 사용하여 완전히 무작위로 선정됩니다. 추첨 과정은 MBC를 통해 생방송으로 공개되며, 공정성을 위해 여러 단계의 검증 절차를 거칩니다."
    },
    {
      question: "로또 당첨금을 받지 않으면 어떻게 되나요?",
      answer: "당첨일로부터 1년 이내에 수령하지 않으면 당첨금은 복권기금으로 귀속됩니다. 따라서 당첨 여부를 반드시 확인하고 기한 내에 수령하셔야 합니다."
    },
    {
      question: "온라인으로 구매한 로또의 당첨금은 어떻게 받나요?",
      answer: "5만원 이하는 자동으로 계정에 입금되며, 5만원 초과 시에는 농협 지역본부를 방문하여 신분증을 지참하고 직접 수령해야 합니다. 당첨 시 동행복권에서 안내 문자나 이메일을 발송합니다."
    },
    {
      question: "로또 구매에 제한이 있나요?",
      answer: "1인당 1회에 최대 5게임까지 구매할 수 있으며, 1일 구매 한도는 10만원입니다. 또한 만 19세 미만은 구매할 수 없으며, 신분증 확인이 필요할 수 있습니다."
    },
    {
      question: "로또 판매점은 어떻게 찾을 수 있나요?",
      answer: "동행복권 홈페이지나 앱에서 '판매점 찾기' 기능을 이용하면 가까운 판매점을 찾을 수 있습니다. 대부분의 편의점, 마트, 복권방에서 판매하고 있습니다."
    }
  ];

  return (
    <div className="space-y-8">
      {/* 로또 가이드 섹션 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-8">
          <Book className="w-8 h-8 text-blue-500" />
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>로또 완전 가이드</h2>
        </div>

        <div className="space-y-6">
          {guideData.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;
            
            return (
              <div key={section.id} className={`border rounded-xl ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-6 flex items-center justify-between text-left transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-purple-500" />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {section.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  )}
                </button>
                
                {isExpanded && (
                  <div className={`px-6 pb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="prose prose-lg max-w-none">
                      {section.content.split('\n').map((paragraph, idx) => {
                        if (paragraph.trim() === '') return null;
                        
                        if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                          // 굵은 제목 처리
                          return (
                            <h4 key={idx} className={`text-lg font-bold mt-6 mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {paragraph.replace(/\*\*/g, '')}
                            </h4>
                          );
                        } else if (paragraph.trim().startsWith('•')) {
                          // 리스트 아이템 처리
                          return (
                            <li key={idx} className="ml-4 mb-2">
                              {paragraph.trim().substring(1).trim()}
                            </li>
                          );
                        } else {
                          // 일반 문단 처리
                          return (
                            <p key={idx} className="mb-4 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-8 h-8 text-green-500" />
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>자주 묻는 질문</h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isExpanded = expandedSection === `faq-${index}`;
            
            return (
              <div key={index} className={`border rounded-xl ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <button
                  onClick={() => toggleSection(`faq-${index}`)}
                  className={`w-full p-6 flex items-center justify-between text-left transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Q. {faq.question}
                  </h3>
                  {isExpanded ? (
                    <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  )}
                </button>
                
                {isExpanded && (
                  <div className={`px-6 pb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="pl-4 border-l-4 border-green-500">
                      <p className="leading-relaxed">
                        <strong className="text-green-600">A.</strong> {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 추가 도움말 */}
        <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-50 border border-blue-200'}`}>
          <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            💡 더 많은 정보가 필요하신가요?
          </h4>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            로또에 대한 더 자세한 정보는 동행복권 공식 홈페이지에서 확인하실 수 있습니다.
          </p>
          <div className="space-y-2 text-sm">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              • 동행복권 고객센터: 1588-2143
            </p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              • 운영시간: 평일 09:00~18:00 (토요일 09:00~16:00, 일요일 및 공휴일 휴무)
            </p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              • 공식 홈페이지: www.dhlottery.co.kr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}