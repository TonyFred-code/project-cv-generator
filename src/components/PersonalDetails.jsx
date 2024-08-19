import { useState } from 'react';
import BackIconSrc from '/close.svg';
import '../styles/PersonalDetails.css';

function PersonalDetails({
  personal_details,
  onUpdatePersonalDetails,
  onClose,
}) {
  const [activeTabId, setActiveTabId] = useState(1);

  const { fullName, emailAddress, phoneNumber, homeAddress } = personal_details;

  function handleFormSubmit(e) {
    e.preventDefault();

    const { elements } = e.target;

    const newFullNameValue = elements.full_name.value;
    const newEmailValue = elements.email.value;
    const newAddressValue = elements.address.value;
    const newPhoneNumberValue = elements.phone_number.value;

    const newPersonalDetails = {
      ...personal_details,
      fullName: newFullNameValue,
      emailAddress: newEmailValue,
      homeAddress: newAddressValue,
      phoneNumber: newPhoneNumberValue,
    };

    onUpdatePersonalDetails(newPersonalDetails);
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
            <img src={BackIconSrc} alt='' />
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
            <form
              onSubmit={handleFormSubmit}
              id='personal_details_form'
              autoComplete='true'
              autoCorrect='true'
              className='d-flex__col gap_2r'
            >
              <div className='form-row d-flex__col gap_1r'>
                <label htmlFor='full_name'>Full Name</label>
                <input
                  required
                  type='text'
                  defaultValue={fullName}
                  name='full_name'
                  id='full_name'
                />
              </div>

              <div className='form-row d-flex__col gap_1r'>
                <label htmlFor='address'>Address</label>
                <textarea
                  rows={5}
                  cols={30}
                  required
                  name='address'
                  id='address'
                  defaultValue={homeAddress}
                ></textarea>
              </div>

              <div className='form-row d-flex__col gap_1r'>
                <label htmlFor='email'>Email</label>
                <input
                  required
                  type='email'
                  name='email'
                  defaultValue={emailAddress}
                  id='email'
                />
              </div>

              <div className='form-row d-flex__col gap_1r'>
                <label htmlFor='phone_number'>Phone Number</label>
                <input
                  type='tel'
                  required
                  name='phone_number'
                  defaultValue={phoneNumber}
                  id='phone_number'
                />
              </div>
            </form>
          ) : (
            <div> Personal Details Help</div>
          )}
        </div>
      </div>

      <footer className='d-flex__col'>
        <button type='submit' form='personal_details_form' className='btn'>
          Save Changes
        </button>
      </footer>
    </div>
  );
}

export default PersonalDetails;
