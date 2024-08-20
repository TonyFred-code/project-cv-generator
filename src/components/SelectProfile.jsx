import { useState } from 'react';
import '../styles/SelectProfile.css';
import Modal from './UnderDevelopment';
import ProfileDetails from './ProfileDetails';
import Icon from '@mdi/react';
import { mdiArrowLeftThin, mdiPlus } from '@mdi/js';
import dateFormat from 'dateformat';

const defaultProfile = [
  {
    personal_details: {
      title: 'Personal Details',
      fullName: 'John Doe',
      emailAddress: 'johndoe@gmail.com',
      homeAddress: '0, somewhere off some road, Some Country',
      phoneNumber: '+2341234567890',
      section_name: 'personal_details',
    },

    work_experience: {
      title: 'Work Experience',
      section_name: 'work_experience',
      work_experiences: [{}, {}],
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
    last_edited: dateFormat(),
  },

  {
    personal_details: {
      title: 'Personal Details',
      fullName: 'John Doe',
      emailAddress: 'johndoe@gmail.com',
      homeAddress: '0, somewhere off some road, Some Country',
      phoneNumber: '+2341234567890',
      section_name: 'personal_details',
    },

    work_experience: {
      title: 'Work Experience',
      section_name: 'work_experience',
      work_experiences: [{}, {}],
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

    id: 2,
    last_edited: dateFormat(),
  },
];

let nextId = 3;

function SelectProfile({ onClose }) {
  const [underDevModalOpen, setUnderDevModalOpen] = useState(false);
  const [profiles, setProfiles] = useState(defaultProfile);
  const [openProfileDetails, setOpenProfileDetails] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(1);

  function toggleDialog() {
    setUnderDevModalOpen(!underDevModalOpen);
  }

  function handleEditProfile(id) {
    setActiveProfileId(id);
    setOpenProfileDetails(true);
  }

  function handleCreateProfile() {
    const profile = {
      personal_details: {
        title: 'Personal Details',
        fullName: '',
        emailAddress: '',
        homeAddress: '',
        phoneNumber: '',
        section_name: 'personal_details',
      },

      work_experience: {
        title: 'Work Experience',
        section_name: 'work_experience',
        work_experiences: [{}, {}],
      },

      educational_experience: {
        title: 'Educational Experience',
        section_name: 'educational_experience',
        educations_experiences: [
          {
            course: '',
            degree: '',
            yearStarted: '',
            stillActive: false,
            school: '',
            experience_id: 1,
            yearEnded: '',
          },
        ],
      },

      id: nextId++,
      last_edited: dateFormat(),
    };

    setActiveProfileId(profile.id);
    setOpenProfileDetails(true);
    setProfiles([...profiles, profile]);
  }

  function handlePersonalDetailsEdit(profile, updatedPersonalDetails) {
    const updatedProfile = {
      ...profile,
      personal_details: { ...updatedPersonalDetails },
      last_edited: dateFormat(),
    };

    const updatedProfiles = profiles.map((p) => {
      if (p.id === updatedProfile.id) {
        return updatedProfile;
      } else {
        return p;
      }
    });

    setProfiles(updatedProfiles);
    console.log(updatedProfiles);
  }

  function handleOpenProfileDetails(profile) {
    return (
      <>
        <ProfileDetails
          profileDetails={profile}
          handlePageClose={() => {
            setOpenProfileDetails(false);
          }}
          onUpdatePersonalDetails={handlePersonalDetailsEdit}
        />
      </>
    );
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
          className='btn d-flex__row align-items__center gap_1r btn-icon'
          onClick={() => {
            onClose();
          }}
        >
          <span className='icon-container'>
            <Icon path={mdiArrowLeftThin} size={3} />
          </span>
          <span className='icon-text'>Back</span>
        </button>
        <h1 className='text-transform__capitalize'>select profile</h1>
        <button
          type='button'
          className='btn d-flex__row align-items__center gap_1r btn-icon'
          onClick={handleCreateProfile}
        >
          <span className='icon-container'>
            <Icon path={mdiPlus} size={2} />
          </span>
          <span className='icon-text'>Create Profile</span>
        </button>
      </header>
      <div>
        <ul className='gap_2r profiles-container'>
          {profiles.map((profile) => {
            const { personal_details } = profile;
            return (
              <li key={profile.id}>
                <div className='profile-card d-flex__col gap_2r padding_2r'>
                  <div className='profile-details d-flex__col gap_1r'>
                    <p>{personal_details.fullName}</p>
                    <p>{personal_details.emailAddress}</p>
                    <p className='last-edited text-align__right'>
                      <span>{profile.last_edited}</span>
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
