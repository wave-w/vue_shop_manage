<template>
<div>
    <bread-crumb :breadcrumb="['商品管理','添加商品']"></bread-crumb>
    <el-card>
        <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
        </el-alert>
        <el-steps :active="active - 0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-form :model="addpageList" :rules="rules" ref="addpageFormref" label-position='top'>
            <el-tabs tab-position="left" v-model="active" :before-leave="beforleave" @tab-click="tabclick">
                <el-tab-pane label="基本信息" name="0">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addpageList.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格(元)" prop="goods_price">
                        <el-input v-model="addpageList.goods_price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量(kg)" prop="goods_weight">
                        <el-input v-model="addpageList.goods_weight" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="addpageList.goods_number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader v-model="addpageList.goods_cat" :options="cateList" :props="addprops" @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <el-form-item :label="item.attr_name" v-for="item in addpageList.tagparamsList" :key="item.attr_id">
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="items" v-for="(items,index) in item.attr_vals" :key="index" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="2">
                    <el-form-item :label="item.attr_name" v-for="item in addpageList.tagparamsList1" :key="item.attr_id">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <el-upload :action="imgurl" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :headers="headersOBJ" :on-success="handleSuccessimg">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <quill-editor v-model="addpageList.goods_introduce"></quill-editor>
                    <el-button type="primary" @click="addpage" class="addpage">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="imgVisible" width="80%">
        <img :src="imgview" alt="" style="width:100%">
    </el-dialog>
</div>
</template>

<script>
import BreadCrumb from 'components/common/BreadCrumb'
import {
    gtecategories,
    getparams,
    loadimg
} from 'network/goods';
export default {
    name: '',
    data() {
        return {
            active: '0',
            cateList: [],
            addpageList: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
                goods_cat: '',
                goods_introduce: '',
                pics: [],
                attrs: [],
                goods_cat: [],
                tagparamsList: [],
                tagparamsList1: [],
            },
            addprops: {
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },

            rules: {
                goods_name: [{
                    required: true,
                    message: '请输入商品名称',
                    trigger: 'blur'
                }],
                goods_price: [{
                    required: true,
                    message: '请输入商品价格',
                    trigger: 'blur'

                }],
                goods_weight: [{
                    required: true,
                    message: '请输入商品重量',
                    trigger: 'blur'
                }],
                goods_number: [{
                    required: true,
                    message: '请输入商品数量',
                    trigger: 'blur'
                }],
                goods_cat: [{
                    required: true,
                    message: '请选择商品分类',
                    trigger: 'blur'
                }],
            },
            imgurl: 'http://127.0.0.1:8888/api/private/v1/upload',
            headersOBJ: {
                Authorization: window.sessionStorage.getItem('token')
            },
            imgVisible: false,
            imgview: ""
        }
    },
    components: {
        BreadCrumb
    },
    methods: {
        togtecategories() {
            gtecategories().then(res => {
                this.cateList = res.data
            })
        },
        togetparams() {
            getparams(this.addpageList.goods_cat[2], "many").then(res => {
                if (res.meta.status === 200) {
                    res.data.forEach(item => {
                        item.attr_vals = item.attr_vals.split(' ');
                    })
                    this.addpageList.tagparamsList = res.data
                }
            })
        },
        togetparams1() {
            getparams(this.addpageList.goods_cat[2], "only").then(res => {
                if (res.meta.status === 200) {
                    this.addpageList.tagparamsList1 = res.data
                }
            })
        },
        handleChange() {
            if (this.addpageList.goods_cat.length < 3) {
                this.addpageList.goods_cat = []
                this.$message.error("请选择第三级分类")
            }
        },
        beforleave(activename, oldactivename) {
            if (oldactivename == '0' && this.addpageList.goods_cat.length < 3) {
                this.$message.error("请先填完基本信息")
                return false
            }
        },
        tabclick() {
            if (this.active === '1') {
                this.togetparams()
            }
            if (this.active === '2') {
                this.togetparams1()
            }
        },
        handlePreview(file) {
            this.imgview = file.response.data.url
            this.imgVisible = true
        },
        handleRemove(file) {
            const imgpath = file.response.data.tmp_path
            const index = this.addpageList.pics.findIndex(x => x == imgpath)
            this.addpageList.pics.splice(index, 1)
        },
        handleSuccessimg(response) {
            const picinf = {
                pic: response.data.tmp_path
            }
            this.addpageList.pics.push(picinf)
        },
        addpage() {

        }
    },
    created() {
        this.togtecategories()
    },
}
</script>

<style lang="less" scoped>
.addpage {
    margin: 20px 0;
}
</style>
