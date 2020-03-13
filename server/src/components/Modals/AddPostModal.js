import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { newPost } from '../../actions/index'
const AddPostModal = (props) => {
    console.log('AddPostModal.js Props:', props)
    const [newPost, setNewPost] = useState({
        ...props.async.newPost,
        traveler_id: JSON.parse(window.localStorage.getItem('userID'))
    })
    console.log('AddPostModal.js newPost State:', newPost)
    // axiosWithAuth()
    // 	.get('api/posts')
    // 	.then(res => console.log(res))
    // 	.catch(err => console.log(err))
    const handleChange = e => {
        e.preventDefault();
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
        console.log(`${e.target.name} is:`, e.target.value);
    }
    const handleSubmit = e => {
        console.log("submitting...")
        e.preventDefault();
        props.newPost(newPost);
        setNewPost({
            ...props.async.newPost,
            title: "",
            photo: "",
            story: "",
            details: "",
        })
        props.setModal(!props.modal);
    }
    return (
        <div className='addPostModal'>
            <div className="modal is-active">
                <div className="modal-background">
                    <div className="modal-card">
                        <header className="modal-card-head has-background-info">
                            <p className="modal-card-title has-text-white">Add New Moment</p>
                            <button onClick={() => props.setModal(!props.modal)} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form>
                                <label>title</label>
                                <input
                                    className="input"
                                    name='title'
                                    type="text"
                                    placeholder="Enter a new title"
                                    onChange={handleChange}
                                    value={newPost.title}
                                />
                                <label>photo URL</label>
                                <input
                                    className="input"
                                    name='photo'
                                    type="text"
                                    placeholder="Enter a new photo url"
                                    onChange={handleChange}
                                    value={newPost.photo}
                                />
                                <label>story title</label>
                                <input
                                    className="input"
                                    name='story'
                                    type="text"
                                    placeholder="Enter a new story title"
                                    onChange={handleChange}
                                    value={newPost.story}
                                />
                                <label>Details</label>
                                <textarea
                                    className="textarea"
                                    name='details'
                                    placeholder="Enter new details...."
                                    onChange={handleChange}
                                    value={newPost.details}
                                />
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button has-background-info has-text-white" onClick={handleSubmit}>Submit</button>
                            <button onClick={() => props.setModal(!props.modal)} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>

        </div>
    )
}



const mapStateToProps = state => {
    return {
        async: {
            posts: state.async.posts,
            error: state.async.error,
            currentUserID: state.async.currentUserID,
            isLoading: state.async.isLoading,
            user: state.async.user,
            newPost: state.async.newPost
        }
    }
}
export default connect(
    mapStateToProps,
    //place imported actions below
    { newPost }
)(AddPostModal);