import styles from './CircularIndeterminate.module.css'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { style } from '@mui/system';

export default function CircularIndeterminate() {
    return (
        <Box className={styles.box}>
            <CircularProgress />
        </Box>
    );
}