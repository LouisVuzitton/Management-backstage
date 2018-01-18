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
                        <Icon type="checkmark-circled" color="#19be6b"></Icon>
                        </span>
                </Col>
                <Col span="11" style = 'text-align:center;'>
                    <span  >
                        2.订单付款
                    <Icon type="checkmark-circled" color="#19be6b"></Icon>
                    </span>
                </Col>
                <Col span="6" style ='text-align:right;'>
                    <span >
                        3.发货完成
                    <Icon type="checkmark-circled" color="#999"></Icon>
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
                    <p>订单编号：8000000000000201</p>
                    <p>订单状态：待发货<Button  style = 'margin-left:10px'type="info" size = 'small' @click = "Delivergoods = true" >发货</Button></p> 
                    <p  style = 'color:#444;font-size:12px;'>如果客户在 2018-01-04 10:30:51 前未进行支付操作，系统将自动关闭该订单。</p>
                    <p  style = 'color:#444;font-size:12px;'>客户已使用 "微信支付" 方式成功付款。</p>
                    <p  style = 'color:#444;font-size:12px;'>订单已于 2018-01-03 10:17:06 发货完成</p>
                </Col> 
            </Row> 
        </Card><br>

        <Card>
            <p slot="title">
                订单信息
            </p>
            <Row style = 'width:100%;'>
                <table>
                    <tr><td style ='float:right;'>收货人：</td><td>吴伟龙</td></tr>
                    <tr><td>电话号码：</td><td>18826556663</td></tr>
                    <tr><td>收货地址：</td><td>广东省 深圳市 南山区 深南大道与铜鼓路西100米大冲商务中心</td></tr>
                    <tr><td>支付方式：</td><td>微信支付</td></tr>
                    <tr><td>发货方式：</td><td>实际发货/云仓补货</td></tr>
                </table>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                商品信息
            </p>
            <Table height="400" :loading="loading":columns="columns" :data="data"></Table>
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
                        <td>订单编号：</td><td>180103370261001376</td>
                        <td>下单时间：</td><td>2018-01-03 10:17:06</td>
                    </tr>
                    <tr>
                        <td style = 'text-align:right'>收货人：</td><td>某某某</td>
                        <td>电话号码：</td><td>18826556663</td>
                    </tr>
                    <tr><td colspan="1">收货地址：</td><td colspan="3">广东省 深圳市 南山区 深南大道与铜鼓路西100米大冲商务中心</td></tr>
                </table>
                <Table :loading="loading":columns="columns" :data="data"></Table>
                <br><b>选择物流公司</b><br>
                <Select style="width:200px;padding:5px 0px;" v-model="logis" >
                    <Option v-for="item in logistics" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                 <Input v-model="order" placeholder="Enter 物流单号..." :disabled = "isdisabled" style="width: 300px"></Input>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long :loading="modal_loading" >确认发货</Button>
            </div>
        </Modal>    
    </div>
</template>

<script>
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
        logistics:[
            {
                value: '无需物流',
                label: '无需物流'
            },
            {
                value: 'name',
                label: '顺丰快递'
            },
            {
                value: 'phone',
                label: '申通快递'
            },
        ],
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
        data:[]
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
  },
  mounted(){
      get_data(1);
  }
}
</script>


