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
import _ModelBase from 'argos/Models/_ModelBase';
import format from 'crm/Format';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('paymentDistributionModel');
const paymentResource = getResource('paymentModel');
const invoiceResource = getResource('erpInvoiceModel');

const __class = declare('crm.Integrations.BOE.Models.PaymentDistribution.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'paymentDistribution',
  entityName: 'PaymentDistribution',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.PAYMENTDISTRIBUTION,
  iconClass: 'document',
  detailViewId: 'payment_distribution_detail',
  listViewId: 'payment_distribution_list',
  editViewId: 'payment_distribution_edit',
  insertViewId: 'payment_distribution_insert',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'ERPInvoice',
      displayName: invoiceResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ERPInvoice',
      parentPropertyType: 'object',
      relatedEntity: 'ERPInvoice',
    }, {
      name: 'Payment',
      displayName: paymentResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Payment',
      parentPropertyType: 'object',
      relatedEntity: 'Payment',
    }]);
    return rel;
  },
  getEntityDescription: function getEntityDescription(entry) {
    if (entry) {
      const date = format.relativeDate(entry.AppliedDate, true);
      const amount = format.currency(entry.AppliedAmount);
      const titleText = `${date} /  ${amount}`;
      return titleText;
    }
    return '';
  },
});
lang.setObject('icboe.Models.PaymentDistribution.Base', __class);
export default __class;
