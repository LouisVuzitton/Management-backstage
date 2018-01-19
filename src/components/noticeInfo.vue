<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab tr td{
    height:60px;
    width:80px;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}


</style>
<template>
    <div>
        <Card>
            <p slot="title">
                {{title}}
            </p>
            <Row style = 'margin:10px 0;'>
                <Col>
                    <table class = 'tab'>
                        <tr>
                            <td>公告标题 : </td>
                            <td><Input placeholder="Enter something..." v-model="notice_obj.title" style="width: 300px"></Input></td>
                        </tr>
                        <tr>
                            <td>公告内容 : </td>
                            <td>
                            </td>
                        </tr>
                    </table>
                    <div>
                        <div id="edit"></div>
                    </div>
                </Col> 
            </Row> 
        </Card>

        <Button type = 'info' size= 'large'  :loading="loading"  style  ='float:right;margin:50px 0px' @click="publishNotice">发布公告</Button>
    </div>
</template>

<script>
export default {
  name: 'noticeInfo',
  data () {
    return {
        title:'',
        loading:false,
        winEditor:'',
        editor:'',
        notice_obj:{
            url:'/admin/add_notice',
            id:'',
            title:'',
            content:'',
        },
        del_obj:{
            url:"/admin/del_notice"
        },
        info_obj:{
            url:"/user/notice",
            id:"",
        }
    }
  },
  methods:{
        edit_swith: function () {
             //-------------富文本编辑器-------------------
            var self = this;
                if (!self.winEditor || $('#edit').html() == "") {
                    console.log();
                    self.winEditor = window.wangEditor
                    self.editor = new self.winEditor('#edit')
                    self.editor.customConfig = {
                        uploadImgServer: '/other/upload_imgs',
                        uploadImgParams: false,
                        showLinkImg: false,
                    }

                    self.editor.customConfig.uploadImgHooks = {
                        success: function (xhr) { alert('成功'); console.log(xhr); },
                        error: function (xhr) { alert('错误'); },
                    }
                    self.editor.create();
                    self.editor.txt.html("<p style = 'color:#999;font-size:13px;'>　这里填写公告详情信息　</p>");
                }
        },
        publishNotice:function(){
            this.loading = true;
            let data = this.notice_obj;
            this.title=="添加公告"?delete data.id:"";
            data.content =  this.editor.txt.html();
            console.log("notice: "+JSON.stringify(data,0,4));
            this.$http.post(data.url,data).then(res => {
                if(res.body.out.status){
                    this.$Notice.info({
                        title: '公告发布成功!',
                    });
                    this.loading = false;
                    this.$router.push('/notice');
                }else{
                    this.$Notice.error({
                        title: '公告发布失败!',
                    });
                }
            })
        },
    get_info:function(){
        let url = this.get_url(this.info_obj);
        console.log(url);
        this.$http.get(url).then(res => {
            console.log(res);
            this.notice_obj.content = res.body.out.data.content;
            this.notice_obj.title = res.body.out.data.title;
            this.editor.txt.html(res.body.out.data.content);
        })
    },
    get_url: function(obj){
        let url = obj.url+"?";
        for(let item in obj){
            if(item !='url'){
                obj[item]?url+=item+"="+obj[item]+"&":"";
            }
        }
        return url;
    },
  },
  mounted(){
      this.edit_swith();
      if(this.$route.params.type == 'add'){
          this.title = '添加公告'
      }else{
          this.title = '修改公告'
          this.info_obj.id = this.$route.params.id;
          this.get_info();
      }
  }
}
</script>


