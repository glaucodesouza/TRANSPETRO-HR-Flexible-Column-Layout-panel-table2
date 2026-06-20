sap.ui.define([
    "sap/ui/core/UIComponent",
    "zhr/flexiblecolumnlayout/model/models",
    "sap/f/library",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/ui/model/json/JSONModel"
], (
    UIComponent,
    models,
    fioriLibrary,
    FlexibleColumnLayoutSemanticHelper,
    JSONModel
) => {
    "use strict";

    const LayoutType = fioriLibrary.LayoutType;

    return UIComponent.extend("zhr.flexiblecolumnlayout.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {

            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(models.createDeviceModel(), "device");

            const oLayoutModel = new JSONModel({
                layout: LayoutType.OneColumn,
                actionButtonsInfo: {
                    midColumn: {
                        fullScreen: null,
                        exitFullScreen: null,
                        closeColumn: null
                    },
                    endColumn: {
                        fullScreen: null,
                        exitFullScreen: null,
                        closeColumn: null
                    }
                }
            });

            this.setModel(oLayoutModel, "layout");

            // Model Ocorrencias INI ------------------------------------------------
            // const oOcorrencias = {
            //     Ocorrencias: [
            //         {
            //             Periodo: "Janeiro 2024",
            //             Empregado: "00001234",
            //             Data: new Date(2024, 0, 1),
            //             HoraInicio: "08:00",
            //             HoraFim: "12:00",
            //             Diferenca: "",
            //             TipoOcorrencia: "",
            //             Justificativa: "",
            //             ObservacaoSolicitacao: "",
            //             status: "01",
            //             editMode: false
            //         },
            //         {
            //             Periodo: "Janeiro 2024",
            //             Empregado: "00001234",
            //             Data: new Date(2024, 0, 1),
            //             HoraInicio: "13:00",
            //             HoraFim: "17:00",
            //             Diferenca: "",
            //             TipoOcorrencia: "",
            //             Justificativa: "",
            //             ObservacaoSolicitacao: "",
            //             status: "02",
            //             editMode: false
            //         },
            //         {
            //             Periodo: "Janeiro 2024",
            //             Empregado: "00001234",
            //             Data: new Date(2024, 0, 1),
            //             HoraInicio: "08:00",
            //             HoraFim: "17:00",
            //             Diferenca: "",
            //             TipoOcorrencia: "Férias",
            //             Justificativa: "F001",
            //             ObservacaoSolicitacao: "Solicitação de férias para o mês de março.",
            //             status: "03",
            //             editMode: false
            //         },
            //         {
            //             Periodo: "Fevereiro 2024",
            //             Empregado: "00001234",
            //             Data: new Date(2024, 1, 1),
            //             HoraInicio: "08:00",
            //             HoraFim: "17:00",
            //             Diferenca: "",
            //             TipoOcorrencia: "Licença Médica",
            //             Justificativa: "L002",
            //             ObservacaoSolicitacao: "Solicitação de licença médica para tratamento de saúde.",
            //             status: "04",
            //             editMode: false
            //         }
            //     ]
            // };

            // const oModel = new JSONModel(oOcorrencias);
            // this.setModel(oModel, "mdlOcorrencias");
            // Model Ocorrencias FIM ------------------------------------------------

            this.getRouter().initialize();


        },

        getHelper() {
            const oFCL = this.getRootControl().byId("flexiblecolumnlayout");

            return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, {
                defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded
            });
        }
    });
});