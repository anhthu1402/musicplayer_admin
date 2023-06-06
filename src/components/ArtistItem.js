import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { MoreHoriz, PlayCircleFilled } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import "../../styles/ArtistItem.css";

function ArtistItem({ item }) {
    function getImgUrl(url) {
      return require("../assets/" + url);
    }
    return (
      <Card className={"cardArtist"}>
        <CardContent className={"artistItem"}>
          <CardMedia
            className="artistMedia"
            component="img"
            height="100%"
            style={{
              width: `60px`,
              height: `60px`,
              marginRight: `20px`,
              border: `0.2px solid transparent`,
              borderRadius: `3px`,
            }}
            image={getImgUrl(`${item.image}`)}
            alt={item.name}
          />
        <Typography
            component="header"
            sx={{ fontSize: `large`, marginTop: `10px` }}
        >
            {item.name}
        </Typography>
        </CardContent>
      </Card>
    );
  }
  
  export default ArtistItem;
  