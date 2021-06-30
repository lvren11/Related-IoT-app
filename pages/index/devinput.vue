
<template>
		<view class="page_content">
		<view class="header">
			
			<text class="title">开锁中心</text>
			
		</view>
		<image class="logo" src="/static/head.png"></image>
		
		<swiper @change="swiperChange" previous-margin="50px" next-margin="50px" class="swiper" :indicator-dots="false"
		 :autoplay="false" :interval="3000" :duration="1000" :current="bigIdx">
		
			<template v-for="(vip, i) in vips">
				<swiper-item :key="'vip_'+i">
					<view :class="['swiper-item',bigIdx === i ? 'big' : 'small']" :style="{background:vip.bg,'box-shadow':vip.shadow}">
						<image class="img" src="/static/icon_vip.png"></image>
						<text class="title">{{vip.title}}</text>
						<text class="sub_title">{{vip.subTitle}}</text>
					</view>
				</swiper-item>
			</template>
		
		</swiper>
		
	<view class="content">
		<view>密码:</view>
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
			bigIdx: 1,
			cmdstr:"led",
			cmdcode:0,
			ledsta:false,
			vips: [{
				bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
				shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
				title: '智能寝室',
				subTitle: '不会开心锁, 只会开门锁。'
			}, {
				bg: 'linear-gradient(94deg,rgba(192,160,105,1),rgba(233,213,172,1))',
				shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
				title: '智能寝室',
				subTitle: '何以解锁,就赖智能'
			}, {
				bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
				shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
				title: '智能寝室',
				subTitle: '无所不能，无锁不开'
			}],
		};
	},
	onLoad() {},
	methods: {
		swiperChange(e) {
			this.bigIdx = e.detail.current
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
						title: '发送成功'
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
page {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.page_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		padding-top: var(--status-bar-height);
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 10px;
		margin-right: 10px;

		.btn {
			width: 27px;
			height: 27px;
		}

		.title {
			font-size: 18px;
			font-weight: 500;
			color: rgba(43, 43, 43, 1);
			line-height: 41px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.logo {
		margin-top: 10px;
		width: 100px;
		height: 100px;
	}

	.swiper {
		width: 100%;
		margin-top: 10px;

		.swiper-item {
			border-radius: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10px;
			margin-right: 10px;
		}

		.big {
			margin-top: 0;

			.img {
				margin-top: 15px;
				width: 40px;
				height: 40px;
			}

			.title {
				font-size: 25px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}

			.sub_title {
				font-size: 11px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}
		}

		.small {
			margin-top: 14px;
			height: 75%;

			// transition: all 0.3s;
			.img {
				margin-top: 5px;
				width: 25px;
				height: 25px;
			}

			.title {
				font-size: 15px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 31px;
			}

			.sub_title {
				font-size: 7px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.title_line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title {
			margin-left: 20px;
			font-size: 18px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 41px;
		}

		.more {
			margin-right: 20px;
			font-size: 10px;
			font-weight: 300;
			color: rgba(153, 153, 153, 1);
			line-height: 41px;
		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;

		.s_item {
			display: inline-block;
			width: 35%;
			margin-left: 20px;
			margin-bottom: 10px;

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				background: white;
				margin-top: 5px;
				box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

				.img {
					width: 103px;
					height: 105px;
				}

				.name {
					margin-top: -10px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 21px;
				}

				.desc {
					font-size: 10px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 21px;
				}

				.btn {
					width: 80px;
					height: 30px;
					margin-bottom: 10px;
					background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
					box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
					border-radius: 29px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 21px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.welfare {
		width: 92%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 21px 0px rgba(103, 103, 103, 0.2);
		border-radius: 10px;
		margin-bottom: 10px;

		.item {
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.border {
				margin-top: 5px;
				border: 2px solid #c9ac7a;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 40px;
					height: 40px;
				}
			}

			.txt {
				margin-top: 5px;
				font-size: 10px;
				font-weight: 300;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
</style>

 
 