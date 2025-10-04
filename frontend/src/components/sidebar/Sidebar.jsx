import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="sidebar">
    <h5 className="sidebar-title">CATEGORIES</h5>
    <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sidebar-search-input"
    />
    <ul className="sidebar-links">
    {filteredCategories.length > 0 ? (
         filteredCategories.map((category) => (
            <Link
                className="sidebar-link"
                key={category._id}
                to={`/posts/categories/${category.title}`}
            >
                                {category.title}
                            </Link>
         )
                )
            ) : (
                <div className="no-results">This category is not available</div>
            )}
        {/* {filteredCategories.map((category) => (
            <Link
                className="sidebar-link"
                key={category._id}
                to={`/posts/categories/${category.title}`}
            >
                {category.title}
            </Link>
        ))} */}
    </ul>
</div>
  );
};

export default Sidebar;
