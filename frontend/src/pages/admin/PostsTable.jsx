import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts,deletePost } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
     dispatch(getAllPosts());
    }, []);

  // Delete Post Handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      }
    });
  };

    return ( 
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
            <div className="search">
          <h1 className="table-title">Posts</h1>
          <input
           type="text"
           placeholder="Search posts,user,Category..."
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
                            <th>Post Title</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filteredPosts.length > 0 ? (
                        filteredPosts.map((item,index)=>(            
                             <tr key={item._id}>
                                <td>{index +1}</td>
                                <td>
                                  <div className="table-image">
                                    <img src={item.user.profilePhoto?.url} alt="" className="table-user-image" />
                                    <span className="table-username">
                                      <Link
                                       to={`/profile/${item.user?._id}`}
                                       className="header-dropdown-item"
                                      >
                                        {item.user.username}
                                      </Link>
                                      </span>
                                  </div>
                                </td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/posts/details/${item._id}`}>
                                               View Post
                                            </Link>
                                        </button>
                                        <button onClick={() => deletePostHandler(item._id)}>
                                            Delete Post
                                        </button>
                                    </div>
                                </td>
                            </tr>
        ))):(
          <div className="no-results"> post is not available</div>
        )}
                    </tbody>
                </table>
            </div>
        </section>
     );
}
 
export default PostsTable;