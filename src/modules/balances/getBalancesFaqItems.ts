import { isBaseChainId } from '@jetstreamgg/utils';

export const getBalancesFaqItems = (chainId: number) => [
  ...mainnetFaqItems,
  ...(isBaseChainId(chainId) ? baseFaqItems : [])
];

const mainnetFaqItems = [
  {
    question: 'What is a crypto wallet, and how do I get one?',
    answer: `A crypto wallet is software that enables you to easily view a list of your digital funds, manage them and help safeguard them. Note that in the case of non-custodial wallets, your funds are only _visible_ in the wallet—not stored there. Your non-custodial wallet holds the private keys needed to sign crypto transactions, and gives you full control over these private keys, which are essential for accessing and managing your crypto. Unlike custodial wallets where a third party holds the private keys, non-custodial wallets allow users to be the sole custodian of their keys. This means that only the user has the ability to sign transactions, making it more secure and private; however, it also means that if a user loses their private key or recovery phrase, they may permanently lose access to their funds. All crypto funds are stored on a public blockchain and can be accessed via your private keys.

Non-custodial wallets can be software-based, like mobile apps, or hardware devices designed for enhanced security. There are several types of crypto wallets and no limit to the number of wallets you can own. Two popular software-based wallets are [Metamask](https://metamask.io/) and [Rainbow](https://rainbow.me/).

Sky Balances is not a crypto wallet, but rather a non-custodial tool that displays your Sky-related asset balances by receiving information from the non-custodial crypto wallet that you connect to Sky.money to access the Sky Protocol.`
  },
  {
    question: 'How do crypto wallets work?',
    answer: `Crypto wallets use a pair of cryptographic keys—one public, the other private. These are essential components of cryptography used in crypto wallets for security and managing digital funds. They work together as a key pair known as public-key cryptography.

A private key is a randomly generated string of letters and numbers which acts as a password or secret code. It is known only to the user and should be kept secure and confidential to ensure that only the user has access to and can control any associated funds. The private key is used to sign transactions. For example, when a user wants to send crypto or access their funds, they will use the private key to authorise the transaction.

A public key is derived from the private key using a mathematical algorithm. It is a string of characters that can be shared openly without compromising security. The public key is used to generate wallet addresses and to encrypt data. For example, when someone wants to send digital funds to a user, they will use the user's public key (or the associated wallet address).

Typically, when initialising a new non-custodial digital wallet, the wallet software generates a "seed phrase," which is a sequence of 12 or 24 seemingly random words used to generate the public and private keys associated with them. The seed phrase can be used to recover the public and private keys, and should therefore be stored somewhere safe and never shared with anyone.`
  },
  {
    question: 'How do I use a non-custodial digital wallet to make a transaction?',
    answer: `Once you've set up your non-custodial digital wallet and have your public and private keys, you can use it to manage (send and receive) your digital funds on the blockchain. Every time you transact, your wallet requires you to digitally sign the transaction with your private key. Signing when prompted demonstrates that you acknowledge your action.

Signing is a simple but critical part of the process, as your digital signature approves the transaction, ensuring that only you have control of your crypto. Some actions might require multiple wallet signatures to authorise the activity in question. For example, to complete a trade on the Sky Protocol, you would first need to confirm that you allow the app to access the token you want to trade in your wallet (one signature), and then authorise the actual trade (another signature).`
  },
  {
    question: 'What is a blockchain transaction fee?',
    answer:
      'Every time you engage in transactions with your digital funds (_e.g._, buy, sell, trade or transfer them) you will likely pay a transaction fee— called a gas fee—for using the blockchain network. That fee is not controlled, imposed, or received by Sky.money or the Sky Protocol; it is calculated based on current network demand and the amount of gas (_i.e._, units of compute resources) required to process your transaction. On the Ethereum blockchain, gas fees are paid in ETH, the native currency of the blockchain. So, be sure to have ETH in your wallet anytime you transact using the Sky Protocol.'
  },
  {
    question: 'What is USDS?',
    answer: `USDS is the stablecoin of the decentralised Sky Protocol. It can be used in several ways, including to participate in the Sky Savings Rate and get Sky Token Rewards without giving up control. It is the upgraded version of DAI, backed by a surplus of collateral and soft-pegged to the value of the U.S. dollar, meaning it is designed to maintain a value equal to or close to a dollar. USDS powers the permissionless, non-custodial Sky Protocol.

Unlike cryptocurrencies that can fluctuate widely in value, USDS is designed to maintain a soft peg to the U.S. dollar and to be a reliable store of value and medium of exchange. USDS is governed by a community of broad and diversified individuals and entities from around the world, who hold Sky governance tokens and support the Sky ecosystem by participating in a system of decentralised onchain voting. USDS powers the open Sky ecosystem.`
  },
  {
    question: 'How do I get USDS?',
    answer:
      'You can use Sky.money as a gateway to the Sky Protocol and to then access the permissionless liquidity pools, or similar onchain solutions, to trade USDC, USDT, ETH or SKY for USDS. You can also upgrade your DAI to USDS subject to any applicable gas fees—for using the Ethereum blockchain network, which powers the Sky Protocol. That fee is not controlled, imposed, or received by Sky.money or the Sky Protocol. You might be able to obtain USDS on various crypto exchanges that decide to make it available on their platforms.'
  },
  {
    question: 'How can I use USDS?',
    answer:
      'Like other decentralised stablecoins, USDS is freely transferable and can be used in connection with any software protocol or platform that supports it. Unlike other stablecoins, you can use USDS to access the Sky Savings Rate to accumulate additional USDS over time, and to get Sky Token Rewards without giving up control of your digital funds. With Sky Token Rewards, you can participate—if you choose to do so—in the governance of the Sky ecosystem.'
  },
  {
    question: 'What is SKY, and how can I get it and use it?',
    answer: `SKY is a native governance token of the decentralised Sky ecosystem and the upgraded version of Maker's legacy governance token, MKR. You can upgrade your MKR to SKY at the rate of 1:24,000 via the Sky Protocol.

You can trade SKY for USDS and, soon, use it to accumulate Activation Token Rewards and participate in Sky ecosystem governance through a system of decentralised onchain voting.`
  },
  {
    question: 'Are there risks involved with using the Sky Protocol?',
    answer: 'For details regarding potential risks, please see the User Risk Documentation.'
  }
];

const baseFaqItems = [
  {
    question: 'What is Base?',
    answer: `[Base](https://www.base.org/) is a Coinbase-developed Layer 2 (L2) network that provides easy access to some L1 networks, including Ethereum and Solana, and other L2s. 

SkyLink, Sky’s bridge system, enhances your ability to manage your digital assets efficiently by seamlessly connecting your Ethereum L1-based Sky Protocol tokens and features to the Base network. If you have shied away from the Ethereum blockchain due to the high price of gas, SkyLink introduces reduced fees and faster transaction speeds. 
`
  }
];
