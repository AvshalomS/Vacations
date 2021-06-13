CREATE DATABASE  IF NOT EXISTS `VacationDB` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `VacationDB`;
-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: VacationDB
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `vacationID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=557 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (254,2,1),(255,2,2),(256,2,3),(320,4,2),(321,4,3),(322,4,4),(323,39,4),(324,39,5),(325,39,6),(329,40,5),(339,3,3),(340,3,1),(341,10,1),(342,10,2),(343,10,3),(351,10,4),(352,10,5),(371,3,5),(522,3,2),(542,3,4);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(45) DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'root','','root','root','2019-10-31 11:45:56','Admin'),(2,'avshalom','shahar','avshalom','u1234','2019-10-31 11:45:58','user'),(3,'user','1','user1','u1234','2019-10-31 11:46:12','user'),(4,'user','2','user2','u1234','2019-10-31 11:46:30','user'),(5,'user','3','user3','u1234','2019-10-31 11:46:56','user'),(6,'user','4','user4','u1234','2019-10-31 11:47:12','user'),(7,'user','5','user5','u1234','2019-10-31 11:48:34','user'),(8,'user','6','user6','u1234','2019-10-31 11:55:37','user'),(9,'user','7','user7','u1234','2019-10-31 16:32:08','user'),(10,'user','8','user8','u1234','2019-10-31 20:48:00','user'),(11,'user','9','user9','u1234','2019-10-31 20:50:15','user'),(12,'user','10','user10','u1234','2019-10-31 20:53:27','user'),(13,'user','11','user11','u1234','2019-10-31 20:55:38','user'),(14,'user','12','user12','u1234','2019-10-31 20:58:01','user'),(15,'user','13','user13','u1234','2019-10-31 21:00:02','user'),(16,'user','14','user14','u1234','2019-10-31 21:00:53','user'),(17,'user','15','user15','u1234','2019-10-31 21:01:29','user'),(18,'user','16','user16','u1234','2019-10-31 21:04:27','user'),(19,'user','17','user17','u1234','2019-10-31 21:11:06','user'),(20,'user','18','user18','u1234','2019-10-31 21:12:29','user'),(21,'user','19','user19','u1234','2019-11-04 19:53:28','user'),(22,'user','20','user20','u1234','2019-11-04 20:05:40','user'),(23,'user','21','user21','u1234','2019-11-04 20:20:15','user'),(24,'user','22','user22','u1234','2019-11-04 20:21:47','user'),(25,'user','23','user23','u1234','2019-11-04 20:24:01','user'),(26,'user','24','user24','u1234','2019-11-04 21:08:47','user'),(27,'user','25','user25','u1234','2019-11-04 22:21:34','user'),(28,'user','26','user26','u1234','2019-11-05 19:53:34','user'),(29,'user','27','user27','u1234','2019-11-05 20:44:16','user'),(30,'user','28','user28','u1234','2019-11-06 20:17:52','user'),(31,'user','29','user29','u1234','2019-11-13 18:50:00','user'),(32,'user','30','user30','u1234','2019-11-13 19:13:11','user'),(33,'user','31','user31','u1234','2019-11-13 19:19:26','user'),(34,'user','32','user32','u1234','2019-11-13 19:35:05','user'),(35,'user','33','user33','u1234','2019-11-13 19:54:56','user'),(36,'user','34','user34','u1234','2019-11-13 20:00:08','user'),(37,'user','35','user35','u1234','2019-11-13 20:25:49','user'),(38,'user','36','user36','u1234','2019-11-15 07:56:27','user'),(39,'user','37','user37','u1234','2019-11-19 14:09:18','user'),(40,'user','38','user38','u1234','2019-11-26 19:00:48','user'),(41,'user','39','user39','u1234','2019-12-07 20:38:33','user'),(42,'user','40','user40','u1234','2019-12-07 20:44:02','user'),(43,'user','41','user41','u1234','2019-12-07 20:48:24','user'),(44,'user','42','user42','u1234','2019-12-07 20:59:02','user'),(45,'user','43','user43','u1234','2019-12-07 21:09:18','user'),(46,'user','44','user44','u1234','2019-12-07 21:46:47','user'),(47,'user','45','user45','u1234','2019-12-13 13:01:45','user'),(48,'user','46','user46','u1234','2019-12-13 13:04:39','user'),(49,'user','47','user47','u1234','2019-12-13 13:06:37','user'),(50,'user','48','user48','u1234','2019-12-14 21:47:38','user'),(51,'user','49','user49','u1234','2019-12-21 20:23:47','user'),(52,'user','50','user50','u1234','2019-12-21 20:44:25','user'),(53,'user','51','user51','u1234','2019-12-21 20:48:50','user'),(54,'user','52','user52','u1234','2019-12-21 21:04:46','user'),(55,'user','53','user53','u1234','2019-12-21 21:07:31','user'),(56,'user','54','user54','u1234','2019-12-21 20:43:18','user'),(57,'user','55','user55','u1234','2019-12-28 22:10:53','user'),(58,'user','56','user56','u1234','2019-12-29 02:05:37','user'),(59,'user','57','user57','u1234','2020-01-06 20:55:34','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vacation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `place` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `dateFrom` datetime DEFAULT NULL,
  `dateTo` datetime DEFAULT NULL,
  `price` text,
  `followersCount` int(11) DEFAULT '0',
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (1,'Restaurants, shopping complexes, yacht cruise options on the Herzliya promenade','The marina in Herzliya','1574798984879-architecture-buildings-city-Herzlia-Israel-1741605.jpg','2019-09-13 00:00:00','2019-09-17 00:00:00','1200',3,'2019-08-29 21:14:16','2019-11-26 20:09:44'),(2,'Hotels, beach, shopping and restaurants in the amazing Tel Aviv','Tel-Aviv','1574799042109-aerial-aerial-photography-aerial-shot-telaviv-yafo-2002604.jpg','2019-09-13 00:00:00','2019-09-17 00:00:00','1100',4,'2019-08-29 21:22:55','2019-11-26 20:10:42'),(3,'A tour of the streets of ancient Jerusalem combines 4 different cultures Jews, Arabs, Armenians and Christians, holy places and a journey towards history','Jerusalem old city','1574799061926-buildings-business-Jerusalem-Old-city-2396134.jpg','2019-09-21 00:00:00','2019-09-28 00:00:00','1500',4,'2019-08-29 21:40:15','2019-11-26 20:11:01'),(4,'Beutifull trip in desert and dead sea','Ein Gedi','1574799085059-cascade-daylight-ein-gedi-2102626.jpg','2019-11-16 00:00:00','2019-11-18 00:00:00','500',4,'2019-11-05 21:52:48','2019-11-26 20:11:25'),(5,'Eilat','Eilat','1574799109749-adventure-climbing-daylight-Eilat-2450750.jpg','2019-11-10 00:00:00','2019-11-13 00:00:00','700',3,'2019-11-05 21:58:37','2019-11-26 20:11:49'),(6,'טיול מהמם ברחובות ירושלים העתיקה','ירושלים העתיקה ','1574799133110-buildings-business-Jerusalem-Old-city-2396134.jpg','2019-11-14 00:00:00','2019-11-17 00:00:00','1000',1,'2019-11-06 20:19:38','2019-11-26 20:12:13'),(14,'ים, קניות ומרכזי בילויים','תל אביב','1574799167895-aerial-aerial-photography-aerial-shot-telaviv-yafo-2002604.jpg','2019-11-18 00:00:00','2019-11-20 00:00:00','100',0,'2019-11-19 14:00:19','2019-11-26 20:12:47');
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'VacationDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-06 21:09:15
