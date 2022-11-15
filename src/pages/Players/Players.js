import styles from './Players.module.css'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import Player from '../../components/Player/Player'


const Players = () => {

    // const [error, setError] = useState('')
    // const { user } = useAuthValue()


    const { updateDocument, response } = useUpdateDocument('players')


    return (
        <div className={styles.players}>

            <Player search={false}></Player>


            {response.error && <p className='error'>{response.error}</p>}

        </div>
    )
}

export default Players 