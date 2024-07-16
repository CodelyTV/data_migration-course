-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB-1:11.3.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `retention__users`
--

DROP TABLE IF EXISTS `retention__users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retention__users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `last_activity_date` timestamp NOT NULL,
  `registration_date` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retention__users`
--

LOCK TABLES `retention__users` WRITE;
/*!40000 ALTER TABLE `retention__users` DISABLE KEYS */;
INSERT INTO `retention__users` VALUES ('01e53d0d-4210-4830-b845-5adbe1a2ce51','Cheyenne_Bernhard41@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('14bc2bc6-996b-47b5-bce6-47e8e489aed3','Kaia.Kiehn@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('18a5b218-a4e5-4134-b2fb-24d5ad1a198e','Candace23@gmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('2128e3d1-0902-4df3-87b0-ded82022389f','Gudrun_Hudson@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('29ac1f62-8f58-4d88-85a6-73e2c34abcd5','Cooper_Bergnaum@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('2a4ff5c5-f01b-4c64-96e9-0e6197636d2a','Thora_Yost12@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('34db73b6-e8d7-4ba7-916e-3b93c1030b91','Erna_Schultz43@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('3fa3a8d2-91ae-4aea-80a4-9198fdb1fca7','Julius_Walker24@gmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('455538b9-55a6-4ffd-b246-d9d6b34878fa','Florencio84@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('5d46f2d9-1f74-45fc-a063-a49011041b1a','Garland.Bins@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('5fc1ec1c-db09-4b0f-9e0f-386f243c21c9','Morgan42@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('645fbe1e-5b68-4695-87d1-4383f65ea891','Domingo.Schuster@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('66692081-3202-4b16-9bd1-8bc8fc5d556a','Bryon_Mills@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('688c4a28-dc32-4e6c-bf58-103b80f6685d','Stefan.Dare@gmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('6de47881-65a4-47cc-bb09-035e2069a674','Janelle_Zulauf@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('76659cf1-7211-45f9-92c6-9a36be16104a','Vito_Langosh@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('7a64563c-1f6e-4963-a8e8-1267a1650a26','Jerrod.Harris@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('a6c29245-f346-40ac-a5b9-15b2623f9ca9','Amy87@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('c16989d9-89fc-4321-906c-1999f6150768','Heber22@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('c83ed2f3-9a3c-4c92-9a6d-bc17849728cd','Jaylon.Will84@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('e2b44e27-a234-4e6f-a363-6b49979475c1','Guido.Hintz1@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('e5bb7352-7d18-4811-8e72-fe6c60981e85','Susanna87@yahoo.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('f7d15c03-586f-43e0-949f-3582047e0496','Wilbert52@gmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37'),('fd732947-94eb-445c-82bc-600584e3d52a','Gregorio_Lakin87@hotmail.com','2024-06-27 12:34:37','2024-06-27 12:34:37');
/*!40000 ALTER TABLE `retention__users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 15:02:42
