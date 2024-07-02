/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import MarkdownEditor from '../../components/easy-mde';
 
 /**
  * Component
  */
 class Content extends Component {
     render() {
         return (
             <Fragment>
                 
             </Fragment>
         );
     }
 }
 
 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) )( Content );
 