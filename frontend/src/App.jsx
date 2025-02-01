import React, { useState, useEffect } from 'react';
import './App.css';
import StartTest from './components/StartTest';
import Quiz from './components/Quiz';
import Result from './components/Result.jsx';
import { test_data } from './assets/asset.js';

const App = () => {
  const [screen, setScreen] = useState(1);
  const [resultData, setResultData] = useState({
    count: 1,
    correct: 0,
    incorrect: 0,
    score: 0,
    total_time: 1,
    remaining_time: 0,
  });
  const [data, setData] = useState({
    title: '',
    topic: '',
    duration: 10,
    negative_marks: 0,
    correct_answer_marks: 0,
    shuffle: false,
    show_answers: false,
    questions_count: 0,
    questions: [],
  });

  useEffect(() => {
    setData(test_data);
  }, []);

  return (
    <div
      className="container"
      style={
        screen === 2
          ? { background: 'rgb(72, 72, 255)' }
          : { background: '#fff' }
      }
    >
      {screen === 1 && <StartTest data={data} setScreen={setScreen} />}
      {screen === 2 && (
        <Quiz
          data={data}
          setScreen={setScreen}
          setResultData={setResultData}
          resultData={resultData}
        />
      )}
      {screen === 3 && <Result resultData={resultData} />}
    </div>
  );
};

export default App;
