import React from 'react';
import { Link } from 'react-router-dom';
import { HEADER_HEIGHT } from './constants';
import { defaultConfig } from '../../config/default-config';
import { CustomConnectButton } from './CustomConnectButton';
import { MockConnectButton } from './MockConnectButton';
// import { LanguageSelector } from '../../config/components/LanguageSelector';

const useMock = import.meta.env.VITE_USE_MOCK_WALLET === 'true';

export function Header(): React.ReactElement {
  return (
    <div
      className={`flex w-full items-center justify-center px-3 py-2 min-h-[${HEADER_HEIGHT}px] max-h-[${HEADER_HEIGHT}px] md:mb-2`}
    >
      <div className="flex w-full items-center justify-between px-5">
        <Link to="/?widget=wallet" title="Home page">
          <div className="min-w-[96px]">
            <img src={defaultConfig.logo} alt="logo" width={96} />
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <CustomConnectButton />
          {useMock ? <MockConnectButton /> : null}
          {/* <LanguageSelector /> */}
        </div>
      </div>
    </div>
  );
}
