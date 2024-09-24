import { useContext } from 'react';
import { Globe } from '../../icons';
import { Trans } from '@lingui/macro';
import { supportedLocales } from '../../../../supportedLocales';
import { ConfigContext } from '../context/ConfigContext';
import { useLingui } from '@lingui/react';
import { QueryParams } from '@/lib/constants';
import { VStack } from '@/modules/layout/components/VStack';
import { Text } from '@/modules/layout/components/Typography';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function LanguageSelector() {
  const { userConfig, updateUserConfig } = useContext(ConfigContext);
  const { i18n } = useLingui();

  const selectedLocale = userConfig.locale ? userConfig.locale : i18n.locale.split('-').shift();

  const handleLocaleChange = (locale: string) => {
    updateUserConfig({
      ...userConfig,
      locale
    });
    // Add the locale as a URL parameter and reload the page
    // We need to reload the page so the t`` and msg`` macros are updated to the new locale
    const url = new URL(window.location.href);
    url.searchParams.set(QueryParams.Locale, locale);
    setTimeout(() => {
      window.location.href = url.toString();
    }, 0); //Make sure updateUserConfig completes before reloading
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="language-selector" className="bg-transparent hover:bg-transparent">
          <Globe boxSize={24} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            <Trans>Choose language</Trans>
          </DialogTitle>
        </DialogHeader>
        <VStack gap={2} className="items-stretch">
          {supportedLocales.map(locale => (
            <div
              key={locale.value}
              className={`cursor-pointer rounded-3xl px-4 py-3 ${
                locale.value === selectedLocale ? 'bg-background' : ''
              } hover:bg-background`}
              onClick={() => handleLocaleChange(locale.value)}
            >
              <Text className={locale.value === selectedLocale ? 'font-bold' : 'font-normal'}>
                {locale.name}
              </Text>
            </div>
          ))}
        </VStack>
      </DialogContent>
    </Dialog>
  );
}
