/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Charts.GenericPie
 *
 * @extends Sage.Platform.Mobile.View
 * @mixins Mobile.SalesLogix.Views.Charts._ChartMixin
 *
 * @requires Sage.Platform.Mobile.View
 *
 */
define('Mobile/SalesLogix/Views/Charts/GenericPie', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/Pie',
    'dojox/charting/axis2d/Default',
    'dojox/charting/widget/Legend',
    'Sage/Platform/Mobile/View',
    './_ChartMixin'
], function(
    declare,
    lang,
    array,
    domGeo,
    Chart,
    PlotType,
    Default,
    Legend,
    View,
    _ChartMixin
) {
    return declare('Mobile.SalesLogix.Views.Charts.GenericPie', [View, _ChartMixin], {
        id: 'chart_generic_pie',
        titleText: '',
        otherText: 'Other',
        expose: false,
        chart: null,
        MAX_ITEMS: 5,
        pieColor: '#007dbe',
        seriesColors: [
            '#007dbe',
            '#409ece'
        ],
        otherColor: '#bfdeef',

        formatter: function(val) {
            return val;
        },

        attributeMap: {
            chartContent: {node: 'contentNode', type: 'innerHTML'}
        },

        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}">',
                '<div class="chart-hash" data-dojo-attach-point="searchExpressionNode"></div>',
                '<div class="chart-content" data-dojo-attach-point="contentNode"></div>',
            '</div>'
        ]),
        createChart: function (feedData) {
            this.inherited(arguments);

            var labels, box, searchExpressionHeight;

            if (this.chart) {
                this.chart.destroy(true);
            }

            this.showSearchExpression();
            searchExpressionHeight = this.getSearchExpressionHeight();

            labels = this._labels(feedData);
            box = domGeo.getMarginBox(this.domNode);
            box.h = box.h - searchExpressionHeight;

            this.chart = new Chart(this.contentNode);
            this.chart.addPlot('default', {
                type: PlotType,
                fontColor: 'black',
                labelOffset: 50,
                radius: box.w >= box.h /* check lanscape or portrait mode */ ?
                    Math.floor(box.h / 2) - 10 :
                    Math.floor(box.w / 2) - 10
            });

            this.chart.addSeries('default', labels, {stroke :{color: this.pieColor}, fill: this.pieColor});
            this.chart.render();
            this.chart.resize(box.w, box.h);
        },
        _labels: function(feedData) {
            var data = [], otherY = 0, otherText;
            array.forEach(feedData, function(item, index) {
                if (index < this.MAX_ITEMS) {
                    data.push({
                        y: item.value,
                        text: item.$descriptor + ' (' + this.formatter(item.value) + ')',
                        value: index,
                        color: this.seriesColors[index % 2]
                    });
                } else {
                    otherY = otherY + item.value;
                    otherText = this.otherText + ' (' + this.formatter(otherY) + ')';
                    data[this.MAX_ITEMS] = {
                        y: otherY,
                        text: otherText,
                        color: this.otherColor
                    };
                }
            }, this);

            return data;
        }
    });
});
