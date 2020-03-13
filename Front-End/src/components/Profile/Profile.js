import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/index'
import ProfilePhotoWrapper from './ProfilePhotoWrapper'

const Profile = (props) => {
    console.log('Profile Props:', props.async.user.img_url)
    const userID = JSON.parse(window.localStorage.getItem('userID'));
    const [user, setUser] = useState([])
    useEffect(() => {
        axiosWithAuth()
            .get(`/api/users/${userID}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='Profile'>
            <img src={props.async.user.img_url} alt={props.async.user.name}></img>
            <h1>{user.name}</h1>
            <div className='Metrics'>
                <p><b>0</b> Posts</p>
                <p><b>0</b> Followers</p>
                <p><b>0</b> Following</p>
            </div>
            <p>{user.bio}</p>
            <ProfilePhotoWrapper />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        async: {
            posts: state.async.posts,
            error: state.async.error,
            isLoading: state.async.isLoading,
            user: state.async.user
        }
    }
}
export default connect(
    mapStateToProps,
    //place imported actions below
    { fetchPosts }
)(Profile);