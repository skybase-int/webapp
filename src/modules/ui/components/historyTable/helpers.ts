import { sepolia } from 'viem/chains';

export const getCowExplorerLink = (chainId: number, orderId: string) =>
  `https://explorer.cow.fi/${chainId === sepolia.id ? 'sepolia/' : ''}orders/${orderId}`;
