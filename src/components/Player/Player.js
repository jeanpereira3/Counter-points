import styles from './Player.module.css'

import { useEffect, useState } from 'react';
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';


import { useAuthValue } from '../../context/AuthContext'

import { increment } from 'firebase/firestore';

import SkeletonTypography from '../SkeletonTypography/SkeletonTypography';

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const Player = ({ search }) => {
    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument('players')
    const { deleteDocument } = useDeleteDocument('players')
    const { documents: players, loading } = useFetchDocuments('players', search, user.uid)

    const handleDelete = (id) => {
        deleteDocument(id)
    }

    const handleSelectPlayer = (id) => {
        const data = ({
            playerActive: !search,
            uid: user.uid,
            createdBy: user.displayName
        })

        updateDocument(id, data)
    }

    const handleWin = (id) => {
        const data = ({
            pts: increment(1),
            uid: user.uid,
            createdBy: user.displayName
        })

        updateDocument(id, data)
    }

    const leadingActions = (player) => (
        <LeadingActions>
            <SwipeAction onClick={() => handleWin(player.id)}>
                <div className={styles.win}>
                    <span>win</span>
                </div>
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = (player) => (
        <TrailingActions>

            <SwipeAction
                destructive={true}
                onClick={() => handleDelete(player.id)}
            >
                <div className={styles.delete}>
                    <DeleteForeverIcon></DeleteForeverIcon>
                </div>
            </SwipeAction>

            <SwipeAction
                destructive={true}
                onClick={() => handleSelectPlayer(player.id)}
            >
                {player && player.playerActive ? (
                    <div className={styles.remove}>
                        <GroupRemoveIcon></GroupRemoveIcon>
                    </div>
                ) : (
                    <div className={styles.add}>
                        <GroupAddIcon></GroupAddIcon>
                    </div>
                )}


            </SwipeAction>
        </TrailingActions>
    );

    // if (loading) {
    //     return <SkeletonTypography props={loading}></SkeletonTypography>
    // }
    return (
        <>
            <SwipeableList
                type={ListType.IOS}
                fullSwipe={true}
            >

                {players && players.map((player) => (
                    <SwipeableListItem
                        key={player.id}
                        leadingActions={leadingActions(player)}
                        trailingActions={trailingActions(player)}
                    >

                        <List sx={{ width: '100%', padding: '0', maxWidth: 640, bgcolor: 'background.paper' }}>
                            {loading ? (
                                <SkeletonTypography props={loading}></SkeletonTypography>
                            ) : (
                                <ListItem
                                    sx={{ height: '60px' }}

                                    secondaryAction={
                                        <ListItemText
                                            edge="end"
                                            primary={player.pts}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°`}
                                                src={`/static/images/avatar/.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={player.playerName} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>


                    </SwipeableListItem>
                ))}



            </SwipeableList>
        </>
    )

}

export default Player