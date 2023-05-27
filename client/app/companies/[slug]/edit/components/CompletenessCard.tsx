import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CompletenessCard = (props: CircularProgressProps & { value: number }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", height: 60 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          position: "absolute",
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        value={100}
        size={"60px"}
      />
      <CircularProgress variant="determinate" size={"60px"} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: "18px" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CompletenessCard;
