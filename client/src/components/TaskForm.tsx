import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ReactElement } from "react";
import { useEffect } from "react";
import type { Task } from "../types/task";

export interface TaskFormValues {
  title: string;
  description: string;
}

interface TaskFormProps {
  mode: "create" | "edit";
  task?: Task | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: TaskFormValues) => void;
}

const TITLE_LIMIT = 255;
const DESCRIPTION_LIMIT = 2000;

export const TaskForm = ({
  mode,
  task,
  isSubmitting,
  onCancel,
  onSubmit,
}: TaskFormProps): ReactElement => {
  const form = useForm<TaskFormValues>({
    initialValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
    },
    validate: {
      title: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return "Title is required";
        }
        if (trimmed.length > TITLE_LIMIT) {
          return "Title must be 255 characters or fewer";
        }
        return null;
      },
      description: (value) =>
        value.length > DESCRIPTION_LIMIT
          ? "Description must be 2000 characters or fewer"
          : null,
    },
  });

  useEffect(() => {
    form.setValues({
      title: task?.title ?? "",
      description: task?.description ?? "",
    });
  }, [task, form]);

  const submitLabel = mode === "create" ? "Save" : "Update";

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit({
          title: values.title.trim(),
          description: values.description.trim(),
        }),
      )}
    >
      <Stack>
        <TextInput
          label="Title"
          placeholder="Enter task title"
          withAsterisk
          maxLength={TITLE_LIMIT}
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Add task details"
          minRows={3}
          maxLength={DESCRIPTION_LIMIT}
          autosize
          {...form.getInputProps("description")}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {submitLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
