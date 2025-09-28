'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm mx-4 sm:mx-auto',
    md: 'max-w-md mx-4 sm:mx-auto',
    lg: 'max-w-lg mx-4 sm:mx-auto',
    xl: 'max-w-xl mx-4 sm:mx-auto'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Enhanced Backdrop with subtle blur */}
      <div 
        className="fixed inset-0 bg-primary-900/20 backdrop-blur-md transition-all duration-300 ease-out"
        onClick={onClose}
        style={{
          background: 'radial-gradient(circle at center, rgba(88, 129, 87, 0.1) 0%, rgba(52, 78, 65, 0.25) 100%)'
        }}
      />
      
      {/* Modal Container - Responsive */}
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div 
          className={`relative transform overflow-hidden rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-primary-200/30 shadow-xl transition-all duration-300 ease-out scale-100 w-full ${sizeClasses[size]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Responsive Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-primary-200/30">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-primary-800 pr-2">
                {title}
              </h3>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 transition-all duration-200 flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Responsive Content Area */}
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}