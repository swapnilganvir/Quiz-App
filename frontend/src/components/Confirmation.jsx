import React from 'react';
import './Confirmation.css';

const Confirmation = ({ openModal, setOpenModal, setScreen, resultData }) => {
  function handleSubmit() {
    setOpenModal(false);
    setScreen(3);
  }

  const questions_left =
    resultData.count - resultData.correct - resultData.incorrect;

  return (
    <div
      id="myModal"
      className="modal"
      style={openModal ? { display: 'block' } : {}}
    >
      <div className="modal-content">
        <div>
          <h3>Are you sure ?</h3>
        </div>
        <p>
          You have left {questions_left} questions, you can attempt them now or
          submit the quiz.
        </p>
        <div className="modal-btns">
          <button onClick={handleSubmit}>Submit Quiz</button>
          <button onClick={() => setOpenModal(false)}>Recheck</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
