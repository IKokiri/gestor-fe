import React, { useState,useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DepartmentApi } from "./api/DepartmentApi";
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


export default function Departmento() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'departamento', headerName: 'Departamento', width: 300 },    
  { field: 'numero', headerName: 'Numero', width: 300 },    
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

const allDepartments = async () => {
  const results = await DepartmentApi.get();
  setItems(results);
};
  
useEffect(() => { 
  allDepartments();
}, []);
  
const abrirModal = () => {
  setOpen(true);
};

const fecharModal = () => {
  setDepartamento('')
  setNumero('')
  setId('')
  setOpen(false);
};

const create = async () => {
  let data = {
    "departamento":departamento,
    "numero":numero,
    "id":id,
  }
  if(data.id > 0){
    await DepartmentApi.update(data)      
  }
  else{
    await DepartmentApi.create(data)
  }
  allDepartments()
  fecharModal()
};
  
const remover = (id) => {
  DepartmentApi.delete(id)
 .then(data=>{
   allDepartments()
 })
}

async function edit(id){
  const userSelected = await DepartmentApi.getDepartment(id)
  abrirModal()
  setDepartamento(userSelected.departamento)
  setId(userSelected.id)
  setNumero(userSelected.numero)
}

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const[departamento, setDepartamento] = useState('')
const[numero, setNumero] = useState('')
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
            <TextField id="departamento" label="Departamento" value={departamento}
            onChange={event => setDepartamento(event.target.value)}/>
            <TextField id="numero" label="Numero" value={numero}
            onChange={event => setNumero(event.target.value)}/>
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
