@echo off

start "Backend" cmd /k "cd server && .venv\Scripts\activate && uvicorn main:app --reload"
start "Frontend" cmd /k "cd client && npm run dev"