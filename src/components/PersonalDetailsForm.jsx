import { forwardRef, useState } from 'react';

const PersonalDetailsForm = forwardRef(
  (
    { onFormSubmit, full_name, email_address, home_address, phone_number },
    ref,
  ) => {
    const [fullName, setFullName] = useState(full_name);
    const [emailAddress, setEmailAddress] = useState(email_address);
    const [homeAddress, setHomeAddress] = useState(home_address);
    const [phoneNumber, setPhoneNumber] = useState(phone_number);

    function handleFormSubmit(e) {
      e.preventDefault();

      const { elements } = e.target;

      const newPersonalDetails = {
        fullName: elements.full_name.value,
        emailAddress: elements.email.value,
        homeAddress: elements.address.value,
        phoneNumber: elements.phone_number.value,
      };

      onFormSubmit(newPersonalDetails);
    }

    return (
      <form
        onSubmit={handleFormSubmit}
        id='personal_details_form'
        autoComplete='true'
        autoCorrect='true'
        className='d-flex__col gap_2r'
        ref={ref}
      >
        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='full_name'>Full Name</label>
          <input
            required
            type='text'
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
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
            value={homeAddress}
            onChange={(e) => {
              setHomeAddress(e.target.value);
            }}
          ></textarea>
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='email'>Email</label>
          <input
            required
            type='email'
            name='email'
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
            id='email'
          />
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='phone_number'>Phone Number</label>
          <input
            type='tel'
            required
            name='phone_number'
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            id='phone_number'
          />
        </div>
      </form>
    );
  },
);

PersonalDetailsForm.displayName = 'PersonalDetailsForm';

export default PersonalDetailsForm;
