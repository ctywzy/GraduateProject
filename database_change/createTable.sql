-- 创建用户表
CREATE TABLE `user_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_name` varchar (20) NOT NULL COMMENT '用户名',
  `user_password` varchar(31) NOT NULL COMMENT '用户密码',
  `user_authority` varchar(20) DEFAULT NULL COMMENT '用户权限vip管理员或普通用户',
  `phone_number` varchar(20) NOT NULL COMMENT '手机号',
  `create_time` varchar(31) DEFAULT NULL COMMENT '账号创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;


-- 创建新闻表
CREATE TABLE `new_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `new_url` varchar(50) DEFAULT NULL COMMENT '新闻地址',
  `new_title` varchar(50) DEFAULT NULL COMMENT '新闻标题',
  `new_labels` varchar(200) NOT NULL COMMENT '新闻标签',
  `new_paras` mediumtext NOT NULL COMMENT '新闻段落',
  `create_time` varchar(50) DEFAULT NULL COMMENT '爬取时间',
  `comments_id` varchar(1000) DEFAULT NULL COMMENT '评论id',
  `heat_number` bigint(20) DEFAULT NULL COMMENT '文章热值',
  `page_views` bigint(20) DEFAULT NULL COMMENT '文章浏览量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 创建标签表 -标签名也作为主键
CREATE TABLE `label_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `label_name` varchar(20) NOT NULL COMMENT '标签名称',
  `label_num` bigint(20) NOT NULL COMMENT '标签热度',
  `create_time` varchar(31) NOT NULL COMMENT '标签创建时间',
  PRIMARY KEY (`id`,`label_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 创建评论表
CREATE TABLE `comments` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
    `content` varchar(255) NOT NULL COMMENT '用户id',
    `news_id` varchar(20) NOT NULL COMMENT '新闻id',
    `user_name` varchar(20) NOT NULL COMMENT '新闻id',
    `create_time` varchar(31) NOT NULL COMMENT '标签创建时间',
    PRIMARY KEY (`id`) USING BTREE
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 用户标签表
CREATE TABLE `user_label` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
    `user_id` varchar(255) NOT NULL COMMENT '用户id',
    `label_id` varchar(20) NOT NULL COMMENT '标签id',
    `create_time` varchar(31) NOT NULL COMMENT '标签创建时间',
    PRIMARY KEY (`id`) USING BTREE
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 新闻收藏表
CREATE TABLE `news_collection` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
    `user_id` varchar(20) NOT NULL COMMENT '用户id',
    `news_id` varchar(20) NOT NULL COMMENT '新闻id',
    `create_time` varchar(31) NOT NULL COMMENT '标签创建时间',
    PRIMARY KEY (`id`) USING BTREE
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;


