
<template>
    <view>
	<view class="content">
		<view>旧密码:</view>
		<Vailcode :maxlength="6" :isPwd="true" @finish="getoldPwd"></Vailcode>
	</view>
	<view class="content">
		<view>新密码:</view>
		<Vailcode :maxlength="6" :isPwd="true" @finish="getPwd"></Vailcode>
	</view>
	</view>
</template>
 
<script>
export default {
	data() {
		return {
			devid:'a3e7d01c-a537-47d2-ac28-9ba5881b201a',
			pwd:'',
			cmdstr:"led",
			cmdcode:1,
			ledsta:false
		};
	},
	onLoad() {},
	methods: {
		getoldPwd(val){
			console.log(val);
			if(val === '123456')
			{
				uni.showToast({
					icon:'none',
					title: '密码正确'
				});
			}
		},
		getPwd(val){
			console.log(val);
			if(36 != this.devid.length){
				uni.showToast({
					icon:'none',
					title: '设备ID号错误,请先注册！'
				});
				return;
			}
			let cmdpara = {
				cmdstring:val,
				cmdlen:val.length,
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
				title: 'led swtich...',
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
						title: '完成修改'
					});
				},
				fail: () => {
					console.log("failed!!!");
					uni.showToast({
						icon:'none',
						title: '发送失败'
					});
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		}
	}
};
</script>
 
<style>
.content {
	height: 400upx;
}
</style>
 
 