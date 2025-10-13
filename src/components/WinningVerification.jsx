import { useState, useEffect } from 'react';
import { Trophy, Camera, Check, X, Upload, Star, Share2, Medal } from 'lucide-react';
import { getLottoNumbersWithProxy } from '../api/lottoApi';

export default function WinningVerification() {
  const [userNumbers, setUserNumbers] = useState(['', '', '', '', '', '']);
  const [selectedRound, setSelectedRound] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadedTicket, setUploadedTicket] = useState(null);
  const [winningHistory, setWinningHistory] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submissionData, setSubmissionData] = useState({
    nickname: '',
    storeName: '',
    storeLocation: '',
    message: '',
    agreeToShare: false
  });

  // 로컬스토리지에서 당첨 히스토리 로드
  useEffect(() => {
    const saved = localStorage.getItem('winningHistory');
    if (saved) {
      setWinningHistory(JSON.parse(saved));
    }
  }, []);

  function handleNumberChange(index, value) {
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 45)) {
      const newNumbers = [...userNumbers];
      newNumbers[index] = value;
      setUserNumbers(newNumbers);
    }
  }

  function handleTicketUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedTicket({
          file,
          url: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }

  async function verifyNumbers() {
    // 입력값 검증
    const numbers = userNumbers.filter(num => num !== '').map(num => parseInt(num));
    if (numbers.length !== 6) {
      alert('6개의 번호를 모두 입력해주세요.');
      return;
    }

    if (!selectedRound || selectedRound < 1) {
      alert('회차를 입력해주세요.');
      return;
    }

    // 중복 번호 체크
    const uniqueNumbers = [...new Set(numbers)];
    if (uniqueNumbers.length !== 6) {
      alert('중복된 번호가 있습니다. 다른 번호를 입력해주세요.');
      return;
    }

    try {
      setIsVerifying(true);
      
      // 해당 회차 당첨번호 조회
      const drawData = await getLottoNumbersWithProxy(parseInt(selectedRound));
      const winningNumbers = drawData.numbers;
      const bonusNumber = drawData.bonus;

      // 당첨 확인
      const matches = numbers.filter(num => winningNumbers.includes(num));
      const bonusMatch = numbers.includes(bonusNumber);
      
      let rank = null;
      let prize = '';
      let message = '';

      if (matches.length === 6) {
        rank = 1;
        prize = `${drawData.firstWinAmount?.toLocaleString()}원`;
        message = '🎊 1등 당첨! 축하합니다! 🎊';
      } else if (matches.length === 5 && bonusMatch) {
        rank = 2;
        prize = '약 5천만원';
        message = '🎉 2등 당첨! 대박입니다! 🎉';
      } else if (matches.length === 5) {
        rank = 3;
        prize = '약 150만원';
        message = '🎁 3등 당첨! 정말 좋네요! 🎁';
      } else if (matches.length === 4) {
        rank = 4;
        prize = '5만원';
        message = '👍 4등 당첨! 축하해요! 👍';
      } else if (matches.length === 3) {
        rank = 5;
        prize = '5천원';
        message = '😊 5등 당첨! 다음에도 행운을! 😊';
      } else {
        message = '😔 아쉽지만 당첨되지 않았습니다. 다음 기회에!';
      }

      const result = {
        userNumbers: numbers.sort((a, b) => a - b),
        winningNumbers,
        bonusNumber,
        matches: matches.length,
        bonusMatch,
        rank,
        prize,
        message,
        round: drawData.round,
        date: drawData.date
      };

      setVerificationResult(result);

      // 당첨된 경우 인증 폼 표시
      if (rank && rank <= 5) {
        setShowSubmitForm(true);
      }

    } catch (error) {
      console.error('번호 검증 실패:', error);
      alert('회차 정보를 가져올 수 없습니다. 회차를 확인해주세요.');
    } finally {
      setIsVerifying(false);
    }
  }

  function submitWinningProof() {
    if (!submissionData.nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!submissionData.agreeToShare) {
      alert('당첨 정보 공개에 동의해주세요.');
      return;
    }

    // 당첨 인증 정보 저장
    const winningProof = {
      id: Date.now(),
      ...verificationResult,
      ...submissionData,
      ticketImage: uploadedTicket?.url,
      submittedAt: new Date().toISOString(),
      verified: true
    };

    const newHistory = [winningProof, ...winningHistory];
    setWinningHistory(newHistory);
    localStorage.setItem('winningHistory', JSON.stringify(newHistory));

    // 성공 메시지
    alert('당첨 인증이 완료되었습니다! 축하합니다! 🎉');
    
    // 폼 초기화
    setShowSubmitForm(false);
    setSubmissionData({
      nickname: '',
      storeName: '',
      storeLocation: '',
      message: '',
      agreeToShare: false
    });
    setUploadedTicket(null);
  }

  function shareWinning(winning) {
    const text = `🎰 ${winning.nickname}님이 ${winning.round}회차에서 ${winning.rank}등 당첨되었습니다! 
당첨번호: ${winning.userNumbers.join(', ')}
상금: ${winning.prize}
${winning.message}

#로또 #당첨 #행운`;

    if (navigator.share) {
      navigator.share({
        title: '로또 당첨 인증',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('당첨 정보가 클립보드에 복사되었습니다!');
    }
  }

  return (
    <div className="space-y-6">
      {/* 당첨 인증 폼 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-500 p-3 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">당첨 인증 시스템</h2>
            <p className="text-gray-600">번호를 입력하여 당첨 여부를 확인해보세요</p>
          </div>
        </div>

        {/* 회차 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">당첨 회차</label>
          <input
            type="number"
            placeholder="예: 1192"
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none"
          />
        </div>

        {/* 번호 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">구매한 번호 (1~45)</label>
          <div className="grid grid-cols-6 gap-3">
            {userNumbers.map((number, index) => (
              <input
                key={index}
                type="number"
                min="1"
                max="45"
                value={number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                className="w-full h-12 text-center border-2 border-gray-300 rounded-lg focus:border-yellow-500 outline-none font-semibold text-lg"
                placeholder={index + 1}
              />
            ))}
          </div>
        </div>

        {/* 로또 용지 업로드 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            <Camera className="w-4 h-4 inline mr-2" />
            로또 용지 사진 (선택사항)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            {uploadedTicket ? (
              <div className="space-y-3">
                <img 
                  src={uploadedTicket.url} 
                  alt="업로드된 로또 용지"
                  className="max-h-40 mx-auto rounded-lg"
                />
                <p className="text-sm text-gray-600">{uploadedTicket.name}</p>
                <button
                  onClick={() => setUploadedTicket(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">로또 용지 사진을 업로드하세요</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTicketUpload}
                  className="hidden"
                  id="ticket-upload"
                />
                <label
                  htmlFor="ticket-upload"
                  className="inline-block bg-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 mt-2"
                >
                  파일 선택
                </label>
              </>
            )}
          </div>
        </div>

        {/* 인증 버튼 */}
        <button
          onClick={verifyNumbers}
          disabled={isVerifying}
          className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? '확인 중...' : '당첨 인증하기'}
        </button>
      </div>

      {/* 검증 결과 */}
      {verificationResult && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {verificationResult.rank === 1 ? '🏆' : 
               verificationResult.rank === 2 ? '🥈' :
               verificationResult.rank === 3 ? '🥉' :
               verificationResult.rank === 4 ? '🎖️' :
               verificationResult.rank === 5 ? '🎗️' : '😔'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {verificationResult.message}
            </h3>
            {verificationResult.rank && (
              <p className="text-xl text-purple-600 font-semibold">
                {verificationResult.rank}등 당첨 - {verificationResult.prize}
              </p>
            )}
          </div>

          {/* 번호 비교 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">구매한 번호</h4>
                <div className="flex gap-2">
                  {verificationResult.userNumbers.map((num, idx) => (
                    <div 
                      key={idx} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        verificationResult.winningNumbers.includes(num) ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">당첨번호</h4>
                <div className="flex gap-2">
                  {verificationResult.winningNumbers.map((num, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
                      {num}
                    </div>
                  ))}
                  <span className="mx-2 text-gray-500">+</span>
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold text-white">
                    {verificationResult.bonusNumber}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                일치 번호: {verificationResult.matches}개
                {verificationResult.bonusMatch && ' + 보너스'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 당첨 인증 제출 폼 */}
      {showSubmitForm && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            🎉 당첨 인증 정보 등록
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">닉네임 *</label>
              <input
                type="text"
                value={submissionData.nickname}
                onChange={(e) => setSubmissionData({...submissionData, nickname: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none"
                placeholder="공개될 닉네임을 입력하세요"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">구매 판매점</label>
                <input
                  type="text"
                  value={submissionData.storeName}
                  onChange={(e) => setSubmissionData({...submissionData, storeName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none"
                  placeholder="예: 행운로또"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">판매점 위치</label>
                <input
                  type="text"
                  value={submissionData.storeLocation}
                  onChange={(e) => setSubmissionData({...submissionData, storeLocation: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none"
                  placeholder="예: 서울 강남구"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">당첨 소감</label>
              <textarea
                value={submissionData.message}
                onChange={(e) => setSubmissionData({...submissionData, message: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none"
                rows="3"
                placeholder="당첨 소감을 자유롭게 적어주세요"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree-share"
                checked={submissionData.agreeToShare}
                onChange={(e) => setSubmissionData({...submissionData, agreeToShare: e.target.checked})}
                className="mt-1"
              />
              <label htmlFor="agree-share" className="text-sm text-gray-600">
                당첨 정보를 사이트에 공개하고 다른 사용자들과 공유하는 것에 동의합니다. 
                이는 사이트의 신뢰성 향상과 다른 사용자들에게 희망을 주기 위함입니다. *
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowSubmitForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={submitWinningProof}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600"
              >
                인증 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 당첨 인증 히스토리 */}
      {winningHistory.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-800">인증된 당첨자들</h3>
          </div>
          
          <div className="space-y-4">
            {winningHistory.slice(0, 10).map((winning) => (
              <div key={winning.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Medal className="w-6 h-6 text-yellow-600" />
                      <span className="text-xl font-bold text-gray-800">
                        {winning.nickname}님
                      </span>
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {winning.rank}등 당첨
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">회차:</span> {winning.round}회 ({winning.date})
                      </div>
                      <div>
                        <span className="font-semibold">당첨번호:</span> {winning.userNumbers.join(', ')}
                      </div>
                      {winning.storeName && (
                        <div>
                          <span className="font-semibold">구매점:</span> {winning.storeName} ({winning.storeLocation})
                        </div>
                      )}
                      <div>
                        <span className="font-semibold">상금:</span> {winning.prize}
                      </div>
                    </div>
                    
                    {winning.message && (
                      <p className="mt-3 text-gray-700 italic">
                        "{winning.message}"
                      </p>
                    )}
                    
                    <p className="mt-2 text-xs text-gray-500">
                      인증일: {new Date(winning.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => shareWinning(winning)}
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                      title="공유하기"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {winning.ticketImage && (
                  <div className="mt-4">
                    <img 
                      src={winning.ticketImage} 
                      alt="당첨 용지"
                      className="max-h-32 rounded-lg border-2 border-yellow-200"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}