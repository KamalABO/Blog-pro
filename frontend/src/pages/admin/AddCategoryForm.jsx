import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required");

    dispatch(createCategory({ title }));
    setTitle("");
  };

  const columns = [
    {
      name: 'Categories',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: (<input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sidebar-search-input"
        />)
    }
  ];


  return (
    <section className="table-container">
            <AdminSidebar />
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Category Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="add-category-btn" type="submit">
          Add
        </button>
      </form>
    <DataTable
          columns={columns}
          data={filteredCategories}
          selectableRows
          fixedHeader
          pagination
          paginationPerPage={5}
          // conditionalRowStyles={conditionalRowStyles}
        >
        </DataTable>

        </div>
    </section>
  );
};

export default AddCategoryForm;
