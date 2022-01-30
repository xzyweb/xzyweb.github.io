labelsearch();
function labelsearch(){
	if (!getvalue('name')) {
	    var pagev="";
	} else {
	    var pagev = getvalue('name');
	}
	if(!getvalue('page')){
		var pagenum='1';
	}else{
		var pagenum=getvalue('page');
	}
	if(pagenum=="1"){
		$.get({
		    url: "https://api.github.com/repos/xzyweb/xzyweb.github.io/issues?state=all&labels=置顶,"+pagev,
		    dataType: "json",
		    success: function(data) {
		        if (!data.hasOwnProperty('message')) {
		            var body="";
		            for (i = 0; i in data; i++) {
		                var label = "";
		                var img = "";
		            	var top = false;
		                for (n = 0; n in data[i].labels; n++) {
		            		if(data[i].labels[n].name=="置顶"){
		            			var top = true;
		            		}else{
		            			var label = label + '<span class="badge rounded-pill bg-primary">' + data[i].labels[n].name + '</span> ';
		            		}
		                }
		            	var body = body + '<a href="./body.html?page=' + data[i].number + '" class="list-group-item list-group-item-action"><h4><span class="badge rounded-pill bg-primary">置顶</span>' + data[i].title + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</a>';
		            }
		            $('#label_body').html(''+body);
		        } else {
					$("#label_body").html('<p>系统异常，请重新刷新后再试</p>');
		        }
		    },
		    error: function(data) {
		        if (data.status == 403) {
		            $("#label_body").html('<p>操作过于频繁，请稍后再试</p>');
		        } else if (data.status == 0) {
		            $("#label_body").html('<p>无法连接至服务器，请检查网络设置</p>');
		        } else if (data.status == 404) {
		            $("#label_body").html('<p>文章不存在</p>');
		        } else if (data.status == 410) {
		            $("#label_body").html('<p>文章已被删除</p>');
		        } else if (data.status == 200) {
		            $("#label_body").html('<p>系统异常，请重新刷新后再试</p>');
		        } else {
		            $("#label_body").html('<p>' + data.msg + '</p>');
		        }
		    }
		})
	}
	$.get({
	    url: "https://api.github.com/repos/xzyweb/xzyweb.github.io/issues?state=open&labels="+pagev+'&per_page=10&page='+pagenum,
	    dataType: "json",
	    success: function(data) {
	        if (!data.hasOwnProperty('message')) {
	            var body="";
	            for (i = 0; i in data; i++) {
	                var label = "";
	                var img = "";
	            	var top = false;
	                for (n = 0; n in data[i].labels; n++) {
	            		if(data[i].labels[n].name=="置顶"){
	            			var top = true;
	            		}else{
	            			var label = label + '<span class="badge rounded-pill bg-primary">' + data[i].labels[n].name + '</span> ';
	            		}
	                }
	            	if(top==false){
	            		var body = body + '<a href="./body.html?page=' + data[i].number + '" class="list-group-item list-group-item-action"><h4>' + data[i].title + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</a>';
	            	}
	            }
	            $('#label_body').append(body);
				var page=Number(pagenum)-1;
				if(page == 0){
					var pagebody='<li class="page-item disabled"><a class="page-link" href="#">上一页</a></li>';
				}else{
					var pagebody='<li class="page-item"><a class="page-link" href="?name='+pagev+'&page='+page+'">上一页</a></li>';
				}
				var pagebody= pagebody+'<li class="page-item active"><a class="page-link" href="#">'+pagenum+'</a></li>';
				if(data.length == 10){
					var page=Number(pagenum)+1;
					var pagebody= pagebody+'<li class="page-item"><a class="page-link" href="?name='+pagev+'&page='+page+'">下一页</a></li>';
				}else{
					var pagebody= pagebody+'<li class="page-item disabled"><a class="page-link" href="#">下一页</a></li>';
				}
				$('#label_body').append('<nav class="mt-2"><ul class="pagination">'+pagebody+'</ul></nav>');
	        } else {
				$("#label_body").html('<p>系统异常，请重新刷新后再试</p>');
	        }
	    },
	    error: function(data) {
	        if (data.status == 403) {
	            $("#label_body").html('<p>操作过于频繁，请稍后再试</p>');
	        } else if (data.status == 0) {
	            $("#label_body").html('<p>无法连接至服务器，请检查网络设置</p>');
	        } else if (data.status == 404) {
	            $("#label_body").html('<p>文章不存在</p>');
	        } else if (data.status == 410) {
	            $("#label_body").html('<p>文章已被删除</p>');
	        } else if (data.status == 200) {
	            $("#label_body").html('<p>系统异常，请重新刷新后再试</p>');
	        } else {
	            $("#label_body").html('<p>' + data.msg + '</p>');
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