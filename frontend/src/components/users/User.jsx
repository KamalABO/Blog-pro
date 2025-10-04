import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const User = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCategories = user.filter(user =>
//       user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="sidebar">
    <h5 className="sidebar-title">users</h5>
    <input
        type="text"
        placeholder="Search categories..."
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        className="sidebar-search-input"
    />
    <ul className="sidebar-links">
        {user.map((user) => (
            <Link
                className="sidebar-link"
                key={user._id}
                to={`/posts/categories/${user.username}`}
            >
                {user.username}
            </Link>
        ))}
    </ul>
</div>
  );
};

export default User;
