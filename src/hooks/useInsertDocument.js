import { useState, useEffect, useReducer } from "react"
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore"

const initalState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    console.log('Reducer');
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'INSERTED_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initalState)

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

    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })
        try {
            console.log('try');
            const newDocument = { ...document, createdAt: Timestamp.now() }
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: 'INSERTED_DOC',
                payload: insertedDocument,
            })
        } catch (error) {
            console.log('catch');
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message,
            })
        }

    }

    // useEffect(() => {
    //     console.log(cancelled + '3');
    //     return () => setCancelled(true)
    // }, [])

    return { insertDocument, response }
}