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
import PaymentDistributionEdit from '../Views/PaymentDistribution/Edit';
import PaymentDistributionDetail from '../Views/PaymentDistribution/Detail';
import PaymentDistributionList from '../Views/PaymentDistribution/List';
import PaymentList from '../Views/Payment/List';
import ErpInvoiceList from '../Views/ERPInvoices/List';
import '../Models/PaymentDistribution/Offline';
import '../Models/PaymentDistribution/SData';

const __class = declare('crm.Integrations.BOE.Modules.PaymentDistribution', [_Module], {
  defaultViews: ['payment_distribution_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new PaymentDistributionEdit());
    am.registerView(new PaymentDistributionEdit({
      id: 'payment_distribution_insert',
      inserting: true,
    }));

    am.registerView(new PaymentDistributionDetail());
    am.registerView(new PaymentDistributionList({
      expose: true,
    }));

    am.registerView(new PaymentList({
      id: 'distribution_payment',
      hasSettings: false,
      groupsEnabled: false,
    }));

    am.registerView(new ErpInvoiceList({
      id: 'payment_distribution_invoice',
      hasSettings: false,
      groupsEnabled: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.PaymentDistributionModule', __class);
export default __class;
