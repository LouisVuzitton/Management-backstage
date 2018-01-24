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
                    <ButtonGroup>
                        <Button type="info" @click = "goto('shopInfo/add/0')">上架商品</Button>
                    </ButtonGroup><br>
                    <Input v-model="req_obj.search_value" placeholder="请输入您要搜索的内容" style="width: 300px"></Input>
                    <Select v-model="req_obj.search_key" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search" @click = "get_data(1)">搜索</Button>
                    <Table :highlight-row="true" :stripe="true" :height = 'H' :loading='loading' :columns="columns" :data="datas"></Table>
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
        url:'/product/_x_get_product_list',
        ordersta:'',
        search_value:'',
        search_key:'no',
        show_status:'all',
      },
      del_obj:{
          url:'/product/_x_del_product',
      },
      roles:[],
      select_data:[
                    {
                        value: 'no',
                        label: '全部',
                    },
                    {
                        value: 'name',
                        label: '商品名称',
                    },
      ],
      columns: [
                    {
                        title: '商品图片',
                        key: 'title_url',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.title_url
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
                        key: 'name',
                    },
                    {
                        title: '零售价',
                        key: 'sku_default',
                        render: (h, params) => {
                            return  '￥'+params.row['price_default'].price_commend/100
                        }
                    },
                    {
                        title: '上架时间',
                        key: 'create_time',
                        render: (h, params) => {
                            return moment.unix(params.row.create_time).format('YYYY-MM-DD HH:mm:ss');
                        }
                    },{
                        title:'操作',
                        width:'125px',
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
                                            this.$router.push('shopInfo/up/'+params.row.id);
                                        }
                                    }
                                }, '编辑'),

                                h('Poptip',{
                                    props: {
                                        confirm:true,
                                        title:'您确认删除这条内容吗？',
                                        width:'200'
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.del_info(this.del_obj.url,params.row.id)
                                        }
                                    }
                                },[
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
      ],
      datas: [],

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
        del_info:function(url,id){
            this.$http.post(url,{id:id}).then(res => {
                if(res.body.out.status){
                    this.$Notice.info({
                        title: '商品删除成功!',
                    });
                    this.get_data(1);
                }else{
                    this.$Notice.error({
                        title: '商品删除失败!',
                    });
                }
            })
        },

        goto:function(url){
            this.$router.push(url);
        },
  },
  mounted(){
      this.H = window.innerHeight*0.65 + "px";
      this.show = true;
      this.get_data(1);

  }
}
</script>


