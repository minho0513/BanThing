import type { NextPage } from 'next';
import Head from 'next/head';
import Title from '../components/home/title';
import Progress from '../components/home/progress';
import Introduction from '../components/home/introduction';
import Text from '../components/home/text';
import Caption from '../components/home/caption';
import Footer from '../components/home/footer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  if (typeof window !== 'undefined') {
    window.onload = function () {
      setTimeout(function () {
        scrollTo(0, 0);
      }, 100);
    };
  }

  return (
    <>
      <div className={styles.home_container}>
        <Head>
          <title>BanThing</title>
          <meta name="BanThing" content="Order with your foodmate" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Progress />

        <Title />

        <Introduction
          imagePosition={'left'}
          image={'/worry.png'}
          title={'망설여지는 배달음식'}
          description={[
            '1인분을 시키자니 최저금액을 맞춰야하고,',
            '최저금액만 맞췄더니 배달비가 너무 비싸고,',
            '2인분을 시키자니 양이 너무 많아서',
            '배달음식을 시켜먹기가 망설여지신다구요?',
          ]}
        />

        <Text />

        <Introduction
          imagePosition={'right'}
          image={'/foodmate.png'}
          title={'내 주변의 배달메이트'}
          description={[
            '마침 배달음식을 시켜먹고 싶은데',
            '배달비도 최저금액도 함께 나눌 수 있는',
            '내 주변의 배달메이트를 찾으신다면',
            ' ',
            '지금 바로 반띵에서 확인해보세요!',
          ]}
        />
        <Introduction
          imagePosition={'left'}
          image={'/chatting.png'}
          title={'실시간 메뉴선정'}
          description={[
            '어떤 햄버거를 먹을지, 어떤 치킨을 먹을지',
            '배달메이트와 실시간으로 상의하여',
            '구체적인 메뉴를 함께 정해보세요.',
            ' ',
            '마음이 잘 통한다면 주문하기만 하면 됩니다!',
          ]}
        />
        {/* <Introduction
          imagePosition={'right'}
          image={'/rating.png'}
          title={'레이팅 시스템'}
          description={[
            '모든 합의가 끝나면 평가하기를 통해',
            '배달메이트에게 점수를 주세요!',
            ' ',
            '해당 점수는 배달메이트의 평점에 반영되며,',
            '평점은 다른 이용자들에게 노출됩니다.',
          ]}
        /> */}

        <Caption />

        <Footer />
      </div>
    </>
  );
};

export default Home;
