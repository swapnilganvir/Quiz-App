import React from 'react';
import './Result.css';
import {
  TrophyIcon,
  MedalIcon,
  RocketIcon,
  MeterIcon,
  TargetIcon,
} from '../assets/MyIcons';

const Result = ({ resultData }) => {
  return (
    <div className="result">
      <div className="result-msg">
        <div>
          <MedalIcon fillColor="#fca900" size={60} />
        </div>
        <div>
          <h2>Congratulations!</h2>
          <p>You are doing better than 70% students</p>
        </div>
        <div>
          <h3>⭐ Topic Rank - #308</h3>{' '}
        </div>
      </div>
      <div className="result-scores">
        <div>
          <div>
            <div className="icon">
              <TargetIcon fillColor="#685dd7" />
            </div>
            <div
              className="result-stat"
              style={{ background: 'linear-gradient(#9486ff, #6a5cd5)' }}
            >
              <p>
                {Math.floor((resultData.correct / resultData.count) * 100)} %
              </p>
              <p>Acuuracy</p>
            </div>
            <p className="questions">Questions: {resultData.count}</p>
          </div>

          <div>
            <div className="icon">
              <RocketIcon fillColor="#0aa490" />
            </div>
            <div
              className="result-stat"
              style={{ background: 'linear-gradient(#16edd7, #0aa490)' }}
            >
              <p>
                {Math.ceil(
                  (resultData.remaining_time / resultData.total_time) * 100
                )}
              </p>
              <p>Speed</p>
            </div>
            <p className="questions">Correct: {resultData.correct}</p>
          </div>

          <div>
            <div className="icon">
              <MeterIcon fillColor="#fb3032" />
            </div>
            <div
              className="result-stat"
              style={{ background: 'linear-gradient(#ff7473, #fb3032)' }}
            >
              <p>{resultData.score}</p>
              <p>Total Score</p>
            </div>
            <p className="questions">Incorrect: {resultData.incorrect}</p>
          </div>
        </div>
        <p>&copy; 2024 Testline. All right reserved</p>
      </div>
    </div>
  );
};

export default Result;
