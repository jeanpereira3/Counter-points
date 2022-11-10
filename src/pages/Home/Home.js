import styles from './Home.module.css'

import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import Player from '../../components/Player/Player'

const Home = () => {
    const { documents: players, loading } = useFetchDocuments('players', true)


    return (
        <div className={styles.players}>
            <h1>Lista de jogadores</h1>
            {players && (players.map((player) => (
                <Player key={player.id} player={player}></Player>
            )))}

            <div className={styles.button_container}>
                {loading && <p>Carregando...</p>}
            </div>

        </div>

    )
}

export default Home