<template>
 <el-row
          type="flex"
          class="row-bg"
          justify="center"
        >
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>青年小屋用户长租合同</span>
    </div>
   
<div>出租方（甲方）：青年租房公司</div>
<el-row>
身份证号码:<br>                
承租方（乙方）： <br>                 
身份证号码：     <br>            
甲、	乙双方通过友好协商，就房屋租赁事宜达成协议如下：<br> 

一、	租赁地址：{{this.room.address}}<br> 
二、	室内附属设施：空调、冰箱、加湿器。<br> 
三、	租用期限及其约定：<br> 
1、	自 {{this.order.startDate}}至 {{this.order.endDate}}。<br> 
2、	房屋租金：每月{{this.order.rentMoney}}元人民币。<br> 
3、	付款方式：按月支付，在每月最后一天24点之前在前台缴纳租金。<br>  
4、	租赁期内的水、电、煤气、电话、有线电视，卫生治安费由乙方支付，房屋修缮等费用由甲方支付。<br> 
5、	租赁期内，乙方有下列情形之一的甲方可终止合同，收回房屋使用权，乙方需承担全部责任，并赔偿甲方损失：<br> 
（1）	乙方擅自转租、转让房间。<br> 
（2）	乙方利用承租房屋进行非法活动损害公共利益。<br> 
（3）	乙方没有在每月最后一天24点缴纳本月应缴租金。<br> 
四、	双方责任及任务<br> 
1、	乙方须按时缴纳水、电、气等费用，甲方须监督乙方缴纳以上费用。<br> 
2、	在租用期内，甲方必须保证乙方的正常居住，不得将乙方租用的房屋转卖给任何第三者。<br> 
3、	租赁期满后，乙方如需继续使用，应在租赁期满前提出续租请求，甲方可根据实际情况，在同等条件下给予优先。<br> 
4、	乙方不得擅自改变室内结构，并爱惜使用室内设施，如人为损坏应给予甲方相应赔偿，如发生自然损坏，应及时通知甲方，并配合甲方及时给予修复。<br> 
五、	其他未尽事宜，由甲乙双方协商解决，协商不成按有关现行法规办理或提交有关仲裁机关进行仲裁。<br> 
本协议一式两份，甲、乙双方各执一份，签字后即兴生效。<br> 
<br> 
<br> 
甲方签字：<br>                 
乙方签字：<br>            
签约日期： <br> 
</el-row>             
  </el-card>
  </el-row>

</template>

<script>
export default {
  props: {
    "orderId": String
  },
  data () {
    return {
      order: {
        tenantId: '',
        roomId: '',
        rentType: '',
        startDate: '',
        endDate: '',
        rentTime: '',
        rentMoney: ''
      },
      room: {
        roomId: '',
        name: '',
        type: '',
        price: '',
        address: '',
        description: ''
      }
    }
  },
  created () {
    this.apiGet();
  },
  methods: {
    apiGet () {
      this.$http.post('/api/v1/operator/queryRentOrderByOrderId', { "orderId": this.orderId })
        .then(result => {
          this.order = result.data
          this.apiGetroom();
        })
    },
    apiGetroom () {
      this.$http.post('/api/v1/operator/queryRoomByRoomId', { "roomId": this.order.roomId })
        .then(result => {
          this.room = result.data
        })
    },
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;

}
</style>