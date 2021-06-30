<template>

	<view class="uni-common-mt">
		<view class="line"></view>
		<uni-card
		            title="华理寝室"
		            mode="style"
		            :is-shadow="true"
		            thumbnail="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608129611510&di=2dac0ce1da27bd8cc5d1178190bbe34c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181122%2F54cb41166276462d940519270c9992c9.jpeg"
		            extra="寝室3舍317信息查看"
		            note="操作"
		        >
		            <view>
		            	温度: {{termperature}}'C&nbsp;湿度: {{humidity}}% &nbsp;光强: {{Light}}cd
		            </view>
		        </uni-card>
		<view class="line"></view>
		
		<view class="uni-padding-wrap uni-common-mt">
			 <CcButton @cctap="getInfo('isloading2')" fontsize="36rpx" height="120rpx" width="350rpx" color="#fff" bgcolor="rgba(142, 139, 235, 1.0)"
			             :loading="isloading2" :disabled="btnAddDisable">寝室信息查看</CcButton>
		</view>
		<view class="line"></view>
		<view class="uni-padding-wrap uni-common-mt">
			<CcButton @cctap="getHistoryInfo" fontsize="36rpx" height="120rpx" width="350rpx" color="#fff" bgcolor="rgba(123, 215, 225, 1.0)"
			         :disabled="btnAddDisable">历史信息查看</CcButton>
		</view>
		<view class="line"></view>
		<view class="uni-padding-wrap uni-common-mt">
            <CcButton @cctap="viewInChart" fontsize="36rpx" height="120rpx" width="350rpx" color="#fff" bgcolor="rgba(87, 225, 181, 1)"
		            >图表查看</CcButton>
		        </view>
		<view class="uni-padding-wrap uni-common-mt" style="margin:10px;">
			<view>宿舍人员情况：</view>
			<MyProgress :nowD="75" :sumD="100" :content='"签到3人"' :contentColor='"rgba(3,144,252,1)"' :contentBacColor='"#ffffff"' :time="3000" :wid="280" :type='"linear"'></MyProgress>
		</view>
	</view>
</template>

<script>
	import MyProgress from "@/components/my-progress.vue"
	import CcButton from '@/components/cc-button/cc-button.vue' 
	export default {
		components: {
			MyProgress,
			CcButton,
		},
		data() {
			
			return {
				
				devid:'a3e7d01c-a537-47d2-ac28-9ba5881b201a',
				devinfo:null,
				userinfo:null,
				termperature:'待查',
				humidity:'待查',
				Light:'待查',
				btnAddDisable:false,
				isloading2: false
			}
		},
		onLoad:function(e){

		},
		methods:{
		
			devIdInput(e){
				console.log("devIdInput");
				this.devid = e.target.value;
				if(36 == this.devid.length){
					this.btnAddDisable = false;
				}else{
					this.btnAddDisable = true;
				}
			},
			getInfo(type){
				uni.showLoading({
					title: '数据加载中...',
					mask: false
				});
				this[type] = true;
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
								this.termperature = val.T;
								this.humidity = val.H;
								this.Light = val.L;
								console.log("温度: "+val.T+"C"+" 湿度: "+val.H+"%");
								setTimeout(() => {
								    this[type] = false
								}, 2000);
							}
							
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			getHistoryInfo(){
				uni.navigateTo({
					url: 'devhistory?devid='+this.devid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			viewInChart(){
				uni.navigateTo({
					url: 'uchart',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.logo-content {
		text-align: center;
		margin-top: 200upx;
		margin-bottom: 100upx;
	}
	
	.logo {
		height: 120upx;
		width: 120upx;
	}
	
	.line {
		width: 90%;
		height: 1px;
		margin-left: 30upx;
		margin-right: 30upx;
		background-color: #cccccc;
		margin-top: 1px;
	}
	
	.inputText {
		margin-left: 30upx;
	}
	.content2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #007AFF;
		height: 300rpx;
	}
</style>
