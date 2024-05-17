(function() {

// 定义我们的数据
var data = [
    {
        "省份": "河南",
        "作品数": "11000",
        "粉丝数": "1589000"
    },
    {
        "省份": "山东",
        "作品数": "4550",
        "粉丝数": "1667000"
    },
    {
        "省份": "河北",
        "作品数": "3888",
        "粉丝数": "935000"
    },
    {
        "省份": "吉林",
        "作品数": "3521",
        "粉丝数": "488000"
    },
    {
        "省份": "黑龙江",
        "作品数": "3168",
        "粉丝数": "601000"
    },
    {
        "省份": "山西",
        "作品数": "3068",
        "粉丝数": "794000"
    },
    {
        "省份": "北京",
        "作品数": "3068",
        "粉丝数": "716000"
    },
    {
        "省份": "四川",
        "作品数": "2736",
        "粉丝数": "1028000"
    },
    {
        "省份": "甘肃",
        "作品数": "2686",
        "粉丝数": "577000"
    },
    {
        "省份": "云南",
        "作品数": "2214",
        "粉丝数": "303000"
    },
    {
        "省份": "江西",
        "作品数": "2009",
        "粉丝数": "574000"
    },
    {
        "省份": "西藏",
        "作品数": "1972",
        "粉丝数": "462000"
    },
    {
        "省份": "福建",
        "作品数": "1873",
        "粉丝数": "797000"
    },
    {
        "省份": "广西",
        "作品数": "1810",
        "粉丝数": "476000"
    },
    {
        "省份": "新疆",
        "作品数": "1510",
        "粉丝数": "490000"
    },
    {
        "省份": "陕西",
        "作品数": "1436",
        "粉丝数": "638000"
    },
    {
        "省份": "浙江",
        "作品数": "1342",
        "粉丝数": "228000"
    },
    {
        "省份": "内蒙古",
        "作品数": "1284",
        "粉丝数": "185000"
    },
    {
        "省份": "江苏",
        "作品数": "1104",
        "粉丝数": "623000"
    },
    {
        "省份": "湖北",
        "作品数": "1047",
        "粉丝数": "348000"
    },
    {
        "省份": "安徽",
        "作品数": "1028",
        "粉丝数": "312000"
    },
    {
        "省份": "天津",
        "作品数": "888",
        "粉丝数": "45000"
    },
    {
        "省份": "宁夏",
        "作品数": "771",
        "粉丝数": "408000"
    },
    {
        "省份": "重庆",
        "作品数": "736",
        "粉丝数": "307000"
    },
    {
        "省份": "湖南",
        "作品数": "652",
        "粉丝数": "130000"
    },
    {
        "省份": "上海",
        "作品数": "545",
        "粉丝数": "226000"
    },
    {
        "省份": "青海",
        "作品数": "514",
        "粉丝数": "34.20"
    },
    {
        "省份": "贵州",
        "作品数": "336",
        "粉丝数": "234000"
    },
    {
        "省份": "海南",
        "作品数": "303",
        "粉丝数": "986000"
    },
    {
        "省份": "广东",
        "作品数": "202",
        "粉丝数": "169000"
    },
    {
        "省份": "辽宁",
        "作品数": "75",
        "粉丝数": "19000"
    }
];

// 处理数据，分离出省份、作品数和粉丝数
var provinces = data.map(function(item) { return item.省份; });
var works = data.map(function(item) { return item.作品数; });
var fans = data.map(function(item) { return parseInt(item.粉丝数, 10) / 10000; }); // 将粉丝数转换为以万为单位

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('tok'));

// 指定图表的配置项和数据
var option = {
    textStyle: {
        color: '#ffffff' // 设置全局默认文字颜色为白色
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (params) {
            var result = params[0].name + '<br/>';
            params.forEach(function (item) {
                var value = item.value;
                var unit = item.seriesName === '作品数' ? '条' : '万人';
                result += item.marker + " " + item.seriesName + " : " + value + " " + unit + "<br/>";
            });
            return result;
        }
    },
    legend: {
        data: ['作品数', '粉丝数'],
        textStyle: {
            color: '#ffffff' // 设置全局默认文字颜色为白色
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: provinces
    },
    yAxis: [
        {
            type: 'value',
            name: '作品数',
            min: 0,
            position: 'left',
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '粉丝数',
            min: 0,
            position: 'right',
            axisLabel: {
                formatter: '{value} 万'
            }
        }
    ],
    series: [
        {
            name: '作品数',
            type: 'bar',
            data: works,
            itemStyle: {
                color: '#5470C6'
            }
        },
        {
            name: '粉丝数',
            type: 'bar',
            yAxisIndex: 1,
            data: fans,
            itemStyle: {
                color: '#EE6666'
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
// 使图表响应式
window.onresize = function() {
    myChart.resize();
};

    var sharedVariable = 'Value from module4';
    // ...
})();