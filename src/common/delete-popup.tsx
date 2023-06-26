import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Box, DialogContent, Stack } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export interface DeleteDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onDelete: () => void;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { onClose, open, onDelete } = props;

  const handleClose = () => {};

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
          <ReportGmailerrorredIcon color="warning" sx={{ fontSize: 30 }} />
          <Typography
            alignSelf={"center"}
            color={"orangered"}
            textAlign={"center"}
          >
            Confirm Delete
          </Typography>
        </Stack>{" "}
      </DialogTitle>
      <DialogContent>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={8}
          padding={2}
        >
          <Box>
            <Typography variant="h3">
              Are you sure, You want to delete this user?
            </Typography>
            <Typography variant="body1" textAlign={"center"}>
              This action is irreversible!
            </Typography>
          </Box>
          <Stack direction={"row"} spacing={4} alignItems={"flex-end"}>
            <Button onClick={() => onClose(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={onDelete} color="error" variant="contained">
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
