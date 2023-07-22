import { Grid, IconButton, Stack, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export function ImageGrid({
  images,
  onRemove,
}: {
  images: string[];
  onRemove?: (index: number) => void;
}) {
  return (
    <Grid container spacing={2}>
      {images?.map((image, index) => (
        <Grid item xs={12} md={4} key={index}>
          {onRemove && (
            <IconButton onClick={() => onRemove?.(index)}>
              <CloseIcon />
            </IconButton>
          )}
          <SquareImage
            src={image}
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 2,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
const SquareImage = styled(Stack)<{
  src: string;
  mode?: "cover" | "contain";
  scale?: number;
  height?: number | string;
}>(({ src, mode = "cover", scale, height }) => ({
  width: "100%",
  height: height ?? 0,
  paddingBottom: "100%",
  background: `url("${src}")`,
  backgroundSize: mode,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  boxSizing: "border-box",
  transition: ".8s all ease-in-out",
  "&:hover": { transform: `scale(${scale})` },
}));

export const SquareImage2 = styled("img")<{
  src: string;
  height?: number | string;
  scale?: number;
}>(({ src, height, scale }) => ({
  width: "100%",
  height: height ?? 0,
  objectFit: "cover",
  transition: ".8s all ease-in-out",
  "&:hover": { transform: `scale(${scale})` },
  src: src,
  // borderRadiusTopRight: 2,
}));
