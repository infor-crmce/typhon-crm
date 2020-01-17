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
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import PaymentEdit from '../Views/Payment/Edit';
import PaymentDetail from '../Views/Payment/Detail';
import PaymentList from '../Views/Payment/List';
import AccountList from '../../../Views/Account/List';
import PaymentDistributionList from '../Views/PaymentDistribution/List';
import SelectList from '../../../Views/SelectList';
import '../Models/Payment/Offline';
import '../Models/Payment/SData';
import getResource from 'argos/I18n';

const __class = declare('crm.Integrations.BOE.Modules.Payment', [_Module], {
  defaultViews: ['payment_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new PaymentEdit({
      expose: false,
    }));
    am.registerView(new SelectList({
      itemTemplate: new Simplate([
        '<p class="listview-heading" {% if( ($.hideWhenOffLine && !$$.app.isOnline())) { %} disabled{% } %}>{%: $.$descriptor %}</p> ',
      ]),
      id: 'payment_select_list',
      refreshRequiredFor: function refreshRequiredFor() {
        return true;
      },
      requestData: function requestData() {
        const mixin = {
          data: [],
          index: {},
          idProperty: '$key',
        };
        mixin.data.push({
          $key: 'Check',
          $descriptor: 'Check',
        });
        mixin.data.push({
          $key: 'Cash',
          $descriptor: 'Cash',
        });
        // removed for POC demo
        // if (App.isOnline()) {
        //   mixin.data.push({
        //     $key: 'Credit',
        //     $descriptor: 'Credit',
        //     hideWhenOffLine: true,
        //   });
        // }
        const store = lang.mixin(this.get('store'), mixin);

        if (!store && !this._model) {
          console.warn('Error requesting data, no store was defined. Did you mean to mixin _SDataListMixin to your list view?'); // eslint-disable-line
          return null;
        }

        if (this.searchWidget) {
          this.currentSearchExpression = this.searchWidget.getSearchExpression();
        }

        this._setLoading();

        let queryOptions = {};
        queryOptions = this._applyStateToQueryOptions(queryOptions) || queryOptions;
        const queryExpression = this._buildQueryExpression() || null;
        const queryResults = this.requestDataUsingStore(queryExpression, queryOptions);

        $.when(queryResults)
          .done((results) => {
            this._onQueryComplete(queryResults, results);
          })
          .fail(() => {
            this._onQueryError(queryResults, queryOptions);
          });

        return queryResults;
      },
    }));
    am.registerView(new PaymentEdit({
      id: 'payment_insert',
      inserting: true,
      expose: false,
    }));
    am.registerView(new PaymentEdit({
      id: 'account_payment_insert',
      inserting: true,
      expose: false,
      accountLookupWhere: (entry, scope) => {
        let accountID = entry && entry.Account && entry.Account.$key && entry.Account.AccountID;
        if (!accountID && scope.options && scope.options.entry && (scope.options.entry.Account.$key || scope.options.entry.Account.AccountID)) {
          accountID = scope.options.entry.Account.$key;
        }

        return !accountID ? '' : `$key eq '${accountID}'`;
      },
    }));
    am.registerView(new PaymentDetail({
      expose: false,
    }));
    am.registerView(new PaymentList({
      expose: true,
    }));
    am.registerView(new PaymentList({
      expose: false,
      id: 'account_payment_related',
    }));

    am.registerView(new AccountList({
      id: 'account_payments',
      hasSettings: false,
      groupsEnabled: false,
      expose: false,
    }));

    am.registerView(new PaymentDistributionList({
      id: 'payment_distribution_items_related',
      hasSettings: false,
      groupsEnabled: false,
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('models/relationships', 'account_offline_model', {
      at: (relationship) => { return relationship.name === 'Tickets'; },
      type: 'insert',
      where: 'after',
      value: [{
        name: 'Payments',
        displayName: getResource('paymentList').entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Payment',
        relatedProperty: 'Payments',
        relatedPropertyType: 'object',
      }],
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.PaymentModule', __class);
export default __class;
