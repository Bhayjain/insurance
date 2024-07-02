/**
 * External Dependencies
 */
 import './style.scss';

 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';

 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import MarkdownEditor from '../../components/easy-mde';
 import PageTitle from '../../components/page-title';
 import {
    Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody,Tooltip,UncontrolledTooltip, ModalFooter,Label,CustomInput
  } from 'reactstrap';
  import Cookies from 'js-cookie';

  import {
    addToast as actionAddToast,
  } from '../../actions';
 import Icon from '../../components/icon';
 import Tabs from '../../components/tabs';
 import pdf_img from '../../images/pdf.png'

import socket from '../Socket';

 /**
  * Component
  */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  ////////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  ////////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }


 class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            no_data_message:"none",
            isLoading:"block",
            spinner_1:"none",
            leave_request_array:[],
            allowance_array:[],
            leave_array:[],
            leave_send_array:[],
            leave_approve_array:[],
            emp_id:"",
            emp_name:"",
            total_unpaid_leaves:"",
            total_paid_leaves:"",
            balance_leave:"",
            search_by_name:"",
            search_by_approve_name:"",
            leave_type_satatus:false,
            AlertDeleteSingle: false,
            button_disabled: false,
            activeTab2: 'home',
            previous_leave_array:[],
            upcoming_leave_array:[],
            ipad_width:"none",
            ipad_emp_list:"block",
            amountError:"",
            amountNew : false,
            allowance_control : Cookies.get("allowance_control")
        }
        this.fetch_allowance_admin_panel()
        // this.fetch_requested_leave()
        this.AlertDeleteSingle = this.AlertDeleteSingle.bind( this );

    }


    AlertDeleteSingle() {
        this.setState( ( prevState ) => ( {
            AlertDeleteSingle: ! prevState.AlertDeleteSingle,
            amountError:"",
            amountNew : false

        } ) );
    }

    componentDidMount() {
        socket.on('fetch_allowance_admin_panel_response_module', (data)=>{
          console.log('inside fetch_allowance_admin_panel_response_module =============&&&&&&&',data);
           this.fetch_allowance_admin_panel()
    })
   }

    fetch_allowance_admin_panel=()=>{
        socket.emit('fetch_allowance_admin_panel');
          socket.on('fetch_allowance_admin_panel_response', (data)=>{
             console.log('Socket Allowance Response =============&&&&&&&',data);

             if (data.data.status == true) {
                this.setState({
                allowance_array: data.data.data,
                isLoading:"none",
                no_data_message:"none",
                });
                socket.off("fetch_allowance_admin_panel_response")
            }
            else {
                this.setState({
                allowance_array: [],
                isLoading:"none",
                no_data_message:"block",
                });
            }

            })
         }

         allownaceamountFun=(alloeanceamount)=>{
            if (alloeanceamount > this.state.actuallAmount) {
                this.setState({
                    amountError:"Amount Should not be greater than Bill Amount",
                    amountNew : true
                })
            }else{
                this.setState({
                    amountError:"",
                    amountNew : false
                })
            }
         }

         approve_disapprove_allowance=(allowance_id)=>{
            const { settings,addToast } = this.props;
            if (this.state.alloeanceamount == undefined) {
                var approve_amount = undefined
            }else{
                var approve_amount = Number(this.state.alloeanceamount)
            }
            var params = {
                allowance_id:allowance_id,
                approve_status:this.state.approve_status,
                approve_amount:approve_amount
            }
            console.log("params",params);
            const res = fetch(settings.api_url + "api/payroll/approve_disapprove_allowance", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Approve or Disaaprove Allowance ***************", json)
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDeleteSingle:false,
                            amountError:"",
                            amountNew : false
                        });

                        this.fetch_allowance_admin_panel()
                    }
                    else {
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDeleteSingle:false,
                            amountError:"",
                            amountNew : false
                        });
                    }
                })
             }



     render() {
         return (
             <Fragment>
                 <PageTitle className="title_headinggg">
                     <div className="row">
                        <div className="col-lg-9 col-md-8">
                           <h1>Allowance</h1>
                        </div>
                     </div>
               </PageTitle>

          <div className="show_tabs">
            <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                 <div className="leave_request test_collapse"  style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                    <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                       <div style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                           <div className="row test_collapse">
                               <div className="col-lg-12 col-md-12 test_collapse">
                                   <div className="mycalendar height_sales" style={{height:my_height-57}}>
                                    <div className="table-responsive-lg">
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="padding_data">Date</th>
                                                    <th scope="col" className="padding_data">Employee Name</th>
                                                    <th scope="col" className="padding_data">Title</th>
                                                    <th scope="col" className="padding_data" style={{textAlign:"center"}}>Amount</th>
                                                    <th scope="col" className="padding_data">Bill Image</th>
                                                    <th scope="col" className="padding_data">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.allowance_array.map((value,index)=>{
                                                    return(
                                                    <tr key={index}>
                                                        <td  className="padding_data" style={{whiteSpace:"nowrap"}}>{value.added_date.split("-")[2] + "-" + value.added_date.split("-")[1] + "-" + value.added_date.split("-")[0] }</td>
                                                        <td  className="padding_data">{value.emp_name}</td>
                                                        <td  className="padding_data">{value.title}</td>
                                                        <td  className="padding_data" style={{textAlign:"center"}}>
                                                           <div>
                                                               {value.is_modified == true ?
                                                                <del style={{display :value.is_modified == true ? "block" : "none" , color : "red"}}> &#x20b9;{value.amount}</del> : <span> &#x20b9;{value.amount}</span>
                                                               }
                                                              </div>
                                                              <div>
                                                                  {value.is_modified == true ?
                                                                <span style={{color : "green"}}> &#x20b9;{value.approve_amount}</span>  :""
                                                                }
                                                              </div>
                                                            </td>
                                                        <td  className="padding_data">
                                                        <div className="billImageNew">
                                                            {value.bill_image ?   value.bill_image.map((v1,i1)=>{
                                                            return(
                                                                <div key={i1}>
                                                                <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                                                <a rel="noreferrer" href={v1.image_link} target="_blank">
                                                                    <img src={v1.image_link} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"30px", width:"30px"}}/></a>
                                                                </span>

                                                                <span style={{display:v1.file_type=="pdf" ? "block" :"none"}}>
                                                                 <a rel="noreferrer" href={v1.image_link} target="_blank">
                                                                  <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"30px", width:"30px"}}/></a>
                                                                 </span>
                                                                </div>
                                                            )
                                                            }):""}
                                                                </div>
                                                        </td>
                                                        <td  className="padding_data">
                                                            <div style={{display:"inline-flex"}}>
                                                            <Button disabled={value.approve_status == "partial approved" || this.state.allowance_control == "false" ? true : false} color="success" outline className="approve_or_decline"  style={{marginRight:"10px",backgroundColor : value.approve_status == "partial approved" ? "#28a745" : "",color: value.approve_status == "partial approved" ? "#fff" : ""}} onClick={()=>{
                                                               this.setState({
                                                                allowance_id:value._id,
                                                                AlertDeleteSingle:true,
                                                                approve_status:"approved",
                                                                leave_status_new:"Approved",
                                                                alloeanceamount:value.amount,
                                                                actuallAmount : value.amount,
                                                               })
                                                           }}>Approve</Button>
                                                           <Button disabled={value.approve_status == "partial approved" || this.state.allowance_control == "false" ? true : false} color="danger" outline className="approve_or_decline" onClick={()=>{
                                                               this.setState({
                                                                allowance_id:value._id,
                                                                AlertDeleteSingle:true,
                                                                approve_status:"disapproved",
                                                                leave_status_new:"Disapproved",
                                                                alloeanceamount:undefined
                                                               })
                                                           }}>Disapprove</Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                   </div>
                               </div>
                           </div>
                      </div>
                 </div>
               </div>



                <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteSingle}
                    toggle={this.AlertDeleteSingle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody style={{padding:"20px"}}>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteSingle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%'}}>
                          <p style={{marginBottom:"10px"}}>Are you sure you want to {this.state.leave_status_new}?</p>
                        </div>
                        <div style={{display:this.state.leave_status_new == "Approved" ? "block" : "none",marginBottom:"18px"}}>
                            <Input
                              placeholder = "Amount"
                              className="allowanceInputNew"
                              type="number"
                              invalid = {this.state.amountNew}
                              value={this.state.alloeanceamount}
                              onChange={(e)=>{
                                  this.setState({
                                    alloeanceamount:e.target.value
                                  })
                                  this.allownaceamountFun(e.target.value)
                              }}
                             />
                             {this.state.amountError ? (
                            <div className="invalid-feedback">{this.state.amountError}</div>
                        ) : ''}
                        </div>

                        <div style={{ height: '40px', width: '100%'}}>

                            <Button color="secondary"
                                style={{ marginRight: "20px",color:"#fff"}} onClick={this.AlertDeleteSingle}
                            >no</Button>
                            {'             '}
                            {/* <Button color="secondary"  onClick={this.AlertDeleteSingle}>no</Button> */}
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" || this.state.amountNew == true ? 'disabled' : ''} style={{color:"#fff"}} onClick={() => {
                                    this.approve_disapprove_allowance(this.state.allowance_id)

                                }}>yes</Button>
                        </div>

                    </ModalBody>
                </Modal>

             </Fragment>


         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ), { addToast: actionAddToast } )( Content );
