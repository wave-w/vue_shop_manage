<template>
  <div> 
 <bread-crumb :breadcrumb="['权限管理','角色列表']"/>
<el-card>
 <el-button type="primary" @click="rolesFormVisible = true">添加角色</el-button>
<el-table  :data="rolesList"
      style="width: 100%"
        border stripe>
          <el-table-column type="expand">
          <template slot-scope="scope">
          <el-row v-for="(item,index) in scope.row.children" 
          :key="item.id" :class="{bottomborder:true,topborder:index==0,vcenter:true}">
          <el-col :span="6">
          <el-tag closable
        @close="todeltag(scope.row,item.id)">
        {{item.authName}}
          </el-tag><i class="el-icon-caret-right"></i> </el-col>

        <el-col :span="19" >
        <el-row  v-for="(citem,index) in item.children" :key="citem.id" 
        :class="{topborder:index!=0,vcenter:true}">
        <el-col :span="6">
        <el-tag type="success" closable
        @close="todeltag(scope.row,citem.id)">
        {{citem.authName}}
          </el-tag>
          <i class="el-icon-caret-right"></i>
           </el-col>  
           <el-col :span="18">
        <el-tag type="warning"  v-for="(ccitem,index) in citem.children" :key="ccitem.id" 
        :class="{topborder:index!=0}" closable
        @close="todeltag(scope.row,ccitem.id)">
        {{ccitem.authName}}
          </el-tag>
           </el-col>
        </el-row>
          </el-col>
          </el-row>
          </template>
          </el-table-column>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
        <el-table-column
        prop="level"
        label="操作"
        width="300px">
            <template slot-scope="scope"> 
          <el-tooltip  effect="dark" content="编辑用户" placement="top" :enterable="false">
          <el-button type="primary" icon="el-icon-edit" size="mini"
           @click="editroles(scope.row.id)">编辑</el-button>
    </el-tooltip>
      <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
        <el-button type="danger" icon="el-icon-delete"  size="mini" @click="todelroles(scope.row.id)">删除</el-button>
    </el-tooltip>
       <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
          <el-button type="warning" icon="el-icon-setting"  size="mini"
          @click="setright(scope.row)">分配角色</el-button>
    </el-tooltip>
        </template>
      </el-table-column>
</el-table>
</el-card>
<el-dialog title="编辑角色" :visible.sync="editrolesFormVisible" @close='editrolesdialogclose'>
  <el-form ref="editrolesForm" :model="editrolesList" >
    <el-form-item label="角色名称" label-width="100px" prop="roleName">
      <el-input autocomplete="off" v-model="editrolesList.roleName"></el-input>
    </el-form-item>
      <el-form-item label="角色描述" label-width="100px"  prop="roleDesc">
      <el-input autocomplete="off"  v-model="editrolesList.roleDesc"></el-input>
    </el-form-item>
  </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="editrolesFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addeditrolesList">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="添加角色" :visible.sync="rolesFormVisible" @close='rolesdialogclose'>
  <el-form ref="rolesForm" :model="addrolesList" >
    <el-form-item label="角色名称" label-width="100px" prop="roleName">
      <el-input autocomplete="off" v-model="addrolesList.roleName"></el-input>
    </el-form-item>
      <el-form-item label="角色描述" label-width="100px"  prop="roleDesc">
      <el-input autocomplete="off"  v-model="addrolesList.roleDesc"></el-input>
    </el-form-item>
  </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="rolesFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="toaddrolesList">确 定</el-button>
  </div>
</el-dialog>
<el-dialog
  title="分配权限"
  :visible.sync="setrightVisible"
  width="30%" @close="setrightclose">
  <el-tree :data="rightsList" :props="defaultProps"
    show-checkbox  node-key="id" default-expand-all 
    :default-checked-keys="defaultkey"
     ref="treeref">
  </el-tree>
    <el-button @click="setrightVisible = false">取 消</el-button>
    <el-button type="primary" @click="getputrights">确 定</el-button>
</el-dialog>
</div>
</template>
<script>
import
 { getroles,addroles ,geteditroles,
 puteditroles,delroles,deltag,getrights,putrights} 
 from 'network/power';
import BreadCrumb from 'components/common/BreadCrumb'
export default {
  name: 'rights',
  data() {
    return {
      rolesList:[],
      rightsList:[],
      rolesFormVisible:false,
      editrolesFormVisible:false,
      setrightVisible:false,
      addrolesList:{
        roleName:'',
        roleDesc:''
      },
      editrolesList:{},
       defaultProps: {
          children: 'children',
          label: 'authName'
        },
        defaultkey:[],
        roleId:''
    }
  },
  components:{
    BreadCrumb
  },
  methods: {
    rgetroles(){
      getroles().then(res=>{
       if(res.meta.status===200){
         this.rolesList=res.data
         this.$message.success("获取角色列表成功")
       }else this.$message.error("获取角色列表失败")
      })
    },
    rolesdialogclose(){
      this.$refs.rolesForm.resetFields()
    },
    editrolesdialogclose(){
      this.$refs.editrolesForm.resetFields()
    },
    toaddrolesList(){
      addroles(this.addrolesList.roleName,this.addrolesList.roleDesc).then(res=>{
       if(res.meta.status===201){
         this.$message.success("添加新角色成功");
         this.rolesFormVisible=false;
         this.$router.go(0)
       }else this.$message.error("创建新角色失败")
      })
    },
    editroles(id){
      this.editrolesFormVisible=true
      geteditroles(id).then(res=>{
        if(res.meta.status===200){
           this.editrolesList=res.data 
           this.$message.success("获取角色信息成功")
        }else this.$message.error("获取角色失败")
        })
    },
  addeditrolesList(){
    puteditroles(this.editrolesList.roleId,this.editrolesList.roleName,
    this.editrolesList.roleDesc).then(res=>{
        if(res.meta.status===200){
           this.$message.success("修改角色信息成功")
           this.editrolesFormVisible=false
           this.$router.go(0)
        }else this.$message.error("修改角色失败")
       
    })
  },
   todelroles(id){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delroles(id).then(res=>{
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
      },
      todeltag(role,rightid){
         this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deltag(role.id,rightid).then(res=>{
            if(res.meta.status===200){
            this.$message({
            type: 'success',
            message: '删除成功!' 
             })
            role.children = res.data
            }else this.$message.error("删除失败")
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      setright(role){
        this.setrightVisible = true
        this.roleId = role.id
        getrights('tree').then(res=>{
          if(res.meta.status===200){
            this.rightsList = res.data
            this.getdefaultkey(role,this.defaultkey)
          }else this.$message.error("获取权限列表失败")
        })
      },
      getdefaultkey(node,arr){
      if(!node.children){
         return arr.push(node.id)
       }
       node.children.forEach(item=>{
         this.getdefaultkey(item,arr)
       })
      },
      setrightclose(){
        this.defaultkey=[]
      },
      getputrights(){
        const keys=[...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys()]
       const idStr = keys.join(',')
       putrights(this.roleId,idStr).then(res=>{
         if(res.meta.status===200){
           this.$message.success("分配权限成功")
           this.rgetroles()
           this.setrightVisible=false
         }else this.$message.error("分配权限失败")
       })
      }
      },
  created() {
    this.rgetroles()
  },
}
</script>

<style lang="less" scoped>
.el-tag{
 margin: 7px;   
}
.bottomborder{
  border-bottom: 1px solid #eee;
}
.topborder{
  border-top: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>