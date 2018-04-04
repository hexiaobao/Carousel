/*
	该轮播图插件是基于jquery开发的，利用jquery的fadeTo()方法实现图片的轮播
	我们只需要图片和小圆圈按钮的索引一一对应起来就可以咯
*/
var hbt_imgList = $(".hbt-con");//获取图像列表<li>对象
var hbt_littelBtn = $("#hbt-goTab a");//获取图像下边按钮对象
var hbt_contain = $(".hbt-tab")//获取整个图像容器对象，便于书写鼠标移入停止轮播移除继续轮播
var hbt_index = 1;//图像轮播索引，即轮播第几章图片
var hbt_prev = $("#hbt-prev");//获取图片向前轮播按钮
var hbt_next = $("#hbt-next");//获取图片向后轮播按钮
var timer;//定时器变量
var hbt_length = $("#hbt-goTab a").length;//获取下面小按钮的数量，对应索引

$(document).ready(function(){
	/*hbt_contain.mouseover(function(event) {
		stop();
	});
	hbt_contain.mouseout(function(event) {
		play();
	});*/
	hbt_contain.on({
		mouseover:function(){//鼠标移入停止轮播
			stop();
		},
		mouseout:function(){//鼠标移出开始轮播
			play();
		}
	});
	hbt_prev.on("click",function(){//向前按钮点击处理事件
		hbt_index -= 1;
		if(hbt_index < 1){//索引超出最小值将其值设置为8
			hbt_index = 8;
		}
		hbtShowImg();
		hbtShowBtn();
	});
	hbt_next.on("click",function(){//向后按钮点击处理事件
		hbt_index += 1;
		if(hbt_index > 8){//索引超出最大值将其值设置为1
			hbt_index = 1;
		}
		hbtShowImg();
		hbtShowBtn();
	});
	for (var i = 0; i < hbt_length; i++) {  //循环绑定下面按钮的点击事情
        (function (i) {
            hbt_littelBtn[i].onclick = function () {
                hbt_index = i + 1;
                hbtShowImg();
                hbtShowBtn();
            }
        })(i)
    }
});

function play(){//开始轮播
	timer = setInterval(function(){
		hbt_index += 1;
		if(hbt_index > hbt_length){//索引超出最大值将其值设置为1
			hbt_index = 1;
		}
		hbtShowImg();
		hbtShowBtn();
	},4000)
}

function stop(){//停止轮播
	clearInterval(timer);
}

function hbtShowImg(){//图片轮播梳理
	for (var i = 0; i < hbt_length; i++) {
	//注意，list索引是从0开始的，所以第一张图片和第一个按钮对应索引是0二不是1
		if(hbt_imgList.eq(i).css("opacity") == 1){
			hbt_imgList.eq(i).fadeTo(2000,0);
		}
	}
	hbt_imgList.eq(hbt_index - 1).fadeTo(2000,1);
}

function hbtShowBtn(){//小按钮切换梳理
	for (var i = 0; i < hbt_length; i++) {
		if(hbt_littelBtn.eq(i).hasClass('itemActive')){
			hbt_littelBtn.eq(i).removeClass('itemActive');
			hbt_littelBtn.eq(i).addClass('item');
		}
	}
	hbt_littelBtn.eq(hbt_index - 1).addClass('itemActive');
}
play();
