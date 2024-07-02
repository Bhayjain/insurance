/**
 * External Dependencies
 */
 import "./style.scss";
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import PageTitle from '../../components/page-title';
 import {Spinner, Row, Col, Button, CustomInput, Label, Input, FormFeedback,Progress, Modal, ModalBody, ModalFooter,Table,Badge
 , Collapse} from 'reactstrap';

 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import dateFormat from 'dateformat';
 import MarkdownEditor from '../../components/easy-mde';
 import Skeleton from 'react-loading-skeleton'
 import 'react-loading-skeleton/dist/skeleton.css';
 import pdf_img from '../../images/pdf.png'
import excel_img from '../../images/txt-file.png'
import other_img from '../../images/google-docs.png'
import Tabs from '../../components/tabs';

 /**
  * Component
  */


   const device_width =   window.innerWidth;
   var height =   window.innerHeight;
   console.log("emp_screen.height", height);
   const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
   console.log("emp_nav_height",nav_height);
   var my_height = height - nav_height;
   var gk = (my_height/2)-100;
   console.log("emp_gk",gk);
   if(device_width < 600){
     var gk = (my_height/2) - 50;
   }

 class Content extends Component {
    constructor(props){
      super(props);
      this.state = {
        activeTab2: 'home',
        search_name:"",
        search_vehicle:"",
        search_contact:"",
        array_of_fetch_reference:new Array(20).fill({}),
        no_data_message:"none",
        isLoading:true,
        custumerName:"",
        policy_type:"",
        motor:"",
        motor_type:"",
        sub_motor_type:"",
        addons:[],
        gvw:"",
        pvc_capacity:"",
        claim:"",
        pvc_type:"",
        last_yr:"",
        comprehensive_tp:"",
        make:"",
        prefered_comp:"",
        vehicle:"",
        model:"",
        cc:"",
        reg_date:"",
        fuel_type:"",
        assist_per:"",
        po_amt:"",
        pay_type:"",
        pay_mode:"",
        email:"",
        phone:"",
        invcoice:"",
        ncb_reserving:"",
        agent:'',
        rto:"",
        own_driver:"",
        rc_image:[],
        pyp_img:[],
        pan_img:[],
        isLoadingSingle:true,

        user_task_array: [],
        isLoadingForTask:true,
        spinner_1:"none",
        no_data_for_Task:"none",
        compaign_task_array: [],
        user_task_today_array: [],
        user_task_overdue_array: [],
        user_task_upcoming_array: [],

        user_Call_array: [],
        isLoadingForCall:true,
        no_data_for_Call:"none",
        spinner_1:"none",

      };
      setTimeout(() => {
        this.fetch_reference();
      }, 0)
      this.toggleTab = this.toggleTab.bind( this );


    }

      handleReference = (value) => {
        console.log("hggggggggggggggg", value);
        this.setState({
          reference_user_id:value._id,
          custumerName:value.customer_name,
          policy_type:"",
          motor:"",
          motor_type:"",
          sub_motor_type:"",
          claim:"",
          addons:value.addons,
          gvw:value.gvw,
          pvc_capacity:value.pvc_capacity,
          pvc_type:value.pvc_type ? value.pvc_type.label : "",
          last_yr:value.last_year_ncb ? value.last_year_ncb.label : "",
          comprehensive_tp:"",
          prefered_comp:value.preferred_company,
          vehicle:value.vehicle_no,
          make:"",
          model:value.model,
          cc:value.cc,
          reg_date:value.reg_date,
          fuel_type:value.fuel_type ? value.fuel_type.label : "",
          assist_per:value.assist_percent,
          po_amt:"",
          pay_type:"",
          pay_mode:"",
          email:value.email_id,
          phone:value.phone_no,
          invcoice:value.invoice_number,
          ncb_reserving:value.ncb_reserving_letter,
          agent:"",
          rto:value.rto_location,
          own_driver:value.owner_driver,
          rc_image:value.rc_image,
          pyp_img:value.pyp_image,
          pan_img:value.pan_card_image,
        })

        if (this.state.activeTab2 === 'home') {
            this.fetch_task_for_reference(value._id)
        }else if (this.state.activeTab2 ==="profile") {
            this.fetch_reference_call_logs(value._id)
        }
      }
      fetch_reference = (search_name,search_vehicle,search_contact) => {
      const { settings, addToast, } = this.props;
      if (search_name == "" || search_name == undefined) {
        var search_by_name = undefined
      }else{
        var search_by_name = search_name
      }
      if (search_vehicle == "" || search_vehicle == undefined) {
        var search_by_vehicle_no = undefined
      }else{
        var search_by_vehicle_no = search_vehicle
      }
      if (search_contact == "" || search_contact == undefined) {
        var search_by_contact_no = undefined
      }else{
        var search_by_contact_no = search_contact
      }
      var params = {
        search_by_name: search_name,
        search_by_vehicle_no: search_vehicle,
        search_by_contact_no: search_contact,
     }
      console.log("params for fetch refernce",params);
      const res = fetch(settings.api_url + "api/telecaller_app/fetch_reference", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("Fetch Reference**************************************", { json })
          var data = json;
          if (data.status == true) {
           this.setState({
             array_of_fetch_reference:data.data,
             reference_id:data.data[0],
             reference_user_id:data.data[0]._id,
             no_data_message:"none",
             isLoading:false,
             isLoadingSingle:false

           })
           this.handleReference(data.data[0]);
          }
          else {
           this.setState({
             array_of_fetch_reference:[],
             reference_id:"",
             no_data_message:"block",
             isLoading:false,
             isLoadingSingle:false
           })
          }
        })
    }




    // Khushboo functionality

    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
            spinner_1:"block"
        } );
        setTimeout(() => {
            if (name == "home") {
                this.fetch_task_for_reference(this.state.reference_user_id)
             }else if (name == "profile") {
                 this.fetch_reference_call_logs(this.state.reference_user_id)
             }
          }, 10)

    }

    fetch_task_for_reference = (reference_user_id)=>  {
        var params ={
            reference_user_id:reference_user_id,
        }
        console.log("user task", params);
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/fetch_task_for_reference", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch User Task ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                        user_task_array: data.data,
                        user_task_today_array: data.data.today_obj,
                        user_task_overdue_array: data.data.overdue_obj,
                        user_task_upcoming_array: data.data.upcoming_obj,
                        isLoadingForTask:false,
                        spinner_1:"none",
                        no_data_for_Task:"none"
                     });
                 }
                 else {
                     this.setState({
                          user_task_array: [],
                          user_task_today_array: [],
                          user_task_overdue_array: [],
                          user_task_upcoming_array: [],
                          isLoadingForTask:false,
                          no_data_for_Task:"block",
                          spinner_1:"none",
                     });
                 }
             })
          }


          fetch_reference_call_logs = (reference_user_id)=>  {
            var params ={
                reference_user_id:reference_user_id,
            }
            console.log("User Call Logs", params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_reference_call_logs", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch User Call Logs ***************", json)
                     var data = json;
                     if (data.status == true) {

                       var user_Call_array = data.data
                       for (let j = 0; j < user_Call_array.length; j++) {
                        var date = user_Call_array[j].start_time;
                        var new_date = this.formatDate(date);
                        //// console.log("new_date=======================",new_date);
                        user_Call_array[j].start_time_new = new_date
                     }


                         this.setState({
                          user_Call_array: user_Call_array,
                          isLoadingForCall:false,
                          spinner_1:"none",
                          no_data_for_Call:"none"
                         });
                     }
                     else {
                         this.setState({
                          user_Call_array: [],
                          isLoadingForCall:false,
                          no_data_for_Call:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }


          formatDate(date) {
            // //// console.log("date",new Date(date));
                    var date = new Date(date);
                    var year = date.getFullYear();
                   var  month = date.getMonth()+1;
                   var dt = date.getDate();

                     if (dt < 10) {
                     dt = '0' + dt;
                     }
                     if (month < 10) {
                     month = '0' + month;
                     }

                    //  //// console.log(dt+'-' + month + '-'+year);
                     var new_date_1 = dt+'-' + month + '-'+year

                     var today = date;
                     let options_1 = {
                         hour: "2-digit", minute: "2-digit"
                     };

                    //  // console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                                        var time_new =today.toLocaleTimeString("en-us", options_1)
                                        // // console.log("mt______________________________________________*********************",time_new);
                                        // // console.log("mt______________________________________________",new_date_1);

                                        var nre_time = time_new


                    return nre_time;
                  }

     render() {

         return (
             <Fragment>
                <PageTitle className="reference_heading">
                 <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                  <div style={{display:"inline-flex"}}>
                                      <h1 className="heading_top">Reference User</h1>
                                  </div>
                            </div>
                              <div className="col-lg-8 col-md-8 col-sm-12 display_search diplay_end" >
                                  <div className="input_data">
                                            <input
                                                 type="text"
                                                 className="form-control "
                                                 aria-describedby="emailHelp"
                                                 placeholder="Search Name/Vehicle No/ Contact No"
                                                 value={this.state.search_name}
                                                 onChange={(e) => {
                                                   this.setState({
                                                     search_name:e.target.value,
                                                   })
                                                   this.fetch_reference(e.target.value, this.state.search_vehicle, this.state.search_contact)
                                                 }}
                                            />
                                            </div>
                                            <div className="show_tabs_for_user">
                                            <Tabs pills>
                                                <Tabs.NavItem
                                                    isActive={ this.state.activeTab2 === 'home' }
                                                    onClick={ () => this.toggleTab( 2, 'home' ) }
                                                    className="task_new"
                                                >
                                                    Task
                                                </Tabs.NavItem>
                                                <Tabs.NavItem
                                                    isActive={ this.state.activeTab2 === 'profile' }
                                                    onClick={ () => this.toggleTab( 2, 'profile' ) }
                                                    className="col_log_new"
                                                >
                                                    Call Logs
                                                </Tabs.NavItem>
                                            </Tabs>
                                            </div>
                                            </div>
                     </div>
                </PageTitle>
                <div className="">
                <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-80)}}>No Data Found</h3>
                   <div style={{display: this.state.no_data_message == "none" ? "block" : "none"}}>
                      <div className="row">
                            <div className= "col-lg-3 col-md-12 col-sm-12 heading_refernce" >
                                  <div className="mycalendar" style={{height:my_height-75}}>
                                    {this.state.isLoading ?
                                     <div className="table-responsive-lg scroll_1 test_collapse">
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th className="table_datas" scope="col">User</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                              {this.state.array_of_fetch_reference.map((_,index)=>{
                                                return(
                                                  <tr key={index}>
                                                    <td className="table_datas"><Skeleton height={20} width={200} /></td>
                                                </tr>
                                                )
                                              })}
                                            </tbody>
                                         </Table>
                                      </div>
                                      :
                                      <div className="">
                                      {/*<h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk-80}}>No Data Found</h3>*/}
                                      <div className="table-responsive-lg scroll_1 test_collapse">
                                        <Table striped>
                                            <thead>
                                                <tr className="no_border">
                                                    <th className="table_data" scope="col">User Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                              {this.state.array_of_fetch_reference.map((value,index)=>{
                                                return(
                                                  <tr key={index} aria-hidden="true" style={{cursor:"pointer"}}  onClick={()=>{
                                                    this.setState({
                                                      reference_id:value._id,
                                                    })
                                                    this.handleReference(value)
                                                    }} >
                                                    <td className="table_datas_new" >{value.customer_name}</td>
                                                </tr>
                                                )
                                              })}

                                            </tbody>
                                         </Table>
                                      </div>
                                      </div>
                                      }
                                    </div>
                             </div>
                             <div className="col-lg-9 col-md-12 col-sm-12 test_collapse heading_reference ttt_1_ref" style={{paddingRight:"24px"}}>
                              <div className="" >
                              <div className="row test_collapse">
                               <div className="col-lg-5 col-md-5 test_collapse mycalendar" style={{height:my_height-75}}>
                               <div className="col-lg-12 col-md-12 col-sm-12">
                                  <div className="move_to_ref">
                                   <div className="uplodddddd_ref" style={{whiteSpace: "nowrap" }}>Details</div>
                                  </div>
                              </div>
                              <hr className="hr_ref" style={{marginTop:" 0px"}}/>
                                   <div className="row test_collapse">
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref ">
                                           <div className="width_data_ref">Policy Type</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.policy_type == "roll_over" ? "Roll over" :this.state.policy_type}</span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref">
                                           <div className="width_data_ref">Motor/Non Motor</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.motor} </span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref" style={{ display:this.state.motor=="Motor" ? "inline-flex" :"none"}}>
                                           <div className="width_data_ref">Motor Type</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.motor_type} </span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref" style={{ display:this.state.motor_type=="Motor" ? "inline-flex" :"none"}}>
                                           <div className="width_data_ref">Sub Motor Type</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.sub_motor_type} </span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref" style={{ display:this.state.sub_motor_type ? (this.state.sub_motor_type=="GCV" ? "inline-flex" :"none"):"none"}}>
                                           <div className="width_data_ref">GVW</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.gvw}</span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref" style={{ display:this.state.sub_motor_type ? (this.state.sub_motor_type=="GCV" ? "inline-flex" :"none"):"none"}}>
                                           <div className="width_data_ref">PVC Type</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.pvc_type}</span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref" style={{ display: this.state.pvc_capacity == "" ? "none" :"inline-flex"}}>
                                           <div className="width_data_ref">Seat Capacity</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar" style={{display:this.state.pvc_capacity=="" ? "none" :"block"}}>{this.state.pvc_capacity}</span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref" style={{ display: this.state.motor_type ? (value.motor_type.label == "Commercial" || value.motor_type.label == "MISC D" ? "inline-flex" :"none"):"none"}}>
                                           <div className="width_data_ref">Type of Policy</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar" style={{display:this.state.pvc_capacity=="" ? "none" :"block"}}>{this.state.pvc_capacity}</span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref">
                                           <div className="width_data_ref">Claim Status</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.claim} </span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Preferred Company</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.prefered_comp}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref" style={{ display:this.state.claim=="No" ?"inline-flex" :"none"}}>
                                             <div className="width_data_ref">Last year NCB</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar" style={{ marginLeft: "10px", display:this.state.last_yr ? this.state.last_yr .label : "" }}></span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Comprehensive/TP</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar" >{this.state.comprehensive_tp}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Vehicle Number</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.vehicle}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref">
                                           <div className="width_data_ref">Make</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.make} </span>
                                           }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Model</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.model}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">CC</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.cc}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Reg Date</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.reg_date ? dateFormat(new Date(this.state.reg_date.replace("Z", "")), "dd-mm-yyyy"):""}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Fuel Type</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.fuel_type}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Assist Percent</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.assist_per}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">PO Amount</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.po_amt}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Payout Type</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.pay_type}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Payment Mode</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.pay_mode}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Invoice Number</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.invcoice}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                         <div className="width_data_ref">NCB Reserving Letter</div>:
                                         {this.state.isLoadingSingle ?
                                           <span ><Skeleton height={22} width={100} /></span>
                                             :
                                             <span className="value_mar">{this.state.ncb_reserving}</span>
                                         }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Agent/Dealer</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.agent}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                             <div className="width_data_ref">Email ID</div>:
                                             {this.state.isLoadingSingle ?
                                               <span ><Skeleton height={22} width={100} /></span>
                                                 :
                                                 <span className="value_mar">{this.state.email}</span>
                                             }
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                           <div className="width_data_ref">Mobile No</div>:
                                           {this.state.isLoadingSingle ?
                                             <span ><Skeleton height={22} width={100} /></span>
                                               :
                                               <span className="value_mar">{this.state.phone}</span>
                                           }
                                       </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                          <div className="width_data_ref">RTO Location</div>:
                                          {this.state.isLoadingSingle ?
                                            <span ><Skeleton height={22} width={100} /></span>
                                              :
                                              <span className="value_mar">{this.state.rto}</span>
                                          }
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref">
                                          <div className="width_data_ref">Owner Driver</div>:
                                          {this.state.isLoadingSingle ?
                                            <span ><Skeleton height={22} width={100} /></span>
                                              :
                                              <span className="value_mar">{this.state.own_driver}</span>
                                          }
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 display_inline_ref display_inline_ref">
                                            <div className="width_data_ref">Addons</div>:
                                            <ul style={{ marginLeft: "10px",paddingLeft: "18px" }}>{this.state.addons ? this.state.addons.map((v,i)=>{
                                            return(
                                              <li style={{listStyle: "none", marginLeft: "-17px"}} key ={i}>{v.addons ? v.addons.label: ""}</li>
                                            )
                                          })
                                           : ""}</ul>
                                        </div>

                                     </div>
                                  </div>

                                <div className="col-lg-7 col-md-7 col-sm-12  test_collapse" >
                                   <div className="show_data box_data">

                                     <Tabs.Content activeTab={ this.state.activeTab2 }>
                                            <Tabs.Pane tabId="home">
                                            <h3 className="task_user_">{this.state.custumerName}{" "} Task</h3>
                                            <div className="test_collapse mycalendar" style={{height:my_height-133}}>
                                            <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                            <div className="test_collapse" style={{display: this.state.spinner_1 == "none" ? "block" : "none"}}>
                                                <h3 style={{ display: this.state.no_data_for_task =="block" || (this.state.user_task_today_array == "" && this.state.user_task_overdue_array == "" && this.state.user_task_upcoming_array == "") ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                                  <div className="" style={{display:this.state.no_data_for_task == "block" || (this.state.user_task_today_array == "" && this.state.user_task_overdue_array == "" && this.state.user_task_upcoming_array == "") ? "none" : "block"}}>
                                                      <h3 className="task_haeding_new" style={{color:"#2fc787"}}>Today</h3>
                                                        <h3 style={{ display:this.state.user_task_today_array == "" ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                           <div style={{display:this.state.user_task_today_array == "" || this.state.user_task_today_array == undefined ? "none" : "block"}}>
                                                              <div className="table-responsive-lg scroll_1 test_collapse " style={{marginBottom:"20px"}} >
                                                                <Table striped>
                                                                     <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Follow Up Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.user_task_today_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.follow_up_date_new.split("-")[2] + "-" + value.follow_up_date_new.split("-")[1] + "-" + value.follow_up_date_new.split("-")[0]}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table" >{value.status == undefined ? "Incomplete" : value.status}</td>
                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>

                                                      <h3 className="task_haeding_new" style={{color:"#ef5164"}}>Overdue</h3>
                                                      <h3 style={{ display:this.state.user_task_overdue_array == "" ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                       <div style={{display:this.state.user_task_overdue_array == "" || this.state.user_task_overdue_array == undefined ? "none" : "block"}}>
                                                        <div className="table-responsive-lg scroll_1 test_collapse " style={{marginBottom:"20px"}} >
                                                         <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Follow Up Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Tag</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.user_task_overdue_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        {/* <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.follow_up_date.replace("T", "")), "dd-mm-yyyy")}</td> */}
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.follow_up_date_new.split("-")[2] + "-" + value.follow_up_date_new.split("-")[1] + "-" + value.follow_up_date_new.split("-")[0]}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table">{value.telecaller_name}</td>
                                                                        <td className="camp_table">{value.tags.label ? value.tags.label : ""}</td>
                                                                        <td className="camp_table" >{value.status == undefined ? "Incomplete" : value.status}</td>
                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>

                                                      <h3 className="task_haeding_new" style={{color:"#007bff"}}>Upcoming</h3>
                                                      <h3 style={{ display:this.state.user_task_upcoming_array == "" ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                      <div style={{display:this.state.user_task_upcoming_array == "" || this.state.user_task_upcoming_array == undefined ? "none" : "block"}}>
                                                      <div className="table-responsive-lg scroll_1 test_collapse " style={{marginBottom:"20px"}} >
                                                       <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Follow Up Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Tag</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.user_task_upcoming_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        {/* <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.follow_up_date.replace("Z", "")), "dd-mm-yyyy")}</td> */}
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.follow_up_date_new.split("-")[2] + "-" + value.follow_up_date_new.split("-")[1] + "-" + value.follow_up_date_new.split("-")[0]}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table">{value.telecaller_name}</td>
                                                                        <td className="camp_table">{value.tags.label ? value.tags.label : ""}</td>
                                                                        <td className="camp_table" >{value.status == undefined ? "Incomplete" : value.status}</td>
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
                                               </Tabs.Pane>
                                            <Tabs.Pane tabId="profile">
                                            <h3 className="task_user_">{this.state.custumerName}{" "}  Call Logs</h3>
                                            <div className="test_collapse mycalendar" style={{height:my_height-133}}>
                                            <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                            <div className="test_collapse" style={{display: this.state.spinner_1 == "none" ? "block" : "none"}}>

                                                <h3 style={{ display: this.state.no_data_for_Call =="block"  ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                                  <div className="" style={{display:this.state.no_data_for_Call == "block"  ? "none" : "block"}}>

                                                  <div className="table-responsive-lg scroll_1 test_collapse " >
                                                  <Table striped>
                                                                  <thead>
                                                                      <tr>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Call Type</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Start Date and Time</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Not Connected Reason</th>
                                                                      </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                  {this.state.user_Call_array.map((value,index)=>{
                                                                      return(
                                                                      <tr key={index} >
                                                                      <th className="camp_table" scope="row">{value.call_type == "not_connected" ? "Not Connected" : "Connected"}</th>
                                                                      <td className="camp_table" style={{whiteSpace:"nowrap"}}>
                                                                      <div>{value.start_time == "" ? "" : dateFormat(new Date(value.start_time.replace("Z", "")), "dd-mm-yyyy")}</div>
                                                                      <div className="time_data_new">{value.start_time == "" ? "" : value.start_time_new}</div>
                                                                      </td>
                                                                      <th className="camp_table" scope="row">{value.remark}</th>
                                                                      <th className="camp_table" scope="row">{value.not_connected_reason}</th>
                                                                  </tr>
                                                                      )
                                                                  })}

                                                              </tbody>
                                                          </Table>
                                                      </div>
                                                  </div>
                                              </div>
                                           </div>
                                            </Tabs.Pane>
                                        </Tabs.Content>


                                    </div>
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
