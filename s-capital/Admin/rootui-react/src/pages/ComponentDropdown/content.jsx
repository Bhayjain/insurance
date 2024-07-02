
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
       fuel_type_array: [],
       fuel_type:'',
       fuel_type_id:'',
       button: "Add Fuel Type",
       isLoading: "block",
       no_data:"none",
       master_control_12:Cookies.get('master_control'),
       show_erroe_data:"none",
       search_fuel_type:""
    };

    this.fetch_all_fuel_type();
    this.add_fuel_type = this.add_fuel_type.bind(this);
    this.button_Call = this.button_Call.bind(this);
    this.deleter = this.deleter.bind(this);
    this.delete_fuel_type = this.delete_fuel_type.bind(this);
    this.update_fuel_type = this.update_fuel_type.bind(this);
}

button_Call() {
    if (this.state.button == "Add Fuel Type") {
        this.add_fuel_type();
    }
    else {
        this.update_fuel_type();
    }
}


deleter() {
       this.setState((preState) => ({
           modalOn: !preState.modalOn,
       }));
   }

///////////////////////////////////////////////////***************** fetch fuel type**************************////////////////////////////////



fetch_all_fuel_type = (search_fuel_type)=>  {
    var params = {
        search:search_fuel_type
    }
    //console.log("Fuel Type Params",params);
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_all_fuel_type", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("fetch Fuel Type ****", json)
            var data = json;
            if (data.status == true) {
                this.setState({
                    fuel_type_array: data.data,
                    isLoading:"none",
                    no_data:"none",
                });
            }
            else {
                this.setState({
                    fuel_type_array: [],
                    no_data:"block",
                    isLoading:"none",

                });
                //console.log("something wrong");
            }
        })
}


///////////////////////////////////////////////////***************** ADD FUEL TYPE  ***************************////////////////////////////////

add_fuel_type() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        fuel_name: this.state.fuel_type,
      }
      //console.log("Add Fuel Type Params", params);
      if (params.fuel_name == "" || params.fuel_name == undefined) {
          alert("Please Fill all fields")
      }
      else {
          const res = fetch(settings.api_url + "add_fuel_type", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("Add Fuel Type **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        button: "Add Fuel Type",
                        fuel_type: ''
                      });
                      this.fetch_all_fuel_type();
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

////////////////////////////////////////**************** DELETE FUEL TYPE **************************/////////////////////////////

delete_fuel_type(fuel_type_id) {
      const {
          addToast,settings
      } = this.props;

      var params = {
        fuel_id: fuel_type_id,
      }
      //console.log("params delete", params);
      const res = fetch(settings.api_url + "delete_fuel_type", {
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
                  }),
                  this.fetch_all_fuel_type();
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

  ///////////////////////////////////********************EDIT FUEL TYPE FUNCTIONALITY *******************************////////////////////////

  for_edit(value) {
      this.setState({
          button: "Update Fuel Type",
          fuel_type: value.fuel_name,
          fuel_type_id: value._id,
      })
  }

  update_fuel_type() {
      const {
          addToast,settings
      } = this.props;

      var params = {
          fuel_id: this.state.fuel_type_id,
          fuel_name: this.state.fuel_type,
      }
      //console.log("Fuel Type Edit Params", params);
      if (params.fuel_name == "" || params.fuel_name == undefined) {
        alert("Please Fill all fields")
    }
    else { const res = fetch(settings.api_url + "update_fuel_type", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("Edit Fuel Type *************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.setState({
                    button: "Add Fuel Type",
                    fuel_type: ''
                });
                this.fetch_all_fuel_type();
            }
            else {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                this.setState({
                    button: "Add Fuel Type",
                    fuel_type: ''
                });
                //console.log("something wrong");
            }
        })}

  }
    render() {
        const { settings } = this.props;
        return (
            <Fragment>
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading}}/>
            <div className="test_collapse">


            <PageTitle className="my_title" >
              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Fuel Type</h1>
                 <input type="text"
                        style={{marginLeft:"15px",marginTop:"1px"}}
                        className="form-control task_entry "
                        placeholder="Search Fuel Type"
                        value={this.state.search_fuel_type}
                        onChange={(e) => {
                            this.setState({
                                search_fuel_type: e.target.value,
                            });
                            this.fetch_all_fuel_type(e.target.value)
                        }}
                    />
                    <div className="bulbul">

                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Add Fuel Type"
                        value={this.state.fuel_type}
                        onChange={(e) => {
                            this.setState({
                                fuel_type: e.target.value,
                            });
                        }}
                    />
                        </div>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={this.button_Call}> {this.state.button}</button>
              </div>

            </PageTitle>

            <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk}}>No Data Found</h3>
            <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                 <div className="table-responsive-lg table_res " style={{display:this.state.no_data=="none" ? "block":"none"}}>
                    <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}} >Fuel Type</th>
                                <th scope="col" className="table_head1" style={{padding:"15px 25px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                       this.state.fuel_type_array.map((value, index) => {
                                    return (
                            <tr key={index}>
                                <th className="stipped_inner_padding" scope="row">{value.fuel_name}</th>
                                <td className="white_space stipped_inner_padding">
                                    <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                          //console.log("Fuel Data__________ ", value);
                                          this.for_edit(value);
                                      }}>Edit</Button>{' '}
                                    <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                    onClick={() => {this.setState({ modalOn: true, fuel_type_id: value._id }) }}
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
                               this.delete_fuel_type(this.state.fuel_type_id)
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
