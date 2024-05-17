(function() {

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('dot'));

var colorMapping = {
    "黑龙江": "#5b8ff9",
    "吉林": "#5b8ff9",
    "辽宁": "#5b8ff9",

    "北京": "#5ad8a6",
    "天津": "#5ad8a6",
    "河北": "#5ad8a6",
    "山西": "#5ad8a6",
    "内蒙古": "#5ad8a6",

    "河南": "#f6bd16",
    "湖南": "#f6bd16",
    "湖北": "#f6bd16",

    "山东": "#e86452",
    "江苏": "#e86452",
    "安徽": "#e86452",
    "上海": "#e86452",
    "浙江": "#e86452",
    "江西": "#e86452",
    "福建": "#e86452",
    "中国台湾": "#e86452",

    "广东": "#6dc8ec",
    "广西": "#6dc8ec",
    "海南": "#6dc8ec",
    "中国香港": "#6dc8ec",
    "中国澳门": "#6dc8ec",

    "陕西": "#ff9845",
    "甘肃": "#ff9845",
    "宁夏": "#ff9845",
    "青海": "#ff9845",
    "新疆": "#ff9845",

    "四川": "#1e9493",
    "贵州": "#1e9493",
    "云南": "#1e9493",
    "重庆": "#1e9493",
    "西藏": "#1e9493",
};

// 指定图表的配置项和数据
var option = {
    textStyle: {
        color: '#ffffff' // 设置全局默认文字颜色为白色
    },
    title: {
        subtext: '面积代表人均消费（人民币元）。数据截至2024年1月，部分省区数据未详。',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.data.name + '<br>接待人次: ' + params.data.value[1] + '亿<br>抖音获赞: ' + params.data.value[0] + '万次<br>人均消费: ' + params.data.value[2] + '元';
        }
    },
    xAxis: {
        type: 'value',
        name: '抖音获赞（万次）',
        nameLocation: 'middle',
        nameGap: 30
    },
    yAxis: {
        type: 'value',
        name: '接待人次（亿人次）',
        nameLocation: 'middle',
        nameGap: 50
    },
    legend: {
        data: ['人均消费标尺'],
        selected: {
            '人均消费标尺': true
        },
        icon: 'rect', // 使用方形图标
        itemWidth: 10, // 调整方形图标的宽度
        itemHeight: function (value, index) {
            // 根据人均消费值调整方形图标的高度
            var levels = [1000, 1500, 2000]; // 定义人均消费的级别
            var heights = [10, 20, 30]; // 对应级别的高度
            return heights[levels.indexOf(value)];
        }
    },
    series: [{
        type: 'scatter',
        symbol: 'rect',
        symbolSize: function (data) {
            // 根据人均消费调整方形的大小，使其有更明显的区分
            var size = ( data[2] - 550 ) / 1000 * 40; // 根据人均消费值调整大小
            return size;
        },
        data: [
            {"name": "贵州", "value": [196.9, 12.80, 1140]},
            {"name": "云南", "value": [508.5, 10.42, 1381]},
            {"name": "江苏", "value": [454.2, 9.42, 1274]},
            {"name": "河北", "value": [1059.9, 8.06, 1132]},
            {"name": "浙江", "value": [201, 7.60, 1303]},
            {"name": "河南", "value": [682.8, 9.95, 970]},
            {"name": "湖南", "value": [106.7, 6.60, 1449]},
            {"name": "广东", "value": [148, 7.77, 1223]},
            {"name": "山东", "value": [3966.5, 7.80, 1167]},
            {"name": "江西", "value": [499.4, 7.90, 1102]},
            {"name": "广西", "value": [1350.5, 8.20, 1047]},
            {"name": "安徽", "value": [275.4, 8.48, 1004]},
            {"name": "四川", "value": [2535.6, 6.80, 1095]},
            {"name": "湖北", "value": [248.4, 7, 1000]},
            {"name": "福建", "value": [626.3, 5.72, 1220]},
            {"name": "陕西", "value": [617.3, 6.87, 913]},
            {"name": "北京", "value": [270.6, 3.29, 1778]},
            {"name": "吉林", "value": [1489, 3.15, 1681]},
            {"name": "辽宁", "value": [12.1, 5.10, 985]},
            {"name": "新疆", "value": [194.5, 2.65, 1120]},
            {"name": "甘肃", "value": [10.7, 3.88, 709]},
            {"name": "黑龙江", "value": [613.5, 2.20, 1007]},
            {"name": "海南", "value": [184.2, 0.90, 2014]},
            {"name": "西藏", "value": [584.8, 0.55, 1181]},
            {"name": "宁夏", "value": [527, 0.70, 857]},
            {"name": "青海", "value": [211.3, 0.45, 962]}
        ].map(function (item) {
            // 根据省份名称获取颜色
            item.itemStyle = {
                color: colorMapping[item.name]
            };
            return item;
        }),
        label: {
            show: true,
            formatter: function (params) {
                return params.data.name;
            },
            position: 'top'
        }
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 使图表响应式
window.onresize = function() {
    myChart.resize();
};

    var sharedVariable = 'Value from module6';
// ...
})();