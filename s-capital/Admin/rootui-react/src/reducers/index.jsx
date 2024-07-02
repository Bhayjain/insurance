/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
import Cookies from 'js-cookie';
import Omit from 'object.omit';

/**
 * Internal Dependencies
 */
import { getUID } from '../utils';
import defaultSettings from '../settings';
import {
    UPDATE_AUTH,
    UPDATE_SETTINGS,
    ADD_TOAST,
    REMOVE_TOAST,
} from '../actions';

// initial state.
const INITIAL_SETTINGS_STATE = {
    ...defaultSettings,
};
const INITIAL_AUTH_STATE = {
    token2: Cookies.get( 'admin_data' ),
    token3: Cookies.get( 'book_your_home_page' ),
};
const INITIAL_TOASTS_STATE = [];

/**
 * Reducer
 */
const rootReducer = combineReducers( {
    auth: ( state = INITIAL_AUTH_STATE, action ) => {
        switch ( action.type ) {
        case UPDATE_AUTH:
            // save token to cookies for 3 days.
            if ( typeof action.auth.token2 !== 'undefined' ) {
                Cookies.set( 'admin_data', action.auth.token2 );
                if(  typeof action.auth.token3 !== 'undefined' ){
                    Cookies.set( 'book_your_home_page', action.auth.token2 );
                  }
            }

            return Object.assign( {}, state, action.auth );
        default:
            return state;
        }
    },
    settings: ( state = INITIAL_SETTINGS_STATE, action ) => {
        switch ( action.type ) {
        case UPDATE_SETTINGS:
            return Object.assign( {}, state, action.settings );
        default:
            return state;
        }
    },
    toasts: ( state = INITIAL_TOASTS_STATE, action ) => {
        switch ( action.type ) {
        case ADD_TOAST:
            const newData = {
                ...{
                    title: '',
                    content: '',
                    color: 'brand',
                    time: false,
                    duration: 0,
                    closeButton: true,
                },
                ...action.data,
            };

            if ( newData.time === true ) {
                newData.time = new Date();
            }

            return {
                ...state,
                [ getUID() ]: newData,
            };
        case REMOVE_TOAST:
            if ( ! action.id || ! state[ action.id ] ) {
                return state;
            }
            return Omit( state, action.id );
        default:
            return state;
        }
    },
} );

export default rootReducer;
