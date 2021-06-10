import React, { useState,useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { HourWorkedDepartmentApi } from "./api/HourWorkedDepartmentApi";
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
import Select from '@material-ui/core/Select';

export default function HoraDepartamento() {
  const columns = [
  { field: 'data', headerName: 'Data', width: 200 },    
  { field: 'id_employee', headerName: 'Funcionario', width: 200 },    
  { field: 'id_department', headerName: 'Departamento', width: 200 },    
  { field: 'id_department_employeed', headerName: 'Departamento Funcionario', width: 200 },    
  { field: 'hora', headerName: 'Hora', width: 200 },    
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
const [employees, setEmployess] = useState([]);
const [departments, setDepartments] = useState([]);

const allEmployees = async () => {
  const result = await ApiGlobal.getEmployees();
 
  setEmployess(result);
}; 
const AllDepartments = async () => {
  const result = await ApiGlobal.getDepartments();
  setDepartments(result);
}; 
const allHoursWorkedDepartment = async () => {
  const results = await HourWorkedDepartmentApi.get();
  setItems(results);
};
  
useEffect(() => { 
  allHoursWorkedDepartment();
}, []);
  
useEffect(() => { 
  allEmployees();
  
}, []);

useEffect(() => { 
  AllDepartments();
}, []);

const abrirModal = () => {
  setOpen(true);
};

const fecharModal = () => {
  setId('');  
  setData('');  
  setId_employee('');
  setId_department('');
  setId_department_employeed('');
  setHora('');  
  setOpen(false);
};

const create = async () => {
   
  let dado = {
    "data":data,
    "id_employee":id_employee,
    "id_department":id_department,
    "id_department_employeed":id_department_employeed,
    "hora":hora,
    "id":id,
  }
  if(dado.id > 0){
    await HourWorkedDepartmentApi.update(dado)      
  }
  else{
    await HourWorkedDepartmentApi.create(dado)
  }
  allHoursWorkedDepartment()
  fecharModal()
};
  
const remover = (id) => {
  HourWorkedDepartmentApi.delete(id)
 .then(dado=>{
   allHoursWorkedDepartment()
 })
}

async function edit(id){
  const selected = await HourWorkedDepartmentApi.getId(id)
  
  abrirModal()
  setId(selected.id)
  setData(selected.data)
  setId_employee(selected.id_employee)
  setId_department(selected.id_department)
  setId_department_employeed(selected.id_department_employeed)
  setHora(selected.hora)
}

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const[id, setId] = useState('')
const[data, setData] = useState('')
const[id_employee, setId_employee] = useState('')
const[id_department, setId_department] = useState('')
const[id_department_employeed, setId_department_employeed] = useState('')
const[hora, setHora] = useState('')

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
          {"Departamento"}
          </DialogTitle>
        <DialogContent>             
            
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={3}>
                <Grid item xs={12}> 
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
                </Grid>
                <Grid item xs={12}> 
                  <Select
                  native    
                  id="id_employee"      
                  value={id_employee}
                  onChange={(event)=>{
                  setId_employee(event.target.value)
                  }}
                  >     
                  <option value="0">Funcionário</option>
                  {
                  employees.map(obj =>{
                  return <option key={obj.id} value={obj.id}>{obj.registro}</option>
                  })
                  }   
                  </Select>
                </Grid>
                <Grid item xs={12}> 
                  <Select
                    native    
                    id="id_department_employeed"      
                    value={id_department_employeed}
                    onChange={(event)=>{
                    setId_department_employeed(event.target.value)
                    }}
                    >    
                    <option value="0">Dpto Funcionário</option>      
                    {
                    departments.map(obj =>{
                    return <option key={obj.id} value={obj.id}>{obj.numero}</option>
                    })
                    }   
                  </Select>
                </Grid> 
              <Grid item xs={12}>                  
                <Select
                  native  
                  id="id_department"      
                  value={id_department}
                  onChange={(event)=>{
                    setId_department(event.target.value)
                  }}
                  >     
                  <option value="0">Departamento</option>     
                    {
                      departments.map(obj =>{
                      return <option key={obj.id} value={obj.id}>{obj.numero}</option>
                    })
                  }   
                </Select>
              </Grid>
                <Grid item xs={12}>
                  <TextField
                  id="hora"
                  label="Horas"
                  type="time"
                  defaultValue="00:00"
                  className={classes.textField}
                  value={hora}
                  InputLabelProps={{
                    shrink: true,
                  }}    
                  onChange={event => setHora(event.target.value)}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  />
                </Grid>
            </Grid>
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
