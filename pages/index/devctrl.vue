<template>
	<view>
		<nav-bar title="滑动操作"></nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<uni-card title="寝室温度警报提醒" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="提交" >
		  	<view class="input_box btm_line">
		  		<view class="input_info"><input placeholder="请输入温度警报" type="bdT" :value="T" maxlength="15" @input="bdTInput"/></view>
				<button @tap="Tsubmit">提交</button>
		  	</view>
		</uni-card>
		<uni-card title="寝室湿度警报提醒" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="提交" >
		  	<view class="input_box btm_line">
		  		<view class="input_info"><input  placeholder="请输入湿度警报" type="bdH" :value="H" maxlength="15" @input="bdHInput"/></view>
				<button @tap="Hsubmit">提交</button>
		  	</view>
		</uni-card>
		<uni-card title="寝室门状态查询" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="查询" @click="showstatus">
          寝室门状态为：{{status}}
		</uni-card>
		<uni-card title="寝室人员签到" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="寝室" >
		    <view class="text-area ">
		    	<navigator url="./ImportCalendar" class="title">点击签到</navigator>
		    </view>
		</uni-card>	
		<uni-card title="寝室密码修改" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="寝室">
		    <view class="text-area ">
		    	<navigator url="./alterpwd" class="title">修改密码</navigator>
		    </view>
		</uni-card>	
	</view>
	<!-- 一般用法 -->
</template>

<script>
import swipeAction from '@/components/common/swipe-action';
import navBar from '@/components/common/zhouWei-navBar';
import uniCard from '@/components/uni-card/uni-card.vue'
export default {
	components: {
		swipeAction,
		navBar,
		uniCard
	},
	data() {
		return {
			status:"未知",
			devinfo:null,
			userinfo:null,
			cmdstr:"led",
			T:'',
			H:'',
			cmdcode:2,
			devid:'a3e7d01c-a537-47d2-ac28-9ba5881b201a',
			options3: [
				{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '确定',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			show: true
		};
	},
	//第一次加载
	onLoad(e) {
		setInterval(() => {
			this.show = !this.show;
		}, 5000);
	},
	//页面显示
	onShow() {},
	//方法
	methods: {
		onPageJump(url) {
			uni.navigateTo({
				url: url
			});
		},
		bdTInput(e){
			console.log("bdTInput");
			this.T = e.target.value;
		},
		bdHInput(e){
			console.log("bdHInput");
			this.H = e.target.value;
		},
		Tsubmit(){
				if(36 != this.devid.length){
					uni.showToast({
						icon:'none',
						title: '设备ID号错误,请先注册！'
					});
					return;
				}
				let cmdpara = {
					cmdstring:this.T,
					cmdlen:this.T.length,
					cmdcode:this.cmdcode
				}
				let cmdstr = JSON.stringify(cmdpara);
				console.log("cmdstr:"+cmdstr);
				if(this.ledsta){
					this.ledsta = false;
				}else{
					this.ledsta = true;
				}
				uni.showLoading({
					title: '正在查询',
					mask: false
				});
				uni.request({
					url: this.globalVal.default_url.devCmd,
					method: 'POST',
					data: {
						deviceId:this.devid,
						cmdInfo:cmdstr,
					},
					success: res => {
						console.log(res);
						uni.showToast({
							icon:'none',
							title: '设置成功'
						});
					},
					fail: () => {
						console.log("failed!!!");
						uni.showToast({
							icon:'none',
							title: '设置失败'
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
		},
		Hsubmit(){
				if(36 != this.devid.length){
					uni.showToast({
						icon:'none',
						title: '设备ID号错误,请先注册！'
					});
					return;
				}
				let cmdpara = {
					cmdstring:this.H,
					cmdlen:this.H.length,
					cmdcode:3
				}
				let cmdstr = JSON.stringify(cmdpara);
				console.log("cmdstr:"+cmdstr);
				if(this.ledsta){
					this.ledsta = false;
				}else{
					this.ledsta = true;
				}
				uni.showLoading({
					title: '正在查询',
					mask: false
				});
				uni.request({
					url: this.globalVal.default_url.devCmd,
					method: 'POST',
					data: {
						deviceId:this.devid,
						cmdInfo:cmdstr,
					},
					success: res => {
						console.log(res);
						uni.showToast({
							icon:'none',
							title: '设置成功'
						});
					},
					fail: () => {
						console.log("failed!!!");
						uni.showToast({
							icon:'none',
							title: '设置失败'
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
		},
		showstatus(){
			uni.showLoading({
				title: '查询中...',
				mask: false
			});
			uni.request({//向云端服务发送请求获取设备最新信息
				url: this.globalVal.default_url.devInfo,
				method: 'POST',
				data: {
					deviceId:this.devid
				},
				success: res => {
					console.log(res);
					if(200 == res.statusCode){
						this.devinfo = JSON.stringify(res.data);
						if(undefined == res.data.error_code){
							this.userinfo = res.data.services[0].data.infostring;
							let val = JSON.parse(this.userinfo);
							
							if(!val.D)
							{
								this.status = '已开';
							}else{
								this.status = '关闭';
							}
						}
						
					}
				},
				fail: () => {},
				complete: () => {
					uni.hideLoading();
				}
			});
		}
		
	},
	//页面隐藏
	onHide() {},
	//页面卸载
	onUnload() {},
	//页面下来刷新
	onPullDownRefresh() {},
	//页面上拉触底
	onReachBottom() {},
	//用户点击分享
	onShareAppMessage(e) {
	}
};
</script>
<style scoped>
	
.swipe_action_list {
	border-bottom-width: 2rpx;
	border-bottom-color: #eee;
	border-bottom-style: solid;
}
.swipe_action {
	background-color: #ffffff;
	padding: 50rpx 30rpx;
}
</style>