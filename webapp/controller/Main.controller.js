sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("definerequire.controller.Main", {

        doSomething : function () {
            
            var URLHelper = sap.ui.require("sap/m/library").URLHelper;
            //URLHelper.redirect("https://sapui5.hana.ondemand.com/sdk/#/topic/d12024e38385472a89c1ad204e1edb48", "_blank");

            // add a lazy dependency to sap.ui.codeeditor in the manifest.json!
            sap.ui.getCore().loadLibrary("sap.ui.codeeditor", {
                async: true
            }).then(function() {

              sap.ui.require(["sap/ui/codeeditor/CodeEditor"], function(CodeEditor) {
                
                // do something with the CodeEditor

              }.bind(this));

            }.bind(this));

        }

    });

});