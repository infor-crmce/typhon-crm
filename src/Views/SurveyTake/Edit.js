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
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';
import ErrorManager from 'argos/ErrorManager';
import FieldManager from 'argos/FieldManager';
import lang from 'dojo/_base/lang';
import Deferred from 'dojo/_base/Deferred';

const resource = getResource('surveyTakeInsert');

/**
 * @class crm.Views.SurveyTake.Edit
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.SurveyTake.Edit', [Edit], {
  // Localization
  desciptionText: resource.descriptionText,
  titleText: resource.titleText,

  // View Properties
  id: 'surveyTake_edit',
  enableOffline: true,
  resourceKind: 'surveyAnswers',
  modelName: MODEL_NAMES.SURVEYANSWER,
  inserting: true,
  products: null,
  questions: null,
  surveyId: null,
  multiColumnClass: '',
  show: function show() {
    this.inherited(show, arguments);
    this.surveyId = arguments[0].key;
    this.accountId = arguments[0].accountId;
    $(this.contentNode).empty();
    this.getProducts();
  },
  request: function request(resourceKind, querySelect, cb) {
    const req = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService());
    req.setResourceKind(resourceKind);
    req.setContractName('dynamic');
    req.setQueryArg('where', `SurveyId eq '${this.surveyId}'`);
    req.setQueryArg('select', querySelect.join(','));
    req.read({
      success: function success(data) {
        cb(data.$resources);
      },
      failure: this.onRequestFailure,
      scope: this,
    });
  },
  onRequestFailure: function onRequestFailure(response, o) {
    ErrorManager.addError(response, o, {}, 'failure');
  },
  getProducts: function getProducts() {
    this.request('surveyProducts', ['Product/Name'], (data) => {
      this.products = data;
      this.getQuestions();
    });
  },
  getQuestions: function getQuestions() {
    this.request('surveyQuestions', ['SurveyQuestionType/QuestionType', 'Question'], (data) => {
      this.questions = data;
      this._prepareLayout();
    });
  },
  _prepareLayout: function _prepareLayout() {
    this._rowLayout();

    $('div[data-field]', this.contentNode).each((i, node) => {
      const name = $(node).attr('data-field');
      const field = this.fields[name];

      if (field) {
        $(field.domNode).addClass('field');

        const prod = this.products.find(pro => pro.Product.$key === name.split('-')[1]);
        if (prod) {
          field.setValue(prod.Product.Name);
          field.disable();
        }
        field.renderTo(node);
      }
    });

    $('div[data-field*="product-"]', this.contentNode).each((i, node) => {
      $(node).parent().before('<br style="clear:both">');
      $(node).parent().addClass('four');

      if (node.getAttribute('data-field', this.contentNode).startsWith('product--')) return;

      $('input', node).each((j, input) => {
        $(input).css({ border: 'none', color: 'rgb(26,26,26)' });
      });

      $(node).parent().after(`<div class="columns one"><img src='content/images/survey/${(i + 1) % 7}.png' /> </div>`);
    });

    $('div[data-field*="question-"]', this.contentNode).each((i, node) => {
      $(node).parent().addClass('one');
    });

    $('div[data-field*="product--"] input, div[data-field*="question--"] input', this.contentNode).each((i, node) => {
      $(node).hide();
    });
  },
  _rowLayout: function _rowLayout() {
    const row = [];

    row.push({
      name: `product--${Math.random()}`,
      property: '',
      label: '',
      type: 'text',
    });

    // image
    row.push({
      name: `question--${Math.random()}`,
      label: '',
      type: 'text',
    });

    // questions
    $(this.questions).each((j, question) => {
      row.push({
        name: `question--${Math.random()}`,
        label: question.Question,
        type: 'text',
      });
    });

    $(this.products).each((i, product) => {
      row.push({
        name: `product-${product.Product.$key}`,
        property: 'product.Product.$key',
        type: 'text',
      });

      $(this.questions).each((j, question) => {
        row.push({
          name: `question-${question.$key}-${product.Product.$key}`,
          type: question.SurveyQuestionType.QuestionType === 'Boolean' ? 'boolean' : 'text',
          label: '',
        });
      });
    });

    this.processLayout(this._createCustomizedLayout([{
      children: row,
    }]));
  },
  _saveAnswers: function _saveAnswers(answers) {
    const deferred = new Deferred();
    const req = new Sage.SData.Client.SDataBatchRequest(App.getService());
    req.setContractName('dynamic');
    req.setResourceKind('surveyAnswers');
    req.using(lang.hitch(this, () => {
      for (let i = 0; i < answers.length; i++) {
        const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService());
        request.setContractName('dynamic');
        request.setResourceKind('activityAttendees');
        request.create(answers[i], { scope: this, ignoreETag: true });
      }
    }));

    req.commit({
      scope: this,
      ignoreETag: true,
      success: (entry) => { // eslint-disable-line
        deferred.resolve('success');
      },
      failure: (err) => {
        console.error(err); // eslint-disable-line
      },
    });
    return deferred;
  },

  onInsert: function onInsert(values) {
    const data = this._processFormValue(values);
    this._saveAnswers(data);
    this.onAddComplete();
  },
  _processFormValue: function _processFormValue(values) {
    const result = [];
    Object.keys(values).forEach((key) => {
      if (key.startsWith('question-') && !key.startsWith('question--')) {
        result.push({
          SurveyQuestionId: key.split('-')[1],
          SurveyProductId: key.split('-')[2],
          Answer: values[key],
          SurveyRecordId: this.accountId,
        });
      }
    });
    return result;
  },
});

export default __class;
