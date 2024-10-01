import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LinkedAction } from '@/modules/ui/hooks/useUserSuggestedActions';

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

/**
 * Sanitizes a URL to ensure it begins with 'https:'.
 * Some URLs are directly provided via environment variables.
 */
export function sanitizeUrl(url: string | undefined) {
  if (!url) return undefined;
  try {
    const parsedUrl = new URL(url);
    // Ensure that the url begins with 'https:'
    if (parsedUrl.protocol === 'https:') {
      return url;
    } else {
      // Validation failed; don't use the provided url
      return undefined;
    }
  } catch (error) {
    console.error('Error parsing url');
    return undefined;
  }
}
