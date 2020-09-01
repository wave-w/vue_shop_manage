<template>
<div>
    <bread-crumb :breadcrumb="['数据统计','数据报表']"></bread-crumb>
    <el-card>
        <div id="main" style="width: 800px;height:400px;"></div>
    </el-card>
</div>
</template>

<script>
import BreadCrumb from 'components/common/BreadCrumb'
import echarts from 'echarts'
import _ from 'lodash'
import {
    getreports
} from 'network/reports';
export default {
    name: '',
    data() {
        return {
            options: {
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#E9EEF3'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    boundaryGap: false
                }],
                yAxis: [{
                    type: 'value'
                }]
            }
        }
    },
    components: {
        BreadCrumb,
    },
    mounted() {
        this.togetreports()
    },
    methods: {
        togetreports() {
            var myChart = echarts.init(document.getElementById('main'));
            getreports().then(res => {
                if (res.meta.status === 200) {
                    const result = _.merge(res.data, this.options)
                    myChart.setOption(result);
                } else this.$message.error(res.meta.msg)
            })

        }
    },
}
</script>

<style lang="less" scoped>
</style>
