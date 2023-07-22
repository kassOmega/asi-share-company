import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {
  Box,
  DialogContent,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
} from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export interface DeleteDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onDelete: () => void;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { onClose, open, onDelete } = props;

  const handleClose = () => {
    onClose(false);
  };

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
export interface ImageProps {
  open: boolean;
  onClose: (value: boolean) => void;
  image: string[];
}
export const PictureDialog = (props: ImageProps) => {
  const { onClose, open, image } = props;

  const handleClose = () => {
    onClose(false);
  };
  const [selectedImage, setSelectedImage] = useState(0);
  const handleNext = () => {
    if (selectedImage === image.length - 1) return setSelectedImage(0);
    return setSelectedImage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (selectedImage < 1) return setSelectedImage((prev) => prev - 1);
    return setSelectedImage(image.length);
  };
  return (
    <Modal onClose={handleClose} open={open} sx={{ background: "#c4c4c4" }}>
      <Stack justifyContent={"center"} alignItems={"center"} padding={2}>
        <Box
          sx={{
            borderRadius: 10,
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
          }}
        >
          <SquareImage src={"/" + image[0]} height={500} width={600} />
        </Box>
        <Box justifyContent="space-between" flex={1}>
          <Button onClick={handlePrev}>
            <ArrowBackIosIcon />
          </Button>
          <Button onClick={handleNext}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
        <Box sx={{ width: 300, height: 250 }}>
          <ImageList cols={4} rowHeight={164}>
            {image.map((item, index) => (
              <ImageListItem
                key={item}
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedImage(index)}
              >
                <img src={"/" + item} alt={""} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Stack>
    </Modal>
  );
};
const SquareImage = ({
  width,
  height,
  src,
  rounded,
  onClick: handleClick,
}: {
  width?: number | string;
  height?: number | string;
  src?: string;
  rounded?: number;
  onClick?: () => void;
}) => {
  return (
    <img
      src={src}
      alt=""
      style={{ width: width, height: height, borderRadius: rounded }}
      onClick={handleClick}
    />
  );
};
