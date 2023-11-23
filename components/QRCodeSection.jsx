import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { color } from '../styles/theme';
import PrimaryBtn from './Btn/PrimaryBtn';

const QRCodeSection = ({ url, title }) => {
  const [isShowQr, setIsShowQr] = useState(true);
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  const handleClickQRBtn = () => {
    setIsShowQr((prev) => !prev);
  };
  if (isLgMediaQuery) {
    return;
  }
  return (
    <>
      <h2 className='font-sans text-xl font-bold text-gray-300'>{title}</h2>
      {isShowQr && (
        <img
          src={`https://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=${url}`}
        />
      )}

      <PrimaryBtn
        handleClick={handleClickQRBtn}
        textColor={color.gray_900}
        bgColor={color.white}
      >
        QR코드 {isShowQr ? '숨기기' : '불러오기'}
      </PrimaryBtn>
    </>
  );
};

export default QRCodeSection;
