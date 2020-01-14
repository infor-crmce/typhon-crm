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
// import getResource from 'argos/I18n';

// const resource = getResource('surveyModel');
// const contactResource = getResource('contactModel');
// const activityResource = getResource('activityModel');
// const historyResource = getResource('historyModel');
// const oppResource = getResource('opportunityModel');
// const addressResource = getResource('addressModel');
// const ticketResource = getResource('ticketModel');

const __class = declare('crm.Models.Survey.Base', [_ModelBase], {
  resourceKind: 'surveys',
  entityName: 'Survey',
  entityDisplayName: 'resource.entityDisplayName',
  entityDisplayNamePlural: 'resource.entityDisplayNamePlural',
  modelName: MODEL_NAMES.SURVEY,
  iconClass: 'spreadsheet',
  detailViewId: 'survey_detail',
  listViewId: 'survey_list',
  editViewId: 'survey_edit',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [
      {
        name: 'SurveyQuestion',
        displayName: 'SurveyQuestion',
        type: 'OneToMany',
        relatedEntity: 'SurveyQuestion',
        relatedProperty: 'SurveyId' },
    ]);
    return rel;
  },
});
export default __class;
