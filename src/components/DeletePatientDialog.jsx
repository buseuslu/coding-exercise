import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { deletePatient } from '../store/patients';
import { useDispatch } from 'react-redux';

export default function DeletePatientDialog({ hospitalNumberProp }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePatient = () => {
    dispatch(deletePatient({ hospitalNumber: hospitalNumberProp }));
  };

  return (
    <Box>
      <Tooltip title="Delete patient">
        <IconButton aria-label="delete patient" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this patient?</DialogTitle>
        <DialogActions sx={{ mb: 1 }}>
          <Button sx={{ mr: 1 }} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            color="error"
            onClick={() => {
              handleDeletePatient();
              handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
