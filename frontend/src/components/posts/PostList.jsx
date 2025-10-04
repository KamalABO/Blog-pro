import { useState } from "react";
import PostItem from "./PostItem";
import "./posts.css";

const PostList = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = posts.filter(posts =>    
    posts.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    posts.description.toLowerCase().includes(searchTerm.toLowerCase())||
    posts.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return ( 
    <div className="post-list">
        <div className="post-search">
               <input
        type="text"
        placeholder="Search Posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sidebar-search-input"
        />
        </div>
                    
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(item => <PostItem post={item} key={item._id} />
                )
            ) : (
                <div className="no-results">This post is not available</div>
            )}
        {/* {filteredPosts.map(item => <PostItem post={item} key={item._id} />)} */}
    </div> 
    );
}
 
export default PostList;