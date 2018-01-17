<!-- Add "scoped" attribute to limit CSS to this component only -->
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

</style>
<template>
    <div>
        <Row>
            <transition name="slide-fade">
                <div>
                    <Input v-model="input_value" placeholder="Enter something..." style="width: 300px"></Input>
                    <Select v-model="select_value" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search">Search</Button>
                    <Button type="info" @click = 'modal_addpar = true' style = 'display:none;'>添加合伙人</Button>
                    <Table :highlight-row="true" :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" style = 'padding:24px 0px'></Page>
                    <Modal v-model="modal_addpar" width="560">
                        <p slot="header" style="color:#2db7f5;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>客户审核</span>
                        </p>
                        <div style="text-align:center">
                            <center>
                            <table>
                                <tr>
                                    <td style = 'text-align:right' width = '60px;' height = '35px;'>姓名：</td>
                                    <td width = '130px;' height = '35px;'>吴伟龙</td>
                                    <td style = 'text-align:right' width = '80px;' height = '35px;'>手机号：</td>
                                    <td width = '130px;' height = '35px;'>13923884707</td>
                                </tr>
                                <tr>
                                    <td style = 'text-align:right' width = '60px;' height = '35px;'>身份证：</td>
                                    <td width = '130px;' height = '35px;'>1234567891234567</td>
                                    <td style = 'text-align:right' width = '60px;' height = '35px;'>地区：</td>
                                    <td width = '130px;' height = '35px;'>广东省-深圳市-南山区</td>
                                </tr>
                                <tr>
                                    <td style = 'text-align:right' colspan="1">地址：</td>
                                    <td colspan="3">深圳南山粤海街道大冲商务中心B座9楼</td>
                                </tr>
                                <tr>
                                    <td colspan="4"></td>
                                </tr>
                                <tr>
                                    <td style = 'text-align:right'>推荐人：</td>
                                    <td>无</td>
                                    <td style = 'text-align:right'>审核等级：</td>
                                    <td>
                                        <Select v-model="select_value" style="width:200px;padding:5px 0px;">
                                            <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </td>
                                </tr>
                            </table>
                            </center>
                        </div>
                        <div slot="footer">
                            <Button type="info" size="large" long :loading="modal_loading" >确认修改</Button>
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
      select_value:'no',
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
                        key: 'name',
                    },
                    {
                        title: '手机号码',
                        key: 'age',

                    },
                    {
                        title: '申请时间',
                        key: 'address',
                    },
                    {
                        title: '推荐人',
                        key: 'address',
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
                                           this.modal_addpar = true;
                                        }
                                    }
                                }, '审核'),

                                // h('Poptip',{
                                //     props: {
                                //         confirm:true,
                                //         title:'您确认删除这条内容吗？',
                                //         width:'200'
                                //     },
                                //     on: {
                                //         'on-ok': () => {
                                            
                                //         }
                                //     }
                                // },[
                                //     h('Button', {
                                //         props: {
                                //             type: 'error',
                                //             size: 'small'
                                //         },
                                //     }, 'Delete')
                                // ])
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
            e?e--:e;
            console.log("搜索条件:" + this.input_value +" -- "+ this.select_value);
            /*初始化传参对象 */
            this.req_obj.url='/admin/get_usr_review_list';
            if(this.input_value!='' && this.select_value!=''){
                this.req_obj.select_value=this.select_value;
                this.req_obj.input_value=this.input_value;
                this.req_obj.page=e;
            }
            this.$http.get(this.req_url()).then(res => {
                console.log(res);
                this.page_total = res.body.out.count;
                this.datas = res.body.out.datas;
                this.roles = res.body.out.map_roles;
                console.log(res.body.out.datas);
            })
        },
        req_url: function(){
            /*获取参数返回url*/
            let url='';
            if(req_obj.select_value!=''&&req_obj.input_value!=''){
                url=this.req_obj.url+"?page="+this.req_obj.page+"&search_key="+this.req_obj.select_value+"&search_value="+this.req_obj.input_value;
            }
            return url;
        }
  },
  mounted(){
      this.show = true;
      this.get_data(1);
  }
}
</script>


