import { iconName } from '../../assets/icon/constants';

export type SideBarMenuData = {
  name: string;
  text: string;
  icon: iconName;
  isSelected: boolean;
};
export type SideBarMenuSectionData = {
  title?: string;
  data: SideBarMenuData[];
};

export const sideBarMenuSectionDataArr: SideBarMenuSectionData[] = [
  { data: [{ name: 'home', text: 'Home', icon: 'Home', isSelected: true }] },
  {
    title: '기능 카테고리',
    data: [
      { name: 'add', text: '노래 추가', icon: 'Plus', isSelected: false },
      {
        name: 'playlist',
        text: 'Playlist 관리',
        icon: 'Song',
        isSelected: false,
      },
      { name: 'inform', text: '내 정보', icon: 'User', isSelected: false },
      {
        name: 'makebusking',
        text: '버스킹하기',
        icon: 'Guitar',
        isSelected: false,
      },
    ],
  },
];
