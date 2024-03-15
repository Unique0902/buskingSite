import React, { createContext, ReactNode, useContext, useState } from 'react';
import PopupWrapper from './PopupWrapper';

interface Props {
  children: ReactNode;
}

type PopUpMenuContextProps = {
  isShowMenu: boolean;
  setIsShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopUpMenuContext = createContext<PopUpMenuContextProps>(
  {} as PopUpMenuContextProps
);

const PopUpMenu = ({ children }: Props) => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  return (
    <PopUpMenuContext.Provider value={{ isShowMenu, setIsShowMenu }}>
      {children}
    </PopUpMenuContext.Provider>
  );
};

const OuterBtn = ({ children }: { children: ReactNode }) => {
  const { setIsShowMenu } = useContext(PopUpMenuContext);
  return <button onClick={() => setIsShowMenu(true)}>{children}</button>;
};

const Inner = ({
  children,
  isPopUpInnerLeft,
}: {
  children: ReactNode;
  isPopUpInnerLeft: boolean;
}) => {
  const { isShowMenu, setIsShowMenu } = useContext(PopUpMenuContext);
  if (isShowMenu) {
    return (
      <PopupWrapper
        handleClickOther={() => {
          setIsShowMenu(false);
        }}
        isLeft={isPopUpInnerLeft}
      >
        {children}
      </PopupWrapper>
    );
  }
  return <></>;
};
PopUpMenu.OuterBtn = OuterBtn;
PopUpMenu.Inner = Inner;

export default PopUpMenu;
