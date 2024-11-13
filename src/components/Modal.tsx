import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="rounded-lg w-11/12 md:w-1/2 lg:w-1/2 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-blue-100 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;