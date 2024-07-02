
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

import { components } from "react-select";
import { default as ReactSelect } from "react-select";


const sayali =   window.innerWidth;
var height =   window.innerHeight;
//////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//////console.log("admin_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}

import Dropdown from '../../components/bs-dropdown';

const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
        {/* <CustomInput type="checkbox"checked={props.isSelected}
            onChange={() => null}/> */}

          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            // className="check_new_box"
          />
          {" "}
          <label id={props.label} className="props_labkell">{props.label}</label>
        </components.Option>
      </div>
    );
  };



class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
       insurer_array: [],
       fuel_type:'',
       fuel_type_id:'',
       button: "Add Fuel Type",
       isLoading: "block",
       no_data:"none",
       master_control_12:Cookies.get('master_control'),
       add_insurer_model:false,
       insurer_type:"",
       file_array: [],
       checkedBoxes: [],
       serach_rto_no:"",
       optionSelected: null
    };

    this.fetch_all_insurer();
    this.add_insurer = this.add_insurer.bind(this);
    this.button_Call = this.button_Call.bind(this);
    this.add_insurer_model = this.add_insurer_model.bind(this);
    this.deleter = this.deleter.bind(this);
    // this.delete_rto = this.delete_rto.bind(this);
    this.update_insurer = this.update_insurer.bind(this);
    // this.toggleCheckbox = this.toggleCheckbox.bind(this);
}

button_Call() {
    if (this.state.button == "Save") {
        this.add_insurer();
    }
    else {
        this.update_insurer();
    }
}


deleter() {
       this.setState((preState) => ({
           modalOn: !preState.modalOn,
       }));
   }


add_insurer_model() {
       this.setState((preState) => ({
           add_insurer_model: !preState.add_insurer_model,
           button: "Save",
           insurer_type:"",
           insurer_name: '',
           heading:"Add Insurer",
           optionSelected: null
       }));
   }

///////////////////////////////////////////////////***************** fetch Rto Data**************************////////////////////////////////



fetch_all_insurer = ()=>  {
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_all_insurer", {
        method: 'POST',
        // body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("fetch Inurer ****", json)
            var data = json;
            if (data.status == true) {
                this.setState({
                    insurer_array: data.data,
                    isLoading:"none",
                    no_data:"none",
                });
            }
            else {
                this.setState({
                    insurer_array: [],
                    no_data:"block",
                    isLoading:"none",

                });
                //////console.log("something wrong");
            }
        })
}


///////////////////////////////////////////////////***************** ADD RTO DATA  ***************************////////////////////////////////

add_insurer() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        insurer_name:this.state.insurer_name,
        insurer_type:this.state.optionSelected
      }
      //console.log("Add insurer Params", params);
      if (params.insurer_name == "" || params.insurer_name == undefined || params.insurer_type == "" || params.insurer_type == undefined) {
          alert("Please Fill all fields")
      }
      else {
          const res = fetch(settings.api_url + "add_insurer", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  ////console.log("Add Insurer **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        add_insurer_model:false,
                        button: "Save",
                        insurer_type:"",
                        insurer_name: '',
                        heading:"Add Insurer",
                      });
                      this.fetch_all_insurer();
                  }
                  else {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
      }

  }

////////////////////////////////////////**************** DELETE RTO DATA **************************/////////////////////////////

delete_insurer(insurer_id) {
    //////console.log("e.target.checked",this.state.delete_type);
      const {
          addToast,settings
      } = this.props;
      var params = {
        insurer_id:insurer_id,
      }

      //console.log("params delete", params);
      const res = fetch(settings.api_url + "delete_insurer", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              ////console.log("Delete Insurer ********", { params: params, response: json })
              var data = json;
                this.setState({ delete:data["status"] });
              if (data.status == true) {
                this.fetch_all_insurer();
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
              }
          })
  }

  ///////////////////////////////////********************EDIT RTO DATA FUNCTIONALITY *******************************////////////////////////

  for_edit(value) {
      this.setState({
          add_insurer_model:true,
          button: "Update",
          heading: "Update Insurer",
          insurer_type: value.insurer_type,
          optionSelected: value.insurer_type,
          insurer_name: value.insurer_name,
          insurer_id: value._id,
      })
  }

  update_insurer() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        insurer_name:this.state.insurer_name,
        insurer_type:this.state.optionSelected,
        // insurer_type:this.state.insurer_type,
        insurer_id:this.state.insurer_id,
      }
      //console.log("Edit Params", params);
      if (params.insurer_type == "" || params.insurer_type == undefined || params.insurer_name == "" || params.insurer_name == undefined) {
        alert("Please Fill all fields")
    }
    else {
        const res = fetch(settings.api_url + "update_insurer", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            ////console.log("Edit Insurer *************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.setState({
                    add_insurer_model:false,
                    button: "Save",
                    city_name:"",
                    rto_data: '',
                    heading:"Add RTO"
                  });
                this.fetch_all_insurer();
            }
            else {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
            }
        })
    }

  }
  radioHandler = (insurer_type) => {
    this.setState({ insurer_type });
};
handleChange = (selected) => {
    //console.log("sele",selected);
    this.setState({
      optionSelected: selected
    });
  };

    render() {
        const insurer_type = [
            { value: '1', label: 'Post-Paid' },
            { value: '2', label: 'Pre-Paid' },
            { value: '3', label: 'Day End Receipting' },
        ];

        const customStyles = {
            control: ( css, state ) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#8bc240',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#8bc240',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: ( css, state ) => {
                // //console.log("cs============",css);
                let bgc = '';
                let color = '';

                if ( state.isSelected ) {
                    bgc = '#8bc240';
                    color = '#8bc240';
                } else if ( state.isFocused ) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                    color:color
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


        const { settings } = this.props;
        return (
            <Fragment>
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading}}/>
            <div className="test_collapse">


            <PageTitle className="my_title" >
              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Insurer</h1>
                 {/* <div className="" style={{width:"89%",marginRight:"10px"}}>
                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Search RTO No"
                        value={this.state.serach_rto_no}
                        onChange={(e) => {
                            this.setState({
                                serach_rto_no: e.target.value,
                            });
                            this.fetch_all_insurer(e.target.value)
                        }}
                    />
                </div> */}
                 <button id="add_insurer_button" type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px",marginLeft:this.state.delete_type=="multiple" ? "unset": "auto"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={this.add_insurer_model}> Add Insurer</button>

              </div>

            </PageTitle>

            <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk}}>No Data Found</h3>
            <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                 <div className="mycalendar"style={{height:my_height-68}}>
                 <div className="table-responsive-lg table_res " style={{display:this.state.no_data=="none" ? "block":"none"}}>
                    <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}} >Insurer </th>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}} >Insurer Type</th>
                                <th scope="col" className="table_head1" style={{padding:"15px 25px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                       this.state.insurer_array.map((value, index) => {
                                    return (
                            <tr key={index}>
                                <th className="stipped_inner_padding" scope="row">{value.insurer_name}</th>
                                <th className="stipped_inner_padding show_insurer" scope="row" >
                                    {/* {value.insurer_type ? value.insurer_type.map((val,ind)=>{
                                        return(
                                            <div key={ind}>
                                                <span>{val.label}</span>
                                            </div>
                                        )
                                    }) :""} */}
                                    {typeof(value.insurer_type)== "string" ? (value.insurer_type=="pre_paid" ? "Pre-Paid" :"Post-Paid"):
                                    value.insurer_type.map((val,ind)=>{
                                        return(
                                            <div key={ind}>
                                                <span>{val.label}</span>
                                            </div>
                                        )
                                    })}
                                    {/* {value.insurer_type=="pre_paid" ? "Advance" :"Post-Paid"} */}
                                    </th>
                                <td className="white_space stipped_inner_padding">
                                <Button id="edit_insurer_button" disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                          //////console.log("RTO Data__________ ", value);
                                          this.for_edit(value);
                                      }}>Update</Button>  {' '}
                                    <Button id="delete_insurer_model" disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                    onClick={() => {this.setState({ modalOn: true, insurer_id: value._id}) }}
                                     >Delete</Button>
                                </td>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
                    </div>
                    </div>
{/* *********************************************** Add RTO Model ********************************************************************* */}

               <Modal
                        isOpen={ this.state.add_insurer_model}
                        toggle={ this.add_insurer_model }
                        className={ this.props.className,"addd_rtoo" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.heading}</h5>
                            <Button className="close" color="" onClick={ this.add_insurer_model }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                        <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                                   <Label className="upload_file_1">Insurer Company Name</Label>
                                   <input type="text"
                                        name="insurer_name"
                                        className="form-control"
                                        placeholder="Add Insurer Company Name"
                                        value={this.state.insurer_name}
                                        onChange={(e) => {
                                            this.setState({
                                                insurer_name: e.target.value,
                                            });
                                        }}
                                    />

                               </div>
                               <div className="col-lg-6 col-md-6 col-sm-12">
                               <Label className="upload_file_1">Insurer Type</Label>

                               <span
                                    // className="d-inline-block"
                                    // data-toggle="popover"
                                    // data-trigger="focus"
                                    // data-content="Please selecet account(s)"
                                >
                                    <ReactSelect
                                    options={insurer_type}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    components={{
                                        Option
                                    }}
                                    onChange={this.handleChange}
                                    allowSelectAll={true}
                                    value={this.state.optionSelected}
                                    styles={ customStyles }
                                      className="bg-color"
                                    id="insurer_type"
                                    />
                                </span>

                               {/* <Select
                                            value = {this.state.insurer_type}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    insurer_type: e,
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ insurer_type }
                                            styles={ customStyles }
                                            isMulti
                                        /> */}


                               <div className="innnnn_type">
                               {/* <CustomInput type="checkbox" id="formCheckbox1" label="Post-Paid" />
                               <CustomInput type="checkbox" id="formCheckbox2" label="Advance" />
                               <CustomInput type="checkbox" id="formCheckbox3" label="Day end receipting" /> */}

                               {/* <CustomInput type="radio" id="formRadio1" name="formRadio" label="Post-Paid" checked={this.state.insurer_type === "post_paid"} onClick={(e) => this.radioHandler("post_paid")} />
                               <CustomInput type="radio" id="formRadio2" name="formRadio" label="Advance" checked={this.state.insurer_type === "pre_paid"} onClick={(e) => this.radioHandler("pre_paid")} /> */}
                                </div>
                               </div>




                           </div>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.add_insurer_model }>Close</Button>
                            { ' ' }

                            <Button color="warning" id="save_insurer_data" style={{color:"#fff"}} onClick={ this.button_Call }>{this.state.button}</Button>
                        </ModalFooter>
                    </Modal>


{/* ///////////////////////**********************  Delete Model ***********************************************************  */}
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

                       <Button color="brand no_btn" id="delete_insurer"
                           style={{ marginRight: "20px"}}
                           onClick={() => {
                               this.delete_insurer(this.state.insurer_id)
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
