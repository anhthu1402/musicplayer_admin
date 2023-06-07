import './App.css';
import SideBar from "./components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Total from "./pages/Total";
import MUser from "./pages/MUser";
import MArtist from "./pages/MArtist";
import MSong from "./pages/MSong";
import MAlbum from "./pages/MAlbum";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import NewArtist from "./components/NewArtist";
import NewSong from "./components/NewSong";
import NewUser from "./components/NewUser";
import NewAlbum from "./components/NewAlbum";
import "./components/nsong.cshtml"
import Switch from '@mui/material/Switch';
import SignUp from "./components/SignUp";
import DetailsUser from "./components/DetailUser";

function App() {
  return (
    <div className="main">
    <Router>
        <SideBar />
      <div>
      {/* <Header className="header"/> */}
      <div style={{ margin: `20px 50px` }}>
        <Routes>
          <Route path="/total" exact Component={Total} />
          <Route path="/dashboard" exact Component={Dashboard} />
          <Route path="/songs" exact Component={MSong}/>
          <Route path="/artists" exact Component={MArtist}/>
          <Route path="/albums" exact Component={MAlbum}/>
          <Route path="/users" exact Component={MUser}/>
          <Route path="/signIn" exact element={SignIn} />
          <Route path="/signUp" exact element={SignUp} />
          <Route path="/newArtist" exact Component={NewArtist}/>
          <Route path="/newSong" exact Component={NewSong}/>
          <Route path="/newUser" exact Component={NewUser}/>
          <Route path="/users/:id" exact Component={DetailsUser}  />
          <Route path="/newAlbum" exact Component={NewAlbum}/>
        </Routes>
      </div>
      </div>
    </Router>

  </div>

  );
}

export default App;
