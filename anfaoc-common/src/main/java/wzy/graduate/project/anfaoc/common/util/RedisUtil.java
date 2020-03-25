package wzy.graduate.project.anfaoc.common.util;


import com.google.common.collect.Maps;
import com.zhenzi.sms.ZhenziSmsClient;
import org.springframework.beans.factory.annotation.Autowired;
import wzy.graduate.project.anfaoc.common.exception.RestException;
import wzy.graduate.project.anfaoc.common.model.ZhenziSMS;

import java.util.Map;
import java.util.Random;

/**
 * @Description redis操作相关工具
 * @Date  2020/3/25
 * @Author wangzy
 **/

public class RedisUtil {

    public static final ZhenziSmsClient client = new ZhenziSmsClient(ZhenziSMS.APIURL,ZhenziSMS.APPID,ZhenziSMS.APPSECRET);

    /**
     * @Description 向指定手机号发送验证码
     * @Date  2020/3/25
     **/
    public static String getSendVerityCode(String phoneNumber,Integer verityCode) throws Exception {
        Map<String,String> param = Maps.newHashMap();
        StringBuilder message = new StringBuilder("您好，您的验证码是:" + verityCode);
        param.put("number",phoneNumber);
        param.put("message",message.toString());
        String result = null;
        result = client.send(param);

        return result;
    }
}
