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
.num_color{
    color:#119977;
    font-size:50px;
    font-weight: bold
}
.title_color{
    color:#999;
    font-size:16px;
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
                    <Button  type="primary" @click="goto('noticeInfo/add/0')">添加公告</Button><br>
                    <Input v-model="req_obj.search_value" placeholder="Enter something..." style="width: 300px"></Input>
                    <Select v-model="req_obj.search_key" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search" @click="get_data(1)">Search</Button>
                    <Button type="info" @click = 'modal_addpar = true' style = 'display:none;'>添加合伙人</Button>
                    <Table :highlight-row="true" :loading="loading" :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                </div>
            </transition>
         </Row>
    </div>
    
</template>

<script>
export default {
  name: 'witdsCash',
  data () {
    return {
      loading:false,
      page_total:100,
      req_obj:{
        url:'/admin/get_notice_list',
        ordersta:'',
        search_value:'',
        search_key:'no',
        search_type:'no',
      },
      del_obj:{
          url:'/admin/del_notice',
      },
      roles:[],
      select_data:[
            {
                value: 'no',
                label: '全部',
            },
            {
                value: 'name',
                label: '姓名'
            },
            {
                value: 'phone',
                label: '手机号'
            },
      ],
      columns: [
                    {
                        title: '公告标题',
                        key: 'name',
                    },
                    {
                        title: '发布时间',
                        key: 'age',
                    },
                    {
                        title: '发布人',
                        key: 'address',
                    },
                    {
                        title: '内容',
                        key: 'address',
                    },{
                        width:'150px',
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
                                            this.$router.push('noticeInfo/up/'+params.row.id);
                                        }
                                    }
                                }, '修改'),

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
                                    }, 'Delete')
                                ])
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
        del_info:function(url,id){
            console.log(id+'  '+url);
             this.$http.post(url,{ids:[id]}).then(res => {
                if(res.body.out.status){
                    this.$Notice.info({
                        title: '公告删除成功!',
                    });
                    this.get_data(1);
                }else{
                    this.$Notice.error({
                        title: '公告失败!',
                    });
                }
            })
        },
        goto:function(url){
            this.$router.push(url);
        }

  },
  mounted(){
      this.show = true;
      this.get_data(1);
  }
}
</script>


