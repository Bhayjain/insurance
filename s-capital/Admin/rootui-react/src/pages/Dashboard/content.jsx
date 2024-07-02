/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import { Row, Col } from 'reactstrap';

/**
 * Internal Dependencies
 */
import Carousel from './components/carousel';
import WidgetMemory from './components/widget-memory';
import WidgetDisc from './components/widget-disc';
import WidgetCPU from './components/widget-cpu';
import WidgetTasks from './components/widget-tasks';
import WidgetUploads from './components/widget-uploads';
import WidgetActivity from './components/widget-activity';
import Map from './components/map';
import WidgetCountries from './components/widget-countries';
import PageTitle from '../../components/page-title';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import socket from '../Socket';


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
    constructor( props ) {
        super( props );
        this.state={
            active_campaign:"",
            call_attempted:"",
            leads:"",
            disposed:"",
            closed:"",
            avg_call_time:"",
            isLoadingDashContact:true,

            contact_uploaded:"",
            open_leads:"",
            pending_with_telecaller:"",
            scheduled:"",
            not_connected:"",
            closed_contact:"",
            isLoadingDashCampagian:true,

            active_telecaller:"",
            break_telecaller:"",
            total_call_time:"",
            break_time_telecaller:"",
            total_login_hours:"",
            isLoadingDashTelecaller:true,
        }
      
       this.telecaller_dashboard_stats(); 
    //    this.dashboard_contact_stats(); 
    //    this.dashboard_campaign_stats() ;
    //    this.dashboard_telecaller_stats(); 
    }


    componentDidMount() {
        socket.on('telecaller_dashboard_module_response', (data)=>{
          console.log('inside Live Result Response =============&&&&&&&',data);
           this.telecaller_dashboard_stats()
    })
   }



    telecaller_dashboard_stats = () =>{
        
        socket.emit('telecaller_dashboard_stats');
          socket.on('telecaller_dashboard_stats_response', (data)=>{
             console.log('inside telecaller_dashboard_stats_response =============&&&&&&&',data);
            if (data.data.status == true) {
              this.setState({

                //  Contact Stats
                contact_uploaded:data.data.contact_uploaded,
                open_leads:data.data.open_leads,
                pending_with_telecaller:data.data.pending_with_telecaller,
                scheduled:data.data.scheduled,
                not_connected:data.data.not_connected,
                closed_contact:data.data.closed,
                isLoadingDashContact:false,

                // Campaign Stat
                active_campaign:data.data.data.active_campaign,
                call_attempted:data.data.data.call_attempted,
                leads:data.data.data.leads,
                disposed:data.data.data.disposed,
                closed:data.data.data.closed,
                avg_call_time:data.data.data.avg_call_time,
                isLoadingDashCampagian:false,

                //  telecaller Stats

                active_telecaller:data.data.data.active,
                break_telecaller:data.data.data.break,
                total_call_time:data.data.data.total_call_time,
                break_time_telecaller:data.data.data.break_time,
                total_login_hours:data.data.data.total_login_hours,
                isLoadingDashTelecaller:false,
              })
            
                socket.off("telecaller_dashboard_stats_response")
             }
             else {
              this.setState({
                // array_of_excel:[],
                // isLoading:false,
                // no_data_message:"block",
                // isLoadingSingle:false
              })
             }
       })
    }

    dashboard_contact_stats = ()=>  {
        const { settings,addToast } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/dashboard_contact_stats", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Al Contact Dash***************", json)
                 var data = json;
                 this.setState({
                    
                    contact_uploaded:data.contact_uploaded,
                    open_leads:data.open_leads,
                    pending_with_telecaller:data.pending_with_telecaller,
                    scheduled:data.scheduled,
                    not_connected:data.not_connected,
                    closed_contact:data.closed,
                    isLoadingDashContact:false,

                    
                   })
             })
          }

    dashboard_telecaller_stats = ()=>  {
        console.log("dashboard_telecaller_stats");
        const { settings,addToast } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/dashboard_telecaller_stats", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Al Telecaller Dash***************", json)
                 var data = json;
                 this.setState({
                    active_telecaller:data.data.active,
                    break_telecaller:data.data.break,
                    total_call_time:data.data.total_call_time,
                    break_time_telecaller:data.data.break_time,
                    total_login_hours:data.data.total_login_hours,
                    isLoadingDashTelecaller:false,
                   })
             })
          }

    dashboard_campaign_stats = ()=>  {
        console.log("dashboard_campaign_stats");
        const { settings,addToast } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/dashboard_campaign_stats", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Al Campaign Dash***************", json)
                 var data = json;
                 this.setState({
                    active_campaign:data.data.active_campaign,
                    call_attempted:data.data.call_attempted,
                    leads:data.data.leads,
                    disposed:data.data.disposed,
                    closed:data.data.closed,
                    avg_call_time:data.data.avg_call_time,
                    isLoadingDashCampagian:false,
                   })
             })
          }

   

    render() {
        return (
            <Fragment>
                <PageTitle className="dashboard_page">
                    <h1>Dashboard</h1>
                </PageTitle>
                <div className="heading_opeartion" style={{height:my_height-67,padding:"2px 11px"}}>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="box_shadow">
                              <h3 className="stats_heading">Contact Stats</h3>
                              <hr className="hr_newww" style={{marginTop:"3px"}}/>
                              <div className="row test_collapse">
                                  <div  className="col-lg-6 col-md-6 padd_both_rem" style={{textAlign:"center"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Contact uploaded </span>
                                            {this.state.isLoadingDashContact ? 
                                             <Skeleton width={50} height={28} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#2fc787"}}>{this.state.contact_uploaded}</span>
                                            }
                                        </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem" style={{textAlign:"center"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Open Leads</span>
                                            {this.state.isLoadingDashContact ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#8062D6"}}>{this.state.open_leads}</span>
                                            }
                                         </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Pending with Telecaller</span>
                                            {this.state.isLoadingDashContact ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#8C3333"}}>{this.state.pending_with_telecaller}</span>
                                             }
                                        </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Scheduled</span>
                                            {this.state.isLoadingDashContact ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#1D5D9B"}}>{this.state.scheduled}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Not Connected</span>
                                            {this.state.isLoadingDashContact ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#F86F03"}}>{this.state.not_connected}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Closed</span>
                                            {this.state.isLoadingDashContact ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#FE0000"}}>{this.state.closed_contact}</span>
                                            }
                                            </div>
                                  </div>
                             </div>
                            </div>
                              
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box_shadow">
                              <h3 className="stats_heading">Telecaller Stats</h3>
                              <hr className="hr_newww" style={{marginTop:"3px"}}/>
                              <div className="row">
                                  <div  className="col-lg-6 col-md-6 padd_both_rem" style={{textAlign:"center"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Active State</span>
                                            {this.state.isLoadingDashTelecaller ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse"  style={{color:"#2fc787"}}>{this.state.active_telecaller}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem" style={{textAlign:"center"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Break State</span>
                                            {this.state.isLoadingDashTelecaller ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#22A699"}}>{this.state.break_telecaller}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Total Calls start time</span>
                                            {this.state.isLoadingDashTelecaller ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse"  style={{color:"#F2BE22"}}>{this.state.total_call_time}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Break time</span>
                                            {this.state.isLoadingDashTelecaller ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse"  style={{color:"#F29727"}}>{this.state.break_time_telecaller}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Total Login Hours</span>
                                            {this.state.isLoadingDashTelecaller ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse"  style={{color:"#F24C3D"}}>{this.state.total_login_hours}</span>
                                            }
                                            </div>
                                  </div>
                                  {/* <div  className="col-lg-4 col-md-4" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Avg call time</span>
                                            <span className="sub_data_haed">1</span>
                                        </div>
                                  </div> */}
                             </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box_shadow">
                              <h3 className="stats_heading">Campaign Stats</h3>
                              <hr className="hr_newww" style={{marginTop:"3px"}}/>
                              <div className="row">
                                  <div  className="col-lg-6 col-md-6 padd_both_rem" style={{textAlign:"center",paddingRight:"0px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Active Campaign </span>
                                            {this.state.isLoadingDashCampagian ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse"  style={{color:"#2fc787"}}>{this.state.active_campaign}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem" style={{textAlign:"center"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Calls Attempted</span>
                                            {this.state.isLoadingDashCampagian ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#0B666A"}}>{this.state.call_attempted}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Leads</span>
                                            {this.state.isLoadingDashCampagian ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#4E4FEB"}}>{this.state.leads}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Disposed</span>
                                            {this.state.isLoadingDashCampagian ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#1B6B93"}}>{this.state.disposed}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Closed</span>
                                            {this.state.isLoadingDashCampagian ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#F24C3D"}}>{this.state.closed}</span>
                                            }
                                            </div>
                                  </div>
                                  <div  className="col-lg-6 col-md-6 padd_both_rem ipad_botton" style={{textAlign:"center",marginTop:"15px"}}>
                                        <div className="rui-changelog-item rui-changelog-success">
                                            <span className="sub_heading">Avg call time</span>
                                            {this.state.isLoadingDashCampagian ? 
                                             <Skeleton width={50} height={20} />
                                             :
                                            <span className="sub_data_haed test_collapse" style={{color:"#606C5D"}}>{this.state.avg_call_time}</span>
                                            }
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
) )( Content );
