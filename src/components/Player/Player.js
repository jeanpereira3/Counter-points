import styles from './Player.module.css'

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

const Player = ({ player }) => {

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => console.info('swipe action triggered')}>
                Action name
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => console.info('swipe action triggered')}
            >
                Delete
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
                    <span>1</span>
                </div>
            </SwipeableListItem>
        </SwipeableList>

    )

}

export default Player