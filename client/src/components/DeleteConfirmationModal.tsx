import { Button, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { ReactElement } from "react";

interface DeleteConfirmationModalProps {
  opened: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmationModal = ({
  opened,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteConfirmationModalProps): ReactElement => {
  const isMobile = useMediaQuery("(max-width: 48em)");

  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      title="Delete Task"
      centered
      size={isMobile ? "90%" : "sm"}
      radius="md"
    >
      <Text>Are you sure you want to delete this task?</Text>
      <Group justify="flex-end" mt="lg">
        <Button variant="default" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm} loading={isDeleting}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};
