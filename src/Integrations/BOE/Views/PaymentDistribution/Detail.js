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

const resource = getResource('paymentDistributionDetail');

/**
 * @class crm.Integrations.BOE.Views.PaymentDistribution.Detail
 * @extends argos.Detail
 */
const __class = declare('crm.Integrations.BOE.Views.PaymentDistribution.Detail', [Detail], /** @lends crm.Integrations.BOE.Views.PaymentDistribution.Detail# */{
  // Localization
  titleText: resource.titleText,
  typeLabelText: resource.typeLabelText,
  amountLabelText: resource.amountLabelText,
  distributionDateLabelText: resource.distributionDateLabelText,
  paymentLabelText: resource.paymentLabelText,
  invoiceLabelText: resource.invoiceLabelText,

  editView: 'payment_distribution_edit',
  insertView: 'payment_distribution_insert',

  // View Properties
  id: 'payment_distribution_detail',
  modelName: MODEL_NAMES.PAYMENTDISTRIBUTION,
  resourceKind: 'paymentdistributions',
  enableOffline: true,
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
        property: 'Payment.Amount',
        label: this.paymentLabelText,
      }, {
        name: 'ErpInvoice',
        property: 'ERPInvoice.InvoiceNumber',
        label: this.invoiceLabelText,
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeLabelText,
      }, {
        name: 'AppliedAmount',
        property: 'AppliedAmount',
        label: this.amountLabelText,
      }, {
        name: 'AppliedDate',
        property: 'AppliedDate',
        label: this.distributionDateLabelText,
        renderer: format.date.bindDelegate(this, null, false),
      }],
    }]);
  },
});

lang.setObject('icboe.Views.PaymentDistribution.Detail', __class);
export default __class;
