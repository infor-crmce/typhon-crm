define('Mobile/SalesLogix/Views/Opportunity/Detail', [
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    domConstruct,
    query,
    string,
    format,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.Detail', [Detail], {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        importSourceText: 'lead source',
        opportunityText: 'opportunity',
        ownerText: 'owner',
        actionsText: 'Quick Actions',
        potentialText: 'sales potential',
        potentialBaseText: 'sales potential (base)',
        potentialOpportunityText: 'sales potential (opportunity)',
        potentialMyRateText: 'sales potential (my currency)',
        probabilityText: 'close prob',
        relatedActivitiesText: 'Activities',
        relatedContactsText: 'Opportunity Contacts',
        relatedHistoriesText: 'Notes/History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedProductsText: 'Products',
        resellerText: 'reseller',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        moreDetailsText: 'More Details',
        multiCurrencyText: 'Multi Currency',
        multiCurrencyRateText: 'rate',
        multiCurrencyCodeText: 'code',
        multiCurrencyDateText: 'date',
        multiCurrencyLockedText: 'locked',

        //View Properties
        id: 'opportunity_detail',
        editView: 'opportunity_edit',
        noteEditView: 'history_edit',
        security: 'Entities/Opportunity/View',
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
            'Weighted'
        ],
        resourceKind: 'opportunities',

        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },
        addNote: function() {
            var view = App.getView(this.noteEditView);
            if (view)
            {
                view.show({
                    template: {},
                    insert: true
                });
            }
        },
        getValues: function() {
            var values = this.inherited(arguments),
                estimatedCloseDate = this.fields['EstimatedClose'].getValue(),
                timelessStartDate = estimatedCloseDate.clone()
                .clearTime()
                .add({minutes: -1 * estimatedCloseDate.getTimezoneOffset(), seconds: 5});

            values = values || {};
            values['EstimatedClose'] = timelessStartDate;

            return values;
        },
        formatAccountRelatedQuery: function(fmt) {
            return string.substitute(fmt, [this.entry['Account']['$key']]);
        },                
        createLayout: function() {
            var layout, quickActions, details, moreDetails, multiCurrency, relatedItems;

            quickActions = {
                list: true,
                title: this.actionsText,
                cls: 'action-list',
                name: 'QuickActionsSection',
                children: [{
                    name: 'ScheduleActivityAction',
                    property: 'Description',
                    label: this.scheduleActivityText,
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    action: 'scheduleActivity'
                },{
                    name: 'AddNoteAction',
                    property: 'Description',
                    label: this.addNoteText,
                    icon: 'content/images/icons/New_Note_24x24.png',
                    action: 'addNote'
                }]
            };

            details = {
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    label: this.opportunityText,
                    name: 'Description',
                    property: 'Description'
                },{
                    label: this.accountText,
                    key: 'Account.$key',
                    name: 'Account.AccountName',
                    property: 'Account.AccountName',
                    view: 'account_detail'
                },{
                    label: this.resellerText,
                    key: 'Reseller.$key',
                    name: 'Reseller.AccountName',
                    property: 'Reseller.AccountName',
                    view: 'account_detail'
                },{
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    property: 'EstimatedClose',
                    renderer: format.date.bindDelegate(this, null, true)
                },{
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status'
                },{
                    label: this.typeText,
                    name: 'Type',
                    property: 'Type'
                },{
                    label: this.probabilityText,
                    name: 'CloseProbability',
                    property: 'CloseProbability'
                },{
                    label: App.hasMultiCurrency() ? this.potentialBaseText : this.potentialText,
                    name: 'SalesPotential',
                    property: 'SalesPotential',
                    renderer: (function(val) {
                        var baseCode, baseRate, convertedValue;
                        if (App.hasMultiCurrency()) {
                            baseCode = App.context['systemOptions']['BaseCurrency'];
                            baseRate = App.context['exchangeRates'][baseCode];
                            convertedValue = val * baseRate;
                            return format.multiCurrency.call(null, convertedValue, baseCode);
                        }

                        return format.currency.call(null, val);
                    }).bindDelegate(this)
                }]
            };

            multiCurrency = {
                title: this.multiCurrencyText, 
                name: 'MultiCurrencySection',
                children: [{
                    label: this.multiCurrencyRateText, 
                    name: 'ExchangeRate',
                    property: 'ExchangeRate'
                },{
                    label: this.multiCurrencyCodeText, 
                    name: 'ExchangeRateCode',
                    property: 'ExchangeRateCode'
                },{
                    label: this.multiCurrencyDateText, 
                    name: 'ExchangeRateDate',
                    property: 'ExchangeRateDate',
                    renderer: format.date.bindDelegate(this, null, true)
                },{
                    label: this.multiCurrencyLockedText,
                    name: 'ExchangeRateLocked',
                    property: 'ExchangeRateLocked'
                }]
            };

            moreDetails = {
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    label: this.acctMgrText,
                    name: 'AccountManager.UserInfo',
                    property: 'AccountManager.UserInfo',
                    renderer: format.nameLF
                },{
                    label: this.importSourceText,
                    name: 'LeadSource.Description',
                    property: 'LeadSource.Description'
                }]
            };

            relatedItems = {
                list: true,
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'OpportunityRelated',
                    icon: 'content/images/icons/product_24.png',
                    label: this.relatedProductsText,
                    view: 'opportunityproduct_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
                },{
                    name: 'ActivityRelated',
                    icon: 'content/images/icons/To_Do_24x24.png',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}"')
                },{
                    name: 'ContactRelated',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: this.relatedContactsText,
                    options: {
                        prefilter: this.formatAccountRelatedQuery.bindDelegate(this, 'Account.Id eq "${0}"')
                    },
                    view: 'opportunitycontact_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
                },{
                    name: 'HistoryRelated',
                    icon: 'content/images/icons/journal_24.png',
                    label: this.relatedHistoriesText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}" and Type ne "atDatabaseChange"'),
                    view: 'history_related'
                }]
            };

            layout = this.layout || (this.layout = []);

            layout.push(quickActions);
            layout.push(details);

            if (App.hasMultiCurrency()) {
                details.children.push({
                    label: this.potentialOpportunityText,
                    name: 'SalesPotentialOpportunity',
                    property: 'SalesPotentialOpportunity',
                    renderer: function(val) {
                        if (App.hasMultiCurrency()) {
                            return format.multiCurrency.call(null, (val.SalesPotential * val.ExchangeRate), val.ExchangeRateCode);
                        }

                        return '-';
                    }
                },{
                    label: this.potentialMyRateText,
                    name: 'SalesPotentialMine',
                    property: 'SalesPotentialMine',
                    renderer: (function(val) {
                        var myCode, myRate, convertedValue;
                        if (App.hasMultiCurrency()) {
                            myCode = App.context['userOptions']['General:Currency'];
                            myRate = App.context['exchangeRates'][myCode];
                            convertedValue = val.SalesPotential * myRate;
                            return format.multiCurrency.call(null, convertedValue, myCode);
                        }

                        return '-';
                    }).bindDelegate(this)
                });

                layout.push(multiCurrency);
            }

            layout.push(moreDetails);
            layout.push(relatedItems);
            return layout;
        }        
    });
});
