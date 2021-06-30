<template>
	<view class="page">
		<nav-bar></nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<view class="title">注册</view>
		<view class="input_box"><input type="text" v-model="email" placeholder="请输入邮箱" /></view>
		<view class="input_box"><input type="password" v-model="password" placeholder="请输入密码" /></view>
		<view class="input_box"><input type="password" v-model="confirmPassword" placeholder="请确认密码"/></view>
		<!-- <view class="input_box"><input type="number" v-model="recommendCode" placeholder="推荐人邮箱码（非必填）" @confirm="onSubmit"/></view> -->
		<view class="btn_box"><button @click="onSubmit">注册</button></view>
		<view class="protocol">
			注册代表您已同意
			<text>《用户协议》</text>
		</view>
	</view>
</template>
<script>
import md5 from '@/plugins/md5';
var clear;
export default {
	data() {
		return {
			//邮箱
			email: '',
			// 密码
			password: '',
			//确认密码
			confirmPassword: '',
		};
	},
	//第一次加载
	onLoad(e) {},
	//页面显示
	onShow() {},
	//方法
	methods: {
		onJumpPage(url) {
			uni.navigateTo({
				url: url
			});
		},
		onSubmit() {
			if (!this.email) {
				uni.showToast({
					title: '请输入邮箱',
					icon: 'none'
				});
				return;
			}
			if (!this.password) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			if (!this.confirmPassword) {
				uni.showToast({
					title: '请输入确认密码',
					icon: 'none'
				});
				return;
			}
			if (this.confirmPassword != this.password) {
				uni.showToast({
					title: '两次密码不一致',
					icon: 'none'
				});
				return;
			}
			let Data =  {
				email: this.email,
				password: md5(this.password),
			};
			uni.setStorageSync("userInfo",Data);
			uni.showModal({
					title:"提示",
					content:"注册成功，去登录！",
					showCancel:false,
					success: (res) => {
						uni.navigateBack();
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
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.page {
	background-color: #FFF;
	padding: 0 65upx;
	min-height: 100vh;
	.title {
		padding: 60upx 0 40upx 0;
		font-size: 60upx;
		color: #333333;
	}
	.input_box {
		display: flex;
		justify-content: space-between;
		height: 100upx;
		padding-top: 20upx;
		border-bottom: 1upx solid #eeeeee;
		input {
			flex: 1;
			height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
		}
		button {
			height: 78upx;
			line-height: 78upx;
			font-size: 30upx;
			color: $themeColor;
			&:active {
				background-color: transparent;
			}
		}
	}
	.btn_box {
		margin-top: 70upx;
		button {
			height: 86upx;
			@include theme("btn_bg");
			border-radius: 43upx;
			font-size: 36upx;
			color: #ffffff;
		}
	}
	.protocol {
		font-size: 24upx;
		color: #999999;
		text-align: center;
		margin-top: 20upx;
		text {
			color: $themeColor;
		}
	}
}
</style>
