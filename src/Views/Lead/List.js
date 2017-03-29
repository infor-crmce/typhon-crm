import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import action from '../../Action';
import utility from 'argos/Utility';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';

const resource = getResource('leadList');

/**
 * @class crm.Views.Lead.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 *
 * @requires argos.Format
 * @requires argos.Utility
 *
 * @requires crm.Action
 */
const __class = declare('crm.Views.Lead.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.LeadNameLastFirst %}</p>',
    '<p class="micro-text">',
    '{%: $$.joinFields(" | ", [$.Title, $.Company]) %}',
    '</p>',
    '{% if ($.WorkPhone) { %}',
    '<p class="micro-text">',
    '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.Mobile) { %}',
    '<p class="micro-text">',
    '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.TollFree) { %}',
    '<p class="micro-text">',
    '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '<p class="micro-text">{%: $.WebAddress %}</p>',
    '{% if ($.Email) { %}',
    '<p class="micro-text">',
    '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>',
    '</p>',
    '{% } %}',
  ]),

  joinFields: function joinFields(sep, fields) {
    return utility.joinFields(sep, fields);
  },
  callWork: function callWork(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'callWork';
    }, params.key);
  },
  callMobile: function callMobile(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'callMobile';
    }, params.key);
  },
  sendEmail: function sendEmail(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'sendEmail';
    }, params.key);
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.activitiesText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,
  emailedText: resource.emailedText,
  calledText: resource.calledText,
  editActionText: resource.editActionText,
  callMobileActionText: resource.callMobileActionText,
  callWorkActionText: resource.callWorkActionText,
  sendEmailActionText: resource.sendEmailActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  phoneAbbreviationText: resource.phoneAbbreviationText,
  mobileAbbreviationText: resource.mobileAbbreviationText,
  tollFreeAbbreviationText: resource.tollFreeAbbreviationText,

  // View Properties
  detailView: 'lead_detail',
  itemIconClass: 'agent',
  iconTemplate: new Simplate([
    '<span class="fa-stack">',
    '<i class="fa fa-square-o fa-stack-2x"></i>',
    '<i class="fa fa-user fa-stack-1x fa-inverse"></i>',
    '</span>',
  ]),
  id: 'lead_list',
  security: 'Entities/Lead/View',
  insertView: 'lead_edit',
  queryOrderBy: 'LastNameUpper,FirstName',
  querySelect: [
    'Company',
    'LeadNameLastFirst',
    'WebAddress',
    'Email',
    'WorkPhone',
    'Mobile',
    'TollFree',
    'Title',
    'ModifyDate',
  ],
  resourceKind: 'leads',
  entityName: 'Lead',
  groupsEnabled: true,
  allowSelection: true,
  enableActions: true,
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'fa fa-pencil fa-2x',
      label: this.editActionText,
      action: 'navigateToEditView',
      security: 'Entities/Lead/Edit',
    }, {
      id: 'callWork',
      cls: 'fa fa-phone-square fa-2x',
      label: this.callWorkActionText,
      enabled: action.hasProperty.bindDelegate(this, 'WorkPhone'),
      fn: (act, selectionIn) => {
        const selectionOut = this.linkLeadProperties(selectionIn);
        action.callPhone.call(this, act, selectionOut, 'WorkPhone');
      },
    }, {
      id: 'callMobile',
      cls: 'fa fa-mobile fa-2x',
      label: this.callMobileActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Mobile'),
      fn: (act, selectionIn) => {
        const selectionOut = this.linkLeadProperties(selectionIn);
        action.callPhone.call(this, act, selectionOut, 'Mobile');
      },
    }, {
      id: 'sendEmail',
      cls: 'fa fa-envelope fa-2x',
      label: this.sendEmailActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Email'),
      fn: (act, selectionIn) => {
        const selectionOut = this.linkLeadProperties(selectionIn);
        action.sendEmail.call(this, act, selectionOut, 'Email');
      },
    }, {
      id: 'addNote',
      cls: 'fa fa-edit fa-2x',
      label: this.addNoteActionText,
      fn: action.addNote.bindDelegate(this),
    }, {
      id: 'addActivity',
      cls: 'fa fa-calendar fa-2x',
      label: this.addActivityActionText,
      fn: action.addActivity.bindDelegate(this),
    }, {
      id: 'addAttachment',
      cls: 'fa fa-paperclip fa-2x',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },

  linkLeadProperties: function linkLeadProperties(selection = {}) {
    const { data } = selection;

    if (data) {
      selection.data.LeadId = data.$key;
      selection.data.AccountName = data.Company;
      selection.data.LeadName = data.LeadNameLastFirst;
    }
    return selection;
  },

  groupInvokeActionByName: function groupInvokeActionByName(actionName, options) {
    if (options) {
      options.selection = this.linkLeadProperties(options.selection);
    }
    this.inherited(arguments);
  },

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%" or upper(LeadNameLastFirst) like "%${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Lead.List', __class);
export default __class;
