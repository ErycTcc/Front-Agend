import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid, Stack, TextField, Button, SvgIcon } from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { DEFAULT } from 'src/libs/global/constants';
import { format } from 'date-fns';
import { http } from 'src/utils/http';

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
  const handleClose = () => { setUpdate(!isUpdate); setModal(false); };
  const [getForm, setForm] = useState(row);
  const [keys, setKeys] = useState([]);
  const [getData, setData] = useState([]);
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
    setForm({ ...getForm, [item]: event.target.value })
  }, [getForm, setForm]);

  const fetchSelect = useCallback(async (url, item) => {
    const res = await http(url, { method: DEFAULT.METHOD.GET });
    if (res?.length > 0) {
      setData((data) => {
        const newData = [...data];
        newData[item] = res;
        return newData;
      });
    }
  }, []);

  useEffect(() => {
    if (row) {
      const values = Object.keys(row);
      setKeys(values);
      values.forEach((item, index) => {
        if (item.includes('_id')) {
          const actualKey = splitWord(item);
          fetchSelect(actualKey, index)
            .then(() => {
              setForm((form) => {
                const newForm = { ...form };
                newForm[item] = getData[index];
                return newForm;
              });
            })
            .catch(() => console.log('deu errado'));
        }
      });
    }
  }, [row, fetchSelect]);

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
            <Grid item xs={6} lg={6}>
              {
                keys.map((item, index) => (
                  <div key={index}>
                    {item.includes('_id') ? (
                      getData[index]?.length > 0 && (
                        <>
                          <label htmlFor="first-name">
                            {splitWord(item).replace('_', ' ')}
                          </label>
                          <div className="mt-2">
                            <select onChange={(event) => setForm({ ...getForm, [item]: event.currentTarget.value })}>
                                {getData[index].map((option) => (
                                    <option key={option.id} value={option.id}>
                                    {option.descricao || option.email}
                                    </option>
                                ))}
                            </select>
                          </div>
                        </>
                      )
                    ) : (
                      <TextField
                        id="standard-basic"
                        label={item}
                        variant="standard"
                        disabled={item === 'id' || item === 'created_at' || item === 'updated_at'}
                        onChange={(event) => handlerForm(item, event)}
                        value={getForm[item] === 0 || getForm[item] === '' ? '' : getForm[item]}
                      />
                    )}
                  </div>
                ))
              }
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
                  Cancelar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
