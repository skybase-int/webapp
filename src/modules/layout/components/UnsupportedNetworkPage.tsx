import { Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/macro';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { UnsupportedNetwork } from '@/modules/icons/UnsupportedNetwork';
import { useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '@/lib/constants';

export const UnsupportedNetworkPage = ({ children }: { children: React.ReactNode }) => {
  const { chains, switchChain } = useSwitchChain();
  const [, setSearchParams] = useSearchParams();

  const handleSwitchChain = (chainId: number, name: string) => {
    setSearchParams(params => {
      params.set(QueryParams.Network, name.toLowerCase());
      return params;
    });
    switchChain({ chainId });
  };

  return (
    <>
      <Dialog open={true} modal={true}>
        <DialogContent
          className="max-w-[640px] bg-containerDark p-10"
          onOpenAutoFocus={e => e.preventDefault()} //don't automatically focus the first button
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <UnsupportedNetwork className="flex-shrink-0" />
            <div>
              <Text className="mb-2 text-[28px] text-text md:-mt-2 md:text-[32px]">
                <Trans>Your wallet is connected to an unsupported network</Trans>
              </Text>
              <Text className="mb-10 font-graphik text-text">
                <Trans>
                  Only Ethereum Mainnet and Base are supported at this time.
                  <br />
                  Please switch networks to continue.
                </Trans>
              </Text>
              <div className="flex flex-wrap gap-2">
                {/* This will display buttons for all supported networks for the current Wagmi config.
                 * For production this would only use Mainnet and Base */}
                {chains.map(({ name, id }) => (
                  <Button
                    variant="connect"
                    className="border-transparent bg-primary hover:border-transparent focus:border-transparent"
                    key={id}
                    onClick={() => handleSwitchChain(id, name)}
                  >
                    Switch to {name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
};
