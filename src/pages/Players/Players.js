import styles from './Players.module.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useInsertDocument } from '../../hooks/useInsertDocument'

import Player from '../../components/Player/Player'




const Players = () => {
    const [idPlayers, setIdPlayers] = useState([])

    const [formError, setFormError] = useState('')
    const { user } = useAuthValue()
    const { insertDocument, response } = useInsertDocument('active')
    const { documents: players, loading } = useFetchDocuments('players')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        //checar todos os valores
        if (!idPlayers) {
            setFormError('Nenhum jogardor na partida!')
        }
        if (formError) return
        insertDocument({
            idPlayers,
            uid: user.uid,
            createdBy: user.displayName
        })

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
                            onChange={(e) => setIdPlayers((state) => [...state, { playerName: e.target.value }])}
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
                {players && (
                    <div className={styles.button}>
                        <Link to='/player/create' className='btn'>Cadastrar</Link>
                    </div>
                )}

            </div>
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
        </div>
    )
}

export default Players