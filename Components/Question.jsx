import React from "react"
import Option from "./Option"
import { nanoid } from "nanoid"

export default function Question(props){
  const [allAnswers, setAllAnswers] = React.useState([])
  const [chosen, setChosen] = React.useState(localStorage.getItem("chosenAnswer")|| "")
  /* Fazer a logica do arthur adaptada */
  function holdAnswer(event) {
    if (event.target.classList.contains("chosen")) {
        event.target.classList.remove("chosen");
    } else {
        let answers = event.target.parentNode.childNodes;
        answers.forEach((ans) => {
            ans.classList.remove("chosen");
        });
        event.target.classList.add("chosen");
        setChosen(event.target.outerText)
    }
  }

  React.useEffect(() => {
    setAllAnswers([props.correct_answer, ...props.incorrect_answers].sort())
  },[props.correct_answer, props.incorrect_answers])

  const options = allAnswers.map(answer => {
    return(
      <Option answer={answer} question={props.question} />
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