/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Charts.GenericPie
 *
 * @extends Sage.Platform.Mobile._ListBase
 * @mixins Mobile.SalesLogix.Views.Charts._ChartMixin
 *
 * @requires Sage.Platform.Mobile._ListBase
 *
 */
define('Mobile/SalesLogix/Views/Charts/GenericPie', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'Sage/Platform/Mobile/_ListBase',
    './_ChartMixin'
], function(
    declare,
    lang,
    array,
    domGeo,
    _ListBase,
    _ChartMixin
) {

    return declare('Mobile.SalesLogix.Views.Charts.GenericPie', [_ListBase, _ChartMixin], {
        id: 'chart_generic_pie',
        titleText: '',
        expose: false,
        chart: null,

        seriesColors: [
            '#1c9a18',
            '#6ec90d',
            '#bff485',
            '#bce8fc',
            '#47b2f0',
            '#0c7ad8'
        ],

        chartOptions: {
            segmentShowStroke: false,
            segmentStrokeColor: '#EBEBEB',
            segmentStrokeWidth: 5,
            animateScale: false,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        },

        formatter: function(val) {
            return val;
        },

        createChart: function(rawData) {
            this.inherited(arguments);

            var ctx, box, data;

            this.showSearchExpression();

            data = array.map(rawData, function(item, idx) {
                return {
                    value: Math.round(item.value),
                    color: this._getItemColor(idx),
                    highlight: '',
                    label: item.name

                };
            }.bind(this));

            if (this.chart) {
                this.chart.destroy();
            }

            box = domGeo.getMarginBox(this.domNode);
            this.contentNode.width = box.w;
            this.contentNode.height = box.h;

            ctx = this.contentNode.getContext('2d');

            this.chart = new window.Chart(ctx).Doughnut(data, this.chartOptions);
            this.showLegend();
        },
        _getItemColor: function(index) {
            var len, n;
            len = this.seriesColors.length;
            n = Math.floor(index / len);

            // if n is 0, the index will fall within the seriesColor array,
            // otherwise we will need to re-scale the index to fall within that array.
            if (n > 0) {
                index = index - (len * n);
            }

            return this.seriesColors[index];
        }
    });
});
