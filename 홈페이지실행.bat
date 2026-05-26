@echo off
REM 작성일: 2026-05-26
REM 변경: 프로젝트 루트에서 Next.js 개발 서버(npm run dev) 실행용 배치 파일 추가

chcp 65001 >nul
title 가스펠플러스 홈페이지 - 개발 서버

REM 배치 파일이 있는 폴더로 이동 (어디서 실행해도 동일하게 동작)
cd /d "%~dp0"

echo ========================================
echo   가스펠플러스 홈페이지 개발 서버
echo ========================================
echo.

REM Node.js 설치 여부 확인
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되어 있지 않습니다.
    echo        https://nodejs.org 에서 LTS 버전을 설치한 뒤 다시 실행하세요.
    pause
    exit /b 1
)

REM 최초 실행 시 의존성 설치
if not exist "node_modules\" (
    echo [정보] node_modules가 없습니다. npm install을 실행합니다...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [오류] npm install에 실패했습니다.
        pause
        exit /b 1
    )
    echo.
)

echo [정보] 개발 서버를 시작합니다...
echo [정보] 브라우저: http://localhost:3000
echo [정보] 서버 종료: Ctrl+C
echo.

call npm run dev

echo.
echo [정보] 개발 서버가 종료되었습니다.
pause
