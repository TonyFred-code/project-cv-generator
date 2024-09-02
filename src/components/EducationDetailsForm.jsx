import { forwardRef, useState } from 'react';
import { subYears } from 'date-fns';
import dateFormat from 'dateformat';

const EducationDetailsForm = forwardRef(
  (
    {
      still_on_study,
      onFormSubmit,
      experience_id,
      school_name,
      study_title,
      date_started,
      date_ended,
    },
    ref,
  ) => {
    const [stillLearning, setStillLearning] = useState(still_on_study);
    const [dateEnded, setDateEnded] = useState(date_ended);
    const [schoolName, setSchoolName] = useState(school_name);
    const [dateStarted, setDateStarted] = useState(date_started);
    const [studyTitle, setStudyTitle] = useState(study_title);

    function handleFormSubmit(e) {
      e.preventDefault();

      const { elements } = e.target;

      const newEducationDetails = {
        date_started: elements.date_started.value,
        study_title: elements.study_title.value,
        school_name: elements.school_name.value,
        still_in_study: elements.in_study.checked,
        date_ended: `${
          elements.in_study.checked ? '' : elements.date_ended.value
        }`,
        id: experience_id,
      };

      onFormSubmit(newEducationDetails);
    }

    return (
      <form
        ref={ref}
        autoComplete='true'
        autoCorrect='true'
        className='d-flex__col gap_2r experience-card-edit'
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='school_name'>School Name</label>
          <input
            required
            type='text'
            value={schoolName}
            onChange={(e) => {
              setSchoolName(e.target.value);
            }}
            name='school_name'
            id='school_name'
          />
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='study_title'>Title of Study</label>
          <input
            required
            type='text'
            value={studyTitle}
            onChange={(e) => {
              setStudyTitle(e.target.value);
            }}
            name='study_title'
            id='study_title'
          />
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <label htmlFor='date_started'>Started Study</label>
          <input
            required
            type='month'
            name='date_started'
            id='date_started'
            value={dateStarted}
            onChange={(e) => {
              setDateStarted(e.target.value);
            }}
            max={dateFormat(new Date().now, 'yyyy-mm')}
            min={dateFormat(subYears(new Date(), 10), 'yyyy-mm')}
          />
        </div>

        <div className='form-row d-flex__col gap_1r'>
          <div className='d-flex__row justify-content__space-between'>
            <label htmlFor='date_ended'>Study Ended</label>

            <span>
              <label
                htmlFor='in_study'
                className='d-flex__row align-items__center gap_1r'
              >
                <input
                  required
                  type='checkbox'
                  name='in_study'
                  id='in_study'
                  checked={stillLearning}
                  onChange={(e) => {
                    setStillLearning(e.target.checked);
                  }}
                />
                Till Present
              </label>
            </span>
          </div>
          {!stillLearning && (
            <input
              required
              type='month'
              name='date_ended'
              id='date_ended'
              max={dateFormat(new Date().now, 'yyyy-mm')}
              min={dateFormat(subYears(new Date(), 10), 'yyyy-mm')}
              value={dateEnded}
              onChange={(e) => {
                setDateEnded(e.target.value);
              }}
            />
          )}
        </div>
      </form>
    );
  },
);

EducationDetailsForm.displayName = 'EducationDetailsForm';

export default EducationDetailsForm;
