import React, { useEffect, useState } from 'react';
import './Quiz.css';
import Confirmation from './Confirmation';

const Quiz = ({ data, setScreen, setResultData, resultData }) => {
  const [remainingTime, setRemainingTime] = useState();

  const [qsolved, setQsolved] = useState([]);
  const [qno, setQno] = useState(0);
  const [qdata, setQdata] = useState({
    description: '',
    options: [{ id: 0, description: '' }],
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState('');

  const [openModal, setOpenModal] = useState(false);

  function isSolved(val) {
    for (let i = 0; i < qsolved.length; i++) {
      if (qsolved[i].qno === val) {
        return qsolved[i];
      }
    }
    return {
      selected: null,
      correct: '',
    };
  }

  function changeQuestion(direction) {
    let val = qno;
    if (direction === 'Next') {
      if (val < data.questions_count - 1) {
        val += 1;
        setQno(val);
        setQdata(data.questions[val]);
      }
    } else {
      if (val > 0) {
        val -= 1;
        setQno(val);
        setQdata(data.questions[val]);
      }
    }

    const submitted = isSolved(val);
    setSelectedOption(submitted.selected);
    setCorrectOption(submitted.correct);
  }

  function handleAnswer(index) {
    if (!selectedOption) {
      setSelectedOption(index);
      let correct = '';
      qdata.options.forEach(item => {
        if (item.is_correct) {
          correct = item.description;
          setCorrectOption(correct);
        }
      });
      setQsolved(prev => [
        ...prev,
        { qno: qno, selected: index, correct: correct },
      ]);
    }
  }

  function handleSubmit() {
    setOpenModal(true);
    confirmSubmit();
  }

  function confirmSubmit() {
    let correct = 0;
    let incorrect = 0;
    qsolved.forEach(item => {
      const question = data.questions[item.qno];
      const option = question.options[item.selected];
      if (option.is_correct) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    let score = correct - incorrect;
    setResultData({
      count: data.questions_count,
      correct: correct,
      incorrect: incorrect,
      score: score,
      total_time: data.duration * 60,
      remaining_time: remainingTime,
    });
  }

  useEffect(() => {
    setRemainingTime(data.duration * 60);
    const myInterval = setInterval(
      () => setRemainingTime(prev => prev - 1),
      1000
    );

    if (data.questions.length > 0) {
      setQdata(data.questions[qno]);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <div className="quiz">
      <div className="quiz-timer">
        <p>
          {Math.floor(remainingTime / 60)}:{remainingTime % 60}{' '}
        </p>
      </div>

      <div className="quiz-card">
        <h3>{qdata.description}</h3>
        {qdata.options.map((item, idx) => (
          <p
            key={item.id}
            onClick={() => handleAnswer(idx)}
            style={
              selectedOption === idx
                ? item.is_correct
                  ? { background: '#42c68d' }
                  : { background: '#fa1111' }
                : {}
            }
          >
            {item.description}
          </p>
        ))}
        <div style={correctOption ? { display: 'block' } : {}}>
          Correct answer is: {correctOption}
        </div>
      </div>

      <div className="quiz-footer">
        <button
          onClick={() => changeQuestion('Prev')}
          style={qno === 0 ? { visibility: 'hidden' } : {}}
        >
          Previous
        </button>
        <p>
          {qno + 1}/{data.questions_count}
        </p>
        {qno < data.questions_count - 1 ? (
          <button onClick={() => changeQuestion('Next')}>Next</button>
        ) : (
          <button onClick={() => handleSubmit()}>Submit</button>
        )}
      </div>
      <Confirmation
        openModal={openModal}
        setOpenModal={setOpenModal}
        setScreen={setScreen}
        resultData={resultData}
      />
    </div>
  );
};

export default Quiz;
