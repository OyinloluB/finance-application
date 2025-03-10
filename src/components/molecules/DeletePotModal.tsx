import Modal from "@/components/atoms/Modal";

interface PotDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const DeletePotModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: PotDeleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      actionButtonText="Yes, Confirm Deletion"
      cancelText="No, Go Back"
      confirmType="destroy"
      onConfirm={onConfirm}
    />
  );
};

export default DeletePotModal;
