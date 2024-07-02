/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import './style.scss';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';

import {
  Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody,Tooltip,UncontrolledTooltip, ModalFooter,Label,CustomInput
} from 'reactstrap';
import Icon from '../../components/icon';

import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import {
  addToast as actionAddToast,
} from '../../actions';
// import Select from 'react-select';


const device_width =   window.innerWidth;
var height =   window.innerHeight;
////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
////////console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}


/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */

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
           <label className="props_labkell">{props.label}</label>
         </components.Option>
       </div>
     );
   };


class Content extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalOpen_for_label: false,
        heading_array:[],
        excel_field_array:[],
        contact_field_array:[],
        blank_message:"",
        time_in_min:"",
        time_errorrr:"",
        beaek_reason:"",
        break_reason_error:"",
        fetch_break_reason:"",
        array_for_reason_break:[],
        AlertDelete:false,
        button_for_reason_break:"Save",

        add_lead_stage:"",
        lead_stage_error:"",
        button_for_lead_stage:"Save",
        LeadAlertDelete:false,
        lead_stage_array:[],

        add_tag:"",
        tag_error:"",
        button_for_tag:"Save",
        TagAlertDelete:false,
        tag_array:[],

        add_priority:"",
        priority_error:"",
        priority_id:"",
        button_for_priority:"Save",
        PriorityAlertDelete:false,
        priority_array:[],

        add_campaigne_type:"",
        campaigne_error:"",
        button_for_campaigne:"Save",
        CampaigneAlertDelete:false,
        campaigne_array:[],

        is_enable_dot_not:false,
        retry_after_dot_not:"",
        max_retries_dot_not:"",
        interval_dot_not:"",


        is_enable_user_not:false,
        retry_after_user_not:"",
        max_retries_user_not:"",
        interval_user_not:"",

        is_enable_out_of:false,
        retry_after_out_of:"",
        max_retries_out_of:"",
        interval_out_of:"",

        is_enable_busy_another:false,
        retry_after_busy_another:"",
        max_retries_busy_another:"",
        interval_busy_another:"",

        is_enable_switch_off:false,
        retry_after_switch_off:"",
        max_retries_switch_off:"",
        interval_switch_off:"",

        is_enable_call_not_conn:false,
        retry_after_call_not_conn:"",
        max_retries_call_not_conn:"",
        interval_call_not_conn:"",

        is_enable_incorrect_inval:false,
        retry_after_incorrect_inval:"",
        max_retries_incorrect_inval:"",
        interval_incorrect_inval:"",


        is_enable_number_not_in:false,
        retry_after_number_not_in:"",
        max_retries_number_not_in:"",
        interval_number_not_in:"",

        
      }
      this.fetch_contact_excel_field()
      this.get_contact_excel_field_from_mis()
      this.fetch_break_notification()
      this.fetch_break_reason()
      this.fetch_lead_stage()
      this.fetch_tag()
      this.fetch_priority()
      this.fetch_campaigne_type()
      this.fetch_telecaller_call_setting()
      this.AlertDelete = this.AlertDelete.bind( this );
      this.LeadAlertDelete = this.LeadAlertDelete.bind( this );
      this.TagAlertDelete = this.TagAlertDelete.bind( this );
      this.PriorityAlertDelete = this.PriorityAlertDelete.bind( this );
      this.CampaigneAlertDelete = this.CampaigneAlertDelete.bind( this );
      this.toggle_for_label = this.toggle_for_label.bind( this );
    }

    AlertDelete() {
      this.setState((prevState) => ({
        AlertDelete: !prevState.AlertDelete,
        beaek_reason:"",
        button_for_reason_break:"Save"
      }));
    }


    LeadAlertDelete() {
      this.setState((prevState) => ({
        LeadAlertDelete: !prevState.LeadAlertDelete,
        add_lead_stage:"",
        lead_stage_error:"",
        button_for_lead_stage:"Save",
      }));
    }


    TagAlertDelete() {
      this.setState((prevState) => ({
        TagAlertDelete: !prevState.TagAlertDelete,
        add_tag:"",
        tag_error:"",
        button_for_tag:"Save",
      }));
    }




    CampaigneAlertDelete() {
      this.setState((prevState) => ({
        CampaigneAlertDelete: !prevState.CampaigneAlertDelete,
        add_campaigne_type:"",
        campaigne_error:"",
        button_for_campaigne:"Save",
      }));
    }



    PriorityAlertDelete() {
      this.setState((prevState) => ({
        PriorityAlertDelete: !prevState.PriorityAlertDelete,
        add_priority:"",
        priority_error:"",
        button_for_priority:"Save",
      }));
    }


    toggle_for_label() {
      this.setState( ( prevState ) => ( {
          modalOpen_for_label: ! prevState.modalOpen_for_label,
          excel_field_type:"",
      } ) );
  }

  fetch_contact_excel_field = ()=>  {
     const { settings } = this.props;
      const res = fetch(settings.api_url + "fetch_contact_excel_field", {
          method: 'POST',
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Fetch Excel Feilds ****", json)
              var data = json;
              if (data.status == true) {
                  this.setState({
                      contact_field_array: data.data[0].field_data,
                      heading_array: data.data[0].field_data,
                  });
              }
              else {
                  this.setState({
                      contact_field_array: [],
                      heading_array: [],
                  });
              }
          })
  }
  get_contact_excel_field_from_mis = ()=>  {
     const { settings } = this.props;
      const res = fetch(settings.api_url + "get_contact_excel_field_from_mis", {
          method: 'POST',
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Get Excel Feilds ****", json)
              var data = json;
              if (data.status == true) {
                  this.setState({
                      excel_field_array: data.data,
                  });
              }
              else {
                  this.setState({
                      excel_field_array: [],

                  });
              }
          })
  }

  add_contact_excel_field() {
    console.log("All Goood");
    const {
        addToast,settings
    } = this.props;

    var params = {
      field_data:this.state.heading_array,
    }
    console.log("params************",params);
    if (params.field_data == "" || params.field_data == undefined) {
      this.setState({
        blank_message:"Please Select Feilds"
      })
    }else {
      const res = fetch(settings.api_url + "add_contact_excel_field", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Contact Excel **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  modalOpen_for_label:false,
                  blank_message:"",
                  // heading_array:[],
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                    this.fetch_contact_excel_field()
              }
              else {
                this.setState({
                  modalOpen_for_label:true,
                  blank_message:data["message"]
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
         }

          }



  add_break_notification() {
    console.log("All Goood");
    const {
        addToast,settings
    } = this.props;

    var params = {
      time:this.state.time_in_min,
    }
    console.log("Add params************",params);
    if (params.time == "" || params.time == undefined) {
      this.setState({
        time_errorrr:"Please Select Feilds"
      })
    }else {
      const res = fetch(settings.api_url + "api/telecaller_app/add_break_notification", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Add Break Notification **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  time_errorrr:"",
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                    // this.fetch_contact_excel_field()
              }
              else {
                this.setState({
                  time_errorrr:data["message"]
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
         }

     }

     fetch_break_notification = ()=>  {
      const { settings } = this.props;
       const res = fetch(settings.api_url + "api/telecaller_app/fetch_break_notification", {
           method: 'POST',
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               console.log("Fetch_Beak_API ***************", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                    time_in_min: data.data[0].time,
                   });
               }
               else {
                   this.setState({
                    time_in_min: "",
                   });
               }
           })
        }
        switch_function_to_add_tags = ()=>{
          if (this.state.button_for_reason_break == "Save") {
              this.add_break_reason()
          }else{
              this.update_break_reason()
          }
       }


  add_break_reason() {
    console.log("All Addd");
    const {
        addToast,settings
    } = this.props;

    var params = {
      reason_name:this.state.beaek_reason,
    }
    console.log("Add params************",params);
    if (params.reason_name == "" || params.reason_name == undefined) {
      this.setState({
        break_reason_error:"Please Select Feilds"
      })
    }else {
      const res = fetch(settings.api_url + "api/telecaller_app/add_break_reason", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Add Break Reason **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  break_reason_error:"",
                  beaek_reason:"",
                  button_for_reason_break:"Save"
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                    this.fetch_break_reason()
              }
              else {
                this.setState({
                  break_reason_error:data["message"]
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
         }

     }


  update_break_reason() {
    console.log("All Update");
    const {
        addToast,settings
    } = this.props;

    var params = {
      reason_name:this.state.beaek_reason,
      break_reason_id:this.state.break_reason_id,
    }
    console.log("Update params************",params);
    if (params.reason_name == "" || params.reason_name == undefined) {
      this.setState({
        break_reason_error:"Please Select Feilds"
      })
    }else {
      const res = fetch(settings.api_url + "api/telecaller_app/update_break_reason", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Update Break Reason **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  break_reason_error:"",
                  beaek_reason:"",
                  button_for_reason_break:"Save"
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                    this.fetch_break_reason()
              }
              else {
                this.setState({
                  break_reason_error:data["message"]
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
         }

     }

     fetch_break_reason = ()=>  {
      const { settings } = this.props;
       const res = fetch(settings.api_url + "api/telecaller_app/fetch_break_reason", {
           method: 'POST',
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               console.log("Fetch_Beak_Reason ***************", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                    array_for_reason_break: data.data,
                   });
               }
               else {
                   this.setState({
                    array_for_reason_break: "",
                   });
               }
           })
        }

        delete_break_reason = (id) => {
          const { settings, addToast, } = this.props;
          var params = {
            break_reason_id: id
          }
          console.log("Pramsss",params);
          const res = fetch(settings.api_url + "api/telecaller_app/delete_break_reason", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
          }).then((response) => response.json())
          .then(json => {
           console.log("Delete Reasonnn Response**************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
              this.setState((prevState) => ({
                  AlertDelete: !prevState.AlertDelete,
                  beaek_reason:"",
                  break_reason_error:"",
                  button_for_reason_break:"Save"
              }));
              this.fetch_break_reason();
              addToast({
                  title: 'Book Your Insurance',
                  content: data["message"],
                  duration: 1000,
              });
              }
              else {
              addToast({
                  title: 'Book Your Insurance',
                  content: data["message"],
                  duration: 1000,
              });
              this.setState((prevState) => ({
                  AlertDelete: !prevState.AlertDelete,
                  beaek_reason:"",
                  break_reason_error:"",
                  button_for_reason_break:"Save"
              }));
              }
          })
      }

      fetch_lead_stage = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/fetch_lead_stage", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch_Lead stage ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      lead_stage_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      lead_stage_array: "",
                     });
                 }
             })
          }

          switch_for_lead = ()=>{
            if (this.state.button_for_lead_stage == "Save") {
                this.add_lead_stage()
            }else{
                this.update_lead_stage()
            }
         }
  
  
    add_lead_stage() {
      console.log("All Addd");
      const {
          addToast,settings
      } = this.props;
  
      var params = {
        stage_name:this.state.add_lead_stage,
      }
      console.log("Add params************",params);
      if (params.stage_name == "" || params.stage_name == undefined) {
        this.setState({
          lead_stage_error:"Please Select Feilds"
        })
      }else {
        const res = fetch(settings.api_url + "api/telecaller_app/add_lead_stage", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Add Lead Satge **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                  this.setState({
                    add_lead_stage:"",
                    lead_stage_error:"",
                    button_for_lead_stage:"Save",
                  })
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                      this.fetch_lead_stage()
                }
                else {
                  this.setState({
                    lead_stage_error:data["message"]
                  })
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                }
            })
           }
  
       }
  
  
    update_lead_stage() {
      console.log("All Update");
      const {
          addToast,settings
      } = this.props;
  
      var params = {
        stage_name:this.state.add_lead_stage,
        lead_stage_id:this.state.lead_stage_id,
      }
      console.log("Update params************",params);
      if (params.stage_name == "" || params.stage_name == undefined) {
        this.setState({
          lead_stage_error:"Please Select Feilds"
        })
      }else {
        const res = fetch(settings.api_url + "api/telecaller_app/update_lead_stage", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Update Lead Satge **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                  this.setState({
                    add_lead_stage:"",
                    lead_stage_error:"",
                    button_for_lead_stage:"Save",
                  })
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                      this.fetch_lead_stage()
                }
                else {
                  this.setState({
                    lead_stage_error:data["message"]
                  })
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                }
            })
           }
  
       }

       delete_lead_stage = (id) => {
        const { settings, addToast, } = this.props;
        var params = {
          lead_stage_id: id
        }
        console.log("Pramsss",params);
        const res = fetch(settings.api_url + "api/telecaller_app/delete_lead_stage", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
        }).then((response) => response.json())
        .then(json => {
         console.log("Delete Reasonnn Response**************************************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
            this.setState((prevState) => ({
                LeadAlertDelete: !prevState.LeadAlertDelete,
                add_lead_stage:"",
                lead_stage_error:"",
                button_for_lead_stage:"Save",
            }));
            this.fetch_lead_stage();
            addToast({
                title: 'Book Your Insurance',
                content: data["message"],
                duration: 1000,
            });
            }
            else {
            addToast({
                title: 'Book Your Insurance',
                content: data["message"],
                duration: 1000,
            });
            this.setState((prevState) => ({
                LeadAlertDelete: !prevState.LeadAlertDelete,
                add_lead_stage:"",
                lead_stage_error:"",
                button_for_lead_stage:"Save",
            }));
            }
        })
    }

    fetch_tag = ()=>  {
      const { settings } = this.props;
       const res = fetch(settings.api_url + "api/telecaller_app/fetch_tag", {
           method: 'POST',
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               console.log("Fetch_TaGs ***************", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                    tag_array: data.data,
                   });
               }
               else {
                   this.setState({
                    tag_array: [],
                   });
               }
           })
        }


        switch_for_tag = ()=>{
          if (this.state.button_for_tag == "Save") {
              this.add_tag()
          }else{
              this.update_tag()
          }
       }


    add_tag() {
    console.log("All Addd");
    const {
        addToast,settings
    } = this.props;

    var params = {
      tag_name:this.state.add_tag,
    }
    console.log("Add params************",params);
    if (params.tag_name == "" || params.tag_name == undefined) {
      this.setState({
        tag_error:"Please Select Feilds"
      })
    }else {
      const res = fetch(settings.api_url + "api/telecaller_app/add_tag", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Add Tagsss **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  add_tag:"",
                  tag_error:"",
                  button_for_tag:"Save",
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                    this.fetch_tag()
              }
              else {
                this.setState({
                  tag_error:data["message"]
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
         }

     }


     update_tag() {
    console.log("All Update");
    const {
        addToast,settings
    } = this.props;

    var params = {
      tag_name:this.state.add_tag,
      tag_id:this.state.tag_id,
    }
    console.log("Update params************",params);
    if (params.tag_name == "" || params.tag_name == undefined) {
      this.setState({
        tag_error:"Please Select Feilds"
      })
    }else {
      const res = fetch(settings.api_url + "api/telecaller_app/update_tag", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              console.log("Update Lead Satge **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  add_tag:"",
                  tag_error:"",
                  button_for_tag:"Save",
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                    this.fetch_tag()
              }
              else {
                this.setState({
                  tag_error:data["message"]
                })
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
         }

     }

     delete_tag = (id) => {
      const { settings, addToast, } = this.props;
      var params = {
        tag_id: id
      }
      console.log("Pramsss",params);
      const res = fetch(settings.api_url + "api/telecaller_app/delete_tag", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
      }
      }).then((response) => response.json())
      .then(json => {
       console.log("Delete Tagsssss**************************************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
          this.setState((prevState) => ({
            TagAlertDelete: !prevState.TagAlertDelete,
            add_tag:"",
            tag_error:"",
            button_for_tag:"Save",
          }));
          this.fetch_tag();
          addToast({
              title: 'Book Your Insurance',
              content: data["message"],
              duration: 1000,
          });
          }
          else {
          addToast({
              title: 'Book Your Insurance',
              content: data["message"],
              duration: 1000,
          });
          this.setState((prevState) => ({
            TagAlertDelete: !prevState.TagAlertDelete,
            add_tag:"",
            tag_error:"",
            button_for_tag:"Save",
          }));
          }
      })
  }

        fetch_priority = ()=>  {
          const { settings } = this.props;
           const res = fetch(settings.api_url + "api/telecaller_app/fetch_priority", {
               method: 'POST',
               headers: {
                   "Content-type": "application/json; charset=UTF-8",
               }
           }).then((response) => response.json())
               .then(json => {
                   console.log("Fetch Priority ***************", json)
                   var data = json;
                   if (data.status == true) {
                       this.setState({
                        priority_array: data.data,
                       });
                   }
                   else {
                       this.setState({
                        priority_array: [],
                       });
                   }
               })
            }


            switch_for_priority = ()=>{
              if (this.state.button_for_priority == "Save") {
                  this.add_priority()
              }else{
                  this.update_priority()
              }
           }
    
    
      add_priority() {
        console.log("All Addd");
        const {
            addToast,settings
        } = this.props;
    
        var params = {
          priority_name:this.state.add_priority,
        }
        console.log("Add params************",params);
        if (params.priority_name == "" || params.priority_name == undefined) {
          this.setState({
            priority_error:"Please Select Feilds"
          })
        }else {
          const res = fetch(settings.api_url + "api/telecaller_app/add_priority", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("Add add_priority **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                    this.setState({
                      add_priority:"",
                      priority_error:"",
                      button_for_priority:"Save",
                    })
                      addToast({
                          title: 'Book Your Insurance',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                        this.fetch_priority()
                  }
                  else {
                    this.setState({
                      priority_error:data["message"]
                    })
                      addToast({
                          title: 'Book Your Insurance',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
             }
    
         }
    
    
      update_priority() {
        console.log("All Update");
        const {
            addToast,settings
        } = this.props;
    
        var params = {
          priority_name:this.state.add_priority,
          priority_id:this.state.priority_id,
        }
        console.log("Update params************",params);
        if (params.priority_name == "" || params.priority_name == undefined) {
          this.setState({
            priority_error:"Please Select Feilds"
          })
        }else {
          const res = fetch(settings.api_url + "api/telecaller_app/update_priority", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("Update update_priority**************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                    this.setState({
                      add_priority:"",
                      priority_error:"",
                      button_for_priority:"Save",
                    })
                      addToast({
                          title: 'Book Your Insurance',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                        this.fetch_priority()
                  }
                  else {
                    this.setState({
                      priority_error:data["message"],
                      add_priority:"",
                      button_for_priority:"Save",
                    })
                      addToast({
                          title: 'Book Your Insurance',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
             }
    
         }
  
         delete_priority = (id) => {
          const { settings, addToast, } = this.props;
          var params = {
            priority_id: id
          }
          console.log("Pramsss",params);
          const res = fetch(settings.api_url + "api/telecaller_app/delete_priority", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
          }).then((response) => response.json())
          .then(json => {
           console.log("Delete delete_priority**************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
              this.setState((prevState) => ({
                PriorityAlertDelete: !prevState.PriorityAlertDelete,
                add_priority:"",
                priority_error:"",
                button_for_priority:"Save",
              }));
              this.fetch_priority();
              addToast({
                  title: 'Book Your Insurance',
                  content: data["message"],
                  duration: 1000,
              });
              }
              else {
              addToast({
                  title: 'Book Your Insurance',
                  content: data["message"],
                  duration: 1000,
              });
              this.setState((prevState) => ({
                PriorityAlertDelete: !prevState.PriorityAlertDelete,
                add_priority:"",
                priority_error:"",
                button_for_priority:"Save",
              }));
              }
          })
      }

            fetch_campaigne_type = ()=>  {
              const { settings } = this.props;
               const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaigne_type", {
                   method: 'POST',
                   headers: {
                       "Content-type": "application/json; charset=UTF-8",
                   }
               }).then((response) => response.json())
                   .then(json => {
                       console.log("Fetch_Campaign ***************", json)
                       var data = json;
                       if (data.status == true) {
                           this.setState({
                            campaigne_array: data.data,
                           });
                       }
                       else {
                           this.setState({
                            campaigne_array: [],
                           });
                       }
                   })
                }


                switch_for_campaigne = ()=>{
                  if (this.state.button_for_campaigne == "Save") {
                      this.add_campaigne_type()
                  }else{
                      this.update_campaigne_type()
                  }
               }
        
        
          add_campaigne_type() {
            console.log("All Addd");
            const {
                addToast,settings
            } = this.props;
        
            var params = {
              campaigne_type_name:this.state.add_campaigne_type,
            }
            console.log("Add params************",params);
            if (params.campaigne_type_name == "" || params.campaigne_type_name == undefined) {
              this.setState({
                campaigne_error:"Please Select Feilds"
              })
            }else {
              const res = fetch(settings.api_url + "api/telecaller_app/add_campaigne_type", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Add Camppppp **************************************", { params: params, response: json })
                      var data = json;
                      if (data.status == true) {
                        this.setState({
                          add_campaigne_type:"",
                          campaigne_error:"",
                          button_for_campaigne:"Save",
                        })
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                            this.fetch_campaigne_type()
                      }
                      else {
                        this.setState({
                          campaigne_error:data["message"]
                        })
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                      }
                  })
                 }
        
             }
        
        
          update_campaigne_type() {
            console.log("All Update");
            const {
                addToast,settings
            } = this.props;
        
            var params = {
              campaigne_type_name:this.state.add_campaigne_type,
              campaigne_type_id:this.state.campaigne_type_id,
            }
            console.log("Update params************",params);
            if (params.campaigne_type_name == "" || params.campaigne_type_name == undefined) {
              this.setState({
                campaigne_error:"Please Select Feilds"
              })
            }else {
              const res = fetch(settings.api_url + "api/telecaller_app/update_campaigne_type", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Update Cammmmm **************************************", { params: params, response: json })
                      var data = json;
                      if (data.status == true) {
                        this.setState({
                          add_campaigne_type:"",
                          campaigne_error:"",
                          button_for_campaigne:"Save",
                        })
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                            this.fetch_campaigne_type()
                      }
                      else {
                        this.setState({
                          add_campaigne_type:"",
                          campaigne_error:"",
                          button_for_campaigne:"Save",
                        })
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                      }
                  })
                 }
        
             }
      
             delete_campaigne_type = (id) => {
              const { settings, addToast, } = this.props;
              var params = {
                campaigne_type_id: id
              }
              console.log("Pramsss",params);
              const res = fetch(settings.api_url + "api/telecaller_app/delete_campaigne_type", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
              }).then((response) => response.json())
              .then(json => {
               console.log("Delete campaigne_type_id**************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                  this.setState((prevState) => ({
                    CampaigneAlertDelete: !prevState.CampaigneAlertDelete,
                    add_campaigne_type:"",
                    campaigne_error:"",
                    button_for_campaigne:"Save",
                  }));
                  this.fetch_lead_stage();
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      duration: 1000,
                  });
                  }
                  else {
                  addToast({
                      title: 'Book Your Insurance',
                      content: data["message"],
                      duration: 1000,
                  });
                  this.setState((prevState) => ({
                    CampaigneAlertDelete: !prevState.CampaigneAlertDelete,
                    add_campaigne_type:"",
                    campaigne_error:"",
                    button_for_campaigne:"Save",
                  }));
                  }
              })
          }

          fetch_telecaller_call_setting = ()=>  {
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_telecaller_call_setting", {
                 method: 'POST',
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch_Call_Seting ***************", json)
                     var data = json;
                     if (data.status == true) {

                         this.setState({
                          is_enable_dot_not:data.data[0].is_enable,
                          retry_after_dot_not:data.data[0].retry_after,
                          max_retries_dot_not:data.data[0].max_retries,
                          interval_dot_not:data.data[0].interval,
                          
                          is_enable_user_not:data.data[1].is_enable,
                          retry_after_user_not:data.data[1].retry_after,
                          max_retries_user_not:data.data[1].max_retries,
                          interval_user_not:data.data[1].interval,

                          is_enable_out_of:data.data[2].is_enable,
                          retry_after_out_of:data.data[2].retry_after,
                          max_retries_out_of:data.data[2].max_retries,
                          interval_out_of:data.data[2].interval,

                          is_enable_busy_another:data.data[3].is_enable,
                          retry_after_busy_another:data.data[3].retry_after,
                          max_retries_busy_another:data.data[3].max_retries,
                          interval_busy_another:data.data[3].interval,

                          is_enable_switch_off:data.data[4].is_enable,
                          retry_after_switch_off:data.data[4].retry_after,
                          max_retries_switch_off:data.data[4].max_retries,
                          interval_switch_off:data.data[4].interval,

                          is_enable_call_not_conn:data.data[5].is_enable,
                          retry_after_call_not_conn:data.data[5].retry_after,
                          max_retries_call_not_conn:data.data[5].max_retries,
                          interval_call_not_conn:data.data[5].interval,

                          is_enable_incorrect_inval:data.data[6].is_enable,
                          retry_after_incorrect_inval:data.data[6].retry_after,
                          max_retries_incorrect_inval:data.data[6].max_retries,
                          interval_incorrect_inval:data.data[6].interval,

                          is_enable_number_not_in:data.data[7].is_enable,
                          retry_after_number_not_in:data.data[7].retry_after,
                          max_retries_number_not_in:data.data[7].max_retries,
                          interval_number_not_in:data.data[7].interval,





                         });
                     }
                     else {
                         this.setState({
                          campaigne_array: [],
                         });
                     }
                 })
              }

          

          add_telecaller_call_setting(input_data,call_setting_name,show_name,type) {
            console.log("All Teli");
            const {
                addToast,settings
            } = this.props;

            if (type=="retry_after") {
              var retry_after = input_data
              var interval = ""
              var max_retries = ""
              var is_enable = ""
            }else if (type=="interval") {
              var retry_after =""
              var interval = input_data
              var max_retries = ""
              var is_enable = ""
            }else if (type=="max_retries") {
              var retry_after = ""
              var interval = ""
              var max_retries = input_data
              var is_enable = ""
            }else if (type=="is_enable") {
              var retry_after = ""
              var interval = ""
              var max_retries = ""
              var is_enable = input_data
            }

        
            var params = {
              call_setting_name:call_setting_name,
              show_name:show_name,
              retry_after:retry_after,
              interval:interval,
              max_retries:max_retries,
              is_enable:is_enable,
              type:type,
            }
            console.log("Add Teliiii params************",params);
              const res = fetch(settings.api_url + "api/telecaller_app/add_telecaller_call_setting", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Add Call Setting **************************************", { params: params, response: json })
                      var data = json;
                      if (data.status == true) {
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });

                          this.fetch_telecaller_call_setting()
                      }
                      else {
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                      }
                  })
                //  }
        
             }
  

          select_heading = (value) => {
            var heading_array = this.state.heading_array
            var new_head ={
              value:value.value,
              label:value.label,
              new_header_excel_key:value.new_header_excel_key,
              color:value.randomColor,
            }
            heading_array.push(new_head)
            console.log("heading_array*************",heading_array);
            this.setState({
              heading_array:heading_array
            })
          }


          delete_heading = (value) => {
            var heading_array = this.state.heading_array.filter(n => n !== value);
            this.setState({
              heading_array: heading_array,
              excel_field_type:""
            })
            console.log("heading_array*************",heading_array);
            this.setState({
              heading_array:heading_array
            })
          }


          handleChange = (selected) => {
              console.log("sele",selected);
              this.setState({
                optionSelected: selected
              });
            };
    render() {
        const colorOptions = [
            { value: 'blue', label: 'Blue' },
            { value: 'ocean', label: 'Ocean' },
            { value: 'red', label: 'Red' },
            { value: 'yellow', label: 'Yellow' },
            { value: 'purple', label: 'Purple' },
            { value: 'orange', label: 'Orange' },
            { value: 'green', label: 'Green' },
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
            menuPortal: provided => ({ ...provided, zIndex: 5 }),
            option: ( css, state ) => {
                // //console.log("cs============",css);
                let bgc = '';
                let color = '';

                if ( state.isSelected ) {
                    bgc = '#8bc240';
                    color = '#fff';
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

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var excel_field_array = this.state.excel_field_array.map(item => {
          return {
              value: item.value,
              label: item.label,
              new_header_excel_key: item.new_header_excel_key,
              randomColor:"#"+randomColor
          }
      });

      var intervals_data = [
        {value:"1",label:"Hours"},
        {value:"2",label:"Days"},
      ]


        return (
            <Fragment>
            <PageTitle className = "tele_haeding">
            <div className="row">
              <div className="col-lg-6 col-md-8 col-sm-12">
                <h1 style={{marginTop:"-1px"}}>Telecalling</h1>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-12" style={{textAlign:"end",textTransform: "capitalize"}}>
                {/* <Button color="warning" style={{color:"#fff",textTransform:"capitalize"}} onClick={this.toggle_for_label}>{this.state.contact_field_array == "" || this.state.contact_field_array == undefined ? "Add" :"Update"} Contact Fields</Button> */}
              </div>
             </div>
            </PageTitle>


            <div className="show_excel_feilds heading_opeartion mycalendar" style={{height:my_height-67}}>
               <div className="show_tagsss box_data_neww">
                 <div className="update_button">
                 <h1 style={{marginTop: "0px",marginBottom:"10px"}}>Contact Fields</h1>
                <Button color="warning" style={{color:"#fff",textTransform:"capitalize"}} onClick={this.toggle_for_label}>{this.state.contact_field_array == "" || this.state.contact_field_array == undefined ? "Add" :"Update"} Contact Fields</Button>

                 </div>
                {this.state.contact_field_array.map((value,index)=>{
                   return(
                     <Badge key = {index} className="current_bag_new" style={{backgroundColor:value.color,color:"#fff"}} color="brand" pill> {value.label}</Badge>
                   )
                 })}
                </div>




               <div className="show_tagsss box_data_neww">
                   <div className="timing_new test_collapse">
                        <div className="row ">
                            <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                            <h1 style={{marginTop: "0px",marginBottom:"10px"}}>General Setting</h1>
                            </div>
                        </div>

                        <div className="row">
                        <div className="col-lg-6 col-md-6 boxxx_neww right_show">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 disPlay">
                            <h3 style={{marginBottom:"0px",marginTop:"16px"}}>Break Notification</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 disPlay padd_right" style={{marginTop:"4px",paddingRight:"0px"}}>
                            {/* <Label className="ballllllll" for="amountrec">Time in mins<span className="start_mark">*</span></Label> */}
                            <Input type="number"  name="win_percentage" id="winPre" placeholder="Time in mins"
                                value={this.state.time_in_min}
                                onChange={(e) => {
                                this.setState({
                                  time_in_min:e.target.value,
                                  time_errorrr:""
                                })
                                }}  />
                                <p style={{color:"red", marginTop:"5px"}}>{this.state.time_errorrr}
                            </p>
                            </div>
                          
                            <div className="col-lg-6 col-md-6 my_save" style={{paddingLeft:"10px"}}>
                            <Button className="buttonAlll"  color="warning" style={{color:"#fff"}} onClick={()=>this.add_break_notification()}>Save</Button>
                            </div>
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-md-6">
                      </div> */}
                        <div className="col-lg-6 col-md-6 boxxx_neww " style={{marginTop:"20px"}}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 disPlay">
                            <h3 style={{marginBottom:"0px",marginTop:"16px"}}>Break Reason</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 disPlay padd_right" style={{marginTop:"4px"}}>
                            {/* <Label className="ballllllll" for="amountrec">Reason<span className="start_mark">*</span></Label> */}
                            <Input type="text"  name="win_percentage" id="winPre" placeholder="Reason"
                                value={this.state.beaek_reason}
                                onChange={(e) => {
                                this.setState({
                                  beaek_reason:e.target.value,
                                  break_reason_error:""
                                })
                                }}  />
                                <p style={{color:"red", marginTop:"5px"}}>{this.state.break_reason_error}</p>
                            </div>
                          
                            <div className="col-lg-6 col-md-6 my_save">
                            <Button  color="warning" style={{color:"#fff"}} className="buttonAlll" onClick={()=>this.switch_function_to_add_tags()}>{this.state.button_for_reason_break}</Button>
                            </div>
                            <div className="col-lg-12 col-md-12 " style={{paddingRight:"30px"}}>


                            <div className="show_tagsss slot_new_new_123" >
                                  {this.state.array_for_reason_break.map((value,index)=>{
                                      return(
                                          // <div className="" >
                                          <Badge key = {index} className="current_bag_breakk" style={{backgroundColor:"#"+value.color,color:"#fff"}} color="brand" onClick={()=>{
                                              this.setState({
                                                beaek_reason:value.reason_name,
                                                break_reason_id:value._id,
                                                button_for_reason_break: "Update"
                                              })
                                          }} pill> {value.reason_name}
                                          <Button className="close close_tagsss_reason" color=""  onClick={()=>{
                                            this.setState({
                                              AlertDelete:true,
                                              break_reason_id:value._id,
                                              beaek_reason:"",
                                              button_for_reason_break:"Save"
                                              })
                                        }}> <Icon name="x" />
                                              </Button>
                                            </Badge>
                                      //   </div>
                                      )
                                  })}
                      
                                  </div>


                            </div>
                            <div className="col-lg-12 col-md-12 ">
                            {/* <p style={{color:"red", marginTop:"5px"}}>{this.state.break_reason_error}
                            </p> */}
                            </div>
                        </div>
                      </div>



                      {/* Lead Stageee */}
                        <div className="col-lg-6 col-md-6 boxxx_neww  right_show" style={{marginTop:"20px"}}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 disPlay">
                            <h3 style={{marginBottom:"0px",marginTop:"16px"}}>Lead Stage</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 disPlay padd_right" style={{marginTop:"4px"}}>
                            {/* <Label className="ballllllll" for="amountrec">Reason<span className="start_mark">*</span></Label> */}
                            <Input type="text"  name="lead" id="lead" placeholder="Lead Stage"
                                value={this.state.add_lead_stage}
                                onChange={(e) => {
                                this.setState({
                                  add_lead_stage:e.target.value,
                                  lead_stage_error:""
                                })
                                }}  />
                                <p style={{color:"red", marginTop:"5px"}}>{this.state.lead_stage_error}
                            </p>
                            </div>
                          
                            <div className="col-lg-6 col-md-6 my_save">
                            <Button  color="warning" style={{color:"#fff"}} className="buttonAlll" onClick={()=>this.switch_for_lead()}>{this.state.button_for_lead_stage}</Button>
                            </div>
                            <div className="col-lg-12 col-md-12 " style={{paddingRight:"30px"}}>
                            <div className="show_tagsss slot_new_new_123" >
                                  {this.state.lead_stage_array.map((value,index)=>{
                                      return(
                                          // <div className="" >
                                          <Badge key = {index} className="current_bag_breakk" style={{backgroundColor:"#"+value.color,color:"#fff"}} color="brand" onClick={()=>{
                                              this.setState({
                                                add_lead_stage:value.stage_name,
                                                lead_stage_id:value._id,
                                                button_for_lead_stage: "Update"
                                              })
                                          }} pill> {value.stage_name}
                                          <Button className="close close_tagsss_reason" color=""  onClick={()=>{
                                            this.setState({
                                              LeadAlertDelete:true,
                                              lead_stage_id:value._id,
                                              add_lead_stage:"",
                                              button_for_lead_stage:"Save"
                                              })
                                        }}> <Icon name="x" />
                                              </Button>
                                            </Badge>
                                      //   </div>
                                      )
                                  })}
                      
                                  </div>
                            </div>
                        </div>
                      </div>



                      {/* Tagsssss */}
                        <div className="col-lg-6 col-md-6 boxxx_neww " style={{marginTop:"20px"}}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 disPlay">
                            <h3 style={{marginBottom:"0px",marginTop:"16px"}}>Tags</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 disPlay" style={{marginTop:"4px"}}>
                            <Input type="text"  name="lead" id="lead" placeholder="Add Tags"
                                value={this.state.add_tag}
                                onChange={(e) => {
                                this.setState({
                                  add_tag:e.target.value,
                                  tag_error:""
                                })
                                }}  />
                                <p style={{color:"red", marginTop:"5px"}}>{this.state.tag_error}
                            </p>
                            </div>
                          
                            <div className="col-lg-6 col-md-6 my_save">
                            <Button  color="warning" style={{color:"#fff"}} className="buttonAlll" onClick={()=>this.switch_for_tag()}>{this.state.button_for_tag}</Button>
                            </div>
                            <div className="col-lg-12 col-md-12 " style={{paddingRight:"30px"}}>
                            <div className="show_tagsss slot_new_new_123" >
                                  {this.state.tag_array.map((value,index)=>{
                                      return(
                                          // <div className="" >
                                          <Badge key = {index} className="current_bag_breakk" style={{backgroundColor:"#"+value.color,color:"#fff"}} color="brand" onClick={()=>{
                                              this.setState({
                                                add_tag:value.tag_name,
                                                tag_id:value._id,
                                                button_for_tag: "Update"
                                              })
                                          }} pill> {value.tag_name}
                                          <Button className="close close_tagsss_reason" color=""  onClick={()=>{
                                            this.setState({
                                              TagAlertDelete:true,
                                              tag_id:value._id,
                                              add_tag:"",
                                              button_for_tag:"Save"
                                              })
                                        }}> <Icon name="x" />
                                              </Button>
                                            </Badge>
                                      //   </div>
                                      )
                                  })}
                      
                                  </div>
                            </div>
                        </div>
                      </div>
                      {/* Priority*/}
                        <div className="col-lg-6 col-md-6 boxxx_neww right_show" style={{marginTop:"20px"}}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 disPlay">
                            <h3 style={{marginBottom:"0px",marginTop:"16px"}}>Priority</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 disPlay padd_right" style={{marginTop:"4px"}}>
                            {/* <Label className="ballllllll" for="amountrec">Reason<span className="start_mark">*</span></Label> */}
                            <Input type="text"  name="Priority" id="Priority" placeholder="Add Priority"
                                value={this.state.add_priority}
                                onChange={(e) => {
                                this.setState({
                                  add_priority:e.target.value,
                                  priority_error:""
                                })
                                }}  />
                                <p style={{color:"red", marginTop:"5px"}}>{this.state.priority_error}
                            </p>
                            </div>
                          
                            <div className="col-lg-6 col-md-6 my_save">
                            <Button  color="warning" style={{color:"#fff"}} className="buttonAlll" onClick={()=>this.switch_for_priority()}>{this.state.button_for_priority}</Button>
                            </div>
                            <div className="col-lg-12 col-md-12 " style={{paddingRight:"30px"}}>
                            <div className="show_tagsss slot_new_new_123" >
                                  {this.state.priority_array.map((value,index)=>{
                                      return(
                                          // <div className="" >
                                          <Badge key = {index} className="current_bag_breakk" style={{backgroundColor:"#"+value.color,color:"#fff"}} color="brand" onClick={()=>{
                                              this.setState({
                                                add_priority:value.priority_name,
                                                priority_id:value._id,
                                                button_for_priority: "Update"
                                              })
                                          }} pill> {value.priority_name}
                                          <Button className="close close_tagsss_reason" color=""  onClick={()=>{
                                            this.setState({
                                              PriorityAlertDelete:true,
                                              priority_id:value._id,
                                              button_for_priority: "Save",
                                              add_priority:""
                                              })
                                        }}> <Icon name="x" />
                                              </Button>
                                            </Badge>
                                      //   </div>
                                      )
                                  })}
                      
                                  </div>
                            </div>
                        </div>
                      </div>
                      {/* campaigne_type_name */}
                        <div className="col-lg-6 col-md-6 boxxx_neww " style={{marginTop:"20px"}}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 disPlay">
                            <h3 style={{marginBottom:"0px",marginTop:"16px"}}>Campaign Type</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 disPlay padd_right" style={{marginTop:"4px"}}>
                            <Input type="text"  name="Campaigne" id="Campaigne" placeholder="Add Campaign Type"
                                value={this.state.add_campaigne_type}
                                onChange={(e) => {
                                this.setState({
                                  add_campaigne_type:e.target.value,
                                  campaigne_error:""
                                })
                                }}  />
                                <p style={{color:"red", marginTop:"5px"}}>{this.state.campaigne_error}
                            </p>
                            </div>
                          
                            <div className="col-lg-6 col-md-6 my_save">
                            <Button  color="warning" style={{color:"#fff"}} className="buttonAlll" onClick={()=>this.switch_for_campaigne()}>{this.state.button_for_campaigne}</Button>
                            </div>
                            <div className="col-lg-12 col-md-12 " style={{paddingRight:"30px"}}>
                            <div className="show_tagsss slot_new_new_123" >
                                  {this.state.campaigne_array.map((value,index)=>{
                                      return(
                                          // <div className="" >
                                          <Badge key = {index} className="current_bag_breakk" style={{backgroundColor:"#"+value.color,color:"#fff"}} color="brand" onClick={()=>{
                                              this.setState({
                                                add_campaigne_type:value.campaigne_type_name,
                                                campaigne_type_id:value._id,
                                                button_for_campaigne: "Update"
                                              })
                                          }} pill> {value.campaigne_type_name}
                                          <Button className="close close_tagsss_reason" color=""  onClick={()=>{
                                            this.setState({
                                              CampaigneAlertDelete:true,
                                              add_campaigne_type:"",
                                              campaigne_type_id:value._id,
                                              button_for_campaigne: "Save"
                                              })
                                        }}> <Icon name="x" />
                                              </Button>
                                            </Badge>
                                      //   </div>
                                      )
                                  })}
                      
                                  </div>
                            </div>
                        </div>
                      </div>
                      </div>
                  </div>
                </div>


                {/* Calllllll Setting */}

                <div className="show_tagsss box_data_neww mycalendar">
                   <div className="timing_new test_collapse">
                        <div className="row ">
                            <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                            <h1 style={{marginTop: "0px",marginBottom:"10px"}}>Call Setting</h1>
                            </div>
                        </div>
                    </div>
                   <div className="timing_new test_collapse">


{/* ****************************  1st Roe ******************************************************* */}
                        <div className="row first_rowww ">
                            <div className="col-lg-5 col-md-5" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">1.Did not pick</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" id="did_not_pick" checked={this.state.is_enable_dot_not == true ? true : false} name="did_not_pick"  onClick={(e) => {
                                    this.setState({
                                      is_enable_dot_not: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"did_not_pick","Did not pick","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value={this.state.retry_after_dot_not} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_dot_not:e.target.value,
                                            call_setting_name:"did_not_pick",
                                            show_name:"Did not pick",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"did_not_pick","Did not pick","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_dot_not}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                interval_dot_not: e,
                                            });
                                          this.add_telecaller_call_setting(e,"did_not_pick","Did not pick","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value={this.state.max_retries_dot_not} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_dot_not:e.target.value,
                                        call_setting_name:"did_not_pick",
                                        show_name:"Did not pick",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"did_not_pick","Did not pick","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
                        <div className="col-lg-1 col-md-1">
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                    <div className="col-lg-6 col-md-6" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">2.Busy in another call</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_busy_another == true ? true : false} id="busy_on_another_call" name="busy_on_another_call"  onClick={(e) => {
                                    this.setState({
                                      is_enable_busy_another: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"busy_on_another_call","Busy on another call","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value={this.state.retry_after_busy_another} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_busy_another:e.target.value,
                                            call_setting_name:"busy_on_another_call",
                                            show_name:"Busy on another call",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"busy_on_another_call","Busy on another call","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_busy_another}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                              interval_busy_another: e,
                                            });
                                          this.add_telecaller_call_setting(e,"busy_on_another_call","Busy on another call","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value={this.state.max_retries_busy_another} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_busy_another:e.target.value,
                                        call_setting_name:"busy_on_another_call",
                                        show_name:"Busy on another call",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"busy_on_another_call","Busy on another call","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>


{/* ****************************  2nd Row ******************************************************* */}

                      <div className="row second_rowww common_row">
                            <div className="col-lg-5 col-md-5" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">3.User disconnected the call</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_user_not == true ? true : false} id="user_disconnected_the_call" name="user_disconnected_the_call"  onClick={(e) => {
                                    this.setState({
                                      is_enable_user_not: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"user_disconnected_the_call","User disconnected the cal","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value={this.state.retry_after_user_not} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_user_not:e.target.value,
                                            call_setting_name:"user_disconnected_the_call",
                                            show_name:"User disconnected the cal",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"user_disconnected_the_call","User disconnected the cal","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_user_not}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                              interval_user_not: e,
                                            });
                                          this.add_telecaller_call_setting(e,"user_disconnected_the_call","User disconnected the cal","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value={this.state.max_retries_user_not} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_user_not:e.target.value,
                                        call_setting_name:"user_disconnected_the_call",
                                        show_name:"User disconnected the cal",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"user_disconnected_the_call","User disconnected the cal","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
                                <div className="col-lg-1 col-md-1">
                                </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                    <div className="col-lg-6 col-md-6" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">4.Switch off</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_switch_off == true ? true : false} id="switch_off" name="switch_off"  onClick={(e) => {
                                    this.setState({
                                      is_enable_switch_off: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"switch_off","Switch off","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value={this.state.retry_after_switch_off} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_switch_off:e.target.value,
                                            call_setting_name:"switch_off",
                                            show_name:"Switch off",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"switch_off","Switch off","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_switch_off}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                              interval_switch_off: e,
                                            });
                                          this.add_telecaller_call_setting(e,"switch_off","Switch off","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.max_retries_switch_off} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_switch_off:e.target.value,
                                        call_setting_name:"switch_off",
                                        show_name:"Switch off",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"switch_off","Switch off","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>

{/* ****************************  3rf Row ******************************************************* */}
                      <div className="row three_rowww common_row">
                            <div className="col-lg-5 col-md-5" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">5.Out of Coverage area / Network issue</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_out_of == true ? true : false} id="out_of_coverage_area" name="out_of_coverage_area"  onClick={(e) => {
                                    this.setState({
                                      is_enable_out_of: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"out_of_coverage_area","Out of Coverage area / Network issue","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.retry_after_out_of} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_out_of:e.target.value,
                                            call_setting_name:"out_of_coverage_area",
                                            show_name:"Out of Coverage area / Network issue",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"out_of_coverage_area","Out of Coverage area / Network issue","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_out_of}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                interval: e,
                                            });
                                          this.add_telecaller_call_setting(e,"out_of_coverage_area","Out of Coverage area / Network issue","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.max_retries_out_of} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_out_of:e.target.value,
                                        call_setting_name:"out_of_coverage_area",
                                        show_name:"Out of Coverage area / Network issue",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"out_of_coverage_area","Out of Coverage area / Network issue","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
<div className="col-lg-1 col-md-1">
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                    <div className="col-lg-6 col-md-6" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">6.Call not connected / can not be completed</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_call_not_conn == true ? true : false}  id="call_not_connected" name="call_not_connected"  onClick={(e) => {
                                    this.setState({
                                      is_enable_call_not_conn: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"call_not_connected","Call not connected / can not be completed","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.retry_after_call_not_conn} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_call_not_conn:e.target.value,
                                            call_setting_name:"call_not_connected",
                                            show_name:"Call not connected / can not be completed",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"call_not_connected","Call not connected / can not be completed","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_call_not_conn}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                interval: e,
                                            });
                                          this.add_telecaller_call_setting(e,"call_not_connected","Call not connected / can not be completed","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.max_retries_call_not_conn} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_call_not_conn:e.target.value,
                                        call_setting_name:"call_not_connected",
                                        show_name:"Call not connected / can not be completed",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"call_not_connected","Call not connected / can not be completed","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>

{/* ****************************  4th Row ******************************************************* */}
                      <div className="row four_rowww common_row">
                            <div className="col-lg-5 col-md-5" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">7.Incorrect / Invalid number</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_incorrect_inval == true ? true : false} id="incorrect_invalid_number" name="incorrect_invalid_number"  onClick={(e) => {
                                    this.setState({
                                      is_enable_incorrect_inval: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"incorrect_invalid_number","Incorrect / Invalid number","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.retry_after_incorrect_inval} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_incorrect_inval:e.target.value,
                                            call_setting_name:"incorrect_invalid_number",
                                            show_name:"Incorrect / Invalid number",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"incorrect_invalid_number","Incorrect / Invalid number","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_incorrect_inval}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                interval_incorrect_inval: e,
                                            });
                                          this.add_telecaller_call_setting(e,"incorrect_invalid_number","Incorrect / Invalid number","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.max_retries_incorrect_inval} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_incorrect_inval:e.target.value,
                                        call_setting_name:"incorrect_invalid_number",
                                        show_name:"Incorrect / Invalid number",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"incorrect_invalid_number","Incorrect / Invalid number","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
<div className="col-lg-1 col-md-1">
                        </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                    <div className="col-lg-6 col-md-6" style={{display:"grid"}}>
                            <h4 style={{marginBottom:"0px",marginTop:"16px",display:"inline-flex"}}>
                              <span className="dot_cll">8.Number not in use / does not exists / out of service</span>  <span className="dot_cus" style={{marginTop:"2px"}}>
                                <CustomInput type="switch" checked={this.state.is_enable_number_not_in == true ? true : false} id="number_not_in_use" name="number_not_in_use"  onClick={(e) => {
                                    this.setState({
                                      is_enable_number_not_in: e.target.checked
                                    })
                                    this.add_telecaller_call_setting(e.target.checked,"number_not_in_use","Number not in use / does not exists / out of service","is_enable")

                                    }} />
                                {" "}</span> 
                              <span>Retry Enabled</span> 
                              </h4>

                              <div className="alll_data">
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Retry After<span className="start_mark">*</span></Label>
                                    <Input value = {this.state.retry_after_number_not_in} className="text_tttttt" type="text"
                                        onChange={(e)=>{
                                          this.setState({
                                            retry_after_number_not_in:e.target.value,
                                            call_setting_name:"number_not_in_use",
                                            show_name:"Number not in use / does not exists / out of service",
                                            type:"retry_after"
                                          })
                                          this.add_telecaller_call_setting(e.target.value,"number_not_in_use","Number not in use / does not exists / out of service","retry_after")
                                        }}
                                    />
                                </div>
                              </div>
                              <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Interval<span className="start_mark">*</span></Label>
                                    {/* <Input className="text_tttttt" type="text"/> */}
                                    <Select
                                        value = {this.state.interval_number_not_in}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                interval: e,
                                            });
                                          this.add_telecaller_call_setting(e,"number_not_in_use","Number not in use / does not exists / out of service","interval")

                                        }}
                                        className="contact_sort intercalllll"
                                        options={ intervals_data }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                            />
                                </div>
                            </div>
                            <div className="dis_paly_new">
                                <div className="textOnInput">
                                    <Label className="llllllll_label" htmlFor="inputText">Max Retries<span className="start_mark">*</span></Label>
                                    <Input value={this.state.max_retries_number_not_in} className="text_tttttt" type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        max_retries_number_not_in:e.target.value,
                                        call_setting_name:"number_not_in_use",
                                        show_name:"Number not in use / does not exists / out of service",
                                        type:"max_retries"
                                      })
                                      this.add_telecaller_call_setting(e.target.value,"number_not_in_use","Number not in use / does not exists / out of service","max_retries")
                                    }}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>









                    </div>
                </div>

           </div>


{/* ************************************** Model For Delete delete_priority ************************************************************* */}
           <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.PriorityAlertDelete}
                toggle={this.PriorityAlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.PriorityAlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.PriorityAlertDelete}>no</Button>
                    {'             '}
                    
                    <Button color="brand"
                      style={{ background: "#8bc240", borderColor: "#8bc240" }}
                      onClick={() => {
                        this.delete_priority(this.state.priority_id)

                      }}
                    >yes</Button>
                  </div>

                </ModalBody>
              </Modal>
{/* ************************************** Model For Delete Commmmm ************************************************************* */}
           <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.CampaigneAlertDelete}
                toggle={this.CampaigneAlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.CampaigneAlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.CampaigneAlertDelete}>no</Button>
                    {'             '}
                    
                    <Button color="brand"
                      style={{ background: "#8bc240", borderColor: "#8bc240" }}
                      onClick={() => {
                        this.delete_campaigne_type(this.state.campaigne_type_id)

                      }}
                    >yes</Button>
                  </div>

                </ModalBody>
              </Modal>
{/* ************************************** Model For Delete Tad ************************************************************* */}
           <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.TagAlertDelete}
                toggle={this.TagAlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.TagAlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.TagAlertDelete}>no</Button>
                    {'             '}
                    
                    <Button color="brand"
                      style={{ background: "#8bc240", borderColor: "#8bc240" }}
                      onClick={() => {
                        this.delete_tag(this.state.tag_id)

                      }}
                    >yes</Button>
                  </div>

                </ModalBody>
              </Modal>

{/* ************************************** Model For Delete Lead ************************************************************* */}
           <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.LeadAlertDelete}
                toggle={this.LeadAlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.LeadAlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.LeadAlertDelete}>no</Button>
                    {'             '}
                    
                    <Button color="brand"
                      style={{ background: "#8bc240", borderColor: "#8bc240" }}
                      onClick={() => {
                        this.delete_lead_stage(this.state.lead_stage_id)

                      }}
                    >yes</Button>
                  </div>

                </ModalBody>
              </Modal>

{/* ************************************** Model For Delete Reason ************************************************************* */}

           <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.AlertDelete}
                toggle={this.AlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.AlertDelete}>no</Button>
                    {'             '}
                    
                    <Button color="brand"
                      style={{ background: "#8bc240", borderColor: "#8bc240" }}
                      onClick={() => {
                        this.delete_break_reason(this.state.break_reason_id)

                      }}
                    >yes</Button>
                  </div>

                </ModalBody>
              </Modal>

{/* ************************************ Add Chequess ********************************************************* */}
                  <Modal
                        isOpen={ this.state.modalOpen_for_label }
                        toggle={ this.toggle_for_label }
                        className={ this.props.className,"modal-dialog-centered labels_model" }
                        fade
                    >
                    <div className="modal-header">
                        <h5 className="modal-title h2">{this.state.contact_field_array == "" || this.state.contact_field_array == undefined ? "Add" :"Update"} Contact Fields</h5>
                        <Button className="close" color="" onClick={ this.toggle_for_label }>
                            <Icon name="x" />
                        </Button>
                    </div>
                   <ModalBody style={{paddingBottom:"6px"}}>

                   <div className="row">
                   <div className="col-lg-8 col-md-8 col-sm-12">
                   <Label className="upload_file_1">Contact Excel Field</Label>

                 {/* // <span>
                   //      <ReactSelect
                   //      options={insurer_type}
                   //      isMulti
                   //      closeMenuOnSelect={false}
                   //      hideSelectedOptions={false}
                   //      components={{
                   //          Option
                   //      }}
                   //      onChange={this.handleChange}
                   //      allowSelectAll={true}
                   //      value={this.state.optionSelected}
                   //      styles={ customStyles }
                   //      />
                   //  </span>*/}

                       <Select
                                value = {this.state.excel_field_type}
                                onChange={(e) => {
                                    ////console.log(e, "Val.....")
                                    this.setState({
                                        excel_field_type: e,
                                        blank_message:""
                                    });
                                    this.select_heading(e)
                                }}
                                placeholder="Select..."
                                className="contact_sort"
                                options={ excel_field_array }
                                styles={ customStyles }
                            />
                   </div>
                     <div className="col-lg-12 col-md-8 col-sm-12">

                     <div className="show_tagsss slot_new_new">
                         {this.state.heading_array.map((value,index)=>{
                             return(
                                 <Badge key = {index} className="current_bag" style={{backgroundColor:value.color,color:"#fff"}} color="brand" pill> {value.label}
                                 <Button className="close close_tagsss" color=""  onClick={()=>{
                                   this.setState({
                                      AlertDelete:true,
                                      tag_id:value.value
                                     })
                                     this.delete_heading(value)
                                }}> <Icon name="x" />
                                     </Button>
                                   </Badge>
                             )
                         })}
                      </div>

                     </div>

                   </div>



                    </ModalBody>
                    <ModalFooter style={{justifyContent:this.state.blank_message == "" || this.state.blank_message == undefined ? "flex-end":"flex-start"}}>
                    <div style={{display:this.state.blank_message == "" || this.state.blank_message == undefined ? "none" :"block",width:"70%"}}>
                       <p style={{marginBottom:"0px",color:"red"}}>{this.state.blank_message}</p>
                    </div>
                        <Button color="secondary" onClick={ this.toggle_for_label }>Close</Button>
                        { ' ' }
                        <Button color="warning" style={{color:"#fff"}} onClick={() => this.add_contact_excel_field()}>Save</Button>
                  </ModalFooter>
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
