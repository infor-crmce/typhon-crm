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

const resource = getResource('paymentModel');
const accountResource = getResource('accountModel');
const distributionResource = getResource('paymentDistributionModel');

const __class = declare('crm.Integrations.BOE.Models.Payment.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'payments',
  entityName: 'Payment',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.PAYMENT,
  iconClass: 'document',
  detailViewId: 'payment_detail',
  listViewId: 'payment_list',
  editViewId: 'payment_edit',
  insertViewId: 'payment_insert',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Account',
      parentPropertyType: 'object',
      relatedEntity: 'Account',
    }, {
      name: 'PaymentDistribution',
      displayName: distributionResource.entityDisplayName,
      type: 'OneToMany',
      parentProperty: 'Payment',
      parentPropertyType: 'object',
      relatedEntity: 'PaymentDistribution',
    }, {
      name: 'PaymentTotals',
      displayName: 'Payment Totals',
      type: 'ManyToOne',
      parentProperty: 'Payment',
      parentPropertyType: 'object',
      relatedEntity: 'PaymentTotals',
    }]);
    return rel;
  },
  getEntityDescription: function getEntityDescription(entry) {
    if (entry) {
      const date = format.relativeDate(entry.PaymentDate, true);
      const amount = format.currency(entry.Amount);
      const titleText = `${date} /  ${amount}`;
      return titleText;
    }
    return '';
  },
});
lang.setObject('icboe.Models.Payment.Base', __class);
export default __class;
