import React, { useState } from 'react';
import { Layout } from '../modules/layout/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { parseEther, toHex } from 'viem';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { VStack } from '@/modules/layout/components/VStack';

const rpcUrl = import.meta.env.VITE_RPC_PROVIDER_TENDERLY || '';

// Custom hook to interact with the custom EVM method
function useCustomEVM() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendEthRpc = async (method: string, tokenAddress: string, hexAmount: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          method,
          params: [[tokenAddress], hexAmount],
          id: 42,
          jsonrpc: '2.0'
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendErc20Rpc = async (
    method: string,
    tokenAddress: string,
    walletAddress: string,
    hexAmount: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          method,
          params: [tokenAddress, [walletAddress], hexAmount],
          id: 42,
          jsonrpc: '2.0'
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEthRpc, sendErc20Rpc, response, error, isLoading };
}

//ETH Faucet
function EthFaucet(): React.ReactElement {
  const { sendEthRpc } = useCustomEVM();
  const [amount, setAmount] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');

  const handleSubmit = async () => {
    const hexAmount = toHex(parseEther(amount));

    try {
      await sendEthRpc('tenderly_addBalance', userAddress, hexAmount);
      setAmount('');
      setUserAddress('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <Card className="w-1/2">
      <VStack className="space-y-4 text-black">
        <Heading>ETH Faucet</Heading>
        <Text>This adds to your ETH balance</Text>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter the amount"
        />
        <input
          type="text"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
          placeholder="Enter the user address"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Card>
  );
}

// ERC-20 Faucet
function Erc20Faucet(): React.ReactElement {
  const { sendErc20Rpc } = useCustomEVM();
  const [amount, setAmount] = React.useState('');
  const [tokenAddress, setTokenAddress] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');

  const handleSubmit = async () => {
    const hexAmount = toHex(parseEther(amount));

    try {
      await sendErc20Rpc('tenderly_setErc20Balance', tokenAddress, userAddress, hexAmount);
      setAmount('');
      setTokenAddress('');
      setUserAddress('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Card className="w-1/2">
      <VStack className="space-y-4 text-black">
        <Heading>ERC-20 Token Faucet</Heading>
        <Text>This SETS your token balance</Text>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter the amount"
        />
        <input
          type="text"
          value={tokenAddress}
          onChange={e => setTokenAddress(e.target.value)}
          placeholder="Enter the token address"
        />
        <input
          type="text"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
          placeholder="Enter the user address"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Card>
  );
}

function Dev(): React.ReactElement {
  return (
    <Layout>
      <VStack className="w-full space-y-4">
        <EthFaucet />
        <Erc20Faucet />
      </VStack>
    </Layout>
  );
}

export default Dev;
