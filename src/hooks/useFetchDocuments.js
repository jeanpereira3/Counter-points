import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,

} from 'firebase/firestore'



export const useFetchDocuments = (docCollection, playerActive = null, uid = null) => {



    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData() {
            if (cancelled) return
            setLoading(true)
            const collectionRef = await collection(db, docCollection)


            try {
                let q

                if (playerActive != null) {
                    q = await query(
                        collectionRef,
                        where('uid', '==', uid),
                        where('playerActive', '==', playerActive),
                        orderBy('pts', 'desc')
                    )
                } else {
                    q = await query(
                        collectionRef,
                        where('uid', '==', uid),
                        orderBy('createdAt', 'desc')
                    )
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()
    }, [docCollection, playerActive, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { documents, loading, error }
}