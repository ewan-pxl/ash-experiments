@echo off
rem Run the dev server (Windows). Double-click this file.
cd /d "%~dp0"
if not exist "node_modules" call npm install
call npm run dev
pause
