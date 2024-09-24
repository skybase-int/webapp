import { useContext } from 'react';
import { ConfigContext, ConfigContextProps } from '../context/ConfigContext';

export const useConfigContext = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfigContext must be used within the ConfigProvider');
  }
  return context;
};
