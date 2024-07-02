
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
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
//console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//console.log("admin_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}

import Dropdown from '../../components/bs-dropdown';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
       register_array: [],
       register_year:'',
       register_year_id:'',
       button: "Add Year",
       isLoading: "block",
       no_data:"none",
       master_control_12:Cookies.get('master_control'),
       show_erroe_data:"none",
       search_register_year:""
    };

    this.fetch_all_registration_year();
    this.add_registration_year = this.add_registration_year.bind(this);
    this.button_Call = this.button_Call.bind(this);
    this.deleter = this.deleter.bind(this);
    this.delete_registration_year = this.delete_registration_year.bind(this);
    this.update_registration_year = this.update_registration_year.bind(this);
}

button_Call() {
    if (this.state.button == "Add Year") {
        this.add_registration_year();
    }
    else {
        this.update_registration_year();
    }
}


deleter() {
       this.setState((preState) => ({
           modalOn: !preState.modalOn,
       }));
   }

///////////////////////////////////////////////////***************** fetch designation**************************////////////////////////////////



fetch_all_registration_year = (search_register_year)=>  {
//     if (pageNumber == '' || pageNumber == undefined) {

//        this.setState({
//            current_page: 1
//        })
//        var params = {
//            page_no: 1
//        }

//    } else {

//        this.setState({
//            current_page: pageNumber
//        })
//        var params = {
//            page_no: pageNumber
//        }
//    }
   var params={
       search:search_register_year
   }
   //console.log("Search Year Params",params);
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_all_registration_year", {
        method: 'POST',
        // body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("fetch Register ****", json)
            var data = json;
            if (data.status == true) {
                this.setState({
                    register_array: data.data,
                    isLoading:"none",
                    no_data:"none",
                    total_pages:data.total_pages,
                    total: data.total,
                });
            }
            else {
                this.setState({
                    register_array: [],
                    no_data:"block",
                    isLoading:"none",

                });
                //console.log("something wrong");
            }
        })
}


///////////////////////////////////////////////////***************** ADD Register Year ***************************////////////////////////////////

add_registration_year() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        year: this.state.register_year,
      }
      //console.log("Add Register Year Params", params);
      if (params.year == "" || params.year == undefined || params.year.length < 4) {
          //console.log("params.year.lengrh",params.year.length);
          alert("Please Fill all fields")
          this.setState({
            show_erroe_data:"block"
        })
      }
      else {
        this.setState({
            show_erroe_data:"none"
        })
          const res = fetch(settings.api_url + "add_registration_year", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("Add Register Year **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        register_year: '',
                        show_erroe_data:"none"
                      });
                      this.fetch_all_registration_year();
                  }
                  else {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      //console.log("something wrong");
                  }
              })
      }

  }

////////////////////////////////////////**************** DELETE designation **************************/////////////////////////////

delete_registration_year(register_year_id) {
      const {
          addToast,settings
      } = this.props;

      var params = {
        year_id: register_year_id,
      }
      //console.log("params delete", params);
      const res = fetch(settings.api_url + "delete_registration_year", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("Delete Year ********", { params: params, response: json })
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
                  this.fetch_all_registration_year();
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
                  //console.log("something wrong");
              }
          })
  }

  ///////////////////////////////////********************EDIT designation FUNCTIONALITY *******************************////////////////////////

  for_edit(value) {
      this.setState({
          button: "Update Year",
          register_year: value.year,
          register_year_id: value._id,
      })
  }

  update_registration_year() {
      const {
          addToast,settings
      } = this.props;

      var params = {
          year_id: this.state.register_year_id,
          year: this.state.register_year,
      }
      //console.log("register edittttttttttt", params);
      if (params.year == "" || params.year == undefined) {
        alert("Please Fill all fields")
    }
    else { const res = fetch(settings.api_url + "update_registration_year", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("Edit designation *************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.setState({
                    button: "Add Year",
                    register_year: ''
                });
                this.fetch_all_registration_year();
            }
            else {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                this.setState({
                    button: "Add Year",
                    register_year: ''
                });
                //console.log("something wrong");
            }
        })}

  }

  register_year_lenght=(length)=>{
    //console.log("length____",length.length);
    if (length.length>4) {
        this.setState({
            show_erroe_data:"block"
        })
        //console.log("greter_than");
    }
    else{
        this.setState({
            show_erroe_data:"none"
        })
        //console.log("small");
    }
  }


    render() {
        const { settings } = this.props;
        return (
            <Fragment>
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading}}/>
            <div className="test_collapse">


            <PageTitle className="my_title" >

              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Registration Year</h1>
                 <input type="number"
                        style={{marginLeft:"15px",marginTop:"1px"}}
                        className="form-control task_entry "
                        placeholder="Search Registration Year"
                        value={this.state.search_register_year}
                        onChange={(e) => {
                            this.setState({
                                search_register_year: e.target.value,
                            });
                            this.fetch_all_registration_year(e.target.value)
                        }}
                    />
                    <div className="bulbul">

                    <input type="number"
                        className="form-control task_entry "
                        placeholder="Add Registration Year"
                        value={this.state.register_year}
                        onChange={(e) => {
                            this.setState({
                                register_year: e.target.value,
                            });
                            this.register_year_lenght(e.target.value)
                        }}
                    />
                    <span style={{display:this.state.show_erroe_data=="block" ? "block" : "none",textAlign:"end",color:"red",marginBottom:"-14px"}}>Registeration Year Should Not be Greater then & Less then 4</span>
                        </div>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px"}} disabled={this.state.master_control_12 =="false" || this.state.show_erroe_data=="block" ? 'disabled' : ''} onClick={this.button_Call}> {this.state.button}</button>
              </div>

            </PageTitle>

            <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk}}>No Data Found</h3>
            <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                 <div className="table-responsive-lg table_res " style={{display:this.state.no_data=="none" ? "block":"none"}}>
                    <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}} >Registration Year</th>
                                <th scope="col" className="table_head1" style={{padding:"15px 25px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.register_array.map((value, index) => {
                                    return (
                            <tr key={index}>
                                <th className="stipped_inner_padding" scope="row">{value.year}</th>
                                <td className="white_space stipped_inner_padding">
                                    <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                          //console.log("Register__________ ", value);
                                          this.for_edit(value);
                                      }}>Edit</Button>{' '}
                                    <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                    onClick={() => {this.setState({ modalOn: true, register_year_id: value._id }) }}
                                     >Delete</Button>
                                </td>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
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

                       <Button color="brand no_btn"
                           style={{ marginRight: "20px"}}
                           onClick={() => {
                               this.delete_registration_year(this.state.register_year_id)
                           }}
                       >yes</Button>
                       {'             '}
                       <Button color="secondary" onClick={this.deleter}>no</Button>
                   </div>


                   </ModalFooter>
               </Modal>


              <div className="rui-gap-4" id="breadcrumbDropdown" />  </div>
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
