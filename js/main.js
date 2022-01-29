$.get({
    url: "https://api.github.com/repos/xzyweb/xzyweb.github.io/issues?state=open&per_page=10&page=1&labels=置顶;广告;手机资源;电脑资源;工具推荐",
    dataType: "json",
    success: function(data) {
        if (!data.hasOwnProperty('message')) {
			var topup ="";
			var body="";
            for (i = 0; i in data; i++) {
                var label = "";
                var img = "";
				var top = false;
                for (n = 0; n in data[i].labels; n++) {
					if(data[i].labels[n].name=="置顶"){
						var top=true;
					}else{
						var label = label + '<span class="badge rounded-pill bg-primary">' + data[i].labels[n].name + '</span> ';
					}
                }
				if(top==true){
					var topup = topup + '<a href="./body.html?page=' + data[i].number + '" class="list-group-item list-group-item-action"><h4><span class="badge rounded-pill bg-primary">置顶</span>' + data[i].title.substr(4) + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</a>';
				}else{
					var body = body +'<a href="./body.html?page=' + data[i].number + '" class="list-group-item list-group-item-action"><h4>' + data[i].title + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</li>';
				}
			}
			$('#list').append(topup);
			$('#list').append(body);
        } else {
            alert('系统异常，请重新刷新后再试')
        }
    },
    error: function(data) {
        if (data.status == 403) {
            alert('操作过于频繁，请稍后再试')
        } else if (data.status == 0) {
            alert('无法连接至服务器，请检查网络设置')
        } else if (data.status == 404) {
            alert('系统异常，请稍后再试')
        } else if (data.status == 200) {
            alert('系统异常，请重新刷新后再试')
        } else {
            alert(data.msg)
        }
    }
});
$.get({
    url: "https://api.github.com/repos/xzyweb/xzyweb.github.io/issues?state=open&per_page=5&page=1",
    dataType: "json",
    success: function(data) {
        if (!data.hasOwnProperty('message')) {
			var top ="";
			var body="";
            for (i = 0; i in data; i++) {
                var label = "";
                var img = "";
                for (n = 0; n in data[i].labels; n++) {
                    var label = label + '<span class="badge rounded-pill bg-primary">' + data[i].labels[n].name + '</span> '
                }
				if(data[i].title.substr(0,4)!=="[置顶]"){
					var body = body +'<a href="./body.html?page=' + data[i].number + '" class="list-group-item list-group-item-action"><h4>' + data[i].title + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</li>';
				}
			}
			$('#list_right').append(body);
        } else {
            alert('系统异常，请重新刷新后再试')
        }
    },
    error: function(data) {
        if (data.status == 403) {
            alert('操作过于频繁，请稍后再试')
        } else if (data.status == 0) {
            alert('无法连接至服务器，请检查网络设置')
        } else if (data.status == 404) {
            alert('系统异常，请稍后再试')
        } else if (data.status == 200) {
            alert('系统异常，请重新刷新后再试')
        } else {
            alert(data.msg)
        }
    }
});
