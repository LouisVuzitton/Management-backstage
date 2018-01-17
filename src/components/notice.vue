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
                    <Input v-model="input_value" placeholder="Enter something..." style="width: 300px"></Input>
                    <Select v-model="select_value" style="width:200px;padding:5px 0px;">
                        <Option v-for="item in select_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button  type="info" icon="ios-search">Search</Button>
                    <Button type="info" @click = 'modal_addpar = true' style = 'display:none;'>添加合伙人</Button>
                    <Table :highlight-row="true" :stripe="true" :columns="columns" :data="datas"></Table>
                    <Page :total="page_total" style = 'padding:24px 0px'></Page>
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
                            <Button type="info" size="large" long :loading="modal_loading" >Determine</Button>
                        </div>
                    </Modal>
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
      modal_addpar:false,
      modal_loading:false,
      select_value:'no',
      input_value:'',
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
                        title: '公告标题',
                        key: 'name',
                        width:'200px',
                    },
                    {
                        title: '发布时间',
                        key: 'age',
                        width:'200px',

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
                                            this.$router.push('noticeInfo/up/1');
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
                                    }, 'Delete')
                                ])
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
            let url = '/admin/get_usr_review_list?'+'page='+e+"&search_key="+this.select_value;
            this.$http.get(url).then(res => {
                // this.page_total = res.body.out.count;
                // this.datas = res.body.out.datas;
                // this.roles = res.body.out.map_roles;
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


