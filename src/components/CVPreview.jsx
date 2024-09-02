import '../styles/CVPreview.css';

import Icon from '@mdi/react';
import { mdiArrowLeftThin, mdiHome, mdiEmail, mdiPhone } from '@mdi/js';

function CVPreview({ profile_details, onClose }) {
  const { personal_details, work_experience, educational_experience } =
    profile_details;

  const { fullName, emailAddress, phoneNumber, homeAddress } = personal_details;
  const { work_experiences } = work_experience;
  const { educations_experiences } = educational_experience;

  console.log(profile_details);

  return (
    <div className='d-flex__col gap_2r '>
      <header className='d-flex__row align-items__center padding_2r'>
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
        <h1 className='text-transform__uppercase margin_lr_centering'>
          your CV
        </h1>
      </header>
      <div className='d-flex__col gap_1r padding_1r preview-container'>
        <div className='personal-details text-align__center d-flex__col gap_1r'>
          <h1 className='text-transform__capitalize text-align__center'>
            {fullName}
          </h1>
          <div>
            <p className='d-flex__row gap_1r justify-content__center align-items__center'>
              <Icon path={mdiHome} size={1} />
              <span>{homeAddress}</span>
            </p>
            <div className='justify-content__center d-flex__row gap_1r align-items__center'>
              <p className='d-flex__row gap_1r justify-content__center align-items__center'>
                <Icon path={mdiEmail} size={1} />
                <span>{emailAddress}</span>
              </p>
              <span className='font-weight__bold'>|</span>
              <p className='d-flex__row gap_1r justify-content__center align-items__center'>
                <Icon path={mdiPhone} size={1} />
                <span>{phoneNumber}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='education-experience'>
          <header>
            <h2 className='padding-left_1r'>Education Experience</h2>
          </header>
          <ul className='padding_1r d-flex__col gap_2r'>
            {educations_experiences.map((education) => {
              const {
                id,
                study_title,
                date_ended,
                date_started,
                school_name,
                still_in_study,
              } = education;

              return (
                <li key={id}>
                  <div>
                    <div className='d-flex__row gap_1r justify-content__space-between'>
                      <span className='text-transform__capitalize font-weight__bold'>
                        {school_name}
                      </span>
                      <div className='text-transform__capitalize d-flex__row gap_1r align-items__center'>
                        <span>{date_started}</span>
                        <span className='font-weight__bold'>-</span>

                        {still_in_study ? 'ongoing' : `${date_ended}`}
                      </div>
                    </div>
                    <p>{study_title}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='work-experience'>
          <header>
            <h2 className='padding-left_1r'>Work Experience</h2>
          </header>
          <ul className='padding_1r d-flex__col gap_2r'>
            {work_experiences.map((work) => {
              const {
                id,
                company_name,
                job_description,
                job_end_date,
                job_start_date,
                still_on_job,
                job_title,
              } = work;

              return (
                <li key={id}>
                  <div>
                    <div className='d-flex__row gap_1r justify-content__space-between '>
                      <span className=' text-transform__capitalize font-weight__bold'>
                        {company_name}
                      </span>
                      <div className='text-transform__capitalize d-flex__row gap_1r align-items__center'>
                        <span>{job_start_date}</span>
                        <span className='font-weight__bold'>-</span>
                        {still_on_job ? 'ongoing' : `${job_end_date}`}
                      </div>
                    </div>
                    <p>{job_title}</p>
                    <p>{job_description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CVPreview;
