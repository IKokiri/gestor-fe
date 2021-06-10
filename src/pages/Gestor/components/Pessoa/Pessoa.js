import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { PersonApi } from "./api/PersonApi";
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


export default function Pessoa() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'nome', headerName: 'Nome', width: 300 },
    { field: 'sobrenome', headerName: 'Sobrenome', width: 300 },
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
              <DeleteIcon onClick={() => remover(params.row.id)} id={params.row.id} style={{ fill: "red", cursor: "pointer" }} />
            </Grid>
            <Grid item xs={6} md={6}>
              <EditIcon id={params.row.id} onClick={() => edit(params.row.id)} style={{ fill: "green", cursor: "pointer" }} />
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

  const allPeople = async () => {
    const results = await PersonApi.get();
    setItems(results);
  };

  const allUsers = async () => {
    const result = await ApiGlobal.getUsers();
    setUsers(result);
  };

  useEffect(() => {
    allPeople();
  }, []);

  useEffect(() => {
    allUsers();
  }, []);

  const abrirModal = () => {
    setOpen(true);
  };

  const fecharModal = () => {
    setNome('')
    setSobrenome('')
    setId('')
    setOpen(false);
  };

  const create = async () => {
    let data = {
      "nome": nome,
      "sobrenome": sobrenome,
      "id": id,
    }
    if (data.id > 0) {
      await PersonApi.update(data)
    }
    else {
      await PersonApi.create(data)
    }
    allPeople()
    fecharModal()
  };

  const remover = (id) => {
    PersonApi.delete(id)
      .then(data => {
        allPeople()
      })
  }

  async function edit(id) {
    const personSelected = await PersonApi.getId(id)
    abrirModal()
    setId(personSelected.id)
    setNome(personSelected.nome)
    setSobrenome(personSelected.sobrenome)
  }

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [id, setId] = useState('')
  const [id_user, setId_user] = useState('')

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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Select
                  native
                  id="id_user"
                  value={id_user}
                  onChange={(event) => {
                    setId_user(event.target.value)
                  }}
                >
                  <option value="0">Usuários</option>
                  {
                    users.map(obj => {
                      return <option key={obj.id} value={obj.id}>{obj.email}</option>
                    })
                  }
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField id="nome" label="Nome" value={nome}
                  onChange={event => setNome(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="sobrenome" label="Sobrenome" value={sobrenome}
                  onChange={event => setSobrenome(event.target.value)} />
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
