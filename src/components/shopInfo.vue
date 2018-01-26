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
        <Card dis-hover>
            <p slot="title">
                {{title}}
            </p>
            <Row style = 'margin:10px 0;'>
                <Col>
                    <table class = 'tab'>
                        <tr>
                            <td>商品名称 : </td>
                            <td><Input placeholder="商品名称" v-model="goods_obj.name" style="width: 300px"></Input></td>
                        </tr>
                        <tr>
                            <td>商品卖点 : </td>
                            <td><Input type="textarea" v-model="goods_obj.intro" placeholder="商品卖点" style="width: 300px"></Input></td>
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
                                    action="/other/upload_img"
                                    style="display: inline-block;width:58px;">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="camera" size="20"></Icon>
                                    </div>
                                </Upload>
                                <Modal title="View Image" v-model="visible">
                                    <img :src=" imgName" v-if="visible" style="width: 100%">
                                </Modal>
                            </td>
                        </tr>
                    </table>
                </Col> 
            </Row> 
        </Card><br>
        <Card dis-hover >
            <p slot="title">
                价格库存
            </p>
            <div >
                <table width = '100%'>
                    <tr>
                        <td>
                            <Select v-model="role[0]" >
                                <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td><InputNumber  v-model="goods_obj.price_default.price_p0"></InputNumber> ￥</td>
                        <td>
                            <Select v-model="role[1]" >
                                <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td><InputNumber v-model="goods_obj.price_default.price_p1"></InputNumber> ￥</td>
                        <td>
                            <Select v-model="role[2]" >
                                <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td><InputNumber v-model="goods_obj.price_default.price_p2"></InputNumber> ￥</td>
                        <td>
                            <Select v-model="role[3]">
                                <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td><InputNumber v-model="goods_obj.price_default.price_p3"></InputNumber> ￥</td>
                    </tr>
                </table>
            </div>
        </Card><br>
        <Card dis-hover>
            <p slot="title">
                其他设置
            </p>
            <div >
                <table>
                    <tr>
                        <td width ='80'>建议零售价</td>
                        <td><InputNumber v-model="goods_obj.price_default.price_commend"></InputNumber> ￥</td>
                        <td width ='80'>最小购买</td>
                        <td><InputNumber v-model="goods_obj.minprice"></InputNumber> ￥</td>
                    </tr>
                    <tr>
                        <td>商品详情:</td>
                    </tr>
                </table><br>
                <div id = 'edit'></div>
            </div>
        </Card>
        <Button type = 'info' size= 'large'  :loading="loading"  style  ='float:right;margin:25px 0px' @click = "publishGoods">上架</Button>
    </div>
</template>

<script>
export default {
  name: 'addShop',
  data () {
    return {
        title:'',
        loading:false,
        data:{},
        defaultList: [
        ],
        imgName: '',
        visible: false,
        uploadList: [],
        role:[],
        roles:[
            {value:'price_p0',label:'联创'},
            {value:'price_p1',label:'省级代理'},
            {value:'price_p2',label:'省级代理'},
            {value:'price_p3',label:'门店'},
        ],
        goods_obj:{
            url:'/product/_x_add_product',
            id:'',
            category:'默认分类',
            name:'',
            intro:'',
            pics:[],
            mobile_html:'暂无商品简介',
            price_default:{price_p0:0,price_p1:0,price_p2:0,price_p3:0,price_commend:0,},
            minprice:0,
            skus:[],
        },
        info_obj:{
            url:'/product/_x_get_product',
            id:'',
        }
    }
  },
  methods:{
    setPics:function(pics){
        for(let item in pics){
            this.uploadList.push({
                name:pics[item],
                url:"https://gbl.sty.sztcmdiet.com/"+pics[item],
                status:"finished",
                percentage:100,
                uid:'1234567894123'
            });
        }
    },
    handleView (name) {
                this.imgName = name;
                this.visible = true;
    },
    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        let pics = this.goods_obj.pics;
        for(let item in pics){
            if(pics[item] == file.name){
                pics.splice(item,1);
            }
        }
    },
    handleSuccess (res, file) {
        // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        // this.goods_obj.pics.push(file.url);
        file.url = res.out.file.access_path;
        file.name = 'https://gbl.sty.sztcmdiet.com/'+ res.out.file.access_path;
        this.goods_obj.pics.push(file.url);
        console.log("文件: " + JSON.stringify(file));
        console.log("请求: " + JSON.stringify(res));
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '图片 ' + file.name + ' 格式不正确, 请上传 JPG 或 PNG 格式的图片'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '文件大小超过限制',
            desc: '文件  ' + file.name + ' 太大, 不能超过2M.'
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
    },

    publishGoods:function(){
        this.loading = true;
        let data = this.goods_obj;
        let flag = false;
        //判断价格库存是否重复
        var s = this.role.join(",")+",";
        for(var i=0;i<this.role.length;i++) {
            if(s.replace(this.role[i]+",","").indexOf(this.role[i]+",")>-1) {
                flag = true;
                break;
            }
        }
        if(flag){
            this.$Notice.error({
                title: '价格库存角色不能重复!',
            });
            this.loading = false;
            return;
        }

        let p0 = this.role[0]
        let p1 = this.role[1]
        let p2 = this.role[2]
        let p3 = this.role[3]
        
        data.price_default[p0] = data.price_default.price_p0 * 100;
        data.price_default[p1] = data.price_default.price_p1 * 100;
        data.price_default[p2] = data.price_default.price_p2 * 100;
        data.price_default[p3] = data.price_default.price_p3 * 100;
        data.price_default['price_commend'] = data.price_default.price_commend * 100;

            let skus = {};
            skus['pics'] = data.pics;
            skus[p0] = data.price_default.price_p0;
            skus[p1] = data.price_default.price_p1;
            skus[p2] = data.price_default.price_p2;
            skus[p3] = data.price_default.price_p3;
            skus['price_commend'] = data.price_default.price_commend;
            skus['variants'] = {"无规格":"无规格"};
            data.skus = [];
            data.skus.push(skus);

        console.log(JSON.stringify(this.role,0,4));
        data.mobile_html =  this.editor.txt.html();
        this.title=="添加商品"?delete data.id:"";
        console.log("goods: "+JSON.stringify(data,0,4));
        this.$http.post(data.url,data).then(res => {
            if(res.body.out.status){
                this.$Notice.info({
                    title: '商品上架成功!',
                });
                this.loading = false;
                this.$router.push('/shopList');
            }else{
                this.$Notice.error({
                    title: '商品上架失败!',
                });
                this.loading = false;
            }
        })
    },
    get_info:function(){
        let url = this.get_url(this.info_obj);
        this.$http.get(url).then(res => {
            let shop = res.body.out.product;
            let skus = res.body.out.skus;
            skus[0].pics = shop.pics;
            this.role = ['price_p0','price_p1','price_p2','price_p3']
            shop.price_default.price_p0  = shop.price_default.price_p0 / 100;
            shop.price_default.price_p1 = shop.price_default.price_p1 / 100;
            shop.price_default.price_p2 = shop.price_default.price_p2 / 100;
            shop.price_default.price_p3 = shop.price_default.price_p3 / 100;
            shop.price_default.price_commend = shop.price_default.price_commend / 100;
            
            let data = {};
                data = {
                    url:this.goods_obj.url,
                    id:shop.id,
                    category:shop.id_f_pro_category,
                    name:shop.name,
                    intro:shop.intro,
                    pics:shop.pics,
                    mobile_html:'暂无商品简介',
                    price_default:shop.price_default,
                    minprice:0,
                    skus:[{
                        pics:shop.pics,
                        price_p0:shop.price_default.price_p0,
                        price_p1:shop.price_default.price_p1,
                        price_p2:shop.price_default.price_p2,
                        price_p3:shop.price_default.price_p3,
                        price_commend:shop.price_default.price_commend,
                        variants:{"无规格":"无规格"}
                    }],
                }

            this.editor.txt.html(shop.mobile_html);
            console.log(JSON.stringify(res.body.out,0,4));
            this.goods_obj = data;
            this.setPics(shop.pics);

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
                self.editor.txt.html("<p style = 'color:#999;font-size:13px;'>　这里填写商品详信息　</p>");
            }
        },


    },
    mounted(){
        this.edit_swith();
        this.uploadList = this.$refs.upload.fileList;
        if(this.$route.params.type == 'add'){
            this.title = '添加商品'
        }else{
            this.title = '修改商品'
            this.info_obj.id = this.$route.params.id;
            this.get_info();
        }
    }
}
</script>


