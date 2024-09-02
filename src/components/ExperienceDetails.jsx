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
import ExperienceDetailsForm from './ExperienceDetailsForm';

function ExperienceDetails({
  experience_details,
  onClose,
  onUpdateExperienceDetails,
  onExperienceCreate,
  onExperienceDelete,
}) {
  const [activeTabId, setActiveTabId] = useState(1);
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const formRef = useRef(null);

  function handleFormSubmit(updatedExperienceDetails) {
    setActiveExperienceId(null);
    onUpdateExperienceDetails(updatedExperienceDetails);
  }

  function handleDeleteExperience(experienceId) {
    if (activeExperienceId === experienceId) {
      setActiveExperienceId(null);
    }
    onExperienceDelete(experienceId);
  }

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
        <h1 className='text-transform__capitalize margin_lr_centering'>Work</h1>
        {activeExperienceId === null && activeTabId === 1 && (
          <button
            type='button'
            className='btn btn-icon'
            onClick={() => {
              setActiveExperienceId(onExperienceCreate());
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
              activeTabId === 1 && 'active'
            }`}
            onClick={() => {
              setActiveTabId(1);
            }}
          >
            <span>Work Experience</span>
          </button>
          <button
            className={`help_view_tab tab-btn btn ${
              activeTabId === 2 && 'active'
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
                <h1 className='text-align__center'>Work Experiences</h1>
              </header>
              <div className='d-flex__col gap_2r padding_1r'>
                {experience_details.map((experience_detail, index) => {
                  const {
                    company_name,
                    job_title,
                    job_description,
                    job_start_date,
                    job_end_date,
                    still_on_job,
                    id,
                  } = experience_detail;

                  return (
                    <div className='experience-card' key={id}>
                      <header className='d-flex__row align-items__center'>
                        {activeExperienceId === id && (
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
                        <div className='d-flex__row align-items__center gap_1r'>
                          {activeExperienceId === null && (
                            <button
                              type='button'
                              className='btn btn-icon'
                              onClick={() => {
                                setActiveExperienceId(id);
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

                      {activeExperienceId === id ? (
                        <ExperienceDetailsForm
                          experience_id={activeExperienceId}
                          onFormSubmit={handleFormSubmit}
                          job_description={job_description}
                          job_title={job_title}
                          job_end_date={job_end_date}
                          job_start_date={job_start_date}
                          still_on_job={still_on_job}
                          company_name={company_name}
                          ref={formRef}
                        />
                      ) : (
                        <div>
                          <div className='detail d-flex__col gap_1r padding_1r'>
                            <p className='light-text'>Company Name</p>
                            <p className='padding-left_1r'>{company_name}</p>
                          </div>
                          <div className='detail d-flex__col gap_1r padding_1r'>
                            <p className='light-text'>Job Title</p>
                            <p className='padding-left_1r'>{job_title}</p>
                          </div>
                          {job_start_date !== '' && (
                            <div className='detail d-flex__col gap_1r padding_1r'>
                              <p className='light-text'>Job Started</p>
                              <p className='padding-left_1r'>
                                {dateFormat(job_start_date, 'mmmm, yyyy')}
                              </p>
                            </div>
                          )}
                          {(job_end_date !== '' || still_on_job) && (
                            <div className='detail d-flex__col gap_1r padding_1r'>
                              <p className='light-text'>Job Ended</p>
                              <p className='padding-left_1r'>
                                {still_on_job
                                  ? 'Till Present'
                                  : dateFormat(job_end_date, 'mmmm, yyyy')}
                              </p>
                            </div>
                          )}
                          <div className='detail d-flex__col gap_1r padding_1r'>
                            <p className='light-text'>Job Description</p>
                            <p className='padding-left_1r'>{job_description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className='d-flex__col gap_2r '>
              <div className='d-flex__col gap_1r'>
                <h3>Do</h3>
                <ul className='help-list d-flex__col gap_1r padding-left_1r'>
                  <li>Tailor your work experience section to each job</li>
                  <li>Job description should be 2 or 3 lines</li>
                  <li>
                    Your resume / cv should be 1 page or 2 pages if you have
                    more experience
                  </li>
                  <li>
                    Job description is optional for older or irrelevant work
                    experience to applied job
                  </li>
                  <li>Do check grammar, punctuation and spelling</li>
                </ul>
              </div>

              <div className='d-flex__col gap_1r'>
                <h3>Don&apos;t</h3>
                <ul className='help-list d-flex__col gap_1r padding-left_1r'>
                  <li>
                    Don&apos;t put too much into your work experience section
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetails;
