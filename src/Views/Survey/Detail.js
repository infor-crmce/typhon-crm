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
import format from '../../Format';
import MODEL_NAMES from '../../Models/Names';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('surveyDetail');

/**
 * @class crm.Views.Survey.Detail
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.Survey.Detail', [Detail], {
  // Localization
  desciptionText: resource.descriptionText,
  titleText: resource.titleText,
  relatedQuestionsText: resource.relatedQuestionsText,
  relatedItemsText: resource.relatedItemsText,
  relatedProductText: resource.relatedProductText,

  // View Properties
  id: 'survey_detail',
  editView: 'survey_edit',
  enableOffline: true,
  resourceKind: 'surveys',
  modelName: MODEL_NAMES.SURVEY,

  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Description',
        property: 'Description',
        label: this.descriptionText,
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'SurveyQuestionsRelated',
        label: this.relatedQuestionsText,
        where: this.formatRelatedQuery.bindDelegate(this, 'SurveyId eq "${0}"'),
        view: 'surveyQuestion_related',
      }, {
        name: 'SurveyProductRelated',
        label: this.relatedProductText,
        where: this.formatRelatedQuery.bindDelegate(this, 'SurveyId eq "${0}"'),
        view: 'surveyProduct_list',
      }],
    }]);
  },
});

export default __class;
