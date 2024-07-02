/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Tree from 'rc-tree';
import Select from 'react-select';


/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import TextEditor from '../../components/text-editor';
import {
    addToast as actionAddToast,
} from '../../actions';
import PageTitle from '../../components/page-title';
import { Row, Col, Button,Input,Label,Modal, ModalBody,} from 'reactstrap';
import Cookies from 'js-cookie';

/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            add_quotation_message: "",
            add_policy_message: "{{Customer Name}}",
            quotation_message_error: "Quotation Message must contain a {{Customer Name}} character",
            policy_message_error: "Policy Message must contain a {{Customer Name}} character",
            editorContent: '',
            dynamicVariables: [],

            greeting:"",
            user_name:"{{Customer Name}}",
            other_messages:"",
            add_quotation_message_new:"{{Customer Name}}",

            policy_greeting:"",
            policy_user_name:"Name",
            policy_other_messages:"",
            final_message:"{{Customer Name}} [CONTACT]",
            blan_array:[],
            LeadSubAlertDelete:false,
            LeadSubAlertPolicy:false,
            master_control_12 : Cookies.get('master_control')
            
        };
        this.fetch_quotation_msg()
        this.fetch_policy_msg()
        this.handleChangeNote = this.handleChangeNote.bind( this );
        this.handleChangeNoteFinal = this.handleChangeNoteFinal.bind( this );
        this.handleChangePolicy = this.handleChangePolicy.bind( this );
      this.LeadSubAlertDelete = this.LeadSubAlertDelete.bind( this );
      this.LeadSubAlertPolicy = this.LeadSubAlertPolicy.bind( this );

    }


    LeadSubAlertDelete() {
        this.setState((prevState) => ({
          LeadSubAlertDelete: !prevState.LeadSubAlertDelete,
        }));
      }

    LeadSubAlertPolicy() {
        this.setState((prevState) => ({
          LeadSubAlertPolicy: !prevState.LeadSubAlertPolicy,
        }));
      }

    handleChangeNoteFinal(e) {
        var newValue = e.target.value
        if (newValue.includes("{{Customer Name}}")) {
            this.setState({
                final_message:e.target.value,
            })  
        }
    }

    handleChangeNote(html) {
        // var newValue = html
        // if (newValue.includes("{{Customer Name}}")) {
        //    console.log("html.includes('{{Customer Name}}'",html.includes("{{Customer Name}}"));
        //     this.setState({
        //         add_quotation_message_new: html,
        //     }) 
        // }

        this.setState({
            add_quotation_message_new: html,
            quotation_message_error: "Quotation Message must contain a {{Customer Name}} character",
        })
    }







    handleContentChange = (event) => {
        const inputValue = event.target.value;
        const username = this.state.content.match(/\[USERNAME\]/g);
        
        if (username) {
          const updatedContent = inputValue.replace(/\[USERNAME\]/g, username.join(''));
          this.setState({ content: updatedContent });
        }
      }
    handleChangePolicy(html) {
        this.setState({
            add_policy_message: html,
            policy_message_error:"Policy Message must contain a {{Customer Name}} character"
        })
    }

    handleChangeNEWWWW = (e) => {
        const { value } = e.target;
        // Check if the {{Customer Name}} placeholder is being removed
        if (!value.includes('{{Customer Name}}')) {
          // If it's removed, add it back to the message
          this.setState({ message: value  });
        } else {
          this.setState({ message: value });
        }
      };

    fetch_quotation_msg = ()=>  {
        const { settings } = this.props;
        const res = fetch(settings.api_url + "api/telecaller_app/fetch_quotation_msg", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("fetch Quotation Message ****======", json)
                var data = json;

                if (data.status == true ) {
                    this.setState({
                        // add_quotation_message:data.data[0].quotation_message 
                        // greeting:data.data[0].text1, 
                        add_quotation_message_new:data.data[0].text 
                    })
                }
                  
            })
    }

    fetch_policy_msg = ()=>  {
        const { settings } = this.props;
        const res = fetch(settings.api_url + "api/telecaller_app/fetch_policy_msg", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("fetch Policy Message ****======", json)
                var data = json;

                if (data.status == true ) {
                    this.setState({
                        // add_policy_message:data.data[0].policy_message 
                        // policy_greeting:data.data[0].text1, 
                        add_policy_message:data.data[0].text 
                    })
                }
                  
            })
    }

    replaceKeywords = () => {
        const content = this.state.add_quotation_message;
      
        // Define your keyword mappings and their replacements
        const keywordMappings = {
          "user name": "[NAME]",
          "name": "[NAME]",
          "contact name": "[NAME]",
          "mobile no": "[PHONE NUMBER]",
          "phone no": "[PHONE NUMBER]",
          "contact no": "[CONTACT NUMBER]",
          // Add more mappings as needed
        };
      
        // Replace keywords with their corresponding replacements
        let updatedContent = content;
        Object.keys(keywordMappings).forEach((keyword) => {
          const regex = new RegExp(keyword, "gi"); // "gi" for case-insensitive global search
          updatedContent = updatedContent.replace(regex, keywordMappings[keyword]);
        });
        console.log("updatedContent*************",updatedContent);
        // this.setState({ add_quotation_message: updatedContent });
      };

      extractDynamicVariables = () => {
        // const { add_quotation_message } = this.state;
        // const variablePatterns = ['customer name', 'mobile no', 'phone no', 'contact no', 'address'];
      
        // const dynamicVariables = [];
      
        // variablePatterns.forEach(pattern => {
        //   const regex = new RegExp(pattern, 'gi');
        //   const matches = add_quotation_message.match(regex);
        //   if (matches) {
        //     matches.forEach(match => {
        //       dynamicVariables.push(match);
        //     });
        //   }
        // });

        // console.log("dynamicVariables**************",dynamicVariables);
      
        // this.setState({ dynamicVariables });


        const { add_quotation_message } = this.state;
  const variablePatterns = [
    { keyword: 'name', category: 'customer_name' },
    { keyword: 'contact name', category: 'customer_name' },
    { keyword: 'mobile no', category: 'mobile no' },
    { keyword: 'phone no', category: 'mobile no' },
    { keyword: 'contact no', category: 'mobile no' },
    { keyword: 'address', category: 'address' },
  ];

  const dynamicVariables = [];

  variablePatterns.forEach(({ keyword, category }) => {
    const regex = new RegExp(keyword, 'gi');
    const matches = add_quotation_message.match(regex);
    if (matches) {
      matches.forEach(match => {
        dynamicVariables.push(category);
      });
    }
  });
  console.log("dynamicVariables**************",dynamicVariables);
      };

    add_quotation_message = ()=>  {
        const {
            addToast,settings
        } = this.props;

        var domain_name = this.state.add_quotation_message_new
        if (this.state.add_quotation_message_new == "" || this.state.add_quotation_message_new == undefined) {
            this.setState({
                quotation_message_error:"Please Enter Message"
            }) 
         }
       else{
        if (domain_name.indexOf('{{Customer Name}}') === -1) {
            this.setState({
                quotation_message_error:"Quotation Message must contain a {{Customer Name}} character",
                LeadSubAlertDelete:true
            }) 
          }else{
                var params = {
                    text:this.state.add_quotation_message_new,
                }
                console.log("params**************Message",params);
                 const res = fetch(settings.api_url + "api/telecaller_app/add_quotation_message", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Add Quotation Message ****======", json)
                         var data = json;
                         if (data.status==true) {
                             this.setState({
                                quotation_message_error:"Quotation Message must contain a {{Customer Name}} character"
                             })
                            addToast({
                             title: 'Book Your Insurance',
                             content: data.message,
                             time: new Date(),
                             duration: 4000,
                         });
                           this.fetch_quotation_msg()
                         }
                         else{
                         this.setState({
                            quotation_message_error:data.message
                         })
                            addToast({
                                title: 'Book Your Insurance',
                                content: data.message,
                                time: new Date(),
                                duration: 4000,
                            });
                         } 
                     }) 
             }
          }


         
        
     }



     add_policy_message = ()=>  {
        // console.log("this.state.add_policy_message.indexOf('[CONTACT NO]') === -1",this.state.add_policy_message.indexOf('[CONTACT NO]') === -1);
        const {
            addToast,settings
        } = this.props;
        var domain_name = this.state.add_policy_message
        if (this.state.add_policy_message == "" || this.state.add_policy_message == undefined) {
            this.setState({
                policy_message_error:"Please Enter Message"
            }) 
         }
       else{
        if (domain_name.indexOf('{{Customer Name}}') === -1 ) {
            console.log("ffffffff");
            this.setState({
                policy_message_error:"Policy Message must contain a {{Customer Name}} character",
                LeadSubAlertPolicy:true
            }) 
          }else{
            var params = {
                text:domain_name,
            }
            console.log("params**************Policy Message",params);
             const res = fetch(settings.api_url + "api/telecaller_app/add_policy_message", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Add Policy Message ****======", json)
                     var data = json;
                     if (data.status==true) {
                         this.setState({
                            policy_message_error:"Policy Message must contain a {{Customer Name}} character"
                         })
                        addToast({
                         title: 'Book Your Insurance',
                         content: data.message,
                         time: new Date(),
                         duration: 4000,
                     });
                       this.fetch_policy_msg()
                     }
                     else{
                     this.setState({
                        policy_message_error:data.message
                     })
                        addToast({
                            title: 'Book Your Insurance',
                            content: data.message,
                            time: new Date(),
                            duration: 4000,
                        });
                     } 
                 }) 
         }
        }
        
     }
     handleTextAreaChange = (e) => {
        const newValue = e.target.value;
        
        // Check if newValue contains secondmessage
        if (!newValue.includes(this.state.secondmessage)) {
          // Split the newValue into first and third parts based on secondmessage
          const [firstPart, thirdPart] = newValue.split(this.state.secondmessage);
          
          // Trim any leading/trailing whitespace
          const trimmedFirstPart = firstPart.trim();
          const trimmedThirdPart = thirdPart.trim();
    
          this.setState({
            firstmessage: trimmedFirstPart,
            thirdmessage: trimmedThirdPart,
          });
        }
      };

      
    render() {

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
            menuPortal: provided => ({ ...provided, zIndex: 1500 }),
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
        var intervals_data = [
            {value:"1",label:"Hours"},
            {value:"2",label:"Days"},
          ]
        return (
            <Fragment>
                     <div>
                    <PageTitle className="grid_title">
                        <h1>Quotation Message</h1>
                    </PageTitle>
                    <div className="row text_padding" style={{borderBottom:" 1px solid #e6ecf0"}}>
                    <div className="col-lg-12">
                        <TextEditor value={this.state.add_quotation_message_new} onChange={this.handleChangeNote} />
                    </div>
                    <div className="col-lg-6">
                    <p className="erroe_messagre">*{this.state.quotation_message_error}</p>
                    </div>
                    <div className="col-lg-6 save_btn_new">
                    <Button color="primary" disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} onClick={()=>{this.add_quotation_message()}}>Save Quotation Message</Button>
                     </div>
                    </div>
               </div>


                <div style={{marginTop:"12px"}}>
                    <PageTitle className="grid_title">
                        <h1>Policy Message</h1>
                    </PageTitle>
                    <div className="row text_padding">
                    <div className="col-lg-12">
                        <TextEditor value={this.state.add_policy_message} onChange={this.handleChangePolicy} />
                    </div>
                    <div className="col-lg-6">
                    <p className="erroe_messagre">*{this.state.policy_message_error}</p>
                    </div>
                    <div className="col-lg-6 save_btn_new">
                        <Button color="primary" disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} onClick={()=>{this.add_policy_message()}}>Save Policy Message</Button>
                    </div>
                    </div>
               </div> 


{/* ************************************** Model For Delete Lead ************************************************************* */}
           <Modal
                style={{ width: '400px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.LeadSubAlertDelete}
                toggle={this.LeadSubAlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody className="model_body_new">
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 className="font_weight">{this.state.quotation_message_error}</h5>
                  </div>
                  <div className="button_close_new" style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.LeadSubAlertDelete}>Close</Button>
                  </div>

                </ModalBody>
              </Modal>
{/* ************************************** Model For Policy Message ************************************************************* */}
           <Modal
                style={{ width: '400px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.LeadSubAlertPolicy}
                toggle={this.LeadSubAlertPolicy}
                className={this.props.className}
                fade
              >
                <ModalBody className="model_body_new">
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 className="font_weight">{this.state.policy_message_error}</h5>
                  </div>
                  <div className="button_close_new" style={{ height: '50px', width: '100%' }}>
                  <Button color="secondary" style={{ marginRight: "20px"}} onClick={this.LeadSubAlertPolicy}>Close</Button>
                  </div>

                </ModalBody>
              </Modal>
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) ,{ addToast: actionAddToast})( Content );
