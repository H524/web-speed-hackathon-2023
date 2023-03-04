import { FC, ReactNode, Suspense } from 'react';
import { lazyImport } from '../../../utils/load_lazy';

const { Footer } = lazyImport(() => import("../../navigators/Footer/Footer"), 'Footer');
const { Header } = lazyImport(() => import("../../navigators/Header/Header"), 'Header');

import * as styles from './Layout.styles';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
  <>
    <Suspense fallback={<>Loading...</>}>
      <Header />
      <main className={styles.container()}>{children}</main>
      <Footer />
    </Suspense>
  </>
);
