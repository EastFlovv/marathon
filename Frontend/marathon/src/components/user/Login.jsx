import React, { useState } from "react";
import style from "./Login.module.css";
import Kakao_login_medium_wide from "img/button/kakao_login_medium_wide.png";
import Modal from "components/common/Modal";
import FindId from "./FindId";
import FindPwd from "./FindPwd";
import { useDispatch } from "react-redux";
import { userLogin } from "stores/user.store";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const [isModalFindIdOpen, setIsModalFindIdOpen] = useState(false);
  const [isModalFindPwdOpen, setIsModalFindPwdOpen] = useState(false);

  // 모달창 노출
  const showModalFindId = () => {
    setIsModalFindIdOpen(true);
  };
  const showModalFindPwd = () => {
    setIsModalFindPwdOpen(true);
  };

  /** 로그인 버튼 클릭 시 실행되는 함수 */
  const login = () => {
    dispatch(userLogin());
    navigate("/");
  };

  return (
    <div className={style.user_box}>
      <div className={style.inner_box}>
        <div className={style.title}>환영합니다</div>
        <input className={style.input_text} type="text" placeholder="아이디" />
        <input
          className={style.input_text}
          type="text"
          placeholder="비밀번호"
        />
        {/* 아이디 기억하기 */}
        <div className={style.memorize_id}>
          <input
            className={style.memorize_id_box}
            type="checkbox"
            id="memorize_id_box"
          />
          <label className={style.memorize_id_txt} htmlFor="memorize_id_box">
            아이디 기억하기
          </label>
        </div>
        {/* 로그인 버튼 */}
        <div>
          <button className={`${style.btn} ${style.login}`} onClick={login}>
            로그인
          </button>
          <img
            className={style.btn}
            src={Kakao_login_medium_wide}
            alt="카카오 로그인 버튼"
          />
        </div>
        {/* 아이디, 비밀번호 찾기 */}
        <div className={style.find}>
          <div
            className={style.inline + " " + style.find_txt}
            onClick={showModalFindId}
          >
            아이디 찾기
          </div>

          <div
            className={style.inline + " " + style.find_txt}
            onClick={showModalFindPwd}
          >
            비밀번호 찾기
          </div>
        </div>
        {isModalFindIdOpen && (
          <Modal setModalOpen={setIsModalFindIdOpen}>
            <FindId setModalOpen={setIsModalFindIdOpen} />
          </Modal>
        )}
        {isModalFindPwdOpen && (
          <Modal setModalOpen={setIsModalFindPwdOpen}>
            <FindPwd setModalOpen={setIsModalFindPwdOpen} />
          </Modal>
        )}
      </div>
    </div>
  );
}