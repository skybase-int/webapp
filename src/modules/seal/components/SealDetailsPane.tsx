import { useContext, useMemo } from 'react';
import { ConfigContext } from '@/modules/config/context/ConfigContext';
import { SealOverview } from './SealOverview';
import { SealPositionDetails } from './SealPositionDetails';
import { ActiveSealDetailsView } from '../constants';

export function SealDetailsPane() {
  const { selectedSealPosition } = useContext(ConfigContext);
  const view = useMemo(
    () => (selectedSealPosition ? ActiveSealDetailsView.DETAILS : ActiveSealDetailsView.OVERVIEW),
    [selectedSealPosition]
  );

  return view === ActiveSealDetailsView.DETAILS ? (
    <SealPositionDetails positionIndex={selectedSealPosition} />
  ) : (
    <SealOverview />
  );
}
