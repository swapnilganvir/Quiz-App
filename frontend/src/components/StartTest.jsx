import React, { useEffect, useState } from 'react';
import './StartTest.css';
// import axios from 'axios';

const StartTest = ({ data, setScreen }) => {
  return (
    <div className="start-test">
      <div className="start-test-top">
        <p>Duration {data.duration} min</p>
        <p>{data.title}</p>
        <p>{data.topic} </p>
      </div>
      <div className="start-test-bottom" onClick={() => setScreen(2)}>
        <a>Start Test</a>
      </div>
    </div>
  );
};

export default StartTest;
