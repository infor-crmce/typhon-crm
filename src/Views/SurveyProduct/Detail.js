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

const resource = getResource('surveyProductDetail');

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
const __class = declare('crm.Views.SurveyProduct.Detail', [Detail], {
  // Localization

  titleText: resource.titleText,
  relatedItemsText: resource.relatedItemsText,

  // View Properties
  id: 'surveyProduct_detail',
  editView: 'surveyProduct_edit',
  enableOffline: true,
  resourceKind: 'surveyProducts',
  modelName: MODEL_NAMES.SURVEYPRODUCT,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Product',
        property: 'Product.Name',
        label: this.questionText,
        view: 'product_list',
      }, {
        name: 'SurveyDescription',
        property: 'Survey.Description',
        label: 'Survey',
        view: 'survey_detail',
        key: 'Survey.$key',
      }],
    }]);
  },
});

export default __class;
