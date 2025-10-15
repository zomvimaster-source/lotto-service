import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Target, Award, Info, Database } from 'lucide-react';
import { generateStatistics } from '../utils/lottoStatistics';

export default function NumberStatistics({ darkMode }) {
  const [selectedPeriod, setSelectedPeriod] = useState('recent');
  const [statisticsData, setStatisticsData] = useState(null);

  // 실제 로또 데이터 기반 통계 생성
  useEffect(() => {
    try {
      const stats = generateStatistics(selectedPeriod);
      setStatisticsData(stats);
    } catch (error) {
      console.error('통계 생성 실패:', error);
      // 에러 발생 시 기본값 설정
      setStatisticsData(null);
    }
  }, [selectedPeriod]);

  const getBallColor = (num) => {
    if (num <= 10) return 'bg-yellow-400';
    if (num <= 20) return 'bg-blue-400';
    if (num <= 30) return 'bg-red-400';
    if (num <= 40) return 'bg-gray-600';
    return 'bg-green-500';
  };

  const getFrequencyColor = (frequency, isHot = true) => {
    if (isHot) {
      if (frequency >= 8) return 'bg-red-500';
      if (frequency >= 6) return 'bg-orange-500';
      return 'bg-yellow-500';
    } else {
      if (frequency <= 2) return 'bg-blue-600';
      if (frequency <= 4) return 'bg-blue-500';
      return 'bg-blue-400';
    }
  };

  if (!statisticsData) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 및 기간 선택 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-purple-500" />
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>번호 통계 분석</h2>
        </div>

        <div className="mb-6">
          <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            분석 기간 선택
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { value: 'recent', label: '최근 30회차', desc: '약 7개월' },
              { value: 'quarter', label: '최근 13회차', desc: '약 3개월' },
              { value: 'half', label: '최근 26회차', desc: '약 6개월' },
              { value: 'year', label: '최근 52회차', desc: '약 1년' }
            ].map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPeriod === period.value
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-semibold text-sm">{period.label}</div>
                <div className="text-xs opacity-70">{period.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>실제 데이터 분석</span>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            현재 {statisticsData.period.label} 기간의 실제 당첨번호를 분석한 결과입니다.
            {statisticsData.period.dateRange && (
              <><br />기간: {statisticsData.period.dateRange}</>
            )}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              마지막 업데이트: {statisticsData.lastUpdated}
            </span>
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              실제 데이터
            </span>
          </div>
        </div>
      </div>

      {/* HOT & COLD 번호 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* HOT 번호 */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>🔥 HOT 번호</h3>
          </div>
          
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {statisticsData.period.label} 동안 가장 많이 출현한 번호들입니다.
          </p>

          <div className="space-y-3">
            {statisticsData.hotNumbers.map((item, index) => (
              <div key={item.number} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-red-500 w-6">#{index + 1}</div>
                  <div className={`${getBallColor(item.number)} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
                    {item.number}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.frequency}회
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    출현률 {((item.frequency / statisticsData.totalDraws) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLD 번호 */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-6 h-6 text-blue-500" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>❄️ COLD 번호</h3>
          </div>
          
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {statisticsData.period.label} 동안 가장 적게 출현한 번호들입니다.
          </p>

          <div className="space-y-3">
            {statisticsData.coldNumbers.map((item, index) => (
              <div key={item.number} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-blue-500 w-6">#{index + 1}</div>
                  <div className={`${getBallColor(item.number)} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
                    {item.number}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.frequency}회
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    출현률 {((item.frequency / statisticsData.totalDraws) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 구간별 분석 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-green-500" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>구간별 출현 분석</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(statisticsData.sectionAnalysis).map(([section, numbers]) => {
            const totalFreq = numbers.reduce((sum, item) => sum + item.frequency, 0);
            const avgFreq = numbers.length > 0 ? (totalFreq / numbers.length).toFixed(1) : 0;
            
            return (
              <div key={section} className={`p-6 rounded-xl border-2 ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}>
                <h4 className={`text-lg font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {section}
                </h4>
                <div className="text-center space-y-2">
                  <div className={`text-2xl font-bold text-purple-600`}>
                    {totalFreq}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    총 출현 횟수
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    평균 {avgFreq}회
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 홀짝 분석 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-purple-500" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>홀짝 번호 분석</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'} border-2 border-purple-200`}>
            <h4 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🎯 홀수 번호 (1, 3, 5, ...)
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {statisticsData.oddEvenAnalysis.odd.count}회
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  전체 출현의 {statisticsData.oddEvenAnalysis.odd.percentage}%
                </div>
              </div>
              <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
                홀수
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border-2 border-blue-200`}>
            <h4 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🎯 짝수 번호 (2, 4, 6, ...)
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {statisticsData.oddEvenAnalysis.even.count}회
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  전체 출현의 {statisticsData.oddEvenAnalysis.even.percentage}%
                </div>
              </div>
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                짝수
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'} border ${darkMode ? 'border-gray-600' : 'border-yellow-200'}`}>
          <h5 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            📊 분석 인사이트
          </h5>
          <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>• 일반적으로 홀수와 짝수는 비슷한 비율로 출현합니다</li>
            <li>• 한 게임에서 홀수 3개, 짝수 3개가 나오는 경우가 가장 흔합니다</li>
            <li>• 모든 홀수 또는 모든 짝수가 나올 확률은 매우 낮습니다</li>
            <li>• 과거 패턴이 미래 결과를 보장하지는 않습니다</li>
          </ul>
        </div>
      </div>

      {/* 번호 활용 팁 */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          💡 통계 활용 가이드
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'} border ${darkMode ? 'border-gray-600' : 'border-green-200'}`}>
            <h4 className={`font-bold mb-3 text-green-600`}>✅ 참고할 점</h4>
            <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• HOT 번호는 최근 자주 나온 번호입니다</li>
              <li>• COLD 번호는 상대적으로 적게 나온 번호입니다</li>
              <li>• 구간별 분석으로 번호 분산을 확인할 수 있습니다</li>
              <li>• 홀짝 비율을 참고하여 균형있게 선택하세요</li>
            </ul>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-red-50'} border ${darkMode ? 'border-gray-600' : 'border-red-200'}`}>
            <h4 className={`font-bold mb-3 text-red-600`}>⚠️ 주의사항</h4>
            <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• 과거 데이터는 미래를 보장하지 않습니다</li>
              <li>• 모든 번호의 당첨 확률은 항상 동일합니다</li>
              <li>• 통계는 참고용으로만 활용하세요</li>
              <li>• 로또는 순수한 확률 게임입니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}