import { useState } from 'react';
import BackIconSrc from '/close.svg';
import AddIconSrc from '/plus.svg';

import '../styles/ExperienceDetails.css';
import Icon from '@mdi/react';
import { mdiCheckBold, mdiPen } from '@mdi/js';

function ExperienceDetails({
  experience_details,
  onClose,
  onUpdateExperienceDetails,
  onExperienceCreate,
}) {
  const [activeTabId, setActiveTabId] = useState(1);
  const [activeExperienceId, setActiveExperienceId] = useState(null);

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
    };

    setActiveExperienceId(null);
    onUpdateExperienceDetails(newExperienceDetail);
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
            <img src={BackIconSrc} alt='' />
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
              <img src={AddIconSrc} alt='' />
            </span>
            <span className='icon-text'>Add</span>
          </button>
        )}
      </header>

      <div>
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
                <h1>Work Experiences</h1>
              </header>
              <div className='d-flex__col gap_2r padding_1r'>
                {experience_details.map((experience_detail, index) => {
                  const {
                    company_name,
                    job_title,
                    job_description,
                    // start_date,
                    // end_date,
                    // still_on_job,
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
                          Work Experience {index + 1}
                        </h2>
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
