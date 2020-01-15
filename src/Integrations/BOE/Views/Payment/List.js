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
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import utility from '../../Utility';
import getResource from 'argos/I18n';

const resource = getResource('paymentList');

const __class = declare('crm.Integrations.BOE.Views.Payment.List', [List, _RightDrawerListMixin, _MetricListMixin], {
  formatter: format,
  util: utility,

  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading"><label class="group-label">{%: $$.paymentDateLabelText %}</label> {%: $$.formatter.date($.PaymentDate) %}</p>',
    '<p class="micro-text"> {% if ($.Account) { %}<label class="group-label"> {%: $$.accountLabelText %}</label> {%: $.Account.AccountName %} {% } %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.referenceNumberLabelText %}</label> {%: $.ReferenceNumber %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.typeLabelText %}</label> {%: $.Type %}</p>',
  ]),

  // Localization
  descriptionText: resource.descriptionText,
  titleText: resource.titleText,
  accountLabelText: resource.accountLabelText,
  referenceNumberLabelText: resource.referenceNumberLabelText,
  typeLabelText: resource.typeLabelText,
  paymentDateLabelText: resource.paymentDateLabelText,
  viewAccountActionText: resource.viewAccountActionText,
  viewDistributionsActionText: resource.viewDistributionsActionText,
  addDistributionActionText: resource.addDistributionActionText,
  editActionText: resource.editActionText,

  // View Properties
  id: 'payment_list',
  detailView: 'payment_detail',
  editView: 'payment_edit',
  insertView: 'payment_insert',
  modelName: MODEL_NAMES.PAYMENT,
  resourceKind: 'payments',
  allowSelection: true,
  enableActions: true,
  enableHashTags: true,
  expose: true,
  security: 'Entities/Payment/View',
  insertSecurity: 'Entities/Payment/Add',

  // Groups
  enableDynamicGroupLayout: false,
  groupsEnabled: false,
  entityName: 'Payment',

  // Card layout
  itemIconClass: 'warehouse',
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'Account.AccountName',
      }),
    }, {
      id: 'viewDistribution',
      label: this.viewDistributionsActionText,
      enabled: true,
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'payment_distribution_list',
        keyProperty: 'PaymentId',
        textProperty: 'PaymentId',
      }),
    }, {
      id: 'addDistribution',
      label: this.addDistributionActionText,
      enabled: true,
      action: 'onAddDistributionClick',
    }, {
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      security: 'Entities/Payment/Edit',
      action: 'navigateToEditView',
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
    return `upper(Account.AccountName) like "${q}%" or upper(Description) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.Payment.List', __class);
export default __class;
