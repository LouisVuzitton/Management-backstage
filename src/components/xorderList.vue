<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}

.toux{
    border-radius: 50%;
    width:100%;
    height:100%;
    float:left;
}

</style>
<template>
    <div>
        <Row>
            <transition name="slide-fade">
                <div>
                    <Input v-model="req_obj.search_value" placeholder="请输入您要搜索的内容" style="width: 300px"></Input>
                    <Select v-model="req_obj.search_key" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                     <Button  type="info" icon="ios-search" @click="get_data(1)">搜索</Button>
                    <Tabs :value="req_obj.status" :height = 'H' @on-click="setStatus">
                        <TabPane label="全部" name="all">
                            <Table :highlight-row="true" :height = "H" :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                            <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                        </TabPane>
                        <TabPane label="代付款" name="raw">
                            <Table :highlight-row="true" :height = "H" :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                            <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                        </TabPane>
                        <TabPane label="待发货" name="pay">
                            <Table :highlight-row="true" :height = "H" :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                            <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                        </TabPane>
                        <TabPane label="交易完成" name="ok">
                            <Table :highlight-row="true" :height = "H" :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                            <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                        </TabPane>
                        <TabPane label="交易关闭" name="cancel">
                            <Table :highlight-row="true" :height = "H" :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                            <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                        </TabPane>
                    </Tabs>
                   
                    
                    
                </div>
            </transition>
         </Row>
    </div>
    
</template>

<script>
export default {
  name: 'ctemrAudit',
  data () {
    return {
      H:'',
      page_total:100,
      loading:true,
      req_obj:{
        url:'/order/_x_get_order_list',
        status:'all',
        search_key:'no',
        search_value:'',
      },
      roles:[],
      select_data:[
            {
                value: 'no',
                label: '全部',
            },
            {
                value: 'name',
                label: '姓名',
            },
            {
                value: 'phone',
                label: '手机号',
            },
             {
                value: 'order_num',
                label: '订单号',
            },
      ],
      order_sats:[
            {
                value: 'all',
                label: '全部',
            },
            {
                value: 'raw',
                label: '待付款',
            },
            {
                value: 'pay',
                label: '待发货',
            },
            {
                value: 'ok',
                label: '交易完成',
            },
            {
                value: 'cancel',
                label: '交易关闭',
            },
      ],
      columns: [
                    {
                        title: '订单号',
                        key: 'order_num',
                    },
                    {
                        title: '订单金额',
                        key: 'origin_money',
                        render:(h,params) => {
                            return '￥'+(params.row.origin_money/100).toFixed(2);
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        render: (h,params) => {
                            switch(params.row.status){
                                case 'raw' : return '待付款';break;
                                case 'pay' : return '待发货';break;
                                case 'ok' : return '交易完成';break;
                                case 'cancel' : return '交易关闭';break; 
                                default : return '状态异常';break;
                            }
                        }
                    },
                    {
                        title: '下单时间',
                        key: 'create_time',
                        render: (h, params) => {
                            return moment.unix(params.row.create_time).format('YYYY-MM-DD HH:mm:ss');
                        }
                    },
                    {
                        title: '姓名',
                        key: "info_usr",
                        render: (h, params) => {
                            return params.row.info_usr.realname;
                        }
                    },
                    {
                        title: '手机号码',
                        key: 'info_usr',
                        render: (h, params) => {
                            return params.row.info_usr.phone;
                        }
                    },{
                        title:'操作',
                        width:'80px',
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
                                            this.$router.push('/xorderInfo/'+params.row.order_num);
                                        }
                                    }
                                }, '查看'),
                            ]);
                        }
                    }
      ],
      datas: []

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
        setStatus:function(name){
            this.req_obj.status = name;
            this.get_data(1);
        }
  },
  mounted(){
      this.H = window.innerHeight*0.64;
      if(this.$route.params.type == 'xs'){
          this.req_obj.status = 'pay'
      }
      this.show = true;
      this.get_data(1);
  }
}
</script>


