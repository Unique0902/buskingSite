import '../styles/globals.css';
import Head from 'next/head';
import ServiceContextProviders from '../context/ServiceContextProviders';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
//TODO: 가끔 지혼자 새로고침되는거 고치기
//TODO: portal 이용하여 custom Modal 만들거나 라이브러리 모달 가져와 쓰기
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page: ReactElement) => <>{page}</>);
  return (
    <ServiceContextProviders>
      <Head>
        <title>노래책</title>
        <meta
          name='desciption'
          content='당신만의 온라인, 오프라인 버스킹을 여기서 시작하세요. 
                    당신만의 노래 리스트를 생성하여 애창곡을 검색하여 저장하세요.
                    버스킹을 시작하여 공유되는 링크를 이용하여 관객들로부터 노래를
                    신청받으세요.'
        ></meta>
        <meta
          name='description'
          content='당신만의 노래 리스트를 생성하세요.
          노래책은 노래리스트를 여러 개 만들 수 있어요. 각 리스트마다 주제를 정해놓고 알맞은 곡을 저장해보세요.'
        ></meta>
        <meta
          name='google-site-verification'
          content='cb3rxr8OeGSZq2ejzghLOqZ_6oRA3fSZWnJGbYcb9Wg'
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ServiceContextProviders>
  );
}
