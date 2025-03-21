import Modal from "@/components/atoms/Modal";

interface PotDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isDeleting: boolean;
}

const DeletePotModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isDeleting
}: PotDeleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      actionButtonText={isDeleting ? "Deleting..." : "Yes, Confirm Deletion"}
      cancelText="No, Go Back"
      confirmType="destroy"
      onConfirm={onConfirm}
    />
  );
};

export default DeletePotModal;
