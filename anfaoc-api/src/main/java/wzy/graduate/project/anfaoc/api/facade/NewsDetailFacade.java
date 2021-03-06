package wzy.graduate.project.anfaoc.api.facade;

import wzy.graduate.project.anfaoc.api.Request.NewsPagingRequest;
import wzy.graduate.project.anfaoc.common.model.Response;
import wzy.graduate.project.anfaoc.common.model.dto.NewsDetailDTO;

import java.util.List;

/**
 * @author wangzy
 */
public interface NewsDetailFacade {

    /**
     * @Description 更新新闻的接口，把新闻插入库中
     * @Date  2020/1/19
     * @param newsList
     * */
    void updateNews(List<NewsDetailDTO> newsList);

    /**
     * @Description 展示新闻到前端，pageSize默认20
     * @Date  2020/3/30
     * @Param
     **/
    Response<List<NewsDetailDTO>> newsPage(NewsPagingRequest request);

    /**
     * @Description 展示该用户被推荐的新闻到前端，pageSize 默认20
     * @Date  2020/3/30
     **/
    Response<List<NewsDetailDTO>> newsPageRecommend(NewsPagingRequest request);

    /**
     * @Description 展示该用户自己喜欢的新闻，pageSize 默认20
     * @Date  2020/3/30
     **/
    Response<List<NewsDetailDTO>> newsPageLike(Integer pageNo);

    /**
     * @Description 根据id获得新闻详情
     * @Date  2020/5/12
     **/
    Response<NewsDetailDTO> getNewsDetail(Long newsId);

    /**
     * @Description 根据用户id获取新闻
     * @Date  2020/5/13
     **/
    Response<List<NewsDetailDTO>> newsColPage(String userId);

    /**
     * @Description 查找新闻
     * @Date  2020/5/15
     **/
    Response<List<NewsDetailDTO>> searchNews(NewsPagingRequest request);
}
