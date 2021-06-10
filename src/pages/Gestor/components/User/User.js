import React, { useState,useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { UserApi } from "./api/UserApi";
import SaveIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/EditOutlined';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function User() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'email', headerName: 'E-Mail', width: 300 },    
  {
    field: " ",
    headerName: " ",
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
        return (
            <Grid container spacing={10}>              
              <Grid item xs={6} md={6}>
                <DeleteIcon onClick={()=>remover(params.row.id)} id={params.row.id} style={{fill: "red",cursor: "pointer"}}/>
              </Grid>
              <Grid item xs={6} md={6}>
                <EditIcon id={params.row.id} onClick={()=>edit(params.row.id)} style={{fill: "green",cursor: "pointer"}}/>
              </Grid>
            </Grid>
        );
     }
  },       
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const classes = useStyles();

const [items, setItems] = useState([]);

const allUsers = async () => {
  const results = await UserApi.get();
  setItems(results);
};
  
useEffect(() => { 
  allUsers();
}, []);
  
const abrirModal = () => {
  setOpen(true);
};

const fecharModal = () => {
  setEmail('')
  setPassword('')
  setId('')
  setOpen(false);
};

const create = async () => {
  let data = {
    "email":email,
    "password":password,
    "id":id,
  }
  if(data.id > 0){
    await UserApi.update(data)      
  }
  else{
    await UserApi.create(data)
  }
  allUsers()
  fecharModal()
};
  
const remover = (id) => {
  UserApi.delete(id)
 .then(data=>{
   allUsers()
 })
}

async function edit(id){
  const userSelected = await UserApi.getUser(id)
  abrirModal()
  setEmail(userSelected.email)
  setId(userSelected.id)
  setPassword(userSelected.password)
}

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const[email, setEmail] = useState('')
const[password, setPassword] = useState('')
const[id, setId] = useState('')

  return (     
    <>
     <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={abrirModal}
      >
        Novo
      </Button>

      <div style={{ height: 400, width: '100%' }}>      
        <DataGrid rows={items} columns={columns} pageSize={5} />      
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={fecharModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Usuários"}
          </DialogTitle>
        <DialogContent>
            
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="email" label="E-Mail" value={email}
            onChange={event => setEmail(event.target.value)}/>
            <TextField
                id="password"
                label="Senha"
                value={password}
                type="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={fecharModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={create} color="primary" autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
