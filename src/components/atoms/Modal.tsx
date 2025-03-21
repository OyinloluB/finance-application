import React, { ReactNode } from "react";
import Button from "@/components/atoms/Button";
import CloseIcon from "./icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  actionButtonText: string;
  cancelText?: string;
  confirmType?: "primary" | "destroy" | "secondary";
  loading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal = ({
  isOpen,
  title,
  description,
  children,
  actionButtonText,
  cancelText,
  confirmType = "primary",
  loading,
  onClose,
  onConfirm,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-400 rounded-lg w-[560px] max-w-full shadow-lg">
        <div className="flex justify-between items-center mb-250">
          <h2 className="text-preset-1 font-bold text-grey-900">{title}</h2>
          <button onClick={onClose} className="text-grey-400 hover:text-black">
            <CloseIcon />
          </button>
        </div>

        <div className="mb-250">
          <span className="text-preset-4 text-grey-500">{description}</span>
        </div>

        <div className="mb-400">{children}</div>

        <div className="flex flex-col gap-250">
          <Button
            type={confirmType}
            text={actionButtonText}
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
          />
          {cancelText && (
            <div
              className="text-preset-4 text-center text-grey-500 cursor-pointer"
              onClick={onClose}
            >
              {cancelText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
