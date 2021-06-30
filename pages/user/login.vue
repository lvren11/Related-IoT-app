<template>
	<view class="register_page">
		<nav-bar></nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<view class="title">
			<text :class="{active:type == 2000}" @click="type = 2000">密码登录</text>
			<text :class="{active:type == 1000}" @click="type = 1000">验证码登录</text>
		</view>
		<view class="input_box"><input type="text" v-model="email" placeholder="请输入您的邮箱" /></view>
		<view class="input_box" v-if="type == 1000">
			<input type="number" v-model="code" placeholder="请输入邮箱验证码" maxlength="6" @confirm="onSubmit" />
			<button class="active" @click="onSetCode">{{ codeText }}</button>
		</view>
		<view class="input_box" v-if="type == 2000"><input type="text" v-model="password" password placeholder="请输入密码" @confirm="onSubmit" /></view>
		<view class="btn_box"><button @click="onSubmit">登录</button></view>
		<view class="nav_box" v-if="type == 1000">
			<view class="agreement" v-if="type == 1000">
				进入即代表你已同意
				<text>《用户协议》</text>
			</view>
			<text class="color" @click="onPageJump('/pages/user/register')">去注册</text>
		</view>
		<view class="nav_box" v-if="type == 2000">
			<text class="color" @click="onPageJump('/pages/user/register')">去注册</text>
			<text>忘记密码？</text>
		</view>
	</view>
</template>

<script>
import md5 from '@/plugins/md5';
let clear;
export default {
	data() {
		return {
			type:2000,
			loading:false,
			code: '',
			email:'',
			password:'',
			//验证码
			codeText: '获取验证码',
			//验证码已发
			readonly: false,
			Data:{},
			isIos:true
		};
	},
	//第一次加载
	onLoad(e) {
		// #ifdef APP-PLUS
		this.isIos = (plus.os.name == "iOS");
		// #endif
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
		onSubmit() {
			this.Data = uni.getStorageSync("userInfo");
			console.log(this.Data);
			if (!this.email) {
				uni.showToast({
					title: '请输入邮箱',
					icon: 'none'
				});
				return;
			}
			let httpData = {
				email: this.email
			};
			if (!this.password) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			httpData.password = md5(this.password);
			this.loading = true;
			if (this.Data.email === httpData.email) {
				if (this.Data.password == httpData.password) {
						console.log("登陆成功")
						uni.showModal({
						title: '友情提示',
						content: '登陆成功',
						success: function (res) {
							if (res.confirm) {
							      console.log('确定');
								  uni.switchTab({
								  	url:'/pages/index/devreg'
								  })
							    } else if (res.cancel) {
							      console.log('取消')
							    }
						}
						});
				}else {
						console.log("密码错误")
						uni.showModal({
						title: '友情提示',
						content: '密码错误',
						success: function (res) {
					    }
						});
					   }
				}else {
						console.log("账号错误")
						uni.showModal({
						title: '友情提示',
						content: '账号错误',
						success: function (res) {
						}
						});
					   }
						setTimeout((e=>{
							this.loading = false;
						}),1500);
						console.log(JSON.stringify(this.Data)); 
				},
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
.register_page {
	padding: calc(var(--status-bar-height) + 70upx) 50upx 50upx 50upx;
	background-color: #fff;
	min-height: 100vh;
	.title {
		margin-bottom: 50upx;
		display: flex;
		align-items: center;
		text {
			font-size: 36upx;
			color: #999;
			&.active {
				font-size: 48upx;
				color: #333333;
				font-weight: bold;
			}
			&:nth-child(2){
				margin-left: 70upx;
			}
		}
	}
	.input_box {
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #e5e5e5;
		padding: 30upx 0;
		margin-top: 20upx;
		input {
			flex: 1;
			font-size: 32upx;
			color: #333;
			height: 60upx;
		}
		button {
			height: 60upx;
			background-color: #f7f7f7;
			font-size: 24upx;
			border-radius: 8upx;
			padding: 0 14upx;
			color: #333;
			line-height: 60upx;
			margin-left: 20upx;
			&.active {
				@include theme('btn_bg');
				color: #fff;
			}
		}
	}
	.btn_box {
		margin-top: 60upx;
		button {
			@include theme('btn_bg');
			color: #fff;
			height: 92upx;
			line-height: 92upx;
			border-radius: 8upx;
		}
	}
	.agreement {
		font-size: 24upx;
		color: #999999;
		> text {
			color: $themeColor;
		}
	}
	.password_register {
		margin-top: 110upx;
		text-align: center;
		text {
			font-size: 24upx;
			color: #333333;
			text-decoration: underline;
		}
	}
	.nav_box {
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
		> text {
			font-size: 24upx;
			color: #333333;
			&.color {
				color: $themeColor;
			}
		}
	}
}
.station {
	height: 230upx;
}
.third_party_login_box {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	height: 230upx;
	padding: 0 30upx;
	.third_party_title {
		display: flex;
		align-items: center;
		&:before,
		&:after {
			content: '';
			flex: 1;
			height: 2upx;
			background-color: #f5f5f5;
		}
		text {
			font-size: 24upx;
			color: #999999;
			flex-shrink: 0;
			padding: 0 20upx;
		}
	}
	.third_party_content {
		height: 200upx;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 60upx;
			height: 52upx;
		}
	}
}
</style>
