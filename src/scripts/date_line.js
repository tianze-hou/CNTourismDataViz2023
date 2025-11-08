(function() {
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('date_line'));

    // 指定图表的配置项和数据
    var option = {
        textStyle: {
            color: '#ffffff' // 设置全局默认文字颜色为白色
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [],
            type: 'line'
        }]
    };

    // 从外部JSON文件读取数据
    $.getJSON('src/scripts/date_line.json', function(jsonData) {
        // 处理数据
        jsonData.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        }).forEach(function(item) {
            option.xAxis.data.push(item.date);
            option.series[0].data.push(item.count);
        });
        
        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    });

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 使图表响应式
    window.onresize = function() {
        myChart.resize();
    };

    var sharedVariable = 'Value from module1';
    // ...
})();
