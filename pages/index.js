import { useEffect, useRef } from 'react';
import Image from 'next/image';
import LoginNav from '../components/LoginNav';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import PrimaryBtn from '../components/Btn/PrimaryBtn';
import { fontSize, xyPadding } from '../styles/theme';

export default function Home() {
  const tutorialRef = useRef(null);
  const scrollToTutorial = () => tutorialRef.current.scrollIntoView();
  const { login, user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/app/home');
    }
  }, [user]);
  const handleClickLoginBtn = () => {
    login('Google');
  };
  return (
    <section className='w-screen h-screen bg-black'>
      <section className='p-6 bg-white'>
        <LoginNav scrollToTutorial={scrollToTutorial} />
        <main className=' w-3/5 pt-24 pb-24 m-auto max-lg:w-full'>
          <h1 className='font-sans text-6xl font-semibold text-black text-center max-lg:text-4xl'>
            당신만의{' '}
            <div className='inline text-blue-600 font-extrabold'>
              온라인, 오프라인 버스킹
            </div>
            을 여기서 시작하세요.
          </h1>
          <h2 className='font-sans text-2xl font-normal mt-10 text-black text-center max-lg:text-xl'>
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
              >
                Google로 로그인하기
              </PrimaryBtn>
            </li>
          </ul>
        </main>
      </section>
      <section
        className='bg-blue-200 py-48 flex flex-row justify-center items-center rounded-xl max-lg:flex-col'
        ref={tutorialRef}
      >
        <Image
          src={'/img/screenMakePlaylist.png'}
          alt={'screenMakePlaylist'}
          width={500}
          height={500}
          className='w-1/3 mr-3 max-lg:w-full max-lg:mr-0 max-lg:p-5'
        />

        <div className='w-1/3 ml-32 max-lg:w-full max-lg:ml-0 max-lg:p-5'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6 max-lg:text-3xl'>
            당신만의 노래 리스트를 생성하세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal max-lg:text-lg '>
            노래책은 노래리스트를 여러 개 만들 수 있어요. 각 리스트마다 주제를
            정해놓고 알맞은 곡을 저장해보세요.
          </p>
        </div>
      </section>
      <section className='bg-blue-400 py-48 flex flex-row justify-center items-center rounded-xl max-lg:flex-col'>
        <div className='w-1/3 mr-32 max-lg:w-full max-lg:mr-0 max-lg:p-5'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6 max-lg:text-3xl'>
            당신의 애창곡을 검색하여 노래리스트에 추가하세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal max-lg:text-lg'>
            노래책은 다양한 장르의 노래들의 검색을 지원해요. 부를 수 있는 다양한
            노래들을 검색해 보고 부르고 싶은 노래들을 노래리스트에 추가해보세요.
          </p>
        </div>
        <Image
          src={'/img/screenAddSong.png'}
          alt={'screenAddSong'}
          width={500}
          height={500}
          className='w-1/3 mr-3 max-lg:w-full max-lg:mr-0 max-lg:p-5'
        />
      </section>
      <section className='bg-blue-200 py-48 flex flex-row justify-center items-center rounded-xl max-lg:flex-col'>
        <Image
          src={'/img/screenMakeBusking.png'}
          alt={'screenMakeBusking'}
          width={500}
          height={500}
          className='w-1/3 mr-3 max-lg:w-full max-lg:mr-0 max-lg:p-5'
        />

        <div className='w-1/3 ml-32 max-lg:w-full max-lg:ml-0 max-lg:p-5'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6 max-lg:text-3xl'>
            만든 노래리스트를 이용하여 버스킹을 시작하세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal max-lg:text-lg'>
            노래들을 리스트에 추가한 후, 원하는 노래 리스트를 선택하여 버스킹을
            시작할 수 있어요. 최대 곡 수 제한, 방 제목 설정 등 버스킹에 대해
            다양한 설정을 할 수 있어요.
          </p>
        </div>
      </section>
      <section className='bg-blue-400 py-48 flex flex-row justify-center items-center rounded-xl max-lg:flex-col'>
        <div className='w-1/3 mr-32 max-lg:w-full max-lg:mr-0 max-lg:p-5'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6 max-lg:text-3xl'>
            관객들로부터 노래리스트에 있는 노래들을 신청받으세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal max-lg:text-lg'>
            버스킹을 시작하면 위에 노래를 신청받을 수 있는 링크와 그 링크로 바로
            접속할 수 있는 QR코드가 있어요. 이를 이용하여 관객들로부터 노래를
            신청받으세요. 그러면 아래의 신청 곡 리스트에 신청된 노래들이
            나타나요.
          </p>
        </div>
        <Image
          src={'/img/screenBusking.png'}
          alt={'screenBusking'}
          width={500}
          height={500}
          className='w-1/3 mr-3 max-lg:w-full max-lg:mr-0 max-lg:p-5'
        />
      </section>
      <section className='bg-blue-200 py-48 flex flex-row justify-center items-center rounded-xl max-lg:flex-col'>
        <Image
          src={'/img/screenBuskingApply.png'}
          alt={'screenBuskingApply'}
          width={500}
          height={500}
          className='w-1/3 mr-3 max-lg:w-full max-lg:mr-0 max-lg:p-5'
        />

        <div className='w-1/3 ml-32 max-lg:w-full max-lg:ml-0 max-lg:p-5'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6 max-lg:text-3xl'>
            버스킹중인 가수의 노래리스트에서 노래를 신청하세요
          </h2>
          <p className='text-black font-sans text-xl font-normal max-lg:text-lg'>
            버스킹에서 선택된 노래리스트에 있는 노래들을 확인할 수 있어요. 검색,
            정렬 등이 가능해요. 다양한 노래리스트를 확인하고 듣고 싶은 노래를
            신청해요.
          </p>
        </div>
      </section>
      <section className='bg-white py-48 flex flex-col justify-center items-center rounded-xl'>
        <h2 className='text-black font-sans text-5xl font-semibold mb-6 max-lg:text-center'>
          자 그럼 시작하러 가볼까요?
        </h2>
        <button
          onClick={() => {
            login('Google');
          }}
          className='text-white hover:scale-105 py-4 px-8 font-sans text-xl bg-slate-900 rounded-3xl mt-6'
        >
          Google로 시작하기
        </button>
      </section>
    </section>
  );
}
