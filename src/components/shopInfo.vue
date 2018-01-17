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
                            <td>商品名称 : </td>
                            <td><Input placeholder="Enter something..." style="width: 300px"></Input></td>
                        </tr>
                        <tr>
                            <td>商品卖点 : </td>
                            <td><Input type="textarea" placeholder="Enter something..." style="width: 300px"></Input></td>
                        </tr>
                        <tr>
                            <td>商品图片 : </td>
                            <td>
                                <div class="demo-upload-list" v-for="item in uploadList">
                                    <template v-if="item.status === 'finished'">
                                        <img :src="item.url">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                    </template>
                                </div>
                                <Upload
                                    ref="upload"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="2048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload"
                                    multiple
                                    type="drag"
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    style="display: inline-block;width:58px;">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="camera" size="20"></Icon>
                                    </div>
                                </Upload>
                                <Modal title="View Image" v-model="visible">
                                    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                </Modal>
                            </td>
                        </tr>
                    </table>
                </Col> 
            </Row> 
        </Card>
        <Card>
            <p slot="title">
                价格库存
            </p>
            <div >
                <table width = '100%'>
                    <tr>
                        <td>零售价</td>
                        <td><InputNumber ></InputNumber> ￥</td>
                        <td>管理合伙人</td>
                        <td><InputNumber ></InputNumber> ￥</td>
                        <td>城市合伙人</td>
                        <td><InputNumber ></InputNumber> ￥</td>
                        <td>合伙人</td>
                        <td><InputNumber ></InputNumber> ￥</td>
                    </tr>
                </table>
            </div>
        </Card>
        <Card>
            <p slot="title">
                其他设置
            </p>
            <div >
                <table>
                    <tr>
                        <td width ='65'>最小购买</td>
                        <td><InputNumber ></InputNumber> ￥</td>
                    </tr>
                </table>
            </div>
        </Card>
        <Button type = 'info' size= 'large'  :loading="loading"  style  ='float:right;margin:15px 0px'>上架</Button>
    </div>
</template>

<script>
export default {
  name: 'addShop',
  data () {
    return {
        title:'',
        loading:true,
        defaultList: [
            {
                'name': 'a42bdcc1178e62b4694c830f028db5c0',
                'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
            },
            {
                'name': 'bc7521e033abdd1e92222d733590f104',
                'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
            }
        ],
        imgName: '',
        visible: false,
        uploadList: []
    }
  },
  methods:{
    handleView (name) {
                this.imgName = name;
                this.visible = true;
    },
    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
    handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
            });
        }
        return check;
    }

  },
  mounted(){
      this.uploadList = this.$refs.upload.fileList;

      if(this.$route.params.type == 'add'){
          this.title = '添加商品'
      }else{
          this.title = '修改商品'
      }
  }
}
</script>


