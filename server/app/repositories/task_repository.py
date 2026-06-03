from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.task import Task
from app.services.task_service import TaskRepositoryProtocol

class TaskRepository(TaskRepositoryProtocol):
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_task(self, task_data: dict[str, Any]) -> Task:
        task = Task(**task_data)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def get_task_by_id(self, task_id: int) -> Task | None:
        return self.db.get(Task, task_id)

    def get_tasks(self, search: str | None = None, is_completed: bool | None = None) -> list[Task]:
        statement = select(Task)
        if search:
            statement = statement.where(Task.title.ilike(f"%{search}%"))
        if is_completed is not None:
            statement = statement.where(Task.is_completed == is_completed)
        statement = statement.order_by(Task.created_at.desc())
        return list(self.db.execute(statement).scalars().all())

    def update_task(self, task: Task, update_data: dict[str, Any]) -> Task:
        for key, value in update_data.items():
            setattr(task, key, value)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete_task(self, task: Task) -> None:
        self.db.delete(task)
        self.db.commit()
