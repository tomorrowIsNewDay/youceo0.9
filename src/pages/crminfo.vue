<template>
    <div class="detail">
        <mt-header fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right" @click="$router.push({ path: '/editcrminfo'})">修改</mt-button>
        </mt-header>
        <mt-navbar v-model="selected">
          <mt-tab-item id="detail">公司信息</mt-tab-item>
          <mt-tab-item id="workRecord">工作记录</mt-tab-item>
          <mt-tab-item id="attachment">合同附件</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" >
              <mt-tab-container-item id="detail">
                <cropinfo-card></cropinfo-card>
                <footer-bar :btnData="btnData" @add-handler="log"></footer-bar>
              </mt-tab-container-item>
              <mt-tab-container-item id="workRecord">
                  <workrecord-card></workrecord-card>
                  <footer-bar :btnData="btnData" @add-handler="dynamicFn"></footer-bar>
              </mt-tab-container-item>
              <mt-tab-container-item id="attachment">
                <attachment-card :detailData="detailData"></attachment-card>
                <footer-bar :btnData="btnData1"></footer-bar>
              </mt-tab-container-item>
         </mt-tab-container>
    </div>
</template>

<script>
import FooterBar from '../components/FooterBar';
import CropinfoCard from './cropinfoCard'; // 详情card
import WorkrecordCard from './workrecordCard'; // 工作记录card
import AttachmentCard from './attachmentCard'; //附件card

import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex'
export default {
    name: 'detail',
    data () {
        return {
            selected: "detail",
            btnData: [{
                "href": "#icon-tuidong",
                "name": "新建任务",
                "colorClass": "text-primary"
            }],
            btnData1: [{
                "href": "#icon-tuidong",
                "name": "申请终止",
                "colorClass": "text-muted"
            },
            {
                "href": "#icon-tuidong",
                "name": "提交检查",
                "colorClass": "text-primary"
            },
            {
                "href": "#icon-tuidong",
                "name": "发表动态",
                "colorClass": "text-primary"
            }]
        }
    },
    methods: {
        log: function(el){
           switch(el) {
                case "不通过":
                        Toast({
                            message: '不通过',
                            duration: 1000
                          });
                        break;
                case "通过":
                        Toast({
                            message: '通过',
                            duration: 1000
                          });
                        break;
                default:
                        alert("这是其他时间");
                        break;

           }
        },
        dynamicFn: function(el){
           switch(el) {
                case "发表动态":
                        this.$router.push({name: 'postDynamic'})
                        break;
                case "申请终止":
                        Toast({
                            message: '申请终止',
                            position:'top',
                            duration: 1000
                          });
                        break;
                default:
                        Toast({
                            message: '提交检查',
                            duration: 1000
                          });
                        break;

           }
        }
    },
    components: {
        FooterBar,
        CropinfoCard,
        WorkrecordCard,
        AttachmentCard
    },
    computed: {
      ...mapGetters([
              'detailData'
          ])
    },
    created () {
      // 在载入路由之前
      // 异步获取数据，并且显示加载界面

      Indicator.open('加载中...');
      this.axios.get("http://localhost:8080/static/detail_data.json") //`https://cnodejs.org/api/v1/topic/${this.$route.params.id}?accesstoken=${this.userData.accesstoken}`
          .then(res => {
            Indicator.close();
            this.$store.dispatch('initDetailData', res.data);
            // console.log(this.$store.state.drive)
        })
    }
}
</script>
<style lang="scss" scoped>
    .detail{
        padding-top: 48px
    }
</style>
