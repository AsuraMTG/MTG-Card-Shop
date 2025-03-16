-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 15. 13:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cardshop`
--
CREATE DATABASE IF NOT EXISTS `cardshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cardshop`;
-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_description`) VALUES
(1, 'booster', 'Booster'),
(2, 'display', 'Display'),
(3, 'boundle', 'Boundle'),
(4, 'commander_deck', 'Commander Deck');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `registration_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email`, `address`, `phone_number`, `registration_date`) VALUES
(1, 'Ja Morant', 'call12@example.com', '1234 Memphis, Tennessi MEM', '555-1234', '2025-01-30 08:53:41'),
(3, 'Peter Petrelli', 'peter.petrelli@example.com', '123 Main St, Springfield, IL, 62701, USA', '+1 (555) 123-3452', '2025-02-25 13:16:54');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_date` datetime NOT NULL,
  `event_description` text DEFAULT NULL,
  `max_participants` int(11) DEFAULT NULL,
  `current_participants` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_date`, `event_description`, `max_participants`, `current_participants`) VALUES
(1, 'Magic Tournament', '2025-02-20 10:00:00', 'A competitive Magic: The Gathering tournament.', 50, 2),
(2, 'Commander Night', '2025-03-16 17:00:00', 'Casual Commander games for all levels of players.', 30, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'Feldolgozás alatt'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `total_amount`, `status`) VALUES
(1, 1, '2025-01-30 09:07:00', 20000.00, 'Feldolgozás alatt');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price_at_order` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price_at_order`) VALUES
(1, 1, 2, 1, 20000.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `description` text DEFAULT NULL,
  `imageUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`product_id`, `name`, `category_id`, `price`, `stock_quantity`, `available`, `description`, `imageUrl`) VALUES
(1, 'Tarkir: Dragonstorm - Commander Deck - Jeskai Striker', 4, 22000, 100, 25, 'Each Commander deck contains: \r\n\r\n1 Ready-to-play 100-card Commander deck with: \r\n1 Traditional foil face commander with borderless art \r\n1 Traditional foil featured commander with borderless art \r\n10 Double-sided tokens \r\n1 Collector Booster Sample Pack \r\n1 Reference card \r\n1 Deck box ', '1742041837443.jpg'),
(2, 'Tarkir: Dragonstorm - Commander Deck - Abzan Armor', 4, 20000, 100, 25, 'Each Commander deck contains: \r\n\r\n1 Ready-to-play 100-card Commander deck with: \r\n1 Traditional foil face commander with borderless art \r\n1 Traditional foil featured commander with borderless art \r\n10 Double-sided tokens \r\n1 Collector Booster Sample Pack \r\n1 Reference card \r\n1 Deck box ', '1742041686110.jpg'),
(3, 'Tarkir: Dragonstorm - Commander Deck - Mardu Surge', 4, 20000, 100, 25, 'Each Commander deck contains: \r\n\r\n1 Ready-to-play 100-card Commander deck with: \r\n1 Traditional foil face commander with borderless art \r\n1 Traditional foil featured commander with borderless art \r\n10 Double-sided tokens \r\n1 Collector Booster Sample Pack \r\n1 Reference card \r\n1 Deck box ', '1742041701437.jpg'),
(4, 'Tarkir: Dragonstorm - Commander Deck - Sultai Arisen', 4, 20000, 100, 25, 'Each Commander deck contains: \r\n\r\n1 Ready-to-play 100-card Commander deck with: \r\n1 Traditional foil face commander with borderless art \r\n1 Traditional foil featured commander with borderless art \r\n10 Double-sided tokens \r\n1 Collector Booster Sample Pack \r\n1 Reference card \r\n1 Deck box ', '1742041715003.jpg'),
(5, 'Tarkir: Dragonstorm - Commander Deck - Temur Roar', 4, 22000, 100, 25, 'Each Commander deck contains: \r\n\r\n1 Ready-to-play 100-card Commander deck with: \r\n1 Traditional foil face commander with borderless art \r\n1 Traditional foil featured commander with borderless art \r\n10 Double-sided tokens \r\n1 Collector Booster Sample Pack \r\n1 Reference card \r\n1 Deck box ', '1742041729082.jpg'),
(6, 'Tarkir: Dragonstorm - Play Display ', 2, 58000, 100, 59, 'Contents:\n30 Tarkir: Dragonstorm Play Boosters; each Play Booster contains 14 Magic: The Gathering cards\nEach Play Booster may contain these cards: TDM 1–286, 292–398; SPG 104–113\n1–4 cards of rarity Rare or higher (2: 26%; 3: 2%; 4: <1%),\n3–5 Uncommon cards\n6–9 Common cards\nTraditional Foil Land replaces a Land in 20% of boosters.\n1 card of any rarity is Traditional Foil\nFoil Borderless Mythic Planeswalker in <1% of boosters', '1742129797413.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `registrations`
--

CREATE TABLE `registrations` (
  `registration_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `registration_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `registrations`
--

INSERT INTO `registrations` (`registration_id`, `event_id`, `customer_id`, `registration_date`) VALUES
(1, 1, 1, '2025-02-04 14:56:25'),
(2, 2, 1, '2025-02-04 14:56:25'),
(3, 2, 3, '2025-02-25 13:17:43'),
(6, 1, 3, '2025-02-25 13:19:18');

--
-- Eseményindítók `registrations`
--
DELIMITER $$
CREATE TRIGGER `update_current_participants_after_registration` AFTER INSERT ON `registrations` FOR EACH ROW BEGIN
    UPDATE events
    SET current_participants = (SELECT COUNT(*) FROM registrations WHERE event_id = NEW.event_id)
    WHERE event_id = NEW.event_id;
END
$$
DELIMITER ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- A tábla indexei `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- A tábla indexei `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_products_categories` (`category_id`);

--
-- A tábla indexei `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `registrations_ibfk_3` (`customer_id`),
  ADD KEY `event_id` (`event_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `registrations`
--
ALTER TABLE `registrations`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Megkötések a táblához `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Megkötések a táblához `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `registrations_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
