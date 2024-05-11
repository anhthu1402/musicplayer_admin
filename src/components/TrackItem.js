import { Link } from "react-router-dom";
import React from "react";
import "../styles/TrackItem.css";

function TrackItem({ item }) {
  function printReleaseDate(dateParam) {
    const date = new Date(dateParam);
    const DAY_IN_MS = 86400000;
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(seconds / 3600);
    const days = Math.round(seconds / 86400);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const weeks = Math.round(seconds / 604800000);

    if (seconds < 5) {
      return "Hiện tại";
    } else if (seconds < 60) {
      return `${seconds} giây trước`;
    } else if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 11) {
      return `${hours} giờ trước`;
    } else if (isToday) {
      return "Hôm nay";
    } else if (isYesterday) {
      return "Hôm qua";
    } else if (days < 7) {
      return `${days} ngày trước`;
    } else if (weeks > 0 && weeks < 4) {
      return `${weeks} tuần trước`;
    }
    return date.toJSON().slice(0, 10).split("-").reverse().join("/");
  }

  return (
    <div className="item">
      <div className="songImg">
        <img src={`${item.songImage}`} alt={item.songName} />
      </div>
      <div className="songDetail">
        <div className="songTitle">
          <Link className="songTitle link" to={"/songs/edit/" + item.id} state={item}>
            {item.songName}
          </Link>
        </div>
        <div className="artist">
          {item.representation.map((child, index) => (
            <span key={index} item={child} style={{ fontSize: '15px' }}>
              <Link
                to={`/artists/detail/${child.id}`}
                state={child}
              >
                {child.artistName}
              </Link>
            </span>
          ))}
        </div>
        <div className="trackReleaseDate">
          {item.releaseDate === undefined
            ? ""
            : printReleaseDate(item.releaseDate)}
        </div>
        <div className="trackDuration">{item.timeLimit}</div>
      </div>
    </div>
  );
}

export default TrackItem;
