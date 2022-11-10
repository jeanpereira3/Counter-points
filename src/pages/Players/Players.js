import styles from './Players.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'


import Player from '../../components/Player/Player'
// import { isEmpty } from '@firebase/util'




const Players = () => {

    const [id, setId] = useState()

    // const [error, setError] = useState('')
    const { user } = useAuthValue()

    const { documents: players, loading } = useFetchDocuments('players')
    const { updateDocument, response } = useUpdateDocument('players')



    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // setError('')
        console.log(id);

        const data = {
            playerActive: true,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data)
        // if (isEmpty(existentPlayer)) {
        //     insertDocument({
        //         idPlayer: player,
        //         pts: 0,
        //         
        //         
        //     })
        // }

        navigate('/home')
    }
    return (
        <div className={styles.players}>
            {players && (
                players.map((player) => (
                    <label key={player.id} className={styles.player}>
                        <input
                            type="checkbox"
                            name={player.playerName}
                            value={player.playerName}
                            onChange={(e) => setId(player.id)}
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
            {/* {response.error && <p className='error'>{response.error}</p>}
            {error && <p className='error'>{error}</p>} */}
        </div>
    )
}

export default Players