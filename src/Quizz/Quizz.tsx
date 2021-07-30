import styled from "styled-components";
import slugify from "slugify";
import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

export type TQuizz = {
  index: number;
  id: string;
  question: string;
  answers: string[];
  correct: number;
  note?: string;
};
export interface Props {
  data: TQuizz;
  index: number;
  currentIndex: number;
  onChoice: (index: number) => void; // pick one ans
  setTimerCorrect: any;
}
// Random component
const Completionist = () => <span>overtime!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

export default function Quizz(props: Props) {
  const { data, index, currentIndex, onChoice, setTimerCorrect } = props;
  const [numberPick, setNumberPick] = useState(0);
  // const coutdown = useRef(30);
  const [check, setCheck] = useState(false);
  // console.log("data", data);

  const onChange = (number: number) => {
    const tempData = localStorage.getItem("dev") || "{}";
    const rs = { ...JSON.parse(tempData) };
    rs[data.id] = { ...data, correct: number };
    localStorage.setItem("dev", JSON.stringify(rs));
  };

  // console.log(coutdown.current);
  // useEffect(() => {
  //   coutdown.current = 30;
  // }, []);

  return (
    <SQuizz className={`${currentIndex === index ? "active" : "hidden"}`}>
      {/* {" "}
      <div className="cout-down">
        <Countdown
          renderer={renderer}
          date={Date.now() + 1000 * coutdown.current}
        />
      </div>{" "} */}
      {data ? (
        <>
          <h2 className="question">
            {Number(data.index)}. {data.question}
          </h2>
          <ul className="answers">
            {data.answers.map((item, index) => {
              return (
                <li
                  className="item"
                  key={slugify(`${data.question}__${index}`)}
                  onClick={() => {
                    setNumberPick((pre) => pre + 1);
                    if (numberPick < 1) {
                      onChoice(index);
                      if (index === data.correct)
                        setTimerCorrect((pre: any) => pre + 1);
                    }

                    if (index === data.correct) setCheck(true);
                    else setCheck(false);
                    // onChange(index);
                  }}
                >
                  <label
                    className={`${
                      check && data.correct === index ? "correct" : ""
                    }`}
                    style={{ paddingBottom: "12px" }}
                  >
                    <input
                      type="radio"
                      name={slugify(data.question)}
                      value={index}
                    />{" "}
                    {/* <p className="item-text">{}</p> */}
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
          {check && data?.note && (
            <p className="note">
              Note: <br />
              {data?.note}
            </p>
          )}
          {/* <textarea
            style={{ width: "500px" }}
            onChange={(e) => {
              const tempData = localStorage.getItem("dev") || "{}";
              const rs = { ...JSON.parse(tempData) };
              rs[data.id] = { ...data, note: e.target.value };
              localStorage.setItem("dev", JSON.stringify(rs));
            }}
          ></textarea>
          <br></br>
          {localStorage.getItem("dev")
            ? JSON.parse(localStorage.getItem("dev") || "")[data.id] &&
              JSON.parse(localStorage.getItem("dev") || "")[data.id]["correct"]
            : "no"} */}
        </>
      ) : (
        "Nothing here."
      )}{" "}
    </SQuizz>
  );
}

const SQuizz = styled.div`
  max-width: 100%;
  width: 100%;
  position: relative;
  .question {
    padding: 0 24px;
  }
  .note {
    padding: 0 24px;
    text-transform: capitalize;
  }
  ul {
    list-style: none;
    padding-right: 12px;
    li {
      label {
        &.correct {
          color: green;
          text-shadow: 1px 0 1px green;
        }
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;

        input[type="radio"] {
          margin-right: 12px;
        }
      }
    }
  }
`;
