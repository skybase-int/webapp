import { isBaseChainId } from '@jetstreamgg/utils';

export const getRewardsFaqItems = (chainId: number) => [
  ...mainnetFaqItems,
  ...(isBaseChainId(chainId) && baseFaqItems ? baseFaqItems : [])
];

const mainnetFaqItems = [
  {
    question: 'What are Sky Token Rewards, and how do they work?',
    answer: `When you supply USDS to the Sky Token Rewards module through the Sky Protocol, you receive Sky Token Rewards over time in the form of Sky governance tokens.

The USDS, as well as the rewards received, are supplied to a non-custodial smart contract that represents the USDS pool of funds. That means no intermediary has custody of your supplied funds.

Soon, you may be able to use SKY to access Activation Token Rewards and to participate in Sky ecosystem governance through a system of decentralised onchain voting.`
  },
  {
    question: 'How much USDS do I have to supply to accumulate Sky Token Rewards?',
    answer:
      'Eligible users can supply any amount of USDS to the Sky Token Rewards module to begin getting Sky Token Rewards. There is no minimum amount required. Eligible users can also withdraw your USDS anytime. With the Sky Protocol, you can receive rewards without giving up control of your supplied funds.'
  },
  {
    question: 'How is the Sky Token Rewards rate calculated?',
    answer: `The Sky Token Rewards rate is different for each type of token rewarded, and always fluctuates, determined by the following factors:

• The issuance rate of the token rewarded, which is determined by Sky ecosystem governance

• The market price of the token rewarded

• The user's proportional supply within the total pool of funds linked to the Sky Token Rewards module

Sky.money does not control the issuance, determination, or distribution of these rewards.`
  },
  {
    question: 'How much does it cost to participate in Sky Token Rewards?',
    answer:
      'There is no fee to participate in Sky Token Rewards; however, with each transaction, you may pay a gas fee for using the Ethereum blockchain network. That fee is not controlled, imposed or received by Sky.money or the Sky Protocol.'
  },
  {
    question: 'Where do I find my boosted Sky Token Rewards?',
    answer:
      'To claim your rewards, just click on the Claim button in the Rewards section of the app. You must claim all your Sky Token Rewards at once. It is not possible to claim partial rewards.',
    type: 'restricted'
  },
  {
    question: 'How do I claim my Sky Token Rewards?',
    answer:
      "If you participated in our Boosted Rewards promo campaign, you're accumulating double Sky Token Rewards, which you can claim one month after Sky launches. Look for your Boosted Rewards Counter here in the app in a few days. In the meantime, supply USDS into the Sky Token Rewards module to earn rewards you can claim right away.",
    type: 'restricted'
  }
];

// Rewards in Base is coming soon
const baseFaqItems: { question: string; answer: string; type?: 'restricted' | 'unrestricted' }[] = [];
