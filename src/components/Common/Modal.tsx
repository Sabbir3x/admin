import React, { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { maxWidth: '28rem' };
      case 'lg':
        return { maxWidth: '56rem' };
      case 'xl':
        return { maxWidth: '72rem' };
      default:
        return { maxWidth: '32rem' };
    }
  };

  const overlayStyles = {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: '1rem',
  };

  const modalStyles = {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    ...getSizeStyles(),
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
  };

  const titleStyles = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
  };

  const closeButtonStyles = {
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'background-color 0.2s',
  };

  const contentStyles = {
    padding: '1.5rem',
  };

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <div style={headerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          <button 
            onClick={onClose} 
            style={closeButtonStyles}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
        
        <div style={contentStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;