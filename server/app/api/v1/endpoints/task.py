from fastapi import APIRouter, Depends, Query, status
from typing import Any

from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate
from app.services.task_service import TaskService
from app.dependencies.services import get_task_service

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreate,
    service: TaskService = Depends(get_task_service),
) -> Any:
    return service.create_task(task_data)


@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    search: str | None = Query(None, description="Search by task title"),
    status: str | None = Query(None, description="Filter by active, inactive, or all"),
    service: TaskService = Depends(get_task_service),
) -> Any:
    return service.get_tasks(search=search, filter_status=status)


@router.get("/{task_id}", response_model=TaskResponse)
def get_task_by_id(
    task_id: int,
    service: TaskService = Depends(get_task_service),
) -> Any:
    return service.get_task_by_id(task_id)


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    service: TaskService = Depends(get_task_service),
) -> Any:
    return service.update_task(task_id, task_data)


@router.patch("/{task_id}/toggle", response_model=TaskResponse)
def toggle_task_status(
    task_id: int,
    service: TaskService = Depends(get_task_service),
) -> Any:
    return service.toggle_task_status(task_id)


@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(
    task_id: int,
    service: TaskService = Depends(get_task_service),
) -> dict[str, str]:
    return service.delete_task(task_id)
