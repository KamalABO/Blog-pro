
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
// import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
// import { getPostsCount } from "../../redux/apiCalls/postApiCall";
// import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";
// import Dashboard from "./UserShar";

// const AdminMain = () => {
//     const dispatch = useDispatch();
//     const { categories } = useSelector(state => state.category);
//     const { usersCount } = useSelector(state => state.profile);
//     const { postsCount } = useSelector(state => state.post);
//     const { comments } = useSelector(state => state.comment);

//     useEffect(() => {
//      dispatch(fetchCategories());
//      dispatch(getUsersCount());
//      dispatch(getPostsCount());
//      dispatch(fetchAllComments());
//     }, []);
    export const dataLine = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October','November', 'December'],
    datasets: [
        {
            label: 'Sales',
            data: [55,50,60,87,90,65, 59, 80, 81, 56, 55, 60],
            fill: false,
            backgroundColor: '#16a085',
            borderColor: '#16a085',
        },
    ],
};

export const dataBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October','November', 'December'],
    datasets: [
        {
            label: 'Quantity',
            data: [12, 19, 3, 5, 20, 25, 40, 60, 42, 54, 80, 4],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
    ],
};