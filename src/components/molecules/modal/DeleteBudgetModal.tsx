import Modal from "@/components/atoms/Modal";
import React from "react";

interface DeleteBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title: string;
  description: string;
}

const DeleteBudgetModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  title,
  description,
}: DeleteBudgetModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      actionButtonText={isDeleting ? "Deleting..." : "Yes, Confirm Deletion"}
      cancelText="No, Go Back"
      confirmType="destroy"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default DeleteBudgetModal;
