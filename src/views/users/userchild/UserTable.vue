<template>
<div>
  <el-table
      :data="userList"
      style="width: 100%"
      border stripe>
       <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
       <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
       <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
        <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
         <el-table-column
        prop="mg_state"
        label="状态">
        <template slot-scope="scope"> 
       <el-switch v-model="scope.row.mg_state" @change="statechange(scope.row)">
       </el-switch>
        </template>
      </el-table-column>
         <el-table-column
        label="操作" width="180px">
        <template slot-scope="scope"> 
          <el-tooltip  effect="dark" content="编辑用户" placement="top" :enterable="false">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edituser(scope.row.id)"></el-button>
    </el-tooltip>
      <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
        <el-button type="danger" icon="el-icon-delete"  size="mini" @click="deluser(scope.row.id)"></el-button>
    </el-tooltip>
       <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
          <el-button type="warning" icon="el-icon-setting"  size="mini"></el-button>
    </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑用户" :visible.sync="editVisible" width="50%" @close='editclose'>
      <el-form :model="editFrom" :rules="rules" ref="edit" label-width="100px">
       <el-form-item label="用户名" prop="email">
          <el-input v-model="editFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituserList">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import {putuser,edituser,getuser,deluser} from 'network/user';
export default {
  name: 'UserTable',
  data() {
      var checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        }

        cb(new Error('请输入合法的邮箱'))
      }
      var checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

        if (regMobile.test(value)) {
          return cb()
        }

        cb(new Error('请输入合法的手机号'))
      }
    return {
      editVisible : false,
      editFrom:{},
       rules: {
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              trigger: 'blur'
            }
          ],
          mobile: [{
              required: true,
              message: '请输入电话号码',
              trigger: 'blur'
            },
            {
              validator: checkMobile,
              trigger: 'blur'
            }
          ],
        },
        addList: {
          username: '',
          password: '',
          email: '',
          number: ''
        }
    }
  },
  props:{
      userList:{
          type:Array,
          default(){
              return []
          }
      }
  },
  methods: {
       statechange(userstate){
       putuser( userstate.id,userstate.mg_state).then(res=>{
       if(res.meta.status===200) {
       this.$message.success("修改成功") ;
        this.$router.go(0);
       } else {this.$message.error("修改失败"); userstate.mg_state=!userstate.mg_state;}
       })
       },
        edituser(id){
            getuser(id).then(
            res => {
            if(res.meta.status===200){
            this.editFrom = res.data
            }else {this.$message.error("获取用户信息失败")}
            })
            this.editVisible = true
            },
       edituserList(){
       this.$refs.edit.validate(valid=>{
       if(valid){
       edituser(this.editFrom.id,this.editFrom.email,this.editFrom.mobile).then(res=>{
       if(res.meta.status===200){
       this.$message.success("修改用户成功") ;
       this.editVisible = false
       this.$router.go(0);
       } else this.$message.error("修改用户失败")
       })
       }
       })
       },
       editclose(id){
         this.$refs.edit.resetFields()
       },
      deluser(id){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deluser(id).then(res=>{
            if(res.meta.status===200){
            this.$message({
            type: 'success',
            message: '删除成功!' 
             })
            this.$router.go(0);
            }else this.$message.error("删除失败")
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
       },
  
}
</script>

<style lang="less" scoped>
</style>