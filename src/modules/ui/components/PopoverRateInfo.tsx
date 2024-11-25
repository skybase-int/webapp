import { Popover, PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Close, Info } from '@/modules/icons';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';

const content = {
  str: {
    title: 'Sky Token Rewards (STR) Rate',
    description: (
      <Text className="leading-5 text-white/80" variant="small">
        The Sky Token Rewards (STR) rate is variable, and is determined by the following factors: the current
        issuance rate of the reward token in question, as set through the relevant onchain governance
        processes pertinent to the reward token in question (for example, SKY issuance rate is decided by the
        decentralised Maker/Sky ecosystem onchain governance), the current market price of the reward token in
        question, and the user’s proportional percentage of the total supply within the pool of funds accruing
        that particular reward. STR rate may be volatile. The rate provided here is an estimate of the
        relevant STR rate expressed in expected rate per annum, should be automatically updated every 5
        minutes and is powered by data provided by a third party (
        <ExternalLink
          href="https://blockanalitica.com/"
          className="hover:text-white hover:underline"
          showIcon={false}
        >
          BlockAnalitica
        </ExternalLink>
        ). This figure does not represent or guarantee future results.
      </Text>
    )
  },
  ssr: {
    title: 'Sky Savings Rate (SSR)',
    description: (
      <Text className="leading-5 text-white/80" variant="small">
        The Sky Savings Rate (SSR) is variable and determined by the decentralised Maker/Sky Ecosystem onchain
        governance and is configured on the Ethereum blockchain. Maker/Sky Ecosystem governance is able to
        adapt the SSR and other relevant parameters at any time at its discretion and without notice, based on
        market conditions, protocol surplus and other factors. The rate provided here is an estimate of the
        SSR expressed in expected compounded rate per annum, should be automatically updated every 5 minutes
        and is powered by data provided by a third party (
        <ExternalLink
          href="https://blockanalitica.com/"
          className="hover:text-white hover:underline"
          showIcon={false}
        >
          BlockAnalitica
        </ExternalLink>
        ). This figure does not represent or guarantee future results.
      </Text>
    )
  },
  sbr: {
    title: 'Borrow Rate',
    description: (
      <Text className="leading-5 text-white/80" variant="small">
        The borrow rate is a parameter determined by Sky ecosystem governance through a process of
        decentralised onchain voting. Borrow rate fees accumulate automatically per block and get added to the
        total debt.
      </Text>
    )
  }
};

export const PopoverRateInfo = ({ type }: { type: 'str' | 'ssr' | 'sbr' }) => {
  if (!(type in content)) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Info />
      </PopoverTrigger>
      <PopoverContent align="center" side="top" className="backdrop-blur-lg">
        <Heading variant="small" className="text-[16px] leading-6">
          {content[type].title}
        </Heading>
        <PopoverClose className="absolute right-4 top-4">
          <Close className="h-5 w-5 cursor-pointer" />
        </PopoverClose>
        <div className="scrollbar-thin mt-2 max-h-[calc(var(--radix-popover-content-available-height)-64px)] overflow-y-auto">
          {content[type].description}
        </div>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};
