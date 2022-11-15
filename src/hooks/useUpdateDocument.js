import { useState, useEffect, useReducer } from "react"
import { db } from '../firebase/config'
import {
    doc,
    where,
    updateDoc,
    collection,
    query,
    getDocs
} from "firebase/firestore"


const initalState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'UPDATE_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initalState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    console.log(cancelled + '1');
    const checkCancelBeforeDispatch = (action) => {
        console.log(cancelled + '2');
        if (!cancelled) {
            console.log('cancelled-if');
            dispatch(action)
        }
    }

    const updateDocument = async (id = null, data, uid = null) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })
        try {
            if (id) {
                const docRef = await doc(db, docCollection, id)
                const updatedDocument = await updateDoc(docRef, data)

                checkCancelBeforeDispatch({
                    type: 'UPDATE_DOC',
                    payload: updatedDocument,
                })
            } else if (id == null) {
                const q = query(collection(db, docCollection), where('uid', '==', uid), where('pts', ">", 0))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (docM) => {
                    const docRef = await doc(db, docCollection, docM.id)
                    const updatedDocument = await updateDoc(docRef, data)

                    checkCancelBeforeDispatch({
                        type: 'UPDATE_DOC',
                        payload: updatedDocument,
                    })

                })
            }

        } catch (error) {
            console.log('catch');
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message,
            })
        }





    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { updateDocument, response }
}