import { useState } from 'react';

import Modal from './UnderDevelopment';
import SelectProfile from './SelectProfile';

function HomePage() {
  const [underDevModalOpen, setUnderDevModalOpen] = useState(false);
  const [selectProfileOpen, setSelectProfileOpen] = useState(false);

  function toggleDialog() {
    setUnderDevModalOpen(!underDevModalOpen);
  }

  if (selectProfileOpen) {
    return (
      <>
        <SelectProfile
          onClose={() => {
            setSelectProfileOpen(false);
          }}
        />
      </>
    );
  }

  return (
    <div className='home-page'>
      <div className='btn-group d-flex__row gap_2r'>
        <button
          type='button'
          className='btn'
          onClick={() => {
            setSelectProfileOpen(true);
          }}
        >
          <span className='icon-container'></span>
          <span>Create</span>
        </button>
        <button
          type='button'
          className='btn'
          onClick={() => {
            toggleDialog();
          }}
        >
          <span className='icon-container'></span>
          <span>Downloads</span>
        </button>
      </div>
      <Modal isOpen={underDevModalOpen} onClose={toggleDialog}>
        <h1 className='text-transform__capitalize'>
          Feature Under Development
        </h1>
      </Modal>
    </div>
  );
}

export default HomePage;
