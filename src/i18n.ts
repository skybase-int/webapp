import { i18n } from '@lingui/core';
// import { defaultConfig } from './modules/config/default-config';

/**
 * Dynamically imports and activates the required language catalog based on the provided locale.
 * This function tries to load the catalog in the following order until it succeeds:
 * 1. The exact locale provided.
 * 2. The base locale (language code without the country code, e.g., 'en' for 'en-US').
 * 3. The default locale specified in the application's configuration.
 * 4. English ('en'), used as a last resort if the above steps fail.
 *
 * This function is designed to fall back to English if the user's locale isn't supported, or if the default locale isn't specified in the configuration.
 *
 * @param locale A string representing the desired locale (e.g., 'en-US', 'fr-CA').
 */
export async function dynamicActivate(/* locale: string */) {
  // const baseLocale = locale.split('-').shift();

  // const messages =
  //   (await loadLocale(locale)) ||
  //   (await loadLocale(baseLocale)) ||
  //   (await loadLocale(defaultConfig.locale)) ||
  //   (await loadLocale('en'));

  // i18n.load(locale, messages);
  // i18n.activate(locale);

  const messages = await loadLocale('en'); // Always load the English locale

  i18n.load('en', messages);
  i18n.activate('en');
}

/**
 * Helper function to load a given locale.
 * Returns messages if the locale file exists, otherwise null.
 * @param locale
 */
async function loadLocale(locale?: string) {
  try {
    const { messages } = await import(`./locales/${locale}.ts`);
    console.log(`Locale file for ${locale} loaded in phase one app.`);
    return messages;
  } catch (error) {
    console.log(`Locale file for ${locale} not found in phase one app.`);
    return null;
  }
}
