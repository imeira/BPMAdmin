// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    baseUrl: 'http://hdixbpmemid01.hdi.br:5555/',
    baseApiUrl: 'http://hdixbpmemid01.hdi.br:5555/rest/Dashboard/',
    host: "HDIXBPMEMIH01",
    realmName: "nsp://HDIXBPMEMIH01.HDI.BR:9000",
    reloadInMilliseconds: 60000,
    queueAttributeSize: "size",
    iconWarning: "fa-cogs",
    iconDanger: "fa-exclamation-triangle",
    iconSuccess: "fa-check-square-o",
    queueMax: 10,
    queueHDIFilaJMS: "dynamicQueues/HDIFilaJMS",
    queueEmissaoDigital: "dynamicQueues/EmissaoDigitalFilaJMS",
    queueEmissaoDigitalProcesso: "EmissaoDigitalProcesso_EmissaoDigitalHDI_SUBQUEUE",
    queueApoliceDigital: "dynamicQueues/ApoliceDigitalFilaJMS",
    queueVistoriaAuto: "GerirVistoriaAuto_GerirVistoriaAuto_SUBQUEUE",
    queueVistoriaAutoLaudo: "GerirVistoriaAuto_AvaliarLaudo_SUBQUEUE",
    queueVistoriaPresencial: "EmissaoVistoriaPresencial_GerirVistoriaPresencial_SUBQUEUE",
    queueVistoriaResidencial: "EmissaVistoriaResidencial_Processo_GerirVistoriaResidencial_SUBQUEUE",
    queueCTDemanda: "ComplianceCTDemanda_Processo_ControleDemandas_SUBQUEUE"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
