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
import lang from 'dojo/_base/lang';
import Deferred from 'dojo/_base/Deferred';
import DeferredList from 'dojo/DeferredList';
import validator from '../../Validator';
import format from 'crm/Format';

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
  accountText: resource.accountText,

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
  _prevResults: null,
  cls: 'survey',
  show: function show() {
    this.inherited(show, arguments);
    this.surveyId = arguments[0].key;
    this.accountId = arguments[0].accountId;
    this.titleText = arguments[0].title;

    $(this.contentNode).empty();

    const deferredArray = [];
    deferredArray.push(this.getProducts());
    deferredArray.push(this.getQuestions());
    deferredArray.push(this.getPrevSurveyRecord());

    const deferredList = new DeferredList(deferredArray);
    deferredList.then((data) => {
      this._prepareLayout(data);
      if (this.accountId) {
        this.requestAccount(this.accountId);
      }
    });
  },
  request: function request(resourceKind, querySelect, cb) {
    const deferred = new Deferred();
    const req = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService());
    req.setResourceKind(resourceKind);
    req.setContractName('dynamic');
    req.setQueryArg('where', `SurveyId eq '${this.surveyId}'`);
    req.setQueryArg('select', querySelect.join(','));
    req.read({
      success: (data) => {
        cb(data.$resources);
        deferred.resolve(data.$resources);
      },
      failure: this.onRequestFailure,
      scope: this,
    });
    return deferred;
  },
  onRequestFailure: function onRequestFailure(response, o) {
    ErrorManager.addError(response, o, {}, 'failure');
  },
  getProducts: function getProducts() {
    return this.request('surveyProducts', ['Product/Name'], (data) => {
      this.products = data;
    });
  },
  getQuestions: function getQuestions() {
    return this.request('surveyQuestions', ['SurveyQuestionType/QuestionType', 'Question'], (data) => {
      this.questions = data;
    });
  },
  getPrevSurveyRecord: function getPrevSurveyRecord() {
    const deferred = new Deferred();

    const req = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService());
    req.setResourceKind('surveyRecords');
    req.setQueryArg('select', ['SurveyAnswers/SurveyProductId', 'SurveyAnswers/SurveyQuestionId', 'SurveyAnswers/Answer', 'CreateDate'].join(','));
    req.setQueryArg('orderby', 'CreateDate desc');
    req.setQueryArg('count', '1');
    req.setQueryArg('where', `(AccountId eq "${this.accountId}")`);

    req.allowCacheUse = true;
    req.read({
      success: (data) => {
        const answers = data.$resources[0];
        this._prevResults = answers;
        deferred.resolve(answers);
      },
      failure: this.requestFailure,
      scope: this,
    });
    return deferred;
  },
  _prepareLayout: function _prepareLayout() {
    this._rowLayout();

    $('div[data-field]', this.contentNode).each((i, node) => {
      const name = $(node).attr('data-field');
      const field = this.fields[name];

      if (field) {
        $(field.domNode).addClass('field');

        if (name.startsWith('product-')) {
          const prod = this.products.find(pro => pro.Product.$key === name.split('-')[1]);
          if (prod) {
            field.setValue(prod.Product.Name);
            field.disable();
          }
        } else if (name.startsWith('question-prev-') && this._prevResults) {
          const questionId = name.split('-')[2];
          const productId = name.split('-')[3];
          const answer = this._prevResults.SurveyAnswers.$resources.find(pro => pro.SurveyQuestionId === questionId && pro.SurveyProductId === productId);
          if (answer) {
            field.setValue(answer.Answer);
            field.disable();
          }
        } else if (name.startsWith('question-') && this._prevResults) {
          const questionId = name.split('-')[1];
          const productId = name.split('-')[2];
          const answer = this._prevResults.SurveyAnswers.$resources.find(pro => pro.SurveyQuestionId === questionId && pro.SurveyProductId === productId);
          if (answer) {
            field.setValue(answer.Answer);
          }
        }
        field.renderTo(node);

        if (name.startsWith('header-question-prev-') && this._prevResults) {
          $($('label', node).get(0)).text(`Previous ${format.date(this._prevResults.CreateDate)}`);
        }
      }
    });

    $('div[data-field*="product-"]', this.contentNode).each((i, node) => {
      $(node).parent().before('<hr />');
      $(node).parent().addClass('three');

      if (node.getAttribute('data-field', this.contentNode).startsWith('header-product-')) return;

      $(node).parent().after(`<div class="columns one"><img style="height:85px" src='content/images/survey/${Math.floor(Math.random() * 24) + 1}.jpg'/></div>`);
    });

    $('div[data-field*="question-"]', this.contentNode).each((i, node) => {
      $(node).parent().addClass('one');
    });
    $('div[data-field="Account"]', this.contentNode).each((i, node) => {
      $(node).parent().addClass('three');
    });
  },
  _rowLayout: function _rowLayout() {
    const row = [];

    row.push({
      label: this.accountText,
      name: 'Account',
      property: 'Account',
      textProperty: 'AccountName',
      type: 'lookup',
      validator: validator.exists,
      view: 'account_related',
    });

    row.push({
      name: `header-product-${Math.random()}`,
      property: '',
      label: '',
      type: 'text',
    });

    // image
    row.push({
      name: `header-question-${Math.random()}`,
      label: '',
      type: 'text',
    });

    // questions
    $(this.questions).each((j, question) => {
      row.push({
        name: `header-question-prev-${Math.random()}`,
        label: 'Previous',
        type: 'text',
      });
      row.push({
        name: `header-question-${Math.random()}`,
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
          name: `question-prev-${question.$key}-${product.Product.$key}`,
          label: '',
          type: 'text',
        });

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
  requestAccount: function requestAccount(accountId) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setResourceKind('accounts')
      .setResourceSelector(`'${accountId}'`)
      .setQueryArg('select', ['AccountName'].join(','));

    request.allowCacheUse = true;
    request.read({
      success: this.processAccount,
      failure: this.requestFailure,
      scope: this,
    });
  },
  processAccount: function processAccount(entry) {
    const account = entry;

    if (account) {
      this.fields.Account.setValue(account);
    }
  },
  requestFailure: function requestFailure() { },
  _saveAnswers: function _saveAnswers(answers) {
    const deferred = new Deferred();
    const req = new Sage.SData.Client.SDataBatchRequest(App.getService());
    req.setContractName('dynamic');
    req.setResourceKind('surveyAnswers');
    req.using(lang.hitch(this, () => {
      for (let i = 0; i < answers.length; i++) {
        const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService());
        request.setContractName('dynamic');
        request.setResourceKind('surveyAnswers');
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
  _saveSurveyRecord: function _saveSurveyRecord() {
    const deferred = new Deferred();
    const req = new Sage.SData.Client.SDataSingleResourceRequest(App.getService());
    req.setResourceKind('surveyRecords');
    req.create({
      SurveyId: this.surveyId,
      AccountId: this.fields.Account.getValue().$key,
    }, {
      success: (data) => {
        deferred.resolve(data.$key);
      },
      failure: () => {
        console.log('record did not save'); // eslint-disable-line
      },
      scope: this,
    });
    return deferred;
  },

  onInsert: function onInsert(values) {
    this._saveSurveyRecord().then((surveyRecordId) => {
      const data = this._processFormValue(values, surveyRecordId);
      this._saveAnswers(data);
    });
    this.onAddComplete();
  },
  _processFormValue: function _processFormValue(values, surveyRecordId) {
    const result = [];
    Object.keys(values).forEach((key) => {
      if (key.startsWith('question-')) {
        result.push({
          SurveyQuestionId: key.split('-')[1],
          SurveyProductId: key.split('-')[2],
          Answer: values[key],
          SurveyRecordId: surveyRecordId,
        });
      }
    });
    return result;
  },
});

export default __class;
