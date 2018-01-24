<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orsta p {
    margin: 10px 0;
}
.ortab tr td{
    height:25px;
}
</style>
<template>
    <div>
        <Row>
                <div>
                    <Button  type="info" @click = "add_but = true">添加管理员</Button><br><br>
                    <Table :highlight-row="true" :height = 'H' :loading='loading' :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" style = 'padding:24px 0px' @on-change="get_data"></Page>
                </div>
                <Modal v-model="add_but" width="560" >
                    <p slot="header" style="color:#57c5f7;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>创建管理员</span>
                    </p>
                    <table class = 'ortab'>
                        <tr>
                            <td>管理员账号：</td><td>
                                <Input v-model="add_obj.name" placeholder="请输入管理员账号"  style="width: 300px"></Input>
                            </td>
                        </tr>
                        <tr>
                            <td>管理员密码：</td><td>
                                <Input v-model="add_obj.pwd" placeholder="请输入管理员密码"  style="width: 300px"></Input>
                            </td>
                        </tr>
                        <tr>
                            <td style = 'text-align:right'>管理员角色：</td>
                            <td>
                            <Select style="width:200px;padding:5px 0px;" v-model="add_obj.role" @on-change="getLogis" >
                                <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.name }}</Option>
                            </Select>
                            </td>
                        </tr>
                    </table>

                    <div slot="footer">
                        <Button type="info" class="button" size="large" long :loading="modal_loading" @click="add_admin">确认修改</Button>
                    </div>
                </Modal>
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
      modal_loading:false,
      page_total:100,
      add_but:false,
      req_obj:{
        url:'/admin/all_admin',
      },
      add_obj:{
        url:'/admin/create',
        name:'',
        role:'',
        pwd:''
      },
      delobj:{
        url:'/admin/delete',
      },
      req_role:{
          url:'/admin/get_admin_roles',
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
                        title: '管理员角色',
                        key: 'role',


                    },
                    {
                        title: '状态',
                        key: 'status',
                        render:function(h,params){
                            return params.row.status == 'normal'?'正常':'禁封'
                        }
                    },
                    {
                        title: '操作',
                        key: 'status',
                    },
                    {
                        width:'125px',
                        render: (h, params) => {
                            return h('div', [
                                h('Poptip',{
                                    props: {
                                        confirm:true,
                                        title:'您确认删除这条内容吗？',
                                        width:'200'
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.del_info(params.row.id)
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
                    },
                    
                    
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
                this.datas = res.body.out.datas;
            })
        },
        get_roles: function (e) {
            this.$http.get(this.req_role.url).then(res => {
                this.roles = res.body.out.datas;
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
        add_admin: function () {
            this.modal_loading = true; //开启表格数据加载样式
            this.$http.post(this.add_obj.url,this.add_obj).then(res => {
                this.loading = false;
                if(res.body.out.status){
                    this.$Notice.info({
                        title: '用户添加成功!',
                    });
                    this.modal_loading = false;
                    this.get_data(1);
                }else{
                    this.$Notice.error({
                        title: '用户添加失败!',
                    });
                    this.modal_loading = false;
                }
               
            })
        },
        del_info: function (id) {
            this.$http.post(this.delobj['url'],{id:id}).then(res => {
                if(res.body.out.status){
                    this.$Notice.info({
                        title: '管理员删除成功!',
                    });
                    this.get_data(1);
                }else{
                    this.$Notice.error({
                        title: '管理员删除失败!',
                    });
                }
            })
        }
  },
  mounted(){
      this.H = window.innerHeight*0.69 + "px";
      this.show = true;
      this.get_data(1);
      this.get_roles(1);
  }
}
</script>


