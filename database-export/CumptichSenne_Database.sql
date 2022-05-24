CREATE DATABASE  IF NOT EXISTS `projectonedb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projectonedb`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projectonedb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actie`
--

DROP TABLE IF EXISTS `actie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actie` (
  `ActieID` int NOT NULL AUTO_INCREMENT,
  `ActieBeschrijving` varchar(45) NOT NULL,
  PRIMARY KEY (`ActieID`),
  UNIQUE KEY `ActieBeschrijving_UNIQUE` (`ActieBeschrijving`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actie`
--

LOCK TABLES `actie` WRITE;
/*!40000 ALTER TABLE `actie` DISABLE KEYS */;
INSERT INTO `actie` VALUES (1,'Aanzetten'),(5,'Buzzer aansturen'),(3,'Data uitlezen'),(4,'LED-strip aansturen'),(2,'Uitzetten');
/*!40000 ALTER TABLE `actie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `DeviceID` int NOT NULL AUTO_INCREMENT,
  `Naam` varchar(250) NOT NULL,
  `Merk` varchar(250) NOT NULL,
  `Beschrijving` varchar(250) NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Aankoopkost` double NOT NULL,
  `Meeteenheid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`DeviceID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'DS18B20 Digitale Roestvrij Staal Temperatuursensor','AZDelivery','Waterdichte temperatuursensor','Sensor',3.15,'°C'),(2,'CQRobot Oceaan: TDS','CQRobot','Waterkwaliteit sensor','Sensor',14.99,'TDS deeltjes per miljoen'),(3,'ZHITING PH0-14','ZHITING','PH sensor','Sensor',45.99,'PH-waarde'),(4,'WS2812 ECO','BTF-LIGHTING','LED-strip','Actuator',9.49,''),(5,'Active buzzer','Ociodual','Actieve buzzer','Actuator',2.89,''),(6,'LCD display','AZDelivery','Display voor het weergeven van de waardes + IP adres','Actuator',4.99,'');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiek`
--

DROP TABLE IF EXISTS `historiek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiek` (
  `HistoriekID` int NOT NULL,
  `Actiedatum` datetime NOT NULL,
  `Waarde` double NOT NULL,
  `Commentaar` varchar(250) DEFAULT NULL,
  `DeviceID` int NOT NULL,
  `ActieID` int NOT NULL,
  `StatusID` int NOT NULL,
  PRIMARY KEY (`HistoriekID`),
  KEY `fk_Historiek_Device_idx` (`DeviceID`),
  KEY `fk_Historiek_Actie1_idx` (`ActieID`),
  KEY `fk_Historiek_Status1_idx` (`StatusID`),
  CONSTRAINT `fk_Historiek_Actie1` FOREIGN KEY (`ActieID`) REFERENCES `actie` (`ActieID`),
  CONSTRAINT `fk_Historiek_Device` FOREIGN KEY (`DeviceID`) REFERENCES `device` (`DeviceID`),
  CONSTRAINT `fk_Historiek_Status1` FOREIGN KEY (`StatusID`) REFERENCES `status` (`StatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiek`
--

LOCK TABLES `historiek` WRITE;
/*!40000 ALTER TABLE `historiek` DISABLE KEYS */;
INSERT INTO `historiek` VALUES (1,'2022-04-06',1,'testdata',1,1,1),(2,'2022-04-07',2,'testdata',2,2,2),(3,'2022-04-08',3,'testdata',3,3,3),(4,'2022-04-09',4,'testdata',4,4,2),(5,'2022-04-10',5,'testdata',5,5,1),(6,'2022-04-11',6,'testdata',6,4,2),(7,'2022-04-12',7,'testdata',5,3,3),(8,'2022-04-13',8,'testdata',4,2,2),(9,'2022-04-14',9,'testdata',3,1,1),(10,'2022-04-15',8,'testdata',2,2,2),(11,'2022-04-16',7,'testdata',1,3,3),(12,'2022-04-17',6,'testdata',2,4,2),(13,'2022-04-18',5,'testdata',3,5,1),(14,'2022-04-19',4,'testdata',4,4,2),(15,'2022-04-20',3,'testdata',5,3,3),(16,'2022-04-21',2,'testdata',6,2,2),(17,'2022-04-22',1,'testdata',5,1,1),(18,'2022-04-23',2,'testdata',4,2,2),(19,'2022-04-24',3,'testdata',3,3,3),(20,'2022-04-25',4,'testdata',2,4,2),(21,'2022-04-26',5,'testdata',1,5,1),(22,'2022-04-27',6,'testdata',2,4,2),(23,'2022-04-28',7,'testdata',3,3,3),(24,'2022-04-29',8,'testdata',4,2,2),(25,'2022-04-30',9,'testdata',5,1,1),(26,'2022-05-01',8,'testdata',6,2,2),(27,'2022-05-02',7,'testdata',5,3,3),(28,'2022-05-03',6,'testdata',4,4,2),(29,'2022-05-04',5,'testdata',3,5,1),(30,'2022-05-05',4,'testdata',2,4,2),(31,'2022-05-06',3,'testdata',1,3,3),(32,'2022-05-07',2,'testdata',2,2,2),(33,'2022-05-08',1,'testdata',3,1,1),(34,'2022-05-09',2,'testdata',4,2,2),(35,'2022-05-10',3,'testdata',5,3,3),(36,'2022-05-11',4,'testdata',6,4,2),(37,'2022-05-12',5,'testdata',5,5,1),(38,'2022-05-13',6,'testdata',4,4,2),(39,'2022-05-14',7,'testdata',3,3,3),(40,'2022-05-15',8,'testdata',2,2,2),(41,'2022-05-16',9,'testdata',1,1,1),(42,'2022-05-17',8,'testdata',2,2,2),(43,'2022-05-18',7,'testdata',3,3,3),(44,'2022-05-19',6,'testdata',4,4,2),(45,'2022-05-20',5,'testdata',5,5,1),(46,'2022-05-21',4,'testdata',6,4,2),(47,'2022-05-22',3,'testdata',5,3,3),(48,'2022-05-23',2,'testdata',4,2,2),(49,'2022-05-24',1,'testdata',3,1,1),(50,'2022-05-25',2,'testdata',2,2,2);
/*!40000 ALTER TABLE `historiek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `StatusID` int NOT NULL AUTO_INCREMENT,
  `Beschrijving` varchar(250) NOT NULL,
  PRIMARY KEY (`StatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Waarde te laag'),(2,'Waarde in orde'),(3,'Waarde te hoog');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-23 16:48:59
