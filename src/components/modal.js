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

    useEffect(() => {
        if (row) setKeys(Object.keys(row));
    }, [row]);

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
                            {keys.map((item) => (
                                <TextField
                                    id="standard-basic"
                                    label={item}
                                    variant="standard"
                                    disabled={item === 'id' || item === 'created_at' || item === 'updated_at'}
                                    onChange={(event) => handlerForm(item, event)}
                                    value={getForm[item] === 0 || getForm[item] === '' ? '' : getForm[item]}
                                />
                            ))}
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