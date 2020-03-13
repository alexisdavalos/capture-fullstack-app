import React, { useEffect } from 'react'
import Photos from './Photos';
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/index'
const PhotoWrapper = (props) => {
    console.log('PhotoWrapper Props:', props)
    const fetchPosts = props.fetchPosts;
    useEffect(() => {
        fetchPosts();
    }, [])
    return (
        <div className='PhotoWrapper'>
            {(props.async.posts.length !== 0) ? props.async.posts.map((item, index) => {
                console.log(index);
                return <Photos key={item.id} index={index} photo={item} />
            }) : <Loader
                    type="Grid"
                    color="#38A1DE"
                    height={100}
                    width={100}
                    className='Loader'
                />}}
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
    { fetchPosts }
)(PhotoWrapper);