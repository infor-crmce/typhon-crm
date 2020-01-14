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
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('surveyQuestionModel');

const __class = declare('crm.Models.SurveyQuestion.Base', [_ModelBase], {
  resourceKind: 'surveyQuestions',
  entityName: 'SurveyQuestion',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.SURVEYQUESTION,
  iconClass: 'spreadsheet',
  detailViewId: 'surveyQuestion_detail',
  listViewId: 'surveyQuestion_list',
  editViewId: 'surveyQuestion_edit',
});
export default __class;
