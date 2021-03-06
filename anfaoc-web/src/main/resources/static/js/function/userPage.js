/**
 * @Author wangzy
 */

$(document).ready(function (){

    var newDiv = "<ul class=\"breadcrumb__wrap\">\n" +
        "\t\t\t\t\t<li class=\"breadcrumb__item\"><a href=\"#\">个人主页</a></li>\n" +
        "\t\t\t\t\t<li class=\"breadcrumb__item breadcrumb__item--active\">收藏资讯</li>\n" +
        "\t\t\t\t</ul>";
    var userId = $("#userId").val();
    var hotNews = "";

    //获取用户信息
    $.get({
        url : "/api/anfaoc/user/ordinary/getUserDetail",
        dataType : "text",
        async : true,
        data : {
            userId : userId

        },
        success : function(result){
            var response = $.parseJSON(result);
            success = response.success;
            var user = response.result;
            if(success == true){
                $("#username").html(user.userName);
                $("#phonenumber").html(user.phoneNumber);
                $("#createTime").html(user.createTime);
            }else{

            }
        }
    })

    //获取新闻信息
    $.get({
        url : "api/anfaoc/news/getColNews",
        dataType : "text",
        async : true,
        data : {
            userId : userId

        },
        success : function(result){
            var response = $.parseJSON(result);
            success = response.success;
            if(success == true){
                finalDiv(response.result);
            }else{

            }
        }
    })

    //获取热点新闻榜
    $.get({
        url : "api/anfaoc/news/getHotNews",
        dataType : "text",
        async : true,
        data : {
            pageNo : 1

        },
        success : function(result){
            var response = $.parseJSON(result);
            success = response.success;
            if(success == true){
                fillHotNewsDiv(response.result);
            }else{

            }
        }
    })

    function fillHotNewsDiv(result) {
        for(var i = 0;i<result.length; i++){
            var jumpUrl = "getNewsDetail/"+result[i].id;
            hotNewsFill(jumpUrl,result[i].newTitle);
        }
        $("#hotNews").html(hotNews);
    }


    function hotNewsFill(jumpUrl,title) {
        hotNews = hotNews + "<div class=\"sidebox__job\">\n" +
            "\t\t\t\t\t\t\t<div class=\"sidebox__job-title\">\n" +
            "\t\t\t\t\t\t\t\t<a href=\" " + jumpUrl + "\">"+title +"</a>\n" +
            "\t\t\t\t\t</div>";
    }
    function finalDiv(result){
        for(var i = 0 ;i<result.length ; i++){
            var ajumpurl = "getNewsDetail/"+result[i].id;
            singleDiv(ajumpurl,result[i].newLabels,result[i].newTitle,result[i].userPreView,result[i].pageViews,i,result[i].id);
        }
        $("#newsDiv").html(newDiv);
    }

    //单个div格
    /**
     *
     * @param aurl 跳转详情连接
     * @param labelList 标签列表
     * @param title 文章标题
     * @param introduction 简介
     * @Param pageViews 浏览量
     * @Param newsNo 新闻编号
     * @Param collectUrl 收藏的url
     */
    function singleDiv(aurl,labelList,title,introduction,pageViews,newsNo,collectUrl){
        connRow("<div class=\"post\">\n" +
            "\t\t\t\t\t\t<div class=\"post__head\">\n" +
            "\t\t\t\t\t\t\t<div class=\"post__head-title\">\n" +
            "\t\t\t\t\t\t\t\t<h5><a href=\"#\">"+ title +"</a></h5>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\n" +
            "\t\t\t\t\t\t\t<div class=\"post__dropdown\">\n" +
            "\t\t\t\t\t\t\t\t<a class=\"dropdown-toggle post__dropdown-btn\" href=\"#\" role=\"button\" id=\"dropdownMenu3\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
            "\t\t\t\t\t\t\t\t\t<i class=\"icon ion-md-more\"></i>\n" +
            "\t\t\t\t\t\t\t\t</a>\n" +
            "\n" +
            "\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu dropdown-menu-right post__dropdown-menu\" aria-labelledby=\"dropdownMenu3\">\n" +
            "\t\t\t\t\t\t\t\t\t<li><a href=\"#\">Edit</a></li>\n" +
            "\t\t\t\t\t\t\t\t\t<li><a href=\"#\">Delete</a></li>\n" +
            "\t\t\t\t\t\t\t\t\t<li><a href=\"#\">Hide</a></li>\n" +
            "\t\t\t\t\t\t\t\t</ul>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\n" +
            "\t\t\t\t\t\t<div class=\"post__wrap\">\n" +
            "\t\t\t\t\t\t\t<div class=\"post__company\">\n" +
            "\t\t\t\t\t\t\t\t<i class=\"icon ion-ios-briefcase\"></i>\n" +
            "\t\t\t\t\t\t\t\t<span>简介</span>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\n" +
            "\t\t\t\t\t\t\t<div class=\"post__actions\">\n" +
            "\t\t\t\t\t\t\t\t<a class=\"post__actions-btn post__actions-btn--green\" href=\"#\">\n" +
            "\t\t\t\t\t\t\t\t\t<i class=\"icon ion-ios-bookmark\"></i>\n" +
            "\t\t\t\t\t\t\t\t</a>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\n" +
            "\t\t\t\t\t\t<div class=\"post__description\">\n" +
            "\t\t\t\t\t\t\t<p>"+ introduction +"</p>\n" +
            "\t\t\t\t\t\t\t<a href="+aurl+">view more</a>\n" + /** 新闻详情**/
            "\t\t\t\t\t\t</div>\n"
        )


        //标签添加
        connLabel(labelList);
        //剩余部分
        connRow("\t\t\t\t\t\t<div class=\"post__stats\">\n" +
            "\t\t\t\t\t\t\t<div>\n" +
            "\t\t\t\t\t\t\t\t<a class=\"post__likes\" href=\"#\"><i class=\"icon ion-ios-heart\"></i> <span>15</span></a>\n" +
            "\t\t\t\t\t\t\t\t<a class=\"post__comments\" data-toggle=\"collapse\" href=\"#collapse"+ newsNo +"\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapse1\"><i class=\"icon ion-ios-text\"></i> <span>0</span></a>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\n" +
            "\t\t\t\t\t\t\t<div class=\"post__views\">\n" +
            "\t\t\t\t\t\t\t\t<i class=\"icon ion-ios-eye\"></i> <span>"+ pageViews +"</span>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\n" +
            "\t\t\t\t\t\t<div class=\"collapse post__collapse\" id=\"collapse"+ newsNo +"\">\n" +
            "\t\t\t\t\t\t\t<form action=\"#\" class=\"post__form\">\n" +
            "\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Type your comment...\">\n" +  /** 评论的话 **/
            "\t\t\t\t\t\t\t\t<button type=\"button\"><i class=\"icon ion-ios-paper-plane\"></i></button>\n" +  /** 评论按钮 **/
            "\t\t\t\t\t\t\t</form>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t</div>")
    }

    //html拼接
    function connRow(Row){
        newDiv += Row + "\n";
    }

    //标签列表
    function connLabel(labels){
        connRow("\t\t\t\t\t\t<div class=\"post__tags\">");
        for(var i = 0;i < labels.length; i++){
            var label = "\t\t\t\t\t\t\t<a href=\"#\">" + labels[i] + "</a>";
            connRow(label);
        }
        connRow("\t\t\t\t\t\t</div>");
    }


})