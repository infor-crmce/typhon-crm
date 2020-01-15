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
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('paymentDetail');

/**
 * @class crm.Integrations.BOE.Views.Payment.Detail
 * @extends argos.Detail
 */
const __class = declare('crm.Integrations.BOE.Views.Payment.Detail', [Detail], /** @lends crm.Integrations.BOE.Views.Payment.Detail# */{
  // Localization
  titleText: resource.titleText,
  relatedItemsText: resource.relatedItemsText,
  accountLabelText: resource.accountLabelText,
  referenceNumberLabelText: resource.referenceNumberLabelText,
  typeLabelText: resource.typeLabelText,
  paymentDateLabelText: resource.paymentDateLabelText,
  distributionsLabelText: resource.distributionsLabelText,
  descriptionLabelText: resource.descriptionLabelText,
  addDistributionActionText: resource.addDistributionActionText,
  amountLabelText: resource.amountLabelText,

  editView: 'payment_edit',
  insertView: 'payment_insert',

  // View Properties
  id: 'payment_detail',
  modelName: MODEL_NAMES.PAYMENT,
  resourceKind: 'payments',
  enableOffline: true,
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        id: 'addDistribution',
        label: this.addDistributionActionText,
        enabled: true,
        action: 'onAddDistributionClick',
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Account',
        property: 'Account.AccountName',
        label: this.accountLabelText,
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeLabelText,
      }, {
        name: 'Amount',
        property: 'Amount',
        label: this.amountLabelText,
      }, {
        name: 'PaymentDate',
        property: 'PaymentDate',
        label: this.paymentDateLabelText,
        renderer: format.date.bindDelegate(this, null, false),
      }, {
        name: 'ReferenceNumber',
        property: 'ReferenceNumber',
        label: this.referenceNumberLabelText,
      }, {
        name: 'Description',
        property: 'Description',
        label: this.descriptionLabelText,
      }],
    }, {
      title: this.distributionsLabelText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'PaymentDistribution',
        label: this.distributionsLabelText,
        where: function where(entry) {
          return `PaymentId eq "${entry.$key}"`;
        },
        view: 'payment_distribution_items_related',
      }],
    }]);
  },
});

lang.setObject('icboe.Views.Payment.Detail', __class);
export default __class;
