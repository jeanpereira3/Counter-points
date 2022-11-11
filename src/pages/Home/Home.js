import styles from './Home.module.css'


import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import Player from '../../components/Player/Player'

import IconButton from '@mui/material/IconButton';

import RefreshIcon from '@mui/icons-material/Refresh';

const Home = () => {

    const { user } = useAuthValue()
    const { documents: players, loading } = useFetchDocuments('players', true)
    const { updateDocument } = useUpdateDocument('players')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            pts: 0,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(null, data)

    }




    return (
        <div className={styles.players}>
            <div className={styles.header}>
                <h2>Lista de jogadores</h2>
                <IconButton aria-label="refresh" onClick={handleSubmit}>
                    <RefreshIcon></RefreshIcon>
                </IconButton>
            </div>

            {players && (players.map((player) => (
                <Player key={player.id} player={player}></Player>
            )))}
        </div>
    )

}
export default Home