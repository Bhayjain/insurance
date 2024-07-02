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
class GridPage extends Component {

    render() {
        const policy_dock_view = Cookies.get('policy_dock_view');
        // const operation_page = Cookies.get('operation_page');
        return (
            <PageWrap>
             <div style={{display:policy_dock_view == "true"  ? "block":"none"}}>
             {/* <div style={{display:policy_dock_view == "true" && operation_page == "true" ? "block":"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
             </div>
            </PageWrap>
        );
    }
}

export default GridPage;
