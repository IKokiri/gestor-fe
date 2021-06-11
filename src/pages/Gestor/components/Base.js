import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import User from './User/User';
import Funcionario from './Funcionario/Funcionario';
import Departamento from './Departamento/Departmento';
import Pessoa from './Pessoa/Pessoa';
import Funcao from './Funcao/Funcao';
import Contrato from './Contrato/Contrato';
import Proposta from './Proposta/Proposta';
import HoraDepartamento from './HoraDepartamento/HoraDepartamento';
import HoraContrato from './HoraContrato/HoraContrato';
import HoraProposta from './HoraProposta/HoraProposta';
import PersonIcon from '@material-ui/icons/FaceOutlined';
import FuncIcon from '@material-ui/icons/EmojiPeopleOutlined';
import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import Container from '@material-ui/core/Container';
import DepartmentIcon from '@material-ui/icons/AccountTree';
import FuncaoIcon from '@material-ui/icons/Build';
import ContractIcon from '@material-ui/icons/Receipt';
import ProposalIcon from '@material-ui/icons/RestorePage';
import Horas from '@material-ui/icons/AvTimer';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Fab from '@material-ui/core/Fab';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Base() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let userData = JSON.parse(localStorage.getItem('user'))
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Fab size="small" color="secondary" aria-label="add">
            {
              userData.email.replace('.', '').toUpperCase().substr(0, 2)
            }
          </Fab>

        </Toolbar>



      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />
        <List>
          <ListItem component={Link} to="/admin/usuario" button key='usuario'>
            <ListItemIcon><UserIcon /></ListItemIcon>
            <ListItemText primary='Usuários' />
          </ListItem>
          <ListItem component={Link} to="/admin/pessoa" button key='pessoa'>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='Pessoa' />
          </ListItem>
          <ListItem component={Link} to="/admin/funcionario" button key='funcionario'>
            <ListItemIcon><FuncIcon /></ListItemIcon>
            <ListItemText primary='Funcionário' />
          </ListItem>
          <ListItem component={Link} to="/admin/departamento" button key='departamento'>
            <ListItemIcon><DepartmentIcon /></ListItemIcon>
            <ListItemText primary='Departamento' />
          </ListItem>
          <ListItem component={Link} to="/admin/funcao" button key='funcao'>
            <ListItemIcon><FuncaoIcon /></ListItemIcon>
            <ListItemText primary='Funcao' />
          </ListItem>
          <ListItem component={Link} to="/admin/contrato" button key='contrato'>
            <ListItemIcon><ContractIcon /></ListItemIcon>
            <ListItemText primary='Contrato' />
          </ListItem>
          <ListItem component={Link} to="/admin/proposta" button key='proposta'>
            <ListItemIcon><ProposalIcon /></ListItemIcon>
            <ListItemText primary='Proposta' />
          </ListItem>
          <ListItem component={Link} to="/admin/horadepartamento" button key='horadepartamento'>
            <ListItemIcon><Horas /></ListItemIcon>
            <ListItemText primary='Hora Departamento' />
          </ListItem>
          <ListItem component={Link} to="/admin/horacontrato" button key='horacontrato'>
            <ListItemIcon><Horas /></ListItemIcon>
            <ListItemText primary='Hora Contrato' />
          </ListItem>
          <ListItem component={Link} to="/admin/horaproposta" button key='horaproposta'>
            <ListItemIcon><Horas /></ListItemIcon>
            <ListItemText primary='Hora Propsota' />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Switch>
            <Route path="/admin/usuario">
              <User />
            </Route>
            <Route path="/admin/funcionario">
              <Funcionario />
            </Route>
            <Route path="/admin/pessoa">
              <Pessoa />
            </Route>
            <Route path="/admin/departamento">
              <Departamento />
            </Route>
            <Route path="/admin/funcao">
              <Funcao />
            </Route>
            <Route path="/admin/contrato">
              <Contrato />
            </Route>
            <Route path="/admin/proposta">
              <Proposta />
            </Route>
            <Route path="/admin/horadepartamento">
              <HoraDepartamento />
            </Route>
            <Route path="/admin/horacontrato">
              <HoraContrato />
            </Route>
            <Route path="/admin/horaproposta">
              <HoraProposta />
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  );
}
