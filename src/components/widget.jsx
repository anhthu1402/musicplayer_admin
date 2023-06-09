import "../styles/widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {
  ExpandMore,
  ExpandLess,
  LibraryMusic,
  HomeRounded,
  MusicNoteRounded,
  PersonRounded,
  PlaylistPlayRounded,
  BarChartRounded,
  TrendingUpRounded,
  AccountCircle,
  LineAxis,
} from "@mui/icons-material";
import AlbumSharpIcon from '@mui/icons-material/AlbumSharp';


const Widget = ({ type }) => {
  let data;

  //temporary
  // const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Người dùng",
        isMoney: false,
        link: "See all users",
        amount: "20",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "song":
      data = {
        title: "Bài hát",
        isMoney: false,
        link: "View all songs",
        amount: "50",
        icon: (
          <MusicNoteRounded
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "artist":
      data = {
        title: "Nghệ sĩ",
        isMoney: true,
        link: "View all artists",
        amount: "10",
        icon: (
          <PersonRounded
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "album":
      data = {
        title: "Album",
        isMoney: true,
        amount: "8",
        link: "See all albums",
        icon: (
          <AlbumSharpIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;