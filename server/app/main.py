from fastapi import FastAPI

from app.api.v1.router import api_router

from app.api.v1.router import api_router
from app.core.database import engine, Base

from fastapi.middleware.cors import CORSMiddleware





def create_application() -> FastAPI:
	app = FastAPI(title="Task Management API")
	app.include_router(api_router)
	return app

Base.metadata.create_all(bind=engine) 
app = create_application()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
