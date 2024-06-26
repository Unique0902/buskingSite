import { useRef } from 'react';

import { useRouter } from 'next/router';

import PrimaryBtn from '../components/Btn/PrimaryBtn';
import LoginNav from '../components/Home/LoginNav';
import TutorialBlock from '../components/Home/TutorialBlock';
import { useAuthContext } from '../context/AuthContext';
import { borderRadius, fontSize, xyPadding } from '../styles/theme';
import { useMediaQueryContext } from '../context/MediaQueryContext';

export default function Home() {
  const tutorialRef = useRef<HTMLDivElement>(null);
  const scrollToTutorial = () =>
    tutorialRef.current && tutorialRef.current.scrollIntoView();
  const { login, user } = useAuthContext();
  const router = useRouter();
  const { isSmScreen } = useMediaQueryContext();
  if (user) {
    router.replace('/app/home');
    return <div>move to app...</div>;
  }
  const handleClickLoginBtn = () => {
    login('Google');
  };
  return (
    <section className='w-screen h-screen text-black bg-black'>
      <section className='p-6 bg-white'>
        <LoginNav scrollToTutorial={scrollToTutorial} isSmScreen={isSmScreen} />
        <main className='w-3/5 pt-24 pb-24 m-auto max-lg:w-full'>
          <h1 className='text-6xl font-semibold text-center max-lg:text-4xl'>
            당신만의{' '}
            <div className='inline font-extrabold text-blue-600'>
              온라인, 오프라인 버스킹
            </div>
            을 여기서 시작하세요.
          </h1>
          <h2 className='mt-10 text-2xl font-normal text-center max-lg:text-xl'>
            당신만의 노래 리스트를 생성하여 애창곡을 검색하여 저장하세요.
            버스킹을 시작하여 공유되는 링크를 이용하여 관객들로부터 노래를
            신청받으세요.
          </h2>
          <ul className='flex justify-center mt-10'>
            <li>
              <PrimaryBtn
                handleClick={handleClickLoginBtn}
                fontSize={fontSize.base}
                btnPadding={xyPadding.lg}
                radius={borderRadius.xl3}
              >
                Google로 로그인하기
              </PrimaryBtn>
            </li>
          </ul>
        </main>
      </section>
      <div ref={tutorialRef}></div>
      <TutorialBlock
        imgAlt={'screenMakePlaylist'}
        isReverse={false}
        title={'당신만의 노래 리스트를 생성하세요.'}
      >
        노래책은 노래리스트를 여러 개 만들 수 있어요. 각 리스트마다 주제를
        정해놓고 알맞은 곡을 저장해보세요.
      </TutorialBlock>
      <TutorialBlock
        imgAlt={'screenAddSong'}
        isReverse={true}
        title={'당신의 애창곡을 검색하여 노래리스트에 추가하세요.'}
      >
        노래책은 다양한 장르의 노래들의 검색을 지원해요. 부를 수 있는 다양한
        노래들을 검색해 보고 부르고 싶은 노래들을 노래리스트에 추가해보세요.
      </TutorialBlock>
      <TutorialBlock
        imgAlt={'screenMakeBusking'}
        isReverse={false}
        title={'만든 노래리스트를 이용하여 버스킹을 시작하세요.'}
      >
        노래들을 리스트에 추가한 후, 원하는 노래 리스트를 선택하여 버스킹을
        시작할 수 있어요. 최대 곡 수 제한, 방 제목 설정 등 버스킹에 대해 다양한
        설정을 할 수 있어요.
      </TutorialBlock>
      <TutorialBlock
        imgAlt={'screenBusking'}
        isReverse={true}
        title={'관객들로부터 노래리스트에 있는 노래들을 신청받으세요.'}
      >
        버스킹을 시작하면 위에 노래를 신청받을 수 있는 링크와 그 링크로 바로
        접속할 수 있는 QR코드가 있어요. 이를 이용하여 관객들로부터 노래를
        신청받으세요. 그러면 아래의 신청 곡 리스트에 신청된 노래들이 나타나요.
      </TutorialBlock>
      <TutorialBlock
        imgAlt={'screenBuskingApply'}
        isReverse={false}
        title={'버스킹중인 가수의 노래리스트에서 노래를 신청하세요.'}
      >
        버스킹에서 선택된 노래리스트에 있는 노래들을 확인할 수 있어요. 검색,
        정렬 등이 가능해요. 다양한 노래리스트를 확인하고 듣고 싶은 노래를
        신청해요.
      </TutorialBlock>

      <section className='flex flex-col items-center justify-center py-48 bg-white rounded-xl'>
        <h2 className='mb-6 text-5xl font-semibold max-lg:text-center'>
          자 그럼 시작하러 가볼까요?
        </h2>
        <PrimaryBtn
          handleClick={handleClickLoginBtn}
          fontSize={fontSize.base}
          btnPadding={xyPadding.lg}
          radius={borderRadius.xl3}
        >
          Google로 로그인하기
        </PrimaryBtn>
      </section>
    </section>
  );
}
