@echo off
echo 🚀 Money Council Backend Server
echo ===================================
echo.
echo This batch file will help you install Node.js and start the server
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Node.js is already installed!
    echo 🚀 Starting server...
    node standalone-server.js
    goto :end
)

echo ❌ Node.js is not installed
echo.
echo 🔧 Let's install Node.js for you...
echo.

REM Try to download Node.js using PowerShell
echo 📥 Downloading Node.js...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile 'nodejs-installer.msi'}"

if exist nodejs-installer.msi (
    echo ✅ Downloaded Node.js installer
    echo 📦 Installing Node.js (this may take a minute)...
    msiexec /i nodejs-installer.msi /quiet /norestart
    
    echo 🔄 Refreshing environment variables...
    refreshenv
    
    echo ✅ Node.js installation complete!
    echo 🚀 Starting server...
    node standalone-server.js
) else (
    echo ❌ Failed to download Node.js
    echo.
    echo 🔧 Manual installation required:
    echo 1. Go to https://nodejs.org
    echo 2. Download the LTS version
    echo 3. Install it
    echo 4. Run this batch file again
    echo.
    echo 🎯 For now, your frontend works perfectly standalone!
    echo 📂 Open: frontend\index.html in your browser
)

:end
pause
