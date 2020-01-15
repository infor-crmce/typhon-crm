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
import declare from 'dojo/_base/declare';
import dNumber from 'dojo/number';
import getResource from 'argos/I18n';

const resource = getResource('fileManager');
/**
 * @class crm.FileManager
 */
const __class = declare('crm.FileManager', null, /** @lends crm.FileManager# */{
  unableToUploadText: resource.unableToUploadText,
  unknownSizeText: resource.unknownSizeText,
  unknownErrorText: resource.unknownErrorText,
  largeFileWarningText: resource.largeFileWarningText,
  largeFileWarningTitle: resource.largeFileWarningTitle,
  percentCompleteText: resource.percentCompleteText,
  fileUploadOptions: {
    maxFileSize: 100000000,
  },
  _store: false,
  _totalProgress: 0,
  _files: null,
  _fileCount: 0,
  _filesUploadedCount: 0,
  _isUploading: false,

  /**
     * @constructs
     */
  constructor: function constructor() {
    this._files = [];
    this.fileUploadOptions.maxFileSize = App.maxUploadFileSize;
  },
  /**
     * Checks the {@link crm.Application}'s maxFileSize to determine
     * if the file size being added exeeds this limit.
     * @param {Array}
     * @returns {Boolean}
     */
  isFileSizeAllowed: function isFileSizeAllowed(files) {
    let len = 0;
    const maxfileSize = this.fileUploadOptions.maxFileSize;

    for (let i = 0; i < files.length; i++) {
            if (files[i].size === 0) {// eslint-disable-line
        // do nothing.
      } else {
        len += files[i].size || files[i].blob.length;
      }
    }

    if (len > (maxfileSize)) {
      return false;
    }

    return true;
  },
  /**
     * Uploads a file to a URL.
     * @param {File} file
     * @param {String} url
     * @param {Function} progress Progress callback
     * @param {Event} progress.e
     * @param {Function} complete Complete callback
     * @param {Object} complete.request
     * @param {Function} error Error callback
     * @param {Function} error.errorText
     * @param {Object} scope
     * @param {Boolean} asPut
     */
  uploadFile: function uploadFile(file, url, progress, complete, error, scope, asPut) {
    this.uploadFileHTML5(file, url, progress, complete, error, scope, asPut);
    // return;
    // complete.call(scope || this, 'hi');
    // this.uploadFileHTML5(file, url, progress, complete, error, scope, asPut);
  },
  uploadOfflineFile: function uploadFile(fileName, url, progress, complete, error, scope, asPut) {
    // this.uploadFileHTML5(file, url, progress, complete, error, scope, asPut);
    const indexdbRequest = indexedDB.open('dataFiles', '1.0');
    indexdbRequest.onsuccess = function (e) {
      const indexdb = indexdbRequest.result;
      const readWriteMode = typeof IDBTransaction.READ_WRITE === 'undefined' ? 'readwrite' : IDBTransaction.READ_WRITE;
      const transaction = indexdb.transaction(['files'], readWriteMode);
      const objectStore = transaction.objectStore('files');

      // Get a single item
      const request = objectStore.get(fileName);// "1KB.bin"
      request.onerror = function (e) {
        console.log('error storing data');
        console.log(event);
      };
      request.onsuccess = function (e) {
        console.log('Got the offline file ');
        const request = new XMLHttpRequest();
        const service = App.getService();

        // url = url+'/attachments/file';//TODO
        url = 'http://localhost:8000/sdata/slx/system/-/attachments/file';

        request.open((asPut) ? 'PUT' : 'POST', url);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        if (service) {
          request.setRequestHeader('Authorization', service.createBasicAuthToken());
          request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
          request.setRequestHeader('X-Authorization-Mode', 'no-challenge');

          if (App.isMingleEnabled()) {
            const accessToken = App.mingleAuthResults.access_token;
            request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            request.setRequestHeader('X-Authorization', `Bearer ${accessToken}`);
          }
        }
        const boundary = `---------------------------${(new Date()).getTime()}`;
        // request.setRequestHeader('Content-Type', `multipart/attachment; boundary=${boundary}`);
        request.setRequestHeader('Content-Type', `text/plain; boundary=${boundary}`);

        request.setRequestHeader('Content-Disposition', `attachment; name="file_"; filename*=${fileName}`);
        request.send(e.target.result);
        console.log(`Sync of file is done: ${fileName}`);
      };// End of success
    };
  },
  uploadFileHTML5: function uploadFileHTML5(file, url, progress, complete, error, scope, asPut) {
    if (!this.isFileSizeAllowed([file])) {
      this._onUnableToUploadError(this.largeFileWarningText, error);
      return;
    }
    if (App.supportsFileAPI()) {
      this._uploadFileHTML5_asBinary(file, url, progress, complete, error, scope, asPut);
    } else {
      this._onUnableToUploadError(this.unableToUploadText, error);
    }
  },
  uploadFiletoIndexDB: function uploadFiletoIndexDB(fileData, file, complete, context, scope) {
    // IndexedDB
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
    const dbVersion = 1.0;

    // Create/open database
    const request = indexedDB.open('dataFiles', dbVersion);
    let db;
    const createObjectStore = function (dataBase) {
      // Create an objectStore
      console.log('Creating objectStore');
      dataBase.createObjectStore('files');
    };
    const putdataFileInDb = function () {
      console.log('Putting dataFiles in IndexedDB');

      // Open a transaction to the database
      const readWriteMode = typeof IDBTransaction.READ_WRITE === 'undefined' ? 'readwrite' : IDBTransaction.READ_WRITE;
      const transaction = db.transaction(['files'], readWriteMode);

      // Put the blob into the dabase
      const addReq = transaction.objectStore('files').add(fileData, file.name);
      addReq.onerror = function (e) {
        console.log('error storing data');
        console.error(e);
      };
      transaction.oncomplete = function (e) {
        complete.call(scope || context, null);
        console.log('data stored');
      };// Done
    };

    request.onerror = function (event) {
      console.log('Error creating/accessing IndexedDB database');
    };

    request.onsuccess = function (event) {
      console.log('Success creating/accessing IndexedDB database');
      db = request.result;

      db.onerror = function (event) {
        console.log('Error creating/accessing IndexedDB database');
      };

      // Interim solution for Google Chrome to create an objectStore. Will be deprecated
      if (db.setVersion) {
        if (db.version != dbVersion) {
          const setVersion = db.setVersion(dbVersion);
          setVersion.onsuccess = function () {
            createObjectStore(db);
            putdataFileInDb();
          };
        } else {
          putdataFileInDb();
        }
      } else {
        putdataFileInDb();
      }
    };

    // For future use. Currently only in latest Firefox versions
    request.onupgradeneeded = function (event) {
      createObjectStore(event.target.result);
    };
    // this.uploadFileHTML5(file, url, progress, complete, error, scope, asPut);
  },

  // original code
  // _uploadFileHTML5_asBinary: function _uploadFileHTML5_asBinary(file, _url, progress, complete, error, scope, asPut) {// eslint-disable-line
  //    let url = _url;
  //    const request = new XMLHttpRequest();
  //    const service = App.getService();
  //    window.BlobBuilder = window.BlobBuilder ||
  //        window.WebKitBlobBuilder ||
  //        window.MozBlobBuilder ||
  //        window.MSBlobBuilder;
  //    if (!url) {
  //        // assume Attachment SData url
  //        url = 'slxdata.ashx/slx/system/-/attachments/file'; // TODO: Remove this assumption from SDK
  //    }

  //    request.open((asPut) ? 'PUT' : 'POST', url);
  //    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  //    if (service) {
  //        request.setRequestHeader('Authorization', service.createBasicAuthToken());
  //        request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
  //        request.setRequestHeader('X-Authorization-Mode', 'no-challenge');

  //        if (App.isMingleEnabled()) {
  //            const accessToken = App.mingleAuthResults.access_token;
  //            request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  //            request.setRequestHeader('X-Authorization', `Bearer ${accessToken}`);
  //        }
  //    }

  //    const reader = new FileReader();
  //    reader.onload = lang.hitch(this, function readerOnLoad(evt) {
  //        const unknownErrorText = this.unknownErrorText;
  //        const blobReader = new FileReader(); // read the blob as an ArrayBuffer to work around this android issue: https://code.google.com/p/android/issues/detail?id=39882
  //        let bb;
  //        let usingBlobBuilder;
  //        let blobData;

  //        try {
  //            bb = new Blob(); // This will throw an exception if it is not supported (android)
  //            bb = [];
  //        } catch (e) {
  //            bb = new window.BlobBuilder();
  //            usingBlobBuilder = true;
  //        }

  //        const binary = evt.target.result;
  //        const boundary = `---------------------------${(new Date()).getTime()}`;
  //        const dashdash = '--';
  //        const crlf = '\r\n';

  //        this._append(bb, dashdash + boundary + crlf);
  //        this._append(bb, 'Content-Disposition: attachment; ');
  //        this._append(bb, 'name="file_"; ');
  //        this._append(bb, `filename*="${encodeURI(file.name)}" `);
  //        this._append(bb, crlf);
  //        this._append(bb, `Content-Type: ${file.type}`);
  //        this._append(bb, crlf + crlf);
  //        this._append(bb, binary);
  //        this._append(bb, crlf);
  //        this._append(bb, dashdash + boundary + dashdash + crlf);

  //        if (complete) {
  //            request.onreadystatechange = function onReadyStateChange() {
  //                if (request.readyState === 4) {
  //                    if (Math.floor(request.status / 100) !== 2) {
  //                        if (error) {
  //                            error.call(scope || this, unknownErrorText);
  //                            console.warn(unknownErrorText + ' ' + request.responseText);// eslint-disable-line
  //                        }
  //                    } else {
  //                        complete.call(scope || this, request);
  //                    }
  //                }
  //            };
  //        }

  //        if (progress) {
  //            request.upload.addEventListener('progress', function uploadProgress(e) {
  //                progress.call(scope || this, e);
  //            });
  //        }

  //        request.setRequestHeader('Content-Type', `multipart/attachment; boundary=${boundary}`);

  //        if (usingBlobBuilder) {
  //            blobData = bb.getBlob(file.type);
  //        } else {
  //            blobData = new Blob(bb);
  //        }

  //        // Read the blob back as an ArrayBuffer to work around this android issue:
  //        // https://code.google.com/p/android/issues/detail?id=39882
  //        blobReader.onload = function blobReaderOnLoad(e) {
  //            request.send(e.target.result);
  //        };

  //        blobReader.readAsArrayBuffer(blobData);
  //    });

  //    reader.readAsArrayBuffer(file);
  // },


    _uploadFileHTML5_asBinary: function _uploadFileHTML5_asBinary(file, _url, progress, complete, error, scope, asPut) {// eslint-disable-line
    const context = this;
    const service = App.getService();
    window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;

    const reader = new FileReader();
    reader.onload = lang.hitch(this, function readerOnLoad(evt) {
      const unknownErrorText = this.unknownErrorText;
      const blobReader = new FileReader(); // read the blob as an ArrayBuffer to work around this android issue: https://code.google.com/p/android/issues/detail?id=39882
      let bb;
      let usingBlobBuilder;
      let blobData;

      try {
        bb = new Blob(); // This will throw an exception if it is not supported (android)
        bb = [];
      } catch (e) {
        bb = new window.BlobBuilder();
        usingBlobBuilder = true;
      }

      const binary = evt.target.result;
      const boundary = `---------------------------${(new Date()).getTime()}`;
      const dashdash = '--';
      const crlf = '\r\n';

      this._append(bb, dashdash + boundary + crlf);
      this._append(bb, 'Content-Disposition: attachment; ');
      this._append(bb, 'name="file_"; ');
      this._append(bb, `filename*="${encodeURI(file.name)}" `);
      this._append(bb, crlf);
      this._append(bb, `Content-Type: ${file.type}`);
      this._append(bb, crlf + crlf);
      this._append(bb, binary);
      this._append(bb, crlf);
      this._append(bb, dashdash + boundary + dashdash + crlf);

      if (usingBlobBuilder) {
        blobData = bb.getBlob(file.type);
      } else {
        blobData = new Blob(bb);
      }

      // Read the blob back as an ArrayBuffer to work around this android issue:
      // https://code.google.com/p/android/issues/detail?id=39882
      blobReader.onload = function blobReaderOnLoad(e) {
        context.uploadFiletoIndexDB(e.target.result, file, complete, context, scope);
      };

      blobReader.readAsArrayBuffer(blobData);
    });

    reader.readAsArrayBuffer(file);
  },


  _append: function _append(arrayOrBlobBuilder, data) {
    if (arrayOrBlobBuilder && arrayOrBlobBuilder.constructor === Array) {
      arrayOrBlobBuilder.push(data);
    } else {
      arrayOrBlobBuilder.append(data);
    }
  },
  _onUnableToUploadError: function _onUnableToUploadError(_msg, onError) {
    let msg = _msg;
    if (!msg) {
      msg = this.unableToUploadText;
    }
    if (onError) {
      onError([msg]);
    } else {
            console.warn([msg]); // eslint-disable-line
    }
  },
  /**
     * Formats the file size formatted in KB.
     * @param {Number} size
     * @returns {String}
     */
  formatFileSize: function formatFileSize(_size) {
    let size = _size;
    size = parseInt(size, 10);
    if (size === 0) {
      return '0 KB';
    }
    if (!size || size < 0) {
      return this.unknownSizeText;
    }
    if (size < 1024) {
      return '1 KB';
    }
    return `${dNumber.format(Math.round(size / 1024))} KB`;
  },
  /**
     * Loads a remote file.
     * @param {String} fileUrl
     * @param {String} responseType
     * @param {Function} onSuccess
     * @param {Object} onSuccess.responseInfo
     */
  getFile: function getFile(fileUrl, responseType, onSuccess) {
    const request = new XMLHttpRequest();
    const service = App.getService();
    request.open('GET', fileUrl, true);

    if (responseType) {
      request.responseType = responseType;
    }
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (service) {
      request.setRequestHeader('Authorization', service.createBasicAuthToken());
      request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
      request.setRequestHeader('X-Authorization-Mode', 'no-challenge');

      if (App.isMingleEnabled()) {
        const accessToken = App.mingleAuthResults.access_token;
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('X-Authorization', `Bearer ${accessToken}`);
      }
    }

    request.addEventListener('load', function load() {
      const contentType = this.getResponseHeader('Content-Type');
      const contentInfo = this.getResponseHeader('Content-Disposition');
      const fileName = contentInfo.split('=')[1];
      const responseInfo = {
        request: this,
        responseType,
        response: this.response,
        contentType,
        fileName,
      };
      if (onSuccess) {
        onSuccess(responseInfo);
      }
    }, false);
    request.send(null);
  },
});

export default __class;
