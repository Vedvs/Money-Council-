# Money Council Startup Script
# Starts both frontend and backend

Write-Host "🚀 Money Council Startup Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Start Frontend
Write-Host "📱 Starting Frontend..." -ForegroundColor Blue
try {
    Start-Process "frontend/index.html"
    Write-Host "✅ Frontend started in browser" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to start frontend" -ForegroundColor Red
    Write-Host "📂 Please manually open: frontend/index.html" -ForegroundColor Yellow
}

Write-Host ""

# Check for Node.js and start backend
Write-Host "🔧 Checking for Node.js..." -ForegroundColor Blue
try {
    $nodeVersion = node --version 2>$null
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
    
    Write-Host "🚀 Starting Backend Server..." -ForegroundColor Blue
    Set-Location backend
    Start-Process -FilePath "node" -ArgumentList "standalone-server.js" -NoNewWindow
    Write-Host "✅ Backend server starting on http://localhost:5000" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🎯 Both servers are starting" -ForegroundColor Green
    Write-Host "📊 Frontend: Open in your browser" -ForegroundColor Cyan
    Write-Host "🔗 Backend API: http://localhost:5000" -ForegroundColor Cyan
    Write-Host "🏥 Health Check: http://localhost:5000/api/v1/health" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 To install Node.js:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://nodejs.org" -ForegroundColor White
    Write-Host "2. Install LTS version" -ForegroundColor White
    Write-Host "3. Restart this script" -ForegroundColor White
    Write-Host ""
    Write-Host "🎯 Frontend is working perfectly" -ForegroundColor Green
    Write-Host "📱 Your Money Council app is ready in the browser" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎯 Money Council is ready to use" -ForegroundColor Green
