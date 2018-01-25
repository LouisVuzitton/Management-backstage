<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Card{
    float:left;
}
.Card span{
    float:left;
    margin:0 30px;
    margin-top:8px;
}
.Card img{
    width:110px;
    height:auto;
}
.bak{
    width:110px;
    height:74px;
    float:left;
    padding-top:10px;
}
.Card p{
    /* color:#2d8cf0 */
}

.Card span p{
    /* color:#2d8cf0; */
    /* font-weight: bold; */
}


/* b{
    color:#e96900;
} */

.pfon{
    font-size: 24px;
}
.pfont{
    font-size:12px;
}
.pcolor{
    color:#2d8cf0;
    cursor:pointer
}


</style>
<template>
    <div>
        <Card :dis-hover="true">
            <p slot="title">
                运营概况
            </p>
            <Row style = 'width:100%;'>
                <center>
                <Col class = 'Card' span="8">
                    <!-- <Card dis-hover	 class = 'bak' style="text-align:center;"> -->
                        <div class = 'bak'>
                            <Icon type="android-contacts" size="50" color="#2d8cf0"></Icon>
                        </div>
                    <!-- </Card>    -->
                    <span>
                        <p class = 'pfon' v-text="init['客户总数']"></p>
                        <p class = 'pfont'>客户总数</p>
                    </span>
                </Col>
                <Col class = 'Card' span="8">
                    <!-- <Card dis-hover	 class = 'bak'> -->
                         <div class = 'bak'>
                            <Icon type="android-cart" size="50" color="#2d8cf0"></Icon>
                         </div>
                    <!-- </Card>    -->
                    <span>
                        <p class = 'pfon' v-text="init['订单总数']"></p>
                        <p class = 'pfont'>订单总数</p>
                    </span>
                </Col>
                <Col class = 'Card' span="8">
                    <!-- <Card dis-hover	 class = 'bak'> -->
                        <div class = 'bak'>
                            <Icon type="social-yen" size="50" color="#2d8cf0"></Icon>
                        </div>
                    <!-- </Card>    -->
                    <span>
                        <p class = 'pfon'>{{(init['销售总额']/100).toFixed(2)}}</p>
                        <p class = 'pfont'>销售总额</p>
                    </span>
                </Col>
                </center>
            </Row>
        </Card><br>

        <Card :dis-hover="true">
            <p slot="title">
                待办处理事项
            </p>
            <Row style = 'width:100%;text-align:center;'>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card  @click.native = "goto('/ctemrAudit/sh')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title" class = 'pcolor'>
                            待审核(客户)
                        </p>
                        <p style = 'font-size:23px;' v-text="init['客户待审核']"></p>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card  @click.native = "goto('/witdsCash/tx')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title"  class = 'pcolor'>
                            待审核(提现)
                        </p>
                        <p style = 'font-size:23px;' v-text="init['提现待审核']">50</p>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card  @click.native = "goto('/xorderList/xs')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title"  class = 'pcolor'>
                            待发货(销售)
                        </p>
                        <p style = 'font-size:23px;' v-text="init['销售待发货']">50</p>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card @click.native = "goto('/torderList/th')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title"  class = 'pcolor'>
                            待发货(提货)
                        </p>
                        <p style = 'font-size:23px;' v-text="init['提货待发货']">50</p>
                    </Card>   
                </Col>
            </Row>
        </Card><br>

        <Card :dis-hover="true" height="800">
            <p slot="title">
                业绩排行
            </p>
            <Tabs value="month" @on-click="getAchieve">
                <TabPane label="月度" name="month">
                    <i-Table  border :loading="loading" :columns="column_month" height='600' :data="data"></i-Table><br>
                </TabPane>
                <TabPane label="季度" name="quarter">
                    <i-Table  border :loading="loading" :columns="column_quarter" height='600' :data="data"></i-Table><br>
                </TabPane>
                <TabPane label="年度" name="year">
                    <i-Table  border :loading="loading" :columns="column_year" height='600' :data="data"></i-Table><br>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
        loading:true,
        column_month:[
            {
                title: '排名',
                type: 'index'
            },
            {
                title: '姓名',
                key: 'realname'
            },
            {
                title: '级别',
                key: 'role',
                render:function(h,params){
                    let role;
                    switch(params.row.role){
                        case 'usr_p1':role='管理合伙人';break;
                        case 'usr_p2':role='城市合伙人';break;
                        case 'usr_p3':role='合伙人';break;
                        case 'usr_p4':role='';break;
                    }
                    return role;
                }
            },
            {
                title: '业绩(盒)',
                key: 'sell_per_m',
                render:function(h,params){
                    return parseInt(params.row.sell_per_m)/100;
                }
            },
            {
                title: '业绩(元)',
                key: 'buy_per_m',
                width:'100px',
                render:function(h,params){
                    return (parseInt(params.row.buy_per_m)/100).toFixed(2);
                }
            },
        ],
        column_quarter:[
            {
                title: '排名',
                type: 'index'
            },
            {
                title: '姓名',
                key: 'realname'
            },
            {
                title: '级别',
                key: 'role',
                render:function(h,params){
                    let role;
                    switch(params.row.role){
                        case 'usr_p1':role='管理合伙人';break;
                        case 'usr_p2':role='城市合伙人';break;
                        case 'usr_p3':role='合伙人';break;
                        case 'usr_p4':role='';break;
                    }
                    return role;
                }
            },
            {
                title: '业绩(盒)',
                key: 'sell_per_q',
                render:function(h,params){
                    return parseInt(params.row.sell_per_q)/100;
                }
            },
            {
                title: '业绩(元)',
                key: 'buy_per_q',
                width:'100px',
                render:function(h,params){
                    return (parseInt(params.row.buy_per_q)/100).toFixed(2);
                }
            },
        ],
        column_year:[
            {
                title: '排名',
                type: 'index'
            },
            {
                title: '姓名',
                key: 'realname'
            },
            {
                title: '级别',
                key: 'role',
                render:function(h,params){
                    let role;
                    switch(params.row.role){
                        case 'usr_p1':role='管理合伙人';break;
                        case 'usr_p2':role='城市合伙人';break;
                        case 'usr_p3':role='合伙人';break;
                        case 'usr_p4':role='';break;
                    }
                    return role;
                }
            },
            {
                title: '业绩(盒)',
                key: 'sell_per_y',
                render:function(h,params){
                    return parseInt(params.row.sell_per_y)/100;
                }
            },
            {
                title: '业绩(元)',
                key: 'buy_per_y',
                width:'100px',
                render:function(h,params){
                    return (parseInt(params.row.buy_per_y)/100).toFixed(2);
                }
            },
        ],
        data:[],
        init:{}
    }
  },
  methods:{
        goto: function(url) {
            this.$router.push(url);
        },
        getAchieve(name){
            this.loading=true;
            let self=this;
            switch(name){
                case 'month':
                this.$http.post('/admin/achieve_rank',{flag:'month'}).then(function(res){
                    self.data=res.body;
                    self.loading=false;
                });break;
                case 'quarter':
                this.$http.post('/admin/achieve_rank',{flag:'quarter'}).then(function(res){
                    self.data=res.body;
                    self.loading=false;
                });break;
                case 'year':
                this.$http.post('/admin/achieve_rank',{flag:'year'}).then(function(res){
                    self.data=res.body;
                    self.loading=false;
                });break;
                default:
                this.$http.post('/admin/achieve_rank',{flag:'month'}).then(function(res){
                    self.data=res.body;
                    self.loading=false;
                });break;
            }
        },
        initdata(){
            this.loading=true;
            this.$http.get('/admin/index').then(function(res){
                this.init=res.body;
                this.loading=false;
            })
        }
  },
  mounted(){  
      this.getAchieve('month');
      this.initdata();
  },
}
</script>


