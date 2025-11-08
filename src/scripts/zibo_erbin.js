(function() {
    // 从外部JSON文件读取数据
    $.getJSON('src/scripts/zibo_erbin.json', function(data) {
        // 数据处理
        let ziBoData = data.filter(item => item.词语 === '淄博').sort((a, b) => new Date(a.日期) - new Date(b.日期));
        let erBinData = data.filter(item => item.词语 === '尔滨').sort((a, b) => new Date(a.日期) - new Date(b.日期));

        let ziBoDates = ziBoData.map(item => item.日期);
        let erBinDates = erBinData.map(item => item.日期);

        let allDates = [...new Set([...ziBoDates, ...erBinDates])].sort((a, b) => new Date(a) - new Date(b));

        let ziBoCounts = allDates.map(date => {
            let item = ziBoData.find(item => item.日期 === date);
            return item ? parseInt(item.出现次数) : 0;
        });

        let erBinCounts = allDates.map(date => {
            let item = erBinData.find(item => item.日期 === date);
            return item ? parseInt(item.出现次数) : 0;
        });

        var myChart = echarts.init(document.getElementById('zibo_erbin'));

        var option = {
            textStyle: {
                color: '#ffffff' // 设置全局默认文字颜色为白色
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: allDates
            },
            yAxis: [
                {
                    type: 'value',
                    name: '淄博',
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: 'blue'
                        }
                    }
                },
                {
                    type: 'value',
                    name: '尔滨',
                    position: 'right',
                    axisLine: {
                        lineStyle: {
                            color: 'orange'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '淄博',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 0,
                    data: ziBoCounts,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: 'lightblue'},
                                    {offset: 1, color: 'blue'}
                                ]
                            )
                        }
                    }
                },
                {
                    name: '尔滨',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    data: erBinCounts,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: 'orange'},
                                    {offset: 1, color: 'darkorange'}
                                ]
                            )
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);
        
        // 使图表响应式
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    });
})();