/**
 * @class crm.Views.RecentlyViewed.List
 *
 * @extends argos._ListBase
 * @requires argos._ListBase
 *
 *
 */
import declare from 'dojo/_base/declare';
import _ListBase from 'argos/_ListBase';
import _CardLayoutListMixin from '../_CardLayoutListMixin';
import _RightDrawerListMixin from './_RightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import TotalMetricWidget from './TotalMetricWidget';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import MODEL_TYPES from 'argos/Models/Types';
import all from 'dojo/promise/all';
import OfflineDetail from '../Offline/Detail';

export default declare('crm.Views.RecentlyViewed.List', [_ListBase, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  id: 'recently_viewed_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  enableSearch: false,
  enableActions: true,
  enableOfflineSupport: true,
  resourceKind: 'offline',
  entityName: 'RecentlyViewd',
  titleText: 'Recently Viewed',
  metricWidgetCtor: TotalMetricWidget,

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
    '<h4>{%: $$.getOfflineDate($) %}</h4>',
  ]),
  refreshRequiredFor: function refreshRequiredFor() {
    return true;
  },
  getModel: function getModel() {
    const model = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    return model;
  },
  getTitle: function getTitle(entry) {
    return entry && entry.description;
  },
  getOfflineDate: function getOfflineDate(entry) {
    if (entry && entry.modifyDate) {
      return format.relativeDate(entry.modifyDate);
    }
    return '';
  },
   _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
    const options = widgetOptions;
    options.activeEntityFilters = this._model.getActiveEntityFilters();
    return options;
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    delete queryOptions.count;
    delete queryOptions.start;
    queryOptions.include_docs = true;
    queryOptions.descending = true;
    return queryOptions;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    let iconClass;
    iconClass = entry.iconClass;
    if (!iconClass) {
      iconClass = 'fa fa-cloud fa-2x';
    }
    return iconClass;
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    const entry = this.entries && this.entries[key];
    if (App.onLine) {
      this.navigateToOnlineDetailView(entry, additionalOptions);
    } else {
      this.navigateToOfflineDetailView(entry, additionalOptions);
    }
  },
  navigateToOnlineDetailView: function navigateToDetailView(entry, additionalOptions) {
    const view = this.app.getView(entry.viewId);

    let options = {
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entityId,
      fromContext: this,
    };

    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  navigateToOfflineDetailView: function navigateToOfflineDetailView(entry, additionalOptions) {
    const view = this.getDetailView(entry.entityName);
    let options = {
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entityId,
      fromContext: this,
      offlineContext: {
        entityId: entry.entityId,
        entityName: entry.entityName,
        viewId: entry.viewId,
        source: entry,
      },
    };
    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  getDetailView: function getDetailView(entityName) {
    const viewId = this.detailView + '_' + entityName;
    let view = this.app.getView(viewId);

    if (view) {
      return view;
    }

    this.app.registerView(new OfflineDetail({id: viewId}));

    view = this.app.getView(viewId);

    return view;
  },
  buildQueryExpression: function buildQueryExpression() {
    const filters = this.getActiveEntityFilters();
    return function queryFn(doc, emit) {
      // If the user has entity filters stored in preferences, filter based on that
      if (App.preferences && App.preferences.recentlyViewedEntityFilters) {
        filters.forEach((f) => {
          if ((doc.entity.entityName === f.name) && (doc.entityName === 'RecentlyViewed')) {
            emit(doc.modifyDate);
          }
        });
      } else {
        // User has no entity filter preferences (from right drawer)
        if (doc.entityName === 'RecentlyViewed') {
          emit(doc.modifyDate);
        }
      }
    };
  },
  getActiveEntityFilters: function getActiveEntityFilters() {
    return Object.keys(this.entityMappings)
      .map((entityName) => {
        const prefs = App.preferences && App.preferences.recentlyViewedEntityFilters || [];
        const entityPref = prefs.filter((pref) => {
          return pref.name === entityName;
        });
        return entityPref[0];
      })
      .filter((f) => f && f.enabled);
  },

  // Localization
  entityText: {
    'Contact': 'Contacts',
    'Account': 'Accounts',
    'Opportunity': 'Opportunities',
    'Ticket': 'Tickets',
    'Lead': 'Leads',
    'Activity': 'Activities',
    'History': 'History',
  },
  entityMappings: {
    'Contact': {
      iconClass: 'fa-user',
    },
    'Account': {
      iconClass: 'fa-building-o',
    },
    'Opportunity': {
      iconClass: 'fa-money',
    },
    'Ticket': {
      iconClass: 'fa-clipboard',
    },
    'Lead': {
      iconClass: 'fa-filter',
    },
    'Activity': {
      iconClass: 'fa-calendar-o',
    },
    'History': {
      iconClass: 'fa-history',
    },
  },
  createToolLayout: function createToolLayout() {
    if (this.tools) {
      return this.tools;
    }
    const tools = this.inherited(arguments);
    tools.tbar = [];
    if (tools && tools.tbar) {
      tools.tbar.push({
        id: 'clear',
        cls: 'fa fa-eraser fa-fw fa-lg',
        action: 'clearList',
        security: '',
      });
    }
    return tools;
  },
  clearList: function clearList(action, selection) { // eslint-disable-line
    const requests = [];
    if (this.entries) {
      for (const entryId in this.entries) {
        if (this.entries.hasOwnProperty(entryId)) {
          requests.push(this.removeItem(entryId));
        }
      }
    }
    all(requests).then(() => {
      this.clear();
      this.refreshRequired = true;
      this.refresh();
    }, (err) => {
      console.error(err);// eslint-disable-line
    });
  },
  removeItem: function removeItem(entryId) {
    const rvModel = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    return rvModel.deleteEntry(entryId);
  },
});
