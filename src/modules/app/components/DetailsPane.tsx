import React, { useState, useEffect, forwardRef } from 'react';
import { Intent } from '@/lib/enums';
import { TradeDetails } from '@/modules/trade/components/TradeDetails';
import { UpgradeDetails } from '@/modules/upgrade/components/UpgradeDetails';
import { SavingsDetails } from '@/modules/savings/components/SavingsDetails';
import { RewardsDetailsPane } from '@/modules/rewards/components/RewardsDetailsPane';
import { BalancesDetails } from '@/modules/balances/components/BalancesDetails';
import { ConnectCard } from '@/modules/layout/components/ConnectCard';
import { AnimatePresence, motion } from 'framer-motion';
import { easeOutExpo } from '@/modules/ui/animation/timingFunctions';
import { cardAnimations } from '@/modules/ui/animation/presets';
import { AnimationLabels } from '@/modules/ui/animation/constants';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { FooterLinks } from '@/modules/layout/components/FooterLinks';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';
import { SealDetailsPane } from '@/modules/seal/components/SealDetailsPane';

type DetailsPaneProps = {
  intent: Intent;
};

// When using popLayout mode on AnimatePresence, any immediate child of AnimatePresence that's a custom component
// must be wrapped in `forwardRef`, forwarding the provided ref to the motion component that is being animated.
const MotionDetailsWrapper = forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>((props, ref) => (
  <motion.div
    ref={ref}
    variants={cardAnimations}
    initial={AnimationLabels.initial}
    animate={AnimationLabels.animate}
    exit={AnimationLabels.exit}
    {...props}
  />
));

export const DetailsPane = ({ intent }: DetailsPaneProps) => {
  const defaultDetail = Intent.BALANCES_INTENT;
  const [intentState, setIntentState] = useState<Intent>(intent || defaultDetail);
  const [keys, setKeys] = useState([0, 1, 2, 3, 4]);
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { bpi } = useBreakpointIndex();

  useEffect(() => {
    setIntentState(prevIntentState => {
      if (prevIntentState !== intent) {
        // By giving the keys a new value, we force the motion component to animate the new component in, even if it's
        // the same component as before. This prevents the component from being re-added before being removed
        setKeys(prevKeys => prevKeys.map(key => key + 5));
      }

      return intent || defaultDetail;
    });
  }, [intent]);

  return (
    // The remaining padding in the right is added by the scrollbar
    // `details-pane` class is used by the AppContainer component to make the container full width if the details pane is visible
    <motion.div
      className="scrollbar-thin details-pane flex w-full flex-col gap-4 bg-panel p-3 md:overflow-auto md:rounded-3xl md:p-6 md:pr-3.5 xl:p-8 xl:pr-[22px]"
      layout
      key="details-pane"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ layout: { duration: 0 }, opacity: { duration: 0.5, ease: easeOutExpo } }}
    >
      {!isConnectedAndAcceptedTerms && <ConnectCard intent={intent} />}
      <AnimatePresence mode="popLayout">
        {(() => {
          switch (intentState) {
            case Intent.TRADE_INTENT:
              return (
                <MotionDetailsWrapper key={keys[0]}>
                  <TradeDetails />
                </MotionDetailsWrapper>
              );
            case Intent.UPGRADE_INTENT:
              return (
                <MotionDetailsWrapper key={keys[1]}>
                  <UpgradeDetails />
                </MotionDetailsWrapper>
              );
            case Intent.REWARDS_INTENT:
              return (
                <MotionDetailsWrapper key={keys[2]}>
                  <RewardsDetailsPane />
                </MotionDetailsWrapper>
              );
            case Intent.SAVINGS_INTENT:
              return (
                <MotionDetailsWrapper key={keys[3]}>
                  <SavingsDetails />
                </MotionDetailsWrapper>
              );
            case Intent.SEAL_INTENT:
              return (
                <MotionDetailsWrapper key={keys[3]}>
                  <SealDetailsPane />
                </MotionDetailsWrapper>
              );
            case Intent.BALANCES_INTENT:
            default:
              return (
                <MotionDetailsWrapper key={keys[4]}>
                  <BalancesDetails />
                </MotionDetailsWrapper>
              );
          }
        })()}
      </AnimatePresence>
      {bpi < BP.md && <FooterLinks />}
    </motion.div>
  );
};
