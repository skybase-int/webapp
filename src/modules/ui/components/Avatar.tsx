import { AvatarComponent } from '@rainbow-me/rainbowkit';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

export const CustomAvatar: AvatarComponent = ({ address, size }: { address: string; size: number }) => {
  return address ? <Jazzicon diameter={size} seed={jsNumberForAddress(address)} /> : null;
};
