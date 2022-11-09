import styles from './NavBottom.module.css'

import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GroupsIcon from '@mui/icons-material/Groups';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


const NavBottom = () => {

    const { user } = useAuthValue()
    const navigate = useNavigate()


    const [value, setValue] = useState(0)

    useEffect(() => {
        switch (value) {
            case 0:
                return navigate('/home')
            case 1:
                return navigate('/players')
            case 2:
                return navigate('/player/create')

            default:
                break;
        }
    }, [value])

    return (
        <>
            {user && (
                <Box sx={{ width: 500 }}>
                    <Paper sx={{ position: 'fixed', bottom: 36, left: 0, right: 0 }} elevation={1}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction label="Iniciar" icon={<PlayArrowIcon />} />
                            <BottomNavigationAction label="Jogadores" icon={<GroupsIcon />} />
                            <BottomNavigationAction label="Novo Jogador" icon={<AddOutlinedIcon />} />
                        </BottomNavigation>
                    </Paper>
                </Box>
            )}
        </>

    )
}

export default NavBottom