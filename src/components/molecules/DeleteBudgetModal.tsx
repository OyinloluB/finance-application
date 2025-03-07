import React from "react";
import Modal from "../atoms/Modal";

interface DeleteBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const DeleteBudgetModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteBudgetModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      actionButtonText="Yes, Confirm Deletion"
      cancelText="No, Go Back"
      confirmType="destroy"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default DeleteBudgetModal;
