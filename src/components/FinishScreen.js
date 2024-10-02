function FinishScreen({ points, maxPossiblePoints, highscore, dispatch, correctAnswers, wrongAnswers, username }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let comment;
  if (percentage === 100) comment = "Perfect score! You're a quiz master!";
  else if (percentage >= 80) comment = "Great job! You really know your stuff!";
  else if (percentage >= 50) comment = "Not bad! A little more practice, and you'll ace it!";
  else if (percentage > 0) comment = "You can do better! Keep trying!";
  else comment = "Oh no! Don't give up!";

  return (
    <div className="result_container">
      <p className="result">
        <strong>{username}</strong>, {comment} You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="details">
        <h3>Correct Answers: <strong>{correctAnswers}</strong> | Wrong Answers: <strong>{wrongAnswers}</strong></h3>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "resetToSubjectSelection" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
