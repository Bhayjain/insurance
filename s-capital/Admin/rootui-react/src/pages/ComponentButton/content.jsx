/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup,Table, Spinner} from 'reactstrap';
import { Link } from 'react-router-dom';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import PageTitle from '../../components/page-title';
// import { io } from "socket.io-client"
import Cookies from 'js-cookie';
import Badge from 'reactstrap/lib/Badge';
import {
    addToast as actionAddToast,
} from '../../actions';
import Dropdown from '../../components/bs-dropdown';
import socket from '../Socket';



const Highlighter = ({children, highlight}) => {
    console.log("children",children);
    //console.log("highlight",highlight);
    if (!highlight) return children;
    const regexp = new RegExp(highlight, 'g');
    //console.log("regexp",regexp);
    const matches = children.match(regexp);
    //console.log("matches",matches);
    var parts = children.split(new RegExp(`${highlight.replace()}`, 'g'));
    //console.log("parts",parts);

    for (var i = 0; i < parts.length; i++) {
      if (i !== parts.length - 1) {
        let match = matches[i];
        while(parts[i + 1] === '') {
          match += matches[++i];
        }

        parts[i] = (
            //console.log(parts,"__________________________"),
          <React.Fragment key={i}>
            {parts[i] }<span className="highlighted">{match}</span>

          </React.Fragment>
        );
      }
    }
    return <div className="highlighter">{parts}</div>;

  };
// //console.log("parts",parts);









// // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"



// var socket = io(api_url, {transport : ['WebSocket']});
//console.log("socket",socket);





const device_width =   window.innerWidth;
var height =   window.innerHeight;
//console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}

/**
 * Component
 */

 function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  //console.log("my_date",toMonthName(1));
  const admin_data = JSON.parse(Cookies.get('admin_data'));
  //console.log("admin_data",admin_data);
class Content extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            user_data_array:[],
            single_conversation_array:[],
            conversation_id:"",
            spinner_1: 'none',
            message_array:[],
            message_data:"",
            message_id:"",
            from_to_id:"",
            no_data_message:"none",
            conversation_data:"",
            mark_resolved:"",
            message_error : "none",
            user_role:admin_data[0].role.label,
            color:"",
            search_message:"",
            search_feild:0,
            page_no:1,
            is_last_data:false,
            spinner_1_1: 'none',
            isLoading:"block",
            search_user:"",
            current_page:1,
            total_pages:"",
            total:"",
            ipad_width:"none",
            ipad_emp_list:"block",
            support_management_control:Cookies.get('support_management_control'),
        };


        this.add_conversation=this.add_conversation.bind(this);
        this.markMatches = this.markMatches.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    markMatches(ev) {
        //console.log("ev",ev);
        let res = "Lorem ipsum dolor";
        const req = ev.target.value;
        if (req) {
          const normReq = req
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .sort((a, b) => b.length - a.length);
          res = res.replace(
            new RegExp(`(${normReq.join("|")})`, "gi"),
            match => "<mark>" + match + "</mark>"
          );
        }
        this.setState({
          res: res
        });
      }


    componentDidMount(){

        socket.on("connect", () => {
            //console.log("Socketttt_____________",socket.connected);
            //console.log("Socketttt_____________",socket.id);
            if (socket.connected==true) {
                this.update_socket_id_admin(socket.id)
            }
            else{
                //console.log("wronggg");
            }
           })

            socket.on('start_conversation_response', (data) => {
            this.get_conversation()
              })
            socket.on('add_conversation_response', (data) => {
              this.get_single_conversation(this.state.conversation_id,this.state.search_message,1)
              })

             this.get_conversation()

          }

          get_conversation(search_user,pageNumber){

            if (pageNumber == '' || pageNumber == undefined) {
              this.setState({
                  current_page: 1
              })
              var page_no = 1
          } else {
              this.setState({
                  current_page: pageNumber
              })
              var page_no = pageNumber
          }

          if (search_user=="" || search_user==undefined) {
            const usercookies = Cookies.get('usercookies');
            var conv_param = {
                page_no:page_no,
                user_id:usercookies,
                user_role:this.state.user_role,
                // search:search_user
             }
        }
        else{
          const usercookies = Cookies.get('usercookies');
            var conv_param = {
                page_no:page_no,
                user_id:usercookies,
                user_role:this.state.user_role,
                search:search_user
             }
        }


             //console.log("conv_param",conv_param);

                socket.emit('get_conversation', conv_param);
                socket.on('get_conversation_response', (data)=>{


                      //console.log('inside get_conversation_response =============',data);

                      if(data.data.status==true){
                          this.setState({
                              user_data_array : data.data.data,
                              no_data_message:"none",
                              isLoading:"none",
                              total_pages:data.data.total_pages,
                              total:data.data.total,
                          })
                        //   //console.log("user_data_array",this.state.user_data_array);
                        if (device_width < 769) {
                          //console.log("display lisit none");

                         }
                         else{
                          this.get_single_conversation(data.data.data[0]._id,this.state.search_message,1)
                         }

                      }
                      else{
                          this.setState({
                            user_data_array:[],
                            no_data_message:"block",
                            isLoading:"none"
                          })
                      }

                })
          }
          get_single_conversation(conversation_id,search,page_no){

            if (search=="" || search==undefined) {
                var conv_param = {
                    conversation_id:conversation_id,
                    page_no:page_no
                    // search:search
                 }
            }
            else{
                var conv_param = {
                    conversation_id:conversation_id,
                    search:search,
                    page_no:page_no
                 }
            }

             //console.log("conversation_id",conv_param);

                socket.emit('get_single_conversation', conv_param);
                socket.on('get_single_conversation_response', (data)=>{


                      //console.log('inside single_get_conversation_response =============',data);

                      if(data.data.status==true){

                        if (device_width < 769) {
                          var ipad_emp_list = "none";
                          //console.log("display lisit none", ipad_emp_list);
                         }
                         else{
                         var ipad_emp_list = "block"
                         //console.log("display lisit");

                         }


                        if (search == "" || search == undefined) {
                            // //console.log("message_array_12333",this.state.message_array_12333);
                            var message_array_new = data.data.data[0].message;
                            for (let i = 0; i < message_array_new.length; i++) {
                                message_array_new[i].show_message_data= message_array_new[i].message
                            }
                            this.setState({
                                message_array:message_array_new

                            })
                        }else{
                            var message_array_new = data.data.data[0].message;
                            for (let i = 0; i < message_array_new.length; i++) {
                                if(message_array_new[i].message_from == 'user_to_admin' || message_array_new[i].message_from == 'admin_to_user'){
                                    if (message_array_new[i].search_result == true) {
                                        // //console.log("search_______________*************",search);
                                        const element = message_array_new[i].message;
                                        // //console.log("element_______________*************",element);

                                        let res = element;
                                        const req = search;
                                        if (req) {
                                          const normReq = req
                                            .toLowerCase()
                                            .replace(/\s+/g, " ")
                                            .trim()
                                            .split(" ")
                                            .sort((a, b) => b.length - a.length);
                                          res = res.replace(
                                            new RegExp(`(${normReq.join("|")})`, "gi"),
                                            match => "<strong class= 'highlighted'>" + match + "</strong>"
                                          );
                                        }
                                        message_array_new[i].show_message_data= res
                                        // //console.log("reddddddd",res);
                                        this.setState({
                                            message_array_12333:res,
                                        })
                                    }

                                }

                                // //console.log("message_array_12333",this.state.message_array_12333);
                            }
                            // //console.log("message_array_new",message_array_new);
                            this.setState({
                                message_array:message_array_new,
                                color_1:"black"
                            })
                        }





                        var message_id = data.data.data[0].message.length

                          this.setState({
                              single_conversation_array : data.data.data,
                              conversation_id:data.data.data[0]._id,
                            //   message_array:data.data.data[0].message,
                              message_id:data.data.data[0].message[message_id-1].message_id,
                              from_to_id:data.data.data[0].from_id,
                              conversation_data:data.data.data[0].conversation,
                              mark_resolved:data.data.data[0].resolved,
                              is_last_data:data.data.data[0].is_last,
                              spinner_1: 'none',
                              spinner_1_1:'none',
                              ipad_width:"block",
                              ipad_emp_list:ipad_emp_list
                          })
                      }
                      else{
                          this.setState({
                            single_conversation_array:[],
                            message_array:[],
                            spinner_1: 'none',
                            spinner_1_1:'none'
                          })
                      }

                })
          }
          handleScroll = e => {
            // var page_no = 1;
            let element = e.target;
            //console.log("page_no", this.state.page_no);
            var page_no =this.state.page_no
            var abc = page_no + 1
            if (element.scrollTop===0) {
            if (this.state.is_last_data===false) {
                this.setState({
                    page_no:abc,
                    spinner_1_1:"block"
                })
                //console.log("spinner_1_1spinner_1_1",this.state.spinner_1_1);
                setTimeout(() => {
                    this.get_single_conversation(this.state.conversation_id,this.state.search_message,this.state.page_no)

                }, 600);
            }
        }
            //console.log("page_no...",this.state.page_no);
            //console.log("page_no...",this.state.page_no);
          }

        //     handleScroll = e => {
        //     //console.log("is_last_data",this.state.is_last_data);
        //     // let element = e.target;
        //     // if (element.scrollTop===0) {
        //         var page_no =1
        //         if (this.state.is_last_data===false) {
        //                 page_no = page_no + page_no
        //                 //console.log("Scrollllllllllllllllllll",page_no);
        //                 this.setState({
        //                     page_no:page_no
        //                 })
        //       this.get_single_conversation(this.state.conversation_id,this.state.search_message,page_no)
        //         }
        //         else{
        //             //console.log("not_doneeeeee");
        //         }

        //     // }
        //  }

          update_socket_id_admin = (socket_id) => {
            const usercookies = Cookies.get('usercookies');
            var params = {
                user_id:usercookies,
                socket_id:socket_id
            }
            //console.log("update_socket_id_admin_params", params);
            const res = fetch(api_url + "update_socket_id_admin", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
              //console.log('inside update_socket_id_admin_response =============',json)
            })
        }


          add_conversation=()=>{
            const {
                addToast
            } = this.props;
               const usercookies = Cookies.get('usercookies');
               var date = new Date();
                //console.log("date",date);
                var dd = String(date.getDate()).padStart(2, '0');
                var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                var months=toMonthName(mm)
                //console.log("my_date",months);
                var yyyy = date.getFullYear();
                var hours = date.getHours();
                const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
                //console.log("timetime",time);
                var am_pm = (hours >= 12) ? "PM" : "AM";
                if(hours >= 12){
                    hours -=12;
                }
                var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
                //console.log("my_new_date",my_new_date);


            var conv_param = {
                conversation_id:this.state.conversation_id,
                message:this.state.message_data,
                type:"support",
                from_id:usercookies,
                to_id:this.state.from_to_id,
                date_time:my_new_date,
                message_id:this.state.message_id + 1,
                message_from:"admin_to_user",
             }
             //console.log("add_conv_param",conv_param);

             if (conv_param.message=="" || conv_param.message==undefined ) {
                 this.setState({
                     message_error : "block"
                 })
                 //console.log("blank input");

             }
             else{
                socket.emit('add_conversation', conv_param);
                socket.on('add_conversation_response', (data)=>{
                      console.log('inside add_conversation_response =============',data);

                      if(data.data.status==true){
                        // addToast({
                        //     title: 'Add my policy',
                        //     content: "Message Send Successfully",
                        //     time: new Date(),
                        //     duration: 1000,
                        // });
                          this.setState({
                              message_data : "",
                              message_error : "none"
                          })
                          this.get_single_conversation(this.state.conversation_id)
                      }
                      else{
                        // addToast({
                        //     title: 'Add my policy',
                        //     content: data.data["message"],
                        //     time: new Date(),
                        //     duration: 1000,
                        // });
                          //console.log("nooooooo");
                      }

                })
             }


          }


          close_conversation(conversation_id){
            const {addToast} = this.props;
            const usercookies = Cookies.get('usercookies');
            var conv_param = {
                conversation_id:conversation_id,
                user_id:usercookies
             }
             //console.log("close params",conv_param);

                socket.emit('close_conversation', conv_param);
                socket.on('close_conversation_response', (data)=>{


                      //console.log('inside close_conversation_response =============',data);

                      if(data.data.status==true){
                        addToast({
                            title: 'Add my policy',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                          this.get_single_conversation(this.state.conversation_id)
                      }
                      else{
                        addToast({
                            title: 'Add my policy',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                      }

                })
          }
          open_conversation(conversation_id){
            const {addToast} = this.props;
            var conv_param = {
                conversation_id:conversation_id,
             }
             //console.log("open params",conv_param);

                socket.emit('open_conversation', conv_param);
                socket.on('open_conversation_response', (data)=>{


                      //console.log('inside open_conversation_response =============',data);

                      if(data.data.status==true){
                        addToast({
                            title: 'Add my policy',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                          this.get_single_conversation(this.state.conversation_id)
                      }
                      else{
                        addToast({
                            title: 'Add my policy',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                      }

                })
          }

          resolved_conversation(conversation_id){
            const usercookies = Cookies.get('usercookies');
            const {addToast} = this.props;
            var conv_param = {
                conversation_id:conversation_id,
                user_id:usercookies,
                resolved:true
             }
             //console.log("resolved params",conv_param);

                socket.emit('resolved_conversation', conv_param);
                socket.on('resolved_conversation_response', (data)=>{


                      //console.log('inside resolved_conversation_response =============',data);

                      if(data.data.status==true){
                        addToast({
                            title: 'Add my policy',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                          this.get_single_conversation(conversation_id)
                      }
                      else{
                        addToast({
                            title: 'Add my policy',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                      }

                })
          }

          componentWillUnmount(){
            socket.off('add_conversation_response');
            socket.off('start_conversation_response');
            socket.off('get_single_conversation_response');
            socket.off('get_conversation_response');
            socket.off('close_conversation_response');
            socket.off('open_conversation_response');
            socket.off('resolved_conversation_response');



            //console.log("opennnnnnnnnnnnnnnnnnnnnnn");

        }

        searchFilter = (event)=>{
            //console.log("event",event);
            const filteredDetail = this.state.message_array.filter((data)=>{
                if(data?.message.toLowerCase().includes(event.toLowerCase())){
                    return data
                }
            })
            //console.log("filteredDetail",filteredDetail);
            this.setState({
                message_array:filteredDetail,
                color:"#d0d0d0",
                word_data:event
            })
            //console.log("message_array",this.state.message_array);
            //console.log("word_data",this.state.word_data);
        }
        searchFilter_1 = (event)=>{
            //console.log("event",event);
            var meeee = this.state.message_array
            for(var i=0;i<meeee.length;i++){
              var show_message =  meeee[i].message
            //   //console.log(meeee[i].message);
            if (meeee[i].message.match(event)) {
                //console.log("meeee[i].message.match(event)",meeee[i].message.match(event));
                // //console.log("khuuuuuu", meeee[i].message);
                this.setState({
                    color:"red"
                })
            }
            // else{
            //     //console.log("pppppppppp");
            //     this.setState({
            //         color:""
            //     })
            // }
            }
            // message.match(this.state.search_message)

        }



        // show_search_feild = () => {
        //     //console.log("show_search_feild");
        //     this.setState({
        //         show_search_feild
        //     })
        //     }

            previous = () => {
                currentIdx = currentIdx - 1 < 0 ? elems.length - 1 : currentIdx - 1;
                elems[currentIdx].scrollIntoView();
            }
            handleOnSearch = (data) => {
                //console.log("jhbdcjhs",data);
                this.setState({search_feild:data});
                // //console.log("search_feild",this.state.search_feild);
              }

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
                              this.get_conversation(this.state.search_user,number)
                                  , this.setState({
                                      current_page: number
                                  })
                          }}

                      >{number}</Button>
                      <Button color="warning" outline
                      style={{
                          display: this.state.current_page === number ? this.state.current_page === this.state.total_pages ? "none" : "block" : 'none',
                          backgroundColor: this.state.current_page === number ? '' : '#8bc240', color: this.state.current_page === number ? '#8bc240' : 'white' }}
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.get_conversation(this.state.search_user,number + 1)
                              if (this.state.current_page === this.state.total_pages) {
                                  this.setState({
                                      current_page: number
                                  })
                              } else {
                                  this.setState({
                                      current_page: number + 1
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
                <PageTitle className="support_title test_collapse">
                  <div className="kkkk_new" style={{display:"inline-flex",width:"100%"}}>
                    <h1 className="support_1" style={{marginBottom:"0px",marginTop:"-2px"}}>Support</h1>
                    <input
                       style={{marginLeft:"40px"}}
                       type="text"
                       className="form-control my_search_message support_2 support_2_1"
                       aria-describedby="emailHelp"
                       placeholder="Search User"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                      this.get_conversation(e.target.value,this.state.current_page)
                       }}
                  />
                    <div style={{display:"inline-flex",width:"100%",padding:"0px 4px",justifyContent:"flex-end"}}>
                            <input
                                        style={{marginRight:"5px",display:this.state.search_feild==1 ? "block":"none"}}
                                        type="text"
                                        className="form-control my_search_message support_2 meassge_dta_1"
                                        aria-describedby="emailHelp"
                                        placeholder="Search Messages"
                                        value={this.state.search_message}
                                        onChange={(e) => {
                                         this.setState({
                                            search_message:e.target.value
                                         })
                                         this.get_single_conversation(this.state.conversation_id,e.target.value)
                                        //  this.searchFilter_1(e.target.value)

                                        }}
                                    />

                                   <Icon name="search" style={{display: device_width < 769 ? this.state.ipad_width : "block"}} className="search_dtaaa" onClick={()=>this.handleOnSearch(1)}/>
                                    {/* <Icon name="chevron-down" />  */}

                                    <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                  <Button className="" style={{ marginLeft: "5px", height: 'min-content', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",marginTop:'7px'}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back <Icon name="arrow-left" className=""/></Button>
                                    {/* <Icon name="arrow-left" className=""/> */}
                                    </div>
                            </div>
                    </div>
                </PageTitle>

                {/* <div className='app'>
        <input type="text" value={this.state.search} className="search"  onChange={(e) => {
                                         this.handleOnSearch(e.target.value)


                                        }} />
        <div className="text">
          <Highlighter highlight={this.state.search}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Highlighter>
        </div>
      </div> */}









            <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
              {/* <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} /> */}

              <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                <h3 style={{display:this.state.no_data_message=="block" ? "block":"none",textAlign:"center",color:"#9e9999",marginTop:gk}}>No Data Found</h3>
                <div style={{display:this.state.no_data_message=="none" ? "block":"none"}}>
                <div className="row test_collapse my_support_row">
                    <div className="col-lg-4 col-md-12 col-sm-12 " style={{paddingRight:"0px"}}>
                    <div className="height_13 mycalendar" style={{height:my_height-67,display: this.state.ipad_emp_list}}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="col" style={{padding:"15px 25px"}}>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user_data_array.map((value,index)=>{

                                return(
                                 <tr style={{cursor:"pointer"}} key={index} onClick={() => {
                                    this.setState({
                                      spinner_1: 'block'
                                    })
                                    setTimeout(() => {
                                      this.get_single_conversation(value._id,this.state.search_message,1)
                                    }, 600)
                                  }}>
                                  <td style={{borderLeft:value._id == this.state.conversation_id ? "10px solid  #8bc240" : "",padding:"10px 25px"}}>{value.user_detail[0].full_name}</td>
                                 </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                    <div style={{display:this.state.total_pages==1?"none":'inline-flex',width:"100%",marginTop:"-4px",marginBottom:"20px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.get_conversation(this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                      this.get_conversation(this.state.search_user,this.state.current_page - 1)
                                  } else {
                                      this.get_conversation(this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >Previous</Button>
                                {/*{renderPageNumbers}*/}
                                {renderPageNumbers}

                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page == this.state.total_pages ? '#8bc240' : '',
                              display: this.state.current_page == this.state.total_pages ? "none" : "block",
                              color: this.state.current_page == this.state.total_pages ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page < this.state.total_pages) {
                                      this.get_conversation(this.state.search_user,this.state.current_page + 1)
                                  } else {
                                      this.get_conversation(this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.get_conversation(this.state.search_user,this.state.total_pages)}>last</Button>
                            </div>
                    </div>




                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 test_collapse padd_imggg" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                    <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />

                        <div style={{display: this.state.spinner_1=="none" ? "block":"none"}}>

                            {/* <div>
                                <Button className="my_btn_data" style={{backgroundColor:"rgb(107, 184, 197)",borderColor:"rgb(107, 184, 197)",display:this.state.conversation_data=="open" ? "inline-flex":"none"}} onClick={() => {
                                  this.close_conversation(this.state.conversation_id)
                                  }}>Close Conversation</Button>
                                <Button className="my_btn_data" style={{backgroundColor:"rgb(107, 184, 197)",borderColor:"rgb(107, 184, 197)",display:this.state.conversation_data=="close" ? "inline-flex":"none"}} onClick={() => {
                                  this.open_conversation(this.state.conversation_id)
                                  }}>Open Conversation</Button>
                                <Button className="my_btn_data" style={{backgroundColor:"#0b4f98",borderColor:"#0b4f98"}} disabled={this.state.mark_resolved==true ? 'disabled':''} onClick={() => {
                                  this.resolved_conversation(this.state.conversation_id)
                                  }}>{this.state.mark_resolved==false ? "Mark Resolve" :"Marked Resolve"}  </Button>
                            </div> */}
                            {/* <div style={{display:"inline-flex",width:"100%",marginTop:"5px",padding:"0px 4px",justifyContent:"flex-end"}}>
                            <input
                                        style={{marginRight:"5px",display:this.state.search_feild==1 ? "block":"none"}}
                                        type="text"
                                        className="form-control my_search_message"
                                        aria-describedby="emailHelp"
                                        placeholder="Search Here..."
                                        value={this.state.search_message}
                                        onChange={(e) => {
                                         this.setState({
                                            search_message:e.target.value
                                         })
                                         this.get_single_conversation(this.state.conversation_id,e.target.value)
                                        //  this.searchFilter_1(e.target.value)

                                        }}
                                    />
                                   <Icon name="search" className="search_dtaaa" onClick={()=>this.handleOnSearch(1)}/>
                                    <Icon name="chevron-down" />
                            </div> */}



                        <div className="message_box  test_collapse"  onScroll={this.handleScroll} style={{ height:( my_height-165)}}>
                        <Spinner color="warning" className="employee_spinner_1" style={{marginTop: (-gk),display: this.state.spinner_1_1 }} />




                        <div style={{display:this.state.spinner_1_1=="none" ? "block":"none"}}>
                                {this.state.message_array.map((value, index) => {

                                    return (
                                        <div style={{ width: "100%" }} key={index}>
                                        <div className="show_token_1" style={{display:value.message_from == "show_token" ? "block":"none",textAlign:"center"}}>
                                           <Badge color="secondary" style={{padding: "7px 15px",backgroundColor:"#8c8c8c"}}>
                                           <span dangerouslySetInnerHTML={{ __html: value.message}}></span>
                                           </Badge>
                                        </div>
                                        <div className="show_token_1_1" style={{display:value.message_from == "badge_message" ? "block":"none",textAlign:"center"}}>
                                           <Badge color="secondary" style={{padding: "7px 15px",backgroundColor:"#8c8c8c"}}>
                                           <span>{value.contacted_user.full_name}{" "}{value.message}</span>
                                           </Badge>
                                        </div>
                                            <div className={value.message_from == "admin_to_user" ? 'overclass_user' : 'overclass_admin'} style={{ float: value.message_from == "admin_to_user" ? "right" : "left" }}>
                                                <div  style={{display:value.message_from == "show_token" || value.message_from == "badge_message" ? "none":"block"}} className={value.message_from == "admin_to_user" ? 'grey_msg' : 'purple_msg'}>
                                                    <span dangerouslySetInnerHTML={{ __html: value.show_message_data}}>

                                                    </span>

                                                </div>

                                               <div style={{ float: value.message_from == "admin_to_user" ? 'right' : 'left', width: "100%",display:value.message_from == "show_token" || value.message_from == "badge_message" ? "none":"block" }} className="ggg">
                                                    <span style={{ float: value.message_from == "admin_to_user" ? 'right' : 'left', fontSize: "10px", color: "#ababab" }}>
                                                        <span>{value.date_time}</span>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })

                                }

                                <br />
                                </div>
                            </div>

                            <div className="my_input_new_suppoorttt" style={{display:"inline-flex",width:"100%"}}>
                            <input
                                        style={{marginRight:"15px"}}
                                        type="text"
                                        className="form-control meesage_div_input_suppoet"
                                        aria-describedby="emailHelp"
                                        placeholder="Write Message..."
                                        value={this.state.message_data}
                                        onChange={(e) => {
                                         this.setState({
                                            message_data:e.target.value
                                         })

                                        }}
                                    />
                                   <Button disabled={this.state.support_management_control =="false" ? 'disabled' : ''} color="brand" className="send_btn" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240"}} onClick={ this.add_conversation}><Icon name="send"  className="send_icon_ntnnn"/></Button>
                                   {/* <Icon name="more-vertical" className="card_icon" /> */}
                                   <Dropdown
                                        tag="div"
                                        className="btn-group my_droppppppppppppp"
                                        openOnHover
                                        showTriangle
                                        style={{marginLeft:"8px",pointerEvents:this.state.support_management_control =="false" ? "none" :"" }}
                                    >
                                        <Dropdown.Toggle tag="a"  className="dropdown-item my_droppppppppppppp">
                                        <Icon name="more-vertical" className="card_icon_1" />
                                            <span className="rui-nav-circle"></span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu tag="ul" className="nav">
                                            <li aria-hidden="true" style={{display:this.state.conversation_data=="open" ? "inline-flex":"none"}} onClick={() => {
                                                  this.close_conversation(this.state.conversation_id)
                                                  }}>
                                                <Link to="#" className="nav-link">
                                                    <Icon name="slash" />
                                                    <span>Close Conversation</span>
                                                    <span className="rui-nav-circle"></span>
                                                </Link>
                                            </li>
                                            <li aria-hidden="true" onClick={() => {
                                                this.open_conversation(this.state.conversation_id)
                                                }} style={{display:this.state.conversation_data=="close" ? "inline-flex":"none"}}>
                                                <Link to="#" className="nav-link">
                                                    <Icon name="mail" />
                                                    <span>Open Conversation</span>
                                                    <span className="rui-nav-circle"></span>
                                                </Link>
                                            </li>
                                            <li disabled={this.state.mark_resolved==true ? 'disabled':''} aria-hidden="true" onClick={() => {
                                                  this.resolved_conversation(this.state.conversation_id)
                                                  }}>
                                                <Link to="#" className="nav-link">
                                                    <Icon name="check-circle" />
                                                    <span>{this.state.mark_resolved==false ? "Mark Resolve" :"Marked Resolve"}</span>
                                                    <span className="rui-nav-circle"></span>
                                                </Link>
                                            </li>
                                        </Dropdown.Menu>
                                    </Dropdown>

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
