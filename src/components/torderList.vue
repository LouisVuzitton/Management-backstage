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
                    <!-- <ButtonGroup>
                        <Button type="primary">
                            全部
                        </Button>
                        <Button type="primary">
                            代发货
                        </Button>
                        <Button type="primary">
                            已完成
                        </Button>
                    </ButtonGroup><br> -->
                    <Input v-model="req_obj.search_value" placeholder="请输入您要搜索的内容" style="width: 300px"></Input>
                    <Select v-model="req_obj.search_key" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="req_obj.search_type" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in order_sats" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search" @click = "get_data(1)">搜索</Button>
                    <Table :highlight-row="true" :height = 'H' :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
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
      loading:true,
      page_total:100,
      req_obj:{
        url:'xxx.com',
        ordersta:'',
        search_value:'',
        search_key:'no',
        search_type:'no',
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
      ],
      order_sats:[
            {
                value: 'no',
                label: '全部',
            },
            {
                value: '代收款',
                label: '代收款',
            },
            {
                value: '代发货',
                label: '代发货',
            },
            {
                value: '交易完成',
                label: '交易完成',
            },
            {
                value: '交易关闭',
                label: '交易关闭',
            },
      ],
      columns: [
                    {
                        title: '订单号',
                        key: 'name',

                    },
                    {
                        title: '订单金额',
                        key: 'age',


                    },
                    {
                        title: '订单状态',
                        key: 'address',

                    },
                    {
                        title: '下单时间',
                        key: 'address',

                    },
                    {
                        title: '姓名',
                        key: 'address',

                    },
                    {
                        title: '手机号码',
                        key: 'address',
                        width:'180px',
                    },{
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
                                            this.$router.push('torderInfo/1');
                                        }
                                    }
                                }, '查看'),
                            ]);
                        }
                    }
      ],
      datas: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',

                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',

                    },
                                        {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',

                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',

                    },
                                        {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',

                    },
      ]

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
        }
  },
  mounted(){
        this.H = window.innerHeight*0.69 + "px";
      this.show = true;
      this.get_data(1);
  }
}
</script>


