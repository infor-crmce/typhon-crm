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
import utility from 'argos/Utility';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('surveyTake');

/**
 * @class crm.Views.Account.List
 *
 * @extends argos.List
 * @requires argos.List
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 *
 * @requires crm.Action
 * @requires crm.Views._GroupListMixin
 * @requires crm.Views._MetricListMixin
 * @requires crm.Views._RightDrawerListMixin
 *
 */
const __class = declare('crm.Views.SurveyTake.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.Description %}',
  ]),
  enableDynamicGroupLayout: true,

  joinFields: function joinFields(sep, fields) {
    return utility.joinFields(sep, fields);
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.titleText,

  offlineText: resource.offlineText,

  // View Properties
  // detailView: 'surveyTake_edit',
  itemIconClass: 'spreadsheet', // todo: replace with appropriate icon
  id: 'surveyTake_list',
  entityName: 'Survey',
  editView: 'surveyTake_edit',
  allowSelection: true,
  querySelect: [],
  offlineIds: null,
  resourceKind: 'surveys',
  modelName: MODEL_NAMES.SURVEY,
  groupsEnabled: false,
  enableActions: true,
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'take',
      cls: 'edit',
      label: 'Execute Survey',
      action: 'navigateToSurvey',
    }]);
  },
  navigateToSurvey: function navigateToSurvey(action, selection) {
    const view = this.app.getView(this.editView);
    const key = selection.data[this.idProperty];
    const options = {
      key,
      accountId: this.options.where && this.options.where.split(' ').length > 2 ? this.options.where.split(' ')[2].replace('"', '').replace('"', '') : null,
      title: selection.data.Description,
      selectedEntry: selection.data,
      fromContext: this,
      insert: true,
      fromOffline: true,
    };

    if (view) {
      view.show(options);
    }
  },
});

export default __class;
