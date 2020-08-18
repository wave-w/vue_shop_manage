<template>
  <div class="login_content">
  <div class="login_box">
  <div class="login_img">
  <img src="~assets/logo.png" alt="">
  </div>
  <el-form ref="loginfromref" :model="loginfrom" :rules="loginrules" class="login_form">
  <el-form-item prop="username">
    <el-input v-model="loginfrom.username" prefix-icon="iconfont  icon-user"></el-input>
  </el-form-item>
   <el-form-item prop="password">
    <el-input v-model="loginfrom.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
  </el-form-item>
 <el-form-item class="btns">
  <el-button type="primary" @click="loginset">登录</el-button>
  <el-button type="info" @click="reset">重置</el-button>
   </el-form-item>
   </el-form>
  </div>
  </div>
</template>

<script>
import { Login } from 'network/login';
export default {
  name: 'login',
  data() {
      return {
          loginfrom : {
              username : 'admin',
              password : '123456'
          },
          loginrules : {
              //验证用户名是否合法
            username:  [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
             //验证密码是否合法
              password: [ 
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  {min: 5, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' } ]
          }
      }
  },
  methods: {
      reset(){
          this.$refs.loginfromref.resetFields()
      },
       loginset(){
      this.$refs.loginfromref.validate(validate=>{
         if(!validate) return;
        Login(this.loginfrom.username,this.loginfrom.password).then(res=>{
            console.log(res)
           if(res.meta.status===200) {
                this.$message.success('登录成功') ;
             window.sessionStorage.setItem('token',res.data.token);
             this.$router.push('./home')
           } else  this.$message.error('登录失败');
           
          
         
        })

      })
  }
  },
 
}
</script>
<style lang="less" scoped>
.login_content{
    background-color: #2b4b6b;
    height: 100%;
    position: relative;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .login_img{
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
     position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
}
.login_form{
    position: absolute;
   bottom: 0;
   width: 100%;
   padding: 20px;
   box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}

</style>