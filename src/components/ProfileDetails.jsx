import BackIconSrc from '/close.svg';
import '../styles/ProfileDetails.css';
import { useState } from 'react';
import PersonalDetails from './PersonalDetails';

function ProfileDetails({
  profileDetails,
  onUpdatePersonalDetails,
  handlePageClose,
  onProfileCreate,
}) {
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
  const [experienceDetailsOpen, setExperienceDetailsOpen] = useState(false);
  const [educationDetailsOpen, setEducationDetailsOpen] = useState(false);

  // console.log(JSON.stringify(profileDetails));
  const { personal_details, work_experience, educational_experience } =
    profileDetails;

  function handlePersonalDetailsUpdate(updatedPersonalDetails) {
    onUpdatePersonalDetails(profileDetails, updatedPersonalDetails);
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

  // if (experienceDetailsOpen) {
  //   return null;
  // }

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
            <img src={BackIconSrc} alt='' />
          </span>
          <span className='icon-text'>Back</span>
        </button>
        <h1 className='profile-page-title'>Profile</h1>
        <button className='btn'>
          <span>View CV</span>
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
