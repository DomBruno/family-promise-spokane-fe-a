import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import LoadingComponent from '../../common/LoadingComponent';
import { useParams } from 'react-router-dom';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import { tableIcons } from '../../../utils/tableIcons';
import FlagIcon from '@material-ui/icons/Flag';
import CardShadow from '../../CardShadow';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from '../../modals/GuestNotes';
import { CopyrightOutlined } from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';

// Table that shows all family members

const FamilyMembers = () => {
  const history = useHistory();
  const params = useParams();
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [familyInfo, setFamilyInfo] = useState({});
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'relationship', field: 'relationship' },
    ],
    data: [],
  });

  const fetchFamilyInfo = async () => {
    try {
      const info = await axiosWithAuth()
        .get(`/families/${params.id}`)
        .then(res => res.data);

      setFamilyInfo(info);

      const data = await axiosWithAuth()
        .get(`/families/${params.id}/members`)
        .then(res => res.data);
      const formattedData = data.map(member => {
        return { ...member.demographics };
      });
      let copy = { ...state };
      copy.data.push(...formattedData);

      setState(copy);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyInfo();
  }, []);

  useEffect(() => {
    console.log(familyInfo);
  }, [familyInfo]);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="guest-table-container">
      <div className="guest-table">
        <MaterialTable
          options={{
            // Changes color of the row depending on their flag_level

            exportButton: true,
            rowStyle: rowData => ({
              backgroundColor:
                rowData.flag_level == 2
                  ? 'rgba(255, 255, 0, 0.419)'
                  : rowData.flag_level == 3
                  ? 'rgba(255, 0, 0, 0.418)'
                  : 'white',
            }),
          }}
          icons={tableIcons}
          title="Members"
          columns={state.columns}
          data={state.data}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: '0px 10px' }}>
                  <Button
                    onClick={() => history.push(`/families/${params.id}/notes`)}
                  >
                    Notes
                  </Button>
                  <Button
                    onClick={() => history.push(`/familyprofile/${params.id}`)}
                  >
                    Additional Information
                  </Button>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default FamilyMembers;
