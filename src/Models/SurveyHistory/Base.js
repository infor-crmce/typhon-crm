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


const __class = declare('crm.Models.SurveyHistory.Base', [_ModelBase], {
  resourceKind: 'surveyHistorys',
  entityName: 'SurveyHistory',
  modelName: MODEL_NAMES.SURVEYHISTORY,
  iconClass: 'spreadsheet',
  listViewId: 'surveyHistory_list',
});
export default __class;
