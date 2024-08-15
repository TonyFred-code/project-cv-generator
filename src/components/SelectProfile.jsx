import { useState } from 'react';
import BackIconSrc from '/close.svg';
import EditIconSrc from '/square-edit-outline.svg';
import '../styles/SelectProfile.css';

import Modal from './UnderDevelopment';
const defaultProfile = [
  {
    firstName: 'Doe',
    lastName: 'John',
    lastEdited: Date.now(),
    emailAddress: 'johndoe@mail.com',
    id: 1,
  },

  {
    firstName: 'Doe',
    lastName: 'John',
    lastEdited: Date.now(),
    emailAddress: 'johndoe@mail.com',
    id: 2,
  },
];

function SelectProfile({ onClose }) {
  const [underDevModalOpen, setUnderDevModalOpen] = useState(false);
  const [profiles, setProfiles] = useState(defaultProfile);

  function toggleDialog() {
    setUnderDevModalOpen(!underDevModalOpen);
  }

  return (
    <div className='d-flex__col gap_2r padding_2r'>
      <header className='d-flex__row justify-content__space-around align-items__center'>
        <button
          type='button'
          className='btn btn-icon'
          onClick={() => {
            onClose();
          }}
        >
          <span className='icon-container'>
            <img src={BackIconSrc} alt='' />
          </span>
          <span className='icon-text'>Back</span>
        </button>
        <h1 className='text-transform__capitalize'>Select Profile</h1>
        <button
          type='button'
          className='btn btn-icon'
          onClick={() => {
            toggleDialog();
          }}
        >
          <span className='icon-container'>
            <img src={EditIconSrc} alt='' />
          </span>
          <span className='icon-text'>Create Profile</span>
        </button>
      </header>
      <div>
        <ul className='gap_2r profiles-container'>
          {profiles.map((profile) => {
            return (
              <li key={profile.id}>
                <div className='profile-card d-flex__col gap_2r padding_2r'>
                  <div className='profile-details d-flex__col gap_1r'>
                    <p>{profile.firstName + ' ' + profile.lastName}</p>
                    <p>{profile.emailAddress}</p>
                    <p className='last-edited text-align__right'>
                      <span>{profile.lastEdited}</span>
                    </p>
                  </div>
                  <div className='btn-group d-flex__row gap_2r justify-content__space-around'>
                    <button type='button' className='btn'>
                      <span>Edit</span>
                    </button>

                    <button type='button' className='btn'>
                      <span>View CV</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal isOpen={underDevModalOpen} onClose={toggleDialog}>
        <h1 className='text-transform__capitalize'>
          Feature Under Development
        </h1>
      </Modal>
    </div>
  );
}

export default SelectProfile;
