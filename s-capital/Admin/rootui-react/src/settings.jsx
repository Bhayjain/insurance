/**
 * App Settings
 */
 import Cookies from 'js-cookie';
//  import Icon from '../../components/icon';




var check = Cookies.get( 'night_mode_cookie');
if(check== "true"){
   var night_mode =true
}
else
{
    var night_mode =false
}

const user_management_view = Cookies.get('user_management_view');
const admin_management_view = Cookies.get('admin_management_view');
const recuritement_view = Cookies.get('recuritement_view');
const agent_management_view = Cookies.get('agent_management_view');
const support_management_view = Cookies.get('support_management_view');
const sales_management_view = Cookies.get('sales_management_view');
const sales_management_control = Cookies.get('sales_management_control');
const opeartion_dock_view = Cookies.get('opeartion_dock_view');
const policy_dock_view = Cookies.get('policy_dock_view');
const accounting_view = Cookies.get('accounting_view');
const cheque_report_view = Cookies.get('cheque_report_view');
const reporting_view = Cookies.get('reporting_view');
const master_view = Cookies.get('master_view');
const deviation_dock_view = Cookies.get('deviation_dock_view');
const pending_payment_view = Cookies.get('pending_payment_view');
const time_tracker_view = Cookies.get('time_tracker_view');
const customer_cheque_view = Cookies.get('customer_cheque_view');
const endorsement_view = Cookies.get('endorsement_view');
const book_your_home_page = Cookies.get('book_your_home_page');
const campaign_view = Cookies.get('campaign_view');
const contacts_view = Cookies.get('contacts_view');
const reference_user_view = Cookies.get('reference_user_view');
const dashboard_app_view = Cookies.get('dashboard_app_view');
const payroll_view = Cookies.get('payroll_view');
const dashboard_payroll_view = Cookies.get('dashboard_payroll_view');
const attendance_view = Cookies.get('attendance_view');
const leave_request_view = Cookies.get('leave_request_view');
const loans_view = Cookies.get('loans_view');
const allowance_view = Cookies.get('allowance_view');
const genral_report_view = Cookies.get('genral_report_view');
//console.log(user_management_view, "user_management_view");
////console.log(admin_management_view, "admin_management_view");
////console.log(agent_management_view, "agent_management_view");
////console.log(support_management_view, "support_management_view");
////console.log(sales_management_view, "sales_management_view");
// console.log(reference_user_view, "reference_user_view");

var nevigation_sidebar = {};
// if (sales_management_view == "true") {
//     nevigation_sidebar['/typography'] = {
//         name: 'Sales',
//         icon: 'user-check',
//         sub:{
//             '/sales': {
//                 name: 'Sales Dock',
//             },
//             '/lead': {
//                 name: 'Lead',
//             },
//             '/task': {
//                 name: 'Task',
//             },
//         }
//     }

// }
if (book_your_home_page == "operation_page") {
    if (policy_dock_view == "true") {

        nevigation_sidebar['/operation-dock'] = {
            name: 'Operation Dock',
            // name: 'Policy Dock',
            icon: 'slack',
        }

    }

    if (deviation_dock_view == "true") {

        nevigation_sidebar['/deviation-dock'] = {
            name: 'Deviation Dock',
            icon: 'figma',
        }

    }
    if (opeartion_dock_view == "true") {

        nevigation_sidebar['/mis-dock'] = {
            name: 'MIS Dock',
            // name: 'MISD Dock',
            // name: 'Operation Dock',
            icon: 'book-open',
        }

        // nevigation_sidebar['/campaign'] = {
        // name: 'Campaigns',
        // icon: 'sliders',
        //     }

        //  nevigation_sidebar['/contacts'] = {
        //  name: 'Contacts',
        //  icon: 'package',
        //  }

      }





    }
    else if (book_your_home_page == "telecaller_app_page") {

        if (dashboard_app_view == "true") {
            nevigation_sidebar['/dashborad'] = {
                name: 'Dashboard',
                icon: 'home',
            }
          }
        if (campaign_view == "true") {
            nevigation_sidebar['/campaign'] = {
                name: 'Campaigns',
                icon: 'sliders',
            }
          }
          if (contacts_view == "true") {
            nevigation_sidebar['/contacts'] = {
                name: 'Contacts',
                icon: 'package',
            }

          }
          if (reference_user_view == "true") {
            nevigation_sidebar['/reference-user'] = {
                name: 'Reference Users',
                icon: 'users',
            }
            // nevigation_sidebar['/component-toast'] = {
            //     name: 'Reference User test',
            //     icon: 'users',
            // }
          }

    }

    else if (book_your_home_page == "payroll_page") {
        if (dashboard_payroll_view == "true") {
            nevigation_sidebar['/payroll-dashboard'] = {
                name: 'Dashboard',
                icon: 'home',
            }
        }
        if (payroll_view == "true") {

            nevigation_sidebar['/payroll'] = {
                name: 'Payroll',
                icon: 'dollar-sign',
            }

        }
        if (attendance_view == "true") {

            nevigation_sidebar['/attendance'] = {
                name: 'Attendance',
                icon: 'users',
            }

        }
        if (leave_request_view == "true") {

            nevigation_sidebar['/requested-leave'] = {
                name: 'Leaves',
                icon: 'git-pull-request',
            }

        }
        if (loans_view == "true") {

            nevigation_sidebar['/loans'] = {
                name: 'Loans',
                icon: 'shopping-bag',
            }

        }

        if (allowance_view == "true") {

            nevigation_sidebar['/allowance'] = {
                name: 'Allowance',
                icon: 'codesandbox',
            }

        }
        if (genral_report_view == "true") {

            nevigation_sidebar['/forms-datetime'] = {
                name: 'General Reports',
                icon: 'bookmark',
                sub: {

                    '/payroll-report': {
                        name: 'Payroll Report',
                    },
                    '/attendance-report': {
                        name: 'Attendance Report',
                    },
                    '/pf-report': {
                        name: 'PF Report',
                    },
                    '/esic-report': {
                        name: 'ESIC Report',
                    },
                    '/ptec-report': {
                        name: 'PTEC Report',
                    },
                },
            }

        }
    }


    else if (book_your_home_page == "payments_page") {
        if (pending_payment_view == "true") {
            nevigation_sidebar['/component-tabs'] = {
                name: 'Payments',
                icon: 'alert-octagon',
                sub:{
                    '/pending-payment': {
                        name: 'Pending Payment',
                    },
                    '/pending-payout': {
                        name: 'Payout',
                    },
                }
            }

        }
    }
    else if (book_your_home_page == "reports_page") {
        if (reporting_view == "true") {

            nevigation_sidebar['/component-modal'] = {
                name: 'Reports',
                icon: 'repeat',
                sub: {
                    '/daily-sales-report': {
                        name: 'Daily Sales Report',
                    },
                    '/sm-business-wise': {
                        name: 'SM Business Wise Report',
                    },
                    '/insurer-wise-business': {
                        name: 'Insurer wise Business Report',
                    },
                    '/pending-payment-report': {
                        name: 'Pending Payment Report',
                    },
                    '/pending-payout-report': {
                        name: 'Pending Payout Report',
                    },
                    '/employee-wise-report': {
                        name: 'Employee Wise Report',
                    },
                    '/lob-report': {
                        name: 'LOB wise Report',
                    },
                    '/investment-report': {
                        name: 'Investment Report',
                    },
                    '/company-wise-report': {
                        name: 'Company Wise Report',
                    },
                },
            }

        }
    }
    else if (book_your_home_page == "accounting_page") {
        if (accounting_view == "true") {

            nevigation_sidebar['/accounting'] = {
                name: 'Accounting',
                icon: 'codepen',
                sub: {
                    '/cheque': {
                        name: 'Cheques',
                    },
                },
            }
        }
        if (cheque_report_view == "true") {

            nevigation_sidebar['/cheque-report'] = {
                name: 'Cheque Reporting',
                icon: 'codesandbox',
            }

        }
        if (customer_cheque_view == "true") {
            nevigation_sidebar['/customer-cheque'] = {
                name: 'Customer Cheque',
                icon: 'credit-card',
            }
        }
    }
    else if (book_your_home_page == "time_tracker_page") {

        if (time_tracker_view == "true") {
            nevigation_sidebar['/time-tracker'] = {
                name: 'Time Tracker',
                icon: 'clock',
            }
        }
    }
    else if (book_your_home_page == "employee_page") {

        if (recuritement_view == "true") {
            nevigation_sidebar['/recruitment'] = {
                name: 'Recruitment',
                icon: 'users',
            }
            ////console.log("hhhhhhhhhhhhhhhhhhhhhhh");
        }
        if (admin_management_view == "true") {
            nevigation_sidebar['/employee-management'] = {
                name: 'Employee Management',
                icon: 'users',
            }
            ////console.log("hhhhhhhhhhhhhhhhhhhhhhh");
        }
        if (agent_management_view == "true") {
            nevigation_sidebar['/agencies-telesales'] = {
            // nevigation_sidebar['/agent-management'] = {
                name: 'Agencies/Telesales',
                icon: 'user',
            }
            // nevigation_sidebar['/forms-validation'] = {
            // // nevigation_sidebar['/agent-management'] = {
            //     name: 'Excel',
            //     icon: 'user',
            // }

        }
    }
    else if (book_your_home_page == "master_page") {
        if (master_view == "true") {
            nevigation_sidebar['/masters'] = {
                name: 'Masters',
                icon: 'book',
                sub: {
                    '/admin-role': {
                        name: 'Admin Role',
                    },
                    '/designation': {
                        name: 'Designation',
                    },
                    // '/rto': {
                    //     name: 'RTO',
                    // },
                    // '/vehicle-registration-year': {
                    //     name: 'Vehicle Registration Year',
                    // },
                    // '/fuel-type': {
                    //     name: 'Fuel Type',
                    // },
                    // '/vehicle-brand': {
                    //     name: 'Vehicle Brand',
                    // },
                    '/insurer': {
                        name: 'Insurer',
                    },
                    '/message-generator': {
                        name: 'Message Generator',
                    },
                    '/telecalling': {
                        name: 'Telecalling',
                    },
                    '/company-information': {
                        name: 'Company Information',
                    },

                    // '/vehicle-model': {
                    //     name: 'Vehicle Model',
                    // },
                },
            }



            nevigation_sidebar['/project-management'] = {
                name: 'HRM System',
                icon: 'command',
                sub: {

                    '/salary-structure': {
                        name: 'Salary Structure',
                    },
                    '/holiday': {
                        name: 'Holiday',
                    },
                    '/leaves-model': {
                        name: 'Leaves Model',
                    },
                    '/letter-template': {
                        name: 'Letter Template',
                    },
                },
            }
        }
    }else{
        console.log("No Side Bar");
    }









// if (user_management_view == "true") {
//     nevigation_sidebar['/user-management'] = {
//         name: 'User Management',
//         icon: 'users',
//     }
// }











// if (endorsement_view == "true") {
//     nevigation_sidebar['/endorsement'] = {
//     // nevigation_sidebar['/agent-management'] = {
//         name: 'Endorsement',
//         icon: 'user-check',
//     }
//     nevigation_sidebar['/forms-validation'] = {
//     // nevigation_sidebar['/agent-management'] = {
//         name: 'forms-validation',
//         icon: 'user-check',
//     }

// }



// if (support_management_view == "true") {
//     nevigation_sidebar['/support'] = {
//         name: 'Support',
//         icon: 'message-circle',
//     }


// }



// if (sales_management_view == "true") {
//     nevigation_sidebar['/typography'] = {
//         name: 'Sales',
//         icon: 'user-check',
//         sub:{
//             '/sales': {
//                 name: 'Sales Dock',
//             },
//             '/lead': {
//                 name: 'Lead',
//             },
//             '/task': {
//                 name: 'Task',
//             },
//         }
//     }
//
// }





const settings = {
    // Local Link
    api_url : "http://192.168.29.31:4090/",
    // api_url : "http://173.249.5.10:3005/",

    // Server Link
    // api_url : "https://api.bookyourinsurance.com:4092/",

    // Demo Server Link
    // api_url : "https://demoapi.bookyourinsurance.com:4050/",

    night_mode: night_mode,
    spotlight_mode: false,
    show_section_lines: true,
    sidebar_dark: false,
    sidebar_static: false,
    sidebar_small: false,
    sidebar_effect: 'shrink',
    nav: true,
    nav_dark: false,
    nav_logo_path: require( '../../common-assets/images/trasparent_logo.png' ),
    // nav_logo_path: require( '../../common-assets/images/newlogoImg.jpeg' ),
    // nav_logo_path: require( '../../common-assets/images/NewLogoInsurance.png' ),
    nav_logo_white_path: require( '../../common-assets/images/trasparent_logo.png' ),
    // nav_logo_white_path: require( '../../common-assets/images/NewLogoInsurance.png' ),
    nav_logo_width: '45px',
    nav_logo_url: '/',
    nav_align: 'left',
    nav_expand: 'lg',
    nav_sticky: true,
    nav_autohide: true,
    nav_container_fluid: true,
    home_url: '/',
    navigation: {
        // '#actions': {
        //     name: 'Actions',
        //     icon: 'layers',
        //     sub: {
        //         '#create-post': {
        //             name: 'Create Post',
        //             icon: 'plus-circle',
        //         },
        //         '#create-page': {
        //             name: 'Create Page',
        //             icon: 'plus-circle',
        //         },
        //         '#manage-users': {
        //             name: 'Manage Users',
        //             icon: 'users',
        //         },
        //         '#manage-sites': {
        //             name: 'Manage Sites',
        //             icon: 'sidebar',
        //             sub: {
        //                 '#my-site-1': {
        //                     name: 'My Site 1',
        //                 },
        //                 '#my-site-2': {
        //                     name: 'My Site 2',
        //                 },
        //                 '#my-site-3': {
        //                     name: 'My Site 3',
        //                 },
        //             },
        //         },
        //     },
        // },
    },
    navigation_sidebar:nevigation_sidebar,
    breadcrumbs_presets: {
        apps: {
            '/mailbox': 'Mailbox',
            '/messenger': 'Messenger',
            '/calendar': 'Calendar',
            '/project-management': 'Project Management',
            '/file-manager': 'File Manager',
            '/profile': 'Profile',
        },
        content: {
            '/grid': 'Grid',
            '/colors': 'Colors',
            '/typography': 'Typography',
            '/component-table': 'Tables',
        },
        components_base: {
            '/component-alert': 'Alert',
            '/component-badge': 'Badge',
            '/component-breadcrumbs': 'Breadcrumbs',
            '/component-button': 'Button',
            '/component-card': 'Card',
            '/component-carousel': 'Carousel',
            '/component-collapse': 'Collapse',
            '/component-dropdown': 'Dropdown',
            '/component-list-group': 'List Group',
            '/component-media-object': 'Media Object',
            '/component-modal': 'Modal',
            '/component-nav': 'Nav',
            '/component-pagination': 'Pagination',
            '/component-popover': 'Popover',
            '/component-progress': 'Progress',
            '/component-spinner': 'Spinner',
            '/component-tabs': 'Tabs',
        },
        components_advanced: {
            '/component-icons-feather': 'Icons: Feather',
            '/component-icons-fontawesome': 'Icons: Font Awesome',
            '/component-charts-chartjs': 'Charts: Chart.js',
            '/component-charts-chartist': 'Charts: Chartist',
            '/component-charts-peity': 'Charts: Peity',
            '/component-charts-echarts': 'Charts: eCharts',
            '/component-charts-flot': 'Charts: Flot',
            '/component-timeline': 'Timeline',
            '/component-tree-view': 'Tree View',
            '/component-toast': 'Toast',
            '/component-sweet-alert': 'Sweet Alert',
            '/component-maps': 'Maps',
            '/component-data-tables': 'Data Tables',
        },
        forms_advanced: {
            '/forms-datetime': 'DateTime Picker',
            '/forms-validation': 'Validation',
            '/forms-touch-spin': 'Touch Spin',
            '/forms-range-slider': 'Range Slider',
            '/forms-input-masks': 'Input Masks',
            '/forms-dropzone': 'Dropzone',
            '/forms-colorpicker': 'Color Picker',
            '/forms-select': 'Select',
            '/forms-markdown': 'Markdown editor',
            '/forms-wysiwyg': 'WYSIWYG editor',
        },
    },
    img_country: {
        usa: require( '../../common-assets/images/flags/united-states-of-america.svg' ),
        china: require( '../../common-assets/images/flags/china.svg' ),
        germany: require( '../../common-assets/images/flags/germany.svg' ),
        japan: require( '../../common-assets/images/flags/japan.svg' ),
        spain: require( '../../common-assets/images/flags/spain.svg' ),
        france: require( '../../common-assets/images/flags/france.svg' ),
        canada: require( '../../common-assets/images/flags/canada.svg' ),
        netherlands: require( '../../common-assets/images/flags/netherlands.svg' ),
        italy: require( '../../common-assets/images/flags/italy.svg' ),
        russia: require( '../../common-assets/images/flags/russia.svg' ),
        czech_republic: require( '../../common-assets/images/flags/czech-republic.svg' ),
    },
    img_file: {
        empty: require( '../../common-assets/images/icon-empty.svg' ),
        zip: require( '../../common-assets/images/icon-zip.svg' ),
        rar: require( '../../common-assets/images/icon-rar.svg' ),
        html: require( '../../common-assets/images/icon-html.svg' ),
        php: require( '../../common-assets/images/icon-php.svg' ),
        css: require( '../../common-assets/images/icon-css.svg' ),
        js: require( '../../common-assets/images/icon-js.svg' ),
        doc: require( '../../common-assets/images/icon-doc.svg' ),
        txt: require( '../../common-assets/images/icon-txt.svg' ),
        pdf: require( '../../common-assets/images/icon-pdf.svg' ),
        xls: require( '../../common-assets/images/icon-xls.svg' ),
        png: require( '../../common-assets/images/icon-png.svg' ),
        jpg: require( '../../common-assets/images/icon-jpg.svg' ),
    },
    users: [
        {
            img: require( '../../common-assets/images/avatar-1.png' ),
            img_profile: require( '../../common-assets/images/avatar-1-profile.png' ),
            name: 'Jack Boyd',
        }, {
            img: require( '../../common-assets/images/avatar-2.png' ),
            name: 'Helen Holt',
        }, {
            img: require( '../../common-assets/images/avatar-3.png' ),
            name: 'Avice Harris',
        }, {
            img: require( '../../common-assets/images/avatar-4.png' ),
            name: 'Anna Rice',
        }, {
            img: require( '../../common-assets/images/avatar-5.png' ),
            name: 'Amber Smith',
        }, {
            img: require( '../../common-assets/images/avatar-6.png' ),
            name: 'Mary Rose',
        },
    ],
    letters: [
        {
            img: require( '../../common-assets/images/letter-1.png' ),
            img_min: require( '../../common-assets/images/letter-1-min.png' ),
        }, {
            img: require( '../../common-assets/images/letter-2.png' ),
            img_min: require( '../../common-assets/images/letter-2-min.png' ),
        }, {
            img: require( '../../common-assets/images/letter-3.png' ),
            img_min: require( '../../common-assets/images/letter-3-min.png' ),
        }, {
            img: require( '../../common-assets/images/letter-4.png' ),
            img_min: require( '../../common-assets/images/letter-4-min.png' ),
        },
    ],
};

/* Parse GET variables to change initial settings */
const $_GET = {};
window.location.href.replace( /[?&]+([^=&]+)=([^&]*)/gi, ( a, name, value ) => {
    $_GET[ name ] = value;
} );

Object.keys( $_GET ).forEach( ( name ) => {
    const isTrue = $_GET[ name ] === '1';

    switch ( name ) {
    case 'setting-night-mode':
        settings.night_mode = isTrue;
        break;
    case 'setting-show-section-lines':
        settings.show_section_lines = isTrue;
        break;
    case 'setting-sidebar-small':
        settings.sidebar_small = isTrue;
        break;
    case 'setting-sidebar-dark':
        settings.sidebar_dark = isTrue;
        break;
    case 'setting-nav-dark':
        settings.nav_dark = isTrue;
        break;
    // no default
    }
} );

export default settings;
