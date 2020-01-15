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
import '../Models/Payment/Offline';
import '../Models/Payment/SData';
import getResource from 'argos/I18n';

const __class = declare('crm.Integrations.BOE.Modules.Payment', [_Module], {
  defaultViews: ['payment_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    const thisModule = this;
    am.registerView(new PaymentEdit({
      expose: false,
    }));
    am.registerView(new PaymentEdit({
      id: 'payment_insert',
      inserting: true,
      expose: false,
    }));
    am.registerView(new PaymentDetail({
      expose: false,
      onAddDistributionClick: function onAddDistributionClick() {
        const key = this.options.key;
        const data = this.options.fromContext.entries;
        if (!!key && !!data) {
          const dataContext = { data: data[key] };
          thisModule._onAddDistributionClick(arguments[0], dataContext);
        }
      },
    }));
    am.registerView(new PaymentList({
      expose: true,
      onAddDistributionClick: function onAddDistributionClick() {
        const key = arguments[1].data.$key;
        const data = this.entries;
        if (!!key && !!data) {
          const dataContext = { data: data[key] };
          thisModule._onAddDistributionClick(arguments[0], dataContext);
        }
      },
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
  _onAddDistributionClick: function _onAddDistributionClick(actionContext, dataContext) {
    const view = App.getView('payment_distribution_insert');
    const data = {
      Payment: {
        $key: dataContext.data.$key,
        PaymentId: dataContext.data.$key,
      },
      AppliedAmount: dataContext.data.Amount,
    };
    if (view) {
      view.show({
        entry: data,
        fromContext: this,
        inserting: true,
        insert: true,
      });
    }
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
