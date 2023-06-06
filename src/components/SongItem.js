import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayArrowRounded,
} from "@mui/icons-material";
import "../styles/SongItem.css";

function SongItem({ item }) {
  function getImgUrl(url) {
    return require("../assets/" + url);
  }
  return (
    <Card className={"cardSong"}>
      <CardContent className={"songItem"}>
        <CardMedia
          className="songMedia"
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
          alt={item.title}
        />
        <button className="playBtn">
          <PlayArrowRounded />
        </button>
        <div className={"Detail"}>
          <div className={"songHeader"}>
            <Typography gutterBottom variant="h5" className={"songTitle"}>
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={"songArtist"}
              sx={{ display: `flex`, flexDirection: `row` }}
            >
              {item.artist.map((child, index) => {
                if (index < Object.keys(child).length - 1) {
                  return (
                    <div key={index} item={child} className="artist">
                      {child.name}
                    </div>
                  );
                } else
                  return (
                    <div key={index} item={child}>
                      , <span className="artist">{child.name}</span>
                    </div>
                  );
              })}
            </Typography>
          </div>
          <div className={"songMoreDetail"}>
            <Typography
              sx={{ cursor: `pointer` }}
              variant="icon"
              component={
                item.isFavorite ? FavoriteIcon : FavoriteBorderOutlined
              }
              className={item.isFavorite ? "songFavorite" : "noneFavorite"}
            />
            <Typography className={"time"}>{item.time}</Typography>
            <button className="moreOption">
              <MoreHoriz />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SongItem;
