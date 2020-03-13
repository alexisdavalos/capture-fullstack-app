import React, { useEffect } from 'react'
import Stories from './Stories';
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/index'
const StoriesWrapper = (props) => {
    console.log('StoriesWrapper Props:', props)
    const fetchPosts = props.fetchPosts;
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])
    return (
        <div className='StoriesWrapper'>
            {(props.async.posts.length !== 0) ? props.async.posts.map((item, index) => {
                return <Stories key={item.id} index={index} photo={item} />
            }) : <Loader
                    type="Grid"
                    color="#38A1DE"
                    height={100}
                    width={100}
                    className='Loader'
                />}
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
)(StoriesWrapper);