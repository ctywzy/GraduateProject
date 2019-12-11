package wzy.graduate.project.anfaoc.web;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * @Description //TODO
 * @author wangzy
 * @Date  2019/12/10
 **/

@Configuration
@ComponentScan({"wzy.graduate.project.anfaoc.web*"})
@EnableAutoConfiguration
@EnableWebMvc
public class AnfaocWebStarterAutoConfig {

}