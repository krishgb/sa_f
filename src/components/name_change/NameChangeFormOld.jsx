import React, { useState } from 'react';
import styles from './NameChangeForm.module.scss'
import {z} from 'zod'


const sems = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

const form = z.object({
  name: z.string().min(3).max(60),
  roll_no: z.string().min(3).max(20),
  institution: z.string().min(3).max(60),
  course: z.string().min(3).max(60),
  branch: z.string().min(3).max(60),
  sem: z.enum(sems),
  new_name: z.string().min(3).max(60).toUpperCase(),
  gazette_page_no: z.number().min(1),
  date_of_release: z.coerce.date(),
  email: z.string().email(),
  phone: z.string().length(10)
})

export default function GrievanceForm() {
  const [formState, setFormState] = useState({
    name: '',
    roll_no: '',
    institution: '',
    course: '',
    branch: '',
    sem: '',
    new_name: '',
    gazette_page_no: 0,
    date_of_release: '',
    email: '',
    phone: '',
  })

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    if(name === 'gazette_page_no'){
      value = event.target.valueAsNumber
    }

    setFormState({
      ...formState,
      [name]: value
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = form.safeParse(formState)
    if(fields.success){
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/name_change/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })
      const data = await response.json()
      console.log(data)
      console.log("success", fields.data);
      return
    }

    console.log(fields.error);

  };

  return (
    <div className={styles.formContainer}>
      <h3>Name Change Application</h3>
      <form onSubmit={handleSubmit}>
        <div className={`${styles['form-group']}`}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="roll_no">Roll number / Register number</label>
          <input type="text" id="roll_no" name="roll_no" placeholder="Enter your roll number" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="institution">Institution Name</label>
          <input type="text" id="institution" name="institution" placeholder="Enter your institution name" onChange={handleInputChange} required />
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

        <div className={`${styles['form-group']}`}>
          <label htmlFor="new_name">New Name (in CAPITAL LETTERS)  </label>
          <br />
          <input type="text" id="new_name" style={{textTransform: "uppercase"}} name="new_name" placeholder="Enter your new name (in CAPITAL LETTERS)" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="gazette_page_no">Tamil Nadu Government Gazette Page No. (that includes the name change)</label>
          <input type="number" id="gazette_page_no" name="gazette_page_no" placeholder="Gazette Page No" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="date_of_release">Date of release of Gazette</label>
          <input type="date" id="date_of_release" name="date_of_release" onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="email">Email ID of the candidate</label>
          <input type="email" id="email" name="email" placeholder='Enter your email ID' onChange={handleInputChange} required />
        </div>

        <div className={`${styles['form-group']}`}>
          <label htmlFor="phone">Phone / Mobile number</label>
          <input type="number" minLength={10} maxLength={10} id="phone" name="phone" placeholder='Enter your phone / mobile number' onChange={handleInputChange} required />
        </div>

        <br />

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
