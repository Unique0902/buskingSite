import React, { ReactElement } from 'react';
import AppLayOut from '../components/Layout/AppLayOut';
import { NextPageWithLayout } from '../pages/_app';

const getAppLayOut = (element: NextPageWithLayout) => {
  element.getLayout = function getLayout(page: ReactElement) {
    return <AppLayOut>{page}</AppLayOut>;
  };
};

export { getAppLayOut };
