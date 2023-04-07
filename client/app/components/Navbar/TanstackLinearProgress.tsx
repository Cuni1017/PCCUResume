import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function LinearIndeterminate() {
  const isFetching = useIsFetching(); // 返回queryClient目前發出的request數量
  const isMutating = useIsMutating(); // 返回queryClient目前發出的mutation數量

  const display = isFetching || isMutating ? "block" : "none";

  return (
    <Box sx={{ width: "100%" }} display={display}>
      <LinearProgress />
    </Box>
  );
}
