/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
// import lang from 'dojo/_base/lang';
// import string from 'dojo/string';
// import utility from 'argos/Utility';
import Edit from 'argos/Edit';
// import getResource from 'argos/I18n';
// import Adapter from 'argos/Models/Adapter';
// import BusyIndicator from 'argos/Dialogs/BusyIndicator';
// import validator from 'crm/Validator';
// import CRM_MODEL_NAMES from 'crm/Models/Names';
// import MODEL_NAMES from '../../Models/Names';
// import Utility from '../../Utility';

// const resource = getResource('quoteEdit');
// const contactResource = getResource('contactModel');
// const dtFormatResource = getResource('quoteEditDateTimeFormat');

/**
 * @class crm.Views.Account.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Edit
 * @requires crm.Format
 * @requires crm.Validator
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.Product.Edit', [Edit], {
  // Localization

  // View Properties
  id: 'product_edit',
  detailView: 'product_detail',
  // insertSecurity: 'Entities/Quote/Add',
  // updateSecurity: 'Entities/Quote/Edit',
  resourceKind: 'products',
  // modelName: MODEL_NAMES.PRODUCT,
  _busyIndicator: null,

  init: function init() {
    this.inherited(arguments);

    this.connect(this.fields.Product, 'onChange', this.onProductChange);
  },
  // insert: function insert() {
  //  this.showUnpromotedFields();
  //  this.inherited(arguments);
  // },
  isQuoteClosed: function isQuoteClosed() {
    return this.entry && this.entry.IsClosed;
  },
  processData: function processData() {
    this.showBusy();
    this.inherited(arguments);
    this.getEntriesFromIds();
    if (this.isQuoteClosed()) {
      App.bars.tbar.disableTool('save');
    } else {
      App.bars.tbar.enableTool('save');
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: 'product',
        name: 'Product',
        property: 'Product',
        type: 'lookup',
        emptyText: '',
        valueTextProperty: 'ProductName',
        view: 'product_related',
        autoFocus: true,
        required: true,
      },
        // , {
        //    label: this.backOfficeText,
        //    name: 'BackOffice',
        //    type: 'lookup',
        //    emptyText: '',
        //    valueTextProperty: 'BackOfficeName',
        //    view: 'quote_backoffice_related',
        //    where: 'IsActive eq true',
        //    include: false,
        // }
      ] },
    ]);
  },
});

export default __class;
