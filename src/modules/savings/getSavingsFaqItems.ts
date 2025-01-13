import { isBaseChainId } from '@jetstreamgg/utils';

export const getSavingsFaqItems = (chainId: number) => [
  ...mainnetFaqItems,
  ...(isBaseChainId(chainId) ? baseFaqItems : [])
];

const mainnetFaqItems = [
  {
    question: 'What is the Sky Savings Rate, and how does it work?',
    answer: `The Sky Savings Rate (SSR) is an automated token-accumulation mechanism of the decentralised Sky Protocol that takes into account the effect of accumulated USDS compounded in real time. In other words, the USDS you supply to the Sky Savings Rate module enables you to receive sUSDS. The SSR is variable, determined not by market factors but by Sky ecosystem governance through a process of decentralised onchain voting.

When you supply USDS to the Sky Savings Rate module, you access the SSR and may receive sUSDS tokens in return. These sUSDS tokens serve as a digital record of your USDS interaction with the SSR module and any value accrued to your position.

The decentralised Sky Protocol dynamically adds USDS tokens to the pool every few seconds, in accordance with the Sky Savings Rate. As those tokens auto-accumulate in the pool over time, the value of the sUSDS you hold may gradually increase.

So, when you choose to redeem your sUSDS for USDS—which you can do anytime—the total USDS you will receive will equal the amount you originally supplied, plus any additional USDS accumulated. With the Sky Protocol, you're always in full control of your supplied funds, as this feature is non-custodial.`
  },
  {
    question: 'Does it cost anything to access the Sky Savings Rate?',
    answer: `Accessing the Sky Savings Rate via the Sky Protocol is free. However, any time you supply or withdraw assets to/from the Sky Savings Rate module, you will incur a transaction fee— called a gas fee—for using the Ethereum blockchain network. That fee is not controlled, imposed or received by Sky.money or the Sky Protocol.

SkyLink, Sky’s bridge system, enhances your ability to manage your digital assets efficiently by seamlessly connecting your Ethereum L1-based Sky Protocol tokens and features to the Base network. If you have shied away from the Ethereum blockchain due to the high price of gas, SkyLink introduces reduced fees and faster transaction speeds. 
`
  },
  {
    question: 'What is USDS?',
    answer:
      'USDS is the stablecoin of the decentralised Sky Protocol. It can be used in several ways, including to participate in the Sky Savings Rate and get Sky Token Rewards without giving up control. It is the upgraded version of DAI.'
  },
  {
    question: 'Can I withdraw my USDS from the Sky Savings Rate module anytime?',
    answer:
      'You can withdraw your original supply of USDS and any accumulated sUSDS from the Sky Savings Rate module anytime. While no withdrawal fee is imposed, you will pay a blockchain transaction fee— called a gas fee—for using the network. That fee is not controlled, imposed or received by Sky.money or the Sky Protocol.'
  },
  {
    question: 'What is sUSDS?',
    answer: `sUSDS is a savings token for eligible users. When you supply USDS to the Sky Savings Rate module, you access the Sky Savings Rate and may receive sUSDS tokens in return. These sUSDS tokens serve as a digital record of your USDS interaction with the SSR module and any value accrued to your position.

The decentralised Sky Protocol dynamically adds USDS tokens to the pool every few seconds, in accordance with the Sky Savings Rate. As those tokens auto-accumulate in the pool over time, the value of the sUSDS you hold may gradually increase.

So, when you choose to redeem your sUSDS for USDS—which you can do anytime—the total USDS you will receive will equal the amount you originally supplied, plus any rewards accumulated. With the Sky Protocol, you can savings without giving up control of your supplied funds.`
  },
  {
    question: 'Can I trade sUSDS on the open market?',
    answer:
      'Yes. Anyone holding sUSDS in their wallet can trade it on the Sky Protocol for select tokens, or in any other protocol that supports the trading of sUSDS.'
  },
  {
    question:
      'Why do I see activity in my Savings transaction history in the Sky.money app if I’ve never used the Savings widget?',
    answer:
      'When you trade sUSDS for another token (or vice versa), sUSDS is automatically supplied to (or withdrawn from) the Sky Savings Rate module. These transactions are recorded in your Savings transaction history as a “supply” or “withdrawal.” Your Savings balance will also update automatically to reflect the increase or decrease in the amount of sUSDS you hold.'
  }
];

const baseFaqItems = [
  {
    question: 'What is Base?',
    answer: `[Base](https://www.base.org/) is a Coinbase-developed Layer 2 (L2) network that provides easy access to some L1 networks, including Ethereum and Solana, and other L2s. 

SkyLink, Sky’s bridge system, enhances your ability to manage your digital assets efficiently by seamlessly connecting your Ethereum L1-based Sky Protocol tokens and features to the Base network. If you have shied away from the Ethereum blockchain due to the high price of gas, SkyLink introduces reduced fees and faster transaction speeds. 
`
  },
  {
    question:
      'Why is the USDS amount I supplied to the Sky Savings Rate module different from the converted sUSDS amount, and how is that conversion calculated?',
    answer: `The USDS you supply to the Sky Savings Rate module enables you to receive sUSDS tokens. The sUSDS tokens serve as a digital record of your USDS interaction with the module and any value accrued to your position. The decentralised Sky Protocol dynamically adds USDS tokens to the pool every few seconds, in accordance with the Sky Savings Rate. As those tokens auto-accumulate in the pool over time, the value of the sUSDS you hold may gradually increase. 

The conversion rate between USDS and sUSDS is determined programmatically by smart contracts, but the dollar value should match given that there are no fees involved. When redeeming sUSDS for USDS at a later point in time, one would expect an increase in net USDS tokens in accordance with the Sky Savings Rate multiplied by the duration.
`
  },
  {
    question: 'Which tokens can I supply to and withdraw from the Savings Rate Module on Base?',
    answer: `There is no native Sky Savings Rate module deployed to Base. On Base, both USDS and USDC are currently supported. This is made possible through a PSM deployed to the Base blockchain and [powered by Spark](https://docs.spark.fi/dev/savings/cross-chain-savings-rate-oracle). 

PSMs are smart contracts designed to maintain the stability of stablecoins and allow users to trade certain stablecoins directly with the Sky Protocol at a fixed rate and with relatively low fees. PSMs offer free and deeply liquid trades with zero slippage.
`
  },
  {
    question: 'Is the Savings widget experience on Base the same as on Ethereum Mainnet?',
    answer: `As an end-user of the Sky.money app, the experience of using the Savings widget on Base and Ethereum is very similar. However, given that no native Sky Savings Rate module is deployed to Base, when on Base you always interact with the PSM module for conversions to/from sUSDS.

SkyLink, Sky’s bridge system, enhances your ability to manage your digital assets efficiently by seamlessly connecting your Ethereum L1-based Sky Protocol tokens and features to the Base network. If you have shied away from the Ethereum blockchain due to the high price of gas, SkyLink introduces reduced fees and faster transaction speeds. 
`
  },
  {
    question: 'Is the Sky Savings Rate percentage the same on Ethereum Mainnet and Base?',
    answer:
      'Yes, the Sky Savings Rate percentage on Base tracks the rate on Ethereum mainnet. This is done programmatically in the PSM module deployed on Base.'
  }
];
