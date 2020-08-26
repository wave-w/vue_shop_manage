<template>
<div>
    <bread-crumb :breadcrumb="['商品管理','参数列表']"></bread-crumb>
    <el-card>
        <el-alert show-icon title="注意:只允许为第三级分类设置相关参数！" type="warning" :closable="false"> </el-alert>
        <el-row class="cascaderrow">
            <el-col>
                <span>选择商品分类：</span>
                <el-cascader v-model="value" :options="cateList" :props="catekey" @change="handleChange" :show-all-levels="false">
                </el-cascader>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="many">
                <el-button type="primary" :disabled='isshow' @click="toaddparams">添加参数</el-button>
                <el-table :data='paramsList' stripe border>
                    <el-table-column type='expand'>
                        <template slot-scope="scope">
                            <el-row>
                                <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" closable class="paramtag" @close="deltags(scope.row,index)">
                                    {{item}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="blurhandleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column type='index' label="#"></el-table-column>
                    <el-table-column prop="attr_name" label="参数名称" width="180"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="editparams(scope.row)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button size="mini" type="danger" @click="todelparams(scope.row.cat_id,scope.row.attr_id)">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                <el-button type="primary" :disabled='isshow' @click="toaddparams">添加参数</el-button>
                <el-table :data='paramsList' stripe border>
                    <el-table-column type='expand'>
                        <template slot-scope="scope">
                            <el-row>
                                <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" closable class="paramtag" @close="deltags(scope.row,index)">
                                    {{item}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="blurhandleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column type='index' label="#"></el-table-column>
                    <el-table-column prop="attr_name" label="属性名称" width="180"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="editparams(scope.row)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button size="mini" type="danger" @click="todelparams(scope.row.cat_id,scope.row.attr_id)">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>
    <el-dialog :title="addtitle" :visible.sync="addparamsListVisible" @close="addparamsclose">
        <el-form :model="addparamsList" :rules="rules" ref="addparamsForm" label-width="100px">
            <el-form-item :label="addlabel" prop="attr_name">
                <el-input v-model="addparamsList.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="addparamsListVisible = false">取 消</el-button>
            <el-button type="primary" @click="addparamsListclick">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog :title="edittitle" :visible.sync="editparamsListVisible" @close="editparamsclose">
        <el-form :model="editparamsList" :rules="rules" ref="editparamsForm" label-width="100px">
            <el-form-item :label="editlabel" prop="attr_name">
                <el-input v-model="editparamsList.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="editparamsListVisible = false">取 消</el-button>
            <el-button type="primary" @click="editparamsclick">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import BreadCrumb from 'components/common/BreadCrumb'
import {
    getparams,
    gtecategories,
    addparams,
    delparams,
    editparams
} from 'network/goods';
export default {
    name: '',
    data() {
        return {
            cateList: [],
            value: [],
            paramsList: [],
            addtitle: '',
            addlabel: '',
            edittitle: '',
            editlabel: '',
            editparamsList: {},
            addparamsList: {
                attr_name: ''
            },
            catekey: {
                expandTrigger: 'hover',
                checkStrictly: false,
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            activeName: 'many',
            addparamsListVisible: false,
            editparamsListVisible: false,
            rules: {
                attr_name: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }],
            }
        }
    },
    components: {
        BreadCrumb
    },
    computed: {
        isshow() {
            if (this.value.length != 3) {
                return true
            } else return false
        }
    },
    methods: {
        togtecategories() {
            gtecategories().then(res => {
                this.cateList = res.data
            })
        },
        handleChange() {
            this.getparamsList()
        },
        handleClick() {
            this.getparamsList()
        },
        getparamsList() {
            if (this.value.length === 3) {
                getparams(this.value[2], this.activeName).then(res => {
                    if (res.meta.status === 200) {
                        res.data.forEach(item => {
                            item.attr_vals = item.attr_vals.split(' ');
                            item.inputValue = '',
                                item.inputVisible = false
                        })
                        this.paramsList = res.data
                    } else this.$message.error("获取失败")
                })
            } else {
                this.$message.error("请选择第三级分类");
                this.paramsList = []
            }
        },
        toaddparams() {
            this.addparamsListVisible = true
            if (this.activeName == "many") {
                this.addtitle = "添加动态参数"
                this.addlabel = "动态参数"
            } else if (this.activeName == "only") {
                this.addtitle = "添加静态属性"
                this.addlabel = "属性名称"
            }
        },
        addparamsListclick() {
            addparams(this.value[2],
                this.addparamsList.attr_name, this.activeName,
                this.inputValue).then(res => {
                if (res.meta.status === 201) {
                    this.getparamsList()
                    this.addparamsListVisible = false
                    this.$message.success("添加参数成功")
                } else this.$message.error("添加参数失败")
            })
        },
        addparamsclose() {
            this.$refs.addparamsForm.resetFields()
        },
        todelparams(cat_id, attr_id) {
            this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delparams(cat_id, attr_id).then(res => {
                    if (res.meta.status === 200) {
                        this.$message.success("删除成功")
                        this.getparamsList()
                    } else this.$message.error("删除失败")
                })
            }).catch(() => {
                this.$message.info('已取消删除')
            });
        },
        editparams(list) {
            this.editparamsListVisible = true
            if (this.activeName == "many") {
                this.edittitle = "编辑动态参数"
                this.editlabel = '动态参数'
            } else if (this.activeName == "only") {
                this.edittitle = "编辑静态属性"
                this.editlabel = '静态属性'
            }
            this.editparamsList = list
        },
        editparamsclose() {
            this.$refs.editparamsForm.resetFields()
        },
        editparamsclick() {
            editparams(
                this.editparamsList.cat_id,
                this.editparamsList.attr_id,
                this.editparamsList.attr_name,
                this.activeName).then(res => {
                if (res.meta.status === 200) {
                    this.$message.success("更新成功")
                    this.editparamsListVisible = false
                    this.getparamsList()
                } else this.$message.error("更新失败")
            })
        },
        showInput(row) {
            row.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm(row) {
            row.inputVisible = false
            row.attr_vals.push(row.inputValue)
            row.inputValue = ''
            this.sureparams(row)
        },
        sureparams(row) {
            editparams(
                row.cat_id,
                row.attr_id,
                row.attr_name,
                this.activeName,
                row.attr_vals.join(" ").trim()).then(res => {
                if (res.meta.status != 200) {
                    this.$message.error("添加标签失败")
                }
            })
        },
        blurhandleInputConfirm(row) {
            row.inputVisible = false
        },
        deltags(row, index) {
            this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row.attr_vals.splice(index)
                this.sureparams(row)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created() {
        this.togtecategories()
    },
}
</script>

<style lang="less" scoped>
.cascaderrow {
    margin: 20px 10px;
}

.paramtag {
    margin: 0 10px;
}

.input-new-tag {
    width: 120px;
}
</style>
