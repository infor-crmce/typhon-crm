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
import validator from '../../Validator';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('surveyAccountEdit');

/**
 * @class crm.Views.SurveyProduct.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Edit
 * @requires crm.Format
 * @requires crm.Validator
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.SurveyAccount.Edit', [Edit], {
  // Localization
  surveyText: resource.surveyText,
  accountText: resource.accountText,
  titleText: resource.titleText,

  // View Properties
  entityName: 'SurveyAccount',
  id: 'surveyAccount_edit',
  querySelect: [
    'Survey/Description',
  ],
  resourceKind: 'surveyAccounts',
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: this.surveyText,
      name: 'Survey',
      property: 'Survey',
      textProperty: 'Description',
      type: 'lookup',
      validator: validator.exists,
      view: 'survey_related',
    }, {
      label: this.accountText,
      name: 'Account',
      property: 'Account',
      textProperty: 'AccountName',
      type: 'lookup',
      validator: validator.exists,
      view: 'account_related',
    },
    ]);
  },
});

export default __class;
