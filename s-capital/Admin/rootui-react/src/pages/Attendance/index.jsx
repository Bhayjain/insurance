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
 class Attendance extends Component {
     render() {
        const attendance_view = Cookies.get('attendance_view');
         return (
             <PageWrap>
                    <div style={{display:attendance_view == "true"? "block":"none"}}>
                     <AsyncComponent component={ () => import( './content' ) } />
                    </div>
             </PageWrap>
         );
     }
 }
 
 export default Attendance;
 