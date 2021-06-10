import React, { useState,useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { EmployeeApi } from "./api/EmployeeApi";
import { ApiGlobal } from "../../../../Api/Api";
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
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Funcionario() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'registro', headerName: 'Registro', width: 300 },    
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
const [users, setUsers] = useState([]);
const [departments, setDepartments] = useState([]);
const [positions, setPositions] = useState([]);

const allEmployees = async () => {
  const results = await EmployeeApi.get();
  setItems(results);
};

const allPeople = async () => {
  const result = await ApiGlobal.getPeople();
  setUsers(result);
}; 

const allDepartments = async () => {
  const result = await ApiGlobal.getDepartments();
  setDepartments(result);
}; 
 
const allPositions = async () => {
  const result = await ApiGlobal.getPositions();
  setPositions(result);
};  
useEffect(() => { 
  allEmployees();
}, []);
useEffect(() => { 
  allDepartments();
}, []);
useEffect(() => { 
  allPositions();
}, []);
useEffect(() => { 
  allPeople();
}, []);
  
const abrirModal = () => {
  setOpen(true);
};

const fecharModal = () => {
  setRegistro('')
  setId('')
  setOpen(false);
};

const create = async () => {
  let data = {
    "registro":registro,
    "id":id,
  }
  if(data.id > 0){
    await EmployeeApi.update(data)      
  }
  else{
    await EmployeeApi.create(data)
  }
  allEmployees()
  fecharModal()
};
  
const remover = (id) => {
  EmployeeApi.delete(id)
 .then(data=>{
   allEmployees()
 })
}

async function edit(id){
  const userSelected = await EmployeeApi.getId(id)
  abrirModal()
  setId(userSelected.id)
  setRegistro(userSelected.registro)
}

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const[registro, setRegistro] = useState('')
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
          {"Funcionário"}
          </DialogTitle>
        <DialogContent>
            
          <form className={classes.root} noValidate autoComplete="off">
            
    <Autocomplete
      id="combo-box-demo"
      options={users}
      getOptionLabel={(option) => option.nome}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Usuário" variant="outlined" />}
    />

    <Autocomplete
      id="combo-box-demo"
      options={departments}
      getOptionLabel={(option) => option.numero+" - "+option.departamento}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Departamento" variant="outlined" />}
    />

    
<Autocomplete
      id="combo-box-demo"
      options={positions}
      getOptionLabel={(option) => option.funcao}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Função" variant="outlined" />}
    />

    <TextField id="registro" label="Registro" value={registro}
    onChange={event => setRegistro(event.target.value)}/>
            
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
