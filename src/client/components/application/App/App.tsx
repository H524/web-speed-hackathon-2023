import { FC, Suspense } from 'react';
import { lazyImport } from '../../../utils/load_lazy';

const { SignInModal } = lazyImport(() => import("../../modal/SignInModal"), 'SignInModal');
const { SignUpModal } = lazyImport(() => import("../../modal/SignUpModal"), 'SignUpModal');
import { Providers } from '../Providers';
import { Routes } from '../Routes';

export const App: FC = () => (
  <Suspense fallback={<>Loading...</>}>
    <Providers>
      <Routes />
      <SignInModal />
      <SignUpModal />
    </Providers>
  </Suspense>
);
