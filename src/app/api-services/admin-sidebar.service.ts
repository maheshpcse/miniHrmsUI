import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminSidebarService {
    toggled = false;
    _hasBackgroundImage = true;
    // menus = [
    //     {
    //         title: 'General',
    //         type: 'header'
    //     },
    //     {
    //         title: 'Dashboard',
    //         icon: 'fa fa-tachometer-alt',
    //         active: false,
    //         type: 'dropdown',
    //         badge: {
    //             text: 'New ',
    //             class: 'badge-warning'
    //         },
    //         submenus: [
    //             {
    //                 title: 'Dashboard 1',
    //                 badge: {
    //                     text: 'Pro ',
    //                     class: 'badge-success'
    //                 }
    //             },
    //             {
    //                 title: 'Dashboard 2'
    //             },
    //             {
    //                 title: 'Dashboard 3'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'E-commerce',
    //         icon: 'fa fa-shopping-cart',
    //         active: false,
    //         type: 'dropdown',
    //         badge: {
    //             text: '3',
    //             class: 'badge-danger'
    //         },
    //         submenus: [
    //             {
    //                 title: 'Products',
    //             },
    //             {
    //                 title: 'Orders'
    //             },
    //             {
    //                 title: 'Credit cart'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Components',
    //         icon: 'far fa-gem',
    //         active: false,
    //         type: 'dropdown',
    //         submenus: [
    //             {
    //                 title: 'General',
    //             },
    //             {
    //                 title: 'Panels'
    //             },
    //             {
    //                 title: 'Tables'
    //             },
    //             {
    //                 title: 'Icons'
    //             },
    //             {
    //                 title: 'Forms'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Charts',
    //         icon: 'fa fa-chart-line',
    //         active: false,
    //         type: 'dropdown',
    //         submenus: [
    //             {
    //                 title: 'Pie chart',
    //             },
    //             {
    //                 title: 'Line chart'
    //             },
    //             {
    //                 title: 'Bar chart'
    //             },
    //             {
    //                 title: 'Histogram'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Maps',
    //         icon: 'fa fa-globe',
    //         active: false,
    //         type: 'dropdown',
    //         submenus: [
    //             {
    //                 title: 'Google maps',
    //             },
    //             {
    //                 title: 'Open street map'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Extra',
    //         type: 'header'
    //     },
    //     {
    //         title: 'Documentation',
    //         icon: 'fa fa-book',
    //         active: false,
    //         type: 'simple',
    //         badge: {
    //             text: 'Beta',
    //             class: 'badge-primary'
    //         },
    //     },
    //     {
    //         title: 'Calendar',
    //         icon: 'fa fa-calendar',
    //         active: false,
    //         type: 'simple'
    //     },
    //     {
    //         title: 'Examples',
    //         icon: 'fa fa-folder',
    //         active: false,
    //         type: 'simple'
    //     }
    // ];
    menus = [
        {
            title: 'General',
            type: 'header'
        },
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: 'fas fa-tachometer-alt',
            active: false,
            type: 'simple',
            submenus: []
        },
        {
            title: 'Employees',
            icon: 'fas fa-users',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'All Employees',
                    active: false
                },
                {
                    title: 'Login History',
                    active: false
                }
            ]
        },
        {
            title: 'Forms',
            icon: 'fab fa-wpforms',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Login Encrypt',
                    url: '/admin/forms/login-encrypt-decrypt',
                    active: false
                },
                {
                    title: 'Menus',
                    active: false
                },
                {
                    title: 'Roles',
                    active: false
                },
                {
                    title: 'Permissions',
                    active: false
                },
                {
                    title: 'Attendance Types',
                    active: false
                },
                {
                    title: 'Leave Types',
                    active: false
                }
            ]
        },
        {
            title: 'Requests',
            icon: 'fas fa-mail-bulk',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'All Requests',
                    active: false
                }
            ]
        },
        {
            title: 'Notifications',
            icon: 'fas fa-flag',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'All Notifications',
                    active: false
                },
                {
                    title: 'Send Notify',
                    active: false
                    // Automatic/Manual Notifications will be send
                }
            ]
        }
    ];
    constructor() { }

    toggle() {
        this.toggled = !this.toggled;
    }

    getSidebarState() {
        return this.toggled;
    }

    setSidebarState(state: boolean) {
        this.toggled = state;
    }

    getMenuList() {
        return this.menus;
    }

    get hasBackgroundImage() {
        return this._hasBackgroundImage;
    }

    set hasBackgroundImage(hasBackgroundImage) {
        this._hasBackgroundImage = hasBackgroundImage;
    }
}
