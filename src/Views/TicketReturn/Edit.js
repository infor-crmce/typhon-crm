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
import validator from '../../Validator';
import Edit from 'argos/Edit';
// import Utility from 'argos/Utility';
// import getResource from 'argos/I18n';

// const resource = getResource('opportunityProductEdit');

/**
 * @class crm.Views.OpportunityProduct.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Utility
 *
 * @requires crm.Validator
 * @requires crm.Template
 */
const __class = declare('crm.Views.TicketReturn.Edit', [Edit], {


  // View Properties
  entityName: 'ticketReturns',
  id: 'ticketreturn_edit',
  resourceKind: 'returns',
  querySelect: [
    // 'ActualId',
    'ProductName',
    // 'SerialNumber'


    // 'Opportunity/Description',
    // 'Product/Name',
    // 'Product/Family',
    // 'Program',
    // 'Price',
    // 'Discount',
    // 'AdjustedPrice',
    // 'CalculatedPrice',
    // 'Quantity',
    // 'ExtendedPrice',
  ],
  queryInclude: [
    '$permissions',
  ],
  init: function init() {
    this.inherited(arguments);
    this.connect(this.fields.Product, 'onChange', this.onProductChange);
  },
  // setValues: function setValues(values) {
  //    this.inherited(arguments);
  //    this.fields.Program.setValue({
  //        $key: '',
  //        Program: values.Program,
  //    });
  // },
  applyContext: function applyContext() {
    const entry = this.options && this.options.selectedEntry;

    if (entry) {
      this.fields.Ticket.setValue(entry);
    }
  },
  onProductChange: function onProductChange(value, field) {
    const selection = field && field.currentSelection;
    if (selection) {
      this.fields.ProductId.setValueNoTrigger(value.key);
      this.fields['Product.Family'].setValueNoTrigger(selection.Family);
      this.fields.Program.clearValue();

      this.fields.Price.setValueNoTrigger(selection.Price);
      this.fields.Discount.clearValue();
      this.fields.CalculatedPrice.setValueNoTrigger(selection.Price);

      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * selection.Price);
      }
      this.fields.Quantity.setValueNoTrigger(1);
      this._updateExtendedPrice();
    }
  },
  onInsertCompleted: function onInsertCompleted() {
    this._refershTicketViews();
    this.inherited(arguments);
  },
  _refershTicketViews: function _refershTicketViews() {
    const views = [
      App.getView('ticketreturn_list'),
      App.getView('ticket_detail'),
      App.getView('ticket_list'),
    ];

    views.forEach((viewId) => {
      const view = App.getView(viewId);
      if (view) {
        view.refreshRequired = true;
      }
    });
    ReUI.back();
  },
  createLayout: function createLayout() {
    const details = {
      title: this.detailsText,
      name: 'TicketProductDetailsEdit',
      children: [
        {
          label: 'Ticket',
          name: 'Ticket',
          property: 'Ticket',
          type: 'lookup',
          textProperty: 'Name',
          view: 'ticket_list',
          required: true,
          validator: validator.exists,
        }, {
          label: 'Account',
          name: 'Account',
          property: 'Account',
          textProperty: 'AccountName',
          type: 'lookup',
          view: 'account_related',
        }, {
          //    label: 'Contact',
          //  name: 'Contact',
          //  property: 'Contact',
          //    type: 'lookup',
          //    textProperty: 'Name',
          //    view: 'contact_list',
          //    validator: validator.exists,
          // }, {
          label: 'Type',
          name: 'Type',
          property: 'Type',
          picklist: 'Return Type',
          title: 'Type',
          type: 'picklist',
        }, {
          label: 'Status',
          name: 'Status',
          property: 'Status',
          picklist: 'Return Status',
          title: 'Status',
          type: 'picklist',
        }, {
          label: 'Priority',
          name: 'Priority',
          property: 'Priority',
          picklist: 'Return Priority',
          title: 'Priority',
          type: 'picklist',
        }, {
          label: 'Reason',
          name: 'Product.Family',
          property: 'Product.Family',
          type: 'text',
        },
      ],
    };

    // if (!App.hasMultiCurrency()) {
    //  details.children.push({
    //    label: this.adjustedPriceText,
    //    name: 'CalculatedPrice',
    //    property: 'CalculatedPrice',
    //    type: 'multiCurrency',
    //    notificationTrigger: 'blur',
    //  });
    //  details.children.push({
    //    label: this.extendedPriceText,
    //    name: 'ExtendedPrice',
    //    property: 'ExtendedPrice',
    //    type: 'multiCurrency',
    //    readonly: true,
    //  });
    // }

    // const adjustedPrice = {
    //  title: this.adjustedPriceSectionText,
    //  name: 'OpportunityProductAdjustedPriceEdit',
    //  children: [{
    //    label: this.baseAdjustedPriceText,
    //    name: 'CalculatedPrice',
    //    property: 'CalculatedPrice',
    //    type: 'multiCurrency',
    //    notificationTrigger: 'blur',
    //  }, {
    //    label: this.myAdjustedPriceText,
    //    name: 'CalculatedPriceMine',
    //    property: 'CalculatedPriceMine',
    //    type: App.hasMultiCurrency() ? 'multiCurrency' : 'hidden',
    //    notificationTrigger: 'blur',
    //  }],
    // };

    const layout = this.layout || (this.layout = []);

    if (layout.length > 0) {
      return layout;
    }

    layout.push(details);

    // if (App.hasMultiCurrency()) {
    //  layout.push(adjustedPrice);
    //  layout.push(extendedPrice);
    // }
    return layout;
  },
});

export default __class;
