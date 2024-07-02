/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';
import Cookies from 'js-cookie';

/**
 * Component
 */
class TaskPage extends Component {
    render() {
        const time_tracker_view = Cookies.get('time_tracker_view');
        // const time_tracker_page = Cookies.get('time_tracker_page');
        return (
            <PageWrap>
             <div style={{display:time_tracker_view == "true"  ? "block" :"none"}}>
             {/* <div style={{display:time_tracker_view == "true" && time_tracker_page == "true" ? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
            </div> 
            </PageWrap>
        );
    }
}

export default TaskPage;
