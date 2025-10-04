import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";
import { Link } from "react-router-dom";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComments = comments.filter(comment =>
      comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAllComments());
  }, []);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
      <div className="search">
        <h1 className="table-title">Comments</h1>
        <input
        type="text"
        placeholder="Search Comment or user..."
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
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { filteredComments.length > 0 ? (
            filteredComments.map((item,index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.user.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">
                    <Link
                  to={`/profile/${item.user?._id}`}
                  className="header-dropdown-item">
                      {item.user.username}
                     </Link>
                    </span>
                  </div>
                </td>
                <Link
                  to={`/posts/details/${item.postId}`}
                  className="header-dropdown-item">
                <td>{item.text}</td>
                  </Link>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))):(
              <div className="no-results"> comment is not available</div>
              )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
