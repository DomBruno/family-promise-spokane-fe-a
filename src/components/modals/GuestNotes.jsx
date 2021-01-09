import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CardShadow from '../CardShadow';
import { axiosWithAuth } from '../../api/axiosWithAuth';
import { useSelector } from 'react-redux';

// Used for displaying/attaching notes to individual members

const GuestNotes = ({ guestId, setIsNotesOpen }) => {
  const [noteValue, setNoteValue] = React.useState('');
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(state => state.CURRENT_USER);

  const fetchNotes = async id => {
    setLoading(true);
    try {
      const res = await axiosWithAuth().get(`/members/${id}/notes`);

      setNotes(res.data.notes);
    } catch (error) {
      alert('Unable to retrieve notes');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setNoteValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const noteBody = {
      author_id: user.id,
      content: noteValue,
    };

    setLoading(true);

    try {
      const res = await axiosWithAuth().post(
        `/members/${guestId}/notes`,
        noteBody
      );

      const note = res.data.note;

      setNotes([...notes, note]);

      setNoteValue('');
    } catch (error) {
      alert('Unable to add note');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(guestId);
  }, []);

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
          {loading && <h1>Loading..</h1>}
          <div className="notes-container-inner">
            <div className="notes">
              {notes.map(note => {
                return <h4 className="note">{note.content}</h4>;
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
