<style>
::-webkit-scrollbar{width:0px;}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: Helvetica, Tahoma, Arial, "STXihei", "华文细黑", "Microsoft YaHei",
    "微软雅黑", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
}
.login{
  width:100%;
  height:100%;
  background:url('../static/web_login_bg.jpg') center no-repeat; background-size:100% 100%;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
hezi{
    display: -webkit-flex;
    display: flex;
    justify-content:center;
    margin-top:12.5%;
    -webkit-justify-content: center;
    -webkit-flex-wrap:wrap;
    flex-wrap:wrap;
    width:100%;
    height:100%;

}

.fix_login{
    display:flex;
    display: -webkit-flex;
    justify-content:center;
    align-items:center;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    -webkit-flex-wrap:wrap;
    flex-wrap:wrap;
    width:330px;
    height:190px;
    padding:20px;
    background: rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.2);
    border-radius:5px;
}
.fix_title{
    width:100%;
    height:80px;
    opacity: 0.85;
}

.fix_con{
    display:flex;
    display: -webkit-flex;
    justify-content:center;
    align-items:center;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    -webkit-flex-wrap:wrap;
    flex-wrap:wrap;
    height:400px;
    width:350px;
}

.fix_title img{
    width:130px;
    height:130px;
    border-radius:50%;
    border:4px solid #1A3E44;
}

.fix_input{
    width:80%;
    height:35px;
    border-radius: 5%;
}

.fix_button{
    width:80%;
    height:35px;
}

.fix_login input{
    background: rgba(250,250,250,0.8);
    border:1px solid rgba(255,255,255,0.1);

}
input::-webkit-input-placeholder { 
    text-indent: 5px;
    color:#000;font-size:14px;
}
input::-moz-placeholder { 
    text-indent: 5px; 
    color:#4d4d4d;font-size:14px;
}
input::-moz-placeholder {
    text-indent: 5px;  
    color:#4d4d4d;font-size:14px;
}
input::-ms-input-placeholder {
    text-indent: 5px; 
    color:#4d4d4d;font-size :14px;;
}  
.time2{
    font-size: 14px;
    font-weight: bold;
}
.content2{
    padding-left: 5px;
}

.mefont{
    font-size:12px;
}

</style>

<template>
  <div id="app" :style = "{height:H}">
    <div class = 'login' v-show = "!login">
      <center>
        <div class = 'hezi' style= 'padding-top:12.5%;'>
          <div class = 'fix_con'>
              <div class = 'fix_title'>
                      <center><img src= "../static/share_logo1.jpg"></center>
              </div>  
              <div class = 'fix_login'>
                  <i-input type = 'text' v-model="user" class = 'fix_input' placeholder="请输入您的账号"></i-input> 
                  <i-input type = 'password'  v-model="password" class = 'fix_input' placeholder="请输入您的密码" ></i-input>
                  <i-button class = 'fix_button' @click="loginbutton" type = 'success'>登录</i-button>
              </div>
          </div>
        </div> 
      </center>
    </div>
    <div class="layout" v-show = "login">
      <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',background:'#495060','border-left':'1px solid #dddee1'}">
          <center><div style = 'height:100px;background:#495060;border-right:1px solid #dddee1;'><img style = 'border-radius:100%;width:80px;margin-top:10px;' src = '../static/share_logo1.jpg'></div></center>
          <Menu :active-name="actname" theme="dark" width="auto" :open-names="['0','1','2','3','4','5','6']" style=  'border:0px;'>
              <MenuItem name="0-0" @click.native = "goto('/')">
                <Icon type="stats-bars"></Icon>
                首页
              </MenuItem>
              <Submenu name="1">
                  <template slot="title">
                      <Icon type="person"></Icon>
                      客户管理
                  </template>
                  <MenuItem name="1-1"  @click.native = "goto('/examineList')" class = 'mefont'> <span style=  'font-size:13px;'> 客户列表</span></MenuItem>
                  <MenuItem name="1-2"  @click.native = "goto('/ctemrAudit/0')" class = 'mefont'><span style=  'font-size:13px;'>客户审核</span></MenuItem>
                  <MenuItem name="1-3"  @click.native = "goto('/ctemrLeve')" class = 'mefont'><span style=  'font-size:13px;'>客户等级</span></MenuItem>
              </Submenu>
              <Submenu name="2">
                  <template slot="title">
                      <Icon type="clipboard"></Icon>
                      订单管理
                  </template>
                  <MenuItem name="2-1"  @click.native = "goto('/xorderList/0')" class = 'mefont'><span style=  'font-size:13px;'>销售订单</span></MenuItem>
                  <MenuItem name="2-2"  @click.native = "goto('/torderList/0')" class = 'mefont'><span style=  'font-size:13px;'>提货订单</span></MenuItem>
              </Submenu>
              <Submenu name="3">
                  <template slot="title">
                      <Icon type="bag"></Icon>
                      商品管理
                  </template>
                  <MenuItem name="3-1"  @click.native = "goto('/shopList')" class = 'mefont'><span style=  'font-size:13px;'>商品列表</span></MenuItem>
              </Submenu>
              <Submenu name="4">
                  <template slot="title">
                      <Icon type="social-yen"></Icon>
                      账务管理
                  </template>
                  <MenuItem name="4-1"  @click.native = "goto('/accSitu')" class = 'mefont'><span style=  'font-size:13px;'>账务概况</span></MenuItem>
                  <MenuItem name="4-2"  @click.native = "goto('/witdsCash/0')" class = 'mefont'><span style=  'font-size:13px;'>提现管理</span></MenuItem>
                  <MenuItem name="4-3"  @click.native = "goto('/rechRecord')" class = 'mefont'><span style=  'font-size:13px;'>充值记录</span></MenuItem>
                  <MenuItem name="4-4"  @click.native = "goto('/bonuRecord')" class = 'mefont'><span style=  'font-size:13px;'>奖励记录</span></MenuItem>
              </Submenu>
              <Submenu name="5">
                  <template slot="title">
                      <Icon type="calendar"></Icon>
                      公告管理
                  </template>
                  <MenuItem name="5-1"  @click.native = "goto('/notice')" class = 'mefont'><span style=  'font-size:13px;'>公告列表</span></MenuItem>
              </Submenu>
             <Submenu name="6">
                  <template slot="title">
                      <Icon type="gear-a"></Icon>
                      权限管理
                  </template>
                  <MenuItem name="6-1"  @click.native = "goto('/addAdmin')" class = 'mefont'><span style=  'font-size:13px;'>添加管理员</span></MenuItem>
              </Submenu>
          </Menu>
      </Sider>
      <Layout :style="{marginLeft: '200px',height:CardH}">
          <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,0.1)','font-weight':'bold','font-size':'20px'}">
            <!-- 根本力管理后台 -->
            <a style=  'float:right;margin: 5px 10px;font-size:13px;' @click = 'user_logout'><b>退出</b></a>
            <b style=  'float:right;margin: 5px 10px;font-size:13px;'>Admin</b>
            <img style=  'margin-top:10px;float:right;border-radius:50%;' width = '40' src= "../static/share_logo1.jpg">
          </Header>
          <Content :style="{padding: '10px 16px 16px',overflow:'auto','margin-top':'2px',background:'#eee'}">
              <Card>
                  <div>
                      <router-view></router-view>
                  </div>
              </Card>
          </Content>
      </Layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
        return {
            login:true, //登录标识
            user:'',  //登录名
            password:'',//登录密码
            yzm:'', //登录验证码
            yzm_heidd:false, //验证码框
            H:'', //页面高度
            CardH:'', //Card高度
            privilege: false, //root管理员标识
            url_name: '/static/inbak/',  // 跳转地址
            actname:'1-1',
            url: {
                user_list: '/admin/get_usr_list',
                user_info: '/admin/get_usr',
                user_freeze: '/admin/set_usr_freeze',
                user:'https://api.galilee.co/admin/add_manage_partner'
            }, //请求数据地址
            button: {client_button: false, update_modal: false,user_modal:false }, //模块开关
            data_info: {},  //详情数据
            page_total: 0,  //分页总数
            data: [], //数据列表1
            data2:[], //数据列表2
            city:[],  //省市区三级联动
            search: {
            },//查询数据
            urls:{
                "/":'0-0',
                "/examineList":'1-1',
                "/ctemrAudit/0":'1-2',
                "/ctemrLeve":'1-3',
                "/xorderList/0":'2-1',
                "/torderList/0":'2-2',
                "/shopList":'3-1',
                "/accSitu":'4-1',
                "/witdsCash/0":'4-2',
                "/rechRecord":'4-3',
                "/bonuRecord":'4-4',
                "/notice":'5-1',
                "/noticeInfo":'5-1',
                "/addAdmin":'6-1',
                "/xorderList/xs":'2-1',
                "/ctemrAudit/sh":'1-2',
                "/witdsCash/tx":'4-2',
                "/torderList/th":'2-2',
            },
        }
  },
  methods: {
    init: function() {
      this.H = window.innerHeight + "px";
      this.CardH  = window.innerHeight  - 3 + 'px';
    },
    goto: function(url) {
      this.$router.push(url);
    },
    loginbutton:function(){
        var self = this;
        var user = this.user;
        var password = this.password;
        var yzm  = this.yzm;
        if(user == "" || password == ""){
            self.$Notice.error({
                title: '登录失败',
                desc: '用户名密码不能为空'
            });
            return;
        }

        this.user_login();
        // this.login=true; //测试使用
    },
        user_login(){
            //本地模拟登录
            if(this.user == 'admin' && this.password == 'admin'){
                    sessionStorage.setItem('name',this.user);
                    this.login = true;
            }else{
                this.$Notice.error({
                        title: '登录失败',
                       desc:  res.body.err.msg
                });
            }

            //以下是正式请求登录接口 ************ 
            // let self = this;
            // var name = this.user;
            // this.$http.post('/admin/admin_login',{name:this.user,pwd:this.password}).then(res => {
            //     if(res.body.out.role){
            //         console.log(res.body.out);
            //         sessionStorage.setItem('name',name);
            //         self.login = true;
                    
            //     }else{
            //         this.$Notice.error({
            //             title: '登录失败',
            //             desc:  res.body.err.msg
            //         });
            //     }
            // })
        },
        user_logout(){
            //清除session并退出
            sessionStorage.setItem('name','');
            this.login = false;
        }
  },
  mounted: function() {
    this.init();
    let name = window.location.hash
    this.actname = this.urls[name];

    /*客户端判断管理员是否登录 */
    let login_name = sessionStorage.getItem('name');
    if(login_name = '' || !login_name){
        this.login = false;
    }else{
        this.login = true;
    }
    /*服务端判断用户是否登录 */
    this.$http.get('/other/is_login').then(function(res){
        console.log(res.body);
        if(!res.body.out.result){
            this.login = false;
        }
    })

  },
  watch:{
      "$route":function(to,form){
          this.actname = this.urls[to.path];
      }
  }

};

</script>
