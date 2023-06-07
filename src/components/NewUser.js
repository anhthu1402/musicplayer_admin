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
          <label>Tên đầy đủ</label>
          <input type="text" placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="abc@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" placeholder="0xxx" />
        </div>
        <div className="newUserItem">
          <label>Quốc gia</label>
          <input type="text" placeholder="" />
        </div>
      </form>
      <button className="newUserButton">Thêm mới</button>
    </div>
  );
}
export default NewUser