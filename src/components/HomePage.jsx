import { useState } from 'react';

import Modal from './UnderDevelopment';
import SelectProfile from './SelectProfile';
import CreateIconSrc from '../../public/close.svg';
import DownloadsIconSrc from '../../public/square-edit-outline.svg';
import '../styles/HomePage.css';

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
    <div className='home-page d-flex__col align-items_-center justify-content__center gap_2r'>
      <h1 className='text-transform__capitalize text-align__center'>
        Intelligent CV
      </h1>
      <div className='btn-group d-flex__row gap_2r justify-content__center align-items__center'>
        <button
          type='button'
          className='btn d-flex__row gap_1r'
          onClick={() => {
            setSelectProfileOpen(true);
          }}
        >
          <span className='icon-container'>
            <img src={CreateIconSrc} alt='' />
          </span>
          <span className='icon-text'>Create</span>
        </button>
        <button
          type='button'
          className='btn d-flex__row gap_1r'
          onClick={() => {
            toggleDialog();
          }}
        >
          <span className='icon-container'>
            <img src={DownloadsIconSrc} alt='' />
          </span>
          <span className='icon-text'>Downloads</span>
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
