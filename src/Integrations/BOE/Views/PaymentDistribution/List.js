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
import action from 'crm/Action';
import List from 'argos/List';
import format from 'crm/Format';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _ListOfflineMixin from 'argos/Offline/_ListOfflineMixin';
import MODEL_NAMES from '../../Models/Names';
import utility from '../../Utility';
import getResource from 'argos/I18n';

const resource = getResource('paymentDistributionList');

const __class = declare('crm.Integrations.BOE.Views.PaymentDistribution.List', [List, _RightDrawerListMixin, _ListOfflineMixin], {
  formatter: format,
  util: utility,

  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading"><label class="group-label">{%: $$.paymentLabelText %}</label> {%: $.PaymentId %}</p>',
    '<p class="micro-text"> {% if ($.AppliedDate) { %}<label class="group-label">{%: $$.distributionDateLabelText %}</label> {%: $$.formatter.date($.AppliedDate) %} {% } %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.amountLabelText %}</label> {%: $.AppliedAmount %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  typeLabelText: resource.typeLabelText,
  amountLabelText: resource.amountLabelText,
  distributionDateLabelText: resource.distributionDateLabelText,
  paymentLabelText: resource.paymentLabelText,
  invoiceLabelText: resource.invoiceLabelText,

  // View Properties
  id: 'payment_distribution_list',
  detailView: 'payment_distribution_detail',
  editView: 'payment_distribution_edit',
  insertView: 'payment_distribution_insert',
  modelName: MODEL_NAMES.PAYMENTDISTRIBUTION,
  resourceKind: 'paymentDistributions',
  allowSelection: true,
  enableActions: true,
  enableHashTags: true,
  enableOffline: true,
  expose: true,
  security: 'Entities/PaymentDistribution/View',
  insertSecurity: 'Entities/PaymentDistribution/Add',

  // Groups
  enableDynamicGroupLayout: false,
  groupsEnabled: false,
  entityName: 'PaymentDistribution',

  // Card layout
  itemIconClass: 'warehouse',

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewERPInvoice',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'ERPInvoice.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'erpinvoice_detail',
        keyProperty: 'ERPInvoice.$key',
        textProperty: 'ERPInvoice.InvoiceNumber',
      }),
    }, {
      id: 'edit',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'ERPInvoice.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'erpinvoice_detail',
        keyProperty: 'ERPInvoice.$key',
        textProperty: 'ERPInvoice.InvoiceNumber',
      }),
    }]);
  },
  getTitle: function getTitle(entry) {
    if (!entry) {
      return '';
    }

    return (this._model && this._model.getEntityDescription(entry)) || entry.$descriptor;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ErpInvoice.InvoiceNumber) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.PaymentDistribution.List', __class);
export default __class;
