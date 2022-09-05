import React from "react"

export default function Question(props){
  return(
    <div className="question">
        <h1 className="title text">{props.question}</h1>
        <div className="options">
          <span className="option button-text">Adios</span>
          <span className="option button-text">Hola</span>
          <span className="option button-text">Au Revoir</span>
          <span className="option button-text">Salir</span>
      </div>
    </div>
  )
}