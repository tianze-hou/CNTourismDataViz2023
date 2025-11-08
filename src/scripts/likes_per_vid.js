(function() {

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('likes_per_vid'));

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

// 从外部JSON文件读取数据
$.getJSON('src/scripts/likes_per_vid.json', function(data) {
    // 指定图表的配置项和数据
    var option = {
        textStyle: {
            color: '#ffffff' // 设置全局默认文字颜色为白色
        },
        tooltip: {},
        xAxis: {
            data: data.map(item => item.省份),
            axisLabel: {
                interval: 0, // 强制显示所有标签
                rotate: 45 // 标签旋转45度
                // 可以根据需要调整旋转角度，以便标签不重叠且易于阅读
            }
        },
        yAxis: {},
        series: [{
            name: '获赞数',
            type: 'bar',
            data: data.map(item => ({
                value: item.平均每条获赞,
                itemStyle: {
                    color: colorMapping[item.省份] || '#c23531' // default color if not found in colorMapping
                }
            }))
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});

// 使图表响应式
window.onresize = function() {
    myChart.resize();
};

    var sharedVariable = 'Value from module5';
// ...
})();