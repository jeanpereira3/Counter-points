import styles from './Home.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail.js/PostDetail'

const Home = () => {
    const [query, setQuery] = useState('')
    const { documents: posts, loading } = useFetchDocuments('posts')
    const navigate = useNavigate()




    const handleSubmit = (e) => {
        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>

            <div className={styles.buttom_container}>
                {loading && <p>Carregando...</p>}
                {posts && posts.length === 0 && (
                    <div className={styles.buttom}>
                        <Link to='/players' className='btn'>Add</Link>
                    </div>
                )}
                {posts && posts.length === 0 && (
                    <div className={styles.buttom}>
                        <Link to='/posts/create' className='btn btn-danger'>Remover</Link>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Home