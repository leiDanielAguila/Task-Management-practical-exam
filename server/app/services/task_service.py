from typing import Any
from fastapi import HTTPException, status

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepositoryProtocol:
    """
    Implicit interface for the TaskRepository.
    Defines the methods the service expects.
    """
    def create_task(self, task_data: dict[str, Any]) -> Task:
        ...

    def get_task_by_id(self, task_id: int) -> Task | None:
        ...

    def get_tasks(self, search: str | None = None, is_completed: bool | None = None) -> list[Task]:
        ...

    def update_task(self, task: Task, update_data: dict[str, Any]) -> Task:
        ...

    def delete_task(self, task: Task) -> None:
        ...


class TaskService:
    def __init__(self, repository: TaskRepositoryProtocol) -> None:
        self._repository = repository

    def create_task(self, task_data: TaskCreate) -> Task:
        title = task_data.title.strip()
        if not title:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Title cannot be empty or just whitespace."
            )
        
        task_dict = task_data.model_dump()
        task_dict["title"] = title
        
        return self._repository.create_task(task_dict)

    def get_task_by_id(self, task_id: int) -> Task:
        task = self._repository.get_task_by_id(task_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found."
            )
        return task

    def get_tasks(self, search: str | None = None, filter_status: str | None = None) -> list[Task]:
        is_completed: bool | None = None
        
        if filter_status is not None:
            status_lower = filter_status.lower()
            if status_lower == "active":
                is_completed = False
            elif status_lower == "inactive":
                is_completed = True
            elif status_lower == "all":
                is_completed = None
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid status filter. Must be 'active', 'inactive', or 'all'."
                )
                
        return self._repository.get_tasks(search=search, is_completed=is_completed)

    def update_task(self, task_id: int, task_data: TaskUpdate) -> Task:
        task = self.get_task_by_id(task_id)
        
        update_dict = task_data.model_dump(exclude_unset=True)
        
        if "title" in update_dict:
            title = update_dict["title"]
            if title is not None:
                title = title.strip()
                if not title:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Title cannot be empty or just whitespace."
                    )
                update_dict["title"] = title
            
        return self._repository.update_task(task, update_dict)

    def toggle_task_status(self, task_id: int) -> Task:
        task = self.get_task_by_id(task_id)
        return self._repository.update_task(task, {"is_completed": not task.is_completed})

    def delete_task(self, task_id: int) -> dict[str, str]:
        task = self.get_task_by_id(task_id)
        self._repository.delete_task(task)
        return {"message": "Task deleted successfully"}
