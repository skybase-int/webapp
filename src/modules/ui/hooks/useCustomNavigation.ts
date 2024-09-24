import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCustomNavigation = () => {
  const navigate = useNavigate();
  const { updateLinkedActionConfig } = useConfigContext();

  const [customHref, setCustomHref] = useState<string>();
  const [customNavLabel, setCustomNavLabel] = useState<string>();

  const onNavigate = useCallback(() => {
    if (customHref) {
      updateLinkedActionConfig({
        step: LinkedActionSteps.COMPLETED_CURRENT
      });
      navigate(customHref);
    }
  }, [customHref, navigate, updateLinkedActionConfig]);

  return { onNavigate, customHref, setCustomHref, customNavLabel, setCustomNavLabel };
};
