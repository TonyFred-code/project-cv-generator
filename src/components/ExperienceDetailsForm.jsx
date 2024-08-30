import { forwardRef, useState } from 'react';
import dateFormat from 'dateformat';
import { subYears } from 'date-fns';

const ExperienceDetailsForm = forwardRef(
  (
    {
      job_description,
      job_title,
      job_end_date,
      job_start_date,
      still_on_job,
      company_name,
      experience_id,
      onFormSubmit,
    },
    ref,
  ) => {
    const [jobDescription, setJobDescription] = useState(job_description);
    const [jobEndDate, setJobEndDate] = useState(job_end_date);
    const [jobStartDate, setJobStartDate] = useState(job_start_date);
    const [companyName, setCompanyName] = useState(company_name);
    const [stillOnJob, setStillOnJob] = useState(still_on_job);
    const [jobTitle, setJobTitle] = useState(job_title);

    function handleFormSubmit(e) {
      e.preventDefault();

      const { elements } = e.target;

      const newExperienceDetail = {
        job_description: elements.job_description.value,
        job_title: elements.job_title.value,
        company_name: elements.company_name.value,
        job_start_date: elements.time_started.value,
        still_on_job: elements.on_job.checked,
        job_end_date: `${
          elements.on_job.checked ? '' : elements.time_ended.value
        }`,
        id: experience_id,
      };

      onFormSubmit(newExperienceDetail);
    }

    return (
      <form
        autoComplete='true'
        autoCorrect='true'
        className='d-flex__col gap_2r experience-card-edit'
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
        ref={ref}
      >
        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='company_name'>Company Name</label>
          <input
            required
            type='text'
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            name='company_name'
            id='company_name'
          />
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='job_title'>Job Title</label>
          <input
            required
            type='text'
            value={jobTitle}
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
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
            value={jobStartDate}
            onChange={(e) => {
              setJobStartDate(e.target.value);
            }}
            max={dateFormat(new Date().now, 'yyyy-mm')}
            min={dateFormat(subYears(new Date(), 10), 'yyyy-mm')}
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
                  onChange={(e) => {
                    setStillOnJob(e.target.checked);
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
              min={dateFormat(subYears(new Date(), 10), 'yyyy-mm')}
              value={jobEndDate}
              onChange={(e) => {
                setJobEndDate(e.target.value);
              }}
            />
          )}
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='job_description'>Job Description</label>
          <textarea
            rows={8}
            cols={30}
            required
            name='job_description'
            id='job_description'
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </form>
    );
  },
);

ExperienceDetailsForm.displayName = 'ExperienceDetailsForm';

export default ExperienceDetailsForm;
