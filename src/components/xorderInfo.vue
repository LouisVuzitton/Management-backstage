<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Card{
    float:left;
}
.Card span{
    float:left;
    margin:0 20px;
    margin-top:30px;
}

.orsta p {
    margin: 10px 0;
}
.ortab tr td{
    height:25px;
}

</style>
<template>
    <div>
        <Card>
            <p slot="title">
                订单状态
            </p>
            <Row style = 'width:100%;'>
                <Col span="6" style ='text-align:left;'>
                        <span>
                            1.提交订单
                        <Icon type="checkmark-circled" :color="color[0]"></Icon>
                        </span>
                </Col>
                <Col span="11" style = 'text-align:center;'>
                    <span  >
                        2.订单付款
                    <Icon type="checkmark-circled" :color="color[1]"></Icon>
                    </span>
                </Col>
                <Col span="6" style ='text-align:right;'>
                    <span >
                        3.发货完成
                    <Icon type="checkmark-circled" :color="color[2]"></Icon>
                    </span>
                </Col>
            </Row>
            <Row>
                <Progress :percent="step" status="active"> 
                    <Icon type="checkmark-circled"  ></Icon>
                    <span>成功</span>
                </Progress>
            </Row>
            <Row style = 'margin:10px 0;'>
                <Col class = 'orsta'>
                    <p>订单编号：{{datas.order_num}}</p>
                    <p>订单状态：{{datas.status}}<Button v-if = "datas.status == '待发货'" style = 'margin-left:10px'type="info" size = 'small' @click = "Delivergoods = true" >发货</Button></p> 
                    <p  style = 'color:#444;font-size:12px;' v-if="datas.status == '待发货'">客户已使用 "{{datas.info_money.pay_type == 'balance' ? '余额支付' : '微信支付'}}" 方式成功付款。</p>
                    <p  style = 'color:#444;font-size:12px;' v-else-if="datas.status == '交易完成'">订单已于 {{datas.time.ok}} 发货完成</p>
                    <p  style = 'color:#444;font-size:12px;' v-else>如果客户在 {{datas.create_time+1}} 前未进行支付操作，系统将自动关闭该订单。</p>
                </Col> 
            </Row> 
        </Card><br>

        <Card>
            <p slot="title">
                订单信息
            </p>
            <Row style = 'width:100%;'>
                <table>
                    <tr><td style ='float:right;'>收货人：</td><td>{{datas.info_address.name}}</td></tr>
                    <tr><td>电话号码：</td><td>{{datas.info_address.phone}}</td></tr>
                    <tr><td>收货地址：</td><td>{{datas.info_address.province+" "+datas.info_address.city+" "+datas.info_address.district+" "+datas.info_address.detail}}</td></tr>
                    <tr><td>支付方式：</td><td>{{datas.info_money.pay_type == 'balance' ? '余额支付' : '微信支付'}}</td></tr>
                    <tr><td>发货方式：</td><td>{{datas.store_way == 'cloud' ? '云仓补货' : '实际发货'}}</td></tr>
                </table>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                商品信息
            </p>
            <Table height="400" :loading="loading" :columns="columns" :data="data"></Table>
            <div style  = 'width:250px; height:30px; float:right;margin:10px;'>订单共<span style = 'color:#f90'> 8 </span>件商品，总计：<span style = 'color:#f90'>799.92</span>元</div><br>
        </Card>

        <Modal v-model="Delivergoods" width="560">
            <p slot="header" style="color:#57c5f7;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>订单发货</span>
            </p>
            <div>
                <table class = 'ortab'>
                    <tr>
                        <td>订单编号：</td><td>{{datas.order_num}}</td>
                        <td>下单时间：</td><td>{{datas.create_time}}</td>
                    </tr>
                    <tr>
                        <td style = 'text-align:right'>收货人：</td><td>{{datas.info_address.name}}</td>
                        <td>电话号码：</td><td>{{datas.info_address.phone}}</td>
                    </tr>
                    <tr><td colspan="1">收货地址：</td><td colspan="3">{{datas.info_address.province+" "+datas.info_address.city+" "+datas.info_address.district+" "+datas.info_address.detail}}</td></tr>
                </table>
                <Table :loading="loading" :columns="columns" :data="data"></Table>
                <br><b>选择物流公司</b><br>
                <Select style="width:200px;padding:5px 0px;" v-model="logis" >
                    <Option v-for="item in logistics" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                 <Input v-model="order" placeholder="请输入物流单号" :disabled = "isdisabled" style="width: 300px"></Input>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long :loading="modal_loading" @click="consignment()">确认发货</Button>
            </div>
        </Modal>    
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'xorderInfo',
  data () {
    return {
        loading:false,
        modal_loading:false,
        page_total:'',//页码
        step:50,
        Delivergoods:false,
        logis:'无需物流', 
        order:'',
        color:['#19be6b','#19be6b','#19be6b'],
        logistics:[
        ],
        logistic:[],
        columns:[
            {
                title: '商品图片',
                key: 'rnak'
            },
            {
                title: '商品名称',
                key: 'rnak'
            },
            {
                title: '规格',
                key: 'rnak'
            },
            {
                title: '单价',
                key: 'rnak'
            },
            {
                title: '数量',
                key: 'rnak'
            },
            {
                title: '小计',
                key: 'rnak',
                width:'100px'
            },
        ],
        send_arr:[],
        data:[],
        datas:{},
    }
  },
  computed:{
        isdisabled:function(){
            if(this.logis == '无需物流'){
                return true;
            }else{
                return false;
            }
        }
  },
  methods:{
      get_data:function(){
           console.log('获取单条数据: ID = ' + this.$route.params.id);
            this.$http.get('/order/_x_get_order?num='+this.$route.params.id).then(res => {
                // this.page_total = res.body.out.count;
                this.datas = res.body.out.order_obj;
                /*状态文字处理 */
                var self=this;
                this.datas.status=(function(){
                    switch(self.datas.status){
                        case 'raw' : self.step=1;self.color[1] = "#999";self.color[2] = "#999";  return '待付款';break;
                        case 'pay' : self.step=50; self.color[2] = "#999";  return '待发货';break;
                        case 'ok' :  self.step=100; return '交易完成';break;
                        case 'cancel':self.step=100; return '交易关闭';break; 
                        default : self.step=1; return '状态异常';break;
                    }
                })();
                console.log(this.datas.status);
                /*时间转换 */
                this.datas.create_time=moment.unix(self.datas.create_time).format('YYYY-MM-DD HH:mm:ss');
                if(this.datas.time.ok){
                    this.datas.time.ok=moment.unix(self.datas.time.ok).format('YYYY-MM-DD HH:mm:ss');
                }
                console.log(this.datas);
            })
      },
      get_logistics:function(){
           this.$http.get('/order/_x_get_shiplist').then(res => {
                let arr = res.body.out.datas;
                this.logistics.push({'无需物流':{name:'无需物流'}});
                var self=this;
                for(var item in arr){
                    self.logistics.push({value:arr[item].name,label:arr[item].name})
                }
            })
      },
      consignment:function(){
          var self=this;
          var code='';
          console.log(this.logistic);
          console.log("当前的选择物流是"+self.logis); 
          for(var item in self.logistic ){
              if(self.logis == self.logistic[item].name){
                  code = self.logistic[item].code;
              }
          }
          this.send_arr=[{"name":this.logis,"code":code,"num":this.order}];
          console.log(this.send_arr);
          this.$http.post('/order/_x_send_order',{num:this.$route.params.id,send_infos:this.send_arr}).then(res => {
              if(res.body.out.status){
                    this.Delivergoods=false;
                    this.$Notice.info({
                        title: '发货成功!',
                    });
                    this.get_data();
              }
          })
      }
  },
  mounted(){
     this.get_logistics();
     this.get_data();
  }
}
</script>


