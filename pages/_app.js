import '../styles/globals.css';
import Head from 'next/head';
import ServiceContextProviders from '../context/ServiceContextProviders';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);
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
        />
        <meta
          name='google-site-verification'
          content='cb3rxr8OeGSZq2ejzghLOqZ_6oRA3fSZWnJGbYcb9Wg'
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ServiceContextProviders>
  );
}
