import styles from './Players.module.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useInsertDocument } from '../../hooks/useInsertDocument'

import Player from '../../components/Player/Player'
import { isEmpty } from '@firebase/util'




const Players = () => {
    const [player, setPlayer] = useState('')

    const [error, setError] = useState('')
    const { user } = useAuthValue()
    const { insertDocument, response } = useInsertDocument('playersActive')
    const { documents: players, loading } = useFetchDocuments('players')
    const { documents: playersActive, loadingActive } = useFetchDocuments('playersActive')


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        //checar todos os valores
        const existentPlayer = playersActive.filter(active => active.idPlayer === player)

        if (isEmpty(existentPlayer)) {
            insertDocument({
                idPlayer: player,
                pts: 0,
                uid: user.uid,
                createdBy: user.displayName
            })
        }

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
                            onChange={(e) => setPlayer(e.target.value)}
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
            </div>
            {response.error && <p className='error'>{response.error}</p>}
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default Players