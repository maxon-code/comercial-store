import { create } from 'zustand';
import React from 'react';

interface ModalOptions {
  title: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
}

interface ModalState {
  isOpen: boolean;
  options: ModalOptions | null;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  options: null,
  openModal: (options) => set({ isOpen: true, options }),
  closeModal: () => set({ isOpen: false, options: null }),
}));