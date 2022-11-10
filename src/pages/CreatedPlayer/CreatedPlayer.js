import styles from './CreatedPlayer.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatedPlayer = () => {
    const [playerName, setPlayerName] = useState('')
    const [playerActive, setPlayerActive] = useState(false)
    const [level, setLevel] = useState(0)
    const [pts, setPts] = useState(0)

    const [formError, setFormError] = useState('')
    const { user } = useAuthValue()
    const { insertDocument, response } = useInsertDocument('players')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')


        //checar todos os valores
        if (!playerName) {
            setFormError('Por favor, preencha todos os campos')
        }
        if (formError) return
        insertDocument({
            playerName,
            playerActive,
            level,
            pts,
            uid: user.uid,
            createdBy: user.displayName
        })

        navigate('/home')
    }

    return (
        <div className={styles.create_post}>
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
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatedPlayer