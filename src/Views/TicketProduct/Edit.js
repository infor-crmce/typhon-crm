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
import Utility from 'argos/Utility';
// import getResource from 'argos/I18n';

// const resource = getResource('ticketProductEdit');

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
const __class = declare('crm.Views.TicketProduct.Edit', [Edit], {


  // View Properties
  entityName: 'ticketProducts',
  id: 'ticketProducts_edit',
  resourceKind: 'ticketAccountProducts',
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

  applyContext: function applyContext() {
    const entry = this.options && this.options.selectedEntry;

    if (entry) {
      this.fields.Opportunity.setValue(entry);
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
  // onInsertCompleted: function onInsertCompleted() {
  //  this._refreshOpportunityViews();
  //  this.inherited(arguments);
  // },
  _refreshOpportunityViews: function _refreshOpportunityViews() {
    const views = [
      App.getView('opportunityproduct_related'),
      App.getView('opportunity_detail'),
      App.getView('opportunity_list'),
    ];

    views.forEach((view) => {
      if (view) {
        view.refreshRequired = true;
      }
    });
  },
  createLayout: function createLayout() {
    const details = {
      title: this.detailsText,
      name: 'OpportunityProductDetailsEdit',
      children: [{
        label: this.opportunityText,
        name: 'Opportunity',
        property: 'Opportunity',
        type: 'lookup',
        textProperty: 'Description',
        view: 'opportunity_related',
        validator: validator.exists,
      }, {
        name: 'ProductId',
        property: 'ProductId',
        type: 'hidden',
      }, {
        label: this.productText,
        name: 'Product',
        property: 'Product',
        type: 'lookup',
        textProperty: 'Name',
        view: 'product_related',
        validator: validator.exists,
      }, {
        label: this.productFamilyText,
        name: 'Product.Family',
        property: 'Product.Family',
        type: 'text',
        readonly: true,
      }, {
        label: this.priceLevelText,
        name: 'Program',
        property: 'Program',
        textProperty: 'Program',
        type: 'lookup',
        view: 'productprogram_related',
        validator: validator.exists,
        where: (function where() {
          const val = this.fields.Product.getValue();
          return `Product.Name eq "${Utility.escapeSearchQuery(val.Name)}"`;
        }).bindDelegate(this),
      }, {
        label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
        name: 'Price',
        property: 'Price',
        type: 'multiCurrency',
        readonly: true,
      }, {
        label: this.discountText,
        name: 'Discount',
        property: 'Discount',
        type: 'decimal',
        notificationTrigger: 'blur',
      }, {
        label: this.quantityText,
        name: 'Quantity',
        property: 'Quantity',
        type: 'decimal',
        notificationTrigger: 'blur',
      }],
    };

    if (!App.hasMultiCurrency()) {
      details.children.push({
        label: this.adjustedPriceText,
        name: 'CalculatedPrice',
        property: 'CalculatedPrice',
        type: 'multiCurrency',
        notificationTrigger: 'blur',
      });
      details.children.push({
        label: this.extendedPriceText,
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        type: 'multiCurrency',
        readonly: true,
      });
    }

    const extendedPrice = {
      title: this.extendedPriceSectionText,
      name: 'OpportunityProductExtendedPriceEdit',
      children: [{
        label: this.baseExtendedPriceText,
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        type: 'multiCurrency',
        readonly: true,
      }],
    };

    const adjustedPrice = {
      title: this.adjustedPriceSectionText,
      name: 'OpportunityProductAdjustedPriceEdit',
      children: [{
        label: this.baseAdjustedPriceText,
        name: 'CalculatedPrice',
        property: 'CalculatedPrice',
        type: 'multiCurrency',
        notificationTrigger: 'blur',
      }, {
        label: this.myAdjustedPriceText,
        name: 'CalculatedPriceMine',
        property: 'CalculatedPriceMine',
        type: App.hasMultiCurrency() ? 'multiCurrency' : 'hidden',
        notificationTrigger: 'blur',
      }],
    };

    const layout = this.layout || (this.layout = []);

    if (layout.length > 0) {
      return layout;
    }

    layout.push(details);

    if (App.hasMultiCurrency()) {
      layout.push(adjustedPrice);
      layout.push(extendedPrice);
    }
    return layout;
  },
});

export default __class;
