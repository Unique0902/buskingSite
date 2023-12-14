import React, { createContext, ReactNode, useContext, useState } from 'react';

import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { color } from '../../styles/theme';
import SlicedHoverText from '../Hover/SlicedHoverText';
import SmallPopupWrapper from '../PopUp/SmallPopupWrapper';
type Props = {
  children: ReactNode;
};
type SongResultRowContextProps = {
  showHiddenSection: boolean;
  setShowHiddenSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const SongResultRowContext = createContext<SongResultRowContextProps>(
  {} as SongResultRowContextProps
);
const SongResultRow = ({ children }: Props) => {
  const [showHiddenSection, setShowHiddenSection] = useState<boolean>(false);
  return (
    <SongResultRowContext.Provider
      value={{ showHiddenSection, setShowHiddenSection }}
    >
      <li className='relative flex flex-row items-center justify-between w-full gap-2 px-2 py-2 mb-1 text-base font-light text-center text-white rounded-xl'>
        {children}
      </li>
    </SongResultRowContext.Provider>
  );
};

const HiddenSection = ({ children }: { children: ReactNode }) => {
  const { showHiddenSection } = useContext(SongResultRowContext);
  if (!showHiddenSection) {
    return <></>;
  }
  return (
    <section className='absolute top-0 left-0 z-20 flex flex-row items-center justify-between w-full h-full bg-gray-800'>
      {children}
    </section>
  );
};

const Text = ({ text }: { text: string }) => {
  return <p className='basis-1/12'>{text}</p>;
};

const Inform = ({ title, artist }: { title: string; artist: string }) => {
  return (
    <div className='text-left basis-5/6'>
      <SlicedHoverText text={title} />
      <SlicedHoverText text={artist} />
    </div>
  );
};

type EditData = {
  title: string;
  artist: string;
};
const EditForm = ({
  title,
  artist,
  onEdit,
}: {
  title: string;
  artist: string;
  onEdit: (data: EditData) => void;
}) => {
  const { setShowHiddenSection } = useContext(SongResultRowContext);
  const [editData, setEditData] = useState({ title, artist });
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      title: e.target.value,
    });
  };
  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      artist: e.target.value,
    });
  };
  const handleCancelButton = () => {
    setShowHiddenSection(false);
  };
  const handleEdit = () => {
    if (!editData.title || !editData.artist) {
      alert('공백은 허용되지 않습니다!');
      return;
    }
    onEdit(editData);
    setShowHiddenSection(false);
  };
  return (
    <form className='flex flex-row items-center justify-around w-full'>
      <input
        type='text'
        className='p-2 text-sm text-black border border-black'
        placeholder='제목'
        value={editData.title}
        onChange={handleTitleChange}
      />
      <input
        type='text'
        className='p-2 text-sm text-black'
        placeholder='가수'
        value={editData.artist}
        onChange={handleArtistChange}
      />
      <button type='button' className='hover:scale-110' onClick={handleEdit}>
        변경
      </button>
      <button
        type='button'
        className='hover:scale-110'
        onClick={handleCancelButton}
      >
        취소
      </button>
    </form>
  );
};

const IconButton = ({
  icon,
  size,
  color,
  onClick,
}: {
  icon: iconName;
  size: number;
  color: string;
  onClick: () => void;
}) => {
  const handleClickBtn = onClick;
  return (
    <button className='basis-1/12 hover:scale-110' onClick={handleClickBtn}>
      <Icon icon={icon} size={size} color={color} />
    </button>
  );
};

type EtcButtonContextProps = {
  showEtcSection: boolean;
  setShowEtcSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const EtcButtonContext = createContext<EtcButtonContextProps>(
  {} as EtcButtonContextProps
);

const EtcButton = ({ children }: { children: ReactNode }) => {
  const [showEtcSection, setShowEtcSection] = useState<boolean>(false);
  return (
    <EtcButtonContext.Provider value={{ showEtcSection, setShowEtcSection }}>
      <div className='relative basis-1/6'>
        <button
          onClick={() => {
            setShowEtcSection((prev) => !prev);
          }}
          className='hover:scale-110'
        >
          <Icon icon='EtcVert' size={18} color={color.gray_200} />
        </button>
        {showEtcSection && (
          <SmallPopupWrapper
            handleClickOther={() => {
              setShowEtcSection(false);
            }}
            isLeft={false}
          >
            <section className='flex flex-col pt-2 pb-2 border-b border-gray-600 border-solid '>
              {children}
            </section>
          </SmallPopupWrapper>
        )}
      </div>
    </EtcButtonContext.Provider>
  );
};

const RowButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => {
  const { setShowEtcSection } = useContext(EtcButtonContext);
  const handleClick = () => {
    onClick();
    setShowEtcSection(false);
  };
  return (
    <button
      onClick={handleClick}
      className='px-4 py-1 text-lg text-left text-black hover:bg-gray-200 dark:hover:bg-slate-600 dark:text-gray-300'
    >
      {text}
    </button>
  );
};

const HiddenShowRowButton = ({ text }: { text: string }) => {
  const { setShowHiddenSection } = useContext(SongResultRowContext);
  const { setShowEtcSection } = useContext(EtcButtonContext);
  const handleClick = () => {
    setShowHiddenSection(true);
    setShowEtcSection(false);
  };
  return (
    <button
      onClick={handleClick}
      className='px-4 py-1 text-lg text-left text-black hover:bg-gray-200 dark:hover:bg-slate-600 dark:text-gray-300'
    >
      {text}
    </button>
  );
};

SongResultRow.EditForm = EditForm;
SongResultRow.HiddenSection = HiddenSection;
SongResultRow.Text = Text;
SongResultRow.Inform = Inform;
SongResultRow.IconButton = IconButton;
SongResultRow.EtcButton = EtcButton;
EtcButton.RowButton = RowButton;
EtcButton.HiddenShowRowButton = HiddenShowRowButton;
export default SongResultRow;
