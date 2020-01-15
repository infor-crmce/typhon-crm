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
import lang from 'dojo/_base/lang';
// import connect from 'dojo/_base/connect';
import Edit from 'argos/Edit';
// import MODEL_NAMES from '../../Models/Names';
// import format from 'crm/Format';
// import validator from 'crm/Validator';
import getResource from 'argos/I18n';

const resource = getResource('paymentDistributionEdit');
const dtFormatResource = getResource('activityEditDateTimeFormat');

const __class = declare('crm.Integrations.BOE.Views.PaymentDistribution.Edit', [Edit], {
  // View Properties
  id: 'payment_distribution_edit',
  detailView: 'payment_distribution_detail',
  insertView: 'payment_distribution_insert',
  insertSecurity: 'Entities/PaymentDistribution/Add',
  updateSecurity: 'Entities/PaymentDistribution/Edit',
  resourceKind: 'paymentDistributions',

  // localization
  titleText: resource.titleText,
  typeLabelText: resource.typeLabelText,
  amountLabelText: resource.amountLabelText,
  distributionDateLabelText: resource.distributionDateLabelText,
  paymentLabelText: resource.paymentLabelText,
  invoiceLabelText: resource.invoiceLabelText,
  invoicePaymentTypeLabelText: resource.invoicePaymentTypeLabelText,
  startingFormatText: dtFormatResource.startingFormatText,
  startingFormatText24: dtFormatResource.startingFormatText24,

  init: function init() {
    this.inherited(init, arguments);
  },
  createTypeList: function createTypeList() {
    const list = [];

    list.push({
      $key: 'Invoice',
      $descriptor: this.invoicePaymentTypeLabelText,
    });
    return {
      $resources: list,
    };
  },
  paymentLookupWhere: () => '',
  invoiceLookupWhere: () => '',
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Payment',
        property: 'Payment',
        label: this.paymentLabelText,
        type: 'lookup',
        emptyText: '',
        autoFocus: true,
        required: true,
        valueTextProperty: 'Payment.PaymentId',
        view: 'distribution_payment',
        where: entry => this.paymentLookupWhere(entry, this),
      }, {
        name: 'ErpInvoice',
        property: 'ERPInvoice',
        label: this.invoiceLabelText,
        type: 'lookup',
        emptyText: '',
        required: true,
        valueTextProperty: 'ERPInvoice.InvoiceNumber',
        default: '',
        view: 'payment_distribution_invoice',
        where: entry => this.invoiceLookupWhere(entry, this),
      }, {
        name: 'Seccode',
        property: 'SecCodeID',
        type: 'hidden',
        default: 'SYST00000001',
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeLabelText,
        type: 'select',
        view: 'select_list',
        requireSelection: true,
        valueKeyProperty: false,
        valueTextProperty: false,
        default: 'Invoice',
        data: this.createTypeList(),
        required: true,
      }, {
        name: 'AppliedAmount',
        property: 'AppliedAmount',
        label: this.amountLabelText,
        type: 'decimal',
        required: true,
        default: 0.00,
      }, {
        name: 'AppliedDate',
        property: 'AppliedDate',
        label: this.distributionDateLabelText,
        required: true,
        type: 'date',
        timeless: false,
        showTimePicker: true,
        showRelativeDateTime: false,
        dateFormatText: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
        minValue: (new Date(1900, 0, 1)),
        default: new Date(Date.now()),
      }],
    }]);
  },
});

lang.setObject('icboe.Views.PaymentDistribution.Edit', __class);
export default __class;
