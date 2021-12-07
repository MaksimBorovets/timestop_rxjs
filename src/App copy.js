import React from "react";
import styled from "styled-components";

function App() {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <Timers>
      <h2>Секундомер</h2>
      <Display>
        <span>{("0" + Math.floor((time / (60000 * 60)) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </Display>
      <Buttons>
        <button onClick={() => setTimerOn(true)}>Start</button>

        <button onClick={() => setTimerOn(false)}>Stop</button>

        <button onClick={() => setTime(0)}>Reset</button>

        <button onClick={() => setTimerOn(true)}>Resume</button>
      </Buttons>
    </Timers>
  );
}

export default App;

const Timers = styled.div`
  width: 180px;
  margin: 0 auto;
  text-align: center;
`;

const Display = styled.div`
  margin-bottom: 20px;

  span {
    font-size: 36px;
  }
`;

const Buttons = styled.div`
  button {
    font-size: 16px;
    background-color: rgb(217, 60, 35);
    color: #fff;
    border-radius: 8px;
    border: none;
    padding: 6px 12px;
    cursor: pointer;

    button:hover {
      background-color: rgb(173, 47, 28);
    }

    button:active {
      background-color: rgb(130, 35, 21);
    }
    button:focus {
      outline: 0;
    }
  }
`;
