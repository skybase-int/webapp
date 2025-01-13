import { isBaseChainId } from '@jetstreamgg/utils';

export const getTradeFaqItems = (chainId: number) => [
  ...mainnetFaqItems,
  ...(isBaseChainId(chainId) ? baseFaqItems : [])
];

const mainnetFaqItems = [
  {
    question: 'What is a trade?',
    answer: `A trade is the direct exchange of one cryptocurrency token for another at current market prices. Sky Protocol users can trade eligible tokens via an API integration with the third-party decentralised exchange [CoW Protocol](https://cow.fi/). These trades occur through smart contracts on the blockchain without relying on centralised entities. The exact trade route is determined by CoW Protocol and is not influenced by Sky.money or the Sky Protocol.

Note that price slippage—a change in price between the time of the trade order and its execution on the blockchain—can occur due to market volatility. When you trade via the Sky Protocol, you can set your slippage tolerance level.`
  },
  {
    question: 'Why would I trade tokens?',
    answer: `The following statements are provided for informational purposes only and are not intended to be construed as financial advice or recommendations on trading strategies. Your use of the Sky Protocol is at your own risk. Please see our User Risk Documentation and Terms of Use for further information.

When you trade USDC, USDT, ETH or SKY for USDS via the Sky Protocol, you can use your USDS to access the Sky Savings Rate to get additional USDS over time, and to get Sky Token Rewards in the form of Sky governance tokens.

When you trade USDC, USDT, ETH and USDS for SKY, you'll soon be able to use SKY to accumulate Activation Token Rewards and to participate in Sky ecosystem governance through a system of decentralised onchain voting.`
  },
  {
    question: 'Is trading using Sky.money free?',
    answer:
      'Trading may involve a fee imposed by the third-party decentralised exchange (i.e., CoW Protocol) integrated with the Sky Protocol that is used to make the trade. In addition, you will likely pay a blockchain network transaction fee called a gas fee. This fee is calculated based on current Ethereum network demand and the amount of gas required to process your transaction. Neither fee is controlled, imposed or received by Sky.money or the Sky Protocol.'
  },
  {
    question: 'What are Sky Token Rewards?',
    answer: `When you supply USDS to the Sky Token Rewards (STRs) module, you may receive Sky Token Rewards over time in the form of Sky governance tokens. Eventually, eligible users may be able to opt for Sky Token Rewards in the form of Sky Star governance tokens. Stars are independent, decentralised projects within the larger Sky ecosystem. They are designed to enable focused, fast-moving innovation and expansion, and serve as gateways to the decentralised Sky Protocol.

Eligible users will soon be able to use SKY to access the Activation and Sealed Activation modules to accumulate Activation Token Rewards, and to participate in Sky ecosystem governance through a system of decentralised onchain voting.`
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
    question: 'Which Sky tokens can I trade on Base?',
    answer: `Currently, using the Sky.money app, you can trade between USDS, sUSDS and USDC on Base.

Subject to Sky ecosystem governance approval, Base (and other L2) users may soon be able to use SkyLink to access:
- Other Sky ecosystem tokens, including SKY
- Sky Token Rewards
- Rewards in the form of Sky Star tokens   
`
  },
  {
    question: 'How does trading on Base differ from trading on Ethereum?',
    answer: `Sky.money offers trading on Ethereum mainnet through an integration with [CoW Swap](https://swap.cow.fi/#/1/swap/WETH), a DEX (decentralised exchange) aggregator. On Base, trading is made possible through a PSM (Peg Stability Module) deployed to the Base blockchain and [powered by Spark](https://docs.spark.fi/dev/savings/spark-psm). The PSM offers free and deeply liquid trades with zero slippage, but only between a small set of tokens.

PSMs are special smart contracts designed to maintain the stability of stablecoins and allow users to trade certain stablecoins directly with the Sky Protocol at a fixed rate and with relatively low fees. 
`
  },
  {
    question:
      'Why do I see activity in my Trade transaction history in the Sky.money app if I’ve never used the Trade widget?',
    answer:
      'If you’ve supplied USDS or USDC to the Sky Savings Rate module, a trade to sUSDS was automatically triggered. Therefore, you see the trade in your Trade transaction history.'
  }
];
