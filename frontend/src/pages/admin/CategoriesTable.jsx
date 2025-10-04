import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch , useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId))
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <div className="search">
        <h1 className="table-title">Categories</h1>
        <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sidebar-search-input"
        />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
            filteredCategories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategoryHandler(item._id)}>
                      Delete Category
                    </button>
                  </div>
                </td>
              </tr>
            ))) : (
              <div className="no-results">This category is not available</div>
          )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoriesTable;
