
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './stylee.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

const sayali =   window.innerWidth;
var height =   window.innerHeight;
////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
////console.log("admin_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}

import Dropdown from '../../components/bs-dropdown';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
       agent_array: [],
       designation:'',
       designation_id:'',
       button: "Add Designation",
       isLoading: "block",
       no_data:"none",
       did:"",
       master_control_12:Cookies.get('master_control'),
       current_page:1,
       total_pages:"",
       total:"",

    };

    this.fetch_designation();
    this.add_designation = this.add_designation.bind(this);
    this.button_Call = this.button_Call.bind(this);
    this.deleter = this.deleter.bind(this);
    this.delete_designation = this.delete_designation.bind(this);
    this.update_designation = this.update_designation.bind(this);
}

button_Call() {
    if (this.state.button == "Add Designation") {
        this.add_designation();
    }
    else {
        this.update_designation();
    }
}


deleter() {
       this.setState((preState) => ({
           modalOn: !preState.modalOn,
       }));
   }

///////////////////////////////////////////////////***************** fetch designation**************************////////////////////////////////



fetch_designation = async pageNumber =>  {
    if (pageNumber == '' || pageNumber == undefined) {

       this.setState({
           current_page: 1
       })
       var params = {
           page_no: 1
       }

   } else {

       this.setState({
           current_page: pageNumber
       })
       var params = {
           page_no: pageNumber
       }
   }
   ////console.log("destination",params);
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_designation", {
    // const res = fetch("http://192.168.29.31:4090/fetch_designation", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            console.log("fetch designation ****", json)
            var data = json;
            if (data.status == true) {
                this.setState({
                    agent_array: data.data,
                    isLoading:"none",
                    no_data:"none",
                    total_pages:data.total_pages,
                    total: data.total,
                });
            }
            else {
                this.setState({
                    agent_array: [],
                    no_data:"block",
                    isLoading:"none",

                });
                ////console.log("something wrong");
            }
        })
}


///////////////////////////////////////////////////***************** ADD designation ***************************////////////////////////////////

  add_designation() {
      const {
          addToast,settings
      } = this.props;

      var params = {
          designation: this.state.designation,
      }
      ////console.log("unit add", params);
      if (params.designation == "" || params.designation == undefined) {
          alert("Please Fill all fields")
      }
      else {
          const res = fetch(settings.api_url + "add_designation", {
        //   const res = fetch("http://192.168.29.31:4090/add_designation", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  ////console.log("Add designation **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                          designation: ''
                      });
                      this.fetch_designation();
                  }
                  else {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      ////console.log("something wrong");
                  }
              })
      }

  }

////////////////////////////////////////**************** DELETE designation **************************/////////////////////////////

  delete_designation(designation_id) {
      const {
          addToast,settings
      } = this.props;

      var params = {
          designation_id: designation_id,
      }
      ////console.log("params delete", params);
    //   const res = fetch("http://192.168.29.31:4090/delete_designation", {
      const res = fetch(settings.api_url + "delete_designation", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              ////console.log("Delete Designation ********", { params: params, response: json })
              var data = json;
                this.setState({ delete:data["status"] });
              if (data.status == true) {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                      modalOn:false
                  })
                  this.fetch_designation();
              }
              else {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                      modalOn:false
                  })
                  ////console.log("something wrong");
              }
          })
  }

  ///////////////////////////////////********************EDIT designation FUNCTIONALITY *******************************////////////////////////

  for_edit(value) {
      console.log("value**********",value);
      this.setState({
          button: "Update Designation",
          designation: value.designation,
          designation_id: value._id,
      })
  }

  update_designation() {
      const {
          addToast,settings
      } = this.props;

      var params = {
          designation_id: this.state.designation_id,
          designation: this.state.designation,
      }
      ////console.log("designation edittttttttttt", params);
      const res = fetch(settings.api_url + "update_designation", {
    //   const res = fetch("http://192.168.29.31:4090/update_designation", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              ////console.log("Edit designation *************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });

                  this.setState({
                      button: "Add Designation",
                      designation: ''
                  });
                  this.fetch_designation();
              }
              else {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                      button: "Add Designation",
                      designation: ''
                  });
                  ////console.log("something wrong");
              }
          })
  }


    render() {
        const { settings } = this.props;

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
                          className={classes,"pagination_222"}
                          onClick={() => {
                              this.fetch_designation(number)
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
                          className={classes,"pagination_222"}
                          onClick={() => {
                              this.fetch_designation(number + 1)
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
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading}}/>
            <div className="test_collapse">


            <PageTitle className="my_title" >

              <div className="my_classs">
                 <h1 className="heading_sne11111">Designation</h1>
                    <div className="bulbul">

                    <input type="text"
                        name="Designation"
                        className="form-control task_entry "
                        placeholder="Designation"
                        value={this.state.designation}
                        onChange={(e) => {
                            this.setState({
                                designation: e.target.value,
                            });
                        }}
                    />
                        </div>
                 <button id="add_designation" type="button" className="button_a" style={{whiteSpace:"nowrap"}} disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} onClick={this.button_Call}> {this.state.button}</button>
              </div>

            </PageTitle>

            <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
            <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>

                 <div className="table-responsive-lg table_res mycalendar" style={{display:this.state.no_data=="none" ? "block":"none",height:this.state.total_pages==1 ? my_height-68 : my_height-121}}>
                    <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"10px 25px"}} >Designation</th>
                                <th scope="col" className="table_head1" style={{padding:"10px 25px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.agent_array.map((value, index) => {
                                    return (
                            <tr key={index}>
                                <th className="stipped_inner_padding designation_name" scope="row">{value.designation}</th>
                                <td className="white_space stipped_inner_padding">
                                    <Button id="edit_designation" disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                          ////console.log("desination__________ ", value);
                                          this.for_edit(value);
                                      }}>Update</Button>{' '}
                                    <Button id="delete_designation" disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                    onClick={() => {this.setState({ modalOn: true, did: value._id }) }}
                                     >Delete</Button>
                                </td>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
                    </div>

                    {/* ********************************* Pagination ***************************************** */}

                    <div style={{display:this.state.total_pages==1?"none":'flex',flexWrap: "wrap",width:"100%",marginTop:"10px",padding: "1px 8px",justifyContent:"flex-end"}}>
                              <Button color="warning" className="pagination_222"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.fetch_designation(1)}>first</Button>

                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    this.fetch_designation(this.state.current_page - 1)
                                  } else {
                                    this.fetch_designation(this.state.current_page)
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
                                      this.fetch_designation(this.state.current_page + 1)
                                  } else {
                                      this.fetch_designation(this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.fetch_designation(this.state.total_pages)}>last</Button>
                            </div>



                    <Modal className={this.props.className, "sssss"}
                   isOpen={this.state.modalOn}
                   toggle={this.deleter} fade>
                   <ModalHeader>
                   <div style={{width:"100%" , height :"20px" , marginLeft : "133px"}}>
                   <Button className="close_button" style={{float:"right"}} onClick={this.deleter}>
                   <Icon name="x" />
                   </Button>
                   </div>
                   </ModalHeader>
                   <ModalBody>
                       <p className="paragraph">Are you sure you want to Delete?</p>
                   </ModalBody>
                   <ModalFooter>
                   <div style={{ height: '50px', width: '100%', marginTop:"-30px" }}>

                       <Button color="brand no_btn" id="delete_conform"
                           style={{ marginRight: "20px"}}
                           onClick={() => {
                               this.delete_designation(this.state.did)
                           }}
                       >yes</Button>
                       {'             '}
                       <Button color="secondary" onClick={this.deleter}>no</Button>
                   </div>


                   </ModalFooter>
               </Modal>


              {/* <div className="rui-gap-4" id="breadcrumbDropdown" />  */}
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
) , { addToast: actionAddToast })( Content );
