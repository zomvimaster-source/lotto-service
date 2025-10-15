#!/usr/bin/env python3
"""
로또 데이터 자동 업데이트 스크립트
GitHub Actions에서 매주 토요일마다 실행됩니다.
"""

import requests
import json
import os
import sys
from datetime import datetime, timedelta
import time

def get_latest_round():
    """현재 저장된 JSON에서 최신 회차 번호를 가져옵니다."""
    try:
        with open('src/data/lottoHistory.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            if data:
                return data[0]['round']  # 첫 번째가 최신 회차
    except FileNotFoundError:
        print("❌ lottoHistory.json 파일을 찾을 수 없습니다.")
        return 1192  # 기본값
    except Exception as e:
        print(f"❌ JSON 파일 읽기 실패: {e}")
        return 1192  # 기본값
    
    return 1192

def fetch_lotto_data(round_num):
    """동행복권 API에서 특정 회차의 로또 데이터를 가져옵니다."""
    url = "https://www.dhlottery.co.kr/common.do"
    params = {
        'method': 'getLottoNumber',
        'drwNo': round_num
    }
    
    try:
        print(f"🔍 {round_num}회차 데이터 요청 중...")
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        # API 응답 검증
        if data.get('returnValue') != 'success':
            print(f"⚠️ {round_num}회차: API 응답 실패 - {data.get('returnValue')}")
            return None
            
        # 필수 데이터 확인
        required_fields = ['drwNo', 'drwNoDate', 'drwtNo1', 'drwtNo2', 'drwtNo3', 'drwtNo4', 'drwtNo5', 'drwtNo6', 'bnusNo']
        if not all(field in data for field in required_fields):
            print(f"⚠️ {round_num}회차: 필수 데이터 누락")
            return None
            
        # 데이터 구조화
        lotto_entry = {
            'round': int(data['drwNo']),
            'date': data['drwNoDate'],
            'numbers': [
                int(data['drwtNo1']),
                int(data['drwtNo2']),
                int(data['drwtNo3']),
                int(data['drwtNo4']),
                int(data['drwtNo5']),
                int(data['drwtNo6'])
            ],
            'bonus': int(data['bnusNo'])
        }
        
        print(f"✅ {round_num}회차 데이터 성공: {lotto_entry['numbers']} + {lotto_entry['bonus']}")
        return lotto_entry
        
    except requests.RequestException as e:
        print(f"❌ {round_num}회차 네트워크 오류: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ {round_num}회차 JSON 파싱 오류: {e}")
        return None
    except Exception as e:
        print(f"❌ {round_num}회차 예상치 못한 오류: {e}")
        return None

def update_json_file(new_entries):
    """새로운 데이터를 JSON 파일에 추가합니다."""
    try:
        # 기존 데이터 로드
        with open('src/data/lottoHistory.json', 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
        
        # 새 데이터를 기존 데이터 앞에 추가 (최신순 유지)
        updated_data = new_entries + existing_data
        
        # 중복 제거 (회차 번호 기준)
        seen_rounds = set()
        deduplicated_data = []
        for entry in updated_data:
            if entry['round'] not in seen_rounds:
                deduplicated_data.append(entry)
                seen_rounds.add(entry['round'])
        
        # 회차순으로 정렬 (최신이 첫 번째)
        deduplicated_data.sort(key=lambda x: x['round'], reverse=True)
        
        # 파일에 저장
        with open('src/data/lottoHistory.json', 'w', encoding='utf-8') as f:
            json.dump(deduplicated_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ JSON 파일 업데이트 완료: {len(new_entries)}개 새 회차 추가")
        return True
        
    except Exception as e:
        print(f"❌ JSON 파일 업데이트 실패: {e}")
        return False

def main():
    """메인 실행 함수"""
    print("🚀 로또 데이터 자동 업데이트 시작")
    print(f"📅 실행 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # 현재 최신 회차 확인
    current_latest_round = get_latest_round()
    print(f"📊 현재 저장된 최신 회차: {current_latest_round}")
    
    # 최대 3개 회차까지 확인 (매주 1회차씩 나오므로 충분)
    max_check_rounds = 3
    new_entries = []
    
    for i in range(1, max_check_rounds + 1):
        check_round = current_latest_round + i
        print(f"\n🔍 {check_round}회차 확인 중...")
        
        # 약간의 딜레이로 API 호출 제한 방지
        if i > 1:
            time.sleep(1)
        
        lotto_data = fetch_lotto_data(check_round)
        
        if lotto_data:
            new_entries.append(lotto_data)
            print(f"🎯 새로운 회차 발견: {check_round}회차")
        else:
            print(f"ℹ️ {check_round}회차는 아직 발표되지 않았습니다.")
            break  # 연속된 회차가 없으면 중단
    
    # 결과 처리
    if new_entries:
        print(f"\n📈 총 {len(new_entries)}개의 새로운 회차를 발견했습니다:")
        for entry in new_entries:
            print(f"  - {entry['round']}회차 ({entry['date']}): {entry['numbers']} + {entry['bonus']}")
        
        # JSON 파일 업데이트
        if update_json_file(new_entries):
            print(f"\n🎉 데이터 업데이트 성공!")
            print(f"📊 최신 회차: {new_entries[0]['round']}회차")
            sys.exit(0)  # 성공
        else:
            print(f"\n❌ 데이터 업데이트 실패!")
            sys.exit(1)  # 실패
    else:
        print(f"\nℹ️ 새로운 로또 데이터가 없습니다.")
        print(f"📊 최신 회차 유지: {current_latest_round}회차")
        sys.exit(0)  # 변경사항 없음도 성공

if __name__ == "__main__":
    main()