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
 class ShowAttendance extends Component {
     render() {
        const payroll_view = Cookies.get('payroll_view');
         return (
             <PageWrap>
                  <div style={{display:payroll_view == "true"? "block" :"none"}}>
                     <AsyncComponent component={ () => import( './content' ) } />
                   </div>  
             </PageWrap>
         );
     }
 }
 
 export default ShowAttendance;
 