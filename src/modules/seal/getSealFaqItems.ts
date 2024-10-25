export const getSealFaqItems = () => [
  {
    question: 'What are Seal Rewards?',
    answer: `Seal Rewards are accessed when you supply MKR to the Seal Engine of the decentralised Sky Protocol. Currently, all Seal Rewards take the form of USDS. Eventually, subject to Sky ecosystem governance approval, Seal Rewards may also be available in the form of Sky Star tokens, including SPK, the governance token of the Spark decentralised community. Choose the reward you’d like to receive!

Your supplied MKR tokens, as well as any rewards accumulated, automatically enter a non-custodial smart contract, which allows you to always remain in control of your supplied assets.

Seal reward rates are determined by Sky ecosystem governance.
`
  },
  {
    question: 'How are Seal Rewards rates determined?',
    answer:
      'Seal reward rates are determined by Sky ecosystem governance through a process of decentralised onchain voting.'
  },
  {
    question: 'How does the Seal Engine enable borrowing?',
    answer: `Sealing MKR into the Seal Engine enables you to access Seal Rewards by creating a position through which you generate and borrow USDS against those tokens. You can seal and unseal your collateral anytime, and draw or pay back additional USDS whenever you’d like. This means you are always able to actively manage your position.
    
The debt ceiling and borrow rate are determined by Sky ecosystem governance through a process of decentralised, community-driven onchain voting. Borrow rate fees accumulate automatically per block and get added to the total debt.

Opening a USDS borrow position is subject to liquidation risk in the following scenario: If at any time the value of your sealed collateral drops below the required threshold and your position becomes undercollateralised, the smart contract automatically liquidates it and auctions your collateral. Any leftover collateral can be claimed through the [Unified Auctions portal](https://unified-auctions.makerdao.com/). `
  },
  {
    question: 'How is the borrow rate determined?',
    answer:
      'The debt ceiling and borrow rate are parameters determined by Sky ecosystem governance through a process of decentralised onchain voting. Borrow rate fees accumulate automatically per block and get added to the total debt. '
  },
  {
    question: 'What happens if my borrow position is liquidated?',
    answer:
      'Opening a USDS borrow position is subject to liquidation risk in the following scenario: If at any time the value of your sealed collateral drops below the required threshold and your position becomes undercollateralised, the smart contract automatically liquidates it and auctions your collateral. Any leftover collateral can be claimed through the [Unified Auctions portal](https://unified-auctions.makerdao.com/). '
  },
  {
    question: 'What’s the difference between Sky Token Rewards and Seal Rewards?',
    answer: `Sky Tokens Rewards are what you access when you supply USDS to the Sky Token Rewards module of the decentralised Sky Protocol. Sky Token Rewards are in the form of SKY governance tokens. 
      
Seal Rewards are what you access when you supply and seal MKR to the Seal Engine of the Protocol. Seal Rewards are currently in the form of USDS. Eventually, upon approval by Sky ecosystem governance, Seal Rewards will also be available in the form of  Sky Star tokens.`
  },
  {
    question: 'How does unsealing work?',
    answer: `When you supply MKR to the Seal Engine, a position is created and those tokens are sealed behind an exit fee. You can seal and unseal your tokens anytime. 
      
Unsealing requires payment of an exit fee—a percentage of the total amount of tokens you’ve sealed in that position. The fee is automatically subtracted from that total amount, and then burnt, removing the tokens from circulation. Your accumulated rewards are not affected.  
      
The exit fee is a risk parameter managed and determined (regardless of position duration) by Sky ecosystem governance. The moment the Seal Engine launched, the exit fee rate was set to 5%, with a 1% increase every 6 months thereafter until it reaches the long-term fee rate of 15%.`
  },
  {
    question: 'What does it mean to delegate my voting power?',
    answer: `When you hold MKR—sealed or not, you also hold the right to participate in Sky ecosystem governance voting. That means you have the ability to contribute to the decentralised ecosystem decision-making process through onchain voting.
      
The delegation of voting power through the Seal Engine of the Sky Protocol enables you to entrust your voting power to a delegate, who can then vote in the Sky ecosystem governance process on your behalf. You can choose one delegate per sealed MKR position. If you want to entrust your MKR to two delegates using the Seal Engine, you will need to create two separate positions. 
      
Delegates in receipt of voting power can never directly access any tokens delegated to them, including sealed tokens. You always own and are in control of your sealed tokens, and you can change your delegate anytime.Sealing to delegate your voting power is an option for governance token holders who don’t have much time to allocate to the process, who want to save on the cost of gas involved in voting on their own, and who want to earn Seal Rewards.`
  },
  {
    question: 'Where can I learn about Sky ecosystem governance?',
    answer:
      'For a deep dive into the facets and checks and balances of Sky ecosystem governance, please refer to the [Sky Forum](https://forum.sky.money/), the [Sky Voting Portal](https://vote.makerdao.com/) and the [Sky Atlas](https://mips.makerdao.com/mips/details/MIP101)—the source of truth behind the Sky project, superseding and overriding all other competing rules or decisions.'
  }
];
