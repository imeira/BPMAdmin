import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {QueueService} from "../../queue/services/queue.service";
import { environment as env } from '../../../environments/environment';

import { Observable, interval, Subscription } from 'rxjs';

type DashboardType  = {
    label: string,
    attribute: string,
    value: string,
    class: string,
    icon: string
}

type QueueType  = {
    dashboard: DashboardType
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    private updateSubscription: Subscription;

    public host: string;
    public realmName: string;
    public queueMax: number;

    public queueHDIFilaJMS: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueEmissaoDigital: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueEmissaoDigitalProcesso: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueApoliceDigital: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueVistoriaAuto: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueVistoriaAutoLaudo: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueVistoriaPresencial: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueVistoriaResidencial: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };
    public queueCTDemanda: QueueType = { dashboard: { label: "", attribute: "", value: "", class: "", icon: "" } };

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
        this.queueMax = +env.queueMax;

        this.updateSubscription = interval(env.reloadInMilliseconds).subscribe(
            (val) => {
                this.updateStats()
            });

        this.getDashboardQueue();
    }

    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }

    private updateStats() {
        console.log('Reloading every ' + env.reloadInMilliseconds + ' milliseconds...');
        this.getDashboardQueue();
    }

    getDashboardQueue() {
        this.queueHDIFilaJMS.dashboard = this.getDashboardTypeByQueueAttributes( this.queueHDIFilaJMS.dashboard, env.queueHDIFilaJMS, env.queueAttributeSize );
        this.queueEmissaoDigital.dashboard = this.getDashboardTypeByQueueAttributes( this.queueEmissaoDigital.dashboard, env.queueEmissaoDigital, env.queueAttributeSize );
        this.queueEmissaoDigitalProcesso.dashboard = this.getDashboardTypeByQueueAttributes( this.queueEmissaoDigitalProcesso.dashboard, env.queueEmissaoDigitalProcesso, env.queueAttributeSize );
        this.queueApoliceDigital.dashboard = this.getDashboardTypeByQueueAttributes( this.queueApoliceDigital.dashboard, env.queueApoliceDigital, env.queueAttributeSize );
        this.queueVistoriaAuto.dashboard = this.getDashboardTypeByQueueAttributes( this.queueVistoriaAuto.dashboard, env.queueVistoriaAuto, env.queueAttributeSize );
        this.queueVistoriaAutoLaudo.dashboard = this.getDashboardTypeByQueueAttributes ( this.queueVistoriaAutoLaudo.dashboard , env.queueVistoriaAutoLaudo , env.queueAttributeSize );
        this.queueVistoriaPresencial.dashboard = this.getDashboardTypeByQueueAttributes ( this.queueVistoriaPresencial.dashboard , env.queueVistoriaPresencial , env.queueAttributeSize );
        this.queueVistoriaResidencial.dashboard = this.getDashboardTypeByQueueAttributes ( this.queueVistoriaResidencial.dashboard , env.queueVistoriaResidencial , env.queueAttributeSize );
        this.queueCTDemanda.dashboard = this.getDashboardTypeByQueueAttributes ( this.queueCTDemanda.dashboard , env.queueCTDemanda , env.queueAttributeSize );
    }

    //json-server --watch backend/queueAttribute.json
    getDashboardTypeByQueueAttributes(dashboard: DashboardType, queueName: string, attribute: string) : DashboardType {
        //let dashboard: DashboardType  = { label: "", attribute: "", value: "", class: "", icon: "" };
        dashboard.label = queueName;
        dashboard.attribute = attribute;
        this.queueService.getQueueAttribute(this.realmName, queueName, attribute).subscribe(data => {
            const {value} = data;
            console.log("getQueueAttribute.value= " + value + " - " + attribute + " - " + queueName);
            dashboard.value = value;
            let count: number = +value;
            if (count == 0) {
                dashboard.class = "success";
                dashboard.icon = env.iconSuccess;
            } else if (count > this.queueMax) {
                dashboard.class = "danger";
                dashboard.icon = env.iconDanger;
            } else if (count <= this.queueMax) {
                dashboard.class = "warning";
                dashboard.icon = env.iconWarning;
            }
        });
        return dashboard;
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
