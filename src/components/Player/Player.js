import styles from './Player.module.css'

import { useEffect, useState } from 'react';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useAuthValue } from '../../context/AuthContext'

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Player = ({ player }) => {
    const { user } = useAuthValue()
    const { updateDocument, response } = useUpdateDocument('players')

    const [data, setData] = useState({})

    const handleSubmit = (action) => {
        switch (action) {
            case 'SELECT_PLAYER':
                setData({
                    playerActive: !player.playerActive,
                    uid: user.uid,
                    createdBy: user.displayName
                })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        updateDocument(player.id, data)
    }, [data])


    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={handleSubmit}>
                <div className={styles.win}>
                    <span>win</span>
                </div>
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => handleSubmit('SELECT_PLAYER')}
            >
                {player && player.playerActive ? (
                    <div className={styles.delete}>
                        <span>Remover</span>
                    </div>
                ) : (
                    <div className={styles.delete}>
                        <span>Adicionar</span>
                    </div>
                )}


            </SwipeAction>
        </TrailingActions>
    );
    return (
        <>
            <SwipeableList>
                <SwipeableListItem
                    leadingActions={leadingActions()}
                    trailingActions={trailingActions()}
                >
                    <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
                        <ListItem
                            sx={{ height: '60px' }}
                            //key={value}
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
                    </List>
                </SwipeableListItem>

            </SwipeableList>
        </>
    )

}

export default Player