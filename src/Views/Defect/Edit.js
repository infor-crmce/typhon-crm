/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/Defect/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Defect.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        idPrefixText: 'id prefix',
        idSuffixText: 'id suffix',
        titleText: 'Defect',
        areaText: 'area',
        categoryText: 'category',
        subjectText: 'subject',

        //View Properties
        entityName: 'Defect',
        id: 'defect_edit',
        insertSecurity: 'Entities/Defect/Add',
        updateSecurity: 'Entities/Defect/Edit',
        querySelect: [
            'AlternateKeyPrefix',
            'AlternateKeySuffix',
            'Area',
            'Category',
            'Subject'
        ],
        resourceKind: 'defects',

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.idPrefixText,
                name: 'AlternateKeyPrefix',
                property: 'AlternateKeyPrefix',
                type: 'text'
            },
            {
                label: this.idSuffixText,
                name: 'AlternateKeySuffix',
                property: 'AlternateKeySuffix',
                type: 'text'
            },
            {
                label: this.areaText,
                name: 'Area',
                property: 'Area',
                type: 'text'
            },
            {
                label: this.categoryText,
                name: 'Category',
                property: 'Category',
                type: 'text'
            },
            {
                label: this.subjectText,
                name: 'Subject',
                property: 'Subject',
                type: 'text'
            }]);
        }
    });
});