-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2021 at 10:18 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tizkitz`
--

-- --------------------------------------------------------

--
-- Table structure for table `buy_ticket`
--

CREATE TABLE `buy_ticket` (
  `id` int(11) NOT NULL,
  `id_user` int(20) DEFAULT NULL,
  `id_movie` int(20) DEFAULT NULL,
  `id_cinema` int(20) DEFAULT NULL,
  `id_showtime` int(20) DEFAULT NULL,
  `seat` varchar(150) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buy_ticket`
--

INSERT INTO `buy_ticket` (`id`, `id_user`, `id_movie`, `id_cinema`, `id_showtime`, `seat`, `createdAt`, `updatedAt`) VALUES
(19, 24, 119, 19, 4, 'C1', '2021-02-04 00:38:20', '2021-02-04 00:38:20'),
(26, 24, 119, 19, 4, 'C1', '2021-02-04 00:49:24', '2021-02-04 00:49:24'),
(27, 28, 119, 20, 6, 'A1', '2021-02-04 04:04:50', '2021-02-04 04:04:50'),
(28, 28, 122, 22, 9, 'E11,D12,E12', '2021-02-04 04:47:58', '2021-02-04 04:47:58'),
(29, 28, 122, 22, 9, 'G7,F9,D10', '2021-02-04 07:49:25', '2021-02-04 07:49:25'),
(30, 28, 122, 22, 9, 'D12,D2', '2021-02-04 08:01:15', '2021-02-04 08:01:15'),
(31, 24, 119, 19, 4, 'C1', '2021-02-04 10:56:20', '2021-02-04 10:56:20'),
(32, 28, 126, 21, 5, 'B7,C6,B4', '2021-02-04 11:02:16', '2021-02-04 11:02:16'),
(33, 28, 126, 21, 5, 'B7,C6,B4', '2021-02-04 11:04:08', '2021-02-04 11:04:08'),
(34, 28, 126, 21, 5, 'B7,C6,B4', '2021-02-04 11:05:58', '2021-02-04 11:05:58'),
(35, 28, 126, 21, 5, 'G7,F7', '2021-02-05 02:04:54', '2021-02-05 02:04:54'),
(36, 28, 126, 21, 5, 'A8,A9', '2021-02-05 02:24:29', '2021-02-05 02:24:29'),
(37, 28, 126, 21, 5, 'F10', '2021-02-05 02:36:02', '2021-02-05 02:36:02');

-- --------------------------------------------------------

--
-- Table structure for table `cinema`
--

CREATE TABLE `cinema` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `address` varchar(150) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `logo` text NOT NULL,
  `createdAT` timestamp NOT NULL DEFAULT current_timestamp(),
  `updaredAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinema`
--

INSERT INTO `cinema` (`id`, `name`, `city`, `address`, `phone`, `logo`, `createdAT`, `updaredAt`) VALUES
(19, 'Imagine Cinema', 'Jakarta', 'Jl. Asia Afrika No. 8, Jakarta Selatan', '(62-21) 5725555', 'http://localhost:5000/uploads/1612246273684-asdasfda.png', '2021-02-02 06:11:13', '2021-02-02 06:11:13'),
(20, 'Regal Cinema', 'Jakarta', 'Jl. Lt. Jend S. Parman Kav.21, Jakarta Barat', '(021) 3853985', 'http://localhost:5000/uploads/1612246481620-cgv.png', '2021-02-02 06:14:41', '2021-02-03 06:07:34'),
(21, 'Cinema21', 'Jakarta', 'Jl. Jend. Sudirman Kav. 50, Jaksel', '(021) 3853932', 'http://localhost:5000/uploads/1612246623871-cinema21.png', '2021-02-02 06:17:03', '2021-02-03 06:11:39'),
(22, 'Cineplex', 'Jakarta', 'Jl. Thamrin Boulevard, Jakarta ', '(021) 38532743', 'http://localhost:5000/uploads/1612246699338-cineplex.png', '2021-02-02 06:18:19', '2021-02-03 06:11:28'),
(23, 'CGV Cinema', 'Jakarta', 'Jl. Jenderal Sudirman, Jakarta ', '(021) 96532743', 'http://localhost:5000/uploads/1612246775563-csdagv.png', '2021-02-02 06:19:35', '2021-02-03 06:11:12'),
(24, 'Event Cinema', 'Jakarta', 'Jl. Let. Jend. TB Simatupang Kav. 17, Jaksel', '(021) 96532429', 'http://localhost:5000/uploads/1612246870111-ewrfw.png', '2021-02-02 06:21:10', '2021-02-03 06:10:59'),
(25, 'Event Cinema', 'Bandung', 'Jl. Dr. Djunjunan No. 126-128 (Terusan Pasteur)', '(021) 96532434', 'http://localhost:5000/uploads/1612246909257-ewrfw.png', '2021-02-02 06:21:49', '2021-02-02 06:21:49'),
(26, 'CGVCinema', 'Bandung', 'Jl. Pelajar Pejuang 45 121, Turangga, Lengkong', '(021) 96532603', 'http://localhost:5000/uploads/1612246977675-csdagv.png', '2021-02-02 06:22:57', '2021-02-02 06:22:57'),
(27, 'Cineplex', 'Bandung', 'Jl. Sukajadi No.131, Cipedes, Bandung', '(021) 965323435', 'http://localhost:5000/uploads/1612247057590-cineplex.png', '2021-02-02 06:24:17', '2021-02-03 06:12:27'),
(28, 'Cinema21', 'Bandung', 'Jl. Cihampelas No.160, Cipaganti, Bandung', '(021) 364791239', 'http://localhost:5000/uploads/1612247110817-cinema21.png', '2021-02-02 06:25:10', '2021-02-03 06:09:26'),
(29, 'Regal Cinema', 'Bandung', 'Jl. Braga No.99, Braga, Bandung', '(021) 364790210', 'http://localhost:5000/uploads/1612247180677-cgv.png', '2021-02-02 06:26:20', '2021-02-03 06:08:53'),
(30, 'Imagine Cinema', 'Bandung', 'JL. Ir. H. Juanda No. 61, Tamansari, Bandung', '(021) 364790210', 'http://localhost:5000/uploads/1612247254645-asdasfda.png', '2021-02-02 06:27:34', '2021-02-03 06:09:13');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`, `createdAt`, `UpdatedAt`) VALUES
(1, 'Romance', '2021-01-18 23:47:59', '2021-01-22 16:44:36'),
(3, 'Fantasy', '2021-01-18 23:48:26', '2021-01-20 05:22:56'),
(4, 'Drama', '2021-01-18 23:48:33', '2021-01-18 23:48:33'),
(5, 'Comedy', '2021-01-18 23:48:41', '2021-01-18 23:48:41'),
(13, 'Sci-Fi', '2021-01-31 14:54:02', '2021-01-31 14:54:02'),
(14, 'Action', '2021-01-31 15:08:56', '2021-01-31 15:08:56'),
(15, 'Cartoon', '2021-01-31 15:12:03', '2021-01-31 15:12:03'),
(16, 'Mystery', '2021-01-31 15:21:52', '2021-01-31 15:21:52');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `language` varchar(20) NOT NULL,
  `genre` varchar(40) NOT NULL,
  `director` varchar(40) NOT NULL,
  `actors` varchar(40) NOT NULL,
  `title` varchar(40) NOT NULL,
  `synopsis` text NOT NULL,
  `relaseDate` date NOT NULL,
  `runtime` varchar(20) NOT NULL,
  `poster` text NOT NULL,
  `price` int(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `language`, `genre`, `director`, `actors`, `title`, `synopsis`, `relaseDate`, `runtime`, `poster`, `price`, `createdAt`, `updatedAt`) VALUES
(116, 'en', 'Fantasy', 'James Gunn', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Guardians of the Galaxy Vol. 2', 'The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord\'s encounter with his father the ambitious celestial being Ego.', '2021-02-16', '113', 'http://localhost:5000/uploads/1612104875991-MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg', 25000, '2021-01-31 14:54:36', '2021-01-31 14:54:36'),
(117, 'en', 'Fantasy, Sci-Fi', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Wonder Woman 1984', 'Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.', '2021-03-16', '113', 'http://localhost:5000/uploads/1612105637060-8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg', 25000, '2021-01-31 15:07:17', '2021-01-31 15:07:17'),
(118, 'en', 'Sci-Fi, Action', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Tenet', 'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.', '2021-03-16', '113', 'http://localhost:5000/uploads/1612105775775-k68nPLbIST6NP96JmTxmZijEvCA.jpg', 25000, '2021-01-31 15:09:35', '2021-01-31 15:09:36'),
(119, 'en', 'Fantasy, Cartoon', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'The Croods: A New Age', 'Searching for a safer habitat, the prehistoric Crood family discovers an idyllic, walled-in paradise that meets all of its needs. Unfortunately, they must also learn to live with the Bettermans -- a family that\'s a couple of steps above the Croods on the evolutionary ladder. As tensions between the new neighbors start to rise, a new threat soon propels both clans on an epic adventure that forces them to embrace their differences, draw strength from one another, and survive together.', '2021-02-01', '113', 'http://localhost:5000/uploads/1612105993753-tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg', 25000, '2021-01-31 15:13:13', '2021-01-31 15:13:14'),
(120, 'en', 'Fantasy, Comedy', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Roald Dahl\'s The Witches', 'In late 1967, a young orphaned boy goes to live with his loving grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world\'s Grand High Witch has gathered.', '2021-03-01', '112', 'http://localhost:5000/uploads/1612106197894-b1C0FuXp4wiPmHLVKq4kwtDMgK6.jpg', 20000, '2021-01-31 15:16:37', '2021-01-31 15:16:38'),
(121, 'en', 'Fantasy, Action', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Monster Hunter', 'A portal transports Lt. Artemis and an elite unit of soldiers to a strange world where powerful monsters rule with deadly ferocity. Faced with relentless danger, the team encounters a mysterious hunter who may be their only hope to find a way home.', '2021-02-01', '110', 'http://localhost:5000/uploads/1612106400918-1UCOF11QCw8kcqvce8LKOO6pimh.jpg', 25000, '2021-01-31 15:20:00', '2021-01-31 15:20:01'),
(122, 'en', 'Action, Mystery', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'The Little Things', 'Deputy Sheriff Joe \"Deke\" Deacon joins forces with Sgt. Jim Baxter to search for a serial killer who\'s terrorizing Los Angeles. As they track the culprit, Baxter is unaware that the investigation is dredging up echoes of Deke\'s past, uncovering disturbing secrets that could threaten more than his case.', '2021-02-02', '110', 'http://localhost:5000/uploads/1612106571938-ien08sCofi199G3fkPKNQcDi7jT.jpg', 22000, '2021-01-31 15:22:51', '2021-01-31 15:22:52'),
(124, 'en', 'Fantasy, Cartoon', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Combat Wombat', 'Maggie Diggins, a wombat turned Wonder Woman, unintentionally becomes the city\'s superhero after she begrudgingly saves a rookie superhero sugar glider from certain doom.', '2021-04-02', '110', 'http://localhost:5000/uploads/1612106879983-383b9E3Uv1fOyPiSxMZr8lsjFMa.jpg', 22000, '2021-01-31 15:27:59', '2021-01-31 15:28:00'),
(125, 'en', 'Action, Mystery', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'Freaky', 'A mystical, ancient dagger causes a notorious serial killer to magically switch bodies with a 17-year-old girl.', '2021-02-02', '110', 'http://localhost:5000/uploads/1612107095056-8xC6QSyxrpm0D5A6iyHNemEWBVe.jpg', 22, '2021-01-31 15:31:35', '2021-02-03 01:08:53'),
(126, 'en', 'Action, Mystery', 'James Wathan', 'Chris Pratt, Zoe Saldana, Dave Bautista,', 'The Marksman', 'Jim Hanson’s quiet life is suddenly disturbed by two people crossing the US/Mexico border – a woman and her young son – desperate to flee a Mexican cartel. After a shootout leaves the mother dead, Jim becomes the boy’s reluctant defender. He embraces his role as Miguel’s protector and will stop at nothing to get him to safety, as they go on the run from the relentless assassins.', '2021-02-03', '110', 'http://localhost:5000/uploads/1612107210905-x7A1pB60AKNGRW2hcx2xxIhPkQ5.jpg', 22000, '2021-01-31 15:33:30', '2021-01-31 15:33:31');

-- --------------------------------------------------------

--
-- Table structure for table `movies_info`
--

CREATE TABLE `movies_info` (
  `id` int(11) NOT NULL,
  `idMovie` int(15) NOT NULL,
  `idGenre` int(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies_info`
--

INSERT INTO `movies_info` (`id`, `idMovie`, `idGenre`, `createdAt`, `updatedAt`) VALUES
(138, 116, 3, '2021-01-31 14:54:36', '2021-01-31 14:54:36'),
(139, 117, 3, '2021-01-31 15:07:17', '2021-01-31 15:07:17'),
(140, 117, 13, '2021-01-31 15:07:17', '2021-01-31 15:07:17'),
(141, 118, 13, '2021-01-31 15:09:35', '2021-01-31 15:09:35'),
(142, 118, 14, '2021-01-31 15:09:35', '2021-01-31 15:09:35'),
(143, 119, 3, '2021-01-31 15:13:13', '2021-01-31 15:13:13'),
(144, 119, 15, '2021-01-31 15:13:13', '2021-01-31 15:13:13'),
(145, 120, 3, '2021-01-31 15:16:38', '2021-01-31 15:16:38'),
(146, 120, 5, '2021-01-31 15:16:38', '2021-01-31 15:16:38'),
(147, 121, 3, '2021-01-31 15:20:01', '2021-01-31 15:20:01'),
(148, 121, 14, '2021-01-31 15:20:01', '2021-01-31 15:20:01'),
(149, 122, 14, '2021-01-31 15:22:51', '2021-01-31 15:22:51'),
(150, 122, 16, '2021-01-31 15:22:51', '2021-01-31 15:22:51'),
(153, 124, 3, '2021-01-31 15:28:00', '2021-01-31 15:28:00'),
(154, 124, 15, '2021-01-31 15:28:00', '2021-01-31 15:28:00'),
(155, 125, 14, '2021-01-31 15:31:35', '2021-01-31 15:31:35'),
(156, 125, 16, '2021-01-31 15:31:35', '2021-01-31 15:31:35'),
(157, 126, 14, '2021-01-31 15:33:30', '2021-01-31 15:33:30'),
(158, 126, 16, '2021-01-31 15:33:30', '2021-01-31 15:33:30');

-- --------------------------------------------------------

--
-- Table structure for table `result_ticket`
--

CREATE TABLE `result_ticket` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `movie` varchar(100) NOT NULL,
  `cinema` varchar(100) NOT NULL,
  `showTime` varchar(50) NOT NULL,
  `showDate` date NOT NULL,
  `listSeat` varchar(100) NOT NULL,
  `price` int(15) NOT NULL,
  `totalPayment` int(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `result_ticket`
--

INSERT INTO `result_ticket` (`id`, `id_user`, `movie`, `cinema`, `showTime`, `showDate`, `listSeat`, `price`, `totalPayment`, `createdAt`, `updatedAt`) VALUES
(1, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'C09 try update,B2', 120000, 240000, '2021-01-25 07:42:37', '2021-01-25 07:42:37'),
(2, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'C09 try update,B2', 120000, 240000, '2021-01-25 07:49:36', '2021-01-25 07:49:36'),
(3, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'C09 try update,B2', 120000, 240000, '2021-01-25 07:50:00', '2021-01-25 07:50:00'),
(4, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'C09 try update,B2', 120000, 240000, '2021-01-25 08:03:59', '2021-01-25 08:03:59'),
(5, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'C09 try update', 120000, 120000, '2021-01-25 08:04:39', '2021-01-25 08:04:39'),
(6, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'C09 try update', 120000, 120000, '2021-01-25 08:08:23', '2021-01-25 08:08:23'),
(7, 10, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'A4,C09 try update', 120000, 240000, '2021-01-25 08:34:50', '2021-01-25 08:34:50'),
(8, 12, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'A4,C09 try update', 120000, 240000, '2021-01-25 12:05:15', '2021-01-25 12:05:15'),
(9, 10, 'Dragon Ball Saga', 'bioskop keren uy', '19:30pm', '0000-00-00', 'A4,C09 try update', 120000, 240000, '2021-01-25 12:13:07', '2021-01-25 12:13:07'),
(21, 28, 'The Little Things', 'Cineplex', '20:30 PM', '2021-02-04', 'G7,F9,D10', 22000, 22000, '2021-02-04 07:49:25', '2021-02-04 10:57:38'),
(22, 28, 'The Little Things', 'Cineplex', '20:30 PM', '2021-02-04', 'D12,D2', 22000, 22000, '2021-02-04 08:01:16', '2021-02-04 10:08:41'),
(23, 24, 'The Croods: A New Age', 'Imagine Cinema', '10:30 AM', '2021-02-08', 'C1', 25000, 25000, '2021-02-04 10:56:20', '2021-02-04 10:56:20'),
(24, 28, 'The Marksman', 'Cinema21', '14:00 PM', '2021-02-04', 'B7,C6,B4', 22000, 22000, '2021-02-04 11:02:16', '2021-02-04 11:02:16'),
(26, 28, 'The Marksman', 'Cinema21', '14:00 PM', '2021-02-04', 'B7,C6,B4', 22000, 22000, '2021-02-04 11:05:58', '2021-02-04 11:05:58'),
(27, 28, 'The Marksman', 'Cinema21', '14:00 PM', '2021-02-04', 'G7,F7', 22000, 22000, '2021-02-05 02:04:54', '2021-02-05 02:04:54'),
(28, 28, 'The Marksman', 'Cinema21', '14:00 PM', '2021-02-04', 'A8,A9', 22000, 22000, '2021-02-05 02:24:29', '2021-02-05 02:24:29'),
(29, 28, 'The Marksman', 'Cinema21', '14:00 PM', '2021-02-04', 'F10', 22000, 22000, '2021-02-05 02:36:02', '2021-02-05 02:36:02');

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`id`, `name`, `createdAt`, `UpdatedAt`) VALUES
(7, 'A4', '2021-01-20 14:19:56', '2021-01-20 14:19:56'),
(8, 'A5', '2021-01-20 14:20:00', '2021-01-20 14:20:00'),
(9, 'Love Nest Premium', '2021-01-20 14:20:03', '2021-01-28 04:32:40'),
(10, 'A7', '2021-01-20 14:20:07', '2021-01-20 14:20:07'),
(11, 'A8', '2021-01-20 14:20:10', '2021-01-20 14:20:10'),
(12, 'A9', '2021-01-20 14:20:14', '2021-01-20 14:20:14'),
(13, 'A10', '2021-01-20 14:20:19', '2021-01-20 14:20:19'),
(14, 'A11', '2021-01-20 14:20:25', '2021-01-20 14:20:25'),
(15, 'A12', '2021-01-20 14:20:29', '2021-01-20 14:20:29'),
(16, 'A13', '2021-01-20 14:20:35', '2021-01-20 14:20:35'),
(17, 'A14', '2021-01-20 14:20:41', '2021-01-20 14:20:41'),
(18, 'A15', '2021-01-20 14:20:44', '2021-01-20 14:20:44'),
(19, 'B1', '2021-01-20 14:20:59', '2021-01-20 14:20:59'),
(20, 'B2', '2021-01-20 14:21:01', '2021-01-20 14:21:01'),
(21, 'B3', '2021-01-20 14:21:03', '2021-01-20 14:21:03'),
(22, 'B4', '2021-01-20 14:21:05', '2021-01-20 14:21:05'),
(23, 'B5', '2021-01-20 14:21:09', '2021-01-20 14:21:09'),
(24, 'B6', '2021-01-20 14:21:12', '2021-01-20 14:21:12'),
(25, 'B7', '2021-01-20 14:21:14', '2021-01-20 14:21:14'),
(26, 'B8', '2021-01-20 14:21:17', '2021-01-20 14:21:17'),
(27, 'B9', '2021-01-20 14:21:20', '2021-01-20 14:21:20'),
(28, 'B10', '2021-01-20 14:21:23', '2021-01-20 14:21:23'),
(29, 'B11', '2021-01-20 14:21:24', '2021-01-20 14:21:24'),
(30, 'B12', '2021-01-20 14:21:26', '2021-01-20 14:21:26'),
(32, 'B14', '2021-01-20 14:21:31', '2021-01-20 14:21:31'),
(34, 'B15', '2021-01-20 15:04:02', '2021-01-20 15:04:02'),
(35, 'B15', '2021-01-20 15:04:25', '2021-01-20 15:04:25'),
(36, 'B15', '2021-01-20 15:06:02', '2021-01-20 15:06:02'),
(37, '08:00 AM', '2021-01-20 15:10:03', '2021-01-20 15:10:03'),
(38, 'C01', '2021-01-21 00:43:01', '2021-01-21 00:43:01'),
(39, 'C09 try', '2021-01-21 06:40:48', '2021-01-23 05:06:42'),
(40, 'C03', '2021-01-23 04:43:35', '2021-01-23 04:43:35'),
(41, 'C04', '2021-01-23 04:52:12', '2021-01-23 04:52:12'),
(42, '`', '2021-01-23 04:52:19', '2021-01-23 04:52:19'),
(43, 'C10', '2021-01-24 07:45:58', '2021-01-24 07:45:58'),
(44, 'C11', '2021-01-24 07:57:07', '2021-01-24 07:57:07'),
(45, 'Love Nest', '2021-01-27 14:39:07', '2021-01-27 14:39:07'),
(47, 'Love Nest', '2021-01-28 04:31:25', '2021-01-28 04:31:25');

-- --------------------------------------------------------

--
-- Table structure for table `showtimecinema`
--

CREATE TABLE `showtimecinema` (
  `id` int(11) NOT NULL,
  `id_cinema` int(11) NOT NULL,
  `id_show_time` int(11) NOT NULL,
  `showDate` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `showtimecinema`
--

INSERT INTO `showtimecinema` (`id`, `id_cinema`, `id_show_time`, `showDate`, `createdAt`, `updatedAt`) VALUES
(77, 20, 1, '2021-02-04', '2021-02-02 06:29:45', '2021-02-02 06:29:45'),
(78, 20, 4, '2021-02-04', '2021-02-02 06:29:45', '2021-02-02 06:29:45'),
(79, 20, 5, '2021-02-04', '2021-02-02 06:29:45', '2021-02-02 06:29:45'),
(80, 20, 6, '2021-02-04', '2021-02-02 06:29:45', '2021-02-02 06:29:45'),
(81, 20, 7, '2021-02-04', '2021-02-02 06:29:45', '2021-02-02 06:29:45'),
(82, 20, 9, '2021-02-04', '2021-02-02 06:29:45', '2021-02-02 06:29:45'),
(83, 21, 1, '2021-02-04', '2021-02-02 06:30:05', '2021-02-02 06:30:05'),
(84, 21, 4, '2021-02-04', '2021-02-02 06:30:05', '2021-02-02 06:30:05'),
(85, 21, 5, '2021-02-04', '2021-02-02 06:30:05', '2021-02-02 06:30:05'),
(86, 21, 6, '2021-02-04', '2021-02-02 06:30:05', '2021-02-02 06:30:05'),
(87, 21, 7, '2021-02-04', '2021-02-02 06:30:05', '2021-02-02 06:30:05'),
(88, 21, 9, '2021-02-04', '2021-02-02 06:30:05', '2021-02-02 06:30:05'),
(89, 22, 1, '2021-02-04', '2021-02-02 06:30:14', '2021-02-02 06:30:14'),
(90, 22, 4, '2021-02-04', '2021-02-02 06:30:14', '2021-02-02 06:30:14'),
(91, 22, 5, '2021-02-04', '2021-02-02 06:30:14', '2021-02-02 06:30:14'),
(92, 22, 6, '2021-02-04', '2021-02-02 06:30:14', '2021-02-02 06:30:14'),
(93, 22, 7, '2021-02-04', '2021-02-02 06:30:14', '2021-02-02 06:30:14'),
(94, 22, 9, '2021-02-04', '2021-02-02 06:30:14', '2021-02-02 06:30:14'),
(95, 28, 1, '2021-02-04', '2021-02-02 06:30:29', '2021-02-02 06:30:29'),
(96, 28, 4, '2021-02-04', '2021-02-02 06:30:29', '2021-02-02 06:30:29'),
(97, 28, 5, '2021-02-04', '2021-02-02 06:30:29', '2021-02-02 06:30:29'),
(98, 28, 6, '2021-02-04', '2021-02-02 06:30:29', '2021-02-02 06:30:29'),
(99, 28, 7, '2021-02-04', '2021-02-02 06:30:29', '2021-02-02 06:30:29'),
(100, 28, 9, '2021-02-04', '2021-02-02 06:30:29', '2021-02-02 06:30:29'),
(101, 27, 1, '2021-02-04', '2021-02-02 06:30:36', '2021-02-02 06:30:36'),
(102, 27, 4, '2021-02-04', '2021-02-02 06:30:36', '2021-02-02 06:30:36'),
(103, 27, 5, '2021-02-04', '2021-02-02 06:30:36', '2021-02-02 06:30:36'),
(104, 27, 6, '2021-02-04', '2021-02-02 06:30:36', '2021-02-02 06:30:36'),
(105, 27, 7, '2021-02-04', '2021-02-02 06:30:36', '2021-02-02 06:30:36'),
(107, 26, 1, '2021-02-04', '2021-02-02 06:30:42', '2021-02-02 06:30:42'),
(108, 26, 4, '2021-02-04', '2021-02-02 06:30:42', '2021-02-02 06:30:42'),
(109, 26, 5, '2021-02-04', '2021-02-02 06:30:42', '2021-02-02 06:30:42'),
(110, 26, 6, '2021-02-04', '2021-02-02 06:30:42', '2021-02-02 06:30:42'),
(111, 26, 7, '2021-02-04', '2021-02-02 06:30:42', '2021-02-02 06:30:42'),
(112, 26, 9, '2021-02-04', '2021-02-02 06:30:42', '2021-02-02 06:30:42');

-- --------------------------------------------------------

--
-- Table structure for table `show_time`
--

CREATE TABLE `show_time` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `show_time`
--

INSERT INTO `show_time` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, '08:00 AM', '2021-01-20 15:11:02', '2021-01-20 15:11:02'),
(4, '10:30 AM', '2021-01-20 15:11:32', '2021-02-01 08:32:34'),
(5, '14:00 PM', '2021-01-20 15:11:40', '2021-02-01 08:32:58'),
(6, '16:30 PM', '2021-01-20 15:11:48', '2021-02-01 08:33:20'),
(7, '18:30 PM', '2021-01-21 06:42:01', '2021-02-01 08:34:07'),
(9, '20:30 PM', '2021-01-24 08:19:14', '2021-02-01 08:34:41'),
(10, '22:00 PM', '2021-01-28 01:54:29', '2021-02-01 08:35:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` varchar(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'zaqi', '1234', '', '2021-01-22 13:03:20', '2021-01-22 13:03:20'),
(2, 'isas', '1234', '', '2021-01-22 14:14:27', '2021-01-22 14:14:27'),
(3, 'ibam', 'ibam123', '', '2021-01-22 14:21:33', '2021-01-22 14:22:19'),
(4, 'epul', '1234', '', '2021-01-22 14:45:36', '2021-01-22 14:45:36'),
(5, 'rizal', '1234', '', '2021-01-22 14:50:23', '2021-01-22 14:50:23'),
(6, 'kamaru', '1234', '', '2021-01-22 15:28:28', '2021-01-22 15:28:28'),
(7, 'nkamaru', '$2b$10$kCi1SYkgOqseTXphg9iGU.h3tYGFxoC9BolvvJ7JcUsRDIi3JaFk2', '', '2021-01-22 16:07:11', '2021-01-22 16:07:11'),
(8, 'zaqi09', '$2b$10$zq.5ZeV20GVKzEweiyl7mOAHoNIhPPjHROU/3NrlfjKTGT.rUqdLC', '', '2021-01-23 02:54:15', '2021-01-23 02:54:15'),
(9, 'try', '$2b$10$sB6iknfg.X1SJvZxAsQXD.upHr8b9/Z86mWJ./zRkS0dEDyQxLG/K', 'USER', '2021-01-23 03:25:28', '2021-01-23 03:25:28'),
(10, 'gues1', '$2b$10$.w3XgIv9wid.KYSq73I9j.cGBumjciAyQxPbvHmG.vEBEK7ThPiGy', 'USER', '2021-01-23 03:27:49', '2021-01-23 03:27:49'),
(11, 'gues2', '$2b$10$u67xnYpbESa9o.i3005IQeh.x80yacA0EhNtbbySVNgBFCWRAUym2', 'USER', '2021-01-23 03:28:31', '2021-01-23 03:28:31'),
(12, 'admin2', '$2b$10$wyAkpBj9eRmvax4HYfoUNO39wFjUV3..GowPRr5k7glorXQx0MKue', 'ADMIN', '2021-01-23 03:34:17', '2021-01-23 03:34:17'),
(13, 'user1', '$2b$10$Wn.MkAUPXy9wQxaUrkSLuOopDmH8KDGCPT0zmSCK4mnnzAjaz2Rli', 'USER', '2021-01-23 04:27:45', '2021-01-23 04:27:45'),
(14, 'fsfdsd', '$2b$10$HnYUPN.MtmBSFWIxh3IGAO49xyIMICOdORxNzZ3hKr1r7E10xXP5K', 'USER', '2021-01-25 01:02:15', '2021-01-25 01:02:15'),
(15, 'admin2fd', '$2b$10$r8/RCfBYR3jg9kCowSIbI.ynZUM45S1xsRtK8L8QipDMJ8X0SJZPW', 'ADMIN', '2021-01-25 01:04:03', '2021-01-25 01:04:03'),
(16, 'zaqijr7', '$2b$10$blkNY5MDuhZecBY9VgAv/OJIOAgmh.ibGklVYAPQy0uF5tom.U15S', 'ADMIN', '2021-01-25 07:16:57', '2021-01-25 07:16:57'),
(17, 'zaz09', '$2b$10$pvUKNRwAtEsZvRsPMS9YSORmTvFk0mIZR3DMLv6rdkjwN4vBmdFay', 'USER', '2021-01-26 02:38:55', '2021-01-26 02:38:55'),
(19, 'admin1@gmail.com', '$2b$10$s.5PAN5EKiiBmWK8neRYmOsB/aYL9U8L3dQhgePjPor2EI85pyr4W', 'ADMIN', '2021-01-26 04:46:50', '2021-01-26 04:46:50'),
(21, 'zaqijr7@gmail.com', '$2b$10$fK/hESovHS6CXg1dWUPYRuc.thAhT69bdoH4jF4BdP7hhMsZXa2L2', 'USER', '2021-01-26 09:30:51', '2021-01-26 10:33:43'),
(22, 'admintry@gmail.com', '$2b$10$ulLaDDpJV5JiIEc5E/6iGOV1gW8adwUkQirerMKCAfvNfzIvLyVBy', 'ADMIN', '2021-01-26 10:35:27', '2021-01-26 10:50:55'),
(23, 'admin3@gmail.com', '$2b$10$VXyQFVIUlKDUM/9K3ySiEOMph6vqs9vxqZ9DUpHx2xkXQLAny3gXe', 'ADMIN', '2021-01-26 10:54:03', '2021-01-26 10:54:03'),
(24, 'admintry4@gmail.com', '$2b$10$gnpRDJTKRWcN/U7.CpIV../sTXgUwhPLqqbalJtFVJ28mlyCewcN2', 'ADMIN', '2021-01-28 01:55:26', '2021-01-28 01:58:34'),
(25, 'user1@gmail.com', '$2b$10$5EaXbSnHz2CLzSyiFMuCrOYtMZA491hVyMAAaqGOl2W02irN5TcUy', 'USER', '2021-01-28 02:10:35', '2021-01-28 02:10:35'),
(26, 'usertry2@gmail.com', '$2b$10$bAhZBRUN4PmS3Yb6hTJxOezl5Bxhaym1PA6JAaxltjctxk1h9DkQS', 'USER', '2021-01-28 04:16:46', '2021-01-28 04:21:17'),
(27, 'user3@gmail.com', '$2b$10$lP0S3AhGO4PRY/6O4IIcq.KgR8qVXmF8InWyJNGlAGY1PsZ4pzCvC', 'USER', '2021-01-31 05:09:42', '2021-01-31 05:09:42'),
(28, 'user6@gmail.com', '$2b$10$chG1m6QDODcPhSzSAcfPiedsW7sGiqlgZRawvPdbAE0IyAx921Gaq', 'USER', '2021-01-31 05:39:07', '2021-01-31 05:39:07'),
(29, 'user7@gmail.com', '$2b$10$X.Yef6IGoGdCRhri9HWZ5.3krfTJDGKRdRsVs2HFyp8dBT8XR2O5C', 'USER', '2021-01-31 05:44:40', '2021-01-31 05:44:40'),
(30, 'sdfsdf@gmail.com', '$2b$10$loR0XYXaLfLNZ.o.hB.PPeWjY/c4eCvff2odLaSTC8J4r5UACe7US', 'USER', '2021-01-31 05:54:26', '2021-01-31 05:54:26'),
(31, 'abcdef@gmail.com', '$2b$10$1k.n9nObJfWdTBH/KO2kWuCH.kRQE65v98dASpntr6njhw1Q8fi6y', 'USER', '2021-01-31 06:39:21', '2021-01-31 06:39:21'),
(32, 'asdas@gmail.com', '$2b$10$5ngznKxhvveXxmTGoMghH.NkgQJhwU5uIsIpo4/ohix8qBn8W0o.e', 'USER', '2021-01-31 06:44:39', '2021-01-31 06:44:39');

-- --------------------------------------------------------

--
-- Table structure for table `users_profile`
--

CREATE TABLE `users_profile` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT 'UNDEFINED',
  `lastName` varchar(50) DEFAULT 'UNDEFINED',
  `phoneNumber` varchar(50) DEFAULT 'UNDEFINED',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_profile`
--

INSERT INTO `users_profile` (`id`, `id_user`, `firstName`, `lastName`, `phoneNumber`, `createdAt`, `updatedAt`) VALUES
(7, 21, 'Muhammad zaqi', 'Al quraisyiaa', '0858724512523', '2021-01-26 09:30:51', '2021-01-26 10:55:48'),
(8, 22, 'this id admin 7', 'yeah admin 2', '02252244', '2021-01-26 10:35:27', '2021-01-26 10:53:22'),
(9, 23, 'this is admin 3', 'yeah admin 4', '02252244131', '2021-01-26 10:54:03', '2021-01-28 01:57:03'),
(10, 24, 'this is admin', 'yeah admin ', '02252244131', '2021-01-28 01:55:26', '2021-01-28 04:35:04'),
(11, 25, ' User 1', 'User 1', '0858724512523', '2021-01-28 02:10:35', '2021-01-28 02:11:49'),
(12, 26, ' User 2', 'User 2', '0858724512587634', '2021-01-28 04:16:46', '2021-01-28 04:20:17'),
(13, 27, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', '2021-01-31 05:09:42', '2021-01-31 05:09:42'),
(14, 28, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', '2021-01-31 05:39:07', '2021-01-31 05:39:07'),
(15, 29, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', '2021-01-31 05:44:40', '2021-01-31 05:44:40'),
(16, 30, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', '2021-01-31 05:54:26', '2021-01-31 05:54:26'),
(17, 31, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', '2021-01-31 06:39:21', '2021-01-31 06:39:21'),
(18, 32, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', '2021-01-31 06:44:39', '2021-01-31 06:44:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_movie` (`id_movie`),
  ADD KEY `id_cinema` (`id_cinema`),
  ADD KEY `id_showtime` (`id_showtime`);

--
-- Indexes for table `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies_info`
--
ALTER TABLE `movies_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMovie` (`idMovie`) USING BTREE,
  ADD KEY `idGenre` (`idGenre`) USING BTREE;

--
-- Indexes for table `result_ticket`
--
ALTER TABLE `result_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `showtimecinema`
--
ALTER TABLE `showtimecinema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cinema` (`id_cinema`),
  ADD KEY `id_show_time` (`id_show_time`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_profile`
--
ALTER TABLE `users_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `cinema`
--
ALTER TABLE `cinema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `movies_info`
--
ALTER TABLE `movies_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `result_ticket`
--
ALTER TABLE `result_ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `showtimecinema`
--
ALTER TABLE `showtimecinema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users_profile`
--
ALTER TABLE `users_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  ADD CONSTRAINT `buy_ticket_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `buy_ticket_ibfk_7` FOREIGN KEY (`id_cinema`) REFERENCES `cinema` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `buy_ticket_ibfk_8` FOREIGN KEY (`id_showtime`) REFERENCES `show_time` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `buy_ticket_ibfk_9` FOREIGN KEY (`id_movie`) REFERENCES `movie` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `movies_info`
--
ALTER TABLE `movies_info`
  ADD CONSTRAINT `movies_info_ibfk_1` FOREIGN KEY (`idMovie`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movies_info_ibfk_2` FOREIGN KEY (`idGenre`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `result_ticket`
--
ALTER TABLE `result_ticket`
  ADD CONSTRAINT `result_ticket_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `showtimecinema`
--
ALTER TABLE `showtimecinema`
  ADD CONSTRAINT `showtimecinema_ibfk_1` FOREIGN KEY (`id_cinema`) REFERENCES `cinema` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `showtimecinema_ibfk_2` FOREIGN KEY (`id_show_time`) REFERENCES `show_time` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users_profile`
--
ALTER TABLE `users_profile`
  ADD CONSTRAINT `users_profile_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
