import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
  hoverWaitSecond?: number;
}

type HoverBoxContextProps = {
  isShowElement: boolean;
};

const HoverBoxContext = createContext<HoverBoxContextProps>(
  {} as HoverBoxContextProps
);

const HoverBox = ({ children, hoverWaitSecond = 0.2 }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isShowElement, setIsShowElement] = useState<boolean>(false);
  useEffect(() => {
    !isHovering && setIsShowElement(false);
    const timer = isHovering
      ? setTimeout(() => setIsShowElement(true), hoverWaitSecond * 1000)
      : undefined;
    return () => clearTimeout(timer);
  }, [isHovering]); // hovered가 변할 때만 작동하도록
  return (
    <HoverBoxContext.Provider value={{ isShowElement }}>
      <div
        className='relative'
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        {children}
      </div>
    </HoverBoxContext.Provider>
  );
};

const OutElement = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const InnerElement = ({ children }: { children: ReactNode }) => {
  const { isShowElement } = useContext(HoverBoxContext);
  return isShowElement ? <>{children}</> : <></>;
};

HoverBox.OutElement = OutElement;
HoverBox.InnerElement = InnerElement;

export default HoverBox;
