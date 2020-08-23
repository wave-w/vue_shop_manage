<template>
  <div>
 <bread-crumb :breadcrumb="['用户管理','用户列表']"/>
<el-card>
  <el-row :gutter="30">
   <el-col :span="15">
    <el-input placeholder="请输入内容" v-model="query" clearable @clear="getuser">
    <el-button slot="append" icon="el-icon-search" @click="getuser"></el-button>
  </el-input>
   </el-col>
   <el-col :span="5"><el-button type="primary"  @click="dialogVisible = true">添加用户</el-button></el-col>
  </el-row>
<user-table :userList='userList'/>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1,2, 3, 4, 6,7]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="50%"
  @close='adddialogclose'>
  <el-form :model="addList" :rules="rules" ref="ruleForm" label-width="100px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addList.username"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="addList.password"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="addList.email"></el-input>
  </el-form-item>
   <el-form-item label="电话" prop="mobile">
    <el-input v-model="addList.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduserList">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { user , adduser,putuser } from 'network/user';
import BreadCrumb from 'components/common/BreadCrumb'
import UserTable from './userchild/UserTable'
export default {
  name: '',
  data() {
  var checkEmail = (rule,value,cb)=>{
 const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
      }
  var checkMobile = (rule,value,cb)=>{
 // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
      }
    return {    
      userList:[],
      total:0,
      query:'',
      pagenum:1,
      pagesize:2,
      dialogVisible : false,
       rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
         password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
             { validator: checkEmail, trigger: 'blur' }
          ],
           mobile: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' }
          ],
       },
       addList:{
        username:'',
        password:'',
        email:'',
        number : ''
       }
    }
  },
  components:{
BreadCrumb,
UserTable
  },
  methods: {
    getuser(){
      user(this.query,this.pagenum,this.pagesize).then(res=>{
        if(res.meta.status===200) {
             this.userList = res.data.users
             this.total =res.data.total
           } else  return this.$message.error(res.meta.msg);
      })
    },
     handleSizeChange(newsize) {
        this.pagesize = newsize
        this.getuser()
      },
      handleCurrentChange(newPage){
        this.pagenum = newPage  
        this.getuser()      
      },
      adduserList(){
        this.$refs.ruleForm.validate(valid=>{
          if(valid){
             adduser(this.addList.username,this.addList.password,this.addList.email,this.addList.mobile).then(res=>{
              if(res.meta.status===201){
                  this.$message.success("增加用户成功") ;
                  this.dialogVisible = false
                  this.$router.go(0);
                  
              }
          
        }) 
          }else this.$message.error("增加用户失败")
        })
     
      },
      adddialogclose(){
        this.$refs.ruleForm.resetFields()
      }
  },
  created() {
    this.getuser()
  },
}
</script>

<style lang="less" scoped>
</style>