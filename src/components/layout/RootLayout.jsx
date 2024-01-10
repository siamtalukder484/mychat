import { Box, Grid } from '@mui/material'
import React from 'react'
import './layout.css'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <Box>
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <div className='sidebar'>

                </div>
            </Grid>
            <Grid item xs={10}>
                <Outlet/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default RootLayout