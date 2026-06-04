import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { ReactElement } from "react";
import type { Task } from "../types/task";
import { TaskForm, type TaskFormValues } from "./TaskForm";

interface TaskFormModalProps {
  opened: boolean;
  mode: "create" | "edit";
  task?: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
}

export const TaskFormModal = ({
  opened,
  mode,
  task,
  isSubmitting,
  onClose,
  onSubmit,
}: TaskFormModalProps): ReactElement => {
  const isMobile = useMediaQuery("(max-width: 48em)");
  const title = mode === "create" ? "Create Task" : "Edit Task";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size={isMobile ? "90%" : "lg"}
      radius="md"
    >
      <TaskForm
        mode={mode}
        task={task}
        isSubmitting={isSubmitting}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
