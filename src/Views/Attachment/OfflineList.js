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
import utility from '../../Utility';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import convert from 'argos/Convert';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';
import string from 'dojo/string';
import FileManager from '../../FileManager';

const resource = getResource('attachmentList');
const hashTagResource = getResource('attachmentListHashTags');
const dtFormatResource = getResource('attachmentListDateTimeFormat');

/**
 * @class crm.Views.Attachments.OfflineList
 *
 * @extends argos.List
 * @mixins argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins argos._LegacySDataListMixin
 *
 * @requires argos.List
 * @requires argos._LegacySDataListMixin
 * @requires argos.Convert
 *
 * @requires crm.Format
 * @requires crm.Views._RightDrawerListMixin
 *
 * @requires moment
 *
 * @requires string
 */
const __class = declare('crm.Views.Attachment.OfflineList', [List, _RightDrawerListMixin, _LegacySDataListMixin], {
    // Templates
    itemTemplate: new Simplate([
        'file',
    ]),
    fileTemplate: new Simplate([
        '<p class="micro-text"><span>file </span></p>',
    ]),
    urlTemplate: new Simplate([
        '<p class="micro-text"><span>file</span></p>',
    ]),
    isRefreshing: false,
    allowSelection: true,
    // Localization
    titleText: 'My Offline Attachments',
    attachmentDateFormatText: dtFormatResource.attachmentDateFormatText,
    attachmentDateFormatText24: dtFormatResource.attachmentDateFormatText24,
    uploadedOnText: resource.uploadedOnText, // Uploaded 10 days ago
    touchedText: resource.touchedText,

    // View Properties
    id: 'attachment_offlinelist',
    enableOfflineSupport: true,
    security: null,
    enableActions: true,
    detailView: 'view_attachment',
    insertView: 'attachment_Add',
    iconClass: 'attach',
    queryOrderBy: 'attachDate desc',
    querySelect: [
        'description',
        'user',
        'createUser',
        'attachDate',
        'fileSize',
        'fileName',
        'url',
        'fileExists',
        'remoteStatus',
        'dataType',
        'ModifyDate',
    ],
    resourceKind: 'attachments',
    contractName: 'system',
    queryInclude: [
        '$descriptors',
        '$permissions',
    ],
    constructor: function constructor() {
        this._fileManager = new FileManager();
    },

    hashTagQueries: {
        url: "(fileName like '%.URL')",
        binary: "(fileName not like '%.URL')",
    },
    createActionLayout: function createActionLayout() {
        return this.actions || (this.actions = [{
            id: 'offlineSave',
            //cls: 'edit',
            label: 'Save to Infor CRM',
            //security: 'Entities/Account/Edit',
            action: 'navigateToEditView',
            enabled: function enabled() {
                return App.isOnline();
            },
        }, {
            id: 'offlineDelete',
            //cls: 'delete',
            label: 'delete',
            action: 'deleteNote',
        }]);
    },
    navigateToEditView: function navigateToEditView(action, selection) {
        console.log('action: save to inforcrm');
        const service = App.getService(this.serviceName);
        var baseUrl = utility.stripQueryArgs(service.getUri().toString());
        this._fileManager.uploadOfflineFile(selection.data.fileName, baseUrl, null, null, null, null, null);
    },
    deleteNote: function deleteNote(action, selection) {

    },
    hashTagQueriesText: {
        url: hashTagResource.hashTagUrlText,
        binary: hashTagResource.hashTagBinaryText,
    },
    createToolLayout: function createToolLayout() {
        if (!App.supportsFileAPI()) {
            this.insertView = null;
        } else {
            return this.inherited(arguments);
        }
    },
    createRequest: function createRequest() {
        const request = this.inherited(arguments);
        request.setQueryArg('_includeFile', 'false');
        return request;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
        return `upper(description) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
    },
    getLink: function getLink(attachment) {
        let toReturn;
        if (attachment.url) {
            let href = attachment.url || '';
            href = (href.indexOf('http') < 0) ? `http://${href}` : href;
            toReturn = `<a class="hyperlink" href="${href}" target="_blank" title="${attachment.url}">${attachment.$descriptor}</a>`;
        } else {
            if (attachment.fileExists) {
                toReturn = `<a class="hyperlink" href="javascript: Sage.Utility.File.Attachment.getAttachment('${attachment.$key}');" title="${attachment.$descriptor}">${attachment.$descriptor}</a>`;
            } else {
                toReturn = attachment.$descriptor;
            }
        }
        return toReturn;
    },
    itemIconClass: 'document',
    fileIconByType: {
        xls: 'spreadsheet',
        xlsx: 'spreadsheet',
        doc: 'special-item',
        docx: 'special-item',
        ppt: 'display',
        pptx: 'display',
        txt: 'document2',
        rtf: 'document2',
        csv: 'document2',
        pdf: 'pdf-file',
        zip: 'document', // TODO: convert to soho icon
        png: 'overlay-line',
        jpg: 'overlay-line',
        gif: 'overlay-line',
        bmp: 'overlay-line',
    },
    getItemIconClass: function getItemIconClass(entry) {
        const fileName = entry && entry.fileName;
        let type = utility.getFileExtension(fileName);
        let cls = this.itemIconClass;
        if (type) {
            type = type.substr(1); // Remove the '.' from the ext.
            const typeCls = this.fileIconByType[type];
            if (typeCls) {
                cls = typeCls;
            }
        }
        return cls;
    },
    createIndicatorLayout: function createIndicatorLayout() {
        return this.itemIndicators || (this.itemIndicators = [{
            id: 'touched',
            cls: 'flag',
            label: this.touchedText,
            onApply: function onApply(entry, parent) {
                this.isEnabled = parent.hasBeenTouched(entry);
            },
        }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
        if (entry.modifyDate) {
            const modifiedDate = moment(convert.toDateFromString(entry.modifyDate));
            const currentDate = moment().endOf('day');
            const weekAgo = moment().subtract(1, 'weeks');

            return modifiedDate.isAfter(weekAgo) &&
                modifiedDate.isBefore(currentDate);
        }
        return false;
    },
    buildUploadedText: function buildUploadedText(date) {
        const modifiedDate = moment(date).toDate();
        return string.substitute(this.uploadedOnText, [modifiedDate.toLocaleDateString(), modifiedDate.toLocaleTimeString()]);
    },
    isDisabled: function isDisabled() {
        return !App.enableOfflineSupport;
    },
});

export default __class;
