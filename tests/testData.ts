import { SideBarMenuSectionData } from './../store/data/SideBarMenus';

export const testSideBarMenuSectionDataArr: SideBarMenuSectionData[] = [
  {
    data: [
      {
        nameArr: ['testMenu1'],
        text: 'testMenu1',
        icon: 'Home',
        isSelected: true,
      },
      {
        nameArr: ['testMenu2'],
        text: 'testMenu2',
        icon: 'Home',
        isSelected: false,
      },
    ],
  },
  {
    title: 'various test title',
    data: [
      {
        nameArr: ['testMenu3', 'testMenu4'],
        text: 'testMenu3,testMenu4',
        icon: 'Guitar',
        isSelected: false,
      },
    ],
  },
];
