<!-- Add "scoped" attribute to limit CSS to this component only -->
import { unix } from '_moment@2.20.1@moment';
<!--账务概况-->
<style scoped>
.Card{
    float:left;
}
.Card span{
    float:left;
    margin:0 20px;
    margin-top:30px;
}
.Card p{
    color:#2d8cf0;
}
.Card b{
  color:#e96900;
}

</style>
<template>
    <div>
        <Card>
            <p slot="title">
                资金概况
            </p>
            <Row style = 'width:100%;text-align:center;'>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            销售总额(元)
                        </p>
                        <b>{{(init['销售总额']/100).toFixed(2)}}</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            余额总额(元)
                        </p>
                        <b>{{(init['余额总额']/100).toFixed(2)}}</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            充值总额(元)
                        </p>
                        <b>{{(init['充值总额']/100).toFixed(2)}}</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            奖励总额(元)
                        </p>
                        <b>{{(init['奖励总额']/100).toFixed(2)}}</b>
                    </Card>   
                </Col>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                提现概况
            </p>
            <Row style = 'width:100%;text-align:center;'>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现总额(元)
                        </p>
                        <b>{{(init['提现总额']/100).toFixed(2)}}</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现手续费(元)
                        </p>
                        <b>{{(init['提现手续费']/100).toFixed(2)}}</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现成功(笔)
                        </p>
                        <b>{{init['提现成功']}}</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card dis-hover style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现失败(笔)
                        </p>
                        <b>{{init['提现失败']}}</b>
                    </Card>   
                </Col>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                资金记录
            </p>
            <Input v-model="search_value" placeholder="请输入您要搜索的内容" style="width: 300px"></Input>
            <Select v-model="search_key" style="width:200px;padding:5px 0px;">
                <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button  type="info" icon="ios-search" @click="get_data(1)">搜索</Button>
            <Table height="500" :loading="loading":columns="columns" :data="data"></Table>
            <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'accSitu',
  data () {
    return {
        loading:false,
        page_total:1,
        search_key:'',
        search_value:'',
        req_obj:{
            url:'/admin/bills',
            ordersta:'',
            search_value:'',
            search_key:'no',
            search_type:'no',
        },
        select_data:[
            {
                value: '',
                label: '全部'
            },
            {
                value: 'realname',
                label: '姓名'
            },
            {
                value: 'phone',
                label: '手机号'
            },
            {
                value: 'out_trade_no',
                label: '流水号'
            }
        ],
        columns:[
            {
                title: '流水号',
                key: 'out_trade_no'
            },
            {
                title: '类型',
                key: 'account_type',
                width:'100px'
            },
            {
                title: '业务  ',
                key: 'opera_type'
            },
            {
                title: '时间',
                key: 'time',
                render(h,params){
                    return moment.unix(params.row.time).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '金额',
                key: 'cash',
                render(h,params){
                    if(params.row.pay_type=='balance')
                        return '￥'+(params.row.alter_balance/100).toFixed(2);
                    else
                        return '￥'+(params.row.price/100).toFixed(2);   
                }
            },
            {
                title: '姓名',
                key: 'realname'
            },
            {
                title: '手机号',
                key: 'phone',
                width:'150px'
            },
        ],
        init:{},
        data:[]
    }
  },
  methods:{
        // get_data: function (e) {
        //     this.loading = true; //开启表格数据加载样式
        //     let url = this.get_url(this.req_obj,e);
        //     console.log(url);
        //     this.$http.get(url).then(res => {
        //         this.loading = false;
        //         // this.page_total = res.body.out.count;
        //         this.datas = res.body.out.datas;
        //     })
        // },
        get_url: function(obj,e){
            e--;
            obj['page'] = e;
            let url = obj.url+"?";
            for(let item in obj){
                if(item !='url'){
                    obj[item]?url+=item+"="+obj[item]+"&":"";
                }
            }
            return url;
        },
        initData(){
            this.$http.get('/admin/about_finance').then(function(res){
                this.init=res.body;
            })
        },
        get_data(e){
            e?e--:e;
            if(this.search_key!='' && this.search_value!=''){
                var temp_obj={};
                temp_obj[this.search_key]=this.search_value;
                this.$http.post(this.req_obj.url,{page:e+'',len:'10',search_obj:temp_obj}).then(function (res) {
                    this.data=res.body.out.new_datas.rows;
                    this.page_total = res.body.out.new_datas.count;
                    console.log(this.data);
                })
            }else{
                 this.$http.post(this.req_obj.url,{page:e+'',len:'10'}).then(function (res) {
                    this.data=res.body.out.new_datas.rows;
                    this.page_total = res.body.out.new_datas.count;
                    console.log(this.data);
                })
            }
        }
  },
  mounted(){
      this.get_data(1);
      this.initData();
  }
}
</script>


