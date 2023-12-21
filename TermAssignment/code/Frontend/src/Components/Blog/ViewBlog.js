import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./viewBlog.css";
import BlogHeader from './BlogHeader';

function BlogPosts() {

    const navigate = useNavigate();
    const navigateToBlogDetailPage = () => {
        // 👇️ navigate to /contacts
        navigate('/BlogDetailPage');
    };
    const navigateToBlogPage = () => {
        // 👇️ navigate to /contacts
        navigate('/addBlog');
    };

  const [blogPosts, setBlogPosts] = useState([]);

  const getBlogPosts = async (e) => {
    e.preventDefault();
    try {
    //const response = await axios.get("https://ba03hf5wz1.execute-api.us-east-1.amazonaws.com/myViewBlog");
    const response = await axios.get("https://ybejxzc5gqpiil76dei3trmlua0ypnfr.lambda-url.us-east-1.on.aws/");
    setBlogPosts(response.data);
      console.log(response.data)
      console.log(response)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <BlogHeader/>
    
    <div className='container'>
        <div className='load-button'>
        <button onClick={getBlogPosts}>Load Blog Posts</button> </div>
        <ul className="card-grid">
        
    
        {blogPosts.map((post) => (
            <li>
                <article className="card">
                    <div className="card-image">
                        <img src={post.imageData} alt="user-profile"></img>  
                    </div>
                    <div className="card-content">
                        <h2 className="card-name"> {post.title}</h2>
                        <ol className="card-list">
                            <li>
                                <b><span>By {post.authorName}</span></b>
                            </li>
                            <li>
                                <b>Bio: </b><span>{post.bio}</span>
                            </li>
                            <li>
                                <b>Content: </b> <span>{post.content}</span>
                            </li>
                        </ol>
                        <button>Read more</button>
                       
                    </div>
                    </article>
            </li>))}
        </ul>
    </div>
    </div>
);  }

export default BlogPosts;
