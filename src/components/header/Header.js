import React from 'react'
import account_svg from '@/assets/account.svg'
import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
        <h2>Student Affairs</h2>

        <nav>
            <ul>
                <li>Sign out</li>
                <li><img src={account_svg} alt='Profile' /></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header