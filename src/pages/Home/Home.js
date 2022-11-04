import styles from './Home.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

import Player from '../../components/Player/Player'

const Home = () => {

    //const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     if (query) {
    //         return navigate(`/search?q=${query}`)
    //     }
    // }
    const { documents: players, loading } = useFetchDocuments('players')
    const { documents: playersActive } = useFetchDocuments('playersActive')
    const { deleteDocument } = useDeleteDocument('playersActive')
    const [idPlayers, setIdPlayers] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(idPlayers);
    }

    return (
        <div className={styles.players}>
            <h1>Lista de jogadores</h1>
            {playersActive && players && (
                players.map((player) =>
                    playersActive.map((active) => (
                        active.idPlayer === player.playerName && (
                            <label key={player.id} className={styles.player}>
                                <input
                                    type="checkbox"
                                    name={active.id}
                                    value={active.id}
                                    onChange={(e) => setIdPlayers(e.target.value)}
                                />
                                <Player player={player}></Player>
                            </label>
                        )
                    ))
                )



            )}

            <div className={styles.button_container}>
                {loading && <p>Carregando...</p>}
                {players && (
                    <div className={styles.button}>
                        <Link to='/players' className='btn'>Add</Link>
                    </div>
                )}
                {players && (
                    <div className={styles.button}>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteDocument(idPlayers)}
                        >Remover</button>
                    </div>
                )}

            </div>

        </div>


    )
}

export default Home