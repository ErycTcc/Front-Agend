import React, { memo } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const Columns = memo(() => {
    const columns = [
        'CPF',
        'Nome',
        'Telefone',
        'Gênero',
        'Idade',
        'Massa',
        'Altura',
        'Código do SUS'
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
