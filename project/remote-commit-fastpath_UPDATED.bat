@echo off
setlocal enabledelayedexpansion
REM ------------------------------------------------------------
REM  remote-commit-fastpath.bat
REM  Pushes the current branch of H:\BrainITProjects\brainit-fastpath
REM  to GitHub (brainit-consulting). If the remote still points
REM  at MafutaGames, it will be rewritten automatically.
REM ------------------------------------------------------------

cd /d "H:\BrainITProjects\brainit-fastpath" || (echo [ERROR] Repo folder not found: H:\BrainITProjects\brainit-fastpath & exit /b 1)
if not exist ".git" (echo [ERROR] Not a git repo: %cd% & exit /b 1)

for /f "delims=" %%B in ('git rev-parse --abbrev-ref HEAD') do set "BRANCH=%%B"

for /f "usebackq tokens=* delims=" %%U in (`git remote get-url origin 2^>nul`) do set "ORIGIN=%%U"
if "%ORIGIN%"=="" (
  echo [ERROR] No 'origin' remote found. Add one and retry.
  exit /b 1
)

echo %ORIGIN% | findstr /i /c:"github.com/MafutaGames/brainit-fastpath" >nul
if %errorlevel%==0 (
  echo [INFO] Rewriting origin from MafutaGames -> brainit-consulting...
  echo Original: %ORIGIN%
  set "NEWORIGIN=%ORIGIN:MafutaGames/brainit-consulting=%"
  set "NEWORIGIN=%NEWORIGIN:MafutaGames\:brainit-consulting:=%"
  git remote set-url origin "%NEWORIGIN%"
  if errorlevel 1 (
    echo [ERROR] Failed to set new origin URL.
    exit /b 1
  )
  for /f "usebackq tokens=* delims=" %%U in (`git remote get-url origin 2^>nul`) do set "ORIGIN=%%U"
  echo New: %ORIGIN%
)

echo [INFO] Repo: %cd%
echo [INFO] Branch: %BRANCH%
echo [INFO] Remote: %ORIGIN%

git push origin %BRANCH%
if errorlevel 1 (
  echo [WARN] Push rejected. Attempting rebase-then-push...
  git pull --rebase origin %BRANCH% && git push origin %BRANCH%
  if errorlevel 1 (
    echo [ERROR] Push still failing.
    exit /b 1
  )
)

echo [DONE] Remote push complete.
endlocal
