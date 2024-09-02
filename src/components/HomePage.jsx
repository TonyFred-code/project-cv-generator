import { useState } from 'react';
import SelectProfile from './SelectProfile';
import Icon from '@mdi/react';
import { mdiSquareEditOutline } from '@mdi/js';
import dateFormat from 'dateformat';

import default_profiles from '../../data/profiles.json';

function HomePage() {
  const [selectProfileOpen, setSelectProfileOpen] = useState(false);
  const [profiles, setProfiles] = useState(
    default_profiles.map((profile) => {
      return {
        ...profile,
        last_edited: dateFormat(),
      };
    }),
  );

  function handleProfileUpdate(updatedProfile) {
    const updatedProfiles = profiles.map((p) => {
      if (p.id === updatedProfile.id) {
        return updatedProfile;
      } else {
        return p;
      }
    });

    setProfiles(updatedProfiles);
  }

  function handleProfileDelete(profileId) {
    const newProfiles = profiles.filter((p) => p.id !== profileId);

    setProfiles(newProfiles);
  }

  function handleProfileCreate() {
    const profileIds = profiles.map((p) => {
      return p.id;
    });

    const maxId = Math.max(...profileIds);

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
        work_experiences: [],
      },

      educational_experience: {
        title: 'Educational Experience',
        section_name: 'educational_experience',
        educations_experiences: [],
      },

      id: maxId + 1,
      last_edited: dateFormat(),
    };

    setProfiles([...profiles, profile]);
    return maxId + 1;
  }

  if (selectProfileOpen) {
    return (
      <>
        <SelectProfile
          onClose={() => {
            setSelectProfileOpen(false);
          }}
          defaultProfiles={profiles}
          onDeleteProfile={handleProfileDelete}
          onCreateProfile={handleProfileCreate}
          onUpdateProfile={handleProfileUpdate}
        />
      </>
    );
  }

  return (
    <div className='home-page d-flex__col align-items_-center justify-content__center gap_2r'>
      <h1 className='text-transform__capitalize text-align__center'>
        Intelligent CV
      </h1>
      <div className='btn-group d-flex__row gap_2r justify-content__center align-items__center'>
        <button
          type='button'
          className='btn d-flex__row gap_1r d-flex__row align-items__center'
          onClick={() => {
            setSelectProfileOpen(true);
          }}
        >
          <span className='icon-container'>
            {/* <img src={CreateIconSrc} alt='' /> */}
            <Icon path={mdiSquareEditOutline} size={2} />
          </span>
          <span className='icon-text'>Create</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
