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
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    border-right:2px solid #ed7020;
    color:#ed7020;
}
.ivu-menu-vertical.ivu-menu-light:after{
    background: #fff;
}
.ivu-layout-header{
    background: #ed7020;
}
.ivu-menu-dark{
    background:#ed7020;
}
.layout-logo{
    background:#eee;
}
</style>

<template>
  <div id="app" >
    <div class="layout" :style="{height:H}">
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="layout-logo"></div>
                        <div class="layout-nav">
                        </div>
                    </Menu>
                </Header>
                <Layout>
                    <Sider hide-trigger :style="{background: '#fff','text-align':'left'}">
                        <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                </template>
                                <MenuItem name="1-1 " @click.native = "goto('/')">Option 1</MenuItem>
                                <MenuItem name="1-2" @click.native = "goto('/option2')" >Option 2</MenuItem>
                                <MenuItem name="1-3">Option 3</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                </template>
                                <MenuItem name="2-1">Option 1</MenuItem>
                                <MenuItem name="2-2">Option 2</MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                </template>
                                <MenuItem name="3-1">Option 1</MenuItem>
                                <MenuItem name="3-2">Option 2</MenuItem>
                            </Submenu>
                        </Menu>
                    </Sider>
                    <Layout :style="{padding: '0 24px 24px','text-align':'left'}">
                        <Breadcrumb :style="{margin: '24px 0'}">
                            <BreadcrumbItem>Home</BreadcrumbItem>
                            <BreadcrumbItem>Components</BreadcrumbItem>
                            <BreadcrumbItem>Layout</BreadcrumbItem>
                        </Breadcrumb>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
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
      H: '900px',
      msg: 'Welcome to Your Vue.js App'
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
    }
  },
  mounted: function () {
    this.init()
  }
}
</script>
