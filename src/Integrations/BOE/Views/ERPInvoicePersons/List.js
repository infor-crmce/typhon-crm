import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoicePersonsList');

const __class = declare('crm.Integrations.BOE.Views.ERPInvoicePersons.List', [List, _RightDrawerListMixin, _MetricListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.ErpPerson.Name %}</p>',
    '<p class="micro-text address">{%: $.ErpPerson.Address.FullAddress %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'invoiceperson_list',
  modelName: MODEL_NAMES.ERPINVOICEPERSON,
  resourceKind: 'erpInvoicePersons',
  allowSelection: true,
  enableActions: true,
  security: 'Entities/ErpPerson/View',
  insertSecurity: 'Entities/ErpPerson/Add',

  // Card layout
  itemIconClass: 'user',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ErpPerson.Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPInvoicePersons.List', __class);
export default __class;
