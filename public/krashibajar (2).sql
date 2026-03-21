-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2026 at 11:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `krashibajar`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminregister`
--

CREATE TABLE `adminregister` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `emailId` varchar(150) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `userpassword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminregister`
--

INSERT INTO `adminregister` (`id`, `firstName`, `lastName`, `emailId`, `mobile`, `image`, `username`, `userpassword`) VALUES
(1, 'Deepak', 'Jadhav', 'deepak369office@gmail.com', '2121212121', '1773775406194.png', 'dejad212', '$2b$10$qX1CnFbAr9iDaEA7x9U/ZevObE6HRZWatP6dT0BSfzxe/K/ORPK8e');

-- --------------------------------------------------------

--
-- Table structure for table `customerlogintable`
--

CREATE TABLE `customerlogintable` (
  `customerId` int(11) NOT NULL,
  `customerFirstName` varchar(50) NOT NULL,
  `customerLastName` varchar(50) NOT NULL,
  `customerEmail` varchar(100) NOT NULL,
  `customerPhone` varchar(15) NOT NULL,
  `customerImage` varchar(255) DEFAULT NULL,
  `customerAddress` varchar(255) DEFAULT NULL,
  `customerAccount` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `isActiveStatus` varchar(20) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customerlogintable`
--

INSERT INTO `customerlogintable` (`customerId`, `customerFirstName`, `customerLastName`, `customerEmail`, `customerPhone`, `customerImage`, `customerAddress`, `customerAccount`, `username`, `userPassword`, `isActiveStatus`) VALUES
(13, 'Lakahsimikant', 'Berade', 'lg@gmailcom', '8787687687', '1774133376524.jpg', 'Dadar Mumbai', 'Kotoa234234', 'laber878', '$2b$10$ivVhVpuXX.rrw7J7f5Hp7eFSOyrJZb4FG56iqTyppSHbZUQ5GF7si', 'open'),
(14, 'Shaml', 'Doifode', 'sham@gmail.com', '8734534543', '1774133563670.jpg', 'Nagapur', 'BAC42432', 'shdoi873', '$2b$10$QSkhF75RVl5RYXRPKnBW7.GUX6xwDB9yA4dWJ6qoLuK13YUdmO.Hq', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `farmerlogintable`
--

CREATE TABLE `farmerlogintable` (
  `farmerId` int(11) NOT NULL,
  `farmerFirstName` varchar(50) NOT NULL,
  `farmerLastName` varchar(50) NOT NULL,
  `farmerEmail` varchar(100) NOT NULL,
  `farmerPhone` varchar(15) NOT NULL,
  `farmerImage` varchar(255) DEFAULT NULL,
  `farmerAddress` varchar(255) DEFAULT NULL,
  `farmerAccount` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `isActiveStatus` varchar(20) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmerlogintable`
--

INSERT INTO `farmerlogintable` (`farmerId`, `farmerFirstName`, `farmerLastName`, `farmerEmail`, `farmerPhone`, `farmerImage`, `farmerAddress`, `farmerAccount`, `username`, `userPassword`, `isActiveStatus`) VALUES
(23, 'Deepak', 'Jadhav', 'deepak369office@gmail.com', '9876543210', '1774132868727.jpg', 'At Pasadgaon Nanded', 'HDFC2344', 'dejad987', '$2b$10$SxL6AA56PiN6GUYoRjckUOq1qPsCEX2nudefcD/nCsosZJ9LkWM/e', 'open'),
(24, 'Janavi', 'Kapur', 'deepak.d8855@gmail.com', '9898989898', '1774133073089.jpg', 'At Deccon Pune', 'SBI23432432', 'jakap989', '$2b$10$Rx7.9cSab7AVdNbjl3RkLOY1ARAXkhSq90G3SkGmjzxJtU4nopN8W', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

CREATE TABLE `ordertable` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `logid` int(11) NOT NULL,
  `status` varchar(20) DEFAULT 'open',
  `cid` int(11) NOT NULL,
  `isActiveStatus` varchar(20) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordertable`
--

INSERT INTO `ordertable` (`id`, `name`, `email`, `phone`, `address`, `pid`, `quantity`, `logid`, `status`, `cid`, `isActiveStatus`) VALUES
(13, 'Laksha', 'lg@gmail.com', '9897867687', 'Mumbai', 16, 3, 23, 'open', 13, 'open'),
(14, 'Laksha', 'lg@gmail.com', '9897867687', 'Mumbai', 20, 2, 24, 'open', 13, 'open'),
(15, 'Janvd', 'deepak369office@gmail.com', '9897867687', 'Nanded', 18, 3, 23, 'open', 14, 'open'),
(16, 'dep', 'deepak369office@gmail.com', '9897867687', 'Pune', 20, 3, 24, 'open', 14, 'open');

-- --------------------------------------------------------

--
-- Table structure for table `producttable`
--

CREATE TABLE `producttable` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `isActiveStatus` varchar(20) DEFAULT 'open',
  `isUserActive` varchar(20) DEFAULT 'open',
  `isDelete` varchar(20) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producttable`
--

INSERT INTO `producttable` (`id`, `name`, `image`, `price`, `quantity`, `fid`, `isActiveStatus`, `isUserActive`, `isDelete`) VALUES
(16, 'Tomato', '1774132934246.jpg', 20.00, 500, 23, 'open', 'open', 'open'),
(17, 'Onion', '1774132958560.jpg', 30.00, 600, 23, 'open', 'open', 'open'),
(18, 'Batata', '1774132980961.jpg', 25.00, 400, 23, 'open', 'open', 'open'),
(19, 'Bhindi', '1774133141094.png', 15.00, 50, 24, 'open', 'open', 'open'),
(20, 'Gobi', '1774133159908.png', 40.00, 100, 24, 'open', 'open', 'open'),
(21, 'Kakadi', '1774133200228.jpg', 10.00, 90, 24, 'open', 'open', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `querytable`
--

CREATE TABLE `querytable` (
  `queryId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `body` text NOT NULL,
  `whoText` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'open',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `querytable`
--

INSERT INTO `querytable` (`queryId`, `userId`, `body`, `whoText`, `status`, `createdAt`) VALUES
(13, 23, 'I need New Password', 'Farmer', 'open', '2026-03-21 22:43:16'),
(14, 24, 'I xyz user is not getting reponse after reatch at the address', 'Farmer', 'open', '2026-03-21 22:47:33'),
(15, 13, 'I need delevery on time', 'customer', 'open', '2026-03-21 22:50:31'),
(16, 14, 'No queryes', 'customer', 'open', '2026-03-21 22:53:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminregister`
--
ALTER TABLE `adminregister`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emailId` (`emailId`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `customerlogintable`
--
ALTER TABLE `customerlogintable`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `customerEmail` (`customerEmail`),
  ADD UNIQUE KEY `customerPhone` (`customerPhone`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `farmerlogintable`
--
ALTER TABLE `farmerlogintable`
  ADD PRIMARY KEY (`farmerId`),
  ADD UNIQUE KEY `farmerEmail` (`farmerEmail`),
  ADD UNIQUE KEY `farmerPhone` (`farmerPhone`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `producttable`
--
ALTER TABLE `producttable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `querytable`
--
ALTER TABLE `querytable`
  ADD PRIMARY KEY (`queryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminregister`
--
ALTER TABLE `adminregister`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customerlogintable`
--
ALTER TABLE `customerlogintable`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `farmerlogintable`
--
ALTER TABLE `farmerlogintable`
  MODIFY `farmerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ordertable`
--
ALTER TABLE `ordertable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `producttable`
--
ALTER TABLE `producttable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `querytable`
--
ALTER TABLE `querytable`
  MODIFY `queryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
