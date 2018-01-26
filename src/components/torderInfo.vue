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
            <Row style = 'margin:10px 0;'>
                <Col class = 'orsta'>
                    <p>订单编号：{{datas.pickup_num}}</p>
                    <p>订单状态：{{datas.status =='handing'?'待发货':'交易完成'}}<Button v-if = "datas.status == 'handing'" style = 'margin-left:10px'type="info" size = 'small' @click = "Delivergoods = true" >发货</Button></p> 
                    <p  style = 'color:#444;font-size:12px;' v-if = "datas.status != 'handing'" >订单已于 {{datas.time}}发货完成</p>
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
                </table>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                商品信息
            </p>
            <Table height="400" :loading="loading":columns="columns" :data="data"></Table>
        </Card>

        <Modal v-model="Delivergoods" width="560">
            <p slot="header" style="color:#57c5f7;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>订单发货</span>
            </p>
            <div>
                <table class = 'ortab'>
                    <tr>
                        <td>订单编号：</td><td width = '200'>{{datas.pickup_num}}</td>
                        <td>下单时间：</td><td>{{datas.create_time}}</td>
                    </tr>
                    <tr>
                        <td style = 'text-align:right'>收货人：</td><td>{{datas.info_address.name}}</td>
                        <td>电话号码：</td><td>{{datas.info_address.phone}}</td>
                    </tr>
                    <tr><td colspan="1">收货地址：</td><td colspan="3">{{datas.info_address.province+" "+datas.info_address.city+" "+datas.info_address.district+" "+datas.info_address.detail}}</td></tr>
                </table>
                <Table :loading="loading":columns="columns" :data="data"></Table>
                <br><b>选择物流公司</b><br>
                <Select style="width:200px;padding:5px 0px;" v-model="logis" @on-change="getLogis">
                    <Option v-for="item in logistics" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                 <Input v-model="order" placeholder="请输入物流单号..." :disabled = "isdisabled" style="width: 300px"></Input>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long :loading="modal_loading" @click = 'consignment' >确认发货</Button>
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
        step:50,
        Delivergoods:false,
        logis:'无需物流',
        locode:'',
        order:'',
        req_obj:{
            url:'/product/get_pickup_info',
            id:'',
        },
        sen_obj:{
            url:'/product/send_pickup',
        },
        logistics:[],
        columns:[
            {
                title: '商品图片',
                key: "pics",
                render: (h, params) => {
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: params.row.cloud_store_info.info_pros.pics[0]
                            },

                            style: {
                                width: '40px',
                                height: '40px',
                                margin: '3px',
                            },
                        }),
                    ]);
                }
            },
            {
                title: '商品名称',
                key: 'rnak',
                render:(h,params) => {
                    return params.row.cloud_store_info.name;
                },
            },
            {
                title: '数量',
                key: 'num'
            },

        ],
        datas:[],
        data:[],
    }
  },
  computed:{
           isdisabled:function(){
               if(this.logis == '无需物流'){
                   return true;
               }else{
                   return false;
               }
           },
  },
  methods:{
            getLogis:function(name){
                this.locode  = name;
            },
            get_logistics:function(){
            this.$http.get('/order/_x_get_shiplist').then(res => {
                    let arr = res.body.out.datas;
                    this.logistics.push({value:'无需物流',label:'无需物流'});
                    var self=this;
                    for(var item in arr){
                        self.logistics.push({value:arr[item].code,label:arr[item].name})
                    }
                })
            },
            get_data:function(){ 
                this.$http.get(this.req_obj.url+"?id="+this.req_obj.id,).then(res => {
                        this.datas = res.body.out.datas;
                        this.data = res.body.out.datas.info_cloud_store
                    })
            },
            consignment:function(){
                let send_infos = [{name:this.logis,code:this.locode,num:this.datas.pickup_num}]
                this.$http.post(this.sen_obj.url,{num:this.$route.params.id,send_infos:send_infos}).then(res => {
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
      this.req_obj.id = this.$route.params.id;
      this.get_logistics();
      this.get_data();
  }
}
</script>


