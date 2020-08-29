<template>
<div>
    <bread-crumb :breadcrumb="['商品管理','商品列表']"></bread-crumb>
    <el-card>
        <el-row>
            <el-col :span="18">
                <el-input placeholder="请输入内容" v-model="getgoodsinfo.query" clearable @clear="togetgoods">
                    <el-button slot="append" icon="el-icon-search" @click="togetgoods"></el-button>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" class="btn" @click="addpage">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="goodsList" style="width: 100%" stripe border>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格" width="70px">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="70px">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间" width="140px">
                <template slot-scope="scope">
                    {{scope.row.add_time | date}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary">
                        <i class="el-icon-edit"></i>编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="todelgoods(scope.row.goods_id)">
                        <i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="getgoodsinfo.pagenum" :page-sizes="[10, 50, 100, 100,300]" :page-size="getgoodsinfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="getgoodsinfo.total" background>
        </el-pagination>
    </el-card>
</div>
</template>

<script>
import BreadCrumb from 'components/common/BreadCrumb'
import {
    getgoods,
    delgoods
} from 'network/goods';
export default {
    name: 'goods',
    data() {
        return {
            getgoodsinfo: {
                query: '',
                pagenum: 1,
                pagesize: 10,
                total: 0,
            },

            goodsList: []

        }
    },
    components: {
        BreadCrumb
    },
    methods: {
        togetgoods() {
            getgoods(this.getgoodsinfo.query, this.getgoodsinfo.pagenum, this.getgoodsinfo.pagesize).then(res => {
                if (res.meta.status === 200) {
                    this.goodsList = res.data.goods
                    this.getgoodsinfo.total = res.data.total
                } else this.$message.error(res.meta.msg)
            })
        },
        handleSizeChange(newpagesize) {
            this.getgoodsinfo.pagesize = newpagesize
            this.togetgoods()
        },
        handleCurrentChange(newpage) {
            this.getgoodsinfo.pagenum = newpage
            this.togetgoods()
        },
        todelgoods(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delgoods(id).then(res => {
                    if (res.meta.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.togetgoods()
                    } else this.$message.error("删除失败")
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addpage() {
            this.$router.push('/goods/addpage')
        }
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
    created() {
        this.togetgoods()
    },
}
</script>

<style lang="less" scoped>
.btn {
    margin: 0 50px;
}
</style>
