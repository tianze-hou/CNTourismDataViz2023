(function() {

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
$.getJSON('src/scripts/province_date.json', function(data) {
    var provinces = Object.keys(data[0]).slice(1); // 获取省份名称，假设时间是第一个键

    // 准备时间和各省数据
    var dates = data.map(item => item["时间"]);
    var seriesData = provinces.map(province => ({
        name: province,
        type: 'line',
        data: data.map(item => item[province]),
        itemStyle: {
            color: colorMapping[province]
        }
    }));

    // 初始化ECharts实例
    var myChart = echarts.init(document.getElementById('province_date'));

    // 指定图表的配置项和数据
    var option = {
        textStyle: {
            color: '#ffffff' // 设置全局默认文字颜色为白色
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                // params 是一个对象数组，每个对象代表一个系列的数据信息
                // 假设日期位于第一个系列的axisValue中
                var date = params[0].axisValue;
                // 自定义格式化内容，这里只返回日期
                return date;
            }
        },
        legend: {
            orient: 'horizontal',  // 设置图例为垂直排列
            left: '7%',          // 设置图例的left属性，与第一个grid的left属性一致
            top: 'top',          // 可以设置图例的top属性，根据需要调整
            data: provinces,       // 图例的数据
            textStyle: {
                color: '#ffffff' // 设置全局默认文字颜色为白色
            },
        },
        grid: [{
            left: '7%',
            right: '53%'
        }, {
            left: '53%',
            right: '7%'
        }],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: dates,
                gridIndex: 0
            },
            {
                type: 'value', // 修改为值轴，因为条形图将竖直显示
                gridIndex: 1
            }
        ],
        yAxis: [
            {type: 'value', gridIndex: 0},
            {type: 'category', // 修改为类别轴，因为省份名称将作为y轴
                data: provinces,
                gridIndex: 1
            }
        ],
        series: seriesData.concat([
            {
                name: '条形图',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: new Array(provinces.length).fill(0), // 初始化为0
                markLine: {
                    symbol: 'none',
                    label: {
                        normal: {
                            show: true,
                            position: 'end',
                            formatter: '{c}'
                        }
                    }
                }
            }
        ])
    };

    // 为每个series项添加emphasis配置来实现悬停高亮并显示省份名称
    seriesData.forEach(function (series, index) {
        series.emphasis = {
            focus: 'series',
            label: {
                show: true,
                position: 'top',
                formatter: function (params) {
                    // params.dataIndex 表示当前的数据点索引
                    // params.name 是系列的名称，即省份名称
                    // params.value 是当前数据点的值
                    // 这里我们自定义返回的内容，包括省份名称和对应的值
                    return `${series.name}: ${params.value}`;
                }
            }
        }
    });

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 在折线图上添加鼠标事件来更新条形图
    myChart.getZr().on('mousemove', function(event) {
        var pointInPixel = [event.offsetX, event.offsetY];
        if (myChart.containPixel('grid', pointInPixel)) {
            var pointInGrid = myChart.convertFromPixel({seriesIndex: 0}, pointInPixel);
            var xIndex = Math.round(pointInGrid[0]); // 选择日期数据
            var selectedDateData = data[xIndex]; // 获取选中日期的数据

            // 获取条形图的数据并排序
            var barData = provinces.map(province => ({
                name: province,
                value: selectedDateData[province],
                // 在这里添加itemStyle属性来设置颜色
                itemStyle: {
                    color: colorMapping[province]
                }
            }));

            // 按值对数据进行降序排序
            barData.sort((a, b) => b.value - a.value); // 修正为降序排序

            // 更新条形图的series数据以及y轴的类别数据并加入动画效果
            myChart.setOption({
                yAxis: [
                    {}, // 保持第一个 yAxis 不变
                    {
                        type: 'category',
                        data: barData.map(item => item.name), // 更新第二个 yAxis 的类别数据为排序后的省份名称
                        animationDurationUpdate: 1000, // 设置动画持续时间为1000ms
                        animationEasingUpdate: 'cubicOut' // 设置动画的缓动效果
                    }
                ],
                series: [
                    {}, // 保持第一个 series 不变
                    {
                        name: '条形图',
                        data: barData,
                        animationDurationUpdate: 250, // 设置动画持续时间为250ms
                        animationEasingUpdate: 'cubicOut', // 设置动画的缓动效果
                        // 注意：不需要显式设置itemStyle，因为它已经包含在barData中的每个数据项里了
                    }
                ]
            });
        }
    });

    // 使图表响应式
    window.addEventListener('resize', function() {
        myChart.resize();
    });
});
// 使图表响应式
window.onresize = function() {
    myChart.resize();
};

    var sharedVariable = 'Value from module2';
    // ...
})();