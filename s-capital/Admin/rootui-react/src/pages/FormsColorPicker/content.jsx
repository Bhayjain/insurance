/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Row,Col,Table, Input,Spinner, Button} from 'reactstrap';
 import './style.scss'
 import {
     addToast as actionAddToast,
 } from '../../actions';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import DatePicker from '../../components/date-time-picker';
 import { CloudLightning } from 'react-feather';
 import PageTitle from '../../components/page-title';
 /**
  * Component
  */
 
 
 
 
 const my_new_width = window.innerWidth
 console.log("my_new_width",my_new_width)
 const my_new_height = window.innerHeight
 console.log("my_new_height",my_new_height)
 const my_new_nav = document.querySelector('.rui-navbar-sticky').offsetHeight
 console.log("my_new_nav",my_new_nav)
 
 var my_exact_height = my_new_height - my_new_nav
 console.log("my_exact_height",my_exact_height)
 
 
 
 
 
 class Content extends Component {
     constructor( props ) {
         super( props );
 
         this.state = {
             paidLeave:"",
             advanceLeave:"",
             text:"",
           
             fetch_paid_leaves:[],
             update_paid_leaves:[],
 
             no_data_message:"",
             isLoading:"",
             loading:false
         };
         this.fetch_paid_leaves()
     }
 
     handleValue=(e,i,type)=>{
 
         console.log(e);
         console.log(i);
 
         var fetch_paid_leaves = this.state.fetch_paid_leaves
 
         if (type == "paid_leave") {
             fetch_paid_leaves[i].total_paid_leave = Number(e) 
             console.log(fetch_paid_leaves);
             this.setState({
                 fetch_paid_leaves:fetch_paid_leaves
             })  
         }else{
             fetch_paid_leaves[i].paid_leave_in_advance = Number(e)  
             console.log(fetch_paid_leaves);
             this.setState({
                 fetch_paid_leaves:fetch_paid_leaves
             }) 
         }
 
 
         if(fetch_paid_leaves[i].total_paid_leave < fetch_paid_leaves[i].paid_leave_in_advance){
             this.setState({
                 text:"Should not be greater than total paid leaves",
             })
         }
         else{
             this.setState({
                 text:""
             })
         }
 
 
     }
 
 
 
     //-------------------------------------------------------------------Fetch_API-----------------------------------------------------------------------------------//
     fetch_paid_leaves = () => {
         const {  addToast,settings } = this.props;
 
         const res = fetch (settings.api_url + 'api/payroll/fetch_paid_leaves',{
             method: 'POST',
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Fetch Designation",json)
 
             var data = json ;
 
             if(data.status === true){
                 
                 this.setState({
                     fetch_paid_leaves:data.data,
                     isLoading:"none",
                     no_data_message:"none"
                 })
             }
             else{   
                 this.setState({
                     fetch_paid_leaves:[],
                     isLoading:"none",
                     no_data_message:"block"
                 }) 
             }
             
         });
             
     }
     //-------------------------------------------------------------------Fetch_API-----------------------------------------------------------------------------------//
     update_paid_leaves = () => {
         const {  addToast,settings } = this.props;
        this.setState({
            loading:true
        })
         var params = {
             data_array: this.state.fetch_paid_leaves
         }
         console.log("Params",params)
 
             const res = fetch (settings.api_url + 'api/payroll/update_paid_leaves',{
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {"Content-type" : "application/json; charset=UTF-8"}
             })
             .then((response) => response.json())
             .then(json => {console.log("Update Leaves",{params:params,response:json})
     
                 var data = json ;
     
                 if(data.status === true){
                     addToast({
                         title: 'Update Leaves',
                         content: data.message,
                         time: new Date(),
                         duration: 2000,
                     });
                     this.setState({
                         update_paid_leaves:data.data,
                         loading:false
                     })
     
                 }
                 else{ 
                     addToast({
                         title: 'Update Leaves',
                         content: data.message,
                         time: new Date(),
                         duration: 2000,
                     });  
                     this.setState({
                         update_paid_leaves:[],
                         loading:false
                     }) 
                 }
                 this.fetch_paid_leaves()
             })
     }
     
 
 
     render() {
         return (
             <Fragment>
 
                 {/*PageTitle*/}
                 <PageTitle className="my_page_title">
                     <div className="my_classs">
                         <h1 className="heading_leave">Leaves Model</h1>
                     </div> 
                 </PageTitle>
             
             <Spinner color="warning" className="spinner_spinner spinner_color" style={{height: my_exact_height,display: this.state.isLoading}}/>
 
             <div style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                 <h3 style={{ display: this.state.no_data_message, padding: "15px",
                 textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>           
            
                 <div className="test_collapse my_scroll " style={{ height: (my_exact_height-80),display: this.state.no_data_message=="none" ? "block" :"none"}}>
                    <Table striped>
                         <thead>
                             <tr className='my_tr'>
                                 <th className='my_th'>Designation</th>
                                 <th className='my_th'>Total Paid Leaves</th>
                                 <th className='my_th'>Paid Leaves in Advance</th>
                             </tr>
                         </thead> 
                         <tbody>
                            {this.state.fetch_paid_leaves.map((v,i)=>{
                                 return(
                                     <tr key={i} className='my_tablr_tr my_scroll' >
                                         <td className='my_td'>{v.designation_name}</td>
                                         <td className='my_td'>
                                             <div className='my_td_div per_year'>
                                                 <Input type="tel" pattern="[0-9]*"
                                                 value={v.total_paid_leave} 
                                                 className="my_table_input" 
                                                 name="paidLeave"
                                                 onChange={(e)=>{
                                                     this.setState({
                                                         paidLeave: e.target.value,
                                                     })
                                         
                                                     this.handleValue(e.target.value, i,"paid_leave")
                                                 
                                                 }}/>
                                                 <span><span>&nbsp;/</span>{" "}year</span>
                                             </div>
                                         </td>
                                         <td className='my_td'>
                                           <div className='my_td_div'>
                                                 <div className='per_year'>
                                                     <Input type="tel" pattern="[0-9]*"  
                                                     value={v.paid_leave_in_advance}
                                                     className="my_table_input"
                                                     id="my_table_input_advance"
                                                     name="advanceLeave"
                                                     onChange={(e)=>{
                                                 
                                                         this.setState({
                                                         advanceLeave: e.target.value
                                                         })
                                         
                                                         this.handleValue(e.target.value, i, "advance_paid_leave")
                                                         
                                                     }}
                                                     invalid={v.paid_leave_in_advance > v.total_paid_leave ? true : false}
                                                     />
                                                     <span><span>&nbsp;/</span>{" "}year</span>
                                                 </div>
                                                 <div className="my_td_label" 
                                                     style={{display:v.paid_leave_in_advance > v.total_paid_leave ? "block":"none"
                                                     ,color:'red',whiteSpace:'nowrap'} }
                                                     onChange={()=>{this.handleValue(e, i, type)}}>
                                                     {this.state.text}
                                                 </div>
                                              
                                           </div>
                                             
                                         </td>
                                     </tr>
                                 )
                            })}
                         </tbody>
                     </Table>
                    
                 </div>
             
 
                 <div className='footer'>
                         
                     <Button color="warning" style={{color:'white'}} className="my_save_button"
                         disabled={this.state.text === "" || this.state.loading == false ? false : true}
                         onClick={()=>{
                                         
                             this.update_paid_leaves()
 
                         }}>Save{this.state.loading ? (
                            <Spinner />
                        ) : ''}
                     </Button>
                     
                 </div>
 
             </div>   
 
             </Fragment>
         );
     }
 }
 
 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) ,{ addToast: actionAddToast })(Content);
 