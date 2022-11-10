import styles from './Players.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import Player from '../../components/Player/Player'

const Players = () => {

    // const [error, setError] = useState('')
    // const { user } = useAuthValue()

    const { documents: players, loading } = useFetchDocuments('players')
    const { updateDocument, response } = useUpdateDocument('players')

    return (
        <div className={styles.players}>
            {players && (players.map((player) => (


                <Player key={player.id} player={player}></Player>

            )))}

            {response.error && <p className='error'>{response.error}</p>}
            {/* {error && <p className='error'>{error}</p>} */}
        </div>
    )
}

export default Players