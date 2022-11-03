import styles from './NavBar.module.css'

import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'

const NavBar = () => {
    const { user } = useAuthValue()
    const { logout } = useAuthentication()

    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to='/'>
                Counter <span>Points</span>
            </NavLink>
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
                                to='/login'>Entrar</NavLink>
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

                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}

            </ul>
        </nav>
    )
}

export default NavBar