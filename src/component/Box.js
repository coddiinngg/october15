import React from 'react'

const Box = (props) => {
    let result;
    if(props.title === "Computer" && props.result!="tie" && props.result!=""){
        result = props.result ==="win"? "lose" : "win" // 이거 lose 일때는 어떻게 되는거지 생각했는데 result에 win or lose 만 들어옴 tie는 위에서 배재했음. win이면 lose로 : lose면 win으로 당연히 변환됨 .
    } else{
        result = props.result
    }
  return (
    <div className={`box ${result}`}>
    <h1>{props.title}</h1>
    <h2>{props.item && props.item.name}</h2>
    <img className='img-class' src={props.item && props.item.img}/>
    <h2>{result}</h2>
  </div>
  )
}

export default Box