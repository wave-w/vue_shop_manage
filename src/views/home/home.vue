<template>
<el-container class="containe">
            <el-header>
            <div>
            <img src="~assets/heima.png" alt="">
            <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout" class="home_button">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="width"> 
                <div class="togbtn" @click="togbtn">
                |||
                </div>
                 <el-menu
                       background-color="#333744"
                       text-color="#fff"
                       active-text-color="#409eff"
                       unique-opened
                       :collapse="iscollapse"
                       :collapse-transition="false"
                       :router="true"
                       :default-active='activepath'>
                       <el-submenu :index="index + ''" v-for="(item,index) in muensList" :key="index">
                           <template slot="title">
                               <i :class="iconList[index]"></i>
                               <span>{{item.authName}}</span>
                           </template>
                               <el-menu-item :index="'/'+childitem.path + ''" v-for="(childitem,index) in item.children" :key="index"
                               @click="saveindex('/'+childitem.path + '')">
                                  <template slot="title">
                               <i class="el-icon-menu"></i>
                              <span>{{childitem.authName}}</span>
                                  </template>
                               </el-menu-item>
                       </el-submenu>
                       </el-menu>
                       </el-aside>
                               <el-main><router-view></router-view></el-main>
                       </el-container>
        </el-container>
</template>
<script>
import { muens } from 'network/home';
    export default {
        name: 'home',
        data() {
            return {
                muensList : [],
                iconList : ['iconfont icon-user','iconfont icon-tijikongjian','iconfont icon-shangpin','iconfont icon-danju','iconfont icon-baobiao'],
                iscollapse : false,
                width : "200px",
                activepath:''
            }
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('./login')
            },
            getmenu(){
                muens().then(res=>{
                    if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                    this.muensList = res.data
                })
            },
            togbtn(){
                this.iscollapse = !this.iscollapse
                if(this.iscollapse){
                    this.width = "64px"
                }else this.width = "200px"
            },
            saveindex(path){
                window.sessionStorage.setItem("activeItem",path)
                  this.activepath = path
            }
        },
        created() {
          this.getmenu()
           this.activepath = window.sessionStorage.getItem('activeItem')
        },
    }
</script>

<style lang="less" scoped>
.containe{
   height: 100%;
}
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
      display: flex;
      align-items: center;
      span{
          margin-left: 15px;
      }
  }
}
.el-aside {
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: #eaedfe;
}
.iconfont{
    margin-right: 10px;
}
.togbtn{
    background-color: #4a5064;
    color: #fff;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>