import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/MyPage.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/modal';
import Link from 'next/link';

axios.defaults.withCredentials = true;

const MyPage: NextPage = (props) => {
  const isSmallLetterAndNumber4to10 = /^[a-z0-9]{4,10}$/;

  const [changePassword, setChangePassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [correctChangePassword, setCorrectChangePassword] = useState(true);
  const [correctCheckPassword, setCorrectCheckPassword] = useState(true);

  const [changePasswordMessage, setChangePasswordMessage] = useState('');
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [auth, setAuth] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookieList = document.cookie.split(' ').filter((cookie) => {
        return cookie.includes('accessToken');
      });
      const accessToken = cookieList[0].split('=')[1].replace(';', '');

      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const { userInfo } = response.data.data;
          setUserId(userInfo.user_id);
          setNickname(userInfo.nickname);
          setAuth(userInfo.auth);
          setIsAdmin(userInfo.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectChangePassword(true);
    setChangePassword(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectCheckPassword(true);
    setCheckPassword(event.target.value);
  };

  const handleModify = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (auth === 'kakao') {
      setIsKakaoModalOpen(true);
    } else {
      if (changePassword === '' || checkPassword === '') {
        if (changePassword === '') {
          setChangePasswordMessage('?????? ???????????????.');
          setCorrectChangePassword(false);
        }
        if (checkPassword === '') {
          setCheckPasswordMessage('?????? ???????????????.');
          setCorrectCheckPassword(false);
        }
      } else if (changePassword !== checkPassword) {
        setCheckPasswordMessage('??????????????? ???????????? ????????????.');
        setCorrectCheckPassword(false);
      } else if (correctChangePassword && correctCheckPassword) {
        if (typeof document !== 'undefined') {
          const cookieList = document.cookie.split(' ').filter((cookie) => {
            return cookie.includes('accessToken');
          });
          const accessToken = cookieList[0].split('=')[1].replace(';', '');

          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`,
              {
                password: changePassword,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              setChangePassword('');
              setCheckPassword('');
              setIsModifyModalOpen(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const type: string = event.target.id;

    if (type === 'change_password') {
      if (!value) {
        setCorrectChangePassword(true);
      } else if (!isSmallLetterAndNumber4to10.test(value)) {
        setChangePasswordMessage('4~10??? ?????? ?????????, ????????? ???????????????.');
        setCorrectChangePassword(false);
      } else if (changePassword === checkPassword) {
        setCorrectChangePassword(true);
        setCorrectCheckPassword(true);
      } else {
        setCorrectChangePassword(true);
      }
    }

    if (type === 'check_password') {
      if (!value) {
        setCorrectCheckPassword(true);
      } else if (changePassword !== checkPassword) {
        if (changePassword === '' || !correctChangePassword) {
          setCheckPasswordMessage('??????????????? ????????? ?????? ??????????????????.');
          setCorrectCheckPassword(false);
        } else {
          setCheckPasswordMessage('??????????????? ???????????? ????????????.');
          setCorrectCheckPassword(false);
        }
      } else if (changePassword === checkPassword) {
        if (!correctChangePassword) {
          setCheckPasswordMessage('??????????????? ????????? ?????? ??????????????????.');
          setCorrectCheckPassword(false);
        } else {
          setCorrectCheckPassword(true);
        }
      }
    }
  };

  const handleModal = () => {
    setIsSignoutModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className={styles.mypage_header}></div>
      <div className={styles.mypage_container}>
        <div className={styles.mypage_profile}>
          <img
            src="/user.png"
            alt="user-image"
            className={styles.mypage_image}
          />

          {isAdmin ? (
            <Link
              href={{
                pathname: 'admin',
                query: { isAdmin: 'true' },
              }}
              as={'/admin'}
            >
              <button className={styles.mypage_admin_button}>ADMIN</button>
            </Link>
          ) : (
            <></>
          )}
          <div className={styles.mypage_input_container}>
            <div className={styles.mypage_input_disabled}>
              <input
                className={styles.mypage_id_name}
                value={userId || ''}
                placeholder={userId}
                disabled
              />
              <input
                className={styles.mypage_id_name}
                value={nickname || ''}
                placeholder={nickname}
                disabled
              />
            </div>
            {auth === 'banthing' ? (
              <input
                id="change_password"
                className={styles.mypage_password_change_check}
                placeholder="????????? ???????????? ??????"
                type="password"
                value={changePassword}
                onChange={handleChangePassword}
                onBlur={handleBlur}
              />
            ) : (
              <input
                className={styles.mypage_password_change_check_kakao}
                value={''}
                placeholder="??????????????? ????????? ??? ????????????."
                disabled
              />
            )}
            {correctChangePassword && auth === 'banthing' ? (
              <span className={styles.mypage_space}>
                ???????????? ?????????????????????.
              </span>
            ) : (
              <span className={styles.mypage_error}>
                {changePasswordMessage}
              </span>
            )}
            {auth === 'banthing' ? (
              <input
                id="check_password"
                className={styles.mypage_password_change_check}
                placeholder="????????? ???????????? ??????"
                type="password"
                value={checkPassword}
                onChange={handleCheckPassword}
                onBlur={handleBlur}
              />
            ) : (
              <input
                className={styles.mypage_password_change_check_kakao}
                value={''}
                placeholder="??????????????? ????????? ??? ????????????."
                disabled
              />
            )}
            {correctCheckPassword ? (
              <span className={styles.mypage_space}>
                ???????????? ?????????????????????.
              </span>
            ) : (
              <span className={styles.mypage_error}>
                {checkPasswordMessage}
              </span>
            )}
          </div>
          <div className={styles.mypage_button_container}>
            <button
              className={styles.mypage_modify_button}
              onClick={handleModify}
            >
              ????????????
            </button>
            <button
              className={styles.mypage_signout_button}
              onClick={handleModal}
            >
              ????????????
            </button>
          </div>
        </div>
        {isSignoutModalOpen ? (
          <Modal setIsModalOpen={setIsSignoutModalOpen} type="signout" />
        ) : (
          <></>
        )}
        {isModifyModalOpen ? (
          <Modal setIsModalOpen={setIsModifyModalOpen} type="modify" />
        ) : (
          <></>
        )}
        {isKakaoModalOpen ? (
          <Modal
            setIsModalOpen={setIsKakaoModalOpen}
            type="mypage_kakao_do_modify"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default MyPage;
