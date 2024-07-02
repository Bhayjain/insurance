/**
 * Styles.
 */
import './style.scss';

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
class Dashboard extends Component {
    render() {
        const dashboard_app_view = Cookies.get('dashboard_app_view');
        const book_your_home_page = Cookies.get('book_your_home_page');
        return (
            <PageWrap>
                   <div style={{display:dashboard_app_view == "true" && book_your_home_page == "telecaller_app_page" ? "block":"none"}}>
                    <AsyncComponent component={ () => import( './content' ) } />
                    </div>
            </PageWrap>
        );
    }
}

export default Dashboard;
