(function() {
    // 从外部JSON文件读取数据
    $.getJSON('src/scripts/tok.json', function(data) {
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
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    });
})();