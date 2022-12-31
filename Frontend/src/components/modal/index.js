import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ResponsiveDialog({ tittle, open, onClose, onSubmit, children }) {

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={onClose} >
      <DialogTitle>
        {tittle}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}> Cancel </Button>
        <Button onClick={onSubmit} autoFocus>  Submit </Button>
      </DialogActions>
    </Dialog>
  );
}
