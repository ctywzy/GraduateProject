/**
 * @Description 填充新闻
 * Author wangzy
 * Date 5月10日
 **/

$(document).ready(function () {
    //新闻页面填充
    var newDiv = "";
    var pageNumber = $("#pageNumber").val();
    var success;
    $.get({
        url : "api/anfaoc/news/getHotNews",
        dataType : "text",
        async : true,
        data : {
            pageNo : pageNumber

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

    $("#searchButton").click(function () {
        var  newTitle = $("#newsTitleSearch")
        var begin = $("#filter__range-start")
        var end = $("#filter__range-end")
        $.get({
        url : "api/anfaoc/news",
            dataType : "text",
            async : true,
            data :{
                newTitle : newTitle,
                viewBegin : begin,
                viewEnd : end
            },
            success : function(result){
                var response = $.parseJSON(result);
                success = response.success;
                if(success == true){
                    newDiv = ""
                    finalDiv(response.result);
                }else{

                }
            }
        })
    })


    $("#loadMoreButton").click(function () {
        pageNumber = Number(pageNumber) + Number(1);
        $("#pageNumber").val(pageNumber);
        $.get({
            url : "api/anfaoc/news/getHotNews",
            dataType : "text",
            async : true,
            data : {
                pageNo : pageNumber

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
    })

    //最后的div表格
    function finalDiv(result){
        for(var i = 0 ;i<result.length ; i++){
            var ajumpurl = "getNewsDetail/"+result[i].id;
            singleDiv(ajumpurl,result[i].newLabels,result[i].newTitle,result[i].preViewPara,result[i].pageViews,i,result[i].id,result[i].commentsNum);
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
    function singleDiv(aurl,labelList,title,introduction,pageViews,newsNo,collectUrl,commentsNum){
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
           "\t\t\t\t\t\t\t\t<a class=\"post__comments\" data-toggle=\"collapse\" href=\"#collapse"+ newsNo +"\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapse1\"><i class=\"icon ion-ios-text\"></i> <span>"+commentsNum+"</span></a>\n" +
           "\t\t\t\t\t\t\t</div>\n" +
           "\n" +
           "\t\t\t\t\t\t\t<div class=\"post__views\">\n" +
           "\t\t\t\t\t\t\t\t<i class=\"icon ion-ios-eye\"></i> <span>"+ pageViews +"</span>\n" +
           "\t\t\t\t\t\t\t</div>\n" +
           "\t\t\t\t\t\t</div>\n" +
           "\n" +
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