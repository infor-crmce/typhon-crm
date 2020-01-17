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
// import getResource from 'argos/I18n';

// const resource = getResource('TicketProductList');

/**
 * @class crm.Views.OpportunityProduct.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.TicketProduct.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.AccountProduct.ProductName %}</p>',
    '<p class="micro-text">',
    '{%: $.AccountProduct.ActualId %}',
    '</p>',
  ]),

  // Localization
  titleText: 'Ticket Product',

  // View Properties
  id: 'ticketproduct_list',
  security: 'Entities/Opportunity/View',
  detailView: 'ticketproduct_detail',
  insertView: 'ticketProducts_edit',
  // queryOrderBy: 'Sort',
  querySelect: [
    // 'Description',
    // 'Name',
    // 'Family',
    // 'Price',
    // 'Program',
    // 'FixedCost',
    'Id', '$key', 'AccountProduct/ProductName', 'AccountProduct/SerialNumber', 'AccountProduct/ActualId',
    'AccountProduct/Evaluation',
  ],
  resourceKind: 'ticketAccountProducts', // 'accountproducts',
  allowSelection: true,
  enableActions: true,

  // formatSearchQuery: function formatSearchQuery(searchQuery) {
  //  const q = this.escapeSearchQuery(searchQuery.toUpperCase());
  //  return `(upper(Product.Name) like "${q}%" or upper(Product.Family) like "${q}%")`;
  // },
});

export default __class;
