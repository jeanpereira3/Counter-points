import { useState, useEffect, useReducer } from "react"
import { db } from '../firebase/config'
import { doc, deleteDoc } from "firebase/firestore"

const initalState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    console.log('Reducer');
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'DELETED_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initalState)

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

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })
        try {
            const deleteDocument = await deleteDoc(doc(db, docCollection, id))
            checkCancelBeforeDispatch({
                type: 'DELETED_DOC',
                payload: deleteDocument,
            })
            setCancelled(true)
        } catch (error) {
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message,
            })
            setCancelled(true)
        }

    }

    return { deleteDocument, response }
}