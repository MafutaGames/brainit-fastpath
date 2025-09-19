@echo off
echo Starting BrainIT FastPath local development server...
echo.
echo This will start the Vite development server on http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
cd /d "%~dp0"
npm run dev
pause
