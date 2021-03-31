-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 08 mars 2021 à 01:47
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `store`
--
CREATE DATABASE IF NOT EXISTS `store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `store`;

DELIMITER $$
--
-- Procédures
--
DROP PROCEDURE IF EXISTS `updateOrderAmount`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateOrderAmount` (IN `id_Order` INT)  BEGIN
	update `order` set amount=(select sum(p.price*o.quantity) from orderdetail o inner JOIN product p on p.id=o.idProduct where o.idOrder=id_Order) where id=id_Order;
    	update `order` set toPay=(select sum(p.price*o.quantity) from orderdetail o inner JOIN product p on p.id=o.idProduct where o.idOrder=id_Order and o.prepared) where id=id_Order;
        update `order` set missingNumber=(select sum(o.quantity) from orderdetail o inner JOIN product p on p.id=o.idProduct where o.idOrder=id_Order and !o.prepared) where id=id_Order;
        update `order` set itemsNumber=(select sum(o.quantity) from orderdetail o inner JOIN product p on p.id=o.idProduct where o.idOrder=id_Order) where id=id_Order;
END$$

DROP PROCEDURE IF EXISTS `updateTimeSlot`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateTimeSlot` (IN `id_timeslot` INT)  NO SQL
update timeslot set `full`=isTimeslotFull(id_timeslot), `expired`=isTimeslotExpired(id_timeslot) where id=id_timeslot$$

--
-- Fonctions
--
DROP FUNCTION IF EXISTS `getFreeEmployee`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `getFreeEmployee` (`id_timeslot` INT) RETURNS INT(11) NO SQL
BEGIN
DECLARE res INT;

SET res=(SELECT e.id FROM employee e where e.id not in (select o.idEmployee from `order` o inner join timeslot t on o.idTimeslot=t.id where t.id=id_timeslot and o.idEmployee is not null) limit 1);
RETURN res;
END$$

DROP FUNCTION IF EXISTS `getPackPromo`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `getPackPromo` (`id_pack` INT) RETURNS FLOAT NO SQL
BEGIN
DECLARE old_p float;
DECLARE new_p float;

SET old_p=(SELECT SUM(p.price) FROM `pack` inner join product p on `pack`.idProduct=p.id WHERE idPack=id_pack);
SET new_p=(SELECT price from product where id=id_pack);
return new_p-old_p;
END$$

DROP FUNCTION IF EXISTS `isTimeslotExpired`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `isTimeslotExpired` (`id_timeslot` INT) RETURNS TINYINT(1) NO SQL
return (select (slotDate>=CURDATE()-0.5) from timeslot WHERE id=id_timeslot)$$

DROP FUNCTION IF EXISTS `isTimeslotFull`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `isTimeslotFull` (`id_timeslot` INT) RETURNS INT(11) NO SQL
return (SELECT count(*) FROM `order` WHERE idTimeslot=id_timeslot AND idEmployee is NULL)>=(SELECT COUNT(*) FROM employee e where e.id not in (select o.idEmployee from `order` o inner join timeslot t on o.idTimeslot=t.id where t.id=id_timeslot and o.idEmployee is not null))$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `associatedproduct`
--

DROP TABLE IF EXISTS `associatedproduct`;
CREATE TABLE `associatedproduct` (
  `idProduct` int(11) NOT NULL,
  `idAssoProduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `associatedproduct`
--

INSERT INTO `associatedproduct` (`idProduct`, `idAssoProduct`) VALUES
(1, 3),
(1, 7),
(1, 13),
(3, 13);

-- --------------------------------------------------------

--
-- Structure de la table `basket`
--

DROP TABLE IF EXISTS `basket`;
CREATE TABLE `basket` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `dateCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `basket`
--

INSERT INTO `basket` (`id`, `name`, `dateCreation`, `idUser`) VALUES
(1, 'Mis de côté', '2021-03-05 11:37:45', 2),
(2, 'Mis de côté', '2021-03-06 02:23:11', 3);

-- --------------------------------------------------------

--
-- Structure de la table `basketdetail`
--

DROP TABLE IF EXISTS `basketdetail`;
CREATE TABLE `basketdetail` (
  `idBasket` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `basketdetail`
--

INSERT INTO `basketdetail` (`idBasket`, `idProduct`, `quantity`) VALUES
(1, 13, 1);

-- --------------------------------------------------------

--
-- Structure de la table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `password`) VALUES
(1, 'Mario', 'mario@nintendo.org', '0000'),
(2, 'Luigi', 'luigi@nintendo.org', '0000'),
(3, 'Waluigi', 'Waluigi@nintendo.org', '0000');

-- --------------------------------------------------------

--
-- Structure de la table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `dateCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `idUser` int(11) NOT NULL,
  `idEmployee` int(11) DEFAULT NULL,
  `status` enum('created','prepared','delivered','') NOT NULL,
  `amount` decimal(6,2) NOT NULL,
  `toPay` decimal(6,2) NOT NULL,
  `itemsNumber` int(11) NOT NULL,
  `missingNumber` int(11) NOT NULL,
  `idTimeslot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `order`
--

INSERT INTO `order` (`id`, `dateCreation`, `idUser`, `idEmployee`, `status`, `amount`, `toPay`, `itemsNumber`, `missingNumber`, `idTimeslot`) VALUES
(1, '2021-03-03 12:10:31', 1, 1, 'created', '0.91', '0.81', 4, 1, 1),
(3, '2021-03-03 18:44:16', 1, 2, 'created', '1.00', '1.00', 4, 0, 1),
(4, '2021-03-04 10:52:53', 1, 1, 'created', '0.00', '0.00', 0, 0, 2),
(8, '2021-03-04 11:05:50', 1, 2, 'created', '0.00', '0.00', 0, 0, 2),
(9, '2021-03-05 11:43:03', 2, 3, 'created', '0.27', '0.00', 1, 1, 2),
(13, '2021-03-06 14:12:42', 3, 1, 'created', '0.00', '0.00', 0, 0, 3),
(15, '2021-03-07 11:56:07', 3, 2, 'created', '0.00', '0.00', 0, 0, 3);

--
-- Déclencheurs `order`
--
DROP TRIGGER IF EXISTS `after_insert_order`;
DELIMITER $$
CREATE TRIGGER `after_insert_order` AFTER INSERT ON `order` FOR EACH ROW if (NEW.idTimeslot is NOT NULL) THEN
    call updateTimeSlot(NEW.idTimeslot);
END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `before_insert_order`;
DELIMITER $$
CREATE TRIGGER `before_insert_order` BEFORE INSERT ON `order` FOR EACH ROW BEGIN
IF (NEW.idEmployee IS NULL) THEN
    IF(NEW.idTimeslot IS NOT NULL) THEN
        SET NEW.idEmployee=getFreeEmployee(NEW.idTimeslot);
    END IF;
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `delete_order`;
DELIMITER $$
CREATE TRIGGER `delete_order` AFTER DELETE ON `order` FOR EACH ROW if (OLD.idTimeslot is NOT NULL) THEN
    call updateTimeSlot(OLD.idTimeslot);
end if
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `update_order`;
DELIMITER $$
CREATE TRIGGER `update_order` AFTER UPDATE ON `order` FOR EACH ROW if (NEW.idTimeslot is NOT NULL) THEN
    call updateTimeSlot(NEW.idTimeslot);
ELSEIF(OLD.idTimeslot is NOT NULL) THEN
    call updateTimeSlot(OLD.idTimeslot);
end if
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
CREATE TABLE `orderdetail` (
  `idOrder` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` decimal(6,2) NOT NULL,
  `prepared` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `orderdetail`
--

INSERT INTO `orderdetail` (`idOrder`, `idProduct`, `quantity`, `prepared`) VALUES
(1, 1, '3.00', 1),
(1, 3, '1.00', 0),
(3, 7, '4.00', 1),
(9, 1, '1.00', 0);

--
-- Déclencheurs `orderdetail`
--
DROP TRIGGER IF EXISTS `delete_order_detail`;
DELIMITER $$
CREATE TRIGGER `delete_order_detail` AFTER DELETE ON `orderdetail` FOR EACH ROW CALL updateOrderAmount (
        OLD.idOrder
    )
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `insert_order_detail`;
DELIMITER $$
CREATE TRIGGER `insert_order_detail` AFTER INSERT ON `orderdetail` FOR EACH ROW CALL updateOrderAmount (
        NEW.idOrder
    )
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `update_order_detail`;
DELIMITER $$
CREATE TRIGGER `update_order_detail` AFTER UPDATE ON `orderdetail` FOR EACH ROW CALL updateOrderAmount (
        NEW.idOrder
    )
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `pack`
--

DROP TABLE IF EXISTS `pack`;
CREATE TABLE `pack` (
  `idProduct` int(11) NOT NULL,
  `idPack` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pack`
--

INSERT INTO `pack` (`idProduct`, `idPack`) VALUES
(1, 13),
(3, 13);

--
-- Déclencheurs `pack`
--
DROP TRIGGER IF EXISTS `delete_associated`;
DELIMITER $$
CREATE TRIGGER `delete_associated` AFTER DELETE ON `pack` FOR EACH ROW BEGIN
DELETE FROM `associatedproduct` WHERE idProduct=OLD.idProduct AND idAssoproduct=OLD.idPack;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `insert_associated`;
DELIMITER $$
CREATE TRIGGER `insert_associated` AFTER INSERT ON `pack` FOR EACH ROW BEGIN
DECLARE promo float;
INSERT INTO `associatedproduct`(idProduct,idAssoproduct) VALUES(NEW.idProduct,NEW.idPack);
SET promo = getPackPromo(NEW.idPack);
UPDATE product SET promotion= promo where id=NEW.idPack;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `comments` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `promotion` decimal(6,2) NOT NULL,
  `idSection` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `name`, `comments`, `image`, `price`, `promotion`, `idSection`) VALUES
(1, 'Grany Smith', NULL, NULL, '0.27', '0.00', 1),
(3, 'Golden', NULL, NULL, '0.10', '0.00', 1),
(7, 'Cocharde', NULL, NULL, '0.25', '0.00', 1),
(13, 'Pommes +', NULL, NULL, '0.35', '-0.02', 1);

--
-- Déclencheurs `product`
--
DROP TRIGGER IF EXISTS `update_product_price`;
DELIMITER $$
CREATE TRIGGER `update_product_price` BEFORE UPDATE ON `product` FOR EACH ROW BEGIN
if (OLD.price<>NEW.price) THEN
    SET NEW.promotion = getPackPromo(NEW.id);
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `section`
--

DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `section`
--

INSERT INTO `section` (`id`, `name`, `description`) VALUES
(1, 'Fruits et légumes', 'Tous les fruits et les légumes locaux'),
(2, 'Bricolage', 'Rayon bricolage'),
(7, 'Boucherie', 'Rayon boucherie'),
(10, 'Boulangerie', 'Rayon boulangerie');

-- --------------------------------------------------------

--
-- Structure de la table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
CREATE TABLE `timeslot` (
  `id` int(11) NOT NULL,
  `slotDate` datetime NOT NULL,
  `full` tinyint(1) NOT NULL,
  `expired` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `timeslot`
--

INSERT INTO `timeslot` (`id`, `slotDate`, `full`, `expired`) VALUES
(1, '2021-03-03 12:00:00', 1, 0),
(2, '2021-03-04 12:00:00', 1, 0),
(3, '2021-03-06 16:00:00', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(1, 'SMITH Abraham', 'a.smith@email.net', '0000'),
(2, 'DOE John', 'j.doe@email.net', '0000'),
(3, 'STAN Johan', 'j.stan@email.net', '1234');

--
-- Déclencheurs `user`
--
DROP TRIGGER IF EXISTS `insert_user_basket`;
DELIMITER $$
CREATE TRIGGER `insert_user_basket` AFTER INSERT ON `user` FOR EACH ROW BEGIN
INSERT INTO basket(name,idUser) VALUES('Mis de côté',NEW.id);
END
$$
DELIMITER ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `associatedproduct`
--
ALTER TABLE `associatedproduct`
  ADD PRIMARY KEY (`idProduct`,`idAssoProduct`),
  ADD KEY `productsasso_ibfk_1` (`idAssoProduct`);

--
-- Index pour la table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `basketdetail`
--
ALTER TABLE `basketdetail`
  ADD PRIMARY KEY (`idBasket`,`idProduct`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Index pour la table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idEmployee` (`idEmployee`),
  ADD KEY `idTimeslot` (`idTimeslot`);

--
-- Index pour la table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`idOrder`,`idProduct`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Index pour la table `pack`
--
ALTER TABLE `pack`
  ADD PRIMARY KEY (`idProduct`,`idPack`),
  ADD KEY `idProduct` (`idPack`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSection` (`idSection`);
ALTER TABLE `product` ADD FULLTEXT KEY `name` (`name`);

--
-- Index pour la table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `associatedproduct`
--
ALTER TABLE `associatedproduct`
  ADD CONSTRAINT `associatedproduct_ibfk_1` FOREIGN KEY (`idAssoProduct`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `associatedproduct_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `basketdetail`
--
ALTER TABLE `basketdetail`
  ADD CONSTRAINT `basketdetail_ibfk_1` FOREIGN KEY (`idBasket`) REFERENCES `basket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `basketdetail_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`idEmployee`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`idTimeslot`) REFERENCES `timeslot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pack`
--
ALTER TABLE `pack`
  ADD CONSTRAINT `pack_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pack_ibfk_2` FOREIGN KEY (`idPack`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idSection`) REFERENCES `section` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
