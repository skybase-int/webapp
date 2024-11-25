import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useRestrictedAddressCheck, useVpnCheck } from '@jetstreamgg/hooks';

interface ConnectedContextType {
  isConnectedAndAcceptedTerms: boolean;
  isAuthorized: boolean;
  setHasAcceptedTerms: (value: boolean) => void;
  isCheckingTerms: boolean;
  authData: {
    addressAllowed?: boolean;
    authIsLoading: boolean;
    address?: string;
    authError?: Error;
  };
  vpnData: {
    isConnectedToVpn?: boolean;
    vpnIsLoading: boolean;
    vpnError?: Error;
  };
}

const ConnectedContext = createContext<ConnectedContextType>({
  isConnectedAndAcceptedTerms: false,
  isAuthorized: false,
  setHasAcceptedTerms: () => {},
  isCheckingTerms: false,
  authData: {
    authIsLoading: false
  },
  vpnData: {
    vpnIsLoading: false
  }
});

export const ConnectedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected, address } = useAccount();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isCheckingTerms, setIsCheckingTerms] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const skipAuthCheck =
    import.meta.env.VITE_ENV_NAME !== 'production' && import.meta.env.VITE_SKIP_AUTH_CHECK === 'true';

  const authUrl = import.meta.env.VITE_AUTH_URL || 'https://staging-api.sky.money';
  const {
    data: authData,
    isLoading: authIsLoading,
    error: authError
  } = useRestrictedAddressCheck({ address, authUrl, enabled });

  const { data: vpnData, isLoading: vpnIsLoading, error: vpnError } = useVpnCheck({ authUrl });

  useEffect(() => {
    setEnabled(!!address);
  }, [address]);

  // Terms acceptance check
  const checkTermsAcceptance = async (address: string) => {
    setIsCheckingTerms(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_TERMS_ENDPOINT}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
      });

      if (response.ok) {
        const res = await response.json();
        setIsCheckingTerms(false);
        return res;
      } else {
        console.error('Failed to send signature');
        setIsCheckingTerms(false);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error sending signature:', error);
      setIsCheckingTerms(false);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    if (skipAuthCheck) {
      setHasAcceptedTerms(true);
      return;
    }
    if (isConnected && address) {
      checkTermsAcceptance(address).then(({ termsAccepted }) => {
        setHasAcceptedTerms(termsAccepted);
      });
    } else {
      setHasAcceptedTerms(false);
    }
  }, [isConnected, address]);

  const isAllowed = useMemo(
    () =>
      !vpnData?.isConnectedToVpn &&
      (!enabled || (enabled && authData?.addressAllowed)) &&
      !authError &&
      !vpnError,
    [vpnData?.isConnectedToVpn, enabled, authData?.addressAllowed, authError, vpnError]
  );

  const isAuthorized = isAllowed || skipAuthCheck;
  const isConnectedAndAcceptedTerms = isConnected && hasAcceptedTerms;

  return (
    <ConnectedContext.Provider
      value={{
        isConnectedAndAcceptedTerms,
        isAuthorized,
        setHasAcceptedTerms,
        isCheckingTerms,
        authData: {
          addressAllowed: authData?.addressAllowed,
          authIsLoading,
          address,
          authError
        },
        vpnData: {
          isConnectedToVpn: vpnData?.isConnectedToVpn,
          vpnIsLoading,
          vpnError
        }
      }}
    >
      {children}
    </ConnectedContext.Provider>
  );
};

export const useConnectedContext = () => useContext(ConnectedContext);
