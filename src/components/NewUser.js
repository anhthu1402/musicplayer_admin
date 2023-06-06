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
        <div className="newUserItem">
          <label> Giới tính </label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Nữ</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Hoạt động</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Có</option>
            <option value="no">Không</option>
          </select>
        </div>
      </form>
      <button className="newUserButton">Thêm mới</button>
    </div>
  );
}
export default NewUser