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

  init: function init() {
    this.inherited(init, arguments);
  },
  createTypeList: function createTypeList() {
    const list = [];

    list.push({
      $key: 'Check',
      $descriptor: 'Check',
    });
    list.push({
      $key: 'Cash',
      $descriptor: 'Cash',
    });
    if (App.isOnline()) {
      list.push({
        $key: 'Credit',
        $descriptor: 'Credit',
      });
    }
    return {
      $resources: list,
    };
  },
  accountLookupWhere: function accountLookupWhere() {
    return '';
  },
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
        name: 'Account',
        property: 'Account',
        label: this.accountLabelText,
        type: 'lookup',
        emptyText: '',
        autoFocus: true,
        required: true,
        valueTextProperty: 'Account.AccountName',
        view: 'account_payments',
        where: entry => this.accountLookupWhere(entry, this),
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeLabelText,
        type: 'select',
        view: 'select_list',
        requireSelection: true,
        valueKeyProperty: false,
        valueTextProperty: false,
        data: this.createTypeList(),
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
