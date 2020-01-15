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
import List from 'argos/List';
import getResource from 'argos/I18n';
import _ListOfflineMixin from 'argos/Offline/_ListOfflineMixin';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('productList');

/**
 * @class crm.Views.Product.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Product.List', [List, _ListOfflineMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Name %} | {%: $.Description %}</p>',
    '<p class="micro-text">',
    '{%: $.Family %}',
    '</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  modelName: MODEL_NAMES.PRODUCT,

  // View Properties
  id: 'product_related',
  detailView: 'product_detail',
  security: 'Entities/Product/View',
  queryOrderBy: 'Name',
  querySelect: [
    'Description',
    'Name',
    'Family',
    'Price',
    'Program',
    'FixedCost',
  ],
  resourceKind: 'products',
  entityName: 'Product',
  briefcaseAdded: false,
  createToolLayout: function createToolLayout() {
    this.inherited(arguments);

    if (this.tools && this.tools.tbar && !this.briefcaseAdded && !window.App.supportsTouch()) {
      this.tools.tbar.push({
        id: 'briefCase',
        svg: 'roles',
        title: 'Briefcase',
        action: 'briefCaseList',
        security: '',
      });
      this.briefcaseAdded = true;
    }

    if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
      this.tools.tbar.push({
        id: 'refresh',
        svg: 'refresh',
        action: '_refreshClicked',
      });

      this._refreshAdded = true;
    }

    return this.tools;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Name) like "${q}%" or upper(Family) like "${q}%")`;
  },
});

export default __class;
