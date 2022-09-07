import React from "react"
import "./App.css"
import Question from "../Components/Question"
import { nanoid } from "nanoid"

export default function App() {
  const [quizState, setQuizState] = React.useState(false)
  const [quiz, setQuiz] = React.useState(JSON.parse(localStorage.getItem("questions")) || [])
  const [isSubmited, setIsSubmited] = React.useState(false)
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(data => setQuiz(data.results))
  },[quizState])

  React.useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(quiz))
  }, [quiz])
  
  const quiz_Elements = quiz.map(question => {
    let id = nanoid()
    return (
      <>
        <Question key={id} id={id} question={question.question} correct_answer={question.correct_answer} incorrect_answers={question.incorrect_answers} isSubmited={isSubmited}/> <hr />
      </>
    )
  })

  function handleClick(){
    if (isSubmited) {
      setIsSubmited(false)
      setQuizState(false)
  } else {
      setIsSubmited(true)
    }
  }
  /* Logic to calculate the score */
  React.useEffect(() => {
    setScore(0)
    if(isSubmited){
      quiz.map(question => {
        if(localStorage.getItem(question.question) === question.correct_answer){
          setScore(prevScore => prevScore + 1)
        }
      })
    }
  }, [isSubmited, quiz])

  return(
    <div className="container">
      {
        !quizState ?
        <div className="quizzical">
          <h1 className="text">Quizzical</h1>
          <p className="text">Test your computer cience knowledge here</p>
          <button className="btn buttton-text" onClick={() => setQuizState(true)}>Start quiz</button>
        </div>
        :
        <div className="quizzical-questions">
          <h1 className="title center">read carefully and choose the correct option</h1>
          {quiz_Elements}
          {
            !isSubmited ? 
              <button className="btn" onClick={handleClick}>Check Answers</button>
              :
              <div className="play-again">
                <p className="text">You scored {score}/5 correct answers</p>
                <button className="btn btn-small" onClick={handleClick}>Play again</button>
              </div>
          }
        </div>
      }
    </div>
  )
}