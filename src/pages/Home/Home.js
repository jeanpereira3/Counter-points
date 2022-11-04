import styles from './Home.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import Player from '../../components/Player/Player'

const Home = () => {

    const { documents: players, loading } = useFetchDocuments('players')
    const { documents: playersActive } = useFetchDocuments('playersActive')




    const navigate = useNavigate()




    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     if (query) {
    //         return navigate(`/search?q=${query}`)
    //     }
    // }

    const [idPlayers, setIdPlayers] = useState('')
    return (
        <div className={styles.players}>
            <h1>Lista de jogadores</h1>
            {playersActive && players && (
                players.map((player) =>
                    playersActive.map((active) => (
                        active.idPlayer === player.playerName ? (
                            <label key={player.id} className={styles.player}>
                                <input
                                    type="checkbox"
                                    name={player.playerName}
                                    value={player.playerName}
                                    onChange={(e) => setIdPlayers(e.target.value)}
                                />
                                <Player player={player}></Player>
                            </label>

                        ) : (
                            console.log('sdfhbsdfh')
                        )
                    ))
                )



            )}

            <div className={styles.buttom_container}>
                {loading && <p>Carregando...</p>}
                {players && (
                    <div className={styles.buttom}>
                        <Link to='/players' className='btn'>Add</Link>
                    </div>
                )}
                {players && (
                    <div className={styles.buttom}>
                        <Link to='/posts/create' className='btn btn-danger'>Remover</Link>
                    </div>
                )}

            </div>

        </div>


    )
}

export default Home