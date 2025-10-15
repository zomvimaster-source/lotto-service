@echo off
chcp 65001 >nul
title 로또 데이터 자동 업데이트

echo.
echo ============================================
echo   🎰 로또 데이터 자동 업데이트 시작
echo ============================================
echo.

echo [1/4] Python 스크립트 실행 중...
python scripts/update-lotto-data.py
if %errorlevel% neq 0 (
    echo.
    echo ❌ Python 스크립트 실행 실패!
    echo Python이 설치되어 있는지 확인하세요.
    pause
    exit /b 1
)

echo.
echo [2/4] Git 변경사항 확인 중...
git status --porcelain
if %errorlevel% neq 0 (
    echo.
    echo ❌ Git 상태 확인 실패!
    pause
    exit /b 1
)

echo.
echo [3/4] Git에 변경사항 추가 중...
git add .
if %errorlevel% neq 0 (
    echo.
    echo ❌ Git add 실패!
    pause
    exit /b 1
)

echo.
echo [4/4] 변경사항 커밋 및 푸시 중...
for /f "tokens=1-4 delims=/-. " %%i in ('date /t') do set mydate=%%l-%%j-%%k
for /f "tokens=1-2 delims=: " %%i in ('time /t') do set mytime=%%i-%%j

git commit -m "Auto lotto data update %mydate% %mytime% - New round data added and statistics updated"

if %errorlevel% neq 0 (
    echo.
    echo ℹ️ 새로운 변경사항이 없거나 커밋에 실패했습니다.
    echo 이미 최신 데이터일 수 있습니다.
) else (
    echo.
    echo GitHub에 푸시 중...
    git push
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Git push 실패!
        echo 인터넷 연결을 확인하세요.
        pause
        exit /b 1
    )
)

echo.
echo ============================================
echo   ✅ 로또 데이터 업데이트 완료!
echo ============================================
echo.
echo 웹사이트에 반영되려면 2-3분 정도 소요됩니다.
echo Vercel 자동 배포가 완료될 때까지 기다려주세요.
echo.

pause