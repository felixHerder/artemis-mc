import React from "react";
import { Container, Box, Typography, Link, IconButton } from "@mui/material";
import { GitHub, Language } from "@mui/icons-material";

export default function Footer(): JSX.Element {
  return (
    <Box component="footer" sx={{ bgcolor: "#33333366", color: "text.primary", mt: "auto", py: 1 }}>
      <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ width: "50%" }} variant="caption" color="text.disabled">
          Launch data from{" "}
          <span>
            <Link underline="hover" color="text.secondary" href="https://github.com/r-spacex/SpaceX-API">
              api.spacexdata.com
            </Link>
          </span>
        </Typography>
        <Box sx={{ width: "50%", textAlign: "right" }}>
          <IconButton
            sx={{ mr: 1, color: "text.secondary" }}
            size="small"
            href="https://github.com/felixHerder/hyperion-mc"
            target="_blank"
            title="Github repo"
          >
            <GitHub fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ color: "text.secondary" }}
            size="small"
            href="https://felixherder.space"
            target="_blank"
            title="built by felixherder.space | Portfolio"
          >
            <Language fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
