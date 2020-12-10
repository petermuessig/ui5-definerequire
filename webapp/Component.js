sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {

    return UIComponent.extend("definerequire.Component", {

        metadata: {
            manifest: "json"
        },

        onInit: function() {
            UIComponent.prototype.onInit.apply(this, arguments);
        }

    })

});