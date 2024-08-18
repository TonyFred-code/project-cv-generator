import { useState } from 'react';
import BackIconSrc from '/close.svg';
import EditIconSrc from '/square-edit-outline.svg';
import '../styles/SelectProfile.css';

import Modal from './UnderDevelopment';
import ProfileDetails from './ProfileDetails';
const defaultProfile = [
  {
    profile_description: {
      fullName: 'John Doe',
      lastEdited: Date.now(),
      emailAddress: 'johndoe@gmail.com',
    },

    personal_details: {
      title: 'Personal Details',
      fullName: 'John Doe',
      emailAddress: 'johndoe@gmail.com',
      homeAddress: '0, somewhere off some road, Some Country',
      phoneNumber: '+2341234567890',
      section_name: 'personal_details',
    },

    educational_experience: {
      title: 'Educational Experience',
      section_name: 'educational_experience',
      educations_experiences: [
        {
          course: 'Computer Science',
          degree: 'B.Tech',
          yearStarted: 'some date',
          stillActive: true,
          school: 'Federal University of Technology, Akure',
          experience_id: 1,
          yearEnded: 'some date',
        },

        {
          course: 'Computer Science',
          degree: 'B.Tech',
          yearStarted: 'some date',
          yearEnded: 'some date',
          stillActive: true,
          school: 'Federal University of Technology, Akure',
          experience_id: 2,
        },
      ],
    },

    id: 1,
  },

  {
    profile_description: {
      fullName: 'John Doe',
      lastEdited: Date.now(),
      emailAddress: 'johndoe@gmail.com',
    },

    personal_details: {
      title: 'Personal Details',
      fullName: 'John Doe',
      emailAddress: 'johndoe@gmail.com',
      homeAddress: '0, somewhere off some road, Some Country',
      phoneNumber: '+2341234567890',
      section_name: 'personal_details',
    },

    id: 2,
  },
];

function SelectProfile({ onClose }) {
  const [underDevModalOpen, setUnderDevModalOpen] = useState(false);
  const [profiles, setProfiles] = useState(defaultProfile);
  const [openProfileDetails, setOpenProfileDetails] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(1);
  const [openCreateProfile, setOpenCreateProfile] = useState(false);

  function toggleDialog() {
    setUnderDevModalOpen(!underDevModalOpen);
  }

  function handleEditProfile(id) {
    setActiveProfileId(id);
    setOpenProfileDetails(true);
    setOpenCreateProfile(false);
  }

  function handleCreateProfile() {
    setOpenCreateProfile(true);
    setOpenProfileDetails(false);
  }

  function handleProfileCreate(profile) {
    setProfiles([...profiles, profile]);
  }

  function handleOpenProfileDetails(profile) {
    return (
      <>
        <ProfileDetails
          profileDetails={profile}
          handlePageClose={() => {
            setOpenProfileDetails(false);
            setOpenCreateProfile(false);
          }}
          onProfileCreate={handleProfileCreate}
        />
      </>
    );
  }

  if (openCreateProfile) {
    const profile = {
      profile_description: {
        fullName: '',
        lastEdited: null,
        emailAddress: '',
      },
      personal_details: {
        title: 'Personal Details',
        fullName: '',
        emailAddress: '',
        homeAddress: '',
        phoneNumber: '',
      },
    };

    return handleOpenProfileDetails(profile);
  }

  if (openProfileDetails) {
    const [activeProfile] = profiles.filter(
      (profile) => profile.id === activeProfileId,
    );

    return handleOpenProfileDetails(activeProfile);
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
        <h1 className='text-transform__capitalize'>select profile</h1>
        <button
          type='button'
          className='btn btn-icon'
          onClick={() => {
            handleCreateProfile();
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
            const { profile_description } = profile;
            return (
              <li key={profile.id}>
                <div className='profile-card d-flex__col gap_2r padding_2r'>
                  <div className='profile-details d-flex__col gap_1r'>
                    <p>{profile_description.fullName}</p>
                    <p>{profile_description.emailAddress}</p>
                    <p className='last-edited text-align__right'>
                      <span>{profile_description.lastEdited}</span>
                    </p>
                  </div>
                  <div className='btn-group d-flex__row gap_2r justify-content__space-around'>
                    <button
                      type='button'
                      className='btn'
                      onClick={() => {
                        handleEditProfile(profile.id);
                      }}
                    >
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
