import "../styles/newuser.css";
function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Xác nhận lại mật khẩu</label>
          <input type="password" placeholder="password" />
        </div>
      </form>
      <button className="newUserButton">Thêm mới</button>
    </div>
  );
}
export default NewUser