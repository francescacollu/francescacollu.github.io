declare module 'react-scrollama' {
  import { ReactNode } from 'react';

  export interface ScrollamaProps {
    onStepEnter?: (data: { element: HTMLElement; data: any; direction: 'up' | 'down' }) => void;
    onStepExit?: (data: { element: HTMLElement; data: any; direction: 'up' | 'down' }) => void;
    onStepProgress?: (data: { element: HTMLElement; data: any; progress: number }) => void;
    offset?: number;
    threshold?: number;
    children?: ReactNode;
    debug?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }

  export interface StepProps {
    data?: any;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Scrollama: React.FC<ScrollamaProps>;
  export const Step: React.FC<StepProps>;
} 