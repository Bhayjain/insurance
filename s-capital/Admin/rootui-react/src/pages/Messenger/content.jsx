/**
 * Styles
 */
 import '../Mailbox/style.scss';
 import '../FileManager/style.scss';
  import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import Cookies from 'js-cookie';
 import {
     Row, Col,
     Modal, ModalBody,Card, ModalFooter, CardImg, CardHeader, CardBody, CardText,
     CardTitle, CardSubtitle, CardLink, CardFooter,
     Button, Collapse, ListGroup, ListGroupItem, Badge, Label,UncontrolledCollapse, Table
 } from 'reactstrap';
 import {  CustomInput, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
 import { Spinner } from 'reactstrap';
 import { updateAuth as actionUpdateAuth } from '../../actions';
 import {
     addToast as actionAddToast,
 } from '../../actions';

 import Icon from '../../components/icon';
 import Select from 'react-select';
 import { initMailbox } from '../../../../common-assets/js/rootui-parts/initMailbox';
 import { value } from 'dom7';
 import PageTitle from '../../components/page-title';
//  import Cookies from 'js-cookie';
 // const history = useHistory();



 window.RootUI.initMailbox = initMailbox;
 window.RootUI.initMailbox();

 /**
  * Component
  */


// var api_url = "http://192.168.29.31:4090/"
//  var api_url = "http://173.249.5.10:3005/"

const sayali =   window.innerWidth;
var height =   window.innerHeight;
// console.log("emp_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
// console.log("emp_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
// console.log("emp_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}
var link_data = window.location.href
// console.log("myyyyy",link_data);
Cookies.set('link_url', link_data);
// console.log("my_link",Cookies.get('link_url'));


 class Content extends Component {
     constructor(props) {
         super(props);

         this.state = {
             sakura:[],
             no_data:"none",
             user_array:[],
             employeee_array_1:[],
             user_name:"",
             suspend:"",
             message:"",
             ipad_width:"none",
             ipad_emp_list:"block",
             user_control:Cookies.get('user_management_control'),
             isLoading:"block",

         };

         this.fetch_emp();
     }


     fetch_emp () {
      const { settings, addToast } = this.props;
        const res = fetch(settings.api_url + "fetch_all_users", {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            // console.log("fetch_all_users **************************************", json)
            var data = json;

            if (data.status == true) {
              this.setState({
                user_array: data.data,
                isLoading:"none",
                no_data:"none",
              });

              if (sayali < 769) {
              //  console.log("display lisit none");
              }
              else{
              this.fetch_single_emp(data.data[0]._id)
              }

            }
            else {
              this.setState({
               user_array: [],
               isLoading:"none",
               no_data:"block",
              });
              // console.log("fetch_emp wrong");
            }
          })
      }


      fetch_single_emp = (emp_id) => {
        var params = {
          user_id: emp_id,
        }
        // console.log("user_id", params);
        const { settings, addToast } = this.props;
        // console.log("URL_______________",settings.api_url);
       const res = fetch(settings.api_url + "fetch_single_user", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          // console.log("fetch_single_user **************************************", json)
          var data = json;

          if (data.status == true) {
            if (sayali < 769) {
             var ipad_emp_list = "none";
            //  console.log("display lisit none", ipad_emp_list);
            }
            else{
            var ipad_emp_list = "block"
            // console.log("display lisit");

            }
            if(data.data[0].suspend == true){
              var message="Suspended"
            }
            else if(data.data[0].suspend == false){
              var message="Unsuspended"
            }
            else
            {
              var message="There Is no Data"
            }
            this.setState({
              employeee_array_1: data.data,
              suspend:data.data[0].suspend,
              user_id: data.data[0]._id,
              user_name:data.data[0].full_name,
              customer_id:data.data[0].customer_id,
              spinner_1: 'none',
              ipad_width:"block",
              ipad_emp_list:ipad_emp_list,
              message:message

             });
            //  console.log("suspenddddddddddddddd",data.data[0].suspend)
            //  console.log("suspenddddddddddddddd",this.state.suspend)

          }
          else {
            this.setState({
              employeee_array_1: [],
              spinner_1: 'none'
             });
            // console.log("fetch_emp wrong");
          }
        })
    }

    On_suspend = (ids,customer_id, value) => {
      const { settings} = this.props;
      const {
        addToast,
      } = this.props;
      const params = {
        user_id: ids,
        customer_id: customer_id,
        suspend:value
      }
      // console.log("paramssssssss", params);
      var Hero = null;
      const res = fetch(settings.api_url + "suspend_unsuspend_user", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          Hero = json;
        })
        .then(() => {
          this.setState({ sakura: Hero["status"] });
          if (Hero["status"] == true) {
            addToast({
              1: "DreamLand",
              content: Hero["message"],
              time: new Date(),
              duration: 4000,
            });
            this.fetch_single_emp(ids)
          }
        })
    }

 // **************************************************************************************************************************************
     render() {
            const { settings } = this.props;
                 const customStyles = {
                     control: ( css, state ) => {
                         return {
                             ...css,
                             borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                             '&:hover': {
                                 borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                             },
                             boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                         };
                     },
                     option: ( css, state ) => {
                         let bgc = '';

                         if ( state.isSelected ) {
                             bgc = '#725ec3';
                         } else if ( state.isFocused ) {
                             bgc = 'rgba(114, 94, 195, 0.2)';
                         }

                         return {
                             ...css,
                             backgroundColor: bgc,
                         };
                     },
                     multiValueLabel: ( css ) => {
                         return {
                             ...css,
                             color: '#545b61',
                             backgroundColor: '#eeeeef',
                         };
                     },
                 };
         return (
             <Fragment>
              <PageTitle className="title_headinggg">
                   <div style={{display:"inline-flex"}}><h1 className="user_haedingg" style={{marginTop:"0px",marginBottom:"0px"}} >User Management</h1></div>

               </PageTitle>
               <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>


                 <div className="" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                 <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                    <div  style={{display: this.state.no_data=="none" ? "block" :"none"}}>
                     <div className="row my_user_class">
                        <div className="col-lg-3 col-md-12 col-sm-12 right_pad">
                            <div className="height_13 mycalendar" style={{height:my_height-68,display: this.state.ipad_emp_list}}>
                            <Table striped className="purchase_table my_table_1">
                            <thead>
                              <tr>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap" }}> Name</th>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap" }}> Mobile No</th>

                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.user_array.map((value12, index12) => {
                                  return (
                                    <tr style={{ cursor: 'pointer' }} key={index12} onClick={() => {
                                      this.setState({

                                        spinner_1: 'block'
                                      })
                                      setTimeout(() => {
                                        this.fetch_single_emp(value12._id)
                                      }, 0)
                                    }}
                                    >
                                      <td className="strip_paded" style={{ borderLeft: value12._id == this.state.user_id ? "10px solid  #8bc240" : " 0px", verticalAlign: "middle" ,color: value12.full_name !=undefined ? "#6c757d" : "#d5d5d5"}} >{value12.full_name ? value12.full_name : "Not Provided"}</td>
                                      <td className="strip_paded" style={{ verticalAlign: "middle" }} >{value12.mobile_no}</td>
                                      </tr>
                                  )
                                })
                              }

                            </tbody>
                          </Table>
                           </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-sm-12 user_lestt" style={{display: sayali < 769 ? this.state.ipad_width : "block"}}>
                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />

                        <div style={{display:this.state.spinner_1=="none" ? "block":"none"}}>

                             <div style={{marginTop:"22px",display:"inline-flex",width:"100%"}}>
                                <h3 style={{whiteSpace:"nowrap"}}>{this.state.user_name}{" "} <span>({this.state.message})</span></h3>
                                <div className="user_btnnn" style={{width:"100%",textAlign:"end",marginRight: "45px"}}>
                                    <CustomInput
                                    disabled = {this.state.user_control =="false" ? 'disabled' : ''}
                                      defaultChecked={this.state.suspend}
                                      checked={this.state.suspend==true ? true : false}
                                      type="switch"
                                      id={this.state.customer_id}
                                      onClick={(e) => {
                                        this.On_suspend(this.state.user_id,this.state.customer_id, e.target.checked)
                                      }
                                      }
                                    />
                                    <Button style={{marginTop:"-5px", marginLeft: "5px", height: 'min-content', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: sayali < 769 ? "inline-flex" : "none"}}
                                    onClick={() => {
                                      this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                      })
                                    }}>Back</Button>
                                  </div>
                                </div>
                            {this.state.employeee_array_1.map((value,index12)=>{
                                return(
                                    <div key={index12} style={{marginTop: "22px"}}>

                            <div className="row" style={{ marginBottom: "15px" }}>
                            <div className="col-lg-4 col-md-4 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "82px", whiteSpace: "nowrap" }}>Mobile No</div>:
                              <span style={{ marginLeft: "11px" }}>{value.mobile_no}</span>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="maill_1 desi" style={{ width: "60px", whiteSpace: "nowrap" }}>Email Id</div>:
                              <span style={{ marginLeft: "11px" }}>{value.contact_email}</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12" style={{ display: "inline-flex" }}>
                              <div style={{ width: "104px", whiteSpace: "nowrap" }}>Material Status</div>:
                              <span style={{ marginLeft: "11px" }}>{value.marital_status == undefined ? "" :(value.marital_status.label==undefined ? value.marital_status :value.marital_status.label)}</span>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12" style={{ display: "inline-flex" }}>
                              <div style={{ width: "82px", whiteSpace: "nowrap" }}>Gender</div>:
                              <span style={{ marginLeft: "11px" }}>{value.gender}</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12" style={{ display: "inline-flex" }}>
                              <div style={{ width: "60px", whiteSpace: "nowrap" }}>City</div>:
                              <span style={{ marginLeft: "11px" }}>{value.city}</span>
                            </div>
                            </div>
                         </div>
                                )
                            })}

                            </div>
                        </div>
                     </div>
                  </div>
                 </div>
             </Fragment>
         );
     }
 }

 export default connect(({ settings }) => (
     {
         settings,
     }
 ), { updateAuth: actionUpdateAuth, addToast: actionAddToast })(Content);
