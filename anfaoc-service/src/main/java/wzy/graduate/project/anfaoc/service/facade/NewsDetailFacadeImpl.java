package wzy.graduate.project.anfaoc.service.facade;

import com.alibaba.dubbo.config.annotation.Service;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import wzy.graduate.project.anfaoc.api.Request.NewsPagingRequest;
import wzy.graduate.project.anfaoc.api.domain.entity.Comments;
import wzy.graduate.project.anfaoc.api.facade.*;
import wzy.graduate.project.anfaoc.api.service.CommentsService;
import wzy.graduate.project.anfaoc.api.service.NewsCollectionService;
import wzy.graduate.project.anfaoc.common.model.Response;
import wzy.graduate.project.anfaoc.common.model.entity.ParaEntity;
import wzy.graduate.project.anfaoc.common.util.NewsUtil;
import wzy.graduate.project.anfaoc.service.convert.NewsDetailConvert;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import wzy.graduate.project.anfaoc.api.domain.entity.LabelDetail;
import wzy.graduate.project.anfaoc.api.service.LabelDetailService;
import wzy.graduate.project.anfaoc.api.service.NewsDetailService;
import wzy.graduate.project.anfaoc.common.model.dto.NewsDetailDTO;
import wzy.graduate.project.anfaoc.api.domain.entity.NewsDetail;
import wzy.graduate.project.anfaoc.service.util.MapUtil;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author wangzy
 */

@Slf4j
@Service
public class NewsDetailFacadeImpl implements NewsDetailFacade {

    @Autowired
    private NewsDetailService newsDetailService;

    @Autowired
    private LabelDetailService labelDetailService;

    @Autowired
    private CommentsFacade commentsFacade;

    @Autowired
    private NewsCollectionFacade newsCollectionFacade;

    @Autowired
    private UserLabelFacade userLabelFacade;

    private MapUtil mapUtil = new MapUtil();

    @Override
    public void updateNews(List<NewsDetailDTO> newsDetailDTOS) {
        List<NewsDetail> newsList = new ArrayList<>();

        try{

            for (NewsDetailDTO newsDetailDTO : newsDetailDTOS){

                List<LabelDetail> labelDetails = labelDetailService.exchageNameToId(newsDetailDTO);

                NewsDetail newsDetail = NewsDetailConvert.convertToNewsDetail(newsDetailDTO);

                NewsDetailConvert.addLabelDetails(newsDetail,labelDetails);
                newsList.add(newsDetail);
            }
            newsDetailService.updateNews(newsList);
        }catch (Exception e){
            log.error("updateNews fail:{}",e.getMessage());

        }
    }

    @Override
    public Response<List<NewsDetailDTO>> newsPage(NewsPagingRequest request) {
        List<NewsDetailDTO> newsDetailDTOS;
        try{

            Map<String,Object> criteria = mapUtil.toMap(request);
            List<NewsDetail> newsDetails = newsDetailService.paging(criteria);

            newsDetailDTOS = this.convertToFront(newsDetails);
        }catch (Exception e){
            log.info("获取资讯失败");
            return Response.fail("获取资讯失败");
        }
        return Response.ok(newsDetailDTOS);
    }


    @Override
    public Response<List<NewsDetailDTO>> searchNews(NewsPagingRequest request) {
        List<NewsDetailDTO> newsDetailDTOS;
        try{

            Map<String,Object> criteria = mapUtil.toSearchMap(request);
            List<NewsDetail> newsDetails = newsDetailService.paging(criteria);

            newsDetailDTOS = this.convertToFront(newsDetails);
        }catch (Exception e){
            log.info("获取资讯失败");
            return Response.fail("获取资讯失败");
        }
        return Response.ok(newsDetailDTOS);

    }
    @Override
    public Response<List<NewsDetailDTO>> newsPageRecommend(NewsPagingRequest request) {
        List<NewsDetailDTO> newsDetailDTOS;
        try{

            Map<String,Object> criteria = mapUtil.toRecMap(request);
            List<NewsDetail> newsDetails = newsDetailService.paging(criteria);
            List<String> labelIds = userLabelFacade.findLabelByUserId(request.getUserId());
            newsDetails = recommendFilter(newsDetails,labelIds);

            newsDetailDTOS = this.convertToFront(newsDetails);
        }catch (Exception e){
            log.info("获取资讯失败");
            return Response.fail("获取资讯失败");
        }
        return Response.ok(newsDetailDTOS);
    }

    /**
     * @Description 推荐新闻过滤
     * @Date  2020/5/14
     * @Param
     * @return
     **/
    private List<NewsDetail> recommendFilter(List<NewsDetail> newsDetails, List<String> userlabelIds) {
        List<NewsDetail> finalNewsDetail = new ArrayList<>();
        for(NewsDetail newsDetail:newsDetails){
            List<String> labelIds = NewsUtil.getLabelIds(newsDetail.getNewLabels());

            labelIds.retainAll(userlabelIds);
            if(labelIds.size() > 0){
                finalNewsDetail.add(newsDetail);
            }
        }
        return finalNewsDetail;
    }

    @Override
    public Response<List<NewsDetailDTO>> newsPageLike(Integer pageNo) {
        List<NewsDetailDTO> newsDetailDTOS = Lists.newArrayList();

        try{

        }catch (Exception e){

        }
        return Response.ok(newsDetailDTOS);
    }

    @Override
    public Response<NewsDetailDTO> getNewsDetail(Long newsId) {


        NewsDetailDTO newsDetailDTO = new NewsDetailDTO();

        try{
            Map<String,Object> criteria = Maps.newHashMap();
            criteria.put("id",newsId);
            NewsDetail newsDetail = newsDetailService.getNewsDetail(criteria);

            newsDetailDTO = this.DetailToDTO(newsDetail);
            List<Comments> comments = commentsFacade.getAllCommnets(newsId);
            newsDetailDTO.setComments(comments.stream().map(Comments::getContent).collect(Collectors.toList()));
            newsDetailDTO.setCommentsName(comments.stream().map(Comments::getUsername).collect(Collectors.toList()));
            newsDetailDTO.setCommentsNum(String.valueOf(comments.size()));
            newsDetailService.addPageViews(criteria);
        }catch (Exception e){

            log.info("getNewsDetail:{}",e.getMessage());
            return Response.fail("获取新闻失败");

        }

        return Response.ok(newsDetailDTO);
    }

    @Override
    public Response<List<NewsDetailDTO>> newsColPage(String userId) {
        List<NewsDetailDTO> newsDetailDTOS = new ArrayList<>();
        try{
            List<String> newsIds = newsCollectionFacade.getAllColNewsId(userId);
            Map<String,Object> criteria = Maps.newHashMap();
            criteria.put("ids",newsIds);
            List<NewsDetail> newsDetails = newsDetailService.colNews(criteria);
            newsDetailDTOS = this.convertToFront(newsDetails);
        }catch (Exception e){

        }
        return Response.ok(newsDetailDTOS);
    }

    /**
     * @Description 新闻格式批量转化
     * @Date  2020/5/11
     **/
    private List<NewsDetailDTO> convertToFront(List<NewsDetail> newsDetails){
        List<NewsDetailDTO> newsDetailDTOS = new ArrayList<>();
        for(NewsDetail newsDetail : newsDetails)
        {
            NewsDetailDTO newsDetailDTO = new NewsDetailDTO();
            try{
                newsDetailDTO = this.DetailToDTO(newsDetail);
            }catch (Exception e){
                log.info("convert fail :{}",e.getMessage());
            }
            newsDetailDTOS.add(newsDetailDTO);
        }

        return newsDetailDTOS;
    }

    /**
     * @Description Detail==》DTO
     * @Date  2020/5/12
     **/
    private NewsDetailDTO DetailToDTO(NewsDetail newsDetail){
        NewsDetailDTO newsDetailDTO = new NewsDetailDTO();
        newsDetailDTO.setId(newsDetail.getId());
        newsDetailDTO.setNewTitle(newsDetail.getNewTitle());
        List<String> labelIds = NewsUtil.getLabelIds(newsDetail.getNewLabels());

        newsDetailDTO.setNewLabels(labelDetailService.getLabelNameById(labelIds));

        //TODO需要处理,保留一部分
        newsDetailDTO.setNewParas(NewsUtil.getParas(newsDetail.getNewParas()));

        //处理段落
        newsDetailDTO.setNewsFinalPara(convertPara(newsDetailDTO.getNewParas()));

        //处理简介
        newsDetailDTO.setPreViewPara(convertPrePara(newsDetailDTO.getNewParas()));
        newsDetailDTO.setPageViews(newsDetail.getPageViews() + 1L);

        List<Comments> comments = commentsFacade.getAllCommnets(newsDetail.getId());
        newsDetailDTO.setCommentsNum(String.valueOf(comments.size()));
        newsDetailDTO.setUserPreView(convertUserPre(newsDetailDTO.getNewParas()));
        return newsDetailDTO;
    }

    private String convertUserPre(List<ParaEntity> newParas) {
        StringBuilder finalParas = new StringBuilder();
        int index = 0;
        for(ParaEntity paraEntity : newParas){
            index++;
            if(index>=5){
                break;
            }
            String para = paraEntity.getContent();
            switch (paraEntity.getType()){
                case PICTURE:
                    finalParas.append(NewsUtil.doUserPictureInt(para));
                    break;
                case PARAGRAPH:
                    finalParas.append(NewsUtil.doUserParaInt(para));
                    break;
                case DESCRIPTION:
                    finalParas.append(NewsUtil.doDes(para));
                    break;
            }
        }
        return finalParas.toString();
    }

    /**
     * @Description 获取简介
     * @Date  2020/5/12
     **/
    private String convertPrePara(List<ParaEntity> newParas) {
        StringBuilder finalParas = new StringBuilder();
        int index = 0;
        for(ParaEntity paraEntity : newParas){
            index++;
            if(index>=5){
                break;
            }
            String para = paraEntity.getContent();
            switch (paraEntity.getType()){
                case PICTURE:
                    finalParas.append(NewsUtil.doPictureInt(para));
                    break;
                case PARAGRAPH:
                    finalParas.append(NewsUtil.doParaInt(para));
                    break;
                case DESCRIPTION:
                    finalParas.append(NewsUtil.doDes(para));
                    break;
            }
        }
        return finalParas.toString();
    }

    /**
     * @Description 段落内容转化
     * @Date  2020/5/11
     **/
    private String convertPara(List<ParaEntity> orgNewParas){
        StringBuilder finalParas = new StringBuilder();

        for(ParaEntity paraEntity : orgNewParas){
            String para = paraEntity.getContent();
            switch (paraEntity.getType()){
                case PICTURE:
                    finalParas.append(NewsUtil.doPicture(para));
                    break;
                case PARAGRAPH:
                    finalParas.append(NewsUtil.doPara(para));
                    break;
                case DESCRIPTION:
                    finalParas.append(NewsUtil.doDes(para));
                    break;
            }
        }

        return finalParas.toString();
    }
}
