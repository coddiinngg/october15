import { useState } from 'react';
import './App.css';
import Box from './component/Box';


const choice = {
  rock: {
    name: "Rock",
    img: "https://image.auction.co.kr/itemimage/28/65/8e/28658ea5e6.jpg"
  },
  paper: {
    name: "Paper",
    img: "https://cdn11.bigcommerce.com/s-2i5mq6440u/images/stencil/original/products/3762/9095/PlasticPaper-CutSheet__18809.1597757191.png?c=2"
  },
  scissors: {
    name: "Scissors",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyG7eEIGl7VLwrRpoBQY-X68kgPt8bN2MtgQ&s"
  }
}
function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");

  const play = (item) => {
    setUserSelect(choice[item])
    let computerChoice = randomChoice() // 그냥 let computerChoice 안만들고 바로 함수 넣었더니 결과가 한박자씩 늦게 나옴 // 
    setComputerSelect(computerChoice)
    setResult(judgeMent(choice[item], computerChoice))
  }

  const judgeMent = (user, computer) => {
    if (user.name === computer.name) {
      return "tie"
    } else if (user.name === "Rock") return computer.name === "Scissors" ? "win" : "lose"
    else if (user.name === "Scissors") return computer.name === "Paper" ? "win" : "lose"
    else if (user.name === "Paper") return computer.name === "Rock" ? "win" : "lose"
  }

  const randomChoice = () => {
    let itemArray = Object.keys(choice)
    let randomNum = Math.random();
    let choiceNum = Math.floor(randomNum * itemArray.length)
    let item = itemArray[choiceNum]
    return choice[item]
  }

  return (
    <div>
      <div className='container'>
        <Box title={"You"} item={userSelect} result={result}/>
        <Box title={"Computer"} item={computerSelect} result={result}/>

      </div>
      <div className='container'>
        <button onClick={() => { play("rock") }}>Rock</button>
        <button onClick={() => { play("paper") }}>Paper</button>
        <button onClick={() => { play("scissors") }}>Scissors</button>
      </div>
    </div>
  );
}

export default App;
