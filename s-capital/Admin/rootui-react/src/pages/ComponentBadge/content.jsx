
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import PageTitle from '../../components/page-title';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody,Label, Spinner } from "reactstrap";
import Snippet from '../../components/snippet';
import {  CustomInput, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

const device_width =   window.innerWidth;
var height =   window.innerHeight;
//console.log("agent_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}

class Content extends Component {
  constructor(props) {
       super(props);
       this.state = {
           modalOpen: false,
            modalOn: false,
           agent_array:[],
           agent_array_single: [],
            button: "Save",
            file: [],
            agent_name: "",
            agent_email: "",
            agent_phone: "",
            agent_address: "",
            agent_percent: "",
            password: "",
            relation_array:[],
            relation_type:"",
            emp_relationship:"",
            agent_spinner : "block",
            user_name:"",
            suspend:"",
            message:"",
            delid:"",
            show_error:"none",
            agent_management_control:Cookies.get('agent_management_control'),
            isLoading:"block",
            user_type:"agent",
            ipad_width:"none",
            ipad_emp_list:"block",
            no_data:"none",
            current_page:1,
            total:"",
            search_user:"",
            borderNew:false,
            error_meesage_eng:"",
       }
       this.fetch_agent();
       this.fetch_relation_manager_dropdown();
       this.toggle = this.toggle.bind(this);
       this.deleter = this.deleter.bind(this);
       this.add_agent = this.add_agent.bind(this);
       this.update_agent = this.update_agent.bind(this);
       this.switch_fun = this.switch_fun.bind(this);
         this.delete_agent = this.delete_agent.bind(this);
    }



////////////////////////////////////////////////////////// fetch relation array   ///////////////////////////////////////////////////////////

    fetch_relation_manager_dropdown () {
        const {settings
        } = this.props;
        const res = fetch(settings.api_url +"fetch_relation_manager_dropdown", {
        // const res = fetch("http://192.168.29.31:4090/fetch_relation_manager_dropdown", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(json => {
                //console.log("relation_array", json);
                var data = json;
                if (data.status == true) {
                    this.setState({
                        relation_array: data.data,
                    })
                }
                else {
                    this.setState({
                        relation_array: [],
                    })
                }
            });
    }


    toggle() {
       this.setState((preState) => ({
           modalOpen: !preState.modalOpen,
            button: "Save",
            heading: "Add",
            agent_name: "",
            agent_email: "",
            agent_phone: "",
            agent_address: "",
            agent_percent: "",
            password: "",
            relation_type:"",
            show_error:"none",
       }));
       //console.log(this.state.agent_address,"kkkkkkkkkkkkkkkkkk");
   }

   deleter() {
          this.setState((preState) => ({
              modalOn: !preState.modalOn,
          }));
      }


   switch_fun() {
    if (this.state.button == "Save") {
        this.add_agent();
    }
    else {
        this.update_agent();
    }
}

   ///////////////////////////////////////////////////***************** fetch agent ***************************////////////////////////////////

   fetch_agent = (search_sm,pageNumber) =>  {

    if (search_sm=="" || search_sm == undefined ) {
        var my_sm_search= undefined
      }
      else{
        var my_sm_search= search_sm

        this.setState({
            search_user:my_sm_search,

        })
      }


       if (pageNumber == '' || pageNumber == undefined) {

          this.setState({
              current_page: 1
          })
          var params = {
              page_no: 1,
              search_by:my_sm_search
          }

      } else {

          this.setState({
              current_page: pageNumber
          })
          var params = {
              page_no: pageNumber,
              search_by:my_sm_search
          }
      }

    //console.log("Agents data",params);
    const {settings
    } = this.props;
    const res = fetch(settings.api_url +"fetch_agent", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((response) => response.json())
      .then(json => {
        //console.log("agent json", json);
        var agent = json;
        if (agent.status == true) {
          this.setState({
            agent_array: agent.data,
            isLoading:"none",
            no_data:"none",
            total_pages: agent.total_pages,
            total:agent.total,
          })
          //console.log(this.state.agent_array, "agent_array");
          if (device_width < 820) {
            //console.log("display lisit none");

           }
           else{
            this.fetch_single_agent(agent.data[0]._id)
           }

        }
        else {
          this.setState({
            agent_array: [],
            isLoading:"none",
            no_data:"block",
            total_pages: "",
          })
        }
      });
  }

///////////////////////////////////////////////////***************** fetch single agent ***************************////////////////////////////////


  fetch_single_agent = (id) => {
    const {settings
    } = this.props;
      const params = {
          agent_id: id
      }
      //console.log("fetched agent data", params)

    //   const res = fetch(settings.api_url +"http://192.168.29.31:4090/fetch_single_agent", {
      const res = fetch(settings.api_url +"fetch_single_agent", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      })
          .then((response) => response.json())
          .then(json => {
              //console.log("agent", json);
              var data = json;
              if (data.status == true) {

                if (device_width < 820) {
                 var ipad_emp_list = "none";
                 //console.log("display lisit none", ipad_emp_list);
                }
                else{
                var ipad_emp_list = "block"
                //console.log("display lisit");

                }
                if(data.data[0].suspend == true){
                  var message="Suspended"
                }
                else if(data.data[0].suspend == false){
                  var message="Unsuspende"
                }
                else
                {
                  var message="There Is no Data"
                }

                  this.setState({
                      agent_array_single: data.data,
                      agent_id: data.data[0]._id,
                      agent_spinner: 'none',

                      suspend:data.data[0].suspend,
                      agent_name:data.data[0].agent_name,
                      customer_id:data.data[0].customer_id,
                      ipad_width:"block",
                      ipad_emp_list:ipad_emp_list,
                      message:message

                  })
                  //console.log("suspenddddddddddddddd",data.data[0].suspend)
                  //console.log("suspenddddddddddddddd",this.state.suspend)
              }
              else {
                  this.setState({
                      agent_array_single: [],
                      agent_spinner: 'none'
                  })
              }
          });
  }


  On_suspend = (id,customer_id, value) => {
    const {
      addToast,
    } = this.props;
    const {settings
    } = this.props;
    const params = {
      agent_id: id,
      customer_id: customer_id,
      suspend:value
    }
    //console.log("paramssssssss", params);
    var Hero = null;
    // const res = fetch("http://192.168.29.31:4090/suspend_unsuspend_agent", {
    const res = fetch(settings.api_url +"suspend_unsuspend_agent", {
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
            1: "Add my policy",
            content: Hero["message"],
            time: new Date(),
            duration: 4000,
          });
          this.fetch_single_agent(id)
        }
      })
  }


///////////////////////////////////////////////////***************** ADD agent ***************************////////////////////////////////


   add_agent = () => {
     const {
         addToast,
     } = this.props;
     const {settings
     } = this.props;

        const params = {
            agent_name: this.state.agent_name,
            agent_email: this.state.agent_email,
            agent_phone: this.state.agent_phone,
            agent_address: this.state.agent_address,
            agent_percent: this.state.agent_percent,
            password: this.state.password,
            emp_relationship: this.state.relation_type,
            type:this.state.user_type
          }
          console.log("tttttttttt", params);

          if(params.agent_name == "" || params.agent_name == undefined || params. agent_phone == "" || params. agent_phone == undefined ||
          params.password == "" || params.password == undefined || params.agent_email == "" ||
           params.agent_email == undefined || params.agent_address == "" || params.agent_address == undefined
        ){
            this.setState({
                error_meesage_eng:"Please fill all the fields",
                borderNew:true
            })
          }
          else{
              var admin_data = null;
          const res = fetch(settings.api_url +"add_agent", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
        .then((response) => response.json())
        .then(json => {
            //console.log("agent json", json);
            var data = json;
            if (data.status == true) {
                this.setState({
                    modalOpen: false,
                    agent_name: '',
                    agent_email: '',
                    agent_phone: '',
                    agent_address: '',
                    agent_percent:'',
                    password: '',
                    relation_type: '',
                    emp_relationship:'',
                    show_error:"none",
                    error_meesage_eng:"",
                    borderNew:false
                })
                this.fetch_agent();
            }
            else {
              this.setState({
                modalOpen: true,
                error_meesage_eng:data.message ,
                });

               this.fetch_agent();

               //console.log("something wrong");
            }
        });
      }

        //console.log("agent_name", this.state.agent_name)
        //console.log("agent_email", this.state.agent_email)
        //console.log("agent_phone", this.state.agent_phone)
        //console.log("agent_address", this.state.agent_address)
        //console.log("agent_percent", this.state.agent_percent)
        //console.log("password", this.state.password)
        //console.log("relation", this.state.relation_type)

    }

    //////////////////////////////////////////////////***************** delete agent ***************************////////////////////////////////

    delete_agent(id) {
        const {
            addToast
        } = this.props;
        const {settings
        } = this.props;

        var params = {
            agent_id: id,
        }
        //console.log("params delete", params);
        // const res = fetch("http://192.168.29.31:4090/delete_agent", {
        const res = fetch(settings.api_url +"delete_agent", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Delete agent ********", { params: params, response: json })
                var data = json;
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

                    this.fetch_agent();
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

///////////////////////////////////////////////////***************** edit agent ***************************////////////////////////////////

edit_agent= (v1) => {
//   console.log("update agent params", v1);
            this.setState({
            modalOpen:true,
            heading: "Update",
            button: "Update",
            agent_id: v1._id,
            agent_name: v1.agent_name,
            agent_email: v1.agent_email,
            agent_phone: v1.agent_phone,
            agent_address: v1.agent_address,
            password: v1.password,
            agent_percent: v1.agent_percent,
            relation_type: v1.emp_relationship,
            show_error:"none",
            user_type:v1.type
        })
    }

    update_agent = () => {
        const { addToast } = this.props;
        const {settings
        } = this.props;

        const params = {
            agent_id: this.state.agent_id,
            agent_email: this.state.agent_email,
            agent_name: this.state.agent_name,
            agent_phone: this.state.agent_phone,
            agent_address: this.state.agent_address,
            password: this.state.password,
            agent_percent: this.state.agent_percent,
            emp_relationship: this.state.relation_type,
            type:this.state.user_type

        }
        //console.log("update agent params", params);

        if(params.agent_name == "" || params.agent_name == undefined || params. agent_phone == "" || params. agent_phone == undefined ||
        params.password == "" || params.password == undefined || params.agent_email == "" ||
           params.agent_email == undefined || params.agent_address == "" || params.agent_address == undefined
         ){
            alert("please fill all the fields")
        }
        else{
            var admin_data = null;
        const res = fetch(settings.api_url +"update_agent", {
        // const res = fetch("http://192.168.29.31:4090/update_agent", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(json => {
                //console.log("agent json", json);
                var data = json;
                if (data.status == true) {
                  addToast({
                      title: 'Update',
                      content: data["message"],
                      time: new Date(),
                      duration: 2000,
                  });
                    this.setState({
                        modalOpen: false,
                        agent_name: '',
                        agent_email: '',
                        agent_phone: '',
                        agent_address: '',
                        agent_percent:'',
                        password: '',
                        emp_relationship:'',
                        show_error:"none",
                    });
                      this.fetch_agent();
                }
                else {
                  addToast({
                      title: 'Update',
                      content: data["message"],
                      time: new Date(),
                      duration: 2000,
                  });
                    this.setState({
                        agent_array: [],
                          modalOpen:false
                    });

                    //console.log("something wrong");
                }
            });
    }
  }

  percentage_error=(e)=>{
    if ( Number(e) > 100) {
        this.setState({
            show_error:"block"
        })
        //console.log("fvfvbc");
    }
    else{
        this.setState({
            show_error:"none"
        })
        //console.log("goddd");
    }
  }

  radioHandler = (status) => {
    this.setState({ status });
};



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
                                this.fetch_agent(this.state.search_user,number)
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
                                this.fetch_agent(this.state.search_user,number + 1)
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


        const {settings
        } = this.props;

      const customStyles = {
          control: (css, state) => {
              return {
                  ...css,
                  borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                  '&:hover': {
                      borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                  },
                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
              };
          },
          option: (css, state) => {
              let bgc = '';

              if (state.isSelected) {
                  bgc = '#725ec3';
              } else if (state.isFocused) {
                  bgc = 'rgba(114, 94, 195, 0.2)';
              }

              return {
                  ...css,
                  backgroundColor: bgc,
              };
          },
          multiValueLabel: (css) => {
              return {
                  ...css,
                  color: '#545b61',
                  backgroundColor: '#eeeeef',
              };
          },
      }


      var relation_array = this.state.relation_array.map(item => {
          return {
              value: item.emp_id,
              label: item.emp_data
          }
      })

    //   const user_type = [
    //     { value: '1', label: 'Agent' },
    //     { value: '2', label: 'Dealer' },

    // ];


        return (
            <Fragment>

            <PageTitle className="my_titleeeeeee">

               <div className="row">
               <div className="col-lg-9 col-md-6 col-sm-12">
                        <h1 className="h11111">Agencies/Telesales Management</h1>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 colm_sne" style={{display:"inline-flex"}}>

                    <div>
                     <input
                       style={{marginTop:"1px",marginRight:"12px",width:"230px"}}
                       type="text"
                       className="form-control serach_smmm_22 marrrr_ginnnnn"
                       aria-describedby="emailHelp"
                       placeholder="Search by Name"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.fetch_agent(e.target.value,this.state.current_page)
                       }}
                  />
                     </div>


                              <Button style={{textTransform:"capitalize"}} className="button_sne" color="brand" disabled={this.state.agent_management_control =="false" ? 'disabled' : ''} onClick={this.toggle}>Add</Button>
                              <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                  <Button className="my_new_nnnn" style={{ marginLeft: "5px", height: '39px', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",marginTop:'4px'}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>
                                    {/* <Icon name="arrow-left" className=""/> */}
                                    </div>

                              <Modal className={this.props.className, "dddddddd modal-dialog-centered"}
                           isOpen={this.state.modalOpen}
                           toggle={this.toggle}
                           fade>

                           <ModalHeader className="modal_header">
                               <h5 className="modal-title h2">{this.state.heading}</h5>

                           </ModalHeader>
                           <ModalBody>
                               <div className="row">
                                   <div className="col-md-6">
                                       <Label className=" form_lable">Name<span className="start_mark">*</span></Label>
                                       <Input type="Name" placeholder="Name" className="form-control ff"  value={this.state.agent_name}
                                       invalid={this.state.borderNew  && this.state.agent_name == "" ? true :false}
                                            onChange={(e) => {
                                                this.setState({
                                                    agent_name: e.target.value,error_meesage_eng:""
                                                });
                                            }} />
                                   </div>
                                   <div className="col-md-6">
                                       <Label className="form-label form_lable">Email<span className="start_mark">*</span></Label>
                                       <Input type="Name" placeholder="Email" className="form-control ff" value={this.state.agent_email}
                                       invalid={this.state.borderNew  && this.state.agent_email == "" ? true :false}
                                            onChange={(e) => {
                                                this.setState({
                                                    agent_email: e.target.value,error_meesage_eng:""
                                                });
                                            }}/>
                                   </div>
                                   <div className="col-md-6">
                                       <Label className="form-label form_lable">Mobile Number<span className="start_mark">*</span></Label>
                                       <Input type="Number" placeholder="Mobile Number" className="form-control ff" value={this.state.agent_phone}
                                       invalid={this.state.borderNew  && this.state.agent_phone == "" ? true :false}
                                            onChange={(e) => {
                                                this.setState({
                                                    agent_phone: e.target.value,error_meesage_eng:""
                                                });
                                            }} />
                                   </div>
                                   <div className="col-md-6">
                                       <Label className="form-label form_lable">Address<span className="start_mark">*</span></Label>
                                       <Input className="form-control ff" placeholder="Address" value={this.state.agent_address}
                                       invalid={this.state.borderNew  && this.state.agent_address == "" ? true :false}
                                            onChange={(e) => {
                                                this.setState({
                                                    agent_address: e.target.value,error_meesage_eng:""
                                                });
                                            }}/>
                                   </div>

                                   <div className="col-md-6">
                                       <Label className="form-label form_lable">Password<span className="start_mark">*</span></Label>
                                       <Input placeholder="Password" className="form-control ff" value={this.state.password}
                                       invalid={this.state.borderNew  && this.state.password == "" ? true :false}
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value,error_meesage_eng:""
                                                });
                                            }} />
                                   </div>

                                   <div className="col-md-6">
                                       <Label className="form-label form_lable">Percentage</Label>
                                       <Input type="Number" className="form-control ff" placeholder="Percentage" value={this.state.agent_percent}
                                            onChange={(e) => {
                                                this.setState({
                                                    agent_percent: e.target.value,error_meesage_eng:""
                                                });
                                                this.percentage_error(e.target.value)
                                            }}/>
                                            <span style={{display:this.state.show_error=="block" ?"block" : "none",color:"red"}}>
                                                Percentage Should not be greater then 100</span>
                                   </div>
                                   <div className="col-md-6">
                                       <Label className="form-label form_lable">Relationship Manager</Label>
                                       <Select
                                             value = {this.state.relation_type}
                                             onChange={(e) => {
                                                 //console.log(e, "Val.....")
                                                 this.setState({
                                                     relation_type: e
                                                 });
                                             }}
                                             placeholder="Select Relation"
                                             options={ relation_array }
                                             styles={ customStyles }
                                             className="contact_sort"
                                   />
                                   </div>
                                   <div className="col-md-6" style={{display: "grid",marginTop:"3px"}}>
                                       <Label className="form-label form_lable">Type<span className="start_mark">*</span></Label>
                                       <div style={{ display: 'inline-flex' ,marginTop:"-8px"}}>
                                        <CustomInput type="radio" id="formRadio1" name="formRadio" label="Agent"  checked={this.state.user_type === "agent"}
                                            invalid={this.state.borderNew  && this.state.user_type == "" ? true :false}
                                            onClick={(e) =>
                                            {
                                                this.setState({
                                                    user_type: "agent",error_meesage_eng:""
                                                });
                                            }
                                           } />
                                        <div style={{ width: '48px' }} />
                                        <CustomInput type="radio" id="formRadio2" name="formRadio" label="Dealer"  checked={this.state.user_type === "dealer"}
                                            invalid={this.state.borderNew  && this.state.user_type == "" ? true :false}
                                            onClick={(e) =>
                                            {
                                                this.setState({
                                                    user_type: "dealer",error_meesage_eng:""
                                                });
                                            }
                                           }/>
                                        <div style={{ width: '48px' }} />
                                        <CustomInput type="radio" id="formRadio3" name="formRadio" label="Telecaller"  checked={this.state.user_type === "telecaller"}
                                            invalid={this.state.borderNew  && this.state.user_type == "" ? true :false}
                                            onClick={(e) =>
                                            {
                                                this.setState({
                                                    user_type: "telecaller",error_meesage_eng:""
                                                });
                                            }
                                           }/>
                                    </div>
                                   </div>
                                   <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_eng=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_eng}</p>
                                 </div>
                               </div>
                           </ModalBody>
                           <ModalFooter>
                               <Button className="button_sne2" style={{textTransform:"capitalize"}}  color="secondary" onClick={this.toggle}>Close</Button>
                               {' '}
                               <Button className="button_sne3" style={{textTransform:"capitalize"}} color="secondary" onClick={this.switch_fun}>{this.state.button}</Button>
                           </ModalFooter>
                       </Modal>
                         </div>
               </div>
               <Modal className={this.props.className, "mmmm"}
              isOpen={this.state.modalOn}
              toggle={this.deleter} fade>
              <ModalHeader>
              <div style={{width:"100%" , height :"20px" , marginLeft : "135px"}}>
              <Button className="close_button1" style={{float:"right"}} onClick={this.deleter}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" name="x" class=" rui-icon">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> */}
              </Button>
              </div>
              </ModalHeader>
              <ModalBody>
                  <p className="paragraph">Are you sure you want to Delete?</p>
              </ModalBody>
              <ModalFooter>
              <div style={{ height: '50px', width: '100%', marginTop:"-30px" }}>

                  <Button color="brand no_btn"
                      style={{ marginRight: "20px",textTransform:"capitalize" }}
                      onClick={() => {
                          this.delete_agent(this.state.delid)

                      }}
                  >yes</Button>
                  {'             '}
                  <Button color="secondary" style={{textTransform:"capitalize"}} onClick={this.deleter}>no</Button>
              </div>

              </ModalFooter>
          </Modal>

            </PageTitle>
    <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>
        <div style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
        <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
        <div  style={{display: this.state.no_data=="none" ? "block" :"none"}}>
        <div className="row" >
          <div className="col-lg-3 col-md-12 col-sm-12 height_table" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>
            <div className=" mycalendar" style={{height:this.state.total_pages==1 ? my_height-68 : my_height-126}}>
            <div className="table-responsive-lg">
               <table className="table table-striped tablellll">
                           <thead>
                               <tr className="trrr">
                                   <th className="heading" scope="col" style={{padding:"10px 25px"}}>Name</th>
                               </tr>
                           </thead>
                           <tbody>
                           {this.state.agent_array.map((v, i) => {
                           return (
                               <tr style={{ cursor: 'pointer' }} key={i} onClick={() => {
                                 this.setState({
                                   agent_spinner: 'block'
                                 })
                                      setTimeout(() => {
                                       this.fetch_single_agent(v._id)
                                   }, 0)
                               }}>


                                   <td className="" style={{borderLeft:this.state.agent_id == v._id ? "5px solid #8bc240" :""}}>{v.agent_name}</td>
                               </tr>
                           )
                       })}
                           </tbody>
                       </table>
                       </div>
            </div>

            <div style={{display:this.state.total_pages==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.fetch_agent(this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    this.fetch_agent(this.state.search_user,this.state.current_page - 1)
                                  } else {
                                    this.fetch_agent(this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >Previous</Button>
                                {renderPageNumbers}

                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page == this.state.total_pages ? '#8bc240' : '',
                              display: this.state.current_page == this.state.total_pages ? "none" : "block",
                              color: this.state.current_page == this.state.total_pages ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page < this.state.total_pages) {
                                      this.fetch_agent(this.state.search_user,this.state.current_page + 1)
                                  } else {
                                      this.fetch_agent(this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.fetch_agent(this.state.search_user,this.state.total_pages)}>last</Button>
                            </div>


            </div>

            <div className="col-lg-9 col-md-12 col-sm-12" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
            <Spinner color="warning" className="agent_spinner agent_spinner_color" style={{ marginTop: gk, display: this.state.agent_spinner }} />
            <div className="test_collapse">

            <div style={{display:this.state.agent_spinner=="none" ? "block":"none"}}>
                <div>
                        {
                               this.state.agent_array_single.map((v1, i1) => {
                                   return (
                                       <div key={i1}>
                                        <div className="row">
                                                <div className="col-lg-5 col-md-8 col-sm-12" style={{display: "inline-flex"}}>
                                                      <h4 className="heading_sne1">{v1.agent_name}</h4>
                                                      <h3 className="suspended_name" style={{whiteSpace:"nowrap"}}>
                                                      <span style={{display:v1.suspend==true ? "block" : "none"}}>(Suspended)</span>
                                                      <span style={{display:v1.suspend==false || v1.suspend==undefined ? "block" : "none"}}>(Unsuspended)</span></h3>

                                                </div>
                                                <div className="col-lg-7 col-md-4 col-sm-12 col2">
                                                <div className="shot_put">
                                                    <CustomInput
                                                    className="cccustum"
                                                    // disabled = {this.state.user_control =="false" ? 'disabled' : ''}
                                                      disabled={this.state.agent_management_control =="false" ? 'disabled' : ''}
                                                      defaultChecked={this.state.suspend}
                                                      checked={this.state.suspend==true ? true : false}
                                                      type="switch"
                                                      id={this.state.customer_id}
                                                        style={{marginTop:"22px"}}
                                                      onClick={(e) => {
                                                        this.On_suspend(this.state.agent_id,this.state.customer_id, e.target.checked)
                                                      }
                                                      }
                                                    />
                                                  </div>
                                                    <Button style={{textTransform:"capitalize"}} disabled={this.state.agent_management_control =="false" ? 'disabled' : ''} className=" btn_sne" color="success" onClick={() => { this.edit_agent(v1) }}
                                                    ><i className="fa fa-pencil-square-o"></i> Update</Button>
                                                    <Button style={{textTransform:"capitalize"}} disabled={this.state.agent_management_control =="false" ? 'disabled' : ''} className=" btn_sne1" color="danger"
                                                      onClick={() => {this.setState({ modalOn: true, delid: v1._id }) }}
                                                     ><i className="fa fa-trash">
                                                    </i>Delete</Button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="container-fluid">
                                                    <div className="row row_sne">

                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="row" style={{ marginBottom: "15px" }}>
                                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                                           <div className="top_value">Email Id</div>
                                                            <div className="bottom_value_agent">{v1.agent_email}</div>
                                                          {/* <div className="new_i_paddd new_i_paddd_for_mobile" style={{ width: "82px", whiteSpace: "nowrap" }}>Email Id</div>:
                                                          <span style={{ marginLeft: "11px" }}>{v1.agent_email}</span> */}
                                                        </div>

                                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                                            <div className="top_value">Mobile Number</div>
                                                            <div className="bottom_value_agent">{v1.agent_phone}</div>
                                                          {/* <div className="new_i_paddd_1 new_i_paddd_for_mobile" style={{ width: "82px", whiteSpace: "nowrap" }}>Mobile no.</div>:
                                                          <span style={{ marginLeft: "11px" }}>{v1.agent_phone}</span> */}
                                                        </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12 mt-10">
                                                        <div className="top_value">Type</div>
                                                            <div className="bottom_value_agent">{v1.type}</div>
                                                          {/* <div className="new_i_paddd" style={{ width: "140px", whiteSpace: "nowrap" }}>Type</div>:
                                                          <span style={{ marginLeft: "11px",textTransform: "capitalize" }}>{v1.type}</span> */}
                                                        </div>



                                                        <div className="col-lg-6 col-md-12 col-sm-12 mt-10" style={{display:v1.agent_percent == "" ? "none" : "block"}}>
                                                            <div className="top_value">Percentage</div>
                                                            <div className="bottom_value_agent">{v1.agent_percent ? v1.agent_percent + "%" : ""}</div>
                                                          {/* <div className="new_i_paddd_1 new_i_paddd_for_mobile" style={{ width: "82px", whiteSpace: "nowrap" }}>Percentage</div>:
                                                          <span style={{ marginLeft: "11px" }}>{v1.agent_percent ? v1.agent_percent + "%" : ""}</span> */}
                                                        </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12 mt-10">
                                                           <div className="top_value">Address</div>
                                                            <div className="bottom_value_agent">{v1.agent_address}</div>
                                                          {/* <div className="new_i_paddd new_i_paddd_for_mobile" style={{ width: "82px", whiteSpace: "nowrap" }}>Address</div>:
                                                          <span style={{ marginLeft: "11px" }}>{v1.agent_address}</span> */}
                                                        </div>


                                                        <div className="col-lg-6 col-md-12 col-sm-12 mt-10" style={{display:v1.emp_relationship == "" ? "none" : "block"}}>
                                                        <div className="top_value">Relationship Manager</div>
                                                            <div className="bottom_value_agent">{v1.emp_relationship ? v1.emp_relationship.label :""}</div>
                                                          {/* <div style={{ width: "140px", whiteSpace: "nowrap" }}>Relationship Manager</div>:
                                                          <span style={{ marginLeft: "11px" }}>{v1.emp_relationship ? v1.emp_relationship.label :""}</span> */}
                                                        </div>



                                                        </div>
                                                        </div>
                                                    </div>
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
