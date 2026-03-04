import { useState, useEffect, useCallback } from 'react';
import type { ToastVariant } from './Toast';

export interface ToastState {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface UseToastReturn {
  toasts: ToastState[];
  showToast: (options: Omit<ToastState, 'id'>) => void;
  dismissToast: (id: string) => void;
}

let toastIdCounter = 0;

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((options: Omit<ToastState, 'id'>) => {
    const id = String(++toastIdCounter);
    setToasts((prev) => [...prev, { ...options, id }]);
  }, []);

  return { toasts, showToast, dismissToast };
};

export interface SingleToastReturn {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

export const useSingleToast = (duration = 3000): SingleToastReturn => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible || duration <= 0) return;
    const timer = setTimeout(hide, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, hide]);

  return { visible, show, hide };
};
