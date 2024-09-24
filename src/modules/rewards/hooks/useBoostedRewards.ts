import { URL_BA_LABS_API } from '@/lib/constants';
import { usdsSkyRewardAddress, ZERO_ADDRESS } from '@jetstreamgg/hooks';
import { useQuery } from '@tanstack/react-query';
import { parseUnits } from 'viem';
import { useChainId } from 'wagmi';

type BoostedRewardsApiResponse = {
  wallet_address: string;
  balance: string;
  reward_balance: string;
  reward_tokens_per_second: string;
  reward_boosted_balance?: string;
};

type BoostedRewardsResponse = {
  address: string;
  qualified: boolean;
  rewards: bigint;
};

type UseBoostedRewardsArgs = {
  address?: `0x${string}`;
};

const fetchBoostedRewards = async (
  address: string,
  url: URL
): Promise<BoostedRewardsResponse | undefined> => {
  // TODO replace with actual API endpoint when available
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error while fetching boosted rewards eligibility');
  }

  const data: BoostedRewardsApiResponse = await response.json();

  if (!data) return;

  return {
    address: data.wallet_address,
    qualified: parseFloat(data.reward_boosted_balance || '0') > 0,
    rewards: parseUnits(data.reward_boosted_balance || '0', 18)
  };
};

export const useBoostedRewards = ({ address }: UseBoostedRewardsArgs) => {
  const chainId = useChainId();

  const baseUrl = URL_BA_LABS_API;
  let url: URL | undefined;
  const contractAddress = usdsSkyRewardAddress[chainId as keyof typeof usdsSkyRewardAddress] || ZERO_ADDRESS;

  if (address) {
    const endpoint = `${baseUrl}/farms/${contractAddress.toLowerCase()}/wallets/${address.toLowerCase()}`;
    url = new URL(endpoint);
    url.searchParams.append('format', 'json');
  }

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery<BoostedRewardsResponse | undefined, Error>({
    queryKey: ['boosted-rewards', address, url],
    queryFn: () => fetchBoostedRewards(address!, url!),
    enabled: !!address && !!url
  });

  return { data, isLoading, error, mutate };
};
