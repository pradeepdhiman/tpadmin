import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSnackbar } from 'notistack';

const SoftSnakBar = ({ message, severity }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (message) {
            const snackbarKey = enqueueSnackbar(message, { variant: severity });

            const autoCloseTimer = setTimeout(() => {
                closeSnackbar(snackbarKey);
            }, 3000);

            return () => clearTimeout(autoCloseTimer);
        }
    }, [enqueueSnackbar, closeSnackbar, message, severity]);

    return null;
};

export default SoftSnakBar;
