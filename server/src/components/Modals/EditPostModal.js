import React, { useState } from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { newPost, fetchPosts } from '../../actions/index'
const EditPostModal = (props) => {
    console.log('EditPostModal.js Props:', props)
    const [newPost, setNewPost] = useState({
        ...props.async.newPost,
        title: props.photo.title,
        photo: props.photo.photo,
        story: props.photo.story,
        details: props.photo.details,
        traveler_id: props.photo.traveler_id
    })
    console.log('EditPostModal.js newPost State:', newPost)
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
    const handleSubmit = async (e) => {
        console.log("submitting...")
        e.preventDefault();
        await axiosWithAuth()
            .put(`/api/posts/${props.photo.id}`, newPost)
            .then(res => console.log('UPDATED POST RESPONSE', res))
            .catch(err => console.log(err))
        setNewPost({
            ...props.async.newPost,
            title: "",
            photo: "",
            story: "",
            details: "",
        })
        props.fetchPosts(); //updates posts
        props.setEditModal(!props.editModal);
        props.toggleDropdown();
    }
    return (
        <div className='editPostModal'>
            <div className="modal is-active">
                <div className="modal-background">
                    <div className="modal-card">
                        <header className="modal-card-head has-background-info">
                            <p className="modal-card-title has-text-white">Edit Moment</p>
                            <button onClick={() => { props.setEditModal(!props.editModal); props.toggleDropdown() }} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <img src={newPost.photo} alt={newPost.title} />
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
                            <button onClick={() => { props.setEditModal(!props.editModal); props.toggleDropdown() }} className="button">Cancel</button>
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
    { newPost, fetchPosts }
)(EditPostModal);