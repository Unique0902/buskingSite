import { useCallback, useEffect, useState } from 'react';
import { SideBarMenuSectionData } from '../store/data/SideBarMenus';
import { produce } from 'immer';

export const useSideBarMenu = (
  sideBarMenuSectionDataArr: SideBarMenuSectionData[],
  routerPathName: string
) => {
  const [sideBarMenuSectionArr, setSideBarMenuSectionArr] = useState(
    sideBarMenuSectionDataArr
  );

  const checkSelectedBtn = useCallback(
    (path: string) => {
      setSideBarMenuSectionArr(
        produce((prevArr) => {
          const prevSelectedData =
            prevArr[0].data.find((menuData) => menuData.isSelected) ||
            prevArr[1].data.find((menuData) => menuData.isSelected);
          prevSelectedData && (prevSelectedData.isSelected = false);
          const data =
            prevArr[0].data.find(
              (menuData) =>
                !!menuData.nameArr.find((dataName) => dataName === path)
            ) ||
            prevArr[1].data.find(
              (menuData) =>
                !!menuData.nameArr.find((dataName) => dataName === path)
            );
          data && (data.isSelected = true);
        })
      );
    },
    [routerPathName]
  );

  useEffect(() => {
    checkSelectedBtn(routerPathName.split('/')[2]);
  }, [routerPathName, checkSelectedBtn]);

  return { sideBarMenuSectionArr };
};
