import styles from './Players.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import Player from '../../components/Player/Player'
import { useState } from 'react'



const Players = () => {
    const [idPlayers, setIdPlayers] = useState('')

    const { documents: players, loading } = useFetchDocuments('players')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(idPlayers);

        navigate('/home')
    }
    return (
        <div className={styles.players}>
            {players && (
                players.map((player) => (
                    <label key={player.playerName} className={styles.player}>
                        <input
                            type="checkbox"
                            name={player.playerName}
                            value={player.playerName}
                            onChange={(e) => setIdPlayers(e.target.value)}
                        />
                        <Player player={player}></Player>
                    </label>
                ))
            )}


            <div className={styles.button_container}>
                {loading && <p>Carregando...</p>}
                {players && (
                    <div className={styles.button}>
                        <button
                            className='btn'
                            onClick={handleSubmit}
                        >Add</button>
                    </div>
                )}
                {/*{posts && posts.length === 0 && (*/}
                <div className={styles.button}>
                    <Link to='/player/create' className='btn'>Cadastrar</Link>
                </div>
                {/*)}*/}

            </div>
        </div>
    )
}

export default Players