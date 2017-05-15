// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_AM_NAME, LANG_AM_TRANS } from './lang-am';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
export  const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_AM_NAME]: LANG_AM_TRANS,
};
// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
