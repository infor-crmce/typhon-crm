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
// import utility from 'argos/Utility';

const resource = getResource('surveyQuestionEdit');

/**
 * @class crm.Views.SurveyQuestion.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Edit
 * @requires crm.Format
 * @requires crm.Validator
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.SurveyQuestion.Edit', [Edit], {
  // Localization

  questionText: resource.questionText,
  titleText: resource.titleText,
  surveyText: resource.surveyText,
  questionTypeText: resource.questionTypeText,

  // View Properties
  entityName: 'SurveyQuestion',
  id: 'surveyQuestion_edit',
  querySelect: [
    'Question',
    'QuestionType',
    'Survey/SurveyId',
    'Survey/Description',
  ],
  resourceKind: 'surveyQuestions',
  startup: function startup() {
    this.inherited(startup, arguments);
    this.connect(this.fields.Survey, 'onChange', this.onSurveyChange);
  },
  beforeTransitionTo: function beforeTransitionTo() {
    this.inherited(beforeTransitionTo, arguments);
    if (this.options.insert) {
      this.fields.Survey.enable();
    } else {
      this.fields.Survey.disable();
    }
  },
  onSurveyChange: function onSurveyChange(value) {
    // if (value && value.text) {
    //   this.fields.Survey.setValue(value.text);
    // }
    this.requestSurvey(value.key);
  },
  applyContext: function applyContext() {
    const found = App.queryNavigationContext((o) => {
      const ob = (o.options && o.options.source) || o;
      return (/^(surveys)$/).test(ob.resourceKind) && ob.key;
    });

    const lookup = {
      surveys: this.applySurveyContext,
    };

    if (found && lookup[found.resourceKind]) {
      lookup[found.resourceKind].call(this, found);
    }
  },
  requestSurvey: function requestSurvey(accountId) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setResourceKind('surveys')
      .setResourceSelector(`'${accountId}'`)
      .setQueryArg('select', [
        'Description',
      ].join(','));

    request.allowCacheUse = true;
    request.read({
      success: this.processSurvey,
      failure: this.requestSurveyFailure,
      scope: this,
    });
  },
  requestSurveyFailure: function requestSurveyFailure() { },
  applySurveyContext: function applySurveyContext(context) {
    const view = App.getView(context.id);
    const entry = view && view.entry;

    if (!entry && context.options && context.options.source && context.options.source.entry) {
      this.requestSurvey(context.options.source.entry.$key);
    }

    this.processSurvey(entry);
  },
  processSurvey: function processSurvey(entry) {
    const survey = entry;
    if (survey) {
      this.fields.Survey.setValue(entry);
    }
  },

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: this.questionText,
      name: 'Question',
      property: 'Question',
      type: 'text',
      validator: validator.notEmpty,
      autoFocus: true,
    }, {
      label: this.surveyText,
      name: 'Survey',
      property: 'Survey',
      textProperty: 'Description',
      type: 'lookup',
      validator: validator.exists,
      view: 'survey_related',
    }, {
      label: this.questionTypeText,
      name: 'QuestionType',
      property: 'SurveyQuestionType',
      textProperty: 'QuestionType',
      type: 'lookup',
      validator: validator.exists,
      view: 'surveyQuestionType_list',
    },
    ]);
  },
});

export default __class;
