import Options from "./Options";
import "./Question.css"
function Question({ question, dispatch, answer, username }) {
  return (
    <div className="question_container">
      {/* Greet the user with their name */}
      <h3>Hello, {username}! Answer the following question:</h3>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
