@echo off
setlocal enabledelayedexpansion
REM ------------------------------------------------------------
REM  local-commit-fastpath.bat
REM  Stages and commits changes in H:\BrainITProjects\brainit-fastpath.
REM  Usage:
REM     local-commit-fastpath.bat "feat: add X"
REM ------------------------------------------------------------

cd /d "H:\BrainITProjects\brainit-fastpath" || (echo [ERROR] Repo folder not found: H:\BrainITProjects\brainit-fastpath & exit /b 1)
if not exist ".git" (echo [ERROR] Not a git repo: %cd% & exit /b 1)

for /f "delims=" %%b in ('git rev-parse --abbrev-ref HEAD') do set "BRANCH=%%b"

set "MSG=%~1"
if "%MSG%"=="" (
  for /f "tokens=1-3 delims=/- " %%a in ("%date%") do set "TODAY=%%a-%%b-%%c"
  for /f "tokens=1-2 delims=: " %%h in ("%time%") do set "NOW=%%h%%i"
  set "MSG=chore: commit on %TODAY%_%NOW%"
)

echo [INFO] Repo: %cd%
echo [INFO] Branch: %BRANCH%
echo [INFO] Message: %MSG%

git add -A
git diff --cached --quiet && (
  echo [SKIP] Nothing staged to commit.
  exit /b 0
)

git commit -m "%MSG%"
if errorlevel 1 (
  echo [ERROR] Commit failed.
  exit /b 1
)

echo [DONE] Local commit complete on branch: %BRANCH%
endlocal
