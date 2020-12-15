-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 15 déc. 2020 à 08:46
-- Version du serveur :  10.4.11-MariaDB-log
-- Version de PHP : 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dev_consent_management_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `api_users`
--

CREATE TABLE `api_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `api_users`
--

INSERT INTO `api_users` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'idris.tsafack@didomi.com', '$2a$10$uP3DTufGGHnKGlY756jX3ON7eD3O0KuBpIzdTw7gajvQBF9hCcIOS', '2020-12-14 07:49:44', '2020-12-14 07:49:44');

-- --------------------------------------------------------

--
-- Structure de la table `consent`
--

CREATE TABLE `consent` (
  `id` int(11) NOT NULL,
  `consent_label` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `user_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `consent_label` varchar(255) NOT NULL,
  `consent_decision` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `user_uuid`, `consent_label`, `consent_decision`, `created_at`) VALUES
(180, '24455acd-e0e7-44c4-804f-21e6e9a397a4', 'email_notifications', 0, '2020-12-15 07:12:11'),
(179, '24455acd-e0e7-44c4-804f-21e6e9a397a4', 'email_notifications', 1, '2020-12-15 07:12:01'),
(181, '24455acd-e0e7-44c4-804f-21e6e9a397a4', 'sms_notifications', 1, '2020-12-15 07:12:11'),
(45, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:13:06'),
(46, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:14:06'),
(47, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:15:06'),
(48, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:15:28'),
(49, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:16:19'),
(51, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:16:31'),
(53, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:18:14'),
(55, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:19:45'),
(57, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:08'),
(59, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:13'),
(61, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:14'),
(63, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:16'),
(65, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:17'),
(69, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:18'),
(71, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:19'),
(73, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'email_notifications', 1, '2020-12-15 01:22:20'),
(50, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:16:19'),
(52, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:16:31'),
(54, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:18:14'),
(56, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:19:45'),
(58, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:08'),
(60, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:13'),
(62, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:14'),
(64, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:16'),
(66, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:17'),
(70, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:18'),
(72, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:19'),
(74, '6145dafb-aef2-447d-b415-ebfdbb5bb416', 'sms_notifications', 0, '2020-12-15 01:22:20');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`uuid`, `email`, `created_at`, `updated_at`) VALUES
('24455acd-e0e7-44c4-804f-21e6e9a397a4', 'compilator.tsafack@didomi.com', '2020-12-14 07:51:25', '2020-12-14 07:51:25'),
('6145dafb-aef2-447d-b415-ebfdbb5bb416', 'idris.tsafack@didomi.com', '2020-12-14 07:51:13', '2020-12-14 07:51:13'),
('de600dab-0d71-4582-8b07-51f7c2357833', 'test@yahoo.fr', '2020-12-15 02:05:46', '2020-12-15 02:05:46');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `api_users`
--
ALTER TABLE `api_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `consent`
--
ALTER TABLE `consent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `consentUnicityConstraint` (`consent_label`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eventUnicityConstraint` (`user_uuid`,`consent_label`,`consent_decision`,`created_at`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `api_users`
--
ALTER TABLE `api_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `consent`
--
ALTER TABLE `consent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
