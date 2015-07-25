import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/_ModelBase';
import SDataStore from 'argos/Store/SData';
import Deferred from 'dojo/Deferred';

export default declare('crm.Models.Account', [_ModelBase], {
    app: null,
    metadata: {
        sdata: {
            security: 'Entities/Account/View',
            querySelect: [
                'AccountManager/UserInfo/FirstName',
                'AccountManager/UserInfo/LastName',
                'AccountName',
                'Address/*',
                'BusinessDescription',
                'CreateDate',
                'CreateUser',
                'Description',
                'Fax',
                'GlobalSyncID',
                'ImportSource',
                'Industry',
                'LeadSource/Description',
                'MainPhone',
                'Notes',
                'Owner/OwnerDescription',
                'Status',
                'SubType',
                'Type',
                'WebAddress'
            ],
            resourceKind: 'accounts',
            getOptions: function(options) {
                var getOptions = {};
                if (options) {
                    if (options.select) getOptions.select = options.select;
                    if (options.include) getOptions.include = options.include;
                    if (options.contractName) getOptions.contractName = options.contractName;
                    if (options.resourceKind) getOptions.resourceKind = options.resourceKind;
                    if (options.resourceProperty) getOptions.resourceProperty = options.resourceProperty;
                    if (options.resourcePredicate) getOptions.resourcePredicate = options.resourcePredicate;
                }

                return getOptions;
            },
            getId: function(options) {
                return options && (options.id || options.key);
            }
        }
    },
    _appGetter: function() {
        return this.app || window.App;
    },
    _appSetter: function(value) {
        this.app = value;
    },
    createStore: function() {
        var m = this.metadata && this.metadata.sdata,
            app = this.get('app');
        return new SDataStore({
            service: app.getService(false),
            contractName: m.contractName,
            resourceKind: m.resourceKind,
            resourceProperty: m.resourceProperty,
            resourcePredicate: m.resourcePredicate,
            include: m.queryInclude,
            select: m.querySelect,
            itemsProperty: m.itemsProperty,
            idProperty: m.idProperty,
            labelProperty: m.labelProperty,
            entityProperty: m.entityProperty,
            versionProperty: m.versionProperty,
            scope: this
        });
    },
    getStore: function () {
        return this._store;
    },
    setStore: function (store) {
        this._store = store;
    },
    getEntries: function (query) {
        return {};
    },
    getEntry: function (options) {
        var store = this.createStore(),
            m = this.metadata && this.metadata.sdata;

        return store.get(m.getId(options), m.getOptions(options));
    },
    insertEntry: function (entry, options) {
        var store = this.getStore();
        return store.add(entry, options);
    },
    updateEntry: function (entry, options) {
        var store = this.getStore();

        if (!store) {
            throw new Error('No store set.')
        }

        return this.validate(entry).then(function fulfilled() {
            return store.put(entry, options);
        }.bind(this)); // Since we left off the reject handler, it will propagate up if there is a validation error
    },
    /**
     * If an entry is valid, validate should return a promise that resolves to true. If the entry is not valid,
     * validate should return a reject promise with the error message.
     * @param entry
     * @returns Promise
     */
    validate: function (entry) {
        var def = new Deferred();
        if (entry) {
            def.resolve(true);
        }

        def.reject('The entry is null or undefined.');
        return def.promise;
    }
});
