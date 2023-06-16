import React, { Component } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayArrowRounded,
} from "@mui/icons-material";
import "../styles/SongItem.css";
import { Link } from "react-router-dom";

class SongItem extends Component {
  render() {
    function getImgUrl(url) {
      return require("../assets/" + url);
    }
    return (
      <Card className={"cardSong"}>
        <CardContent className={"songItem"}>
          <div
            className="songMedia"
            // onClick={() => {
            //   if (this.props.song.isUsing !== true) {
            //     this.props.song.setUsing(true);
            //   }
            //   this.props.song.setPlay(true);
            //   this.props.song.setSong(this.props.item);
            //   this.props.song.setTracks(this.props.tracks);
            //   this.props.song.setPlaylist(this.props.tracks);
            //   this.props.song.setSongIndex(this.props.index);
            //   localStorage.setItem("song", JSON.stringify(this.props.item));
            //   localStorage.setItem("tracks", JSON.stringify(this.props.tracks));
            //   localStorage.setItem("index", JSON.stringify(this.props.index));
            //   localStorage.setItem("play", JSON.stringify(true));
            //   localStorage.setItem(
            //     "playlist",
            //     JSON.stringify(this.props.tracks)
            //   );
            //   console.log(this.props.song.play);
            // }}
          >
            <img
              style={{
                width: `4vw`,
                height: `4vw`,
                border: `0.2px solid transparent`,
                borderRadius: `3px`,
                position: "relative",
                marginRight: `1vw`,
              }}
              src={getImgUrl(`${this.props.item.songImage}`)}
              alt={this.props.item.songName}
            />
            {/* <button className="playBtn">
              <PlayArrowRounded />
            </button> */}
          </div>

          <div className={"Detail"}>
            <div className={"songHeader"}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  fontSize: "1.6vw",
                  "@media (max-width: 1163px)": {
                    fontSize: "1.8vw",
                  },
                }}
              >
                {this.props.item.songName}
              </Typography>
              <Typography
                variant="body2"
                className={"songArtist"}
                sx={{
                  fontSize: "1vw",
                  "@media (max-width: 1163px)": {
                    fontSize: "1.4vw",
                  },
                }}
              >
                {this.props.item.representation.map((child, index) => {
                  return (
                    <span key={index} item={child} className="artist">
                      <Link
                        to={`/artistDetail/${child.artistName}`}
                        state={child}
                        color="grey"
                      >
                        {child.artistName}
                      </Link>
                    </span>
                  );
                })}
              </Typography>
            </div>
            <div className={"songMoreDetail"}>
              {/* <Typography
                sx={{ cursor: `pointer`, fontSize: "1.3vw" }}
                variant="icon"
                component={
                  this.props.item.isFavorite
                    ? FavoriteIcon
                    : FavoriteBorderOutlined
                }
                color={this.props.item.isFavorite ? "#ff4672" : ""}
                className={
                  this.props.item.isFavorite ? "songFavorite" : "noneFavorite"
                }
              /> */}
              <Typography
                className={"time"}
                sx={{
                  "@media (max-width: 969px)": {
                    fontSize: "1.6vw !important",
                  },
                }}
              >
                {this.props.item.timeLimit}
              </Typography>
              {/* <button className="moreOption">
                <MoreHoriz sx={{ cursor: `pointer`, fontSize: "1.3vw" }} />
              </button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default SongItem;
