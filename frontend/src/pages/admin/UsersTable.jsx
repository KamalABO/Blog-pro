import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <div className="search">
        <h1 className="table-title">Users</h1>
        <input
           type="text"
           placeholder="Search User or email..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="sidebar-search-input"
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { filteredProfiles.length > 0 ? (
            filteredProfiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))):(
              <div className="no-results"> user is not available</div>
              )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
