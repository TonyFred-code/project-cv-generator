import { useRef, useState } from 'react';
import Icon from '@mdi/react';
import {
  mdiArrowLeftThin,
  mdiCheckBold,
  mdiPen,
  mdiPlus,
  mdiTrashCan,
} from '@mdi/js';

import dateFormat from 'dateformat';
import EducationDetailsForm from './EducationDetailsForm';

function EducationDetails({
  education_details,
  onClose,
  onUpdateEducationDetails,
  onEducationCreate,
  onEducationDelete,
}) {
  const [activeTabId, setActiveTabId] = useState(1);
  const [activeEducationId, setActiveEducationId] = useState(null);
  const formRef = useRef(null);

  function handleFormSubmit(updatedEducationExperienceDetails) {
    setActiveEducationId(null);
    onUpdateEducationDetails(updatedEducationExperienceDetails);
  }

  function handleDeleteExperience(experienceId) {
    if (activeEducationId === experienceId) {
      setActiveEducationId(null);
    }
    onEducationDelete(experienceId);
  }

  console.log(education_details);

  return (
    <div className='personal-details padding_2r'>
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
          education
        </h1>
        {activeEducationId === null && activeTabId === 1 && (
          <button
            type='button'
            className='btn btn-icon'
            onClick={() => {
              setActiveEducationId(onEducationCreate());
            }}
          >
            <span className='icon-container'>
              <Icon path={mdiPlus} size={3} />
            </span>
            <span className='icon-text'>Add</span>
          </button>
        )}
      </header>

      <div className='d-flex__col gap_1r'>
        <div className='tab-area d-flex__row align-items__center justify-content__space-around padding_1r'>
          <button
            className={`personal_details_view_tab tab-btn btn ${
              activeTabId === 1 ? 'active' : ''
            }`}
            onClick={() => {
              setActiveTabId(1);
            }}
          >
            <span>Experiences</span>
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
            <>
              <header>
                <h1 className='text-align__center'>Education Experiences</h1>
              </header>
              <div className='d-flex__col gap_2r padding_1r'>
                {education_details.map((education_detail, index) => {
                  const {
                    school_name,
                    study_title,
                    date_started,
                    date_ended,
                    still_in_study,
                    id,
                  } = education_detail;

                  return (
                    <div className='experience-card' key={id}>
                      <header className='d-flex__row align-items__center'>
                        {activeEducationId === id && (
                          <button
                            type='submit'
                            onClick={() => {
                              formRef.current.requestSubmit();
                            }}
                            className='btn btn-icon'
                          >
                            <span className='icon-container'>
                              <Icon path={mdiCheckBold} size={3} />
                            </span>
                            <span className='icon-text'>Save</span>
                          </button>
                        )}
                        <h2 className='text-transform__capitalize margin_lr_centering'>
                          Experience {index + 1}
                        </h2>
                        <div className='d-flex__row align-items_center gap_1r'>
                          {activeEducationId === null && (
                            <button
                              type='button'
                              className='btn btn-icon'
                              onClick={() => {
                                setActiveEducationId(id);
                              }}
                            >
                              <span className='icon-container'>
                                <Icon path={mdiPen} />
                              </span>
                              <span className='icon-text'>Edit</span>
                            </button>
                          )}
                          <button
                            type='button'
                            className='btn d-flex__row align-items__center gap_1r'
                            onClick={() => {
                              handleDeleteExperience(id);
                            }}
                            title='Delete Profile'
                          >
                            <span className='icon-container'>
                              <Icon path={mdiTrashCan} size={2} />
                            </span>
                          </button>
                        </div>
                      </header>

                      {activeEducationId === id ? (
                        <EducationDetailsForm
                          onFormSubmit={handleFormSubmit}
                          experience_id={activeEducationId}
                          still_on_study={still_in_study}
                          school_name={school_name}
                          study_title={study_title}
                          date_ended={date_ended}
                          key={activeEducationId}
                          date_started={date_started}
                          ref={formRef}
                        />
                      ) : (
                        <div>
                          <div className='detail d-flex__col gap_1r padding_1r'>
                            <p className='light-text'>School Name</p>
                            <p className='padding-left_1r'>{school_name}</p>
                          </div>
                          <div className='detail d-flex__col gap_1r padding_1r'>
                            <p className='light-text'>title of study</p>
                            <p className='padding-left_1r'>{study_title}</p>
                          </div>
                          {date_started !== '' && (
                            <div className='detail d-flex__col gap_1r padding_1r'>
                              <p className='light-text'>Started Studying</p>
                              <p className='padding-left_1r'>
                                {dateFormat(date_started, 'mmmm, yyyy')}
                              </p>
                            </div>
                          )}
                          {(date_ended !== '' || still_in_study) && (
                            <div className='detail d-flex__col gap_1r padding_1r'>
                              <p className='light-text'>Finished Studying</p>
                              <p className='padding-left_1r'>
                                {still_in_study
                                  ? 'Till Present'
                                  : dateFormat(date_ended, 'mmmm, yyyy')}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div> Education Experience Help</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationDetails;
