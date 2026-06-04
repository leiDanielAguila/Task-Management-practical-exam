import { Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import type { ReactElement } from "react";
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
  disableActions: boolean;
}

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
  disableActions,
}: TaskCardProps): ReactElement => {
  const statusLabel = task.is_completed ? "Completed" : "Active";
  const statusColor = task.is_completed ? "gray" : "indigo";
  const toggleLabel = task.is_completed ? "Mark Active" : "Mark Complete";

  return (
    <Card withBorder radius="md" padding="md">
      <Stack gap="xs">
        <Group justify="space-between" align="center">
          <Text fw={600}>{task.title}</Text>
          <Badge color={statusColor} variant="light">
            {statusLabel}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {task.description && task.description.trim().length > 0
            ? task.description
            : "No description provided."}
        </Text>

        <Group justify="space-between" gap="xs">
          <Button
            size="xs"
            variant="light"
            onClick={() => onToggleStatus(task)}
            disabled={disableActions}
          >
            {toggleLabel}
          </Button>

          <Group gap="xs">
            <Button
              size="xs"
              variant="default"
              onClick={() => onEdit(task)}
              disabled={disableActions}
            >
              Edit
            </Button>
            <Button
              size="xs"
              color="red"
              variant="light"
              onClick={() => onDelete(task)}
              disabled={disableActions}
            >
              Delete
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
