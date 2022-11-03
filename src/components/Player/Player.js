import styles from './Player.module.css'

const Player = ({ player }) => {
    return (
        <div className={styles.player}>
            <h2>{player.playerName}<span>LV{player.level}</span></h2>
            <span>1</span>
        </div>
    )
}

export default Player