import { Locator } from '@playwright/test';

export const nthParentContainer = async (locator: Locator, nth: number) => {
  return locator.locator(`xpath=ancestor::div[${nth}]`);
};
