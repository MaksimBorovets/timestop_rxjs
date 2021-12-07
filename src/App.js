import React from "react";
import styled from "styled-components";
import { fromEvent, Subject, interval} from 'rxjs'; 
import { map, buffer,takeUntil, filter, debounceTime } from 'rxjs/operators';

function App() {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);




  React.useEffect(() => {

      const stream$ = new Subject();

      interval(10)
        .pipe(takeUntil(stream$))
        .subscribe(() => {
          if (timerOn) {
            setTime(val => val + 10);
          } else if (!timerOn){
            stream$.next();
            stream$.complete();
          }
        });
      return () => {
        stream$.next();
        stream$.complete();
      };




  }, [timerOn]);



  React.useEffect(() => {
    const click$ = fromEvent(document.getElementById('double-click'), 'click');

    const doubleClick$ = click$
    .pipe(
      buffer(click$.pipe(debounceTime(300))),
      map(clicks => clicks.length),
      filter(clicksLength => clicksLength >= 2)
    );
    
  doubleClick$.subscribe(_ => {
      setTimerOn(false)
    })
  }, []);

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

        <button onClick={() => setTime(0) & setTimerOn(false)}>Stop</button>

        <button onClick={() => setTime(0) & setTimerOn(true)}>Reset</button>

        <button id="double-click">Wait</button>


      </Buttons>
    </Timers>
  );
}

export default App;

const Timers = styled.div`
  width: 580px;
  margin: 0 auto;
  text-align: center;
  justify-content: center;
`;

const Display = styled.div`
  margin-bottom: 20px;

  span {
    font-size: 36px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    margin-right: 5px;
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
  }
`;
