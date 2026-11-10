import React from 'react';

export interface GoogleLoginButtonProps {
  onSuccess?: (userData: any) => void;
  onError?: (error: string) => void;
  text?: 'signin_with' | 'signup_with' | 'continue_with';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  shape?: 'rectangular' | 'pill';
  width?: number | string;
}

export declare const GoogleLoginButton: React.FC<GoogleLoginButtonProps>;
export default GoogleLoginButton;

