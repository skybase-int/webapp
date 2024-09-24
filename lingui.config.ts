import type { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-po';
import { locales } from './supportedLocales';

const config: LinguiConfig = {
  locales: locales,
  catalogs: [
    {
      path: 'src/locales/{locale}',
      include: ['src']
    }
  ],
  format: formatter({ lineNumbers: false }),
  compileNamespace: 'ts'
};

export default config;
