@echo off
title Lotto Data Update

echo Lotto data update starting...
python scripts/update-lotto-data.py

echo Adding changes to git...
git add .

echo Creating commit with timestamp...
for /f "tokens=1-4 delims=/-. " %%i in ('date /t') do set cdate=%%l-%%j-%%k
for /f "tokens=1-2 delims=: " %%i in ('time /t') do set ctime=%%i-%%j
git commit -m "Auto update lotto data %cdate% %ctime%"

echo Pushing to GitHub...
git push

echo.
echo Update completed! Website will update in 2-3 minutes.
pause