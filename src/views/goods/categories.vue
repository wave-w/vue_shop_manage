<template>
<div>
    <bread-crumb :breadcrumb="['商品管理','商品分类']" />
    <el-card>
        <el-button type="primary" @click="addcart">添加分类</el-button>
        <tree-table :data="categoriesList" :columns="columns" :selection-type="false" :show-row-hover="false" border :expand-type="false" show-index index-text="#" class="tretable">
            <template v-slot:isuseful='scope'>
                <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
                <i class="el-icon-error" v-else></i>
            </template>
            <template v-slot:level='scope'>
                <el-tag v-show="scope.row.cat_level==0">一级</el-tag>
                <el-tag type="success" v-show="scope.row.cat_level==1">二级</el-tag>
                <el-tag type="warning" v-show="scope.row.cat_level==2">三级</el-tag>
            </template>
            <template v-slot:operate='scope'>
                <el-button size="mini" type="primary" @click="editcategories(scope.row.cat_id)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delcategories(scope.row.cat_id)">删除</el-button>
            </template>
        </tree-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryinfo.pagenum" :page-sizes="[3, 4, 5, 6,7,8]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
    <el-dialog title="添加分类" :visible.sync="addcartVisible" @close="closeaddform">
        <el-form :model="addcartForm" :rules="rules" ref="addcartref" label-width="100px">
            <el-form-item label="分类名称:" prop="cat_name">
                <el-input v-model="addcartForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类:">
                <el-cascader :options="parentcartList" :props="cascader" clearable @change="handleChange" v-model="value">
                </el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="addcartVisible = false">取 消</el-button>
            <el-button type="primary" @click="toaddcart">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="编辑分类" :visible.sync="editcateVisible">
        <el-form :model="editcateList" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="editcateList.cat_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editcateVisible = false">取 消</el-button>
            <el-button type="primary" @click="editcateclick">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import BreadCrumb from 'components/common/BreadCrumb'
import {
    gtecategories,
    addcategories,
    findcategoriesbyid,
    delcate,
    putcate
} from 'network/goods'
export default {
    name: 'categories',
    data() {
        return {
            categoriesList: [],
            parentcartList: [],
            queryinfo: {
                type: 3,
                pagenum: 1,
                pagesize: 6
            },
            total: 0,
            columns: [{
                    label: '分类名称',
                    prop: 'cat_name'
                },
                {
                    label: '是否有效',
                    type: 'template',
                    template: "isuseful"
                },
                {
                    label: '排序',
                    type: 'template',
                    template: "level"
                },
                {
                    label: '操作',
                    type: 'template',
                    template: "operate"
                },
            ],
            addcartVisible: false,
            addcartForm: {
                cat_name: '',
                cat_pid: 0,
                cat_level: 0
            },
            cascader: {
                expandTrigger: 'hover',
                checkStrictly: true,
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            value: [],
            rules: {
                cat_name: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }],
            },
            editcateVisible: false,
            editcateList: {}
        }
    },
    components: {
        BreadCrumb
    },
    methods: {
        togetcateList() {
            gtecategories(this.queryinfo.type, this.queryinfo.pagenum, this.queryinfo.pagesize).then(res => {
                if (res.meta.status != 200) {
                    this.$message.error("获取分类数据失败")
                } else {
                    this.categoriesList = res.data.result
                    this.total = res.data.total
                }
            })
        },
        handleSizeChange(newsize) {
            this.queryinfo.pagesize = newsize
            this.togetcateList()
        },
        handleCurrentChange(newpage) {
            this.queryinfo.pagenum = newpage
            this.togetcateList()
        },
        addcart() {
            this.addcartVisible = true
            this.getparentcartList()
        },
        toaddcart() {
            addcategories(this.addcartForm.cat_pid,
                this.addcartForm.cat_name, this.addcartForm.cat_level).then(res => {
                if (res.meta.status === 201) {
                    this.$message.success("添加分类成功")
                    this.addcartVisible = false
                    this.togetcateList()
                }
            })
        },
        getparentcartList() {
            gtecategories(2).then(res => {
                if (res.meta.status != 200) {
                    this.$message.error("获取父级分类失败")
                }
                this.parentcartList = res.data
            })
        },
        handleChange() {
            if (this.value.length > 0) {
                this.addcartForm.cat_pid = this.value[this.value.length - 1]
                this.addcartForm.cat_level = this.value.length
            } else {
                this.addcartForm.cat_pid = 0
                this.addcartForm.cat_level = 0
            }

        },
        delcategories(id) {
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delcate(id).then(res => {
                    if (res.meta.status === 200) {
                        this.$message.success("删除成功")
                        this.togetcateList()
                    }
                })
            }).catch(() => {
                this.$message.info("已取消删除")
            });
        },
        closeaddform() {
            this.$refs.addcartref.resetFields()
            this.addcartForm.cat_pid = 0
            this.addcartForm.cat_level = 0
            this.value = []
        },
        editcategories(id) {
            this.editcateVisible = true
            findcategoriesbyid(id).then(res => {
                if (res.meta.status === 200) {
                    this.editcateList = res.data
                } else {
                    this.$message.error("获取数据失败")
                }
            })
        },
        editcateclick() {
            putcate(this.editcateList.cat_id, this.editcateList.cat_name).then(res => {
                if (res.meta.status === 200) {
                    this.$message.success("更新分类名称成功")
                    this.editcateVisible = false
                    this.togetcateList()
                } else this.$message.error("更新分类失败")
            })
        }
    },
    created() {
        this.togetcateList()
    },
}
</script>

<style lang="less" scoped>
.tretable {
    margin-top: 20px;
    font-size: 12px;
}

.el-cascader {
    width: 100%;
}
</style>
