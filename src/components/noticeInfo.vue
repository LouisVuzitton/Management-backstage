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
                            <td><Input placeholder="Enter something..." style="width: 300px"></Input></td>
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

        <Button type = 'info' size= 'large'  :loading="loading"  style  ='float:right;margin:50px 0px'>发布公告</Button>
    </div>
</template>

<script>
export default {
  name: 'noticeInfo',
  data () {
    return {
        title:'',
        loading:true,
        winEditor:'',
        editor:'',
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
  },
  mounted(){
      this.edit_swith();
      if(this.$route.params.type == 'add'){
          this.title = '添加公告'
      }else{
          this.title = '修改公告'
      }
  }
}
</script>


