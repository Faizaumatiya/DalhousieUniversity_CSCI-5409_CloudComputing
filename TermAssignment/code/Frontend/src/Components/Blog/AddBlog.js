import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddBlogHeader from './AddBlogHeader';

//https://www.section.io/engineering-education/registration-form-react.js-firebase/

export default function AddBlog() {
    const [title, setTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorBio, setAuthorBio] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);



    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let image = null;
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            image = await new Promise((resolve, reject) => {
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
            });
        }
        const loggedInEmail = localStorage.getItem('emailid')
        const email = { email: loggedInEmail }


        const BlogData = {

            title: title,
            authorName: authorName,
            authorBio: authorBio,
            content: content,
            image: image

        };

        axios.post("https://xlwczb6nh2l6qa7nms2lax3if40dluky.lambda-url.us-east-1.on.aws/", email)
            .then((response) => {
                console.log(response)
                alert("SNS message published successfully`");
            })

        axios.post("https://b3m2oyity8.execute-api.us-east-1.amazonaws.com/addBlog", BlogData)
            .then((response) => {
                alert("Blog Post Added Successfully");
                navigate("/viewBlog");
            });
        // Publish a message to the SNS topic



    }


    return (
        <div>
            <AddBlogHeader />
            <div className='form'>
                <div className='form-body'>
                    {/* <div>
                <h3>Add Blog</h3></div>   */}
                </div>
                <form onSubmit={handleSubmit}>

                    <div className="title">
                        <label className="form__label" for="title">Title </label>
                        <input className="form__input" type="text"
                            value={title} onChange={e => setTitle(e.target.value)}
                            id="title"
                            placeholder="Title"
                            required />
                    </div>
                    <div className="authorName">
                        <label className="form__label" for="authorName">Author Name </label>
                        <input type="text" name="" id="authorName"
                            value={authorName}
                            className="form__input"
                            onChange={e => setAuthorName(e.target.value)}
                            placeholder="Author Name"
                            required />
                    </div>
                    <div className="authorBio">
                        <label className="form__label" for="authorBio">Auhtor's Bio </label>
                        <textarea type="text"
                            id="authorBio" className="form__input"
                            value={authorBio}
                            onChange={e => setAuthorBio(e.target.value)}
                            placeholder="Bio"
                            required />
                    </div>
                    <div className="content">
                        <label className="form__label" for="password">Content </label>
                        <textarea className="form__input"
                            type="text"
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Content"
                            required />
                    </div>
                    <div className="image">
                        <label className="form__label" htmlFor="image">Upload media</label>
                        <input type="file"
                            id="image"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            required />
                    </div>

                    <div class="footer">
                        <button onClick={() => handleSubmit()}
                            type="submit" class="btn">Add Blog Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}