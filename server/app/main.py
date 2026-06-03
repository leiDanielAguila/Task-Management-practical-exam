from fastapi import FastAPI

from app.api.v1.router import api_router


def create_application() -> FastAPI:
	app = FastAPI(title="Task Management API")
	app.include_router(api_router)
	return app


app = create_application()
