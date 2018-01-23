<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--客户等级-->
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
.button{
    width: 50%;
    margin-right: 25%; 
}
</style>
<template>
    <div>
        <Row>
            <transition name="slide-fade">
                <div>
                    <Input v-model="input_value" placeholder="Enter something..." style="width: 300px;visibility:hidden"></Input>
                    <Select v-model="select_value" style="width:200px;padding:5px 0px;visibility:hidden">
                        <Option v-for="item in select_data" :value="item.value"  :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search" style="visibility:hidden">搜索</Button>
                    <Button type="info" @click = 'modal_addpar = true' style = 'display:none;'>添加合伙人</Button>
                    <Table :highlight-row="true" :height = 'H' :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" style = 'padding:24px 0px'></Page>
                    <Modal v-model="modal_addpar" width="560">
                        <p slot="header" style="color:#2db7f5;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>客户等级</span>
                        </p>
                        <div style="text-align:center">
                            <center>
                            <table>
                                <tr>
                                    <td width = '80px;' height = '35px;'>等级名称:</td>
                                    <td width = '80px;' height = '35px;'><Input  v-model="editInfo.name" placeholder="Enter something..." style="width: 300px"></Input></td>
                                </tr>
                                <tr>
                                    <td width = '80px;' height = '35px;'>年度任务:</td>
                                    <td width = '80px;' height = '35px;'><Input  placeholder="请设置年度任务量" style="width: 300px"></Input></td>
                                </tr>
                                <tr>
                                    <td width = '80px;' height = '35px;'>首单起订量:</td>
                                    <td width = '80px;' height = '35px;'> <InputNumber ></InputNumber></td>
                                </tr>
                                <tr>
                                    <td width = '80px;' height = '35px;'>月度起订量:</td>
                                    <td width = '80px;' height = '35px;'> <InputNumber ></InputNumber></td>
                                </tr>
                                <tr>
                                    <td>等级权限:</td>
                                    <td>
                                    <CheckboxGroup style = 'margin:15px 0;' size='large'>
                                        <Checkbox label="twitter">
                                            <Icon type="android-person"></Icon>
                                            <span>登录</span>
                                        </Checkbox>
                                        <Checkbox label="facebook">
                                            <Icon type="android-cart"></Icon>
                                            <span>订货</span>
                                        </Checkbox>
                                        <Checkbox label="github">
                                            <Icon type="android-share"></Icon>
                                            <span>邀请</span>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </td></tr>
                            </table>
                            </center>
                        </div>
                        <div slot="footer">
                            <Button type="info" class="button" size="large" long :loading="modal_loading" >确认修改</Button>
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
      H:'',
      modal_addpar:false,
      modal_loading:false,
      select_value:'no',
      input_value:'',
      page_total:100,
      roles:[],
      editInfo:{},
      select_data:[
                    {
                        value: 'name',
                        label: '姓名',
                    },
                    {
                        value: 'phone',
                        label: '手机号',
                    },
      ],
      columns: [
                    {
                        title: '等级名称',
                        key: 'name',
                    },
                    {  
                        title: '登录',
                        key: 'login',
                        render: (h, params) => {
                            if(params.row.login>25){
                                return h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-close-empty',
                                            size: '25',
                                        },
                                        style: {
                                            marginLeft: '10px'
                                        },
                                        })
                                    ])
                                }else{
                                    return h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-checkmark-empty',
                                            size: '25',
                                            color: '#19be6b',
                                        },
                                        style: {
                                            marginLeft: '10px'
                                        },
                                        })
                                    ])
                                }
                            }
                            
                    },
                    {
                        title: '订货',
                        key: 'order',
                        render: (h, params) => {
                            if(params.row.login>25){
                                return h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-close-empty',
                                            size: '25',
                                        },
                                        style: {
                                            marginLeft: '10px'
                                        },
                                        })
                                    ])
                                }else{
                                    return h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-checkmark-empty',
                                            size: '25',
                                            color: '#19be6b',
                                        },
                                        style: {
                                             marginLeft: '10px'
                                        },
                                        })
                                    ])
                                }
                            }
                    },
                    {
                        title: '邀请',
                        key: 'invite',
                        render: (h, params) => {
                            console.log(params.row.age);
                            if(params.row.age>25){
                                return h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-close-empty',
                                            size: '25',
                                        },
                                        style: {
                                             marginLeft: '10px'
                                        },
                                        })
                                    ])
                                }else{
                                    return h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-checkmark-empty',
                                            size: '25',
                                            color: '#19be6b',
                                        },
                                        style: {
                                             marginLeft: '10px'
                                        },
                                        })
                                    ])
                                }
                            }
                    },{
                        title: '操作',
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
                                            this.modal_addpar = true;
                                            this.editInfo=params.row;
                                            console.log(this.editInfo);
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
      datas: [
                {
                    name: 'John Brown',
                    login: 'John Brown',
                    order: 18,
                    invite: 'New York No. 1 Lake Park'
                },
                {
                    name: 'John Brown',
                    login: 'John Brown',
                    order: 18,
                    invite: 'New York No. 1 Lake Park'
                }
      ]

    }
  },
  methods:{
        get_data: function (e) {
            e?e--:e;
            console.log("搜索条件:" + this.input_value +" -- "+ this.select_value);
            let url = '/admin/get_usr_review_list?'+'page='+e+"&search_key="+this.select_value;
            this.$http.get(url).then(res => {
                // this.page_total = res.body.out.count;
                // this.datas = res.body.out.datas;
                // this.roles = res.body.out.map_roles;
            })
        },
  },
  mounted(){
      this.H = window.innerHeight*0.69 + "px";
      this.show = true;
      this.get_data(1);
  }
}
</script>


