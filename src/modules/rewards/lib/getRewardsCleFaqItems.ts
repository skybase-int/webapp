export interface Item {
  question: string;
  answer: string;
  type?: 'restricted' | 'unrestricted';
}
export const getRewardsCleFaqItems = (): Item[] => [
  {
    question: 'What is Chronicle?',
    answer:
      'Chronicle is the original oracle on Ethereum built within MakerDAO for the creation of DAI. Today, [Chronicle’s decentralised oracle network](https://docs.chroniclelabs.org/Intro/network) secures Sky, Spark, and many other DeFi and RWA protocols.'
  },
  {
    question: 'What are Chronicle Points, and how do they work?',
    answer:
      'Use the Sky.money app to access [Chronicle Points](https://www.youtube.com/watch?v=CYsC7Nrm2Vs), which might later be claimable for Chronicle tokens at a rate of 10 points = 1 CLE token. The total supply of CLE tokens will be 10 billion. Chronicle Points are being emitted at a rate of 3.75 billion per year. Any future opportunities to convert Chronicle Points into CLE tokens, if offered, would be managed independently by Chronicle’s own applications.'
  },
  {
    question:
      'Is there a minimum requirement of USDS I need to supply to the Sky Protocol to start collecting Chronicle Points?',
    answer: 'No minimum supply of USDS is required.'
  },
  {
    question: 'Where can I see the current total distribution of Chronicle Points?',
    answer:
      'Users can see the current distribution of Chronicle Points on the [Sky Ecosystem dashboard](https://info.sky.money/rewards/0x10ab606b067c9c461d8893c47c7512472e19e2ce/).'
  }
];
