'use client';

import { HeroUIProvider } from '@heroui/react';

function Provider({ children }: { children: React.ReactNode }) {
  // 2. Wrap HeroUIProvider at the root of your app
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

export default Provider;