<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
}

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 260px;
    height: 50px;
    border-radius: 3px;
    float: left;
    position: relative;
    font-size: 32px;
    color:#fff;
    font-weight: bold;
    line-height:50px;
}
.layout-nav{
    width: 420px;
    height:50px;
    line-height: 50px;
    margin:0 auto;
}
.layout-nav p{
    color:#fff;
    font-weight: bold;
    float:right;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    border-right:2px solid #118877;
    color:#118877;
}
.ivu-menu-vertical.ivu-menu-light:after{
    background: #fff;
}
.ivu-layout-header{
    background: #118877;
}
.ivu-menu-dark{
    background:#118877;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    border-right:2px solid #118877;
    color:#118877;
}

.ivu-page-item-active{
    background-color:#118877;
    border-color:#118877;
}

.ivu-page-item:hover{
    color:#118877;
    border-color:#118877;
}
.ivu-btn-info{
    background-color:#118877;
    border-color:#118877;
}

.ivu-btn-info:hover{
    background-color:#119977;
    border-color:#119977;
}

.ivu-btn-error{
    background-color:#ff6600;
    border-color:#ff6600;
}

.ivu-btn-error:hover{
    background-color:#ff7700;
    border-color:#ff7700;
}
.toux{
    border-radius:50px;
    margin-top:5px;
    float:right
}
.name{
    color:#fff;
    font-weight: bold;
    float:right;
    padding:0px 10px;
    line-height:55px;
}
a{
    color:#fff;
}
.ivu-btn-primary{
    background-color:#ff6600;
    border-color:#ff6600;
}

.ivu-btn-primary:hover{
    background-color:#ff7700;
    border-color:#ff7700;
}
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon{
    color:#ff6600;
}

.ivu-icon-ios-arrow-down:before{
    content:"\F3F0"
}

</style>

<template>
  <div id="app" >
    <div class="layout" :style="{height:H}">
            <Layout>
                <Header style = 'height:50px;'>
                        <div class="layout-logo">THER PROJECT</div> 
                        <Dropdown  style = 'float:right;color:#fff;line-height:55px;margin-right:15px;'>
                            <a href="javascript:void(0)">
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>退出登陆</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <b class = 'name'>ZHIMING</b>
                        <img src ='/src/assets/toux.jpg' width="40" height="40" class = 'toux'>
                        
                </Header>
                <Layout>
                    <Sider width = '180px' hide-trigger :style="{background: '#fff','text-align':'left'}">
                        <Menu active-name="1-1" theme="light" width="180px" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    智见信息管理
                                </template>
                                <MenuItem name="1-1 " @click.native = "goto('/')">合伙人管理</MenuItem>
                                <MenuItem name="1-2" @click.native = "goto('/option2')" >医院信息管理</MenuItem>
                                <MenuItem name="1-3">医生信息管理</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    交易信息管理
                                </template>
                                <MenuItem name="2-1">资金交易日志</MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    诊断信息管理
                                </template>
                                <MenuItem name="3-1">诊断记录详情</MenuItem>
                            </Submenu>
                        </Menu>
                    </Sider>
                    <Layout :style="{padding: '0 24px 24px','text-align':'left',background:'#fff'}">
                        <Breadcrumb :style="{margin: '24px 0'}">
                            <BreadcrumbItem>智见健康</BreadcrumbItem>
                            <BreadcrumbItem>智见信息管理</BreadcrumbItem>
                            <BreadcrumbItem>合伙人管理</BreadcrumbItem>
                        </Breadcrumb>
                        <Content :style="{padding: '0px', minHeight: '280px', background: '#fff'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      H: '900px'
    }
  },
  methods: {
    init: function () {
        this.H = window.innerHeight + 'px'
        let layouth = window.innerHeight - $('.ivu-layout-header').height()
        $('.ivu-layout').height(layouth + 'px')
        $('.ivu-layout-sider-children').height(layouth + 'px')
        $('.ivu-layout-sider-children').css('border-right', '1px solid #dddee1')
    },
    goto:function(url){
        this.$router.push(url)
    },
  },
  mounted: function () {
    this.init()
  }
}
</script>
