import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid, Stack, TextField, Button, SvgIcon } from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { DEFAULT } from 'src/libs/global/constants';
import { formatarCPF } from 'src/libs/global/formatCPF';
import { format } from 'date-fns';
import { http } from 'src/utils/http';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const splitWord = (key) => {
  const partes = key.split("_");
  return partes.length > 2 ? `${partes[0]}_${partes[1]}` : partes[0];
};

export default function BasicModal({
  row,
  isActiveModal,
  setModal,
  isUpdate,
  setUpdate,
  endpoint,
  tableState,
  tableAtt,
}) {
  const handleOpen = () => setModal(true);
  const handleClose = () => {
    if (isUpdate) destroyData();
    setUpdate(!isUpdate); setModal(false);
  };
  const [getForm, setForm] = useState(row);
  const [keys, setKeys] = useState([]);
  const [getEspecialidades, setEspecialidades] = useState([]);
  const [getUsuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  const destroyData = async () => {
    await http(
      `${endpoint}/${getForm.id}`,
      {
        method: DEFAULT.METHOD.DELETE,
        body: new URLSearchParams(getForm),
      });
    tableAtt(!tableState);
  };
  const saveData = async () => {
    await http(
      isUpdate ? `${endpoint}/${getForm.id}` : endpoint,
      {
        method: isUpdate ? DEFAULT.METHOD.PUT : DEFAULT.METHOD.POST,
        body: new URLSearchParams(getForm),
      });
    tableAtt(!tableState);
    handleClose();
  };

  const handlerForm = useCallback((item, event) => {
    setForm({ ...getForm, [item]: event })
  }, [getForm, setForm]);

  const fetchEspecialidade = useCallback(async () => {
    const res = await http(DEFAULT.ENDPOINT.PRONTUARIO, { method: DEFAULT.METHOD.GET });
    if (res?.length > 0) setEspecialidades(res);
  }, [setEspecialidades]);

  const fetchUsuarios = useCallback(async () => {
    const res = await http(DEFAULT.ENDPOINT.USUARIO, { method: DEFAULT.METHOD.GET });
    if (res?.length > 0) setUsuarios(res);
  }, [setUsuarios]);

  useEffect(() => {
    if (row) fetchEspecialidade().catch(() => console.log('deu errado'));
  }, [row, fetchEspecialidade]);

  useEffect(() => {
    if (row) fetchUsuarios().catch(() => console.log('deu errado'));
  }, [row, fetchUsuarios]);

  const validateCPF = (value) => {
    if (value.length !== 14) {
      return 'CPF deve conter 11 caracteres';
    }
    return '';
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={isActiveModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
        >
          <h2 id="modal-title">{row.name || 'Cadastro'}</h2>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
            <TextField
                id="standard-basic"
                label="CPF"
                variant="standard"
                inputProps={{ maxLength: 14 }}
                fullWidth
                onChange={(event) => {
                  const newValue = formatarCPF(event.target.value);
                  const error = validateCPF(newValue);
                  setError(error);
                  handlerForm('cpf', newValue.replace(/[.-]/g, ''));
                }}
                value={formatarCPF(getForm['cpf']) || ''}
                error={Boolean(error)}
                helperText={error}
              />
              <TextField
                id="standard-basic"
                label="Nome"
                variant="standard"
                fullWidth
                onChange={(event) => handlerForm('nome', event.target.value)}
                value={getForm['nome'] || ''}
              />
              <TextField
                id="standard-basic"
                label="Telefone"
                variant="standard"
                fullWidth
                onChange={(event) => handlerForm('telefone', event.target.value)}
                value={getForm['telefone'] || ''}
              />
              <TextField
                id="standard-basic"
                label="Gênero"
                variant="standard"
                fullWidth
                onChange={(event) => handlerForm('genero', event.target.value)}
                value={getForm['genero'] || ''}
              />
              <TextField
                id="standard-basic"
                label="Idade"
                variant="standard"
                fullWidth
                onChange={(event) => handlerForm('idade', event.target.value)}
                value={getForm['idade'] || ''}
              />
              <TextField
                id="standard-basic"
                label="Massa"
                variant="standard"
                fullWidth
                onChange={(event) => handlerForm('peso', event.target.value)}
                value={getForm['peso'] || ''}
              />
              <TextField
                id="standard-basic"
                label="Altura"
                variant="standard"
                fullWidth
                onChange={(event) => handlerForm('altura', event.target.value)}
                value={getForm['altura'] || ''}
              />
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id="demo-simple-select-label">Prontuários disponíveis</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Prontuários disponíveis"
                  onChange={(event) => handlerForm('agenda_id', event.target.value)}
                >
                  {getEspecialidades.map((option, index) => (
                    <MenuItem key={index} value={option?.id}>{option?.nome_familia}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id="demo-simple-select-label">Usuários do sistema</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Usuários do sistema"
                  onChange={(event) => handlerForm('agenda_id', event.target.value)}
                >
                  {getUsuarios.map((option, index) => (
                    <MenuItem key={index} value={option?.id}>{option?.email}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={saveData}
                >
                  Salvar
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                  onClick={handleClose}
                >
                  {isUpdate ? 'Excluir' : 'Cancelar'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
