import { FC, Suspense } from 'react';
import * as Router from 'react-router-dom';
import { lazyImport } from "../../../utils/load_lazy"

const { NotFound } = lazyImport(() => import("../../../pages/NotFound"), 'NotFound');
const { Order } = lazyImport(() => import("../../../pages/Order"), 'Order');
const { OrderComplete } = lazyImport(() => import("../../../pages/OrderComplete"), 'OrderComplete');
const { ProductDetail } = lazyImport(() => import("../../../pages/ProductDetail"), 'ProductDetail');
const { Top } = lazyImport(() => import("../../../pages/Top"), 'Top');

import { useScrollToTop } from './hooks';

export const Routes: FC = () => {
  useScrollToTop();

  return (
    <Suspense fallback={<>Loading...</>}>
      <Router.Routes>
        <Router.Route element={<Top />} path="/" />
        <Router.Route element={<ProductDetail />} path="/product/:productId" />
        <Router.Route element={<Order />} path="/order" />
        <Router.Route element={<OrderComplete />} path="/order/complete" />
        <Router.Route element={<NotFound />} path="*" />
      </Router.Routes>
    </Suspense>
  );
};
