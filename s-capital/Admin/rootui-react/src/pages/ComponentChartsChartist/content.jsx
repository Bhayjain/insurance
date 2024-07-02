
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import Dropzone from '../../components/dropzone';
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
       rto_array: [],
       fuel_type:'',
       fuel_type_id:'',
       button: "Add Fuel Type",
       isLoading: "block",
       no_data:"none",
       master_control_12:Cookies.get('master_control'),
       add_rto_model:false,
       status:0,
       file_array: [],
       checkedBoxes: [],
       serach_rto_no:""
    };

    this.fetch_all_rto();
    this.add_rto = this.add_rto.bind(this);
    this.button_Call = this.button_Call.bind(this);
    this.add_rto_model = this.add_rto_model.bind(this);
    this.deleter = this.deleter.bind(this);
    this.delete_rto = this.delete_rto.bind(this);
    this.update_rto = this.update_rto.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
}

button_Call() {
    if (this.state.button == "Save") {
        this.add_rto();
    }
    else {
        this.update_rto();
    }
}


deleter() {
       this.setState((preState) => ({
           modalOn: !preState.modalOn,
       }));
   }
add_rto_model() {
       this.setState((preState) => ({
           add_rto_model: !preState.add_rto_model,
           button: "Save",
           city_name:"",
           rto_data: '',
           heading:"Add RTO",
           status:0,
       }));
   }

///////////////////////////////////////////////////***************** fetch Rto Data**************************////////////////////////////////



fetch_all_rto = (serach_rto_no)=>  {
    var params={
        search:serach_rto_no
    }
    //console.log("search RTO No ***",params);
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_all_rto", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("fetch RTO ****", json)
            var data = json;
            if (data.status == true) {
                this.setState({
                    rto_array: data.data,
                    isLoading:"none",
                    no_data:"none",
                });
            }
            else {
                this.setState({
                    rto_array: [],
                    no_data:"block",
                    isLoading:"none",

                });
                //console.log("something wrong");
            }
        })
}


///////////////////////////////////////////////////***************** ADD RTO DATA  ***************************////////////////////////////////

add_rto() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        city_name:this.state.city_name,
        rto_no:this.state.rto_data
      }
      //console.log("Add RTO Params", params);
      if (params.city_name == "" || params.city_name == undefined || params.rto_no == "" || params.rto_no == undefined) {
          alert("Please Fill all fields")
      }
      else {
          const res = fetch(settings.api_url + "add_rto", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("Add RTO NO **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        add_rto_model:false,
                        button: "Save",
                        city_name:"",
                        rto_data: '',
                        heading:"Add RTO"
                      });
                      this.fetch_all_rto();
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

////////////////////////////////////////**************** DELETE RTO DATA **************************/////////////////////////////

delete_rto(rto_id) {
    //console.log("e.target.checked",this.state.delete_type);
      const {
          addToast,settings
      } = this.props;
        if (this.state.delete_type=="single") {
            var params = {
                rto_id:rto_id,
                delete_type:"single"
              }
        }
        else{
            var params = {
                rto_id:this.state.checkedBoxes,
                delete_type:"multiple"
              }
        }

      //console.log("params delete", params);
      const res = fetch(settings.api_url + "delete_rto", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("Delete RTO ********", { params: params, response: json })
              var data = json;
                this.setState({ delete:data["status"] });
              if (data.status == true) {
                this.fetch_all_rto();
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                      modalOn:false,
                      delete_type:""
                  })

              }
              else {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                      modalOn:false,
                      delete_type:""
                  })
                  //console.log("something wrong");
              }
          })
  }

  ///////////////////////////////////********************EDIT RTO DATA FUNCTIONALITY *******************************////////////////////////

  for_edit(value) {
      this.setState({
          add_rto_model:true,
          button: "Update",
          heading: "Edit RTO",
          city_name: value.city_name,
          rto_id: value._id,
          rto_data: value.rto_no,
          status:1
      })
  }

  update_rto() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        rto_id:this.state.rto_id,
        city_name:this.state.city_name,
        rto_no:this.state.rto_data,
      }
      //console.log("RTO Edit Params", params);
      if (params.city_name == "" || params.city_name == undefined || params.rto_no == "" || params.rto_no == undefined) {
        alert("Please Fill all fields")
    }
    else { const res = fetch(settings.api_url + "update_rto", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("Edit RTO *************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.setState({
                    add_rto_model:false,
                    button: "Save",
                    city_name:"",
                    rto_data: '',
                    heading:"Add RTO"
                  });
                this.fetch_all_rto();
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
        })}

  }
  radioHandler = (status) => {
      //console.log("status",status);
    this.setState({ status });
};

add_rto_excel = () => {
      const { settings, addToast } = this.props;
      var fd = new FormData();
      var data = this.state.file_array[0];
      //console.log("data", data);

      if (this.state.file_array[0] == undefined) {
          //console.log("undefined");
      } else {

          var nameArr = this.state.file_array[0].type.split('/');
          //console.log("nameArr",nameArr);
      }
         //console.log("nameArr_____________",nameArr);

          fd.append('file_name', data);


           //console.log(...fd, "Add RTO Excel Data")
          const res = fetch(settings.api_url + "add_rto_excel", {
          method: 'POST',
          body: fd
      })
          .then((response) => response.json())
          .then(json => {
              //console.log("RTO Execl Data Response", json);
              if (json.status == true) {
                this.fetch_all_rto();
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                  this.setState({
                    add_rto_model:false,
                  })


              } else {
                  //console.log("something went wrong");
                  this.fetch_all_rto();
              }

          })
  }


  toggleCheckbox = (e, item,multiple) => {
		//console.log("e.target.checked",e.target.checked);
		//console.log("arrmultiplearr",multiple);
		//console.log("item",item);

    if(e.target.checked) {
		let arr = this.state.checkedBoxes;
		arr.push(item._id);
		//console.log("arr++++++++++",arr);
        this.setState({
        checkedBoxes: arr,
        delete_type:multiple
        })
	} else {
		let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item._id), 1);
		//console.log("items",items);
		this.setState = {
			checkedBoxes: items
		}
	}

    //console.log(this.state.checkedBoxes);

}
    render() {
        const { settings } = this.props;
        return (
            <Fragment>
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading}}/>
            <div className="test_collapse">


            <PageTitle className="my_title" >
              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>RTO</h1>
                 <div className="" style={{width:"89%",marginRight:"10px"}}>
                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Search RTO No"
                        value={this.state.serach_rto_no}
                        onChange={(e) => {
                            this.setState({
                                serach_rto_no: e.target.value,
                            });
                            this.fetch_all_rto(e.target.value)
                        }}
                    />
                </div>
                 <button type="button" className="button_delete" style={{whiteSpace:"nowrap",height:"37px",display:this.state.delete_type=="multiple" ? "block" :"none",marginLeft: "auto",marginRight:"10px"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={() => {
                             this.setState({ modalOn: true})
                           }}> Delete All</button>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px",marginLeft:this.state.delete_type=="multiple" ? "unset": "auto"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={this.add_rto_model}> Add RTO</button>

              </div>

            </PageTitle>

            <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk}}>No Data Found</h3>
            <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                 <div className="table-responsive-lg table_res " style={{display:this.state.no_data=="none" ? "block":"none"}}>
                    <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}} >RTO No</th>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}} >City Name</th>
                                <th scope="col" className="table_head1" style={{padding:"15px 25px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                       this.state.rto_array.map((value, index) => {
                                    return (
                            <tr key={index}>
                                <th className="stipped_inner_padding" scope="row">
                                    <div style={{display: "inline-flex"}}>
                                    <CustomInput
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={index}
                                                onChange={(e) => this.toggleCheckbox(e, value,"multiple")}
                                            />{value.rto_no}</div></th>
                                <th className="stipped_inner_padding" scope="row">{value.city_name}</th>
                                <td className="white_space stipped_inner_padding">
                                    <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                          //console.log("RTO Data__________ ", value);
                                          this.for_edit(value);
                                      }}>Edit</Button>{' '}
                                    <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                    onClick={() => {this.setState({ modalOn: true, rto_id: value._id,delete_type:"single" }) }}
                                     >Delete</Button>
                                </td>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
                    </div>
{/* *********************************************** Add RTO Model ********************************************************************* */}

               <Modal
                        isOpen={ this.state.add_rto_model}
                        toggle={ this.add_rto_model }
                        className={ this.props.className,"addd_rtoo" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.heading}</h5>
                            <Button className="close" color="" onClick={ this.add_rto_model }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                        <div className="row">
                               <div className="col-lg-4 col-md-4 col-sm-12">
                               <CustomInput type="radio" id="formRadio1" name="formRadio" label="Input Feild" checked={this.state.status === 1} onClick={(e) => this.radioHandler(1)} />
                               </div>
                               <div className="col-lg-4 col-md-4 col-sm-12" >
                               <div style={{display:this.state.heading=="Edit RTO" ? "none" :"block"}}>
                               <CustomInput type="radio" id="formRadio2" name="formRadio" label="Choose File" checked={this.state.status === 2} onClick={(e) => this.radioHandler(2)} />
                                </div>
                                </div>
                               <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status == 1 ? "block" :"none"}}>
                                   <div style={{display:this.state.status == 1 ? "block" :"none"}}>
                                   <Label className="upload_file_1">RTO No</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Add RTO No"
                                        value={this.state.rto_data}
                                        onChange={(e) => {
                                            this.setState({
                                                rto_data: e.target.value,
                                            });
                                        }}
                                    />
                                   </div>
                               </div>
                               <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status == 1 ? "block" :"none"}}>
                                   <div style={{display:this.state.status == 1 ? "block" :"none"}}>
                                   <Label className="upload_file_1">City Name</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="City Name"
                                        value={this.state.city_name}
                                        onChange={(e) => {
                                            this.setState({
                                                city_name: e.target.value,
                                            });
                                        }}
                                    />
                                   </div>
                               </div>

                               <div className="col-lg-5 col-md-5 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status == 2 ? "block" :"none"}}>
                                   <div style={{display:this.state.status == 2 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Upload File</Label>
                                   <div className="heavy">
                                     <Dropzone  onChange={(files) => {
                                        this.setState({
                                            file_array: files
                                           })
                                          //console.log(files);
                                    }} />

                                </div>
                                   </div>
                               </div>
                           </div>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.add_rto_model }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff",display:this.state.status == 1 ? "inline-flex" :"none"}} onClick={ this.button_Call }>{this.state.button}</Button>
                            <Button color="warning" style={{color:"#fff",display:this.state.status == 2 ? "inline-flex" :"none"}} onClick={ this.add_rto_excel }>Save file</Button>
                        </ModalFooter>
                    </Modal>


{/* ///////////////////////**********************Delete Model ***********************************************************  */}
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
                               this.delete_rto(this.state.rto_id)
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
