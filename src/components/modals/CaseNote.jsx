import React, { useState } from 'react';
import CardShadow from '../../components/CardShadow';
import { Input, Form, Button, Switch } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { axiosWithAuth } from '../../api/axiosWithAuth';

// Used for CRUD operations on case notes.

const { TextArea } = Input;

const CaseNote = ({ note, setNotes, setCurrentNote, toggleModal }) => {
  const [checked, setChecked] = useState(false);
  const [formValues, setFormValues] = useState({ ...note });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosWithAuth().delete(`/notes/${note.id}`);
      setNotes(prevState =>
        prevState.filter(el => {
          if (!(el.id == note.id)) return el;
        })
      );
      toggleModal();
    } catch (error) {
      alert('error');
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFinish = e => {
    e.preventDefault();
    const newNote = {
      content: formValues.content,
      subject: formValues.subject,
      shareable: !checked,
    };

    setCurrentNote({ ...note, newNote });
    axiosWithAuth()
      .put(`/notes/${note.id}`, newNote)
      .then(res => {
        setNotes(prevState =>
          prevState.map(el => {
            if (el.id == note.id) {
              return res.data.note;
            }
            return el;
          })
        );
        toggleEditing();
      })
      .catch(err => {
        alert('error');
        console.log(err.response);
      });
  };

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const toggleChecked = checked => {
    setChecked(checked);
  };

  return (
    <CardShadow onClick={toggleModal}>
      <div className="case-notes-container">
        <div className="case-notes" onClick={e => e.stopPropagation()}>
          <div className="case-modal-actions-container">
            <div className="back">Back</div>
            <div className="case-modal-actions">
              {isEditing ? (
                <p onClick={toggleEditing}>Cancel</p>
              ) : (
                <p onClick={toggleEditing}>Edit</p>
              )}
              <p onClick={handleDelete}>Delete</p>
            </div>
          </div>
          {isEditing ? (
            <div>
              <div className="case-notes-switch">
                <Switch
                  onChange={toggleChecked}
                  checkedChildren="Private"
                  unCheckedChildren="Public"
                ></Switch>
              </div>
              <form className="case-notes-form" onSubmit={handleFinish}>
                <Input
                  name="subject"
                  onChange={handleChange}
                  value={formValues.subject}
                  size="large"
                  placeholder="Subject"
                />
                <TextArea
                  name="content"
                  onChange={handleChange}
                  value={formValues.content}
                  showCount
                  maxLength="256"
                  placeholder="Content"
                  autoSize={{ minRows: 4, maxRows: 10 }}
                ></TextArea>
                <Button htmlType="submit">Submit</Button>
              </form>
            </div>
          ) : (
            <div>
              <h1>{formValues.subject}</h1>
              <p>{formValues.content}</p>
            </div>
          )}
        </div>
      </div>
    </CardShadow>
  );
};

export default CaseNote;
