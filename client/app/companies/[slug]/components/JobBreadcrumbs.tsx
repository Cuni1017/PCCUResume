"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import MUILink from "@mui/material/Link";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  // event.preventDefault();
  // console.info("You clicked a breadcrumb.");
}

const JobBreadcrumbs = ({
  companyName,
  vacancyName,
}: {
  companyName: string;
  vacancyName: string;
}) => {
  const breadcrumbs = [
    <MUILink
      underline="hover"
      key="1"
      color="inherit"
      component={Link}
      href="/jobs"
      onClick={handleClick}
    >
      搜尋職缺
    </MUILink>,
    <MUILink
      underline="hover"
      key="2"
      color="inherit"
      component={Link}
      href={`/companies/${companyName}`}
      onClick={handleClick}
    >
      {companyName}
    </MUILink>,
    <Typography key="3" color="text.primary">
      {vacancyName}
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="large" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default JobBreadcrumbs;
