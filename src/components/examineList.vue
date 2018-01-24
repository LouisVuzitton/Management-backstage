<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--客户列表-->
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
                    <Input v-model="input_value" placeholder="请输入姓名或手机号码" style="width: 300px"></Input>
                    <Select v-model="select_value" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" @click="get_data(1)" :loading="loading" icon="ios-search">搜索</Button>
                    <Button type="info" @click = 'modal_addpar = true' style = 'display:none;'>添加合伙人</Button>
                    <Table :highlight-row="true" :stripe="true" :height='H':columns="columns" :loading="tableLoading" :data="datas"></Table>
                    <Page :total="page_total" on-change="get_data" style = 'padding:24px 0px'></Page>
                </div>
            </transition>
         </Row>
    </div>
    
</template>

<script>
import moment from 'moment'
export default {
  name: 'examineList',
  data () {
    return {
      H:'',
      modal_addpar:false,
      modal_loading:false,
      loading:false,
      Role:{
          usr_p1:'管理合伙人',
          usr_p2:'城市合伙人',
          usr_p3:'合伙人',
      },
      tableLoading:false,
      select_value:'',
      input_value:'',
      req_obj:{
            url:'',
            page:0,
            select_value:'no',
            input_value:'',
            id:'',
      },
      page_total:100,
      roles:[],
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
      columns: [
                    {
                        title: '姓名',
                        key: 'realname',
                        width:'200px',
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                    },
                    {
                        title: '申请时间',
                        key: 'create_time',
                        render: (h, params) => {
                            return moment.unix(params.row.apply_time).format('YYYY-MM-DD HH:mm:ss');
                        }
                    },
                    {
                        title: '加入时间',
                        key: 'create_time',
                        render: (h, params) => {
                            return moment.unix(params.row.create_time).format('YYYY-MM-DD HH:mm:ss');
                        }
                    },
                    {
                        title: '级别',
                        key: 'role',
                        render: (h, params) => {
                        console.log(params.row);
                            return h('div', [
                                h('span', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                    }
                                },this.Role[params.row.role]),
                            ]);
                        }
                    },{
                        title:'操作',
                        width:'100px',
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
                    }
      ],
      datas: []

    }
  },
  methods:{
        get_data: function (e) {
            e?e--:e;
            this.tableLoading=true;
            /*初始化传参对象 */
            this.req_obj.url='/admin/get_usr_list';   //获取客户列表
            if(this.input_value!='' && this.select_value!=''){
                /*点击查询增加loading状态 */
                this.loading=true;
                this.req_obj.select_value=this.select_value;
                this.req_obj.input_value=this.input_value;
                this.req_obj.page=e;
            }
            let url = this.req_url();

            this.$http.get(url).then(res => {
                this.page_total = res.body.out.count;
                this.datas = res.body.out.datas;
                this.roles = res.body.out.map_roles;
                this.loading=false;
                this.tableLoading=false;
            })
        },
         req_url: function(){
            /*获取参数返回url*/
            let url='';
            if(this.req_obj.select_value!=''&&this.req_obj.input_value!=''){
                url=this.req_obj.url+"?page="+this.req_obj.page+"&search_key="+this.req_obj.select_value+"&search_value="+this.req_obj.input_value;
            }else{
                url=this.req_obj.url+"?page="+this.req_obj.page+"&search_key="+this.req_obj.select_value;
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


