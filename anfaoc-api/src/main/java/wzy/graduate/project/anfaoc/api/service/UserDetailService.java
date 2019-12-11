package wzy.graduate.project.anfaoc.api.service;

import wzy.graduate.project.anfaoc.api.model.UserDetail;

import java.util.List;

/**
 * @Description //TODO
 * @author wangzy
 * @Date  2019/12/10
 **/

public interface UserDetailService {

    /**
     * @Description 查询所有的用户信息
     * @Date  2019/12/10
     * @Param
     * @return
     **/
    List<UserDetail> getAllUserDetail();
}