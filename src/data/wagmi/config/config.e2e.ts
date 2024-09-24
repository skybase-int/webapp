import { http } from 'viem';
import { createConfig } from 'wagmi';
import { getTestTenderlyChain } from './testTenderlyChain';
import { mock } from 'wagmi/connectors';

const tenderlyTestChain = getTestTenderlyChain();

//this address is able to send transactions on the tenderly vnet via the wagmi mock
const TEST_WALLET_ADDRESS = '0x869E31890A3E8849f8a3cec14d9BB19b97e5bC9C';

export const mockWagmiConfig = createConfig({
  chains: [tenderlyTestChain],
  connectors: [
    mock({
      accounts: [TEST_WALLET_ADDRESS],
      features: {
        reconnect: true
      }
    })
  ],
  transports: {
    [tenderlyTestChain.id]: http()
  }
});
