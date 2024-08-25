import { useState } from 'react';
import '../styles/ExperienceDetails.css';
import Icon from '@mdi/react';
import {
  mdiArrowLeftThin,
  mdiCheckBold,
  mdiPen,
  mdiPlus,
  mdiTrashCan,
} from '@mdi/js';

import dateFormat from 'dateformat';
import { subYears } from 'date-fns';

function ExperienceDetails({
  experience_details,
  onClose,
  onUpdateExperienceDetails,
  onExperienceCreate,
  onExperienceDelete,
}) {
  const [activeTabId, setActiveTabId] = useState(1);
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const [stillOnJob, setStillOnJob] = useState(false);

  function handleFormSubmit(e, experienceId) {
    e.preventDefault();

    const { elements } = e.target;
    const [experience_detail] = experience_details.filter(
      (exp) => exp.id === experienceId,
    );

    const newExperienceDetail = {
      ...experience_detail,
      job_description: elements.job_description.value,
      job_title: elements.job_title.value,
      company_name: elements.company_name.value,
      job_start_date: elements.time_started.value,
      still_on_job: elements.on_job.checked,
      job_end_date: `${
        elements.on_job.checked ? '' : elements.time_ended.value
      }`,
    };

    setActiveExperienceId(null);
    onUpdateExperienceDetails(newExperienceDetail);
  }

  function handleDeleteExperience(experienceId) {
    if (activeExperienceId === experienceId) {
      setActiveExperienceId(null);
    }
    onExperienceDelete(experienceId);
  }

  console.log(experience_details);

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
              setStillOnJob(false);
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
                            form={`experience_details_form_${id}`}
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
                        <form
                          id={`experience_details_form_${id}`}
                          autoComplete='true'
                          autoCorrect='true'
                          className='d-flex__col gap_2r experience-card-edit'
                          onSubmit={(e) => {
                            handleFormSubmit(e, id);
                          }}
                        >
                          <div className='form-row d-flex__col gap_1r'>
                            <label htmlFor='company_name'>Company Name</label>
                            <input
                              required
                              type='text'
                              defaultValue={company_name}
                              name='company_name'
                              id='company_name'
                            />
                          </div>

                          <div className='form-row d-flex__col gap_1r'>
                            <label htmlFor='job_title'>Job Title</label>
                            <input
                              required
                              type='text'
                              defaultValue={job_title}
                              name='job_title'
                              id='job_title'
                            />
                          </div>

                          <div className='form-row d-flex__col gap_1r'>
                            <label htmlFor='time_started'>Job Started</label>
                            <input
                              type='month'
                              name='time_started'
                              id='time_started'
                              defaultValue={job_start_date}
                              max={dateFormat(new Date().now, 'yyyy-mm')}
                              min={dateFormat(
                                subYears(new Date(), 10),
                                'yyyy-mm',
                              )}
                            />
                          </div>

                          <div className='form-row d-flex__col gap_1r'>
                            <div className='d-flex__row justify-content__space-between'>
                              <label htmlFor='time_ended'>Job Ended</label>

                              <span>
                                <label
                                  htmlFor='on_job'
                                  className='d-flex__row align-items__center gap_1r'
                                >
                                  <input
                                    type='checkbox'
                                    name='on_job'
                                    id='on_job'
                                    checked={stillOnJob}
                                    onChange={() => {
                                      setStillOnJob(!stillOnJob);
                                    }}
                                  />
                                  Till Present
                                </label>
                              </span>
                            </div>
                            {!stillOnJob && (
                              <input
                                type='month'
                                name='time_ended'
                                id='time_ended'
                                max={dateFormat(new Date().now, 'yyyy-mm')}
                                min={dateFormat(
                                  subYears(new Date(), 10),
                                  'yyyy-mm',
                                )}
                                defaultValue={job_end_date}
                              />
                            )}
                          </div>

                          <div className='form-row d-flex__col gap_1r'>
                            <label htmlFor='job_description'>
                              Job Description
                            </label>
                            <textarea
                              rows={8}
                              cols={30}
                              required
                              name='job_description'
                              id='job_description'
                              defaultValue={job_description}
                            ></textarea>
                          </div>
                        </form>
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
            <div> Work Experience Help</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetails;
