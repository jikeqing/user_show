<script setup>
import { ref, computed, onMounted, h } from 'vue' // 导入 h 函数
import { useRoute, useRouter } from 'vue-router'
import { Table, Button } from 'ant-design-vue'
import * as echarts from 'echarts'

const router = useRouter()
const route = useRoute()
const userRole =  route.query.username || localStorage.getItem('userRole') 
const isAdmin = computed(() => {
  if (userRole === 'admin') {
    columns.push(

      {
        title: 'Action',
        key: 'action',
        customRender: ({ record }) => {
          if (isAdmin.value) {
            return h(Button, { danger: true, onClick: () => handleDelete(record.id) }, 'Delete') // 使用 h 函数
          }
          return null
        }
      }
    )
  }
  return userRole === 'admin'
})

// 初始化工单数据
const workOrders = ref([
  {
    id: "001",
    project: "Road Construction Project A",
    overtime: true,
    hours: 4,
    created_at: "2024-04-10 10:30"
  },
  {
    id: "002",
    project: "Lighting Maintenance Project B",
    overtime: false,
    hours: 4,
    created_at: "2024-04-09 13:00"
  },
  {
    id: "003",
    project: "Project A",
    overtime: true,
    hours: 4,
    created_at: "2024-04-08 08:00"
  },
  {
    id: "005",
    project: "Project C Project A",
    overtime: 'Once',
    hours: 4.05,
    created_at: "2024-04-07 16:45"
  }
])

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Project Name',
    dataIndex: 'project',
    key: 'project',
  },
  {
    title: 'Overtime',
    dataIndex: 'overtime',
    key: 'overtime',
    customRender: ({ text }) => text === true ? 'Yes' : text === false ? 'No' : text
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
  }
]

let chartInstance = null

// 初始化图表
const initChart = () => {
  chartInstance = echarts.init(document.getElementById('chart-container'))
  updateChart()
}

// 更新图表数据
const updateChart = () => {
  const projects = {}
  workOrders.value.forEach(order => {
    projects[order.project] = (projects[order.project] || 0) + order.hours
  })

  const option = {
    title: {
      text: 'Project Hours Distribution'
    },
    xAxis: {
      type: 'category',
      data: Object.keys(projects),
      axisLabel: {
        interval: 0, // 强制显示所有标签
       
        formatter: function (value) {
          return value.split(' ').join('\n'); // 按空格换行
        }
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: Object.values(projects),
      type: 'bar'
    }]
  }
  chartInstance.setOption(option)
}

// 删除工单逻辑
const handleDelete = (id) => {
  workOrders.value = workOrders.value.filter(item => item.id !== id)
  updateChart()
}

// 添加 handleDeleteAll 方法
const handleDeleteAll = () => {
  workOrders.value = []
  updateChart()
}

// 添加退出登录方法
const handleLogout = () => {
  localStorage.removeItem('userRole') // 清除用户角色信息
  router.push('/') // 跳转到登录页
}

onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="main-container">
    <!-- 添加退出登录按钮 -->
    <a-button class="logout-button" @click="handleLogout">
      Logout
    </a-button>

    <div class="text-container" style="margin: auto;margin-top: 10%;padding-left:4%;margin-left: 1%;">
    <h2>Tasks</h2>

    <a-row>
      <a-col :span="13">
        <div class="table-container">
          <a-table :columns="columns" :dataSource="workOrders" :rowKey="record => record.id" />
        </div>
      </a-col>
      <a-col :span="9">
        <div class="chart-container">
          <div id="chart-container"></div>
          <!-- 添加 Delete 按钮 -->
          <a-button v-if="isAdmin" class="delete-button" @click="handleDeleteAll">
            Delete
          </a-button>
        </div>
      </a-col>
    </a-row>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  padding: 20px;
  position: relative;
  /* 使 .logout-button 的绝对定位基于此容器 */
}

.logout-button {
  position: absolute;
  top: 10px;
  right: 10px;
}


.chart-container {
  position: relative;
  /* 确保 .delete-button 的绝对定位基于此容器 */

}

.delete-button {
  position: absolute;
  bottom: 1px;
  right: 10px;
  border: 1px solid red;
  background-color: white;
  color: red;
  padding: 5px 10px;
  cursor: pointer;
}

#chart-container {
  position: relative;
  top: 1px;
  left: 1px;
  width: 100%;
  height: 315px;
  border: 1px solid #ccc;

  background: #fff;
}

.chart-container .ant-btn {
  margin-top: 10px;
  display: block;
  text-align: center;
}
</style>
