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
        <transition name="slide-fade">
            <div v-if = 'one' >
                <Input v-model="input_value" placeholder="Enter something..." style="width: 300px"></Input>
                <Select v-model="select_value" style="width:200px;padding:5px 0px;">
                    <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button  type="info" icon="ios-search">Search</Button>
                <Button type="info" @click = 'modal_addpar = true'>添加合伙人</Button>
                <Table :highlight-row="true" :stripe="true" :columns="columns1" :data="data8"></Table>
                <Page :total="100" style = 'padding:24px 0px'></Page>
                <Modal v-model="modal_addpar" width="560">
                    <p slot="header" style="color:#118877;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>Confirm the addition</span>
                    </p>
                    <div style="text-align:center">
                        <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
                        <p>Will you delete it?</p>
                    </div>
                    <div slot="footer">
                        <Button type="info" size="large" long :loading="modal_loading" @click="modal_addpar_fun">Determine</Button>
                    </div>
                </Modal>
            </div>
         </transition>

        <transition name="slide-fade">
            <div v-if = 'two' >
                <Card :bordered="false">
                    <center>
                        <Row :gutter="16">
                            <Col span="8">
                                <div class='num_color'>41<span class = 'title_color'> 元</span></div>
                                <div class='title_color'>总销售（采购）</div>
                                
                            </Col>
                            <Col span="8" >
                                <div class='num_color' style = 'color:#ff6600'>12<span class = 'title_color'> 元</span></div>
                                <div class='title_color'>年销售（采购）</div>
                               
                            </Col>
                            <Col span="8" >
                                <div class='num_color' style = 'color:#33cdab'>71<span class = 'title_color'> 元</span></div>
                                <div class='title_color'>月销售（采购）</div>
                            </Col>
                        </Row>
                    </center>
                </Card><br>
                <Card :bordered="false">
                        <Row :gutter="16">
                            <Col span="4">
                               <img src ='/src/assets/toux.jpg'  class = 'toux'>
                            </Col>
                            <Col span="12" >
                               <div style = 'color:#495060;'>
                                    <table>
                                        <tr>
                                            <td style='width:80px;'><b>姓名:</b></td>
                                            <td>
                                               ZHIMING  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>手机号:</b></td>
                                            <td>
                                                15820727395  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>地区:</b></td>
                                            <td>
                                                 广东省 南山区 高新园B出口 大冲商务中心9楼
                                            </td>
                                            
                                        </tr>   
                                        <tr>
                                            <td><b>角色:</b></td>
                                            <td>
                                                合伙人
                                            </td>
                                        </tr>   
                                        <tr>
                                            <td><b>状态:</b></td>
                                            <td>
                                                正常
                                            </td>
                                        </tr>  
                                        <tr>
                                            <td><b>上级:</b></td>
                                            <td>
                                                无
                                            </td>
                                        </tr>  
                                        <tr>
                                            <td><b>开通时间:</b></td>
                                            <td>
                                                2018-01-02 17:23:14
                                            </td>
                                        </tr>  
                                        <tr>
                                            <td><b>最后登录:</b></td>
                                            <td>
                                                2018-01-02 17:23:14
                                            </td>
                                        </tr>  
                                    </table>
                               </div>
                            </Col>
                        </Row>
                </Card>
            </div>
         </transition>
    </div>
    
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      one:true,
      two:false,
      select_value:'',
      input_value:'',
      modal_addpar:false,
      modal_loading:false,
      select_data:[
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
      ],
      columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
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
                                            this.one = false;
                                            this.two = true;
                                        }
                                    }
                                }, 'View'),

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
                                    }, 'Delete')
                                ])
                            ]);
                        }
                    }
      ],
      data8: [
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
      modal_addpar_fun:function(){}
  },
  mounted(){
      this.show = true;
  }
}
</script>


