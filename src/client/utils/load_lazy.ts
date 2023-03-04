import React, { ComponentType } from "react";

export function lazyImport<
  T extends { [P in U]: ComponentType },
  U extends string,
>(factory: () => Promise<T>, name: U): T {
  return Object.create({
    [name]: React.lazy(
      () => factory()
        .then((module) => ({ default: module[name] }))
        .catch()
    ),
  });
}

// 参考URL
// https://qiita.com/KokiSakano/items/b6d4e6875443064032b4
// https://github.com/facebook/react/issues/14603#issuecomment-726551598