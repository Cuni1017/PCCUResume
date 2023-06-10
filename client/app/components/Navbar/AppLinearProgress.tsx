import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

export default function LinearIndeterminate() {
  const appLoading = useSelector((state: Store) => state.appLoading);
  const isFetching = useIsFetching(); // 返回queryClient目前發出的request數量
  const isMutating = useIsMutating(); // 返回queryClient目前發出的mutation數量

  const display =
    isFetching || isMutating || appLoading.isLoading ? "block" : "none";

  return (
    <Box
      sx={{ width: "100%", position: "fixed", top: "0px", zIndex: "99" }}
      display={display}
    >
      <LinearProgress />
    </Box>
  );
}
