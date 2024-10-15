import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { DetailSection } from '@/modules/ui/components/DetailSection';
import { formatBigInt } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';
import { HStack } from '@/modules/layout/components/HStack';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { Text } from '@/modules/layout/components/Typography';
import { AboutSealModule } from '@/modules/ui/components/AboutSealModule';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { SealHistory } from './SealHistory';
import { SealRewardsOverview } from './SealRewardsOverview';
import { SealFaq } from './SealFaq';

export function SealOverview() {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();

  // TODO get actual numbers from API
  const mkrSealed = formatBigInt(243235000000000000000000n);
  const usdsDebt = formatBigInt(20306070000000000000000000n);
  return (
    <DetailSectionWrapper>
      <DetailSection title={t`Seal Overview`}>
        <DetailSectionRow>
          <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
            <StatsCard
              title={t`Total MKR sealed`}
              content={
                <TokenIconWithBalance
                  className="mt-2"
                  token={{ name: 'MKR', symbol: 'MKR' }}
                  balance={mkrSealed}
                />
              }
              isLoading={false}
              error={null}
            />
            <StatsCard
              title={t`Total USDS borrowed`}
              isLoading={false}
              error={null}
              content={
                <TokenIconWithBalance
                  className="mt-2"
                  token={{ name: 'USDS', symbol: 'USDS' }}
                  balance={usdsDebt}
                />
              }
            />
          </HStack>
        </DetailSectionRow>
        <DetailSectionRow>
          <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
            <StatsCard
              title={t`Borrow Rate`}
              isLoading={false}
              error={null}
              content={<Text className="mt-2">3.7%</Text>}
            />
            <StatsCard
              title={t`TVL`}
              isLoading={false}
              error={null}
              content={<Text className="mt-2">270.4M</Text>}
            />
            <StatsCard
              title={t`Seal Positions`}
              isLoading={false}
              error={null}
              content={<Text className="mt-2">37</Text>}
            />
          </HStack>
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your Seal transaction history`}>
          <DetailSectionRow>
            <SealHistory />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`About Seal module`}>
        <DetailSectionRow>
          <AboutSealModule />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`Rewards overview`}>
        <DetailSectionRow>
          <SealRewardsOverview />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <SealFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
