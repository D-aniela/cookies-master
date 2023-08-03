import NextLink from 'next/link'

import { MenuOutlined } from '@mui/icons-material'
import { AppBar, Toolbar, Link, IconButton, Typography } from '@mui/material'

export const Navbar = () => {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton size='large' edge='start'>
          <MenuOutlined />
        </IconButton>

        <NextLink href='/' passHref>
          {/* <Link> */}
            <Typography variant='h6' color='white'>Cookie Master</Typography>
          {/* </Link> */}
        </NextLink>

				<div style={{ flexGrow: 1 }} />

        <NextLink href='/theme-changer' passHref>
          {/* <Link> */}
            <Typography variant='h6' color='white'>Cambiar Tema</Typography>
          {/* </Link> */}
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
