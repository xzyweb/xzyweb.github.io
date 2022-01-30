getbody();
function getbody(){
	if (!getvalue('page')) {
	    $("#body").html('<h3>页面载入出错！</h3>')
		return;
	} else {
	    var pagev = getvalue('page')
	}
	
	var body = "";
	$.get({
	    url: "https://api.github.com/repos/xzyweb/xzyweb.github.io/issues/" + pagev,
	    dataType: "json",
	    success: function(data) {
	        if (!data.hasOwnProperty('message')) {
				$("title").html(data.title+' | 小小资源站');
	            $.post({
	                url: "https://api.github.com/markdown",
	                data: JSON.stringify({
	                    'text': data.body
	                }),
	                dataType: "html",
	                success: function(res) {
	                    var d = new Date(data.created_at);
	                    var ctime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
	                    var d = new Date(data.updated_at);
	                    var ltime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
	                    var body=res.substr(res.split("\n")[0].length);
						$("#body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + body)
					},
	                error: function(data) {
	                    if (data.status == 403) {
	                        $("#body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + '<p>操作过于频繁，请稍后再试</p>');
	                    } else if (data.status == 0) {
	                        $("#body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + '<p>无法连接至服务器，请检查网络设置</p>');
	                    } else if (data.status == 404) {
	                        $("#body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + '<p>系统异常，请稍后再试</p>');
	                    } else if (data.status == 200) {
	                        $("#body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + '<p>系统异常，请重新刷新后再试</p>');
	                    } else {
	                        alert(data.msg);
	                        $("#body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + '<p>' + data.msg + '</p>');
	                    }
	                }
	            })
	        } else {
				$("#body").html('<h3>系统异常，请重新刷新后再试</h3>');
	        }
	    },
	    error: function(data) {
	        if (data.status == 403) {
	            $("#body").html('<h3>加载出错了!</h3><hr><p>操作过于频繁，请稍后再试</p>');
	        } else if (data.status == 0) {
	            $("#body").html('<h3>加载出错了!</h3><hr><p>无法连接至服务器，请检查网络设置</p>');
	        } else if (data.status == 404) {
	            $("#body").html('<h3>加载出错了!</h3><hr><p>文章不存在</p>');
	        } else if (data.status == 410) {
	            $("#body").html('<h3>加载出错了!</h3><hr><p>文章已被删除</p>');
	        } else if (data.status == 200) {
	            $("#body").html('<h3>加载出错了!</h3><hr><p>系统异常，请重新刷新后再试</p>');
	        } else {
	            $("#body").html('<h3>加载出错了!</h3><hr><p>' + data.msg + '</p>');
	        }
	    }
	})
}
function getvalue(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return (false)
}