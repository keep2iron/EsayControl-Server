/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : keep2iron

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2017-06-19 09:37:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_apk_file`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_apk_file`;
CREATE TABLE `tbl_apk_file` (
  `id` varchar(40) NOT NULL DEFAULT '',
  `type` varchar(15) NOT NULL DEFAULT '',
  `path` varchar(100) DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_apk_file
-- ----------------------------
INSERT INTO `tbl_apk_file` VALUES ('289ed445bf63d9839b72c9f1ad052af3', 'local', '/apk/289ed445bf63d9839b72c9f1ad052af3/local/app-productjjclocal-debug.apk', '1.1');
INSERT INTO `tbl_apk_file` VALUES ('289ed445bf63d9839b72c9f1ad052af3', 'release', '/apk/289ed445bf63d9839b72c9f1ad052af3/release/app-Release_-release.apk', '1.1');
INSERT INTO `tbl_apk_file` VALUES ('289ed445bf63d9839b72c9f1ad052af3', 'releaseDebug', '/apk/289ed445bf63d9839b72c9f1ad052af3/releaseDebug/app-productjjclocal-debug.apk', '1.2');

-- ----------------------------
-- Table structure for `tbl_app`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_app`;
CREATE TABLE `tbl_app` (
  `name` varchar(30) DEFAULT NULL,
  `id` varchar(40) NOT NULL DEFAULT '',
  `icon_url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_app
-- ----------------------------
INSERT INTO `tbl_app` VALUES ('吉家', '289ed445bf63d9839b72c9f1ad052af3', 'apk/289ed445bf63d9839b72c9f1ad052af3/app_icon.png');
