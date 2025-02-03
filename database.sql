-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bbqcblialngq2sc4qir8-mysql.services.clever-cloud.com:3306
-- Generation Time: Feb 03, 2025 at 07:08 PM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bbqcblialngq2sc4qir8`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `location_id` int NOT NULL,
  `location_name` char(250) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`location_id`, `location_name`) VALUES
(1, 'JLN Stadium'),
(2, 'Kaloor'),
(3, 'Edapally'),
(4, 'Tripunithura'),
(5, 'Kakkanad'),
(6, ' Angamaly'),
(7, ' Perumbavoor'),
(8, 'Aluva'),
(9, 'Kalamassery'),
(11, 'Mavoor'),
(12, 'Beypore'),
(13, 'Kanhangad'),
(14, 'Kannur');

-- --------------------------------------------------------

--
-- Table structure for table `parking_records`
--

CREATE TABLE `parking_records` (
  `id` int NOT NULL,
  `vehicle_number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `spot_id` int NOT NULL,
  `type_id` int NOT NULL,
  `person_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `location_id` int NOT NULL,
  `parking_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checkout_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parking_records`
--

INSERT INTO `parking_records` (`id`, `vehicle_number`, `spot_id`, `type_id`, `person_name`, `location_id`, `parking_time`, `checkout_time`) VALUES
(1, 'Kl 200', 1, 1, 'watson', 1, '2025-02-03 11:16:48', '2025-02-03 12:33:53'),
(3, 'Kl 3000', 7, 1, 'smith', 2, '2025-02-03 11:19:19', '2025-02-03 13:18:38'),
(23, 'Kl 23 b3455', 4, 2, 'john', 1, '2025-02-03 15:17:01', '2025-02-03 15:18:08'),
(24, 'Kl 79 c 4576', 16, 1, 'Max', 3, '2025-02-03 15:19:08', '2025-02-03 17:29:11'),
(25, 'Kl 23 s 344', 12, 1, 'smith', 3, '2025-02-03 15:20:51', NULL),
(26, 'KL AC 38333', 21, 1, 'Emma', 5, '2025-02-03 15:22:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parking_spots`
--

CREATE TABLE `parking_spots` (
  `spot_id` int NOT NULL,
  `spot_name` char(255) COLLATE utf8mb4_general_ci NOT NULL,
  `location_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parking_spots`
--

INSERT INTO `parking_spots` (`spot_id`, `spot_name`, `location_id`, `type_id`) VALUES
(1, 'Stadium Metro Station Parking', 1, 1),
(2, 'Parking in Om Hotel', 1, 2),
(3, ' South Extension', 1, 1),
(4, ' South Extension', 1, 2),
(5, 'Avr Hotel Parking', 1, 1),
(6, 'Avr Hotel Parking', 1, 2),
(7, 'Metro 764 Parking', 2, 1),
(8, 'Metro 764 Parking', 2, 2),
(9, 'Bus stop parking', 2, 1),
(10, 'MRVs shops parking', 2, 2),
(11, 'Super hills beauty parks', 3, 1),
(12, 'Lulu mall parking', 3, 1),
(13, 'Lulu mall parking', 3, 2),
(14, 'Cyber parks', 3, 2),
(15, 'metro 121', 3, 1),
(16, 'CNG parks', 3, 1),
(17, 'Bus stop parkings', 4, 1),
(18, 'Bus stop parkings', 4, 2),
(19, 'super mall park', 5, 1),
(20, 'super mall park', 5, 2),
(21, 'NSRR parking', 5, 1),
(22, 'Water metro parking', 5, 1),
(23, 'Water metro parking', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `rates`
--

CREATE TABLE `rates` (
  `type_id` int DEFAULT NULL,
  `first_hour` decimal(10,2) NOT NULL,
  `additional_hour` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rates`
--

INSERT INTO `rates` (`type_id`, `first_hour`, `additional_hour`) VALUES
(1, 30.00, 20.00),
(2, 50.00, 30.00);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_type`
--

CREATE TABLE `vehicle_type` (
  `type_id` int NOT NULL,
  `type_name` char(200) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_type`
--

INSERT INTO `vehicle_type` (`type_id`, `type_name`) VALUES
(1, 'bike'),
(2, 'car');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `parking_records`
--
ALTER TABLE `parking_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parking_spots`
--
ALTER TABLE `parking_spots`
  ADD PRIMARY KEY (`spot_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `fk_type` (`type_id`);

--
-- Indexes for table `rates`
--
ALTER TABLE `rates`
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `parking_records`
--
ALTER TABLE `parking_records`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `parking_spots`
--
ALTER TABLE `parking_spots`
  MODIFY `spot_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  MODIFY `type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parking_spots`
--
ALTER TABLE `parking_spots`
  ADD CONSTRAINT `fk_type` FOREIGN KEY (`type_id`) REFERENCES `vehicle_type` (`type_id`),
  ADD CONSTRAINT `parking_spots_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`);

--
-- Constraints for table `rates`
--
ALTER TABLE `rates`
  ADD CONSTRAINT `rates_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `vehicle_type` (`type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
