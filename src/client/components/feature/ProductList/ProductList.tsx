import { FC, Suspense } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { lazyImport } from '../../../utils/load_lazy';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
const { ProductGridList } = lazyImport(() => import("../ProductGridList"), 'ProductGridList');
const { ProductListSlider } = lazyImport(() => import("../ProductListSlider"), 'ProductListSlider');

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <Suspense fallback={<>Loading...</>}>
              <ProductListSlider featureSection={featureSection} />;
            </Suspense>
          }
          case DeviceType.MOBILE: {
            return <Suspense fallback={<>Loading...</>}>
              <ProductGridList featureSection={featureSection} />;
            </Suspense>
          }
        }
      }}
    </GetDeviceType>
  );
});

ProductList.displayName = 'ProductList';
