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
import PaymentUtility from '../../PaymentUtility';
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
  addDistributionActionText: resource.addDistributionActionText,
  amountLeftLabelText: resource.amountLeftLabelText,

  editView: 'payment_distribution_edit',
  insertView: 'payment_distribution_insert',

  // View Properties
  id: 'payment_distribution_detail',
  modelName: MODEL_NAMES.PAYMENTDISTRIBUTION,
  resourceKind: 'paymentdistributions',
  enableOffline: true,

  constructor: function constructor(args) {
    declare.safeMixin(this, args);
  },
  onAddDistributionClick: function onAddDistributionClick() {
    const key = arguments[1].data.$key;
    const data = this.entries;
    if (!!key && !!data) {
      const dataContext = { data: data[key] };
      PaymentUtility.GoToAddDistribution(arguments[0], dataContext);
    }
  },
  preNavigateToInsertView: function preNavigateToInsertView(additionalOptions) {
    const view = this.app.getView(this.insertView || this.editView);
    let options = {
      detailView: this.detailView,
      returnTo: this.id,
      insert: true,
    };

    // Pass along the selected entry (related list could get it from a quick action)
    if (this.options.selectedEntry) {
      options.selectedEntry = this.options.selectedEntry;
    }

    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      enableOffline: true,
      children: [{
        id: 'addDistribution',
        iconClass: 'add',
        label: this.addDistributionActionText,
        enabled: true,
        action: 'preNavigateToInsertView',
        enableOffline: true,
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Payment',
        property: 'PaymentId',
        label: this.paymentLabelText,
        renderer: format.currency.bindDelegate(this),
      }, {
        name: 'AmountLeft',
        property: 'PaymentTotals.AmountLeft',
        label: this.amountLeftLabelText,
        renderer: format.currency.bindDelegate(this),
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
        renderer: format.currency.bindDelegate(this, null, false),
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
