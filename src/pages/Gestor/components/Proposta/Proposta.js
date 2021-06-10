import React, { useState,useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { ProposalApi } from "./api/ProposalApi";
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


export default function Proposta() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'data', headerName: 'Data', width: 300 },    
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

const allProposals = async () => {
  const results = await ProposalApi.get();
  setItems(results);
};
  
useEffect(() => { 
  allProposals();
}, []);
  
const abrirModal = () => {
  setOpen(true);
};

const fecharModal = () => {
  setData('')
  setNumero('')
  setId('')
  setOpen(false);
};

const create = async () => {
  let dado = {
    "data":data,
    "numero":numero,
    "id":id,
  }
  if(dado.id > 0){
    await ProposalApi.update(dado)      
  }
  else{
    await ProposalApi.create(dado)
  }
  allProposals()
  fecharModal()
};
  
const remover = (id) => {
  ProposalApi.delete(id)
 .then(dado=>{
   allProposals()
 })
}

async function edit(id){
  const userSelected = await ProposalApi.getId(id)
  abrirModal()
  setData(userSelected.data)
  setId(userSelected.id)
  setNumero(userSelected.numero)
}

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const[data, setData] = useState('')
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
          {"Proposta"}
          </DialogTitle>
        <DialogContent>
            
          <form className={classes.root} noValidate autoComplete="off">   
          <TextField
            id="data"
            label="Data"
            type="date"
            onChange={event => setData(event.target.value)}
            value={data}
            defaultValue="2020-01-01"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
