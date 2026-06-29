'use client';

import { useLang } from './LanguageProvider';

/** Translated text leaf, usable inside server components. */
export default function T({ k }: { k: string }) {
  const { t } = useLang();
  return <>{t(k)}</>;
}
