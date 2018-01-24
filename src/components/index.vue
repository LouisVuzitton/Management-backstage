<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Card{
    float:left;
}
.Card span{
    float:left;
    margin:0 20px;
    margin-top:15px;
}
.Card img{
    width:110px;
    height:auto;
}
.bak{
    width:110px;
    height:74px;
    float:left;
}
.Card p{
    color:#2d8cf0
}

.Card span p{
    color:#2d8cf0;
    font-weight: bold;
}


b{
    color:#e96900;
}


</style>
<template>
    <div>
        <Card>
            <p slot="title">
                运营概况
            </p>
            <Row style = 'width:100%;'>
                <center>
                <Col class = 'Card' span="8">
                    <Card dis-hover	 class = 'bak' style="text-align:center;">
                        <Icon type="android-contacts" size="50" color="#FFCC99"></Icon>
                    </Card>   
                    <span>
                        <p>客户总数</p>
                        <p><b>3,333</b></p>
                    </span>
                </Col>
                <Col class = 'Card' span="8">
                    <Card dis-hover	 class = 'bak'>
                        <Icon type="android-cart" size="50" color="#ff9900"></Icon>
                    </Card>   
                    <span>
                        <p>订单总数</p>
                        <p><b>3,333</b></p>
                    </span>
                </Col>
                <Col class = 'Card' span="8">
                    <Card dis-hover	 class = 'bak'>
                        <Icon type="social-yen" size="50" color="#ed3f14"></Icon>
                    </Card>   
                    <span>
                        <p>销售总额</p>
                        <p><b>12,333,333.00</b></p>
                    </span>
                </Col>
                </center>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                待办处理事项
            </p>
            <Row style = 'width:100%;text-align:center;'>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card  @click.native = "goto('/ctemrAudit/sh')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title" >
                            待审核(客户)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card  @click.native = "goto('/witdsCash/tx')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title">
                            待审核(提现)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card  @click.native = "goto('/xorderList/xs')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title">
                            待发货(销售)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
                <Col class = 'Card' span="6" style ='curosr: pointer;' >
                    <Card @click.native = "goto('/torderList/th')" style="width:95%;height:110px;float:left;curosr: pointer;">
                        <p slot="title">
                            待发货(提货)
                        </p>
                        <b>50</b>
                    </Card>   
                </Col>
            </Row>
        </Card><br>

        <Card>
            <p slot="title">
                业绩排行
            </p>
            <ButtonGroup>
                <Button type="primary">
                    月度
                </Button>
                <Button type="primary">
                    季度
                </Button>
                <Button type="primary">
                    年度
                </Button>
            </ButtonGroup><br><br>
            <Table height="200" :loading="loading":columns="columns" :data="data"></Table>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
        loading:false,
        columns:[
            {
                title: '排名',
                key: 'rnak'
            },
            {
                title: '姓名',
                key: 'rnak'
            },
            {
                title: '级别',
                key: 'rnak'
            },
            {
                title: '业绩(盒)',
                key: 'rnak'
            },
            {
                title: '业绩(元)',
                key: 'rnak',
                width:'100px'
            },
        ],
        data:[]
    }
  },
  methods:{
        goto: function(url) {
            this.$router.push(url);
        },
  },
  mounted(){  
      
  },
}
</script>


