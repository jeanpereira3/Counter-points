import styles from './Player.module.css'

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

const Player = ({ player, active = null }) => {
    const { user } = useAuthValue()
    const { updateDocument, reponse } = useUpdateDocument('playersActive')
    const { deleteDocument } = useDeleteDocument('playersActive')

    const handleSubmit = () => {
        const data = {
            idPlayer: active.idPlayer,
            pts: active.pts += 1,
            uid: user.uid,
            createdBy: user.displayName
        }
        updateDocument(active.id, data)
    }


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
                onClick={() => deleteDocument(active.id)}
            >
                <div className={styles.delete}>
                    <span>Delete</span>
                </div>
            </SwipeAction>
        </TrailingActions>
    );
    return (

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
                                primary={active && active.pts}
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

    )

}

export default Player