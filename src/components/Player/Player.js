import styles from './Player.module.css'

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

const Player = ({ player, active }) => {
    const { user } = useAuthValue()
    const { updateDocument, reponse } = useUpdateDocument('playersActive')

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
                onClick={() => console.info('swipe action triggered')}
            >
                delete
            </SwipeAction>
        </TrailingActions>
    );
    return (

        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className={styles.player}>
                    <h2>{player.playerName}<span>LV{player.level}</span></h2>
                    <span>{active.pts}</span>
                </div>
            </SwipeableListItem>
        </SwipeableList>

    )

}

export default Player