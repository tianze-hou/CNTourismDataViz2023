(function() {

    var myChart = echarts.init(document.getElementById('cheap_sub'), null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var option;

myChart.showLoading();
$.getJSON('../src/scripts/new_data.json', function (graph) {
    myChart.hideLoading();
    graph.nodes.forEach(function (node) {
        node.label = {
            show: node.symbolSize > 0
        };
    });
    option = {
        title: {
            top: 'top',
            left: 'right',
            textStyle: {
                color: '#ffffff' // 设置全局默认文字颜色为白色
            },
        },
        tooltip: {
            formatter: function (graph) {
                if (graph.dataType === 'node') {
                    return graph.data.name;
                } else if (graph.dataType === 'edge') {
                    return graph.data.source + ' -> ' + graph.data.target;
                }
            }
        },
        legend: [
            {
                data: graph.categories.map(function (a) {
                    return a.name;
                }),
                textStyle: {
                    color: '#ffffff' // 设置全局默认文字颜色为白色
                },
            }

        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                legendHoverLink: false,
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories.map(function (category) {
                    var colorMap = {
                        "东北地区": "#5b8ff9",
                        "华北地区": "#5ad8a6",
                        "华中地区": "#f6bd16",
                        "华东地区": "#e86452",
                        "华南地区": "#6dc8ec",
                        "西北地区": "#ff9845",
                        "西南地区": "#1e9493"
                    };
                    return {
                        name: category.name,
                        itemStyle: {
                            color: colorMap[category.name] || '#999999' // 默认颜色为黑色
                        }
                    };
                }),
                draggable: true,
                label: {
                    fontSize: '8',
                    position: 'right',
                    show: function () {
                        // 根据节点的大小动态决定是否显示标签
                        return this.symbolSize > 12;
                    },
                    formatter: '{b}' // 标签显示节点名称
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 15],
                lineStyle: {
                    color: 'source',
                    curveness: 0.35
                },
                emphasis: {
                    focus: 'adjacency',
                    label: {
                        show: true, // 强调时显示标签
                        position: 'right', // 标签位置
                        formatter: '{b}' // 标签内容
                    },
                    lineStyle: {
                        width: 20
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    window.onresize = function() {
        myChart.resize();
    };
});

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);


var sharedVariable = 'Value from module6';
// ...
})();