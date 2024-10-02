import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import SubjectSelection from "./SubjectSelection";
import "../index.css";

const SECS_PER_QUESTION = 5;

const initialState = {
  questions: [],
  status: "subjectSelect", // Default status for subject selection
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  selectedSubject: null,  // New field to track selected subject
  correctAnswers: 0,  // New field for correct answers
  wrongAnswers: 0,    // New field for wrong answers
  username: "",       // New field to track the username
};

function reducer(state, action) {
  switch (action.type) {
    case "subjectSelected":
      return { ...state, selectedSubject: action.payload, status: "loading" };

    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        username: action.payload,  // Store the username
      };
    case "newAnswer":
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
        correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
        wrongAnswers: !isCorrect ? state.wrongAnswers + 1 : state.wrongAnswers,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "resetToSubjectSelection":
      return { ...initialState, status: "subjectSelect" }; // Reset to subject selection

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining, selectedSubject, correctAnswers, wrongAnswers, username },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // Load questions for the selected subject
  useEffect(() => {
    if (selectedSubject) {
      let url;

      // Define the fetch URL based on the selected subject
      if (selectedSubject === "oops") {
        url = 'https://raw.githubusercontent.com/Sgrrsaurabh/React-quiz-Bright/refs/heads/main/react.json';
      } else if (selectedSubject === "os") {
        url = 'https://raw.githubusercontent.com/Sgrrsaurabh/React-quiz-Bright/refs/heads/main/os.json';
      } else if (selectedSubject === "dbms") {
        url = 'https://example.com/dbms.json'; // Replace with actual URL for DBMS
      } else if (selectedSubject === "javascript") {
        url = 'https://raw.githubusercontent.com/Sgrrsaurabh/React-quiz-Bright/refs/heads/main/javascript.json';
      }

      // Fetch data based on the selected subject
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
          }
          return res.json();
        })
        .then((data) =>
          dispatch({
            type: "dataReceived",
            payload: data.questions,
          })
        )
        .catch((error) => {
          console.error("Error fetching data:", error);
          dispatch({ type: "dataFailed" });
        });
    }
  }, [selectedSubject]);

  return (
    <div className="wrapper">
      <div className="app">
        <div className="headerWrapper">
          <Header />
          <Main>
            {status === "subjectSelect" && (
              <SubjectSelection setSubject={(subject) => dispatch({ type: "subjectSelected", payload: subject })} />
            )}
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
              <StartScreen numQuestions={numQuestions}
               dispatch={dispatch} 
               selectedSubject={selectedSubject} 
               />
            )}
            {status === "active" && (
              <>
                <Progress
                  index={index}
                  numQuestions={numQuestions}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                />
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                  username={username}  // Pass the username as a prop
                />
                <Footer>
                  <Timer
                    dispatch={dispatch}
                    secondsRemaining={secondsRemaining}
                  />
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    numQuestions={numQuestions}
                    index={index}
                  />
                </Footer>
              </>
            )}
            {status === "finished" && (
              <FinishScreen
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                dispatch={dispatch}
                correctAnswers={correctAnswers}  // Pass correct answers
                wrongAnswers={wrongAnswers}      // Pass wrong answers
                username={username}              // Pass the username to FinishScreen
              />
            )}
          </Main>
        </div>
      </div>
    </div>
  );
}
