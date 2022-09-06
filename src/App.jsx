import React from "react"
import "./App.css"
import Question from "../Components/Question"
import { nanoid } from "nanoid"

export default function App() {
  const [quizState, setQuizState] = React.useState(false)
  const [quiz, setQuiz] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  const [isSubmited, setIsSubmited] = React.useState(true)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(data => setQuiz(data.results))
  },[])

  const quiz_Elements = quiz.map(question => {
    let id = nanoid()
    return (<Question key={id} id={id} question={question.question} correct_answer={question.correct_answer} incorrect_answers={question.incorrect_answers} isSubmited={isSubmited}/>)
  })
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
          {quiz_Elements}
          <button className="btn">Check Answers</button>
        </div>
      }
    </div>
  )
}