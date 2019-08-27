import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {QueueService} from "../../queue/services/queue.service";
import { environment as env } from '../../../environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public host: string;
    public realmName: string;
    public queueEmissaoLabel: string;
    public queueEmissaoMax: number;
    public queueEmissaoCount: number;
    public queueEmissaoClass: string;

    constructor(private queueService : QueueService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.host = env.host;
        this.realmName = env.realmName;
        this.queueEmissaoLabel = env.queueEmissaoLabel;
        this.queueEmissaoMax = +env.queueEmissaoMax;
        this.carregarEmissaoDigitalDashboard();
    }

    //json-server --watch backend/queueAttribute.json
    carregarEmissaoDigitalDashboard() {
        this.queueService.getQueueAttribute().subscribe(data => {
            const {value} = data;
            console.log("getQueueEmissaoCount.value= " + value);
            this.queueEmissaoCount = +value;
            this.queueEmissaoClass = this.obterClass(this.queueEmissaoCount, this.queueEmissaoMax);
        });
        return this.queueEmissaoCount;
    }

    obterClass(count: number, maxPermitido: number) : string {
        console.log("obterClass.count= " + count);
        console.log("obterClass.maxPermitido= " + maxPermitido);
        console.log(count == 0);
        console.log(count > maxPermitido);
        console.log(count < maxPermitido);
        if (count == 0) {
            console.log("obterClass.success");
            return "success";
        } else if (count > maxPermitido) {
            console.log("obterClass.danger");
            return "danger"
        } else if (count < maxPermitido) {
            console.log("obterClass.warning");
            return "warning";
        }
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
