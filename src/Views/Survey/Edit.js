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

const resource = getResource('surveyEdit');

/**
 * @class crm.Views.Survey.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Edit
 * @requires crm.Format
 * @requires crm.Validator
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.Survey.Edit', [Edit], {
  // Localization

  descriptionText: resource.descriptionText,
  titleText: resource.titleText,

  // View Properties
  entityName: 'Survey',
  id: 'survey_edit',
  querySelect: [
    'Description',
  ],
  resourceKind: 'surveys',


  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: this.descriptionText,
      name: 'Description',
      property: 'Description',
      type: 'text',
      validator: validator.notEmpty,
      autoFocus: true,
    }]);
  },
});

export default __class;
