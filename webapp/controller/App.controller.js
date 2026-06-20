sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"
], (
    BaseController,
    fioriLibrary
) => {
    "use strict";

    const LayoutType = fioriLibrary.LayoutType;

    return BaseController.extend("zhr.flexiblecolumnlayout.controller.App", {
        onInit() {
            this.getOwnerComponent()
                .getRouter()
                .attachRouteMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(oEvent) {
            const oArguments = oEvent.getParameter("arguments") || {};
            const sLayout = oArguments.layout || LayoutType.OneColumn;

            const oLayoutModel = this.getOwnerComponent().getModel("layout");

            oLayoutModel.setProperty("/layout", sLayout);

            const oHelper = this.getOwnerComponent().getHelper();
            const oUIState = oHelper.getCurrentUIState();

            oLayoutModel.setProperty(
                "/actionButtonsInfo",
                oUIState.actionButtonsInfo
            );
        }
    });
});