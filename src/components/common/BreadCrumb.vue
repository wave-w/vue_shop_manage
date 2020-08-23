<template>
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/home">{{breadcrumb[0]}}</a></el-breadcrumb-item>
  <el-breadcrumb-item>{{breadcrumb[1]}}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
 props :{
      breadcrumb:{
        type:Array,
        default(){
          return []
        }
      }
 }
}
</script>

<style lang="less" scoped>
</style>