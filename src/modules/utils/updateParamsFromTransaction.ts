import { formatEther, fromHex } from 'viem';
import { Config, getTransactionReceipt } from '@wagmi/core';
import { SetURLSearchParams } from 'react-router-dom';
import { QueryParams } from '@/lib/constants';

export const updateParamsFromTransaction = async (
  hash: string,
  wagmiConfig: Config,
  setSearchParams: SetURLSearchParams
) => {
  const { logs } = await getTransactionReceipt(wagmiConfig, { hash: hash as `0x${string}` });

  const resultAmount = formatEther(fromHex(logs[0]?.data, 'bigint'));

  setSearchParams(searchParams => {
    searchParams.set(QueryParams.InputAmount, resultAmount);
    return searchParams;
  });
};
