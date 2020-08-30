<template>
<div>
    <bread-crumb :breadcrumb="['订单管理','订单列表']"></bread-crumb>
    <el-card>
        <el-row>
            <el-col :span="18">
                <el-input placeholder="请输入内容" v-model="getordersinfo.query" clearable @clear="togetorderList">
                    <el-button slot="append" icon="el-icon-search" @click="togetorderList"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="ordersList" stripe border>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column prop="order_number" label="订单编号">
            </el-table-column>
            <el-table-column prop="order_price" label="订单价格">
            </el-table-column>
            <el-table-column prop="pay_status" label="是否付款">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.pay_status!=1">未付款</el-tag>
                    <el-tag type="success" v-else>已付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货">
            </el-table-column>
            <el-table-column prop="create_time" label="下单时间">
                <template slot-scope="scope">
                    {{scope.row.create_time | date}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" width="180px">
                    <el-button size="mini" type="primary" @click="showbox">
                        <i class=" el-icon-edit"></i>
                    </el-button>
                    <el-tooltip effect="dark" content="物流信息" placement="top-start" :enterable="false">
                        <el-button size="mini" type="success" @click="showaddressbox">
                            <i class="el-icon-location"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="getordersinfo.pagenum" :page-sizes="[2,4,6,8,10,15,20,30]" :page-size="getordersinfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="getordersinfo.total">
        </el-pagination>
    </el-card>
    <el-dialog title="修改地址" :visible.sync="editordersVisible" @close="dialogclose">
        <el-form :model="editordersForm" :rules="rules" ref="editForm">
            <el-form-item label="省市区/县" prop="adress1">
                <el-cascader v-model="editordersForm.adress1" :options="citydata" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="adress2" label-width="80px">
                <el-input v-model="editordersForm.adress2"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="editordersVisible = false">取 消</el-button>
            <el-button type="primary" @click="editordersVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="物流信息" :visible.sync="showaddressVisible">
        <el-timeline>
            <el-timeline-item v-for="(activity, index) in addresmanage" :key="index" :timestamp="activity.time">
                {{activity.context}}
            </el-timeline-item>
        </el-timeline>
    </el-dialog>
</div>
</template>

<script>
import BreadCrumb from 'components/common/BreadCrumb'
import citydata from './childerorders/citydata'
import {
    getorders,
    getadressinfo
} from 'network/order';
export default {
    name: 'orders',
    data() {
        return {
            getordersinfo: {
                query: '',
                pagenum: 1,
                pagesize: 10,
                user_id: '',
                pay_status: '',
                is_send: '',
                order_fapiao_title: '',
                order_fapiao_company: '',
                order_fapiao_content: '',
                consignee_addr: '',
                total: 0
            },
            ordersList: [],
            editordersVisible: false,
            showaddressVisible: false,
            editordersForm: {
                adress1: [],
                adress2: ''
            },
            citydata,
            addresmanage: [],
            rules: {
                adress1: [{
                    required: true,
                    message: '请输入省市区/县',
                    trigger: 'blur'
                }, ],
                adress2: [{
                    required: true,
                    message: '请输入详细地址',
                    trigger: 'blur'
                }, ],
            }
        }
    },
    components: {
        BreadCrumb
    },
    methods: {
        togetorderList() {
            getorders(this.getordersinfo.query, this.getordersinfo.pagenum, this.getordersinfo.pagesize).then(res => {
                this.getordersinfo.total = res.data.total
                this.ordersList = res.data.goods
            })
        },
        handleSizeChange(newpagesize) {
            this.getordersinfo.pagesize = newpagesize
            this.togetorderList()
        },
        handleCurrentChange(newpage) {
            this.getordersinfo.pagenum = newpage
            this.togetorderList()
        },
        showbox() {
            this.editordersVisible = true
        },
        handleChange() {
            console.log(this.editordersForm.adress1)
        },
        dialogclose() {
            this.$refs.editForm.resetFields()
        },
        showaddressbox() {
            this.showaddressVisible = true
            getadressinfo("557021527719598").then(res => {
                if (res.meta.status === 200) {
                    this.$message.success("获取物流信息成功")
                    this.addresmanage = res.data
                } else this.$message.error("获取物流信息失败");
                console.log(res)
            })
        }
    },
    created() {
        this.togetorderList()
    },
    filters: {
        date(time) {
            let date = new Date(time) //把定义的时间赋值进来进行下面的转换
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }
    },
}
</script>

<style lang="less" scoped>
</style>
