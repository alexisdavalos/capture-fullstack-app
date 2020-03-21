// If application requires Asyncronous actions
import { axiosWithAuth } from '../utils/axiosWithAuth';
export const ACTION_NAME = "ACTION_NAME";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR'

export const START_LOGIN = "START_LOGIN";
export const START_LOGIN_SUCCESS = "START_LOGIN_SUCCESS";
export const START_LOGIN_ERROR = 'START_LOGIN_ERROR'

export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'

// This is an async action creator.
export const fetchPosts = () => dispatch => {
	dispatch({ type: FETCH_POSTS });
	axiosWithAuth()
		.get('api/posts')
		.then(res => dispatch({ type: FETCH_POSTS_SUCCESS, payload: res.data }))
		.catch(err => dispatch({ type: FETCH_POSTS_ERROR, payload: err }))
};

export const newPost = (post) => dispatch => {
	dispatch({ type: CREATE_POST });
	axiosWithAuth()
		.post('api/posts', post)
		.then(res => dispatch({ type: CREATE_POST_SUCCESS, payload: res.data }))
		.catch(err => dispatch({ type: CREATE_POST_ERROR, payload: err }))
};

export const deletePost = (id) => dispatch => {
	dispatch({ type: DELETE_POST });
	axiosWithAuth()
		.delete(`api/posts/${id}`)
		.then(res => console.log(res))
		.catch(err => dispatch({ type: DELETE_POST_ERROR, payload: err }))
};

export const loginAction = (user) => dispatch => {
	dispatch({ type: START_LOGIN });
	axiosWithAuth()
		.post('api/auth/login', user)
		.then(res => {
			dispatch({ type: START_LOGIN_SUCCESS, payload: res.data.message })
			window.localStorage.setItem('token', res.data.token)
			window.localStorage.setItem('userID', JSON.stringify(res.data.message))
		})
		.catch(err => dispatch({ type: START_LOGIN_ERROR, payload: err }))
};

// This is a sync action creator
export const actionName = payload => ({
	type: ACTION_NAME,
	payload: payload
});