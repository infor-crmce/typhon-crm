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

import lang from 'dojo/_base/lang';
/**
 * @class crm.Integrations.BOE.PaymentUtility
 * @classdesc Utility provides functions that are more javascript enhancers than application related code.
 * @singleton
 *
 */
const __class = lang.setObject('crm.Integrations.BOE.PaymentUtility', /** @lends crm.Integrations.BOE.PaymentUtility */{
  GoToAddDistribution: function GoToAddDistribution(actionContext, dataContext) {
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
});

lang.setObject('icboe.PaymentUtility', __class);
export default __class;
