import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { API_URL } from '../config';

/**
 * Reusable Google Login Button using Google Identity Services (GIS).
 * 
 * @param {Object} props
 * @param {Function} [props.onSuccess] - Callback when login succeeds with user data
 * @param {Function} [props.onError] - Callback when an error occurs
 * @param {'signin_with' | 'signup_with' | 'continue_with'} [props.text='signin_with'] - Button text type
 * @param {'outline' | 'filled_blue' | 'filled_black'} [props.theme='outline'] - Button style theme
 * @param {'large' | 'medium' | 'small'} [props.size='large'] - Button size
 * @param {'rectangular' | 'pill'} [props.shape='rectangular'] - Button shape
 * @param {number|string} [props.width] - Button pixel width (e.g. 300)
 */
export const GoogleLoginButton = ({
  onSuccess,
  onError,
  text = 'signin_with',
  theme = 'outline',
  size = 'large',
  shape = 'rectangular',
  width,
}) => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { cartItems } = useCartStore();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clientId = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_CLIENT_ID) || '';

  const handleCredentialResponse = async (response) => {
    if (!response || !response.credential) {
      const err = 'No credentials received from Google';
      setErrorMessage(err);
      if (onError) onError(err);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }

      // Save user session in auth store & localStorage
      login(data);

      if (onSuccess) {
        onSuccess(data);
      } else {
        // Default navigation flow
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (cartItems.length > 0) {
          navigate('/checkout');
        } else {
          navigate('/account');
        }
      }
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      const msg = err.message || 'Failed to authenticate with server';
      setErrorMessage(msg);
      if (onError) onError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let checkInterval = null;
    let isMounted = true;

    const initGsi = () => {
      if (!isMounted || !buttonRef.current || !clientId) return;

      const google = window.google;
      if (google && google.accounts && google.accounts.id) {
        try {
          google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Clear previous render if any
          buttonRef.current.innerHTML = '';

          google.accounts.id.renderButton(buttonRef.current, {
            theme,
            size,
            text,
            shape,
            width: width || (buttonRef.current.parentElement ? buttonRef.current.parentElement.clientWidth : 280),
            logo_alignment: 'left',
          });
        } catch (e) {
          console.warn('Google Identity Services initialization warning:', e);
        }
      }
    };

    if (window.google && window.google.accounts && window.google.accounts.id) {
      initGsi();
    } else {
      // Poll until script loads
      let attempts = 0;
      checkInterval = setInterval(() => {
        attempts++;
        if (window.google && window.google.accounts && window.google.accounts.id) {
          clearInterval(checkInterval);
          initGsi();
        } else if (attempts > 50) { // 5 seconds timeout
          clearInterval(checkInterval);
          console.warn('Google Identity Services script took too long to load.');
        }
      }, 100);
    }

    return () => {
      isMounted = false;
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [clientId, text, theme, size, shape, width]);

  return (
    <div className="w-full flex flex-col items-center">
      {errorMessage && (
        <div className="w-full mb-3 p-2.5 bg-red-50 text-red-600 text-xs rounded border border-red-200 text-center">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-2 space-x-2 text-sm text-[#825425]">
          <div className="w-4 h-4 border-2 border-[#825425] border-t-transparent rounded-full animate-spin"></div>
          <span>Authenticating with Google...</span>
        </div>
      ) : (
        <div 
          ref={buttonRef} 
          className="w-full flex justify-center min-h-[44px]"
        />
      )}
    </div>
  );
};

export default GoogleLoginButton;

