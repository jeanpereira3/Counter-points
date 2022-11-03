import styles from './NavBottom.module.css'

import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'

const NavBottom = () => {

    const { user } = useAuthValue()
    const { logout } = useAuthentication()

    return (
        <nav className={styles.navbottom}>
            <ul className={styles.links_list}>
                {/* <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? styles.active : '')}
                        to='/home'>Home</NavLink>
                </li> */}
                {!user && (
                    <>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : '')}
                                to='/login'>Test</NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : '')}
                                to='/login'>Test</NavLink>
                        </li>
                    </>
                )}

                {/* {user && (
                    <>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : '')}
                                to='/posts/create'>Novo post</NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : '')}
                                to='/dashboard'>Dashboard</NavLink>
                        </li>

                    </>
                )} */}

                {/* <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? styles.active : '')}
                        to='/about'>Sobre</NavLink>
                </li> */}

                {!user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}

            </ul>
        </nav>
    )
}

export default NavBottom