#!/bin/bash

trap 'kill $(jobs -p)' EXIT

echo "Starting FastAPI backend..."
cd server && source .venv/bin/activate && uvicorn app.main:app --reload &

echo "Starting Vite frontend..."
cd client && npm run dev &

wait