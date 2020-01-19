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
import validator from 'crm/Validator';
import getResource from 'argos/I18n';

const resource = getResource('paymentEdit');
const dtFormatResource = getResource('activityEditDateTimeFormat');

const __class = declare('crm.Integrations.BOE.Views.Payment.Edit', [Edit], {
  // View Properties
  id: 'payment_edit',
  detailView: 'payment_detail',
  insertView: 'payment_insert',
  insertSecurity: 'Entities/Payment/Add',
  updateSecurity: 'Entities/Payment/Edit',
  resourceKind: 'payments',

  enableOffline: true,
  // localization
  titleText: resource.titleText,
  accountLabelText: resource.accountLabelText,
  referenceNumberLabelText: resource.referenceNumberLabelText,
  typeLabelText: resource.typeLabelText,
  paymentDateLabelText: resource.paymentDateLabelText,
  descriptionLabelText: resource.descriptionLabelText,
  amountLabelText: resource.amountLabelText,
  startingFormatText: dtFormatResource.startingFormatText,
  startingFormatText24: dtFormatResource.startingFormatText24,

  actionPropertyTemplate: new Simplate([
    '<div class="{%= $$.multiColumnClass %} columns{%= $.cls %}">',
    '<label>{%: $.label %}</label>',
    '<span class="data" hidden>',
    '<a class="hyperlink" data-action="{%= $.action %}" {% if ($.disabled) { %}data-disable-action="true"{% } %} class="{% if ($.disabled) { %}disabled{% } %}">',
    '{%= $.value %}',
    '</a>',
    '</span>',
    '</div>',
  ]),

  init: function init() {
    this.inherited(init, arguments);
  },
  requestTemplate: function requestTemplate() {
    if (App.isOnline()) {
      this.inherited(arguments);
    } else {
      this.onRequestTemplateSuccess();
      return {
        $httpStatus: 200,
        $descriptor: '',
        PaymentId: null,
        CreateUser: null,
        CreateDate: null,
        ModifyUser: null,
        ModifyDate: null,
        SeccodeId: null,
        PaymentDate: null,
        ReferenceNumber: null,
        Description: null,
        Amount: null,
        Type: null,
        AccountId: null,
        Account: null,
        PaymentDistributions: {},
      };
    }
  },
  accountLookupWhere: function accountLookupWhere() {
    return '';
  },
  applyContext: function applyContext() {
    this.inherited(applyContext, arguments);

    if (this.options) {
      if (this.options.entry) {
        if (!this.options.entry.Account) {
          if (!this.options.isPayment) {
            this.options.entry.Account = this.options.entry;
          }
          this.options.entry.Account.$descriptor = this.options.entry.Account.$descriptor || this.options.entry.Account.AccountName;
        }
      }
      if (this.options.selectedEntry) {
        this.options.entry = {};
        if (this.options.selectedEntry) {
          if (!this.options.isPayment) {
            this.options.entry.Account = this.options.selectedEntry;
          } else {
            this.options.entry = this.options.selectedEntry;
          }
          this.options.entry.Account.$descriptor = this.options.entry.Account.$descriptor || this.options.entry.Account.AccountName;
        }
      }
    }
  },
  show: function show(options) {
    this.inherited(show, arguments);
    let entry = {};
    this.fields.AmountLeft.disable();
    if (options && options.entry) {
      entry = options.entry;
    } else {
      if (options && options.selectedEntry) {
        entry = { Account: options.selectedEntry };
      }
    }
    if (this.inserting && entry && entry.Account) {
      // this.fields.Account.disable();
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      enableOffline: true,
      children: [],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Account',
        property: 'Account',
        label: this.accountLabelText,
        type: 'lookup',
        emptyText: '',
        autoFocus: true,
        required: true,
        valueTextProperty: 'AccountName',
        view: 'account_payments',
        where: entry => this.accountLookupWhere(entry, this),
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeLabelText,
        type: 'select',
        view: 'payment_select_list',
        requireSelection: true,
        valueKeyProperty: false,
        valueTextProperty: false,
        required: true,
        validator: validator.exists,
      }, {
        name: 'Amount',
        property: 'Amount',
        label: this.amountLabelText,
        type: 'decimal',
        required: true,
        default: 0.00,
        validator: validator.exists,
      }, {
        name: 'AmountLeft',
        property: 'PaymentTotals.AmountLeft',
        type: 'decimal',
        hidden: true,
        label: 'Amount Left',
      }, {
        name: 'PaymentDate',
        property: 'PaymentDate',
        label: this.paymentDateLabelText,
        required: true,
        type: 'date',
        timeless: false,
        showTimePicker: false,
        showRelativeDateTime: false,
        dateFormatText: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
        minValue: (new Date(1900, 0, 1)),
        default: new Date(Date.now()),
      }, {
        name: 'ReferenceNumber',
        property: 'ReferenceNumber',
        label: this.referenceNumberLabelText,
        type: 'text',
      }, {
        name: 'Description',
        property: 'Description',
        label: this.descriptionLabelText,
        type: 'textarea',
      }],
    }]);
  },
});

lang.setObject('icboe.Views.Payment.Edit', __class);
export default __class;
