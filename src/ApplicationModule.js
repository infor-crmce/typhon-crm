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
import ApplicationModule from 'argos/ApplicationModule';
import Calendar from 'argos/Calendar';
import 'argos/RelatedViewManager';
import 'argos/RelatedViewWidget';
import List from 'argos/List';
import Signature from 'argos/Views/Signature';
import SearchWidget from 'argos/SearchWidget';
import FileSelect from 'argos/Views/FileSelect';
import AddAccountContact from './Views/AddAccountContact';
import AreaCategoryIssueLookup from './Views/AreaCategoryIssueLookup';
import ExchangeRateLookup from './Views/ExchangeRateLookup';
import MainToolbar from './Views/MainToolbar';
import UpdateToolbar from './Views/UpdateToolbar';
import LeftDrawer from './Views/LeftDrawer';
import RightDrawer from './Views/RightDrawer';
import OfflineDetail from './Views/Offline/Detail';
import OfflineList from './Views/Offline/List';
import Login from './Views/Login';
import LogOff from './Views/LogOff';
import Settings from './Views/Settings';
import Configure from './Views/Configure';
import Help from './Views/Help';
import NameEdit from './Views/NameEdit';
import PickList from './Views/PickList';
import SelectList from './Views/SelectList';
import SpeedSearchList from './Views/SpeedSearchList';
import TextEdit from './Views/TextEdit';
import AccountList from './Views/Account/List';
import AccountDetail from './Views/Account/Detail';
import AccountEdit from './Views/Account/Edit';

import SurveyList from './Views/Survey/List';
import SurveyDetail from './Views/Survey/Detail';
import SurveyEdit from './Views/Survey/Edit';

import SurveyQuestionList from './Views/SurveyQuestion/List';
import SurveyQuestionDetail from './Views/SurveyQuestion/Detail';
import SurveyQuestionEdit from './Views/SurveyQuestion/Edit';

import SurveyQuestionTypeList from './Views/SurveyQuestionType/List';

import SurveyProductList from './Views/SurveyProduct/List';
import SurveyProductDetail from './Views/SurveyProduct/Detail';
import SurveyProductEdit from './Views/SurveyProduct/Edit';

import SurveyAccountList from './Views/SurveyAccount/List';
import SurveyAccountDetail from './Views/SurveyAccount/Detail';
import SurveyAccountEdit from './Views/SurveyAccount/Edit';

import SurveyTakeList from './Views/SurveyTake/List';
import SurveyTakeEdit from './Views/SurveyTake/Edit';

import AddressList from './Views/Address/List';
import AddressEdit from './Views/Address/Edit';
import ActivityList from './Views/Activity/List';
import MyDayList from './Views/Activity/MyDay';
import MyActivityList from './Views/Activity/MyList';
import ActivityDetail from './Views/Activity/Detail';
import ActivityEdit from './Views/Activity/Edit';
import ActivityComplete from './Views/Activity/Complete';
import ActivityTypesList from './Views/Activity/TypesList';
import ActivityRecurring from './Views/Activity/Recurring';
import CalendarView from './Views/Calendar/CalendarView';
import DayView from './Views/Calendar/DayView';
import MonthView from './Views/Calendar/MonthView';
import WeekView from './Views/Calendar/WeekView';
import GenericBar from './Views/Charts/GenericBar';
import GenericLine from './Views/Charts/GenericLine';
import GenericPie from './Views/Charts/GenericPie';
import CompetitorList from './Views/Competitor/List';
import ContactList from './Views/Contact/List';
import ContactDetail from './Views/Contact/Detail';
import ContactEdit from './Views/Contact/Edit';
import ContractList from './Views/Contract/List';
import ErrorLogList from './Views/ErrorLog/List';
import ErrorLogDetail from './Views/ErrorLog/Detail';
import EventList from './Views/Event/List';
import EventDetail from './Views/Event/Detail';
import EventEdit from './Views/Event/Edit';
import GroupsSelector from './Views/Groups/Selector';
import LeadList from './Views/Lead/List';
import LeadDetail from './Views/Lead/Detail';
import LeadEdit from './Views/Lead/Edit';
import LeadSourceList from './Views/LeadSource/List';
import OpportunityList from './Views/Opportunity/List';
import OpportunityDetail from './Views/Opportunity/Detail';
import OpportunityEdit from './Views/Opportunity/Edit';
import OpportunityQuickEdit from './Views/Opportunity/QuickEdit';
import OpportunityContactList from './Views/OpportunityContact/List';
import OpportunityContactDetail from './Views/OpportunityContact/Detail';
import OpportunityContactEdit from './Views/OpportunityContact/Edit';
import OpportunityProductList from './Views/OpportunityProduct/List';
import OpportunityProductDetail from './Views/OpportunityProduct/Detail';
import OpportunityProductEdit from './Views/OpportunityProduct/Edit';
import OwnerList from './Views/Owner/List';
import ProductList from './Views/Product/List';
import ProductEdit from './Views/Product/Edit';
import ProductProgramList from './Views/ProductProgram/List';
import TicketList from './Views/Ticket/List';
import TicketDetail from './Views/Ticket/Detail';
import TicketEdit from './Views/Ticket/Edit';
import TicketUrgencyLookup from './Views/Ticket/UrgencyLookup';
import TicketActivityList from './Views/TicketActivity/List';
import TicketActivityDetail from './Views/TicketActivity/Detail';
import TicketActivityEdit from './Views/TicketActivity/Edit';
import TicketActivityRateLookup from './Views/TicketActivity/RateLookup';
import TicketActivityItemList from './Views/TicketActivityItem/List';
import TicketActivityItemDetail from './Views/TicketActivityItem/Detail';
import HistoryList from './Views/History/List';
import HistoryListOffline from './Views/History/ListOffline';
import HistoryDetail from './Views/History/Detail';
import HistoryEdit from './Views/History/Edit';
import HistoryEditOffline from './Views/History/EditOffline';
import './Views/History/RelatedView';
import CalendarAccessList from './Views/User/CalendarAccessList';
import UserList from './Views/User/List';
import ViewAttachment from './Views/Attachment/ViewAttachment';
import AttachmentList from './Views/Attachment/List';
import AttachmentOfflineList from './Views/Attachment/OfflineList';
import AddAttachment from './Views/Attachment/AddAttachment';
import MyAttachmentList from './Views/Attachment/MyAttachmentList';
import RecentlyViewedList from './Views/RecentlyViewed/List';
import BriefcaseList from './Views/Briefcase/List';
import OfflineOptionsEdit from './Views/OfflineOptions/Edit';
import LanguageOptionsEdit from './Views/LanguageOptions/Edit';
import TicketProductsEdit from './Views/TicketProduct/Edit';
import TicketProductList from './Views/TicketProduct/List';
import AccountProductList from './Views/TicketProduct/AccountProductList';
import TicketReturnList from './Views/TicketReturn/List';
import TicketReturnEdit from './Views/TicketReturn/Edit';

import getResource from 'argos/I18n';
import MODEL_NAMES from './Models/Names';
import MODEL_TYPES from 'argos/Models/Types';
import './Views/OfflineOptions/UsageWidget';
import './Views/LanguageOptions/UsageWidget';
import './Fields/AddressField';
import './Fields/MultiCurrencyField';
import './Fields/NameField';
import './Fields/PicklistField';
import './Fields/RecurrencesField';
import './Views/RelatedContextWidget';
import './Views/RelatedEditWidget';
import './Action';
import './Format';
import './Template';
import './Validator';
import './Environment';
import './Utility';
import './Models/Account/Offline';
import './Models/Account/SData';

import './Models/Survey/Offline';
import './Models/Survey/SData';

import './Models/SurveyQuestion/Offline';
import './Models/SurveyQuestion/SData';

import './Models/SurveyAccount/Offline';
import './Models/SurveyAccount/SData';

import './Models/SurveyQuestionType/Offline';
import './Models/SurveyQuestionType/SData';

import './Models/SurveyProduct/Offline';
import './Models/SurveyProduct/SData';

import './Models/SurveyAnswer/Offline';
import './Models/SurveyAnswer/SData';

import './Models/SurveyHistory/Offline';
import './Models/SurveyHistory/SData';

import './Models/Activity/Offline';
import './Models/Activity/SData';
import './Models/Contact/Offline';
import './Models/Contact/SData';
import './Models/Integration/SData';
import './Models/Lead/Offline';
import './Models/Lead/SData';
import './Models/LeadAddress/Offline';
import './Models/LeadAddress/SData';
import './Models/Opportunity/Offline';
import './Models/Opportunity/SData';
import './Models/OpportunityContact/Offline';
import './Models/OpportunityContact/SData';
import './Models/UserActivity/Offline';
import './Models/UserActivity/SData';
import './Models/Address/Offline';
import './Models/Address/SData';
import './Models/History/Offline';
import './Models/History/SData';
import './Models/Ticket/Offline';
import './Models/Ticket/SData';
import './Models/TicketActivity/Offline';
import './Models/TicketActivity/SData';
import './Models/Authentication/Offline';

const resource = getResource('applicationModule');

/**
 * @class crm.ApplicationModule
 * @extends argos.ApplicationModule
 */
const __class = declare('crm.ApplicationModule', [ApplicationModule], /** @lends crm.ApplicationModule# */{
  searchText: resource.searchText,
  loadViews: function loadViews() {
    this.inherited(loadViews, arguments);

    this.registerView(new Calendar({
      expose: false,
    }));

    this.registerView(new Signature({
      expose: false,
    }));

    this.registerView(new Login());

    this.registerView(new LogOff());

    this.registerView(new LeftDrawer(), $('.application-menu', this.application.getContainerNode()).first().get(0), 'last');

    const modalBody = $('.modal-body', this.application.viewSettingsModal.element);
    this.registerView(new RightDrawer(), modalBody.first().get(0));

    this.registerView(new OfflineDetail({
      canRedirectTo: true,
    }));
    this.registerView(new OfflineList({
      expose: false,
      canRedirectTo: true,
    }));
    this.registerView(new RecentlyViewedList({
      expose: true,
      canRedirectTo: true,
    }));
    this.registerView(new RecentlyViewedList({
      id: 'recently_viewed_list_offline',
      expose: false,
      canRedirectTo: true,
    }));
    this.registerView(new BriefcaseList({
      expose: true,
      canRedirectTo: true,
    }));
    this.registerView(new Help({
      canRedirectTo: true,
    }));
    this.registerView(new Settings({
      canRedirectTo: true,
    }));
    this.registerView(new Configure());
    this.registerView(new PickList());
    this.registerView(new SelectList());
    this.registerView(new SpeedSearchList());
    this.registerView(new AddAccountContact());
    this.registerView(new AreaCategoryIssueLookup());
    this.registerView(new ExchangeRateLookup());
    this.registerView(new FileSelect());

    this.registerView(new NameEdit());
    this.registerView(new TextEdit());
    this.registerView(new AddressList({
      id: 'address_related',
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    this.registerView(new AddressEdit());


    this.registerView(new SurveyList());
    this.registerView(new SurveyDetail());
    this.registerView(new SurveyEdit());

    this.registerView(new SurveyQuestionList());
    this.registerView(new SurveyQuestionDetail());
    this.registerView(new SurveyQuestionEdit());

    this.registerView(new SurveyProductList());
    this.registerView(new SurveyProductDetail());
    this.registerView(new SurveyProductEdit());

    this.registerView(new SurveyTakeList());
    this.registerView(new SurveyTakeList({
      id: 'surveyTake_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new SurveyTakeEdit());

    this.registerView(new SurveyList({
      id: 'survey_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new SurveyQuestionTypeList());

    this.registerView(new SurveyQuestionList({
      id: 'surveyQuestion_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new SurveyAccountList());
    this.registerView(new SurveyAccountEdit());
    this.registerView(new SurveyAccountDetail());

    this.registerView(new AccountList({
      canRedirectTo: true,
    }));
    this.registerView(new AccountDetail({
      canRedirectTo: true,
    }));
    this.registerView(new AccountEdit());
    this.registerView(new AccountList({
      id: 'account_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    this.registerView(new CalendarView());
    this.registerView(new DayView());
    this.registerView(new MonthView());
    this.registerView(new WeekView());

    // Charts
    this.registerView(new GenericBar({
      expose: false,
    }));
    this.registerView(new GenericLine({
      expose: false,
    }));
    this.registerView(new GenericPie({
      expose: false,
    }));

    this.registerView(new CompetitorList({
      id: 'competitor_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new ContactList({
      canRedirectTo: true,
    }));
    this.registerView(new ContactDetail({
      canRedirectTo: true,
    }));
    this.registerView(new ContactEdit());
    this.registerView(new ContactList({
      id: 'contact_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new ContractList({
      id: 'contract_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new ErrorLogList({
      canRedirectTo: true,
    }));
    this.registerView(new ErrorLogDetail({
      canRedirectTo: true,
    }));

    this.registerView(new EventEdit());
    this.registerView(new EventList({
      expose: false,
    }));
    this.registerView(new EventDetail());
    this.registerView(new EventList({
      id: 'event_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new GroupsSelector());

    this.registerView(new OpportunityEdit());
    this.registerView(new OpportunityQuickEdit());
    this.registerView(new OpportunityList({
      canRedirectTo: true,
    }));
    this.registerView(new OpportunityDetail({
      canRedirectTo: true,
    }));
    this.registerView(new OpportunityList({
      id: 'opportunity_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new OpportunityContactEdit());
    this.registerView(new OpportunityContactList());
    this.registerView(new OpportunityContactDetail());
    this.registerView(new OpportunityContactList({
      id: 'opportunitycontact_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new TicketProductsEdit());
    this.registerView(new AccountProductList({
      expose: false,
    }));
    this.registerView(new TicketReturnList({
      expose: false,
    }));
    this.registerView(new TicketReturnEdit({
      expose: false,
    }));

    this.registerView(new OpportunityProductList({
      id: 'opportunityproduct_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new OpportunityProductDetail({
      id: 'opportunityproduct_detail',
      expose: false,
    }));

    this.registerView(new OpportunityProductEdit({
      id: 'opportunityproduct_edit',
      expose: false,
    }));
    this.registerView(new ProductEdit({
      id: 'product_edit',
      expose: false,
    }));

    this.registerView(new LeadEdit());
    this.registerView(new LeadList({
      canRedirectTo: true,
    }));
    this.registerView(new LeadDetail({
      canRedirectTo: true,
    }));
    this.registerView(new LeadList({
      id: 'lead_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new TicketList({
      canRedirectTo: true,
    }));
    this.registerView(new TicketDetail({
      canRedirectTo: true,
    }));
    this.registerView(new TicketEdit());
    this.registerView(new TicketList({
      id: 'ticket_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new TicketActivityList());
    this.registerView(new ActivityList({
      id: 'ticket_activity_related',
      insertView: 'ticket_activity_types_list',
      returnTo: 'ticket_detail',
      options: { track: false, returnTo: 'ticket_detail' },
      _transitionOptions: { track: false, returnTo: 'ticket_detail' },
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
      _transitionComplete: function _transitionComplete(arg, options) {
        if (!options) {
          options = {
            track: false,
            returnTo: 'ticket_detail',
          };
        }
        if (!options.track && typeof options.track !== 'boolean') {
          options.track = false;
        }
        if (!options.returnTo) {
          options.returnTo = 'ticket_detail';
        }
        return options;
      },
      _show: function _show() {
        if (!this.options) {
          this.options = {
            track: false,
            returnTo: 'ticket_detail',
          };
        }
        if (!this.options.track && typeof this.options.track !== 'boolean') {
          this.options.track = false;
        }
        if (!this.options.returnTo) {
          this.options.returnTo = 'ticket_detail';
        }
      },
    }));
    this.registerView(new ActivityComplete({
      id: 'ticket_activity_complete',
      followupView: 'ticket_activity_related',
      returnTo: 'ticket_detail',
      options: { track: false, returnTo: 'ticket_detail' },
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new ActivityTypesList({
      id: 'ticket_activity_types_list',
      editView: 'ticket_activity_insert',
      returnTo: 'ticket_detail',
      expose: false,
      options: { track: false, returnTo: 'ticket_detail' },
      negateHistory: true,
      track: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    const ticketActivityInsert = new ActivityEdit({
      id: 'ticket_activity_insert',
      listView: 'ticket_activity_types_list',
      returnTo: 'ticket_activity_types_list',
      completeView: 'ticket_activity_complete',
      expose: false,
      options: { track: false, returnTo: 'ticket_detail' },
      negateHistory: true,
      defaultSearchTerm: () => {
        return '';
      },
    });
    this.registerView(ticketActivityInsert);
    this.registerView(new TicketActivityDetail());
    this.registerView(new TicketActivityEdit());
    this.registerView(new TicketActivityRateLookup());
    this.registerView(new TicketActivityList({
      id: 'ticketactivity_related',
      expose: false,
      // options: { returnTo: 'ticket_detail' },
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new TicketProductList({
      expose: false,
    }));

    this.registerView(new TicketActivityItemList());
    this.registerView(new TicketActivityItemDetail());
    this.registerView(new TicketActivityItemList({
      id: 'ticketactivityitem_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new ActivityDetail({
      canRedirectTo: true,
    }));
    this.registerView(new ActivityEdit());
    this.registerView(new ActivityComplete());
    this.registerView(new ActivityTypesList());
    this.registerView(new ActivityList({
      id: 'activity_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new MyDayList());
    this.registerView(new MyActivityList());
    this.registerView(new ActivityRecurring());

    this.registerView(new HistoryDetail());
    this.registerView(new HistoryList());
    this.registerView(new HistoryListOffline());
    this.registerView(new HistoryEdit());
    this.registerView(new HistoryEditOffline());
    this.registerView(new HistoryList({
      id: 'history_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new CalendarAccessList({
      expose: false,
    }));

    this.registerView(new UserList({
      expose: false,
    }));

    this.registerView(new OwnerList({
      expose: false,
    }));

    this.registerView(new ProductList({
      id: 'product_related',
      expose: true,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new ProductProgramList({
      id: 'productprogram_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));

    this.registerView(new LeadSourceList({
      expose: false,
    }));

    this.registerView(new TicketUrgencyLookup({
      expose: false,
    }));

    this.registerView(new ViewAttachment());
    this.registerView(new AddAttachment());
    this.registerView(new MyAttachmentList());
    this.registerView(new AttachmentOfflineList());
    this.registerView(new AttachmentList({
      id: 'account_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new AttachmentList({
      id: 'contact_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new AttachmentList({
      id: 'lead_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new AttachmentList({
      id: 'ticket_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new AttachmentList({
      id: 'opportunity_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new AttachmentList({
      id: 'activity_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new AttachmentList({
      id: 'history_attachment_related',
      expose: false,
      defaultSearchTerm: () => {
        return '';
      },
    }));
    this.registerView(new OfflineOptionsEdit({
      expose: false,
    }));
    this.registerView(new LanguageOptionsEdit({
      expose: false,
    }));
  },
  loadToolbars: function loadToolbars() {
    this.inherited(loadToolbars, arguments);

    this.registerToolbar(new MainToolbar({
      name: 'tbar',
    }));

    this.registerToolbar(new UpdateToolbar({
      name: 'updatebar',
    }));
  },
  loadCustomizations: function loadCustomizations() {
    this.loadBaseCustomizations();
  },
  loadBaseCustomizations: function loadBaseCustomizations() {
    lang.extend(List, {
      expose: true,
      getSecurity: function getSecurity() {
        return (this.expose && this.security); // only check security on exposed views
      },
    });

    lang.extend(SearchWidget, {
      searchText: this.searchText,
    });
  },
  /**
   * @deprecated typo, use loadAppStatePromises instead.
   */
  loadAppStatPromises: function loadAppStatPromises() {
    // Redirect to the typo fix.
    this.loadAppStatePromises();
  },
  loadAppStatePromises: function loadAppStatePromises() {
    this.registerAppStatePromise({
      seq: 1,
      description: resource.userContextAndOptionsText,
      items: [{
        name: 'user_detail',
        description: resource.userInformationText,
        fn: () => App.requestUserDetails(),
      }, {
        name: 'user_options',
        description: resource.userOptionsText,
        fn: () => App.requestUserOptions(),
      }, {
        name: 'system_options',
        description: resource.systemOptionsText,
        fn: () => App.requestSystemOptions(),
      }, {
        name: 'integrations',
        description: resource.integrationsText,
        fn: () => {
          const model = this.application.ModelManager.getModel(MODEL_NAMES.INTEGRATION, MODEL_TYPES.SDATA);
          return model.getEntries(null, { contractName: 'dynamic' }).then((results) => {
            this.application.context.integrations = results;
            if (results) {
              results.forEach((integration) => {
                App.requestIntegrationSettings(integration.$descriptor);
              });
            }
            return results;
          });
        },
      }],
    });
  },
});

export default __class;
