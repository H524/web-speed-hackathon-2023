import { FC, Suspense } from 'react';
import { memo } from 'react';

import { lazyImport } from '../../../utils/load_lazy';

import type { ProductFragmentResponse } from '../../../graphql/fragments';

const { Icon } = lazyImport(() => import("../../foundation/OutlineButton"), 'Icon');
const { OutlineButton } = lazyImport(() => import("../../foundation/OutlineButton"), 'OutlineButton');
const { PrimaryAnchor } = lazyImport(() => import("../../foundation/PrimaryAnchor"), 'PrimaryAnchor');
const { PrimaryButton } = lazyImport(() => import("../../foundation/PrimaryButton"), 'PrimaryButton');

import * as styles from './ProductPurchaseSection.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
  amountInCart: number;
  isAuthUser: boolean;
  onUpdateCartItem: (productId: number, count: number) => void;
  onOpenSignInModal: () => void;
};

export const ProductPurchaseSection: FC<Props> = memo(
  ({ amountInCart, isAuthUser, onOpenSignInModal, onUpdateCartItem, product }) => {
    if (product === undefined) {
      return null;
    }

    if (!isAuthUser) {
      return (
        <div className={styles.container()}>
          <div className={styles.signInWrapper()}>
            <span className={styles.signIn()}>購入にはログインが必要です</span>
            <Suspense fallback={<>Loading...</>}>
              <PrimaryButton onClick={() => onOpenSignInModal()} size="sm">
                ログイン
              </PrimaryButton>              
            </Suspense>
          </div>
        </div>
      );
    }

    if (amountInCart === 0) {
      return (
        <div className={styles.container()}>
          <Suspense fallback={<>Loading...</>}>
            <PrimaryButton onClick={() => onUpdateCartItem(product.id, 1)} size="sm">
              カートに追加
            </PrimaryButton>
          </Suspense>
        </div>
      );
    }

    return (
      <div className={styles.container()}>
        <p className={styles.amount()}>
          <span className={styles.checkIcon()}>
            <Suspense fallback={<>Loading...</>}>
              <Icon color="#3BA175" height={18} type="FaCheckCircle" width={18} />
            </Suspense>
          </span>
          <span>{amountInCart}個 カートに追加済み</span>
        </p>
        <div className={styles.actionButtonList()}>
          <Suspense fallback={<>Loading...</>}>
            <PrimaryAnchor href="/order" size="base">
              購入手続きへ
            </PrimaryAnchor>
          </Suspense>
          <Suspense fallback={<>Loading...</>}>
            <OutlineButton onClick={() => onUpdateCartItem(product.id, amountInCart + 1)} size="lg">
              カートに追加
            </OutlineButton>
          </Suspense>
        </div>
      </div>
    );
  }
);

ProductPurchaseSection.displayName = 'ProductPurchaseSection';
