sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox",
    "sap/f/library"
], function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
    "use strict";

    const LayoutType = fioriLibrary.LayoutType;

    return Controller.extend("zhr.flexiblecolumnlayout.controller.List", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this._bDescendingSort = false;
        },

        onListItemPress: function (oEvent) {

            const oItem = oEvent.getParameter("listItem");
            const oContext = oItem.getBindingContext("mdlOcorrencias");

            if (!oContext) {
                return;
            }

            const sPath = oContext.getPath();
            const sIndex = sPath.split("/").pop();

            const oNextUIState = this.getOwnerComponent()
                .getHelper()
                .getNextUIState(1);

            this.oRouter.navTo("detail", {
                ocorrencia: sIndex,
                layout: oNextUIState.layout
            });

            // const oItem = oEvent.getParameter("listItem");
            // const oContext = oItem.getBindingContext("mdlOcorrencias");

            // if (!oContext) {
            //     return;
            // }

            // const sPath = oContext.getPath();
            // const sIndex = sPath.split("/").pop();

            // this.oRouter.navTo("detail", {
            //     ocorrencia: sIndex,
            //     layout: LayoutType.TwoColumnsMidExpanded
            // });
        },

        onSearch: function (oEvent) {
            const sQuery = oEvent.getParameter("query");
            const aFilters = [];

            if (sQuery && sQuery.length > 0) {
                aFilters.push(new Filter("Empregado", FilterOperator.Contains, sQuery));
            }

            this.getView()
                .byId("productsTable")
                .getBinding("items")
                .filter(aFilters, "Application");
        },

        onAdd: function () {
            MessageBox.show("This functionality is not ready yet.", {
                icon: MessageBox.Icon.INFORMATION,
                title: "Aw, Snap!",
                actions: [MessageBox.Action.OK]
            });
        },

        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;

            const oTable = this.getView().byId("productsTable");
            const oBinding = oTable.getBinding("items");
            const oSorter = new Sorter("Empregado", this._bDescendingSort);

            oBinding.sort(oSorter);
        }
    });
});