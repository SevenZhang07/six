/**
	1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
	
	2:歌曲url获取接口
	    请求地址:https://autumnfish.cn/song/url
	    请求方法:get
	    请求参数:id(歌曲id)
	    响应内容:歌曲url地址
		
	3.歌曲详情获取
		请求地址:https://autumnfish.cn/song/detail
		请求方法:get
		请求参数:ids(歌曲id)
		响应内容:歌曲详情(包括封面信息)
		
	4.热门评论获取
	    请求地址:https://autumnfish.cn/comment/hot?type=0
	    请求方法:get
	    请求参数:id(歌曲id,地址中的type固定为0)
	    响应内容:歌曲的热门评论
		
	5.mv地址获取
	    请求地址:https://autumnfish.cn/mv/url
	    请求方法:get
	    请求参数:id(mvid,为0表示没有mv)
	    响应内容:mv的地址
 */
var vue = new Vue({
	el: "#player",
	data: {
		// 搜索框的关键字
		query: "",
		// 搜索到的所有歌曲
		musicList: [],
		// 歌曲地址
		musicUrl: "",
		// 歌曲封面
		musicCover: "",
		// 热门评论
		hotComment: [],
		// 播放状态
		isPlaying: false,
		// 遮罩层
		isShow: false,
		// MV地址
		MVUrl: ""
	},
	methods: {
		// 搜索音乐
		searchMusic: function() {
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords=" + this.query)
				.then(function(response) {
					/* console.log(response) */
					that.musicList = response.data.result.songs;
				}, function(err) {});
			/* console.log(this.musicList) */
		},
		// 播放音乐
		playMusic: function(id) {
			this.id = id;
			/* console.log(id) */
			var that = this;

			/* 获取音乐地址 */
			axios.get("https://autumnfish.cn/song/url?id=" + this.id)
				.then(function(response) {
					/* console.log(response.data.data[0].url) */
					that.musicUrl = response.data.data[0].url;
				}, function(err) {});

			/* 获取歌曲封面 */
			axios.get("https://autumnfish.cn/song/detail?ids=" + this.id)
				.then(function(response) {
					that.musicCover = response.data.songs[0].al.picUrl
				}, function(err) {})

			/* 获取歌曲评论 */
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + this.id)
				.then(function(response) {
					/* console.log(response); */
					that.hotComment = response.data.hotComments;
				}, function(err) {})
		},

		// 继续播放音乐
		continueMusic: function() {
			/* console.log("play"); */
			this.isPlaying = true;
		},

		// 暂停播放音乐
		pauseMusic: function() {
			/* console.log("pause"); */
			this.isPlaying = false;
		},

		// 播放MV
		playMV: function(mvid) {
			var that = this;
			axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
				.then(function(response) {
					/* console.log(response) */
					that.MVUrl = response.data.data.url;
					that.isShow = true;
				}, function(err) {})
		}, 
		// 关闭遮罩层
		close: function() {
			this.isShow = false;
			this.MVUrl="";
		}
	}
})
