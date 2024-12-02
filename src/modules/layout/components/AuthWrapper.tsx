import { ReactNode } from 'react';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { UnauthorizedPage } from '../../auth/components/UnauthorizedPage';

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthorized, authData, vpnData } = useConnectedContext();

  return isAuthorized ? (
    <>{children}</>
  ) : (
    <UnauthorizedPage authData={authData} vpnData={vpnData}>
      {children}
    </UnauthorizedPage>
  );
};
