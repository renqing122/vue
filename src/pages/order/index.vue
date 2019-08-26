<template>
  <div>
    <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">我的订单</h1>
      </md-table-toolbar>
    <md-autocomplete
      v-model="selectedEmployee"
      :md-options="employees"
      md-layout="box"
      md-dense>
      <label>Employees</label>
    </md-autocomplete>

    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <md-autocomplete
          class="search"
          v-model="selectedEmployee"
          :md-options="employees"
          md-layout="box">
          <label>Search...</label>
        </md-autocomplete>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>refresh</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>more_vert</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>
  
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="订单ID" md-numeric md-sort-by="id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="用户名" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="房间号" md-sort-by="number">{{ item.number }}</md-table-cell>
        <md-table-cell md-label="租赁方式" md-sort-by="way">{{ item.way }}</md-table-cell>
        <md-table-cell md-label="开始时间" md-sort-by="stime">{{ item.stime }}</md-table-cell>
        <md-table-cell md-label="结束时间" md-sort-by=etime>{{ item.etime }}</md-table-cell>
        <md-table-cell md-label="总租金" md-sort-by=totalmoney>{{ item.totalmoney }}</md-table-cell>
        <md-table-cell md-label="订单状况" md-sort-by=orderstate>{{ item.orderstate }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  export default {
    name: 'TableSort',
    data: () => ({
      users: [
        {
          id: 1,
          name: 'Shawna Dubbin',
          number: 123,
          way: '长租',
          stime: '2019/03/03',
          etime: '2019/09/03',
          totalmoney: 12000.00,
          orderstate: '审核通过',
        },
        {
          id: 2,
          name: 'Odette Demageard',
          number: 701,
          way: '短租',
          stime: '2019/09/09',
          etime: '2019/09/11',
          totalmoney: 470.80,
          orderstate: '未审核',
        },
        {
          id: 3,
          name: 'Lonnie Izkovitz',
           number: 893,
          way: '长租',
          stime: '2019/04/03',
          etime: '2019/11/03',
          totalmoney: 18890.00,
          orderstate: '审核未通过',
        },
        {
          id: 4,
          name: 'Thatcher Stave',
          number: 143,
          way: '短租',
          stime: '2019/08/24',
          etime: '2019/08/27',
          totalmoney: 890.00,
          orderstate: '进行中',
        },
        {
          id: 5,
          name: 'Clarinda Marieton',
          number: 123,
          way: '长租',
          stime: '2019/01/07',
          etime: '2019/04/07',
          totalmoney: 7200.00,
          orderstate: '逾期未支付',
        }
      ]
      
    })
  }
</script>
<style lang="css" scoped>
  .search {
    max-width: 500px;
  }
</style>