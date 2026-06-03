from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class TaskBase(BaseModel):
    title: str = Field(..., max_length=255, description="The title of the task")
    description: Optional[str] = Field(None, description="Detailed description of the task")
    is_completed: bool = Field(False, description="Whether the task is completed")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
