<!--用户详细信息-->
<style scoped>
.user_table{
    margin:25px 5px;
    color:#657180;
}
.user_table td{
    height:25px;
}

.user_color{
    margin:15px 5px;
    color:#9ea7b4;
    font-size:13px;
}

.title_color{
    color:#657180;
    font-weight:bold;
}

.num_color{
    color:#ff9900;
    font-size:20px;
    font-weight:bold;
}
.order_margin{
    margin:20px;
}

.order_margin tr td{
  height:30px;
  
}

.price{
    margin-top:20px;
    width:100%;
    text-align: right
}
.button{
    width: 50%;
    margin-right: 25%; 
}
.user_img{
    height: 48px;
    width: 48px;
    border-radius:100%;
}
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card :bordered="false" style='width:30%;height:500px;float:left;margin:0% 2%;'>
                    <p slot="title">用户昵称</p>
                    <div class='user_content'>
                        <img :src="data.head" class='user_img'>
                    </div>
                    <table class='user_table'>
                        <tr>
                            <td width='30%'>姓名: </td>
                            <td width='65%'>{{data.realname}}</td>
                            <td width='5%'></td>
                        </tr>
                        <tr>
                            <td>余额</td>
                            <td v-text="data.settled_money"></td>
                            <td>
                                <center>
                                    <Button type="info" size="small" @click='update_modal = true'>充值</Button>
                                </center>
                            </td>
                        </tr>
                        <tr>
                            <td>级别:</td>
                            <td v-if="data.role=='usr_p1'">管理合伙人</td>
                            <td v-else-if="data.role=='usr_p2'">城市合伙人</td>
                            <td v-else>合伙人</td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>手机：</td>
                            <td>{{data.phone}}</td>
                        </tr>
                        <tr>
                            <td>状态：</td>
                            <td v-if="data.frozen">正常</td>
                            <td v-else>冻结</td>
                        </tr>
                        <tr>
                            <td>上级：</td>
                            <td v-text="up_partner"></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class='user_table user_color'>注册时间：{{moment.unix(data.create_time).format('YYYY-MM-DD HH:mm:ss')}}</div>
                    <div class='user_table user_color'>加入时间：{{moment.unix(data.update_time).format('YYYY-MM-DD HH:mm:ss')}}</div>
                </Card>
                <Card :bordered="false" style='width:65%;height:245px;float:left;margin:0 0 5px 0 '>
                    <p slot="title">业绩情况</p>
                    <center>
                        <Row :gutter="16">
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>总业绩(盒)</div>
                                <div class='num_color'>{{data.sell_all}}</div>
                            </Col>
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>年业绩(盒)</div>
                                <div class='num_color'>{{data.sell_per_y}}</div>
                            </Col>
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>月业绩(盒)</div>
                                <div class='num_color'>{{data.sell_per_m}}</div>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>总业绩(元)</div>
                                <div class='num_color'>{{data.profit_all}}</div>
                            </Col>
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>年业绩(元)</div>
                                <div class='num_color'>{{data.profit_per_y}}</div>
                            </Col>
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>月业绩(元)</div>
                                <div class='num_color'>{{data.profit_per_m}}</div>
                            </Col>
                        </Row>
                    </center>
                </Card>
                <Card :bordered="false" style='width:65%;height:245px;float:left;margin:5px 0 0 0'>
                    <p slot="title">业务情况</p>
                    <center>
                        <Row :gutter="16">
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>年度任务</div>
                                <div class='num_color'>{{data.city_num}}</div>
                            </Col>
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>城市合伙人</div>
                                <div class='num_color'>{{data.store_num}}</div>
                            </Col>
                            <Col span="8" style='line-height:70px'>
                                <div class='title_color'>城市合伙人</div>
                                <div class='num_color'>{{data.store_num}}</div>
                            </Col>
                        </Row>
                    </center>
                </Card>

                <Card :bordered="false" style='width:97%;height:500px;float:left;margin:2% 2%;'>
                    <p slot="title">订单情况</p>
                    <ButtonGroup>
                        <Button type="primary">
                            订货订单
                        </Button>
                        <Button type="default">
                            充值订单
                        </Button>
                        <Button type="default">
                            体现订单
                        </Button>
                        <Button type="default">
                            业绩奖励
                        </Button>
                        <Button type="default">
                            云仓库
                        </Button>
                    </ButtonGroup><br><br>
                    <i-Table  border :columns="columns" height='300' :data="datas"></i-Table><br>
                    <Page class='page' show-total @on-change='get_data'></Page>
                </Card>
            </Col>
        </Row>
            <Modal v-model="update_modal" width="560">
                <p slot="header" style="color:#2db7f5;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>账户充值</span>
                </p>
                <div>
                    <table>
                      
                        <tr>
                            <td style="text-align:right">姓名：</td>
                            <td>吴伟龙</td>
                        </tr>
                        <tr>
                            <td>当前余额：</td>
                            <td>￥49500.00</td>
                        </tr>
                        <tr>
                            <td>充值金额：</td>
                            <td><InputNumber v-model="charge"></InputNumber></td>
                        </tr>
                    </table>
                </div>
                <div slot="footer">
                    <Button type="info" class="button" @click="recharge()" size="large" :loading="modal_loading" >确认充值</Button>
                </div>
            </Modal>
    </div>
</template>

<script>
export default {
    name: 'examineList',
    data () {
        return {
            update_modal:false,
            modal_loading:false,
            userInfo:{},
            data:{},
            datas:[],
            columns:[],
            charge:0,
        }
    },
    methods:{
        get_data:function(){

        },
        get_one: function () {
            console.log('获取单条数据: ID = ' + this.$route.params.id);
            this.$http.get("/admin/get_usr"+ '?id=' + this.$route.params.id).then(res => {
                console.log("数据" + JSON.stringify(res.body, 0, 4));
                this.data = res.body.out.data;
                // this.data.create_time = moment.unix(this.data_one.create_time).format('YYYY-MM-DD HH:mm:ss');
                // this.data.update_time = moment.unix(this.data_one.update_time).format('YYYY-MM-DD HH:mm:ss');
                if (this.data.frozen == true) {
                    this.data.frozen = '禁封'
                } else {
                    this.data.frozen = '正常'
                }
                // this.data.role = this.role_map[this.data_one.role]
            })
        },
        recharge:function(){
            this.$http.post("/admin/recharge",{id:this.$route.params.id,price:this.price}).then(res => {
                if(res.body.out.status){
                    this.$Notice.info({
                        title: '充值成功!',
                    });
                    this.get_one();
                }
            })
        }
    },
    mounted(){
        this.get_one();
    }
}
</script>



