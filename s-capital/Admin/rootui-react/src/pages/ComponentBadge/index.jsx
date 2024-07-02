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
class ComponentBadgePage extends Component {
    render() {
        const agent_management_view = Cookies.get('agent_management_view');
        // const employee_page = Cookies.get('employee_page');
        console.log("master_view",agent_management_view);
        return (
            <PageWrap>

                <div style={{display:agent_management_view == "true"  ? "block" :"none"}}>
                {/* <div style={{display:agent_management_view == "true" && employee_page == "true" ? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
                </div>
            </PageWrap>
        );
    }
}

export default ComponentBadgePage;
