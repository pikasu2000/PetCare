import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div >
      <Link to='/' >
      <img src={logo} alt="" />
      </Link>
    </div>
  );
}

export default AdminNavbar;
