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
import MODEL_NAMES from '../../Models/Names';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('surveyAccountDetail');

/**
 * @class crm.Views.SurveyProduct.Detail
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.SurveyAccount.Detail', [Detail], {
  // Localization

  titleText: resource.titleText,
  surveyText: resource.surveyText,

  // View Properties
  id: 'surveyAccount_detail',
  editView: 'surveyAccount_edit',
  enableOffline: true,
  resourceKind: 'surveyAccounts',
  modelName: MODEL_NAMES.SURVEYACCOUNT,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Survey',
        property: 'Survey.Description',
        label: this.surveyText,
        view: 'survey_detail',
        key: 'Survey.$key',
      }, {
        name: 'Account',
        property: 'Account.Name',
        label: this.accountText,
        view: 'account_detail',
        key: 'Account.$key',
      }],
    }]);
  },
});

export default __class;
