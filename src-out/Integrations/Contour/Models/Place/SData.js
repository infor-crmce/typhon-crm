define('crm/Integrations/Contour/Models/Place/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var __class = (0, _declare2.default)('crm.Integrations.Contour.Models.Place.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'place_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Name',
        queryWhere: '(ThisUserOnly eq "F" or (ThisUserOnly eq "T" and UserId eq "' + App.context.user.$key + '"))',
        querySelect: ['Name', 'ModifyDate', 'ThisUserOnly', 'Address/Address1', 'Address/Address2', 'Address/City', 'Address/State', 'Address/PostalCode', 'Address/Country', 'Address/CountryCode', 'Address/GeocodeProvider', 'Address/GeocodeLatitude', 'Address/GeocodeLongitude', 'Address/GeocodeFailed']
      }];
    }
  });

  _Manager2.default.register(_Names2.default.PLACE, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9Nb2RlbHMvUGxhY2UvU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlXaGVyZSIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInF1ZXJ5U2VsZWN0IiwicmVnaXN0ZXIiLCJQTEFDRSIsIlNEQVRBIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsVUFBVSx1QkFBUSw2Q0FBUixFQUF1RCwwQ0FBdkQsRUFBZ0Y7QUFDOUZDLFFBQUksbUJBRDBGO0FBRTlGQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyxNQUZSO0FBR05DLHFGQUEyRUMsSUFBSUMsT0FBSixDQUFZQyxJQUFaLENBQWlCQyxJQUE1RixRQUhNO0FBSU5DLHFCQUFhLENBQ1gsTUFEVyxFQUVYLFlBRlcsRUFHWCxjQUhXLEVBSVgsa0JBSlcsRUFLWCxrQkFMVyxFQU1YLGNBTlcsRUFPWCxlQVBXLEVBUVgsb0JBUlcsRUFTWCxpQkFUVyxFQVVYLHFCQVZXLEVBV1gseUJBWFcsRUFZWCx5QkFaVyxFQWFYLDBCQWJXLEVBY1gsdUJBZFc7QUFKUCxPQUFELENBQVA7QUFxQkQ7QUF4QjZGLEdBQWhGLENBQWhCOztBQTJCQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsS0FBN0IsRUFBb0MsZ0JBQVlDLEtBQWhELEVBQXVEYixPQUF2RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5Db250b3VyLk1vZGVscy5QbGFjZS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdwbGFjZV9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnTmFtZScsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6IGAoVGhpc1VzZXJPbmx5IGVxIFwiRlwiIG9yIChUaGlzVXNlck9ubHkgZXEgXCJUXCIgYW5kIFVzZXJJZCBlcSBcIiR7QXBwLmNvbnRleHQudXNlci4ka2V5fVwiKSlgLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ1RoaXNVc2VyT25seScsXHJcbiAgICAgICAgJ0FkZHJlc3MvQWRkcmVzczEnLFxyXG4gICAgICAgICdBZGRyZXNzL0FkZHJlc3MyJyxcclxuICAgICAgICAnQWRkcmVzcy9DaXR5JyxcclxuICAgICAgICAnQWRkcmVzcy9TdGF0ZScsXHJcbiAgICAgICAgJ0FkZHJlc3MvUG9zdGFsQ29kZScsXHJcbiAgICAgICAgJ0FkZHJlc3MvQ291bnRyeScsXHJcbiAgICAgICAgJ0FkZHJlc3MvQ291bnRyeUNvZGUnLFxyXG4gICAgICAgICdBZGRyZXNzL0dlb2NvZGVQcm92aWRlcicsXHJcbiAgICAgICAgJ0FkZHJlc3MvR2VvY29kZUxhdGl0dWRlJyxcclxuICAgICAgICAnQWRkcmVzcy9HZW9jb2RlTG9uZ2l0dWRlJyxcclxuICAgICAgICAnQWRkcmVzcy9HZW9jb2RlRmFpbGVkJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5QTEFDRSwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=