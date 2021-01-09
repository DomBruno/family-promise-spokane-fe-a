import { Card } from 'antd';
import React from 'react';
import CardShadow from '../CardShadow';
import { axiosWithAuth } from '../../api/axiosWithAuth';

// Handles the flagging of guests

const FlagGuest = ({ state, setState, setIsFlagOpen, guestId }) => {
  const handleModalClose = e => {
    setIsFlagOpen(false);
  };

  const handleChildClick = async e => {
    e.persist();
    e.stopPropagation();
    let newFlagLevel = String(e.target.value);

    setState(prevState => {
      const data = prevState.data;

      data.map(el => {
        if (el.id == guestId) {
          el.flag = newFlagLevel;
        }
        return el;
      });

      setIsFlagOpen(false);
      return { ...prevState, data };
    });

    try {
      await axiosWithAuth().put(`/members/${guestId}`, { flag: newFlagLevel });
    } catch (error) {
      alert('Unable to flag guest');
    }
  };

  return (
    <CardShadow onClick={handleModalClose}>
      <div className="flag-guest-container">
        <div className="flag-guest-option-container">
          <li
            value="1"
            onClick={handleChildClick}
            className="flag-guest-option"
          >
            Normal
          </li>
          <li
            value="2"
            onClick={handleChildClick}
            className="flag-guest-option"
          >
            Warning
          </li>
          <li
            value="3"
            onClick={handleChildClick}
            className="flag-guest-option"
          >
            Dangerous
          </li>
        </div>
      </div>
    </CardShadow>
  );
};

export default FlagGuest;
