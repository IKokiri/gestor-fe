import React, { useState,useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { PositionApi } from "./api/PositionApi";
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


export default function Funcao() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'funcao', headerName: 'Função', width: 300 },    
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

const allPositions = async () => {
  const results = await PositionApi.get();
  setItems(results);
};
  
useEffect(() => { 
  allPositions();
}, []);
  
const abrirModal = () => {
  setOpen(true);
};

const fecharModal = () => {
  setFuncao('')
  setId('')
  setOpen(false);
};

const create = async () => {
  let data = {
    "funcao":funcao,
    "id":id,
  }
  if(data.id > 0){
    await PositionApi.update(data)      
  }
  else{
    await PositionApi.create(data)
  }
  allPositions()
  fecharModal()
};
  
const remover = (id) => {
  PositionApi.delete(id)
 .then(data=>{
   allPositions()
 })
}

async function edit(id){
  const userSelected = await PositionApi.getId(id)
  abrirModal()
  setFuncao(userSelected.funcao)
  setId(userSelected.id)
}

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const[funcao, setFuncao] = useState('')
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
          {"Funções"}
          </DialogTitle>
        <DialogContent>
            
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="funcao" label="Funcao" value={funcao}
            onChange={event => setFuncao(event.target.value)}/>
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
