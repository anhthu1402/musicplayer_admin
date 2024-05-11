import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArtistAlbumItem.css"

function ArtistAlbumItem({ item }) {
    return (
        <div className="artistAblumDetail">
            <div className="artistAlbum">
                <Link
                    to={"/albums/detail/" + item.id}
                    state={item.id}
                    style={{ color: "black", textDecoration: 'none' }}
                >
                    <div className="albumImage">
                        <img src={item.albumImage} alt={item.albumName} />
                    </div>
                </Link>

            </div>
            <div className="albumTitle">
                <Link
                    to={"/albums/detail/" + item.id}
                    state={item.id}
                    style={{ color: "black", textDecoration: 'none' }}
                >
                    <h3 style={{ fontSize: "1.2vw" }}>
                        {item.albumName}
                    </h3>
                </Link>
            </div>
        </div>
    );
}

export default ArtistAlbumItem;
