import React, { memo } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const Columns = memo(() => {
    const columns = [
        'Agenda',
        'CPF',
        'Data de Registro',
        'Hora de início',
        'Hora de término'
    ];

    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell key={index} align="center">
                        {column}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
});
