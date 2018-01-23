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
.user_content{
    text-align: center;
}
.user_img{
    height: 52px;
    width: 52px;
    border-radius:100%;
}
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card :dis-hover="true" :bordered="false" style='width:25%;height:500px;float:left;margin:0% 2%;'>
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
                            <td width='25%'>手机：</td>
                            <td>{{data.phone}}</td>
                        </tr>
                        <tr>
                            <td width='25%'>状态：</td>
                            <td v-if="data.frozen">正常</td>
                            <td v-else>冻结</td>
                        </tr>
                        <tr>
                            <td width='25%'>上级：</td>
                            <td v-text="data.up_partner"></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class='user_table user_color'>注册时间：{{data.create_time}}</div>
                    <div class='user_table user_color'>加入时间：{{data.update_time}}</div>
                </Card>
                <Card :dis-hover="true" :bordered="false" style='width:65%;height:290px;float:left;margin:0 0 5px 0 '>
                    <p slot="title">业绩情况</p>
                    <center>
                        <Row :gutter="16">
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>总业绩(盒)</div>
                                <div class='num_color'>{{data.sell_all}}</div>
                            </Col>
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>年业绩(盒)</div>
                                <div class='num_color'>{{data.sell_per_y}}</div>
                            </Col>
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>月业绩(盒)</div>
                                <div class='num_color'>{{data.sell_per_m}}</div>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>总业绩(元)</div>
                                <div class='num_color'>{{data.profit_all}}</div>
                            </Col>
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>年业绩(元)</div>
                                <div class='num_color'>{{data.profit_per_y}}</div>
                            </Col>
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>月业绩(元)</div>
                                <div class='num_color'>{{data.profit_per_m}}</div>
                            </Col>
                        </Row>
                    </center>
                </Card>
                <Card :dis-hover="true" :bordered="false" style='width:65%;height:200px;float:left;margin:5px 0 0 0'>
                    <p slot="title">业务情况</p>
                    <center>
                        <Row :gutter="16">
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>年度任务</div>
                                <div class='num_color'>{{data.city_num}}</div>
                            </Col>
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>城市合伙人(人)</div>
                                <div class='num_color'>{{data.store_num}}</div>
                            </Col>
                            <Col span="8" style='line-height:50px'>
                                <div class='title_color'>合伙人(人)</div>
                                <div class='num_color'>{{data.store_num}}</div>
                            </Col>
                        </Row>
                    </center>
                </Card>
                <!-- 订单 -->
                <Card :dis-hover="true" :bordered="false" style='width:97%;height:500px;float:left;margin:2% 2%;'>
                    <p slot="title">订单情况</p>
                    <Tabs value="order" @on-click="tab_data">
                        <TabPane label="订货订单" name="order">
                            <i-Table  border :columns="column_order" height='300' :data="order_data"></i-Table><br>
                            <Page class='page' show-total @on-change='get_data'></Page>
                        </TabPane>
                        <TabPane label="充值订单" name="recharge">
                            <i-Table  border :columns="column_recharge" height='300' :data="recharge_data"></i-Table><br>
                            <Page class='page' show-total @on-change='get_data'></Page>
                        </TabPane>
                        <TabPane label="提现订单" name="cashout">
                            <i-Table  border :columns="column_cashout" height='300' :data="cashout_data"></i-Table><br>
                            <Page class='page' show-total @on-change='get_data'></Page>
                        </TabPane>
                        <TabPane label="业绩奖励" name="reward">
                             <i-Table  border :columns="column_reward" height='300' :data="reward_data"></i-Table><br>
                            <Page class='page' show-total @on-change='get_data'></Page>
                        </TabPane>
                        <TabPane label="云仓库" name="clould">
                            <i-Table  border :columns="column_clould" height='300' :data="clould_data"></i-Table><br>
                            <Page class='page' show-total @on-change='get_data'></Page>
                        </TabPane>
                    </Tabs>
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
import moment from 'moment'
export default {
    name: 'examineList',
    data () {
        return {
            update_modal:false,
            modal_loading:false,
            userInfo:{},
            data:{},
            datas:[],
            linkArray:['primary','default','default','default','default'],
            column_order:[
                {
                    title:'订单号',
                    key:'orderid'
                },
                {
                    title:'订单金额',
                    key:'orderid'
                },
                {
                    title:'下单时间',
                    key:'orderid'
                },
                {
                    title:'支付方式',
                    key:'orderid'
                },
                {
                    title:'姓名',
                    key:'orderid'
                },
                {
                    title:'订单状态',
                    key:'orderid'
                },
                {
                    title:'查看',
                    render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push('examineInfo/'+params.row.id);
                                        }
                                    }
                                }, '查看'),
                            ]);
                    }
                },
            ],
            column_recharge:[
                {
                    title:'订单号',
                    key:''
                },
                {
                    title:'充值金额',
                    key:''
                },
                {
                    title:'充值时间',
                    key:''
                },
                {
                    title:'支付方式',
                    key:''
                },
                {
                    title:'姓名',
                    key:''
                }, 
                {
                    title:'充值状态',
                    key:''
                }, 
                {
                    title:'查看',
                    key:''
                },                
            ],
            column_cashout:[
                {
                    title:'订单号',
                    key:'',
                },
                {
                    title:'提现金额',
                    key:'',
                },
                {
                    title:'提现时间',
                    key:'',
                },
                {
                    title:'提现账户',
                    key:'',
                },
                {
                    title:'姓名',
                    key:'',
                },
                {
                    title:'提现状态',
                    key:'',
                },
                {
                    title:'查看',
                    key:'',
                }
            ],
            column_reward:[
                
            ],
            column_clould:[
                {
                    title:'商品名称',
                    key:'',
                },
                {
                    title:'库存',
                    width:'15%',
                    key:'',
                }
            ],
            /*table数据 */
            order_data:[],
            recharge_data:[],
            cashout_data:[],
            reward_data:[],
            clould_data:[],
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
                this.data.create_time = moment.unix(this.data.create_time).format('YYYY-MM-DD HH:mm:ss');
                this.data.update_time = moment.unix(this.data.update_time).format('YYYY-MM-DD HH:mm:ss');
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
        },
        /*tab添加数据 */
        tab_data:function(name){
            if(name=='order'){
               this.$http.post().then(res => {
                    
                }) 
            }
            if(name=='recharge'){
                this.$http.post().then(res => {
                    
                }) 
            }
            if(name=='cashout'){
                this.$http.post().then(res => {
                    
                }) 
            }
            if(name=='reward'){
                this.$http.post().then(res => {
                    
                }) 
            }
            if(name=='clould'){
                this.$http.post().then(res => {
                    
                }) 
            }    
        },
    },
    mounted(){
        this.get_one();
    }
}
</script>



