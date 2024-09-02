import { useState } from 'react';
import '../styles/SelectProfile.css';
import ProfileDetails from './ProfileDetails';
import Icon from '@mdi/react';
import {
  mdiArrowLeftThin,
  mdiClockOutline,
  mdiEye,
  mdiPlus,
  mdiTrashCan,
} from '@mdi/js';
import dateFormat from 'dateformat';
import CVPreview from './CVPreview';

function SelectProfile({
  onClose,
  defaultProfiles,
  onUpdateProfile,
  onCreateProfile,
  onDeleteProfile,
}) {
  const [openProfileDetails, setOpenProfileDetails] = useState(false);
  const [openCVPreview, setOpenCVPreview] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(1);

  function handlePreviewProfile(id) {
    setActiveProfileId(id);
    setOpenCVPreview(true);
  }

  function handleEditProfile(id) {
    setActiveProfileId(id);
    setOpenProfileDetails(true);
  }

  function handleProfileUpdate(updatedProfile) {
    onUpdateProfile(updatedProfile);
  }

  function handleProfileDelete(profileId) {
    onDeleteProfile(profileId);
  }

  function handleCreateProfile() {
    const profileId = onCreateProfile();
    setActiveProfileId(profileId);
    setOpenProfileDetails(true);
  }

  function handlePersonalDetailsEdit(profile, updatedPersonalDetails) {
    const updatedProfile = {
      ...profile,
      personal_details: { ...updatedPersonalDetails },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
  }

  function handleExperienceCreate(profile) {
    const experienceIds = profile.work_experience.work_experiences.map(
      (experience) => {
        return experience.id;
      },
    );

    const maxId = Math.max(...experienceIds);

    const newExperience = {
      company_name: '',
      job_title: '',
      job_description: '',
      id: maxId + 1,
    };

    const updatedProfile = {
      ...profile,
      work_experience: {
        ...profile.work_experience,
        work_experiences: [
          ...profile.work_experience.work_experiences,
          newExperience,
        ],
      },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
    return maxId + 1;
  }

  function handleExperienceDetailsUpdate(profile, updatedExperienceDetails) {
    const updatedProfile = {
      ...profile,
      work_experience: {
        ...profile.work_experience,
        work_experiences: profile.work_experience.work_experiences.map(
          (exp) => {
            if (exp.id === updatedExperienceDetails.id) {
              return {
                ...exp,
                ...updatedExperienceDetails,
              };
            } else {
              return exp;
            }
          },
        ),
      },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
  }

  function handleExperienceDelete(profile, experienceId) {
    const updatedProfile = {
      ...profile,
      work_experience: {
        ...profile.work_experience,
        work_experiences: profile.work_experience.work_experiences.filter(
          (exp) => {
            return exp.id !== experienceId;
          },
        ),
      },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
  }

  function handleEducationExperienceCreate(profile) {
    const experienceIds =
      profile.educational_experience.educations_experiences.map(
        (experience) => {
          return experience.id;
        },
      );

    const maxId = Math.max(...experienceIds);

    const newEducationExperience = {
      study_title: '',
      date_started: '',
      still_in_study: false,
      school_name: '',
      id: maxId + 1,
      date_ended: '',
    };

    const updatedProfile = {
      ...profile,
      educational_experience: {
        ...profile.educational_experience,
        educations_experiences: [
          ...profile.educational_experience.educations_experiences,
          newEducationExperience,
        ],
      },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
    return maxId + 1;
  }

  function handleEducationExperienceDetailsUpdate(
    profile,
    updatedEducationExperienceDetails,
  ) {
    const updatedProfile = {
      ...profile,
      educational_experience: {
        ...profile.educational_experience,
        educations_experiences:
          profile.educational_experience.educations_experiences.map((exp) => {
            if (exp.id === updatedEducationExperienceDetails.id) {
              return {
                ...exp,
                ...updatedEducationExperienceDetails,
              };
            } else {
              return exp;
            }
          }),
      },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
  }

  function handleEducationExperienceDelete(profile, experienceId) {
    const updatedProfile = {
      ...profile,
      educational_experience: {
        ...profile.educational_experience,
        educations_experiences:
          profile.educational_experience.educations_experiences.filter(
            (exp) => {
              return exp.id !== experienceId;
            },
          ),
      },
      last_edited: dateFormat(),
    };

    handleProfileUpdate(updatedProfile);
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
          onUpdateExperienceDetails={handleExperienceDetailsUpdate}
          onCreateExperience={handleExperienceCreate}
          onDeleteExperience={handleExperienceDelete}
          onCreateEducationExperience={handleEducationExperienceCreate}
          onDeleteEducationExperience={handleEducationExperienceDelete}
          onUpdateEducationDetails={handleEducationExperienceDetailsUpdate}
        />
      </>
    );
  }

  function handleOpenProfilePreview(profile) {
    return (
      <CVPreview
        profile_details={profile}
        onClose={() => {
          setOpenCVPreview(false);
        }}
      />
    );
  }

  if (openProfileDetails) {
    const [activeProfile] = defaultProfiles.filter(
      (profile) => profile.id === activeProfileId,
    );

    return handleOpenProfileDetails(activeProfile);
  }

  if (openCVPreview) {
    const [activeProfile] = defaultProfiles.filter(
      (profile) => profile.id === activeProfileId,
    );

    return handleOpenProfilePreview(activeProfile);
  }

  return (
    <div className='d-flex__col gap_2r padding_2r'>
      <header className='d-flex__row justify-content__space-around align-items__center'>
        <button
          type='button'
          className='btn d-flex__row align-items__center gap_1r btn-icon'
          onClick={onClose}
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
          {defaultProfiles.map((profile, index) => {
            const { personal_details } = profile;
            return (
              <li key={profile.id}>
                <div className='profile-card d-flex__col gap_2r padding_2r'>
                  <header className='d-flex__row gap_1r align-items__center padding_1r justify-content__space-between'>
                    <h1>Profile {index + 1}</h1>

                    <button
                      type='button'
                      className='btn d-flex__row align-items__center gap_1r'
                      onClick={() => {
                        handleProfileDelete(profile.id);
                      }}
                      title='Delete Profile'
                    >
                      <span className='icon-container'>
                        <Icon path={mdiTrashCan} size={2} />
                      </span>
                    </button>
                  </header>

                  <div className='profile-details d-flex__col  gap_1r'>
                    <p>{personal_details.fullName}</p>
                    <p>{personal_details.emailAddress}</p>
                    <p className='last-edited justify-content__flex-end d-flex__row gap_1r align-items__center'>
                      <Icon path={mdiClockOutline} size={1} />
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

                    <button
                      type='button'
                      className='btn d-flex__row align-items__center gap_1r btn-icon'
                      onClick={() => {
                        handlePreviewProfile(profile.id);
                      }}
                    >
                      <span className='icon-container'>
                        <Icon path={mdiEye} size={2} />
                      </span>
                      <span className='icon-text'>View CV</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SelectProfile;
