import * as React from 'react';
import {
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pages = [
  ['Подписки', '/subscribe'],
  ['Создать тест', '/quizzes/create'],
];

const settings = [
  ['Профиль', '/profile'],
  ['Выйти', '/logout'],
];

interface BarProps {
  children: React.ReactNode;
}

export const Bar = ({ children }: BarProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateTo = (page: string) => {
    return () => {
      setAnchorElUser(null);
      navigate(page);
    };
  };

  return (
    <React.Fragment>
      <AppBar color="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img width={30} style={{ marginRight: 10 }} src="/src/assets/orange-logo.svg" alt="" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              color="primary"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontWeight: 700,
                textDecoration: 'none',
              }}
              onClick={navigateTo('/')}
            >
              OrangeSEC
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              {pages.map(([name, page]) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                  onClick={navigateTo(page)}
                >
                  {name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map(([name, page]) => (
                  <MenuItem key={page} onClick={navigateTo(page)}>
                    <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box mt={12}>{children}</Box>
    </React.Fragment>
  );
};
