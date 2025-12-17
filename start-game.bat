@echo off
REM Apocalypse RPG - Game Launcher
REM This batch file checks for dependencies, installs if needed, then starts the game

setlocal enabledelayedexpansion
title Apocalypse RPG Launcher
color 0A

echo.
echo ========================================
echo   APOCALYPSE RPG
echo   Launcher v1.0
echo ========================================
echo.

REM Navigate to the project directory
cd /d "%~dp0"

REM Check if Node.js is installed
echo Checking for Node.js...
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js found
echo.

REM Check if npm is installed
echo Checking for npm...
where npm >nul 2>nul
if errorlevel 1 (
    echo.
    echo [ERROR] npm is not installed or not in PATH!
    echo.
    pause
    exit /b 1
)
echo [OK] npm found
echo.

REM Check if node_modules exists
echo Checking for dependencies...
if not exist "node_modules" (
    echo.
    echo [!] Dependencies not found. Installing...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERROR] npm install failed!
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installed successfully
    echo.
) else (
    echo [OK] Dependencies already installed
    echo.
)

REM Start the game
echo Starting Apocalypse RPG...
echo.
call npm start

if errorlevel 1 (
    echo.
    echo [ERROR] Game failed to start!
    pause
    exit /b 1
)

pause