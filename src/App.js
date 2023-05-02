import './App.css';
import MyCalendar from './MyCalendar/MyCalendar';
import * as React from 'react'
import { Reset } from 'styled-reset'
import EventInsert from './Slide/EventInsert';
import SlideTemplate from './Slide/SlideTemplate';


function App() {

  return (
    <div className="App">
        <React.Fragment>
          <Reset />
          <SlideTemplate />
          {/* <TodoTemplate>
              <TodoInsert />
              <TodoList todos={todos}/>
          </TodoTemplate> */}
          <MyCalendar />
        </React.Fragment>
    </div>
  );
}

export default App;
