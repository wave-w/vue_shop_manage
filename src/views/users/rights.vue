<template>
  <div> 
   <bread-crumb :breadcrumb="['权限管理','权限列表']"/>
<el-card>
<el-table  :data="rightList"
      style="width: 100%"
        border stripe>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
        <el-table-column
        prop="level"
        label="权限等级">
         <template slot-scope="scope"> 
      <el-tag v-show="scope.row.level==0">一级权限</el-tag>
      <el-tag type="success" v-show="scope.row.level==1">二级权限</el-tag>
      <el-tag type="warning" v-show="scope.row.level==2">三级权限</el-tag>
        </template>
      </el-table-column>
</el-table>
</el-card>
</div>
</template>

<script>
import { getrights } from 'network/power';
import BreadCrumb from 'components/common/BreadCrumb'
export default {
  name: 'rights',
  data() {
    return {
      rightList:[]
    }
  },
  components:{
    BreadCrumb
  },
  methods: {
    rgetright(){
      getrights("list").then(res=>{
       if(res.meta.status===200){
         this.rightList=res.data
         this.$message.success("获取权限列表成功")
       }else this.$message.error("获取权限列表失败")
      })
    }
  },
  created() {
    this.rgetright()
  },
}
</script>

<style lang="less" scoped>
</style>