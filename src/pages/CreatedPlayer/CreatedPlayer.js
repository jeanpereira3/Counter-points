import styles from './CreatedPlayer.module.css'

import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'


const CreatedPlayer = () => {
    const [playerName, setPlayerName] = useState('')
    const [playerActive] = useState(true)
    const [level] = useState(0)
    const [pts] = useState(0)

    const [formError, setFormError] = useState('')
    const [formSuccess, setFormSuccess] = useState('')
    const { user } = useAuthValue()
    const { insertDocument, response } = useInsertDocument('players')
    const { documents: players, loading, error } = useFetchDocuments('players', null, user.uid)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')
        setFormSuccess('')

        //checar se player ja existe
        //Precisa ser refatoracao
        const filteredPlayer = players.filter(player => player.playerName === playerName)
        if (filteredPlayer.length > 0) {
            setFormError('Esse jogador ja existe')
            console.log(filteredPlayer);
        } else if (!playerName) {
            setFormError('Por favor, preencha todos os campos')
        } else {
            insertDocument({
                playerName,
                playerActive,
                level,
                pts,
                uid: user.uid,
                createdBy: user.displayName
            })
            setFormSuccess('Jogador adicionado com sucesso')
        }
    }

    return (
        <div className={styles.create_player}>
            <h2>Novo Jogador</h2>
            <p>Crie e personalise seu card!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name='playerName'
                        required
                        placeholder='Nome do jogador'
                        onChange={(e) => setPlayerName(e.target.value)}
                        value={playerName}
                    />
                </label>

                {!response.loading && <button className='btn'>Cadastrar</button>}
                {response.loading && <button className='btn' disabled>Aguarde</button>}
                {response.error && <p className='error'>{response.error}</p>}

                {loading && <p >carregando...</p>}
                {error && <p className='error'>{error}</p>}

                {formError && <p className='error'>{formError}</p>}
                {formSuccess && !response.loading && !error && !response.error && <p className='success'>{formSuccess}</p>}
            </form>
        </div>
    )
}

export default CreatedPlayer