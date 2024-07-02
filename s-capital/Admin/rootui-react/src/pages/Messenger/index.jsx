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
class MessengerPage extends Component {
    render() {
        const user_management_view = Cookies.get('user_management_view');
        console.log("user_management_view____________",typeof user_management_view)
        return (
            <PageWrap>
              {/*  // <PageTitle
                //     breadcrumbs={ {
                //         '/': 'Home',
                //         '/mailbox': {
                //             title: 'Apps',
                //             sub: 'apps',
                //         },
                //     } }
                // >
                //     <h1>Employee</h1>
                // </PageTitle>
                */}
                <div style={{display:user_management_view == "true"? "block" :"none"}}>

                    <AsyncComponent component={ () => import( './content' ) } />
               </div>
            </PageWrap>
        );
    }
}

export default MessengerPage;
