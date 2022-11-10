import styles from './Home.module.css'

import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import Player from '../../components/Player/Player'

const Home = () => {
    const { documents: players, loading } = useFetchDocuments('players', true)
    const [idPlayers, setIdPlayers] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(idPlayers);
    }

    return (
        <div className={styles.players}>
            <h1>Lista de jogadores</h1>
            {players && (players.map((player) =>
                <label key={player.id} className={styles.player}>
                    <input
                        type="checkbox"
                        name={player.id}
                        value={player.id}
                        onChange={(e) => setIdPlayers(player.id)}
                    />
                    <Player player={player}></Player>
                </label>
            )
            )}

            <div className={styles.button_container}>
                {loading && <p>Carregando...</p>}
            </div>

        </div>


    )
}

export default Home