// Create a new reducer and import actions from appropriate action file; in this case it's index.js
import {
	FETCH_POSTS,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_ERROR,
	CREATE_POST,
	CREATE_POST_SUCCESS,
	CREATE_POST_ERROR,
	START_LOGIN,
	START_LOGIN_SUCCESS,
	START_LOGIN_ERROR,
	DELETE_POST,
	DELETE_POST_SUCCESS,
	DELETE_POST_ERROR
} from '../actions';

const initialState = {
	posts: [],
	error: '',
	currentUserID: '',
	isLoading: false,
	isLoggedIn: false,
	user: {
		name: 'Mikael Tolskbov',
		id: '',
		username: 'Mikael',
		email: 'Mikael@email.com',
		img_url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweb.richmond.k12.va.us%2Fportals%2F14%2Fassets%2Fimages%2Fuser-avatar-placeholder.png&f=1&nofb=1'
	},
	newPost: {
		title: "",
		photo: "",
		story: "",
		details: "",
		traveler_id: ''
	}
}

export const asyncReducer = (state = initialState, action) => {
	switch (action.type) {
		//User Login
		case START_LOGIN:
			return {
				...state,
				isLoading: true,
			}
		case START_LOGIN_SUCCESS:
			return {
				...state,
				currentUserID: action.payload,
				isLoggedIn: true,
				isLoading: false
			}
		case START_LOGIN_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false
			}
		//Fetch Posts
		case FETCH_POSTS:
			return {
				...state,
				isLoading: true,
			}
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				posts: action.payload,
				isLoading: false
			}
		case FETCH_POSTS_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false
			}

		//Create Post
		case CREATE_POST:
			return {
				...state,
				isLoading: true,
			}
		case CREATE_POST_SUCCESS:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				isLoading: false
			}
		case CREATE_POST_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false
			}
		//Delete Post
		case DELETE_POST:
			return {
				...state,
				isLoading: true,
			}
		case DELETE_POST_SUCCESS:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				isLoading: false
			}
		case DELETE_POST_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false
			}
		default:
			return state;
	}
}
