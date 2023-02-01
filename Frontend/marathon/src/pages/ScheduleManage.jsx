import React, { useState } from "react";
import style from "./ScheduleManage.module.css";
import { useSelector } from "react-redux";

export default function ScheduleManage() {
  /** 수업 스케쥴 더미데이터 */
  const data = {
    firstDateInfo: "1675036800000",
    list: [
      {
        reservationSeq: 0,
        localDate: "2023-01-30",
        timeTable: "00021000",
      },
      {
        reservationSeq: 1,
        localDate: "2023-01-31",
        timeTable: "00000210",
      },
      {
        reservationSeq: 2,
        localDate: "2023-02-01",
        timeTable: "10020000",
      },
      {
        reservationSeq: 3,
        localDate: "2023-02-02",
        timeTable: "01002010",
      },
      {
        reservationSeq: 4,
        localDate: "2023-02-03",
        timeTable: "00200010",
      },
      {
        reservationSeq: 5,
        localDate: "2023-02-04",
        timeTable: "00200011",
      },
      {
        reservationSeq: 6,
        localDate: "2023-02-05",
        timeTable: "20000001",
      },
      {
        reservationSeq: 7,
        localDate: "2023-02-06",
        timeTable: "00001000",
      },
      {
        reservationSeq: 8,
        localDate: "2023-02-07",
        timeTable: "00001110",
      },
      {
        reservationSeq: 9,
        localDate: "2023-02-08",
        timeTable: "02220000",
      },
      {
        reservationSeq: 10,
        localDate: "2023-02-09",
        timeTable: "01000010",
      },
      {
        reservationSeq: 11,
        localDate: "2023-02-10",
        timeTable: "00100020",
      },
      {
        reservationSeq: 12,
        localDate: "2023-02-11",
        timeTable: "00000001",
      },
      {
        reservationSeq: 13,
        localDate: "2023-02-12",
        timeTable: "00000000",
      },
      {
        reservationSeq: 14,
        localDate: "2023-02-13",
        timeTable: "02000000",
      },
      {
        reservationSeq: 15,
        localDate: "2023-02-14",
        timeTable: "01000110",
      },
      {
        reservationSeq: 16,
        localDate: "2023-02-15",
        timeTable: "10000002",
      },
      {
        reservationSeq: 17,
        localDate: "2023-02-16",
        timeTable: "01002012",
      },
      {
        reservationSeq: 18,
        localDate: "2023-02-17",
        timeTable: "01000010",
      },
      {
        reservationSeq: 19,
        localDate: "2023-02-18",
        timeTable: "11000001",
      },
      {
        reservationSeq: 20,
        localDate: "2023-02-19",
        timeTable: "22000001",
      },
    ],
  };

  const state = useSelector((state) => state);

  const thisDateNum = data.firstDateInfo;
  const [cnt, setCnt] = useState(0);
  const [teacherSchedule, setTeacherSchedule] = useState(data.list);
  const totalThisDate = (num) => {
    let today = new Date(Number(thisDateNum) + (num + cnt * 7) * 86400000);
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    if (todayMonth < 10) todayMonth = "0" + todayMonth;
    let todayDate = today.getDate();
    if (todayDate < 10) todayDate = "0" + todayDate;
    today = todayYear + "-" + todayMonth + "-" + todayDate;
    return today.toString();
  };

  const thisYear = (num) => {
    let today = new Date(Number(thisDateNum) + (num + cnt * 7) * 86400000);
    let todayYear = today.getFullYear();
    return todayYear.toString();
  };

  const thisMonth = (num) => {
    let today = new Date(Number(thisDateNum) + (num + cnt * 7) * 86400000);
    let todayMonth = today.getMonth() + 1;
    if (todayMonth < 10) todayMonth = "0" + todayMonth;
    return todayMonth.toString();
  };

  const thisDay = (num) => {
    let today = new Date(Number(thisDateNum) + (num + cnt * 7) * 86400000);
    let todayDate = today.getDate();
    if (todayDate < 10) todayDate = "0" + todayDate;
    return todayDate.toString();
  };

  const checkSchedule = (thisDay) => {
    const found = teacherSchedule.find((e) => e.localDate === thisDay);
    const thisTimeTable = found.timeTable;

    const timeLlist = [];
    for (let i = 0; i < thisTimeTable.length; i++) {
      /** 9시 수업인 경우 09:00로 표기하기 위해 따로 구분
       * 11시 다음 수업이 13시 이므로 11시, 12시도 따로 구분*/
      if (i === 0) {
        timeLlist.push(
          <button
            key={i}
            className={
              (thisTimeTable[i] === "0" && style.button0) ||
              (thisTimeTable[i] === "1" && style.button1) ||
              (thisTimeTable[i] === "2" && style.button2)
            }
            name={thisDay}
            value={i + thisTimeTable[i]}
            onClick={onChange}
            disabled={thisTimeTable[i] === "2" ? true : false}
          >
            0{i + 9} : 00
          </button>
        );
      } else if (i === 1 || i === 2) {
        timeLlist.push(
          <button
            key={i}
            className={
              (thisTimeTable[i] === "0" && style.button0) ||
              (thisTimeTable[i] === "1" && style.button1) ||
              (thisTimeTable[i] === "2" && style.button2)
            }
            name={thisDay}
            value={i + thisTimeTable[i]}
            onClick={onChange}
            disabled={thisTimeTable[i] === "2" ? true : false}
          >
            {i + 9} : 00
          </button>
        );
      } else {
        timeLlist.push(
          <button
            key={i}
            className={
              (thisTimeTable[i] === "0" && style.button0) ||
              (thisTimeTable[i] === "1" && style.button1) ||
              (thisTimeTable[i] === "2" && style.button2)
            }
            name={thisDay}
            value={i + thisTimeTable[i]}
            onClick={onChange}
            disabled={thisTimeTable[i] === "2" ? true : false}
          >
            {i + 10} : 00
          </button>
        );
      }
    }
    return timeLlist;
  };

  /** 일정 예약 가능 여부 변경 함수 */
  const onChange = (e) => {
    /** e.target.value[0] : 시간대 index, e.target.value[2] : 예약 여부 */
    let reserve = "";
    if (e.target.value[1] === "0") {
      reserve = "1";
    } else if (e.target.value[1] === "1") {
      reserve = "0";
    }

    let findItem = teacherSchedule.find((t) => t.localDate === e.target.name);
    let newTimeTable = [];
    for (let i = 0; i < 8; i++) {
      i.toString() === e.target.value[0]
        ? newTimeTable.push(reserve)
        : newTimeTable.push(findItem.timeTable[i]);
    }
    newTimeTable = newTimeTable.join("");
    let newSchedule = [...teacherSchedule];
    let findorigin = newSchedule.find((t) => t.localDate === e.target.name);
    findorigin.timeTable = newTimeTable;
    setTeacherSchedule(newSchedule);
  };

  /** 다음 일정 확인 */
  const nextWeek = () => {
    if (cnt < 2) {
      setCnt(cnt + 1);
    }
  };

  /** 이전 일정 확인 */
  const prevWeek = () => {
    if (cnt > 0) {
      setCnt(cnt - 1);
    }
  };

  const onSubmit = () => {
    alert("제출되었습니다");
    console.log(teacherSchedule);
  };

  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <div className={style.title}>
          <span className={style.title_name}>{state.loginUser.userName} </span>
          <span className={style.title_position}>선생님</span>
          <span className={style.title_schedule}>수업 스케쥴</span>
        </div>
        <div className={style.content}>
          <div className={style.date_header}>
            <button className={style.button} onClick={prevWeek}>
              ◁ 이전
            </button>
            <span className={style.date_text}>
              {thisYear(0)}.{thisMonth(0)}.{thisDay(0)} ~ {thisYear(6)}.
              {thisMonth(6)}.{thisDay(6)}
            </span>
            <button className={style.button} onClick={nextWeek}>
              다음 ▷
            </button>
          </div>
          <div className={style.date_item}>
            <div className={style.day_start}>
              <div className={style.day_header}>{thisDay(0)} &#40;월&#41;</div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(0))}
              </div>
            </div>
            <div className={style.day}>
              <div className={style.day_header}>{thisDay(1)} &#40;화&#41;</div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(1))}
              </div>
            </div>
            <div className={style.day}>
              <div className={style.day_header}>{thisDay(2)} &#40;수&#41;</div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(2))}
              </div>
            </div>
            <div className={style.day}>
              <div className={style.day_header}>{thisDay(3)} &#40;목&#41;</div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(3))}
              </div>
            </div>
            <div className={style.day}>
              <div className={style.day_header}>{thisDay(4)} &#40;금&#41;</div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(4))}
              </div>
            </div>
            <div className={style.day}>
              <div className={style.day_header} style={{ color: "blue" }}>
                {thisDay(5)} &#40;토&#41;
              </div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(5))}
              </div>
            </div>
            <div className={style.day_end}>
              <div className={style.day_header} style={{ color: "red" }}>
                {thisDay(6)} &#40;일&#41;
              </div>
              <div className={style.day_item}>
                {checkSchedule(totalThisDate(6))}
              </div>
            </div>
          </div>
          <div className={style.save_button_div}>
            <button className={style.save_button} onClick={onSubmit}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
