import {
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { FilterBar } from "../components/FilterBar";
import { SearchBar } from "../components/SearchBar";
import { TaskCard } from "../components/TaskCard";
import { TaskFormModal } from "../components/TaskFormModal";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useToggleTaskStatus,
  useUpdateTask,
} from "../hooks/useTasks";
import type { Task, TaskFilter } from "../types/task";
import { getErrorMessage } from "../utils/taskHelpers";
import type { TaskFormValues } from "../components/TaskForm";

export const HomePage = (): ReactElement => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [formOpened, setFormOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const {
    data: tasks = [],
    isLoading,
    isFetching,
    error,
  } = useTasks(search, filter);

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const toggleTaskMutation = useToggleTaskStatus();

  const isMutating =
    createTaskMutation.isPending ||
    updateTaskMutation.isPending ||
    deleteTaskMutation.isPending ||
    toggleTaskMutation.isPending;

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Failed to load tasks",
        message: getErrorMessage(error, "Unable to fetch tasks"),
        color: "red",
      });
    }
  }, [error]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setFormOpened(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setFormOpened(true);
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setDeleteOpened(true);
  };

  const closeFormModal = () => {
    if (isMutating) {
      return;
    }
    setFormOpened(false);
    setSelectedTask(null);
  };

  const closeDeleteModal = () => {
    if (deleteTaskMutation.isPending) {
      return;
    }
    setDeleteOpened(false);
    setSelectedTask(null);
  };

  const handleFormSubmit = (values: TaskFormValues) => {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim() || null,
    };

    if (selectedTask) {
      updateTaskMutation.mutate(
        { taskId: selectedTask.id, data: payload },
        {
          onSuccess: () => {
            notifications.show({
              title: "Task Updated Successfully",
              message: "Your task has been updated.",
              color: "green",
            });
            closeFormModal();
          },
          onError: (mutationError) => {
            notifications.show({
              title: "Failed to Update Task",
              message: getErrorMessage(mutationError, "Unable to update task"),
              color: "red",
            });
          },
        },
      );
      return;
    }

    createTaskMutation.mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Task Created Successfully",
          message: "Your task has been added.",
          color: "green",
        });
        closeFormModal();
      },
      onError: (mutationError) => {
        notifications.show({
          title: "Failed to Create Task",
          message: getErrorMessage(mutationError, "Unable to create task"),
          color: "red",
        });
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (!selectedTask) {
      return;
    }

    deleteTaskMutation.mutate(selectedTask.id, {
      onSuccess: () => {
        notifications.show({
          title: "Task Deleted Successfully",
          message: "The task has been removed.",
          color: "green",
        });
        setDeleteOpened(false);
        setSelectedTask(null);
      },
      onError: (mutationError) => {
        notifications.show({
          title: "Failed to Delete Task",
          message: getErrorMessage(mutationError, "Unable to delete task"),
          color: "red",
        });
      },
    });
  };

  const handleToggleStatus = (task: Task) => {
    toggleTaskMutation.mutate(task.id, {
      onSuccess: (updatedTask) => {
        notifications.show({
          title: "Task Updated Successfully",
          message: updatedTask.is_completed
            ? "Task marked as completed."
            : "Task marked as active.",
          color: "green",
        });
      },
      onError: (mutationError) => {
        notifications.show({
          title: "Failed to Update Task",
          message: getErrorMessage(
            mutationError,
            "Unable to update task status",
          ),
          color: "red",
        });
      },
    });
  };

  const filteredTasks = useMemo(() => tasks, [tasks]);

  return (
    <Container size={900} py={40}>
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={2}>Task Manager</Title>
            <Text c="dimmed">
              Create, track, and organize your tasks in one place.
            </Text>
          </Stack>
          <Button onClick={openCreateModal} disabled={isMutating}>
            + Add Task
          </Button>
        </Group>

        <SearchBar onSearch={setSearch} />
        <FilterBar value={filter} onChange={setFilter} />

        {isFetching && !isLoading && (
          <Group gap="xs">
            <Loader size="sm" />
            <Text size="sm" c="dimmed">
              Refreshing tasks...
            </Text>
          </Group>
        )}

        {isLoading ? (
          <Paper withBorder radius="md" p="xl">
            <Group justify="center">
              <Loader />
            </Group>
          </Paper>
        ) : filteredTasks.length === 0 ? (
          <Paper withBorder radius="md" p="xl">
            <Stack align="center" gap="xs">
              <Title order={4}>No tasks found</Title>
              <Text c="dimmed">Create your first task.</Text>
            </Stack>
          </Paper>
        ) : (
          <Stack>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onToggleStatus={handleToggleStatus}
                disableActions={isMutating}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <TaskFormModal
        opened={formOpened}
        mode={selectedTask ? "edit" : "create"}
        task={selectedTask}
        isSubmitting={
          createTaskMutation.isPending || updateTaskMutation.isPending
        }
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmationModal
        opened={deleteOpened}
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteTaskMutation.isPending}
      />
    </Container>
  );
};
