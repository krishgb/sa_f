import React, { useState } from 'react';
import styles from './GrievanceForm.module.scss'
import {z} from 'zod'


const sems = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
const programmes = ['UG', 'PG']
const modesOfStudy = ['Full_Time_Regualar', 'Full_Time_SS', 'Part_Time']
const grievanceTypes = ['Academic', 'Non Academic']
const relatedTo = {
  Academic: [ 
    'Related to theory and practical classes',
    'Related to Internal assessment',
    'Related to appearance of semester examinations',
    'Related to prevention of students to attend the class',
    'Related to Academic schedule',
    'Related to special classes'
  ],
  'Non Academic': [
    'Related to return of certificates.',
    'Related to basic facilities in the college and hostel',
    'Related to laboratory facilities',
    'Related to quality of food in the hostel',
    'Related to caution deposit',
    'Related to Extracurricular and co-curricular activities',
    'Related to medical and transport facilities',
    'Related to code of conduct',
    'Related to Issue of transfer certificate',
    'Related to impose of fine',
    'Related to Ragging',
    'Related to Harassment of students by faculty / staff members / fellow students',
    'Related to indisciplinary activities of the students / staff members'
  ]
}

const form = z.object({
  name: z.string().min(3).max(60),
  roll_no: z.string().min(3).max(20),
  institution: z.string().min(3).max(60),
  address: z.string().min(3),
  programme: z.enum(programmes),
  course: z.string().min(3).max(60),
  branch: z.string().min(3).max(60),
  mode_of_study: z.enum(modesOfStudy),
  sem: z.enum(sems),
  grievance_type: z.enum(grievanceTypes),
  related_to: z.enum(Object.values(relatedTo).flat()),
  grievance: z.string().min(3),

})

export default function GrievanceForm() {
  const [formState, setFormState] = useState({
    name: '',
    roll_no: '',
    institution: '',
    address: '',
    programme: '',
    course: '',
    branch: '',
    mode_of_study: '',
    sem: '',
    grievance_type: '',
    related_to: '',
    grievance: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = form.safeParse(formState)
    if(fields.success){
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/grievance/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })
      const data = await response.json()
      console.log(data)
      return
    }

    console.log(fields);

  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={`${styles['form-group']}`}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="roll_no">Roll number</label>
          <input type="text" id="roll_no" name="roll_no" placeholder="Enter your roll number" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="institution">Institution Name</label>
          <input type="text" id="institution" name="institution" placeholder="Enter your institution name" onChange={handleInputChange} required />
        </div>



        <div className={`${styles['form-group']}`}>
          <label htmlFor="programme">Programme</label>
          <select id="programme" name="programme" onChange={handleInputChange}>
            <option value="">--Select--</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="course">Course</label>
          <input type="text" id="course" name="course" placeholder="Enter your course name" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="branch">Branch</label>
          <input type="text" id="branch" name="branch" placeholder="Enter your branch" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']} ${styles['select']}`}>
          <label htmlFor="mode_of_study">Mode of study</label>
          <div className={styles["select-container"]}>
            <select id="mode_of_study" name="mode_of_study" onChange={handleInputChange} required>
              <option value="">--Select--</option>
              <option value="Full_Time_Regualar">Full Time</option>
              <option value="Full_Time_SS">Full Time SS</option>
              <option value="Part_Time">Part Time</option>
            </select>
          </div>
        </div>

        <div className={`${styles['form-group']} ${styles['select']}`}>
          <label htmlFor="sem">Semester</label>
          <div className={styles["select-container"]}>
            <select id="sem" name="sem" onChange={handleInputChange} required>
              <option value="">--Select--</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
            </select>
          </div>
        </div>
        <div className={`${styles['form-group']} ${styles['select']}`}>
          <label htmlFor="grievance_type">Grievance Type</label>
          <div className={styles["select-container"]}>
            <select id="grievance_type" name="grievance_type" onChange={handleInputChange} required>
              <option value="">--Select--</option>
              <option value="Academic">Academic</option>
              <option value="Non Academic">Non Academic</option>
            </select>
          </div>
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="related_to">Related To</label>
          <select id="related_to" name="related_to" onChange={handleInputChange} required>
            <option value="">--Select--</option>
            {
              relatedTo[formState.grievance_type] && relatedTo[formState.grievance_type].map((item, index) => <option key={index} value={item}>{item}</option>)
            }
          </select>
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" placeholder="Enter your address" onChange={handleInputChange} required></textarea>
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="grievance">Grievance</label>
          <textarea id="grievance" name="grievance" placeholder="Enter your grievance" onChange={handleInputChange} required></textarea>
        </div>

        <div className={`${styles['form-group']}`}>
          <button type="reset">Reset</button>
        </div>
        <div className={`${styles['form-group']}`}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  )
}
