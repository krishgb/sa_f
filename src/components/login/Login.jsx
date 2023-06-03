import {useNavigate} from 'react-router-dom'
import { useRef } from 'react'
import styles from './Login.module.scss'


export default function Login(){
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const router = useNavigate()

    const hashed_password = async(password) => {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
    }

    const submit = async (e) => {
        e.preventDefault()
        const email = emailRef.current?.value
        let password = passwordRef.current?.value
        password = await hashed_password(password)
        
        try{
            const validate = await fetch(process.env.REACT_APP_SERVER_URL +  '/login', {
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({email, password})
            })
            const data = await validate.json()
            if(!data.success){
                alert('Login Failed')
                return
            }
            console.log(data);
            
            router('/transfer')
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className={styles['form-container']}>
            <form onSubmit={submit}>
                <h2 style={{textAlign: 'center', fontWeight: 700}}>Login</h2>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" ref={emailRef} id="email" placeholder='Email ID' />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" ref={passwordRef} id='password' placeholder='Password' />
                </div>

                <button>Login</button>
            </form>
        </div>
    )
}

