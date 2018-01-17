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
  background:url('../static/pexels-photo-590044.jpeg') center no-repeat; background-size:100% 100%;
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
    display:flex;
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
    background: rgba(250,250,250,0.2);
    border:1px solid rgba(255,255,255,0.1);
}

.time2{
    font-size: 14px;
    font-weight: bold;
}
.content2{
    padding-left: 5px;
}


</style>

<template>
  <div id="app" :style = "{height:H}">
    <div class = 'login' v-show = "!login">
      <center>
        <div class = 'hezi' style= 'padding-top:12.5%;'>
          <div class = 'fix_con'>
              <div class = 'fix_title'>
                      <center><img src= "../static/toux.jpg"></center>
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
          <center><div style = 'height:100px;background:#495060;border-right:1px solid #dddee1;'><img style = 'border-radius:100%;width:80px;margin-top:10px;' src = '../static/toux.jpg'></div></center>
          <Menu :active-name="actname" theme="dark" width="auto" :open-names="['0','1','2','3','4','5']" style=  'border:0px;'>
              <MenuItem name="0-0" @click.native = "goto('/')">
                <Icon type="ios-navigate"></Icon>
                首页
              </MenuItem>
              <Submenu name="1">
                  <template slot="title">
                      <Icon type="ios-navigate"></Icon>
                      客户管理
                  </template>
                  <MenuItem name="1-1"  @click.native = "goto('/examineList')">客户列表</MenuItem>
                  <MenuItem name="1-2"  @click.native = "goto('/ctemrAudit')">客户审核</MenuItem>
                  <MenuItem name="1-3"  @click.native = "goto('/ctemrLeve')">客户等级</MenuItem>
              </Submenu>
              <Submenu name="2">
                  <template slot="title">
                      <Icon type="ios-keypad"></Icon>
                      订单管理
                  </template>
                  <MenuItem name="2-1"  @click.native = "goto('/xorderList')">销售订单</MenuItem>
                  <MenuItem name="2-2"  @click.native = "goto('/torderList')">提货订单</MenuItem>
              </Submenu>
              <Submenu name="3">
                  <template slot="title">
                      <Icon type="ios-analytics"></Icon>
                      商品管理
                  </template>
                  <MenuItem name="3-1"  @click.native = "goto('/shopList')">商品列表</MenuItem>
              </Submenu>
              <Submenu name="4">
                  <template slot="title">
                      <Icon type="ios-analytics"></Icon>
                      账务管理
                  </template>
                  <MenuItem name="4-1"  @click.native = "goto('/accSitu')">账务概况</MenuItem>
                  <MenuItem name="4-2"  @click.native = "goto('/witdsCash')">提现管理</MenuItem>
                  <MenuItem name="4-3"  @click.native = "goto('/rechRecord')">充值记录</MenuItem>
                  <MenuItem name="4-4"  @click.native = "goto('/bonuRecord')">奖励记录</MenuItem>
              </Submenu>
              <Submenu name="5">
                  <template slot="title">
                      <Icon type="ios-analytics"></Icon>
                      公告管理
                  </template>
                  <MenuItem name="5-1"  @click.native = "goto('/notice')">公告列表</MenuItem>
              </Submenu>
          </Menu>
      </Sider>
      <Layout :style="{marginLeft: '200px',height:CardH}">
          <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)','font-weight':'bold','font-size':'20px'}">
            <!-- 根本力管理后台 -->
            <a style=  'float:right;margin: 5px 10px;font-size:13px;' @click = 'user_logout'><b>退出</b></a>
            <b style=  'float:right;margin: 5px 10px;font-size:13px;'>周志明</b>
            <img style=  'margin-top:10px;float:right;border-radius:50%;' width = '40' src= "../static/toux.jpg">
          </Header>
          <Content :style="{padding: '10px 16px 16px',overflow:'auto','margin-top':'10px'}">
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
                "#/":'0-0',
                "#/examineList":'1-1',
                "#/ctemrAudit":'1-2',
                "#/ctemrLeve":'1-3',
                "#/xorderList":'2-1',
                "#/torderList":'2-2',
                "#/shopList":'3-1',
                "#/accSitu":'4-1',
                "#/witdsCash":'4-2',
                "#/rechRecord":'4-3',
                "#/bonuRecord":'4-4',
                "#/notice":'5-1',
                "#/noticeInfo":'5-1',
            },
            paySta:{
                "paying":"付款中",
                "ok":"交易完成",
                "sending":"代收货",
                "cancel":"交易关闭",
                "raw":"代付款",
                "checking":"代审核",
                "pay":"代发货",
            }, //订单状态列表

            columns: [
                {
                    title: '昵称',
                    key: 'name'
                },
                {
                    title: '角色',
                    key: 'role',
                    render: (h, params) => {
                        return this.role_map[params.row.role];
                        // console.log(JSON.stringify(this.role_map,0,4));
                        // return params.row.role

                    }
                },
                {
                    title: '手机号',
                    key: 'phone'
                },

                {
                    title: '地址',
                    key: 'address',
                    render: (h, params) => {
                        if (params.row.address == '' || params.row.address == null) {
                            return '用户未填写'
                        } else {
                            return params.row.address.province + " " + params.row.address.city + " " + params.row.address.district 
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'level',
                    width: '90px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.click_page();
                                        this.get_one(params.row.id);
                                        this.order.id  = params.row.id
                                        this.get_data2(0);
                                    }
                                }
                            }, '管理'),
                        ]);
                    }
                },
            ], //数据列表标题1

            columns2: [
                {
                    title: '订单号',
                    key: 'order_num'
                },
                {
                    title: '订单金额',
                    key: 'status',
                    render: (h, params) => {
                        return params.row.origin_money / 100
                    }
                },
                {
                    title: '订单状态',
                    key: 'address',
                    render: (h, params) => {
                        return this.paySta[params.row.status]
                    }
                },
                {
                    title: '下单时间',
                    key: 'address',
                    render: (h, params) => {
                        return moment.unix(params.row.create_time).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
                {
                    title: '姓名',
                    key: 'address',
                    render: (h, params) => {
                        return params.row.info_usr.name
                    }
                },
                {
                    title: '手机号',
                    key: 'address',
                    render: (h, params) => {
                        return params.row.info_usr.phone;
                    }
                },
                {
                    title: '操作',
                    key: 'level',
                    width: '90px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.jump_url('order_list.html?num='+params.row.order_num)
                                    }
                                }
                            }, '管理'),
                        ]);
                    }
                },
            ], //数据列表标题2
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
        
    },
        user_login(){
            let self = this;
            var name = this.user;
            this.$http.post('/admin/admin_login',{name:this.user,pwd:this.password}).then(res => {
                if(res.body.out.role){
                    console.log(res.body.out);
                    sessionStorage.setItem('name',name);
                    self.login = true;
                    
                }else{
                    this.$Notice.error({
                        title: '登录失败',
                        desc:  res.body.err.msg
                    });
                }
            })
        },
        user_logout(){
            //清除session并退出
            sessionStorage.setItem('name','no');
            this.login = false;
        }
  },
  mounted: function() {
    this.init();
    let name = window.location.hash
    this.actname = this.urls[name];

    // let login_name = sessionStorage.getItem('name');
    // if(login_name != 'no'){
    //     this.login = true;
    // }else{
    //     this.login = false;
    // }

  },

};

</script>
