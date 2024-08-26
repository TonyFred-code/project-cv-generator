import { useRef, useState } from 'react';
import '../styles/PersonalDetails.css';
import Icon from '@mdi/react';
import { mdiArrowLeftThin } from '@mdi/js';
import PersonalDetailsForm from './PersonalDetailsForm';

function PersonalDetails({
  personal_details,
  onUpdatePersonalDetails,
  onClose,
}) {
  const [activeTabId, setActiveTabId] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null);

  const { fullName, emailAddress, phoneNumber, homeAddress } = personal_details;

  function handleFormSubmit(newPersonalDetails) {
    setEditMode(false);
    const updatedPersonalDetails = {
      ...personal_details,
      ...newPersonalDetails,
    };

    console.log(updatedPersonalDetails);

    onUpdatePersonalDetails(updatedPersonalDetails);
  }

  return (
    <div className='personal-details padding_2r d-flex__col gap_2r'>
      <header className='d-flex__row align-items__center'>
        <button
          type='button'
          className='btn btn-icon'
          onClick={() => {
            onClose();
          }}
        >
          <span className='icon-container'>
            <Icon path={mdiArrowLeftThin} size={3} />
          </span>
          <span className='icon-text'>Back</span>
        </button>
        <h1 className='text-transform__capitalize margin_lr_centering'>
          personal details
        </h1>
      </header>

      <div className='d-flex__col align gap_2r'>
        <div className='tab-area d-flex__row align-items__center justify-content__space-around padding_1r'>
          <button
            className={`personal_details_view_tab tab-btn btn ${
              activeTabId === 1 ? 'active' : ''
            }`}
            onClick={() => {
              setActiveTabId(1);
            }}
          >
            <span>Personal Details</span>
          </button>
          <button
            className={`help_view_tab tab-btn btn ${
              activeTabId === 2 ? 'active' : ''
            }`}
            onClick={() => {
              [setActiveTabId(2)];
            }}
          >
            <span>Help</span>
          </button>
        </div>

        <div className='active-tab-view'>
          {activeTabId === 1 ? (
            editMode ? (
              <PersonalDetailsForm
                onFormSubmit={handleFormSubmit}
                full_name={fullName}
                email_address={emailAddress}
                home_address={homeAddress}
                phone_number={phoneNumber}
                ref={formRef}
              />
            ) : (
              <div>
                <div className='detail d-flex__col gap_1r padding_1r'>
                  <p className='light-text'>Full Name</p>
                  <p className='padding-left_1r'>{fullName}</p>
                </div>
                <div className='detail d-flex__col gap_1r padding_1r'>
                  <p className='light-text'>Phone Number</p>
                  <p className='padding-left_1r'>{phoneNumber}</p>
                </div>
                <div className='detail d-flex__col gap_1r padding_1r'>
                  <p className='light-text'>Email Address</p>
                  <p className='padding-left_1r'>{emailAddress}</p>
                </div>
                <div className='detail d-flex__col gap_1r padding_1r'>
                  <p className='light-text'>Home Address</p>
                  <p className='padding-left_1r'>{homeAddress}</p>
                </div>
              </div>
            )
          ) : (
            <div className='container'>
              <ul className='d-flex__col gap_2r padding_2r align-items__center'>
                <li>
                  <p>
                    Personal Details include your contact information and other
                    personal information
                  </p>
                </li>
                <li>
                  <p>
                    Ensure to save any changes made to avoid changes being lost
                  </p>
                </li>
                <li>
                  <p>
                    Every field on the form is required for the profile to be
                    updated
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {activeTabId === 1 && (
        <footer className='d-flex__col'>
          {editMode ? (
            <button
              type='submit'
              onClick={() => {
                formRef.current.requestSubmit();
              }}
              className='btn'
            >
              Save Changes
            </button>
          ) : (
            <button
              type='button'
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit Details
            </button>
          )}
        </footer>
      )}
    </div>
  );
}

export default PersonalDetails;
