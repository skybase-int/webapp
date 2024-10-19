import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LinkedAction } from '@/modules/ui/hooks/useUserSuggestedActions';
import { PROD_URL_SKY_SUBGRAPH_MAINNET, STAGING_URL_SKY_SUBGRAPH_MAINNET } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFooterLinks(): { url: string; name: string }[] {
  let footerLinks: { url: string; name: string }[] = [
    { url: '', name: '' },
    { url: '', name: '' },
    { url: '', name: '' }
  ];
  try {
    const footerLinksVar = import.meta.env.VITE_FOOTER_LINKS;
    if (footerLinksVar) footerLinks = JSON.parse(footerLinksVar);
  } catch (error) {
    console.error('Error parsing FOOTER_LINKS:', error);
  }
  return footerLinks;
}

export function filterActionsByIntent(actions: LinkedAction[], intent: string) {
  return actions.filter(x => x.intent === intent || (x as LinkedAction)?.la === intent);
}

export const getEnvSubgraphUrl = () => {
  if (import.meta.env.VITE_ENV_NAME === 'staging' || import.meta.env.VITE_ENV_NAME === 'development') {
    return STAGING_URL_SKY_SUBGRAPH_MAINNET;
  }
  return PROD_URL_SKY_SUBGRAPH_MAINNET;
};
