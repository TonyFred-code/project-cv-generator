import '../styles/ProfileDetails.css';
import { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import ExperienceDetails from './ExperienceDetails';
import Icon from '@mdi/react';
import { mdiArrowLeftThin, mdiEye } from '@mdi/js';

function ProfileDetails({
  profileDetails,
  onUpdatePersonalDetails,
  onUpdateExperienceDetails,
  onCreateExperience,
  handlePageClose,
}) {
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
  const [experienceDetailsOpen, setExperienceDetailsOpen] = useState(false);
  const [educationDetailsOpen, setEducationDetailsOpen] = useState(false);

  const { personal_details, work_experience, educational_experience } =
    profileDetails;

  function handlePersonalDetailsUpdate(updatedPersonalDetails) {
    onUpdatePersonalDetails(profileDetails, updatedPersonalDetails);
  }

  function handleExperienceCreate() {
    return onCreateExperience(profileDetails);
  }

  function handleExperienceDetailsUpdate(updatedExperienceDetails) {
    onUpdateExperienceDetails(profileDetails, updatedExperienceDetails);
  }

  if (personalDetailsOpen) {
    return (
      <PersonalDetails
        personal_details={personal_details}
        onClose={() => {
          setPersonalDetailsOpen(false);
        }}
        onUpdatePersonalDetails={handlePersonalDetailsUpdate}
      />
    );
  }

  if (experienceDetailsOpen) {
    console.log(work_experience);

    return (
      <ExperienceDetails
        experience_details={work_experience.work_experiences}
        onClose={() => {
          setExperienceDetailsOpen(false);
        }}
        onUpdateExperienceDetails={handleExperienceDetailsUpdate}
        onExperienceCreate={handleExperienceCreate}
      />
    );
  }

  // if ()

  return (
    <div className='profile-details-container'>
      <header className='d-flex__row gap_2r padding_2r align-items__center justify-content__space-around'>
        <button
          type='button'
          className='btn btn-icon'
          onClick={() => {
            handlePageClose();
          }}
        >
          <span className='icon-container'>
            <Icon path={mdiArrowLeftThin} size={3} />
          </span>
          <span className='icon-text'>Back</span>
        </button>
        <h1 className='profile-page-title'>Profile</h1>
        <button className='btn btn-icon d-flex__row align-items__center gap_1r'>
          <span className='icon-container'>
            <Icon path={mdiEye} size={2} />
          </span>
          <span className='icon-text'>View CV</span>
        </button>
      </header>
      <div className='container'>
        <div className='padding_2r'>
          <ul className='profile-sections-container d-flex__col gap_2r padding_2r'>
            <li
              onClick={() => {
                setPersonalDetailsOpen(true);
              }}
            >
              <div className='section-tab padding_2r cursor__pointer'>
                {personal_details.title}
              </div>
            </li>

            <li
              onClick={() => {
                setEducationDetailsOpen(true);
              }}
            >
              <div className='section-tab padding_2r cursor__pointer'>
                {educational_experience.title}
              </div>
            </li>

            <li
              onClick={() => {
                setExperienceDetailsOpen(true);
              }}
            >
              <div className='section-tab padding_2r cursor__pointer'>
                {work_experience.title}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
