function SelectProfile({ onClose }) {
  return (
    <div className='d-flex__col'>
      <header>
        <button
          type='button'
          className='btn'
          onClick={() => {
            onClose();
          }}
        >
          <span>Back</span>
        </button>
        <h1 className='text-transform__capitalize'>Select Profile</h1>
      </header>
      <div className='user-profiles-container'></div>
      <div className='btn-group create-profile-btn-container'>
        <button type='button' className='btn'>
          <span>Create Profile</span>
        </button>
      </div>
    </div>
  );
}

export default SelectProfile;
