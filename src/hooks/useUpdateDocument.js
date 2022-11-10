import { useState, useEffect, useReducer } from "react"
import { db } from '../firebase/config'
import { doc, updateDoc } from "firebase/firestore"

const initalState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {
    console.log('Reducer');
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

    const updateDocument = async (id, data) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })
        try {
            const docRef = await doc(db, docCollection, id)
            const updatedDocument = await updateDoc(docRef, data)

            checkCancelBeforeDispatch({
                type: 'UPDATE_DOC',
                payload: updatedDocument,
            })
        } catch (error) {
            console.log('catch');
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message,
            })
        }

    }

    useEffect(() => {
        console.log(cancelled + '3');
        return () => setCancelled(true)
    }, [])

    return { updateDocument, response }
}