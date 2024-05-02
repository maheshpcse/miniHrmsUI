import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
let sankey = require("highcharts/modules/sankey");
let organization = require("highcharts/modules/organization");
sankey(Highcharts);
organization(Highcharts);

@Component({
    selector: 'app-dynamic-org-chart',
    templateUrl: './dynamic-org-chart.component.html',
    styleUrls: ['./dynamic-org-chart.component.css']
})
export class DynamicOrgChartComponent implements OnInit {

    @Input() EmpOrgData: any = {};
	@Input() EmpProcessData: any = [];

    // Highcharts: typeof Highcharts = Highcharts;
    // chartOptions: Highcharts.Options = {
    //     series: [{
    //         data: [1, 2, 3],
    //         type: 'line'
    //     }]
    // };

    public highcharts: any = Highcharts;
    // public chartOptions: any = {
    //     series: [{
    //         data: [1, 2, 3],
    //         type: 'line'
    //     }]
    // };

    constructor() { }

    ngOnInit(): void {
        console.log('Get employee organization data isss:', this.EmpOrgData, this.EmpProcessData);
        this.BindEmpOrgData();
        // this.getOrgChart();
    }

    BindEmpOrgData() {
        let seriesData: any = [];
        for (let item of this.EmpProcessData) {
            seriesData.push([0, item['approvedUserId']]);
        }
        for (let item of this.EmpProcessData) {
            if (item['approvedRoleName'] == 'pm') {
                seriesData.push([item['approvedUserId'], 'rm,pm']);
                seriesData.push([item['approvedUserId'], 'pm']);
            } else {
                seriesData.push([item['approvedUserId'], item['approvedRoleName']]);
            }
        }
        // console.log('Final seriesData isss:', seriesData);

        let seriesNodesRowOne: any = [
            {
                id: 0,
                title: "SDE-1",
                name: this.EmpOrgData['employeeInfo']['empFullName'],
                image: this.EmpOrgData['employeeInfo']['empImage']
            }
        ];
        for (let item of this.EmpProcessData) {
            seriesNodesRowOne.push({
                id: item['approvedUserId'],
                title: item['approvedRoleName'] == 'hr' ? 'HR Manager' : item['approvedRoleName'] == 'rm' ? 'Reporting Manager' : item['approvedRoleName'] == 'pm' 
                ? 'Product Architect' : item['approvedRoleName'] == 'ceo' ? 'CEO' : item['approvedRoleName'] == 'director' ? 'Director' : '',
                name: item['approvedFullName'],
                column: 1,
                image: item['approvedImage'],
                layout: "hanging"
            });
        }
        // console.log('Final seriesNodesRowOne isss:', seriesNodesRowOne);

        this.getOrgChart(seriesData, seriesNodesRowOne);
    }

    getOrgChart(seriesData?: any, seriesNodesRowOne?: any) {
        // console.log('Highcharts isss:', this.highcharts);
        // CodePen.io - Organization Chart Demo code
        this.highcharts.chart("container", {
            chart: {
                type: "organization",
                height: 600,
                inverted: true
            },

            title: {
                text: "Employee Onboarding Process"
            },

            series: [
                {
                    type: "organization",
                    name: "H R M S",
                    keys: ["from", "to"],
                    // data: [
                    //     [0, 1],
                    //     [0, 2],
                    //     [0, 3],
                    //     [0, 4],
                    //     [1, "HR"],
                    //     [2, "RM"],
                    //     [3, "RM,PM"],
                    //     [3, "PM"],
                    //     [4, "CEO"]
                    // ],
                    data: seriesData,
                    levels: [
                        {
                            level: 0,
                            color: "#dee2ec",
                            dataLabels: {
                                color: "black"
                            },
                            height: 25
                        },
                        {
                            level: 1,
                            color: "silver",
                            dataLabels: {
                                color: "black"
                            },
                            height: 25
                        },
                        {
                            level: 2,
                            color: "#980104"
                        },
                        {
                            level: 4,
                            color: "#359154"
                        }
                    ],
                    nodes: [
                        // {
                        //     id: 0,
                        //     title: "Managing Partner",
                        //     name: "John Bell",
                        //     image:
                        //         "http://www.frgrisk.com/wp-content/uploads/2017/12/JohnBell.jpg"
                        // },
                        // {
                        //     id: 1,
                        //     title: "Partner - Sales",
                        //     name: "Mike Forno",
                        //     column: 1,
                        //     image:
                        //         "http://www.frgrisk.com/wp-content/uploads/2017/12/MichaelForno.jpg",
                        //     layout: "hanging"
                        // },
                        // {
                        //     id: 2,
                        //     title: "Partner - Solution Services",
                        //     name: "Tim Weeks",
                        //     column: 1,
                        //     image:
                        //         "http://www.frgrisk.com/wp-content/uploads/2017/12/TimWeeks.jpg",
                        //     layout: "hanging"
                        // },
                        // {
                        //     id: 3,
                        //     title: "Technology Director",
                        //     name: "Chuck Beck",
                        //     column: 1,
                        //     image:
                        //         "http://www.frgrisk.com/wp-content/uploads/2017/12/ChuckBeck.jpg",
                        //     layout: "hanging"
                        // },
                        // {
                        //     id: 4,
                        //     title: "Operations Manager",
                        //     name: "Wendy Cutler",
                        //     column: 1,
                        //     image:
                        //         "http://www.frgrisk.com/wp-content/uploads/2017/12/WendyCutler-1.jpg",
                        //     layout: "hanging"
                        // },
                        ...seriesNodesRowOne,
                        {
                            id: "hr",
                            name: "HR Department",
                            column: 2
                        },
                        {
                            id: "rm",
                            name: "Technical Department",
                            column: 2
                        },
                        {
                            id: "rm,pm",
                            name: "Technical Lead",
                            column: 2
                        },
                        {
                            id: "pm",
                            name: "Architect",
                            column: 2
                        },
                        {
                            id: "ceo",
                            name: "Operations Team",
                            column: 2
                        },
                        {
                            id: "director",
                            name: "Board Member",
                            column: 2
                        }
                    ],
                    colorByPoint: false,
                    color: "#007ad0",
                    dataLabels: {
                        color: "white"
                    },
                    borderColor: "white",
                    nodeWidth: 65
                }
            ],
            tooltip: {
                outside: true
            },
            exporting: {
                allowHTML: true,
                sourceWidth: 800,
                sourceHeight: 600
            }
        });
    }

}
