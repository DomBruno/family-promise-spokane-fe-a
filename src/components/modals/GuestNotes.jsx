import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CardShadow from '../CardShadow';

// Used for displaying/attaching notes to individual members

const GuestNotes = ({ guest, setIsNotesOpen }) => {
  const [noteValue, setNoteValue] = React.useState('');
  const [notes, setNotes] = React.useState([]);

  const handleChange = e => {
    setNoteValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setNotes([...notes, noteValue]);
  };

  return (
    <CardShadow
      onClick={e => {
        setIsNotesOpen(false);
      }}
    >
      <div className="container-note">
        <div className="notes-container" onClick={e => e.stopPropagation()}>
          <div className="close-notes">
            <ArrowBackIcon
              fontSize="large"
              onClick={() => setIsNotesOpen(false)}
            ></ArrowBackIcon>
          </div>
          <div className="notes-container-inner">
            <div className="notes">
              {notes.map(note => {
                return <h4 className="note">{note}</h4>;
              })}
            </div>
          </div>
          <div className="add-note-form-container">
            <form action="" className="add-note-form" onSubmit={handleSubmit}>
              <TextField
                value={noteValue}
                style={{ width: '100%' }}
                onChange={handleChange}
                multiline
                rows={4}
                label="Type anything you want here"
              >
                Add notes
              </TextField>
              <div onClick={handleSubmit}>
                <IconButton size="large">
                  <AddIcon />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CardShadow>
  );
};

export default GuestNotes;
