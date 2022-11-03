import styles from './Players.module.css'

import { Link } from 'react-router-dom'

const Players = () => {
    return (
        <div className={styles.players}>
            <div className={styles.jogador}></div>
            <div className={styles.jogador}></div>
            <div className={styles.jogador}></div>
            <div className={styles.jogador}></div>
            <div className={styles.buttom_container}>
                {/* {loading && <p>Carregando...</p>} */}
                {/*{posts && posts.length === 0 && (*/}
                <div className={styles.buttom}>
                    <Link to='/players' className='btn'>Add</Link>
                </div>
                {/*)}*/}
                {/*{posts && posts.length === 0 && (*/}
                <div className={styles.buttom}>
                    <Link to='/player/create' className='btn'>Cadastrar</Link>
                </div>
                {/*)}*/}

            </div>
        </div>
    )
}

export default Players