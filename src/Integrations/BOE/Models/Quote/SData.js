import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.Quotes.SData', [Base, _SDataModelBase], {
  id: 'quote_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'QuoteNumber',
        'ErpExtId',
        'Account/AccountName',
        'GrandTotal',
        'DocGrandTotal',
        'CreateDate',
        'ModifyDate',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ErpStatus',
        'StatusDate',
        'Status',

      ],
    }, {
      name: 'detail',
      querySelect: [
        'QuoteNumber',
        'ErpExtId',
        'Account/AccountName',
        'Account/AccountManager/*',
        'Account/ErpExtId',
        'Opportunity/Description',
        'GrandTotal',
        'CreateDate',
        'ModifyDate',
        'Status',
        'ShipTo/Name',
        'ShipTo/Address/*',
        'BillTo/Name',
        'BillTo/Address/*',
        'PayFrom/Address/*',
        'CurrencyCode',
        'BaseCurrencyCode',
        'Total',
        'DocTotal',
        'DocGrandTotal',
        'RequestedBy/NameLF',
        'ExpectedDeliveryDate',
        'StartDate',
        'EndDate',
        'DocumentDate',
        'Comments',
        'Type',
        'DropShip',
        'ShipEarly',
        'PartialShip',
        'AccountManager/*',
        'CustomerRFQNumber',
        'SalesOrder/*',
        'BillingContact/Address/*',
        'ShippingContact/Address/*',
        'ExchangeRate',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'SyncStatus',
        'ErpLocation',
        'Warehouse/Address/*',
        'Warehouse/Description',
        'Location/Address/*',
        'Location/Description',
        'Carrier/CarrierName',
        'QuoteItems/*',
        'ErpStatus',
        'StatusDate',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'QuoteNumber',
        'ErpExtId',
        'Account/AccountName',
        'Account/AccountManager/*',
        'Account/ErpExtId',
        'Opportunity/Description',
        'GrandTotal',
        'CreateDate',
        'ModifyDate',
        'Status',
        'ShipTo/Address/*',
        'BillTo/Address/*',
        'PayFrom/Address/*',
        'CurrencyCode',
        'BaseCurrencyCode',
        'Total',
        'RequestedBy/NameLF',
        'ExpectedDeliveryDate',
        'StartDate',
        'EndDate',
        'DocumentDate',
        'Comments',
        'Type',
        'DropShip',
        'ShipEarly',
        'PartialShip',
        'AccountManager/*',
        'CustomerRFQNumber',
        'BillingContact/Address/*',
        'ShippingContact/Address/*',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'ErpLocation',
        'Warehouse/*',
        'Location/*',
        'Carrier/*',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.QUOTE, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.Quotes.SData', __class);
export default __class;