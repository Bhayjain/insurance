/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './style.scss';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import TouchSpin from '../../components/touch-spin';

import Cookies from 'js-cookie';
import PageTitle from '../../components/page-title';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import {
    Button,Spinner,Table,Input, Modal, ModalBody, ModalFooter,Label,CustomInput,ButtonGroup
} from 'reactstrap';
// import { io } from "socket.io-client";
import socket from '../Socket';


/**
 * Component
 */

// //  var api_url = "http://192.168.29.31:4090/"
//  // var api_url = "http://173.249.5.10:3005/"
//  var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"

 
 
//   var socket = io(api_url, {transport : ['WebSocket']});
 //  ////////console.log("socket*************",socket);
  const admin_data = JSON.parse(Cookies.get('admin_data'));
  //////console.log("admin_data**************",admin_data);

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            endorsement_control: Cookies.get('endorsement_control'),
            search_user:"",
            ipad_width:"none",
            ipad_emp_list:"block",
            no_data_message:"none",
            isLoading:"block",
            spinner_1:"none",
            endorsement_dock_data_array:[],
            current_page:1,
            total:"",
            endorsement_dock_id:"",
        };

        setTimeout(() => {
            this.get_endorsement_policy();
            }, 0)
    }


    get_endorsement_policy(startDate,endDate,search_sm,pageNumber){

        if (pageNumber == '' || pageNumber == undefined) {
          this.setState({
              current_page: 1
          })
          var page_no = 1
      } else {
          this.setState({
              current_page: pageNumber
          })
          var page_no = pageNumber
      }

      if (search_sm=="" || search_sm == undefined ) {
        var my_sm_search= undefined
      }
      else{
        var my_sm_search= search_sm
      }
      if (startDate==undefined ||startDate=="" || endDate==undefined || endDate=="" ) {
        var my_date = undefined
      }
      else{
        const today = new Date(startDate);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday_start = yyyy + '-' + mm + '-' + dd;


        const today_end = new Date(endDate);
        const yyyy_end = today_end.getFullYear();
        let mm_end = today_end.getMonth() + 1; // Months start at 0!
        let dd_end = today_end.getDate();
            if (dd_end < 10) {
              var my_date ='0' + dd_end
            }
            else{
              var my_date = dd_end
            }
        if (dd_end < 10) dd_end = '0' + dd_end;
        if (mm_end < 10) mm_end = '0' + mm_end;

        const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
        var my_date = [formattedToday_start,formattedToday_end]
      }
        var conv_param = {
          page_no:page_no,
          search_by:my_sm_search,
          sort_by_date:my_date,
       }

       console.log("");

            socket.emit('get_endorsement_policy', conv_param);
            socket.on('get_endorsement_policy_response', (data)=>{
                console.log('inside get_endorsement_policy_response =============',data);
                  if(data.data.status==true){
                      this.setState({
                          endorsement_dock_data_array : data.data.data,
                          no_data_message:"none",
                          isLoading:"none",
                          spinner_1:"none",
                          total_pages: data.data.total_pages,
                          total:data.data.total,
                          borderNew:false,
                      })
                      if (device_width < 769) {
                        // ////////console.log("display lisit none");

                       }
                       else{
                        this.get_single_policy_dock(data.data.data[0]._id)
                       }

                  }
                  else{
                      this.setState({
                        endorsement_dock_data_array:[],
                        no_data_message:"block",
                        isLoading:"none",
                        spinner_1:"none",
                        for_show_btn:"",
                        total_pages: 1,
                        total:"",
                        borderNew:false,

                      })
                  }

            })
      }

      get_single_policy_dock(endorsement_dock_id){
        var conv_param = {
            policy_dock_id:endorsement_dock_id,
           }
            socket.emit('get_single_policy_dock', conv_param);
            socket.on('get_single_policy_dock_response', (data)=>{


                  console.log('inside get_single_policy_dock_response =============',data);

                  if(data.data.status==true){
                    if (device_width < 769) {
                        var ipad_emp_list = "none";
                        //////console.log("display lisit", ipad_emp_list);
                       }
                       else{
                       var ipad_emp_list = "block"
                       //////console.log("display lisit",ipad_emp_list);

                       }
                      this.setState({
                          opration_single_data_array : data.data.data,
                          endorsement_dock_id :data.data.data[0]._id,
                          spinner_1:"none",
                          ipad_width:"block",
                          ipad_emp_list:ipad_emp_list,
                      })
                   }
                   else{
                       this.setState({
                        visitor_single_data_array:[],
                        spinner_1:"none",
                        policy_uploaded:""
                       })
                   }

            })
            socket.off('get_single_policy_dock_response', () => {})
      }

    render() {
      const pageNumbers = [];
      if (this.state.total !== null) {
          for (let i = 1; i <= Math.ceil(this.state.total_pages / 1); i++) {
              pageNumbers.push(i);
          }


          var renderPageNumbers = pageNumbers.map(number => {
              let classes = this.state.current_page === number ? '' : '';

              return (
                  <div key={number} style={{
                      display: 'inline-flex'
                  }}>
                      {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

                      <Button color="warning" outline
                      style={{
                          backgroundColor: this.state.current_page === number ? '#8bc240' : 'white', color: this.state.current_page === number ? 'white' : '#8bc240',marginRight:"5px",
                          display: this.state.current_page === number ? "block" : 'none'}}
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,number)
                                  , this.setState({
                                      current_page: number,
                                      spinner_1: 'block'
                                  })
                          }}

                      >{number}</Button>
                      <Button color="warning" outline
                      style={{
                          display: this.state.current_page === number ? this.state.current_page === this.state.total_pages ? "none" : "block" : 'none',
                          backgroundColor: this.state.current_page === number ? '' : '#8bc240', color: this.state.current_page === number ? '#8bc240' : 'white' }}
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,number + 1)
                              if (this.state.current_page === this.state.total_pages) {
                                  this.setState({
                                      current_page: number
                                  })
                              } else {
                                  this.setState({
                                      current_page: number + 1,
                                      spinner_1: 'block'
                                  })
                              }

                          }}

                      >{number + 1}</Button>

                  </div>
              );
          });
      }
        return (
            <Fragment>



           <PageTitle className="endor_title">
                <div className="row my_row_hh">
                 <div className="col-lg-3 col-md-4">
                     <h1>Endorsement</h1>
                </div>
                 <div className="col-lg-6 col-md-8 test_collapse"  style={{display:"inline-flex"}}>
                   <div style={{display: this.state.ipad_emp_list}}><input
                       type="text"
                       className="form-control serach_smmm"
                       aria-describedby="emailHelp"
                       placeholder="Search "
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.get_endorsement_policy(this.state.startDate,this.state.endDate,e.target.value ,this.state.current_page)
                       }}
                  /></div>
                 <div className="date_rangeee_pii" style={{width:"47%",display: this.state.ipad_emp_list}}>
                     <RangeDatePicker
                            name="daterange"
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={(startDate, endDate) => {
                                this.setState({
                                startDate: startDate,
                                endDate: endDate,
                                daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                })
                          this.get_endorsement_policy(startDate,endDate,this.state.search_user,this.state.current_page)
                            }
                            }
                            minDate={new Date(1900, 0, 1)}
                            maxDate={new Date(2100, 0, 1)}
                            dateFormat="DD-MM-YYYY  "
                            monthFormat="MM YYYY"
                            startDatePlaceholder="Start Date"
                            endDatePlaceholder="End Date"
                            disabled={false}
                            className="my-own-class-name nightclass a1"
                            startWeekDay="monday"
                            />
                     </div>

                </div>
                <div className="col-lg-3 col-md-12 for_mobile_ipad for_mobile_ipa_111" style={{display: "inline-flex",width:"100%",justifyContent: "flex-end"}}>
                  <div style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                    <div style={{display: "inline-flex"}}>
                        {/* <Button disabled={this.state.opeartion_dock_control == "false" ? 'disabled' : ''} color="primary" style={{textTransform: "capitalize" ,color:"#fff",display:this.state.is_edit_logs==true ? "block" : "none"}}
                        onClick={this.switch_edit_log_btn}>{this.state.show_edit_logs=="none" ? "Edit logs" :"Latest Logs"}</Button>
                        <Button disabled={this.state.opeartion_dock_control == "false" ? 'disabled' : ''} color="success" style={{textTransform: "capitalize" ,color:"#fff",display:this.state.for_show_btn!="" && this.state.user_role=="SUPER ADMIN"   ? "block" : "none",marginLeft: "10px"}}
                        onClick={ this.toggle }>Edit Forms</Button> */}
                              <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                    <Button color="info" className="" style={{marginLeft: "10px",textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",color:"#fff"}}
                                        onClick={() => {
                                        this.setState({
                                            ipad_emp_list:"block",
                                            ipad_width:"none"
                                        })
                                        }}>Back</Button>
                              </div>
                          </div>
                      </div>
                 </div>
              </div>
         </PageTitle>

                                        

                 <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                    <div className="new_section" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                    <div className="row">
                          <div className="col-lg-3 col-md-12 col-sm-12 heading_opeartion height_sales" id="showww_non" style={{paddingRight:"0px"}}>
                          {/* <div className="grup_btn">
                                <ButtonGroup>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="pending" ? "#4B8178" : "", color:this.state.visitor_type=="pending" ? "#fff" : "",borderColor:this.state.visitor_type=="pending" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'pending',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 10)
                                                }}>Pending<span style={{display:this.state.total=="" || this.state.visitor_type == "completed" ?"none" :"block",marginLeft:"5px"}}>({this.state.total})</span></Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="completed" ? "#4B8178" : "", color:this.state.visitor_type=="completed" ? "#fff" : "",borderColor:this.state.visitor_type=="completed" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'completed',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 10)
                                                }}>Completed</Button>
                                </ButtonGroup>
                                </div> */}


                        <div className="heading_opeartion mycalendar" style={{height:this.state.total_pages==1 ? my_height-70 : my_height -121}}>
                        <div className="new_border_box_opearrrr">
                                    {this.state.endorsement_dock_data_array.map((value,index)=>{
                                        return(
                                            <div aria-hidden="true" className="row test_collapse"  key={index}
                                             style={{border:value._id == this.state.endorsement_dock_id ? " 2px solid #8bc240" : "",cursor:"pointer"}}
                                             onClick={() => {
                                               this.setState({
                                               spinner_1: 'block',
                                               minute: 0,
                                               second: 0,
                                               })
                                               setTimeout(() => {
                                               this.get_single_policy_dock(value._id)
                                               }, 0)
                                            }}
                                           >
                                         <div className="col-lg-6 col-md-6 sm_namee">
                                            <div className="name_type">
                                            <span>{value.sm_name}</span>
                                            </div>
                                            <div className="time_new">{value.added_date.split("-")[2] + "-" + value.added_date.split("-")[1] + "-" +value.added_date.split("-")[0]}</div>
                                         </div>
                                          <div className="col-lg-6 col-md-6 text_align sm_namee">
                                          <p className= {value.name ? (value.name.length >=15 ? "mobile_no_type_oppp marquee" :"mobile_no_type_oppp"):"no_providedd"}  style={{color:value.name ? (value.name == " " ? "#d5d5d5" :""):""}}><span>{value.name ?(value.name != " " ? value.name :"Not Provided"):"Not Provided"}</span></p>
                                          </div>
                                       </div>
                                        )
                                    })}
                                    </div>
                                </div>


                         {/* ********************************* Pagination ***************************************** */}

                         <div style={{display:this.state.total_pages==1?"none":'flex',flexWrap: "wrap",width:"100%",marginTop:"10px",padding: "1px 8px",justifyContent:"flex-end"}}>
                              <Button color="warning" className="pagination_222"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page - 1)
                                  } else {
                                    this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >Previous</Button>
                                {renderPageNumbers}

                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page == this.state.total_pages ? '#8bc240' : '',
                              display: this.state.current_page == this.state.total_pages ? "none" : "block",
                              color: this.state.current_page == this.state.total_pages ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page < this.state.total_pages) {
                                      this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page + 1)
                                  } else {
                                      this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.get_endorsement_policy(this.state.startDate,this.state.endDate,this.state.search_user,this.state.total_pages)}>last</Button>
                            </div>
                          </div>



                   <div className="col-lg-9 col-md-12 col-sm-12  test_collapse ttt_1" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                   <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                    <div style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                        <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                             <div style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                                    <div className="row test_collapse inside_rowww">
                                    <div className="col-lg-4 col-md-5 test_collapse  mycalendar height_sales"  style={{height:my_height-69}}>
                                        dfvdfjnbjv
                                    </div>
                                    <div  className="col-lg-8 col-md-7 test_collapse heading_opeartion"  >
                                        jdbvjdngjdn
                                    </div>
                                </div>
                            </div>
                         </div>
                       </div>




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
) )( Content );
