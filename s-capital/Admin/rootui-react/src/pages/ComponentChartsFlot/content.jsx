/**
 * Styles
 */
// import '../Profile/style.scss';
import './style.scss'
// import '../Mailbox/style.scss'

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import PageContent from '../../components/page-content';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Label, Input, Table, ButtonGroup, Collapse, Button, Modal, ModalBody, ModalFooter, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Spinner, CustomInput
} from 'reactstrap';
import DataTables from '../../components/data-tables';
import dateFormat from 'dateformat';

/**
 * Internal Dependenciesrizwan
 */
import Icon from '../../components/icon';
import FancyBox from '../../components/fancybox';
import Tabs from '../../components/tabs';
import Timeline from '../../components/timeline';
import DatePicker from '../../components/date-time-picker';
import Select from 'react-select';
import { format } from 'date-fns';

import Dropdown from '../../components/bs-dropdown';
import {
    addToast as actionAddToast,
} from '../../actions';
// import { Typeahead } from 'react-bootstrap-typeahead';
import { updateAuth as actionUpdateAuth } from '../../actions';

import Cookies from 'js-cookie';
import PageTitle from '../../components/page-title';

/**
 * Component
 */

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

 var data23 = JSON.parse(Cookies.get("admin_data"));
 //console.log("ssssssssssssssssssssssssssssssssssssss,", data23[0]._id);
class Content extends Component {

  constructor(props) {
      super(props);

      this.state = {
          activeTab: 'activity',
          heading: 'Add Task',
          task_array: [],
          mobileMenuShow: false,
          modalOpen_delete: false,
          modalOpen: false,
          firstVal: 'Select Date',
          button: 'Save',
          secondVal: new Date(),
          thirdVal: new Date(),
          add_task: '',
          date: new Date(),
          time: new Date(),
          category: '',
          contact_for: '',
          responsible_for: '',
          category_array: [],

          // category_array_new: [],
          new_array_category: [],
          responsible_array: [],
          task_status_array: [],
          new_array_responsible: [],
          edit_task_array: [],
          responsible_for_array_new: '',
          task_status_new: '',
          category_array_new: 'Select category',
          category_for_edit: '',
          responsible_for_edit: '',
          status_edit: '',
          checked_array: [],
          dd_task: 'All Task',
          dd_task2: 'All',
          // dd_respon: "All",
          dd_respon: data23[0].name,
          task_array_2: [],
          task_array_3: [],
          task_array_4: [],
          task_array_5: [],
          contact_fot_tp: [],
          overdue_count: '',
          today_count: '',
          upcoming_count: '',
          defaut: '',
          complete_count: '',
          incomplete_count: '',
          isLoading: "block",
          indicator: 'block',
          no_data: 'none',
          delete_id:'',


          // blank_array: [],
          suggestions: [],
          text: '',
          contractor_array: [],
          contractor_name: '',
          lead_id: '',
          lead_obj: {},
          id: '',
          employee_id: data23[0]._id,
          logged_in_user_id: data23[0]._id,
          user_role: data23[0].role.label,
          sales_management_control:Cookies.get('sales_management_control'),
      };

      this.user_role_func();
      this.fetch_responsible();
      this.fetch_new_task(data23[0]._id);
      this.toggle = this.toggle.bind(this);
      this.switch_function = this.switch_function.bind(this);
      this.toggle_delete = this.toggle_delete.bind(this);
  }

  toggle_delete() {
      this.setState((prevState_delete) => ({
          modalOpen_delete: !prevState_delete.modalOpen_delete,

      }));
  }


  for_edit(x) {
      var category_data_array = [];
      var ppp = x.date_time
      // var ppp = x.task_date
      // var ttt = x.task_time
      // const timeString = '18:00:00'
      // //console.log("x", x);
      // // Append any date. Use your birthday.
      // const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      //     .toLocaleTimeString('en-US',
      //         { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
      //     );
      // //console.log("timeString12hr", timeString12hr);
      // firstVal: new Date(data.data[0].assigned_date_time.replace("Z", "")),

      this.setState({
          button: "Update",
          heading: "Edit Task",
          add_task: x.remark,
          // date: new Date(ppp),
          date: new Date(ppp.replace("Z", "")),
          // category_array_new: x.task_category[0],
          text: x.task_contact_for[0].label,
          // lead_id: x.task_contact_for[0].value,
          // responsible_for_array_new: x.task_responsible_for[0],
          // task_status_new: x.status,
          id: x._id,
          // category_for_edit: x.task_category[0],
          // responsible_for_edit: x.task_responsible_for[0],
          // status_edit: x.status,
          lead_obj: {
              "value": x.task_contact_for[0].value,
              "label": x.task_contact_for[0].label
          }
      })
      category_data_array.push(x.category_data);
      //console.log("xxxxxxxxxxxxx", x);
  }




      delete_task() {
          const { settings } = this.props;
          const {
              addToast,
          } = this.props;


          var params = {
              task_id: this.state.delete_id
          }
          //console.log("delete task", params);
          const res = fetch(settings.api_url + "delete_task_visitor", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  // //console.log(json)
                  var delete_data = json;

                  this.fetch_new_task("All");

                  if (delete_data.status == true) {
                      addToast({
                          title:'Book my Insurance',
                          content: delete_data.message,
                          duration: 1000,
                      });

                  }
                  else {
                      addToast({
                          title:'Book my Insurance',
                          content: delete_data.message,
                          duration: 1000,
                      });
                  }

                  this.setState((prevState_delete) => ({
                      modalOpen_delete: !prevState_delete.modalOpen_delete,

                  }));


              })

      }


  user_role_func() {

    if(this.state.user_role == "Super Admin" || this.state.user_role == "super admin" || this.state.user_role == "SUPER ADMIN" || this.state.user_role == "Admin" || this.state.user_role == "admin" ||this.state.user_role == "ADMIN"){
      this.setState({user_role:"Super Admin"})
    }else{
      var user_role = this.state.user_role
      this.setState({user_role:user_role})
    }

    //console.log("usereee_roleeeeee",this.state.user_role);
  }

  fetch_responsible() {

      // //console.log("fetch city", params);
      // const params = {
      //     mode: 'fetch_username_only'
      // }
      const { settings } = this.props;

      var responsible_data = null;
      const res = fetch(settings.api_url + "get_sorting_users", {
          method: 'POST',
          // body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("fetch_username_only", json)
              responsible_data = json;
          })
          .then(() => {
              this.setState({ responsible_array: responsible_data["data"] });
              //console.log("responsible_array", responsible_data["data"]);
              //console.log(" job_data.status", responsible_data.status);

              // this.setState({
              //  city_arraypp:city_data["data"]
              // })
          })

  }


  fetch_new_task(user) {

      const { settings } = this.props;
      var params = {
          // mode: "fetch_all_task_new",fetch_task
          status: "All",
          user: user,
          user_role:this.state.user_role

      }
      //console.log("fetch_new_task", params);
      var task_data = null;
      const res = fetch(settings.api_url + "fetch_task", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("FETCH_TASK", json)
              var task_data_2 = json;
              if (task_data_2.status == true) {
                  //console.log("COUNT*****************************", task_data_2);
                  if (task_data_2.data[1].overdue.length == 0) {
                      this.setState({ overdue_count: 0, isLoading: "none" });
                  }
                  else {
                      this.setState({ overdue_count: task_data_2.data[1].overdue.length, isLoading: "none" });
                  }
                  this.setState({ task_array_2: task_data_2["data"][1]["overdue"], isLoading: "none", indicator: "none", no_data: "none" });
                  //console.log("task_array_2", this.state.task_array_2);
                  //console.log(" task_data status_2", task_data_2.status);

                  if (task_data_2.data[0].today.length == 0) {
                      this.setState({ today_count: 0 });
                  }
                  else {
                      this.setState({ today_count: task_data_2.data[0].today.length, isLoading: "none" });
                  }
                  this.setState({ task_array_3: task_data_2["data"][0]["today"], isLoading: "none", indicator: "none", no_data: "none" });
                  //console.log("task_array_3", this.state.task_array_3);
                  //console.log(" task_data status_3", task_data_2.status);

                  if (task_data_2.data[2].upcoming.length == 0) {
                      this.setState({ upcoming_count: 0 });
                  }
                  else {
                      this.setState({ upcoming_count: task_data_2.data[2].upcoming.length, isLoading: "none" });
                  }
                  this.setState({ task_array_4: task_data_2["data"][2]["upcoming"], upcoming_count: task_data_2.data[2].upcoming.length, isLoading: "none", indicator: "none", no_data: "none" });
                  //console.log("task_array_4", this.state.task_array_4);
                  //console.log(" task_data status_4", task_data_2.status);

                  // no data Message
                  if (task_data_2.data[1].overdue.length == 0 && task_data_2.data[0].today.length == 0 && task_data_2.data[2].upcoming.length == 0) {
                      this.setState({ no_data: "block" });
                  }
              }
              else {
                  this.setState({ task_array_2: [], task_array_3: [], task_array_4: [], isLoading: "none", indicator: "none", no_data: "bock" });
              }

          })
          .then(() => {
              // this.setState({ admin_array:json["data"] });
              // //console.log("city_array", this.state.city_array);
              // //console.log(" city_data status", city_data.status);
          })

  }

  toggle() {


    //console.log("innnnnnnnnnnnn toggleeeeeeeeeeeeee");
      this.setState((prevState) => ({
          modalOpen: !prevState.modalOpen,
          heading: 'Add Task',
          add_task: '',
          date: new Date(),
          time: new Date(),
          category_array_new: 'Select category',
          contact_for: '',
          text: '',
          lead_id: '',
          task_status_new: '',
          button: 'Save',
          id: '',
          lead_obj: {},
          responsible_for_array_new: ''
      }));
      // this.fetch_new_task(this.state.employee_id);

  }

  switch_function() {
      if (this.state.button == "Save") {
          this.add_task();
          //console.log("worng call");
      }
      else {
          this.edit_task();
      }
  }


  edit_task() {
      const {
          addToast,
      } = this.props;
      const { settings } = this.props;


      //console.log("remark", this.state.add_task)
      //console.log("dateeee", this.state.date.toISOString())
      //console.log("main_visitor", this.state.lead_obj)
      //console.log("main_visitor_id", this.state.lead_obj.value)
      //console.log("logged_in_user_id", this.state.logged_in_user_id)

      var date_time = new Date(this.state.date.toString().split("+")[0]).toISOString()
   //console.log(date_time, "ooooooooooooooooooooooooooooooooooo"); //offset in milliseconds


      var params = {
          task_id: this.state.id,
          date_time: date_time,
          // date_time: this.state.date.toISOString(),
          remark: this.state.add_task,
          main_visitor_id: this.state.lead_obj.value,
      }
      //console.log("#############################", params);

      var edit_admin_data = null;
      const res = fetch(settings.api_url + "update_task_visitor", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              // //console.log(json)
              edit_admin_data = json;
              this.setState({ edit_task_array: edit_admin_data["data"] });
              // //console.log("edit_task_array", this.state.edit_task_array);
              //console.log(" edit_admin_data status", edit_admin_data.status);
              this.fetch_new_task(this.state.employee_id);
              if (edit_admin_data.status == true) {
                  addToast({
                      title: 'Book my Insurance',
                      content: edit_admin_data.message,
                      duration: 1000,
                  });
              }
              else {
                  addToast({
                      title: 'Book my Insurance',
                      content: edit_admin_data.message,
                      duration: 1000,
                  });
              }

              this.setState((prevState) => ({
                  modalOpen: !prevState.modalOpen,
                  add_task: '',
                  date: '',
                  time: '',
                  category_array_new: '',
                  contact_for: '',
                  responsible_for_array_new: '',
                  task_status_new: '',
                  heading: 'Add Task',
                  button: 'Save'
              }));

              this.fetch_new_task(this.state.employee_id)
          })
          .then(() => {
              // this.setState({ admin_array:json["data"] });
              // //console.log("city_array", this.state.city_array);
              // //console.log(" city_data status", city_data.status);
          })

  }


      add_task() {
          const {
              addToast,
          } = this.props;
          const { settings } = this.props;

          //console.log("remark", this.state.add_task)
          //console.log("dateeee", this.state.date.toISOString())
          //console.log("main_visitor_id", this.state.lead_obj.value)
          //console.log("logged_in_user_id", this.state.logged_in_user_id)

           var date_time = new Date(this.state.date.toString().split("+")[0]).toISOString()
        //console.log(date_time, "ooooooooooooooooooooooooooooooooooo"); //offset in milliseconds

          const params = {
              remark: this.state.add_task,
              date_time: date_time,
              // date_time: new Date(this.state.date).toISOString(),
              main_visitor_id: this.state.lead_obj.value,
              user_id: this.state.logged_in_user_id,
          }

          //console.log("params add_task0", params);


          // //console.log("Addjobs", params);

          var addtask = null;
          const res = fetch(settings.api_url + "add_task_visitor", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("response_add_task", json)
                  addtask = json;
                  this.setState({ edit_task_array: addtask["data"] });
                  this.fetch_new_task(this.state.employee_id);
                  // this.eml();
                  if (addtask.status == "true") {
                      addToast({
                          title: 'Book my Insurance',
                          content: addtask.message,
                          duration: 1000,
                      });
                  }
                  else {
                      addToast({
                          title: 'Book my Insurance',
                          content: addtask.message,
                          duration: 1000,
                      });
                  }


                  this.setState((prevState) => ({
                      modalOpen: !prevState.modalOpen,
                      add_task: '',
                      date: '',
                      time: '',
                      category_array_new: '',
                      contact_for: '',
                      responsible_for_array_new: '',
                      task_status_new: '',
                  }));
              })
      }


      onTextChange = (e) => {
          if (e.target.value == undefined) {
              var ww = e
          } else {
              var ww = e.target.value
          }
          const { settings } = this.props;
          const params = {
              lead_name: ww
          };
          //console.log(" params", params);
          const res = fetch(settings.api_url + "fetch_lead_typeahead", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          })
              .then((response) => response.json())
              .then(json => {
                  //console.log(" response", json);
                  var item_data = json;
                  //console.log("response typeahead", json);
                  if (item_data.status == true) {
                      var kkk = item_data.data;
                      var item_Object = kkk.map(item => {
                          return {
                              "label": item.insurance_details[0].full_name,
                              "value": item._id,
                          }

                      });
                      this.setState({
                          suggestions: item_Object,
                      })
                  } else {
                      this.setState({
                          suggestions: []
                      })
                  }
              })
      }

      renderSuggestions = () => {
          const { suggestions } = this.state;
          //console.log("suggestions :", suggestions);
          if (suggestions.length === 0) {
              return null;
          }
          return (
              <ul style={{ paddingLeft: '0px', listStyle: 'none', overflowY: 'scroll', maxHeight: '250px', position: 'absolute', width: "88%", backgroundColor: '#fff', marginTop: '10px', zIndex: '1' }}>
                  {suggestions.map((value, index) => <li key={index} type="button" className="myli"
                      style={{ cursor: 'pointer' }}><button style={{ textDecoration: 'none', border: 'none', backgroundColor: 'transparent', width: '100%', textAlign: 'start' }}
                          onClick={() => this.suggestionSelected(value, index)}>{value.label}</button></li>)}
              </ul>
          )
      }

      suggestionSelected = (value, index) => {
          //console.log("kaappp", value);
          this.setState(() => ({
              suggestions: [],
              text: value.label,
              lead_id: value.value,
              lead_obj: value
          }))
          // console.log("lead object", {
          //     text: value.label,
          //     lead_id: value.value,
          // });
      }



          handleChange = (e, x) => {
              // to find out if it's checked or not; returns true or false
              const { settings } = this.props;

              const {
                  addToast,
              } = this.props;


              const checked = e;
              //console.log(checked, x);
              if (checked == true) {
                  var khu = "complete"
                  this.setState({ status: "complete" })
                  //console.log(khu);
              }
              else {
                  var khu = "incomplete"
                  this.setState({ status: "incomplete" })
                  //console.log(khu);

              }
              var params = {
                  //   mode:"update_task_status",
                  task_id: x,
                  status: khu
              }
              //console.log(params);
              var fetch_checked = null;
              const res = fetch(settings.api_url + "complete_incomplete_task_visitor", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      //console.log(json)
                      fetch_checked = json;
                      if (fetch_checked.status == true) {
                          this.setState({
                              status: this.state.status
                          })
                          addToast({
                              title: 'DreamLand',
                              content: fetch_checked.message,
                              duration: 1000,
                          });
                          this.fetch_new_task("All");
                      }
                      else {
                          addToast({
                              title: 'DreamLand',
                              content: fetch_checked.message,
                              duration: 1000,
                          });
                      }

                  })
                  .then(() => {

                      //console.log("checked_array", this.state.checked_array);
                      //console.log("  fetch_checked", fetch_checked.status);




                  })

              // to get the checked value
              // const checkedValue = e.target.value;
              // //console.log(checkedValue);

              // to get the checked name
              // const checkedName = e.target.name;
              // //console.log(checkedName);

              //then you can do with the value all you want to do with it.
          }

          sort_data(st) {


              const { settings } = this.props;

              var params = {
                  status: st,
                  user: this.state.employee_id,
                  user_role: this.state.user_role,
              }
              //console.log("params2222222222222222", params);
              var task_data = null;
              const res = fetch(settings.api_url + "fetch_task", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      //console.log("aaaaaaaaaaaaaaaa@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2222222222222222222", json)
                      var task_data_2 = json;
                      if (task_data_2.status == true) {
                          if(task_data_2.data[0]["today"] == undefined || task_data_2["data"][1]["overdue"] == undefined || task_data_2["data"][2]["upcoming"] == undefined){
                              this.setState({ task_array_5: task_data_2["data"],incomplete_count: task_data_2.data.length, complete_count: task_data_2.data.length, isLoading: "none", indicator: "none", no_data: "none" });
                          }else{
                          //console.log("count.......................", task_data_2.data.length);
                          if (task_data_2.data[1].overdue.length == 0) {
                              this.setState({ overdue_count: 0, isLoading: "none" });
                          }
                          else {
                              this.setState({ overdue_count: task_data_2.data[1].overdue.length, isLoading: "none" });
                          }
                          this.setState({ task_array_2: task_data_2["data"][1]["overdue"], isLoading: "none", indicator: "none", no_data: "none" });
                          //console.log("task_array_2", this.state.task_array_2);
                          //console.log(" task_data status_2", task_data_2.status);

                          if (task_data_2.data[0].today.length == 0) {
                              this.setState({ today_count: 0 });
                          }
                          else {
                              this.setState({ today_count: task_data_2.data[0].today.length, isLoading: "none" });
                          }
                          this.setState({ task_array_3: task_data_2["data"][0]["today"], isLoading: "none", indicator: "none", no_data: "none" });
                          //console.log("task_array_3", this.state.task_array_3);
                          //console.log(" task_data status_3", task_data_2.status);

                          if (task_data_2.data[2].upcoming.length == 0) {
                              this.setState({ upcoming_count: 0 });
                          }
                          else {
                              this.setState({ upcoming_count: task_data_2.data[2].upcoming.length, isLoading: "none" });
                          }
                          this.setState({ task_array_4: task_data_2["data"][2]["upcoming"], upcoming_count: task_data_2.data[2].upcoming.length, isLoading: "none", indicator: "none", no_data: "none" });
                          //console.log("task_array_4", this.state.task_array_4);
                          //console.log(" task_data status_4", task_data_2.status);

                          // no data Message
                          if (task_data_2.data[1].overdue.length == 0 && task_data_2.data[0].today.length == 0 && task_data_2.data[2].upcoming.length == 0) {
                              this.setState({ no_data: "block" });
                          }
                          // this.setState({ task_array_5: task_data_5["data"][1], complete_count: task_data_5.data.length, isLoading: "none", indicator: "none", no_data: "none" });
                      }
                      }
                      else {
                          this.setState({task_array_5:[], task_array_2: [], task_array_3: [], task_array_4: [], isLoading: "none", indicator: "none", no_data: "block"});

                      }


                      // //console.log("task_array_5", this.state.task_array_5);
                      // //console.log(" task_data.status", task_data_5.status);
                  })

          }

          sort_data2(ID) {
              const { settings } = this.props;

              // //console.log(k);
              if (ID == "All") {
                  var user_DD = "All"
              } else {
                  var user_DD = ID
              }


              var params = {
                  // mode: "fetch_all_task_new",
                  status: this.state.dd_task2,
                  user_role: this.state.user_role,
                  user: user_DD,
              }
              //console.log("params", params);
              var task_data = null;
              const res = fetch(settings.api_url + "fetch_task", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      //console.log("aaaaaaaaaaaaaaaa@zzzzzzzzzz@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", json)
                      var task_data_2 = json;
                      if (task_data_2.status == true) {
                          if(task_data_2.data[0]["today"] == undefined || task_data_2["data"][1]["overdue"] == undefined || task_data_2["data"][2]["upcoming"] == undefined){
                              this.setState({ task_array_5: task_data_2["data"], complete_count: task_data_2.data.length,incomplete_count: task_data_2.data.length, isLoading: "none", indicator: "none", no_data: "none" });
                          }else{

                          if (task_data_2.data[1].overdue.length == 0) {
                              this.setState({ overdue_count: 0 });
                          }
                          else {
                              this.setState({ overdue_count: task_data_2.data[1].overdue.length, isLoading: "none" });
                          }
                          this.setState({ task_array_2: task_data_2["data"][1]["overdue"], isLoading: "none", indicator: "none", no_data: "none" });
                          //console.log("task_array_2", this.state.task_array_2);
                          //console.log(" task_data status_2", task_data_2.status);

                          if (task_data_2.data[0].today.length == 0) {
                              this.setState({ today_count: 0 });
                          }
                          else {
                              this.setState({ today_count: task_data_2.data[0].today.length, isLoading: "none" });
                          }
                          this.setState({ task_array_3: task_data_2["data"][0]["today"], isLoading: "none", indicator: "none", no_data: "none" });
                          //console.log("task_array_3", this.state.task_array_3);
                          //console.log(" task_data status_3", task_data_2.status);

                          if (task_data_2.data[2].upcoming.length == 0) {
                              this.setState({ upcoming_count: 0 });
                          }
                          else {
                              this.setState({ upcoming_count: task_data_2.data[2].upcoming.length, isLoading: "none" });
                          }
                          this.setState({ task_array_4: task_data_2["data"][2]["upcoming"], upcoming_count: task_data_2.data[2].upcoming.length, isLoading: "none", indicator: "none", no_data: "none" });
                          //console.log("task_array_4", this.state.task_array_4);
                          //console.log(" task_data status_4", task_data_2.status);

                          // no data Message
                          if (task_data_2.data[1].overdue.length == 0 && task_data_2.data[0].today.length == 0 && task_data_2.data[2].upcoming.length == 0) {
                              this.setState({ no_data: "block" });
                          }
                      }
                          // this.setState({ task_array_5: task_data_5["data"], complete_count: task_data_5.data.length, isLoading: "none", indicator: "none", no_data: "none" });

                      }
                      else {
                          this.setState({task_array_5:[], task_array_2: [], task_array_3: [], task_array_4: [], isLoading: "none", indicator: "none", no_data: "block" });

                      }
                      // //console.log("task_array_5", this.state.task_array_5);
                      // //console.log(" task_data.status", task_data_5.status);
                  })

          }



    render() {
        return (
            <Fragment>

            <PageTitle className="task_page_title">
            <div style={{display:"inline-flex" ,width:"100%"}}>

                <Spinner style={{ marginTop: gk, display: this.state.isLoading }}
                    color="info" className="spinner_css_1234"
                />
                <div style={{ display: this.state.user_role != "Super Admin" ? "block" : "none" }}>
                <h3 style={{marginTop: "4px",marginBottom: "5px"}}>Task List</h3>
                </div>
                <div style={{ display: this.state.user_role == "Super Admin" ? "block" : "none" }}>
                  <h3 className="head_task"> <span style={{whiteSpace:"nowrap"}}>Sharing all</span>
                      <span className="share_cate">
                          <Dropdown
                              showTriangle
                              className="dib"
                          >
                              <Dropdown.Toggle tag="button" className="btn btn-brand drop_data" style={{whiteSpace:"nowrap"}}>{this.state.dd_task}
                              </Dropdown.Toggle>
                              <Dropdown.Menu tag="ul" className="nav nav_12">
                                  <li className={this.state.dd_task2 == "complete" ? 'yourClass' : 'drop_list'} style={{ marginBottom: "2px", background: this.state.dd_task2 == "complete" ? "#d3d3d37a" : "#fff" }}>
                                      <button style={{ border: 'none', backgroundColor: 'transparent', width: "100%" }} onClick={() => {
                                          this.setState({
                                              dd_task2: "complete",
                                              dd_task: "complete"
                                          })
                                          this.sort_data("complete")
                                      }}>
                                          <span className="nav_link">Complete</span>
                                          <span className="rui-nav-circle"></span>
                                      </button>
                                  </li>
                                  <li className={this.state.dd_task2 == "incomplete" ? 'yourClass' : 'drop_list'} style={{ marginBottom: "2px", background: this.state.dd_task2 == "incomplete" ? "#d3d3d37a" : "#fff" }}>
                                      <button style={{ border: 'none', backgroundColor: 'transparent', width: "100%" }} onClick={() => {
                                          this.setState({
                                              dd_task2: "incomplete",
                                              dd_task: "incomplete"
                                          })
                                          this.sort_data("incomplete")
                                      }}>
                                          <span className="nav_link" >Incomplete</span>
                                          <span className="rui-nav-circle"></span>
                                      </button>
                                  </li>
                                  <li className={this.state.dd_task2 == "All" ? 'yourClass' : 'drop_list'} style={{ marginBottom: "2px", background: this.state.dd_task2 == "All" ? "#d3d3d37a" : "#fff" }}>
                                      <button style={{ border: 'none', backgroundColor: 'transparent',whiteSpace:"nowrap"}} onClick={() => {
                                          this.setState({
                                              dd_task2: "All",
                                              dd_task: "All"
                                          })
                                          this.sort_data("All")
                                      }}>
                                          <span className="nav_link">All Task</span>
                                          <span className="rui-nav-circle"></span>
                                      </button>
                                  </li>
                              </Dropdown.Menu>
                          </Dropdown>
                      </span>
                      <span style={{ marginLeft: "-3px", marginRight: "10px" }}>of</span>
                      <span className="res">
                          <Dropdown
                              showTriangle
                              className="dib"
                          >
                              <Dropdown.Toggle tag="button" className="btn btn-brand drop_data">{this.state.dd_respon}
                              </Dropdown.Toggle>
                              <Dropdown.Menu tag="ul" className="nav nav_12" style={{width: "140px"}}>
                                  {
                                      this.state.responsible_array.map((value, index) => {
                                          //console.log(value.name, "ssssssss");
                                          var x = value;
                                          let y = index;
                                          return (
                                              <li key={index}
                                                  className={this.state.dd_respon == value.name ? 'yourClass' : ''} style={{ marginBottom: "2px", background: this.state.dd_respon == value.name ? "#d3d3d37a" : "#fff" }}
                                              >
                                                  <button style={{ border: 'none', backgroundColor: 'transparent', width: "100%" }} onClick={(e) => {
                                                      this.setState({
                                                          dd_respon: value.name,
                                                          employee_id: value._id,

                                                      })
                                                      this.sort_data2(value._id)
                                                  }}>
                                                      <span className="nav_link" >{value.name}</span></button>
                                                  <span className="rui-nav-circle"></span>
                                              </li>

                                          )
                                      }
                                      )}
                                  <li className={this.state.dd_respon == "All" ? 'yourClass' : ''} style={{ marginBottom: "2px", background: this.state.dd_respon == "All" ? "#d3d3d37a" : "#fff" }}>
                                      <button style={{ border: 'none', backgroundColor: 'transparent', width: "100%",whiteSpace:"nowrap"}} onClick={(e) => {
                                          this.setState({
                                              dd_respon: "All",
                                          })
                                          this.sort_data2("All")
                                      }}><span className="nav_link" >All</span></button>
                                      <span className="rui-nav-circle"></span>
                                  </li>


                              </Dropdown.Menu>
                          </Dropdown>
                      </span>
                  </h3>
                </div>
                <Button disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}   color="warning" className="btn-small add_btn" onClick={this.toggle} style={{ float: "right",marginTop:this.state.user_role == "Super Admin" ?  "-6px" : "", background:"#8bc240", color:"#fff", marginLeft: "auto", height:"37px"}}>
                    <span className="icon plus_data">
                        <Icon name="plus" />
                    </span>
                    <span className="add_task12">Add Task</span>
                </Button>
                </div>
                </PageTitle>

                <PageContent>
                <div className="rui-filemanager" style={{ display: this.state.task_array == [] ? "none" : "block" }}>
                <h3 className="heading" style={{ display: this.state.no_data,marginTop:gk}}>No data found</h3>
                    <div className="rui-filemanager-content">
                        <div className="table-responsive-lg">

                            <table className="table rui-filemanager-table table_imp" style={{ display: this.state.dd_task2 == "All" ? "block" : "none" }}>
                                <tbody style={{ display: "table" }}>
                                    {/*  <tr>
                                    <th className="rui-filemanager-table-name"  scope="row">
                                        <span className="rui-filemanager-file"   style={{backgroundColor:"transparent"}}  >
                                             Category
                                        </span>
                                    </th>
                                    <td className="rui-filemanager-table-size" ><span style={{backgroundColor:"transparent", whiteSpace:"nowrap"}} className="rui-filemanager-file">DATE For</span></td>
                                    <td className="rui-filemanager-table-size"><span style={{backgroundColor:"transparent"}}    className="rui-filemanager-file">TIME</span></td>
                                    <td className="rui-filemanager-table-size"><span style={{backgroundColor:"transparent", whiteSpace:"nowrap"}}    className="rui-filemanager-file">Contact For</span></td>
                                    <td className="rui-filemanager-table-date"><span style={{backgroundColor:"transparent"}}    className="rui-filemanager-file">Responsible</span></td>
                                    <td className="rui-filemanager-table-date"><span style={{backgroundColor:"transparent"}}    className="rui-filemanager-file">TASK NAME</span></td>


                                    <td className="rui-filemanager-table-icon">
                                         <span style={{backgroundColor:"transparent"}}    className="rui-filemanager-file">Action</span>
                                          </td>
                                    </tr>*/}





                                    <h3 className="heading today_data" style={{ display: this.state.task_array_3 == "" ? "none" : "block", color: "black" }}>Today{' '}({this.state.today_count})</h3>
                                    {
                                        this.state.task_array_3.map((value, index) => {
                                            var x = value;
                                            let ty = index;
                                            return (
                                                <tr key={index}>
                                                    <th className="rui-filemanager-table-name table_12" scope="row">
                                                        <span className="rui-filemanager-file table_pad" style={{ padding: "6px 28px", display: "flex" }}  >
                                                            {/*<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"   onChange={this.handleChange}/> */}
                                                            <div className="check_box12" style={{ height: "14px", marginTop: "1px" }}>

                                                                <CustomInput disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  className="form-check-input" type="checkbox" value={value.status} id={"formCheckbox" + ty} checked={value.status == "complete" ? true : false}
                                                                    onChange={(e) => {
                                                                        var rr = e.target.checked

                                                                        this.handleChange(rr, x._id)
                                                                        //console.log("value", x._id);
                                                                    }} />
                                                            </div>
                                                            <span className="table_break" style={{ textDecoration: value.status == "complete" ? "line-through" : "none" }}> {+  value.date_time == undefined ? "" : dateFormat(new Date(value.date_time.replace("Z", "")), "dd-mm-yyyy  hh:MM TT") +  "  " + value.remark +
                                                                "  " + "( Contact : "}  <span className="color12" style={{color:"rgb(26 8 122)"}}>{value.task_contact_for[0].label}</span>{" | " + " Task by : "} <span className="color12">{value.task_responsible_for[0].label}</span>{" ) "}</span>
                                                        </span>

                                                    </th>
                                                    <th className="rui-filemanager-table-size  " ><span style={{ whiteSpace: "nowrap", padding: "6px 28px" }} className="rui-filemanager-file table_add table_data">


                                                        <Icon disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  name="edit" className="sssp"
                                                            onClick={(index, value) => {
                                                                //console.log("value", value);
                                                                this.setState((prevState) => ({
                                                                    modalOpen: !prevState.modalOpen,
                                                                    coco: x,
                                                                }))
                                                                this.for_edit(x)
                                                                //console.log("value", x);
                                                            }}
                                                        />

                                                        <Icon disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  name="trash" className="icon_trash_1"
                                                            onClick={() => {
                                                                this.toggle_delete();
                                                                this.setState(() => ({
                                                                    delete_id: x._id
                                                                }))
                                                            }}
                                                        />
                                                    </span></th>
                                                </tr>
                                            )
                                        })
                                    }

                                    <h3 className="heading" style={{ display: this.state.task_array_2 == "" ? "none" : "block", color: "red" ,marginTop:"16px"}}>Overdue{' '}({this.state.overdue_count})</h3>
                                    {
                                        this.state.task_array_2.map((value, index) => {
                                            var x = value;

                                            let y = index;
                                            return (
                                                <tr key={index}>
                                                    <th className="rui-filemanager-table-name" scope="row" style={{ width: "100%" }}>
                                                        <span className="rui-filemanager-file table_pad" style={{ padding: "6px 28px", display: "flex" }}  >
                                                            {/*<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"   onChange={this.handleChange}/> */}
                                                            <div className="check_box12" style={{ height: "14px", marginTop: "1px" }}>
                                                                { /*<input className="form-check-input" type="checkbox" value={value.status} id="flexCheckChecked" checked = {value.status == "complete" ? true : false}
                                                      onChange={(e)=>{
                                                        var rr = e.target.checked

                                                        this.handleChange(rr,x._id)
                                                          //console.log("value", x._id);
                                                      }}/>*/}
                                                                <CustomInput disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  className="form-check-input" type="checkbox" value={value.status} id={"formCheckbox" + x._id} checked={value.status == "complete" ? true : false}
                                                                    onChange={(e) => {
                                                                        var rr = e.target.checked

                                                                        this.handleChange(rr, x._id)
                                                                        //console.log("value", x._id);
                                                                    }} />

                                                            </div>
                                                            <span className="table_break" style={{ textDecoration: value.status == "complete" ? "line-through" : "none" }}>  {+
                                                                value.date_time == undefined ? "" : dateFormat(new Date(value.date_time.replace("Z", "")), "dd-mm-yyyy  hh:MM TT") + " " + value.remark + "  " + "( Contact : "}
                                                                {/* <a href={my_link+ Buffer.from(value.task_contact_for[0].label).toString('base64')} >  */}
                                                                <span className="color12" style={{color:"rgb(26 8 122)"}}>{value.task_contact_for[0].label}</span>
                                                                {/* </a> */}
                                                                {" | " + " Task by : "} <span className="color12">{value.task_responsible_for[0].label}</span>{" ) "}</span>
                                                        </span>

                                                    </th>
                                                    <td className="rui-filemanager-table-size table_data" ><span style={{ whiteSpace: "nowrap", padding: "6px 28px" }} className="rui-filemanager-file table_data">

                                                        <Icon name="edit" className="sssp" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={(index, value) => {
                                                                //console.log("value", value);
                                                                this.setState((prevState) => ({
                                                                    modalOpen: !prevState.modalOpen,
                                                                    coco: x,
                                                                }))
                                                                this.for_edit(x)
                                                                //console.log("value", x);
                                                            }}
                                                        />
                                                        <Icon name="trash" className="icon_trash_1" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={() => {
                                                                this.toggle_delete();
                                                                this.setState(() => ({
                                                                    delete_id: x._id
                                                                }))
                                                            }}

                                                        />
                                                    </span></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <h3 className="heading" style={{ display: this.state.task_array_4 == "" ? "none" : "block", color: "#007bff" ,marginTop:"16px"}}>Upcoming{' '}({this.state.upcoming_count})</h3>
                                    {
                                        this.state.task_array_4.map((value, index) => {
                                            var x = value;
                                            let y = index;
                                            return (
                                                <tr key={index} >
                                                    <th className="rui-filemanager-table-name" scope="row" style={{ width: "100%" }}>
                                                        <span className="rui-filemanager-file table_pad" style={{ padding: "7px 28px", display: "flex" }}  >
                                                            {/*<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"   onChange={this.handleChange}/> */}
                                                            <div className="check_box12" style={{ height: "14px", marginTop: "1px" }}>
                                                                {/*<input className="form-check-input" type="checkbox" value={value.status} id="flexCheckChecked" checked = {value.status == "complete" ? true : false}
                                                      onChange={(e)=>{
                                                        var rr = e.target.checked

                                                        this.handleChange(rr,x._id)
                                                          //console.log("value", x._id);
                                                      }}/>*/}
                                                                <CustomInput disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  className="form-check-input" type="checkbox" value={value.status} id={"formCheckbox" + x._id} checked={value.status == "complete" ? true : false}
                                                                    onChange={(e) => {
                                                                        var rr = e.target.checked

                                                                        this.handleChange(rr, x._id)
                                                                        //console.log("value", x._id);
                                                                    }} />
                                                            </div>
                                                            <span className="table_break" style={{ textDecoration: value.status == "complete" ? "line-through" : "none" }}> {+     value.date_time == undefined ? "" : dateFormat(new Date(value.date_time.replace("Z", "")), "dd-mm-yyyy  hh:MM TT")  + "  " + value.remark.replace(/;;/g, "'") +
                                                                "  " + "( Contact : "} <span className="color12" style={{color:"rgb(26 8 122)"}}>{value.task_contact_for[0].label}</span> {" | " + " Task by : "} <span className="color12">{value.task_responsible_for[0].label}</span>{" ) "}</span>
                                                        </span>

                                                    </th>
                                                    <td className="rui-filemanager-table-size table_data" ><span style={{ whiteSpace: "nowrap", padding: "6px 28px" }} className="rui-filemanager-file table_data">

                                                        <Icon name="edit" className="sssp" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={(index, value) => {
                                                                //console.log("value", value);
                                                                this.setState((prevState) => ({
                                                                    modalOpen: !prevState.modalOpen,
                                                                    coco: x,
                                                                }))
                                                                this.for_edit(x)
                                                                //console.log("value", x);
                                                            }}
                                                        />
                                                        <Icon name="trash" className="icon_trash_1" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={() => {
                                                                this.toggle_delete();
                                                                this.setState(() => ({
                                                                    delete_id: x._id
                                                                }))
                                                            }}
                                                        />
                                                    </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <table className="table rui-filemanager-table table_imp" style={{ display: this.state.dd_task2 == "complete" ? "block" : "none" }}>
                                <tbody style={{ display: "table" }}>
                                    <h3 className="heading today_data" style={{ display: this.state.task_array_5 != "" ? "block" : "none", color: "black" }}>Complete{' '}({this.state.complete_count})</h3>
                                  {/*<h3 className="heading" style={{ display: this.state.task_array_5 == "" && this.state.dd_task2 == "complete" ? "block" : "none",marginTop:gk }}>No Data found</h3>*/}
                                    {
                                        this.state.task_array_5.map((value, index) => {
                                            //console.log("task_array_datakkkkkkkkkaaaaaaaaaa22222222", value);
                                            var x = value;
                                            let y = index;
                                            return (
                                                <tr key={index} style={{ width: "100%" }}>
                                                    <th className="rui-filemanager-table-name" scope="row" style={{ width: "100%" }}>
                                                        <span className="rui-filemanager-file table_pad" style={{ padding: "6px 28px", display: "flex" }}  >
                                                            {/*<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"   onChange={this.handleChange}/> */}
                                                            <div className="check_box12" style={{ height: "14px", marginTop: "1px" }}>
                                                                {/*<input className="form-check-input" type="checkbox" value={value.status} id="flexCheckChecked" checked = {value.status == "complete" ? true : false }
                                                   onChange={(e)=>{
                                                     var rr = e.target.checked

                                                     this.handleChange(rr,x._id)
                                                       //console.log("value", x._id);
                                                   }}/>*/}
                                                                <CustomInput disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  className="form-check-input" type="checkbox" value={value.status} id={"formCheckbox" + x._id} checked={value.status == "complete" ? true : false}
                                                                    onChange={(e) => {
                                                                        var rr = e.target.checked

                                                                        this.handleChange(rr, x._id)
                                                                        //console.log("value", x._id);
                                                                    }} />

                                                            </div>
                                                            <span className="table_break" style={{ textDecoration: value.status == "complete" ? "line-through" : "none" }}>
                                                                {+ value.date_time == undefined ? "" : dateFormat(new Date(value.date_time.replace("Z", "")), "dd-mm-yyyy  hh:MM TT") + " " + value.remark +
                                                                    "  " + "( Contact : "} <span className="color12" style={{color:"rgb(26 8 122)"}}>{value.task_contact_for[0].label}</span> {" | " + " Task by : "} <span className="color12">{value.task_responsible_for[0].label}</span>{" ) "}</span>
                                                        </span>

                                                    </th>
                                                    <td className="rui-filemanager-table-size table_data" ><span style={{ whiteSpace: "nowrap", padding: "6px 28px" }} className="rui-filemanager-file table_data">

                                                        <Icon name="edit" className="sssp" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={(index, value) => {
                                                                //console.log("value", value);
                                                                this.setState((prevState) => ({
                                                                    modalOpen: !prevState.modalOpen,
                                                                    coco: x,
                                                                }))
                                                                this.for_edit(x)
                                                                //console.log("value", x);
                                                            }}
                                                        />
                                                        <Icon name="trash" className="icon_trash_1" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={() => {
                                                                this.toggle_delete();
                                                                this.setState(() => ({
                                                                    delete_id: x._id
                                                                }))
                                                            }}

                                                        />
                                                    </span></td>


                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            <table className="table rui-filemanager-table table_imp" style={{ display: this.state.dd_task2 == "incomplete" ? "block" : "none" }}>
                                <tbody style={{ display: "table" }}>

                                    <h3 className="heading today_data" style={{ display: this.state.task_array_5 != "" ? "block" : "none", color: "black" }}>Incomplete{' '}({this.state.complete_count})</h3>
                                  {/*<h3 className="heading" style={{ display: this.state.task_array_5 == "" && this.state.dd_task2 == "incomplete" ? "block" : "none" ,marginTop:gk}}>No Data found</h3>*/}
                                    {
                                        this.state.task_array_5.map((value, index) => {
                                            // //console.log("task_array_datakkkkkkkkkaaaaaaaaaa22222222", this.task_array_data);
                                            var x = value;
                                            let y = index;
                                            return (
                                                <tr key={index} style={{ width: "100%" }}>
                                                    <th className="rui-filemanager-table-name" scope="row" style={{ width: "100%" }}>
                                                        <span className="rui-filemanager-file table_pad" style={{ padding: "7px 28px", display: "flex" }}  >
                                                            {/*<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"   onChange={this.handleChange}/> */}
                                                            <div className="check_box12" style={{ height: "14px", marginTop: "1px" }}>
                                                                {/*<input className="form-check-input" type="checkbox" value={value.status} id="flexCheckChecked" checked = {value.status == "complete" ? true : false }
                                                onChange={(e)=>{
                                                  var rr = e.target.checked

                                                  this.handleChange(rr,x._id)
                                                    //console.log("value", x._id);
                                                }}/>*/}
                                                                <CustomInput disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  className="form-check-input" type="checkbox" value={value.status} id={"formCheckbox" + x._id} checked={value.status == "complete" ? true : false}
                                                                    onChange={(e) => {
                                                                        var rr = e.target.checked

                                                                        this.handleChange(rr, x._id)
                                                                        //console.log("value", x._id);
                                                                    }} />
                                                            </div>
                                                            <span className="table_break" style={{ textDecoration: value.status == "complete" ? "line-through" : "none" }}>{+   value.date_time == undefined ? "" : dateFormat(new Date(value.date_time.replace("Z", "")), "dd-mm-yyyy  hh:MM TT") + "  " + value.remark +
                                                                "  " + "( Contact : "} <span className="color12" style={{color:"rgb(26 8 122)"}}>{value.task_contact_for[0].label}</span>{" | " + " Task by : "} <span className="color12">{value.task_responsible_for[0].label}</span>{" ) "}</span>
                                                        </span>

                                                    </th>
                                                    <td className="rui-filemanager-table-size table_data" ><span style={{ whiteSpace: "nowrap", padding: "6px 28px" }} className="rui-filemanager-file table_data">

                                                        <Icon name="edit" className="sssp" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={(index, value) => { 
                                                                //console.log("value", value);
                                                                this.setState((prevState) => ({
                                                                    modalOpen: !prevState.modalOpen,
                                                                    coco: x,
                                                                }))
                                                                this.for_edit(x)
                                                                //console.log("value", x);
                                                            }}
                                                        />
                                                        <Icon name="trash" className="icon_trash_1" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} 
                                                            onClick={() => {
                                                                this.toggle_delete();
                                                                this.setState(() => ({
                                                                    delete_id: x._id
                                                                }))
                                                            }}

                                                        />
                                                    </span></td>


                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    toggle={this.toggle}
                    className={this.props.className,"add_task_1 modal-dialog-centered"}
                    fade
                >
                    <div className="modal-header">
                        <h5 className="modal-title h2">{this.state.heading}</h5>
                        <Button className="close" color="" onClick={this.toggle}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <ModalBody>

                        <FormGroup>
                            <div className="row">
                            <div className="col-lg-6 col-md-6 my_date_pii_task">
                            <Label className=""> When Should it be done?</Label>
                            <DatePicker
                                selected={this.state.date}
                                onChange={(val) => {
                                    this.setState({
                                        date: val,
                                    });
                                }}
                                showTimeSelect
                                placeholder="Select Date and Time"
                                dateFormat="dd-MM-yyyy h:mm aa"
                                className="rui-datetimepicker form-control  mydate"
                            />
                            </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Remark</Label>
                            <Input type="textarea" name="email" id="emailInput1" placeholder="Remark" value={this.state.add_task.replace(/;;/g, "'")}
                                onChange={(e) => {
                                    this.setState({
                                        add_task: e.target.value,
                                    });
                                }} />
                        </FormGroup>
                        <FormGroup disabled>
                            <Label for="emailInput3">Contact for</Label>
                            <div className="TypeAheadDropDown">
                                <input className="form-control" onChange={(e) => {
                                    this.setState({
                                        text: e.target.value
                                    })
                                        this.onTextChange(e);

                                }} placeholder="Search Lead Name" value={this.state.text} type="text" />
                                {this.renderSuggestions()}
                            </div>

                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                        {' '}
                        <Button color="warning" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  style = {{color:"#fff"}} onClick={this.switch_function}>{this.state.button}</Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.modalOpen_delete}
                    toggle={this.toggle_delete}
                    className={this.props.className}
                    fade
                >
                  <ModalBody>
                    <div style={{ width: '100%', height: '20px' }}>
                      <Button className="close" color="" onClick={this.toggle_delete}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <div style={{ width: '100%', height: '50px' }}>
                      <h5 >Are you sure you want to Delete ?</h5>
                    </div>
                    <div style={{ height: '50px', width: '100%' }}>
                    <Button color="secondary" onClick={this.toggle_delete}>Close</Button>
                    {' '}
                    <Button color="warning" disabled={this.state.sales_management_control =="false" ? 'disabled' : ''}  style={{color:"#fff"}} onClick={() => { this.delete_task() }}>Yes</Button>
                    </div>
                    </ModalBody>
                </Modal>
                    </PageContent>
            </Fragment>
        );
    }
}

export default connect(({ auth, settings }) => (
    {
        auth,
        settings,
    }
), {
    addToast: actionAddToast, updateAuth: actionUpdateAuth
})(Content);
