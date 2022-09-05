import React from "react"
import "./App.css"
import Question from "../Components/Question"

export default function App() {
  const [quizState, setQuizState] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(data => setQuestions(data.results))
  },[])
  console.log(questions)
  const quiz = questions.map(question => {
    return (<Question question={question.question}/>)
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
          {quiz}
        </div>
      }
    </div>
  )
}