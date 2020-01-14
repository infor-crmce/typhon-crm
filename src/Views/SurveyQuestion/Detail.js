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

const resource = getResource('surveyQuestionDetail');

/**
 * @class crm.Views.SurveyQuestion.Detail
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.SurveyQuestion.Detail', [Detail], {
  // Localization
  questionText: resource.questionText,
  titleText: resource.titleText,
  relatedItemsText: resource.relatedItemsText,

  // View Properties
  id: 'surveyQuestion_detail',
  editView: 'surveyQuestion_edit',
  enableOffline: true,
  resourceKind: 'surveyQuestions',
  modelName: MODEL_NAMES.SURVEYQUESTION,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
    //   title: this.actionsText,
    //   list: true,
    //   cls: 'action-list',
    //   name: 'QuickActionsSection',
    //   children: [{
    //     name: 'ScheduleActivityAction',
    //     property: 'AccountName',
    //     label: this.scheduleActivityText,
    //     iconClass: 'calendar',
    //     action: 'scheduleActivity',
    //   }, {
    //     name: 'AddNoteAction',
    //     property: 'AccountName',
    //     label: this.addNoteText,
    //     iconClass: 'edit',
    //     action: 'addNote',
    //   }],
    // }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Question',
        property: 'Question',
        label: this.questionText,
      }, {
        name: 'SurveyDescription',
        property: 'Survey.Description',
        label: 'Survey',
        view: 'survey_detail',
        key: 'Survey.$key',
      }, {
        name: 'SurveyQuestionType',
        property: 'SurveyQuestionType.QuestionType',
        label: 'Question Type',
      }],
    }]);
  },
});

export default __class;
