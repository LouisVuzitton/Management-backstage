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
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            销售总额(元)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            余额总额(元)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            充值总额(元)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            奖励总额(元)
                        </p>
                        <b>50</b>
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
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现总额(元)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现手续费(元)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现成功(笔)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6">
                    <Card style="width:95%;height:110px;float:left;">
                        <p slot="title">
                            提现失败(笔)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                资金记录
            </p>
            <Input v-model="req_obj.search_value" placeholder="Enter something..." style="width: 300px"></Input>
            <Select v-model="req_obj.search_key" style="width:200px;padding:5px 0px;">
                <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button  type="info" icon="ios-search" @click="get_data(1)">Search</Button>
            <Table height="200" :loading="loading":columns="columns" :data="data"></Table>
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
        page_total:100,
        req_obj:{
            url:'xxx.com',
            ordersta:'',
            search_value:'',
            search_key:'no',
            search_type:'no',
        },
        select_data:[
            {
                value: 'name',
                label: '姓名'
            },
            {
                value: 'phone',
                label: '手机号'
            },
        ],
        columns:[
            {
                title: '流水号',
                key: 'rnak'
            },
            {
                title: '类型',
                key: 'rnak',
                width:'100px'
            },
            {
                title: '业务  ',
                key: 'rnak'
            },
            {
                title: '时间',
                key: 'rnak'
            },
            {
                title: '金额',
                key: 'rnak'
            },
            {
                title: '姓名',
                key: 'rnak'
            },
            {
                title: '手机号',
                key: 'rnak',
                width:'100px'
            },
        ],
        data:[]
    }
  },
  methods:{
        get_data: function (e) {
            this.loading = true; //开启表格数据加载样式
            let url = this.get_url(this.req_obj,e);
            console.log(url);
            this.$http.get(url).then(res => {
                this.loading = false;
                this.page_total = res.body.out.count;
                this.datas = res.body.out.datas;
            })
        },
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
  },
  mounted(){
      this.get_data(1);
  }
}
</script>


