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
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Opportunity.SData', [Base, _SDataModelBase], {
  id: 'opportunity_sdata_model',
  querySelect: [
    'Account/AccountName',
    'Account/WebAddress',
    'Account/MainPhone',
    'Account/Fax',
    'Account/Address/*',
    'AccountManager/UserInfo/FirstName',
    'AccountManager/UserInfo/LastName',
    'CloseProbability',
    'Description',
    'EstimatedClose',
    'ExchangeRate',
    'ExchangeRateCode',
    'ExchangeRateDate',
    'ExchangeRateLocked',
    'LeadSource/Description',
    'Owner/OwnerDescription',
    'Reseller/AccountName',
    'SalesPotential',
    'Stage',
    'Status',
    'Type',
    'Weighted',
  ],
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'EstimatedClose desc',
      querySelect: [
        'Account/AccountName',
        'Account/AccountManager/UserInfo/UserName',
        'Account/AccountManager/UserInfo/Region',
        'Description',
        'Stage',
        'Status',
        'SalesPotential',
        'ExchangeRate',
        'ExchangeRateCode',
        'ModifyDate',
        'ActualClose',
        'EstimatedClose',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Account/AccountName',
        'Account/WebAddress',
        'Account/MainPhone',
        'Account/Fax',
        'Account/Address/*',
        'AccountManager/UserInfo/FirstName',
        'AccountManager/UserInfo/LastName',
        'CloseProbability',
        'Description',
        'EstimatedClose',
        'ExchangeRate',
        'ExchangeRateCode',
        'ExchangeRateDate',
        'ExchangeRateLocked',
        'LeadSource/Description',
        'Owner/OwnerDescription',
        'Reseller/AccountName',
        'SalesPotential',
        'Stage',
        'Status',
        'Type',
        'Weighted',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.OPPORTUNITY, MODEL_TYPE.SDATA, __class);
export default __class;
