define('crm/Views/Calendar/WeekView', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/query', 'dojo/string', 'dojo/dom-construct', 'dojo/dom-class', 'argos/ErrorManager', 'argos/Convert', 'argos/List', 'argos/_LegacySDataListMixin', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoQuery, _dojoString, _dojoDomConstruct, _dojoDomClass, _argosErrorManager, _argosConvert, _argosList, _argos_LegacySDataListMixin, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _query = _interopRequireDefault(_dojoQuery);

  var _string = _interopRequireDefault(_dojoString);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _convert = _interopRequireDefault(_argosConvert);

  var _List = _interopRequireDefault(_argosList);

  var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

  var _moment2 = _interopRequireDefault(_moment);

  /**
   * @class crm.Views.Calendar.WeekView
   *
   * @extends argos.List
   * @mixins argos.List
   * @mixins argos._LegacySDataListMixin
   *
   * @requires argos.List
   * @requires argos._LegacySDataListMixin
   * @requires argos.Convert
   * @requires argos.ErrorManager
   *
   * @requires crm.Format
   *
   * @requires moment
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Calendar.WeekView', [_List['default'], _LegacySDataListMixin2['default']], {
    // Localization
    titleText: 'Calendar',
    weekTitleFormatText: 'MMM D, YYYY',
    dayHeaderLeftFormatText: 'dddd',
    dayHeaderRightFormatText: 'MMM D, YYYY',
    eventDateFormatText: 'M/D/YYYY',
    startTimeFormatText: 'h:mm A',
    todayText: 'Today',
    dayText: 'Day',
    weekText: 'Week',
    monthText: 'Month',
    allDayText: 'All Day',
    eventHeaderText: 'Events',
    eventMoreText: 'View ${0} More Event(s)',
    toggleCollapseText: 'toggle collapse',
    toggleCollapseClass: 'fa fa-chevron-down',
    toggleExpandClass: 'fa fa-chevron-right',

    enablePullToRefresh: false,

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '{%! $.navigationTemplate %}', '<div style="clear:both"></div>', '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">', '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<div class="list-content" data-dojo-attach-point="contentNode"></div>', '{%! $.moreTemplate %}', '</div>']),
    navigationTemplate: new Simplate(['<div class="split-buttons">', '<button data-tool="today" data-action="getThisWeekActivities" class="button">{%: $.todayText %}</button>', '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>', '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>', '<button data-tool="week" class="button current">{%: $.weekText %}</button>', '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>', '</div>', '<div class="nav-bar">', '<button data-tool="next" data-action="getNextWeekActivities" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>', '<button data-tool="prev" data-action="getPrevWeekActivities" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>', '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>', '</div>']),
    groupTemplate: new Simplate(['<h2 data-action="activateDayHeader" class="dayHeader {%= $.headerClass %}" data-date="{%: moment($.StartDate).format(\'YYYY-MM-DD\') %}">', '<span class="dayHeaderLeft">{%: moment($.StartDate).format($$.dayHeaderLeftFormatText) %}</span>', '<span class="dayHeaderRight">{%: moment($.StartDate).format($$.dayHeaderRightFormatText) %}</span>', '<div style="clear:both"></div>', '</h2>', '<ul class="list-content">']),
    groupEndTemplate: new Simplate(['</ul>']),
    rowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityIconByType[$.Type] %}">', '</button>', '</td>', '<td class="entry-table-time">{%! $$.timeTemplate %}</td>', '<td class="entry-table-description">{%! $$.itemTemplate %}</td>', '</tr></table>', '</li>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.eventIcon %}">', '</button>', '</td>', '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>', '</tr></table>', '</li>']),
    timeTemplate: new Simplate(['{% if ($.Timeless) { %}', '<span class="p-time">{%= $$.allDayText %}</span>', '{% } else { %}', '<span class="p-time">{%: crm.Format.date($.StartDate, $$.startTimeFormatText) %}</span>', '{% } %}']),
    itemTemplate: new Simplate(['<h3 class="p-description">{%: $.Description %}</h3>', '<h4>{%= $$.nameTemplate.apply($) %}</h4>']),
    eventItemTemplate: new Simplate(['<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>', '<h4>{%! $$.eventNameTemplate %}</h4>']),
    nameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} / {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    eventNameTemplate: new Simplate(['{%: moment($.StartDate).format($$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: moment($.EndDate).format($$.eventDateFormatText) %}']),
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode">{%= $$.eventMoreText %}</span>', '</button>', '</div>']),
    noDataTemplate: new Simplate(['<div class="no-data"><h3>{%= $.noDataText %}</h3></div>']),
    eventRemainingContentNode: null,
    eventContentNode: null,
    attributeMap: {
      listContent: {
        node: 'contentNode',
        type: 'innerHTML'
      },
      dateContent: {
        node: 'dateNode',
        type: 'innerHTML'
      },
      eventListContent: {
        node: 'eventContentNode',
        type: 'innerHTML'
      },
      eventRemainingContent: {
        node: 'eventRemainingContentNode',
        type: 'innerHTML'
      },
      remainingContent: {
        node: 'remainingContentNode',
        type: 'innerHTML'
      }
    },

    // View Properties
    id: 'calendar_weeklist',
    cls: 'list activities-for-week',
    activityDetailView: 'activity_detail',
    eventDetailView: 'event_detail',
    monthView: 'calendar_monthlist',
    datePickerView: 'generic_calendar',
    activityListView: 'calendar_daylist',
    insertView: 'activity_types_list',
    currentDate: null,
    enableSearch: false,
    expose: false,
    entryGroups: {},
    weekStartDate: null,
    weekEndDate: null,
    todayDate: null,
    continuousScrolling: false,

    queryWhere: null,
    queryOrderBy: 'StartDate desc',
    querySelect: ['Description', 'StartDate', 'Type', 'AccountName', 'ContactName', 'LeadId', 'LeadName', 'UserId', 'Timeless'],
    eventQuerySelect: ['StartDate', 'EndDate', 'Description', 'Type'],
    activityIconByType: {
      'atToDo': 'fa fa-list-ul',
      'atPhoneCall': 'fa fa-phone',
      'atAppointment': 'fa fa-calendar-o',
      'atLiterature': 'fa fa-calendar-o',
      'atPersonal': 'fa fa-check-square-o',
      'atQuestion': 'fa fa-question',
      'atNote': 'fa fa-calendar-o',
      'atEMail': 'fa fa-envelope'
    },
    eventIcon: 'fa fa-calendar-o',

    contractName: 'system',
    pageSize: 105, // gives 15 activities per day
    eventPageSize: 5,
    resourceKind: 'activities',

    _onRefresh: function _onRefresh(o) {
      this.inherited(arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    init: function init() {
      this.inherited(arguments);
      this.todayDate = (0, _moment2['default'])().startOf('day');
      this.currentDate = this.todayDate.clone();
    },
    toggleGroup: function toggleGroup(params) {
      var node = params.$source;
      if (node && node.parentNode) {
        _domClass['default'].toggle(node, 'collapsed');
        _domClass['default'].toggle(node.parentNode, 'collapsed-event');

        var button = this.collapseButton;

        if (button) {
          _domClass['default'].toggle(button, this.toggleCollapseClass);
          _domClass['default'].toggle(button, this.toggleExpandClass);
        }
      }
    },
    activateDayHeader: function activateDayHeader(params) {
      this.currentDate = (0, _moment2['default'])(params.date, 'YYYY-MM-DD');
      this.navigateToDayView();
    },
    getThisWeekActivities: function getThisWeekActivities() {
      if (!this.isInCurrentWeek(this.todayDate)) {
        this.currentDate = this.todayDate.clone();
        this.refresh();
      }
    },
    getStartDay: function getStartDay(date) {
      return date.clone().startOf('week');
    },
    getEndDay: function getEndDay(date) {
      return date.clone().endOf('week');
    },
    getNextWeekActivities: function getNextWeekActivities() {
      this.currentDate = this.getStartDay(this.weekEndDate.clone().add({
        days: 1
      }));
      this.refresh();
    },
    getPrevWeekActivities: function getPrevWeekActivities() {
      this.currentDate = this.getStartDay(this.weekStartDate.clone().subtract({
        days: 1
      }));
      this.refresh();
    },
    setWeekQuery: function setWeekQuery() {
      var setDate = this.currentDate || this.todayDate;
      this.weekStartDate = this.getStartDay(setDate);
      this.weekEndDate = this.getEndDay(setDate);
      this.queryWhere = _string['default'].substitute(['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate between @${3}@ and @${4}@))'].join(''), [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(this.weekStartDate.toDate()), _convert['default'].toIsoStringFromDate(this.weekEndDate.toDate()), this.weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'), this.weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    setWeekTitle: function setWeekTitle() {
      var start = this.getStartDay(this.currentDate);
      var end = this.getEndDay(this.currentDate);

      this.set('dateContent', _string['default'].substitute('${0}-${1}', [start.format(this.weekTitleFormatText), end.format(this.weekTitleFormatText)]));
    },
    isInCurrentWeek: function isInCurrentWeek(date) {
      return date.valueOf() > this.weekStartDate.valueOf() && date.valueOf() < this.weekEndDate.valueOf();
    },
    processFeed: function processFeed(feed) {
      this.feed = feed;

      var todayNode = this.addTodayDom();
      var entryGroups = this.entryGroups;
      var feedLength = feed.$resources.length;
      var entryOrder = [];
      var dateCompareString = 'YYYY-MM-DD';
      var o = [];

      // If we fetched a page that has no data due to un-reliable counts,
      // check if we fetched anything in the previous pages before assuming there is no data.
      if (feedLength === 0 && Object.keys(this.entries).length === 0) {
        (0, _query['default'])(this.contentNode).append(this.noDataTemplate.apply(this));
      } else if (feed.$resources) {
        if (todayNode && !entryGroups[this.todayDate.format(dateCompareString)]) {
          entryGroups[this.todayDate.format(dateCompareString)] = [todayNode];
        }

        for (var i = 0; i < feed.$resources.length; i++) {
          var currentEntry = feed.$resources[i];
          var startDate = _convert['default'].toDateFromString(currentEntry.StartDate);
          if (currentEntry.Timeless) {
            startDate = this.dateToUTC(startDate);
          }
          currentEntry.StartDate = startDate;
          currentEntry.isEvent = false;
          this.entries[currentEntry.$key] = currentEntry;

          var currentDateCompareKey = (0, _moment2['default'])(currentEntry.StartDate).format(dateCompareString);
          var currentGroup = entryGroups[currentDateCompareKey];
          if (currentGroup) {
            if (currentEntry.Timeless) {
              currentGroup.splice(1, 0, this.rowTemplate.apply(currentEntry, this));
            } else {
              currentGroup.push(this.rowTemplate.apply(currentEntry, this));
            }
            continue;
          }
          currentGroup = [this.groupTemplate.apply(currentEntry, this)];
          currentGroup.push(this.rowTemplate.apply(currentEntry, this));
          entryGroups[currentDateCompareKey] = currentGroup;
        }

        for (var entryGroup in entryGroups) {
          if (entryGroups.hasOwnProperty(entryGroup)) {
            entryOrder.push((0, _moment2['default'])(entryGroup, dateCompareString));
          }
        }

        entryOrder.sort(function sortEntryOrder(a, b) {
          if (a.valueOf() < b.valueOf()) {
            return 1;
          } else if (a.valueOf() > b.valueOf()) {
            return -1;
          }

          return 0;
        });

        var entryOrderLength = entryOrder.length;
        for (var i = 0; i < entryOrderLength; i++) {
          o.push(entryGroups[entryOrder[i].format(dateCompareString)].join('') + this.groupEndTemplate.apply(this));
        }

        if (o.length > 0) {
          this.set('listContent', o.join(''));
        }
      }

      this.set('remainingContent', ''); // Feed does not return reliable data, don't show remaining

      _domClass['default'].toggle(this.domNode, 'list-has-more', this.hasMoreData());
      this._loadPreviousSelections();
    },
    addTodayDom: function addTodayDom() {
      if (!this.isInCurrentWeek(this.todayDate)) {
        return null;
      }

      var todayEntry = {
        StartDate: this.todayDate.toDate(),
        headerClass: 'currentDate'
      };

      return this.groupTemplate.apply(todayEntry, this);
    },
    dateToUTC: function dateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    },
    requestEventData: function requestEventData() {
      var request = this.createEventRequest();
      request.read({
        success: this.onRequestEventDataSuccess,
        failure: this.onRequestEventDataFailure,
        aborted: this.onRequestEventDataAborted,
        scope: this
      });
    },
    onRequestEventDataFailure: function onRequestEventDataFailure(response, o) {
      alert(_string['default'].substitute(this.requestErrorText, [response, o])); // eslint-disable-line
      _ErrorManager['default'].addError(response, o, this.options, 'failure');
    },
    onRequestEventDataAborted: function onRequestEventDataAborted() {
      this.options = false; // force a refresh
    },
    onRequestEventDataSuccess: function onRequestEventDataSuccess(feed) {
      this.processEventFeed(feed);
    },
    createEventRequest: function createEventRequest() {
      var querySelect = this.eventQuerySelect;
      var queryWhere = this.getEventQuery();
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setCount(this.eventPageSize).setStartIndex(1).setResourceKind('events').setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(',')).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);
      return request;
    },
    getEventQuery: function getEventQuery() {
      var startDate = this.weekStartDate;
      var endDate = this.weekEndDate;
      return _string['default'].substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, startDate.format('YYYY-MM-DDT00:00:00[Z]'), endDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    hideEventList: function hideEventList() {
      _domClass['default'].add(this.eventContainerNode, 'event-hidden');
    },
    showEventList: function showEventList() {
      _domClass['default'].remove(this.eventContainerNode, 'event-hidden');
    },
    processEventFeed: function processEventFeed(feed) {
      var o = [];
      var feedLength = feed.$resources.length;

      if (feedLength === 0) {
        this.hideEventList();
        return false;
      }

      this.showEventList();

      for (var i = 0; i < feedLength; i++) {
        var _event = feed.$resources[i];
        _event.isEvent = true;
        _event.StartDate = (0, _moment2['default'])(_convert['default'].toDateFromString(_event.StartDate));
        _event.EndDate = (0, _moment2['default'])(_convert['default'].toDateFromString(_event.EndDate));
        this.entries[_event.$key] = _event;
        o.push(this.eventRowTemplate.apply(_event, this));
      }

      if (feed.$totalResults > feedLength) {
        _domClass['default'].add(this.eventContainerNode, 'list-has-more');
        this.set('eventRemainingContent', _string['default'].substitute(this.eventMoreText, [feed.$totalResults - feedLength]));
      } else {
        _domClass['default'].remove(this.eventContainerNode, 'list-has-more');
        _domConstruct['default'].empty(this.eventRemainingContentNode);
      }

      this.set('eventListContent', o.join(''));
    },
    refresh: function refresh() {
      var startDate = this.currentDate.clone();
      this.currentDate = startDate.clone();
      this.weekStartDate = this.getStartDay(startDate);
      this.weekEndDate = this.getEndDay(startDate);
      this.setWeekTitle();
      this.setWeekQuery();

      this.clear();
      this.requestData();
      this.requestEventData();
    },
    show: function show(options) {
      if (options) {
        this.processShowOptions(options);
      }

      this.inherited(arguments);
    },
    processShowOptions: function processShowOptions(options) {
      if (options.currentDate) {
        this.currentDate = (0, _moment2['default'])(options.currentDate).startOf('day') || (0, _moment2['default'])().startOf('day');
        this.refreshRequired = true;
      }
    },
    activateEventMore: function activateEventMore() {
      var view = App.getView('event_related');
      var where = this.getEventQuery();
      if (view) {
        view.show({
          'where': where
        });
      }
    },
    clear: function clear() {
      this.inherited(arguments);
      this.entryGroups = {};
      this.set('eventContent', '');
      this.set('listContent', '');
    },
    selectEntry: function selectEntry(params) {
      var row = (0, _query['default'])(params.$source).closest('[data-key]')[0];
      var key = row ? row.getAttribute('data-key') : false;

      this.navigateToDetailView(key);
    },
    selectDate: function selectDate() {
      var options = {
        date: this.currentDate.toDate(),
        showTimePicker: false,
        timeless: false,
        tools: {
          tbar: [{
            id: 'complete',
            cls: 'fa fa-check fa-fw fa-lg',
            fn: this.selectDateSuccess,
            scope: this
          }, {
            id: 'cancel',
            cls: 'fa fa-ban fa-fw fa-lg',
            side: 'left',
            fn: ReUI.back,
            scope: ReUI
          }]
        }
      };
      var view = App.getView(this.datePickerView);
      if (view) {
        view.show(options);
      }
    },
    selectDateSuccess: function selectDateSuccess() {
      var view = App.getPrimaryActiveView();
      this.currentDate = (0, _moment2['default'])(view.getDateTime()).startOf('day');
      this.refresh();
      ReUI.back();
    },
    navigateToDayView: function navigateToDayView() {
      var view = App.getView(this.activityListView);
      var options = {
        currentDate: this.currentDate.toDate().valueOf() || (0, _moment2['default'])().startOf('day').valueOf()
      };
      view.show(options);
    },
    navigateToMonthView: function navigateToMonthView() {
      var view = App.getView(this.monthView);
      var options = {
        currentDate: this.currentDate.toDate().valueOf() || (0, _moment2['default'])().startOf('day').valueOf()
      };
      view.show(options);
    },
    navigateToInsertView: function navigateToInsertView() {
      var view = App.getView(this.insertView || this.editView);

      this.options.currentDate = this.currentDate.format('YYYY-MM-DD') || (0, _moment2['default'])().startOf('day');
      if (view) {
        view.show({
          negateHistory: true,
          returnTo: this.id,
          insert: true,
          currentDate: this.options.currentDate.valueOf()
        });
      }
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor) {
      var entry = this.entries[key];
      var detailView = entry.isEvent ? this.eventDetailView : this.activityDetailView;
      var view = App.getView(detailView);

      var theDescriptor = entry.isEvent ? descriptor : entry.Description;

      if (view) {
        view.show({
          title: theDescriptor,
          key: key
        });
      }
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Calendar.WeekView', __class);
  module.exports = __class;
});
