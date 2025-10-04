
import PostList from "../../components/posts/PostList";
import "./home.css";
import logo from './Arabic_Wikipedia_Logo_Gaza_(3).svg.png';
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import User from "../../components/users/User";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  return (
    <section className="home">
      <table className="home-hero-header">
        <div className="home-hero-header-layout">
          <tbody>
            <tr>
              <td className="img">
                <img src={logo} />
              </td>
              <td className="title">
                <span>
                  <p>  تضامنًا مع حق الشعب الفلسطيني </p>
                  <p>لا للإبادة الجماعية في غزة .... لا لقتل المدنيين
                  لا لاستهداف المستشفيات والمدارس .... لا للتضليل والكيل بمكيالين </p>
                  <p>أوقفوا الحرب .... وانشروا السلام العادل والشامل</p>
                  <br />
                  <p> In solidarity with the right of the Palestinian people </p>
                  <p>No to genocide in Gaza.... No to killing civilians. No to targeting hospitals and schools.... No to deception and double standards</p>
                  <p>Stop the war....and spread just and comprehensive peace</p>
                </span>
              </td>
            </tr>
          </tbody>
          <h1 className="home-title">Welcome to Kemo</h1>
        </div>
      </table>
      <div className="home-latest-post">
       <div className="home-latest-post-right"> Latest Posts </div>
        </div>
      <div className="home-container">
        <PostList posts={posts}/>
        <Sidebar/>
        {/* <User/> */}
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
