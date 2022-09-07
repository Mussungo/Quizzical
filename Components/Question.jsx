import React from "react"
import { nanoid } from "nanoid"

export default function Question(props){
  const [allAnswers, setAllAnswers] = React.useState([])
  const [chosen, setChosen] = React.useState(localStorage.getItem(props.question) || "")

  /*Hold the answer */
  function holdAnswer(event) {
    if (event.target.classList.contains("chosen")) {
        event.target.classList.remove("chosen")
    } else {
        let answers = event.target.parentNode.childNodes;
        answers.forEach((ans) => {
            ans.classList.remove("chosen")
        });
        event.target.classList.add("chosen")
        setChosen(event.target.outerText)
    }
  }

  /* On rendering update the localStorage */
  React.useEffect(() => {
    localStorage.setItem(props.question, chosen)
  })

  React.useEffect(() => {
    setAllAnswers([props.correct_answer, ...props.incorrect_answers].sort())
  },[props.correct_answer, props.incorrect_answers])

  const options = allAnswers.map(answer => {
    return(
      !props.isSubmited ? 
      <span key={nanoid()} className="option button-text" onClick={holdAnswer}>{answer}</span>
      :
      /* Logic for the correct and wrong answer */
      <span 
        key={nanoid()}
        className=
        {
          `
            option button-text opaccity
            ${props.correct_answer === answer ? "correct" : ""} 
            ${
              chosen == answer && props.incorrect_answers.some(ans => ans === chosen) ? "wrong" : ""
            }
          `
        }
        onClick={holdAnswer}
      >
        {answer}
      </span>
    )
  })

  return(
    <div className="question">
        <h1 className="title text">{props.question}</h1>
        <div className="options">
          {options}
        </div>
    </div>
  )
}