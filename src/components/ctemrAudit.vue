<!-- Add "scoped" attribute to limit CSS to this component only -->
import moment from 'moment'
<!-- 客户审核列表 Guwen-->
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
.footer{
    vertical-align: middle;
}
.button{
    width: 50%;
    margin-right: 25%;
}
</style>
<template>
    <div>
        <Row>
            <transition name="slide-fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div>
                    <Input v-model="input_value" placeholder="请输入姓名或手机号" style="width: 300px"></Input>
                    <Select v-model="select_value" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search" @click="get_data(1)">Search</Button>
                    <Button type="info" @click = 'modal_addpar = true' style = 'display:none;'>添加合伙人</Button>
                    <Table :highlight-row="true" :loading="loading" :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" on-change="get_data" style = 'padding:24px 0px'></Page>
                    <Modal v-model="modal_addpar" width="560">
                        <p slot="header" style="color:#2db7f5;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>客户审核</span>
                        </p>
                        <div style="text-align:center">
                            <center>
                            <table>
                                <tr>
                                    <td style = 'text-align:right' width = '60px;' height = '35px;'>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</td>
                                    <td width = '130px;' height = '35px;' v-text="customerInfo.realname"></td>
                                    <td style = 'text-align:right' width = '80px;' height = '35px;'>手机号：</td>
                                    <td width = '130px;' height = '35px;' v-text="customerInfo.phone"></td>
                                </tr>
                                <tr>
                                    <td style = 'text-align:right' width = '60px;' height = '35px;'>身份证：</td>
                                    <td width = '130px;' height = '35px;' v-text="customerInfo.idcard"></td>
                                    <td style = 'text-align:right' width = '60px;' height = '35px;'>地&nbsp;&nbsp;&nbsp;&nbsp;区：</td>
                                    <td width = '130px;' height = '35px;' v-text="customerInfo.province+'-'+customerInfo.city+'-'+customerInfo.district"></td>
                                </tr>
                                <tr>
                                    <td style = 'text-align:right' colspan="1">地&nbsp;&nbsp;&nbsp;&nbsp;址：</td>
                                    <td colspan="3" v-text="customerInfo.detail"></td>
                                </tr>
                                <tr>
                                    <td colspan="4"></td>
                                </tr>
                                <tr>
                                    <td style = 'text-align:right'>推荐人：</td>
                                    <td>无</td>
                                    <td style = 'text-align:right'>审核等级：</td>
                                    <td>
                                        <Select v-model="partnerRole" style="width:200px;padding:5px 0px;">
                                            <Option v-for="item in customerRole" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    
                                </tr>
                            </table>
                            </center>
                        </div>
                        <div slot="footer" class="footer">
                            <Button type="info" size="large" @click="makePartner(customerInfo.id)" class="button" :loading="modal_loading" >确认修改</Button>
                        </div>
                    </Modal>
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
      modal_addpar:false,
      modal_loading:false,
      loading:false,
      select_value:'',
      input_value:'',
      partnerRole:'',
      req_obj:{
            url:'',
            page:0,
            select_value:'no',
            input_value:'',
            id:'',
      },
      customerInfo:{},
      page_total:0,
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
      customerRole:[
                    {
                        value: 'usr_p1',
                        label: '管理合伙人'
                    },
                    {
                        value: 'usr_p2',
                        label: '城市合伙人'
                    },
                    {
                        value: 'usr_p3',
                        label: '合伙人'
                    },
      ],
      columns: [
                    {
                        title: '姓名',
                        key: 'realname',
                    },
                    {
                        title: '手机号码',
                        key: 'phone',

                    },
                    {
                        title: '申请时间',
                        key: 'apply_time',
                        render: (h, params) => {
                        return moment.unix(params.row.apply_time).format('YYYY-MM-DD HH:mm:ss');
                    }
                    },
                    {
                        title: '推荐人',
                        key: 'inviter',
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
                                           this.modal_addpar = true;
                                           this.customerInfo = params.row;
                                           console.log(this.customerInfo);
                                        }
                                    }
                                }, '审核'),
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
      ]

    }
  },
  methods:{
        /*初始化页面数据，查询数据渲染列表 */
        get_data: function (e) {
            e?e--:e;
            console.log(this.select_value);
            this.loading=true;
            /*初始化传参对象 */
            this.req_obj.url='/admin/get_usr_review_list';
            if(this.input_value!='' && this.select_value!=''){
                this.req_obj.select_value=this.select_value;
                this.req_obj.input_value=this.input_value;
                this.req_obj.page=e;
            }
            let url = this.req_url();
           
            this.$http.get(url).then(res => {
                this.page_total = res.body.out.count;
                this.datas = res.body.out.datas;
                this.roles = res.body.out.map_roles;
                this.loading = false;
            });
        },
        /*获取参数返回url*/
        req_url: function(){
            let url='';
            if(this.req_obj.select_value!='' && this.req_obj.input_value!=''){
                url=this.req_obj.url+"?page="+this.req_obj.page+"&search_key="+this.req_obj.select_value+"&search_value="+this.req_obj.input_value;
            }else{
                url=this.req_obj.url+"?page="+this.req_obj.page+"&search_key=no";
            }
            return url;
        },
        /*设置客户为合伙人 */
        makePartner:function(id){
            console.log(id);
            this.modal_loading=true;
            this.$http.post('/admin/usr_review',{id:id,role:this.partnerRole,result:'success',content:'通过审核'}).then(res => {
                if(res.body.out.status){
                    this.modal_loading=false;
                    this.modal_addpar = false;
                    this.$Notice.info({
                        title: '审核已完成',
                    });
                }
            })
        }
  },
  mounted(){
      this.show = true;
      this.get_data(1);
  }
}
</script>


