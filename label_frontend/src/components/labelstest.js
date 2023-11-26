import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function LabelDialog() {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleLabelChange = (event) => {
      setLabel(event.target.value);
    };
  
    const handleCreateLabel = () => {
      // Logic to create a new label
      console.log('Create new label');
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open Label Dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select Label</DialogTitle>
          <DialogContent>
            <Select
              value={label}
              onChange={handleLabelChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'label1'}>Label 1</MenuItem>
              <MenuItem value={'label2'}>Label 2</MenuItem>
              {/* Add additional labels here */}
            </Select>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleCreateLabel}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
export default LabelDialog;