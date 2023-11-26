import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { color } from '../styles/theme';
import PrimaryBtn from './Btn/PrimaryBtn';
import Image from 'next/image';
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
      <Image
        className={`${isShowQr && 'hidden'}`}
        alt='QRCode'
        src={`https://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=${url}`}
        width={100}
        height={100}
        priority
      />

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
