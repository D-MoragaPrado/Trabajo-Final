-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-06-2021 a las 05:05:35
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `accesorios_mascotas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categoria_id` int(10) NOT NULL,
  `nombre_categoria` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categoria_id`, `nombre_categoria`) VALUES
(1, 'Perro'),
(2, 'Gato'),
(3, 'Sombrero'),
(4, 'Disfraz'),
(5, 'Zapato'),
(6, 'Vestido'),
(7, 'Poleron'),
(8, 'Parka'),
(9, 'Traje'),
(10, 'Pijama');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `nombre_usuario` text NOT NULL,
  `comment` text NOT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `id_producto`, `nombre_usuario`, `comment`, `rating`) VALUES
(1, 2, 'Jaime', 'muy bonito pero incomodo para el michi', 2),
(3, 8, 'Jaime', 'a mi joni le quedo divino se ve fabuloso', 4),
(17, 6, 'Jaime', 'me encanta', 5),
(19, 2, 'Roberto Cristobal', 'me dio hambre', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_parcial` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id_parcial`, `id_pedido`, `id_producto`, `cantidad_producto`) VALUES
(3, 10, 7, 4),
(4, 11, 3, 3),
(5, 12, 7, 4),
(6, 13, 6, 2),
(7, 13, 8, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunas`
--

CREATE TABLE `comunas` (
  `comuna_id` int(11) NOT NULL,
  `comuna_nombre` varchar(64) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comunas`
--

INSERT INTO `comunas` (`comuna_id`, `comuna_nombre`, `region_id`) VALUES
(1, 'Arica', 1),
(2, 'Camarones', 1),
(3, 'General Lagos', 1),
(4, 'Putre', 1),
(5, 'Alto Hospicio', 2),
(6, 'Iquique', 2),
(7, 'Camiña', 2),
(8, 'Colchane', 2),
(9, 'Huara', 2),
(10, 'Pica', 2),
(11, 'Pozo Almonte', 2),
(12, 'Antofagasta', 3),
(13, 'Mejillones', 3),
(14, 'Sierra Gorda', 3),
(15, 'Taltal', 3),
(16, 'Calama', 3),
(17, 'Ollague', 3),
(18, 'San Pedro de Atacama', 3),
(19, 'María Elena', 3),
(20, 'Tocopilla', 3),
(21, 'Chañaral', 4),
(22, 'Diego de Almagro', 4),
(23, 'Caldera', 4),
(24, 'Copiapó', 4),
(25, 'Tierra Amarilla', 4),
(26, 'Alto del Carmen', 4),
(27, 'Freirina', 4),
(28, 'Huasco', 4),
(29, 'Vallenar', 4),
(30, 'Canela', 5),
(31, 'Illapel', 5),
(32, 'Los Vilos', 5),
(33, 'Salamanca', 5),
(34, 'Andacollo', 5),
(35, 'Coquimbo', 5),
(36, 'La Higuera', 5),
(37, 'La Serena', 5),
(38, 'Paihuaco', 5),
(39, 'Vicuña', 5),
(40, 'Combarbalá', 5),
(41, 'Monte Patria', 5),
(42, 'Ovalle', 5),
(43, 'Punitaqui', 5),
(44, 'Río Hurtado', 5),
(45, 'Isla de Pascua', 6),
(46, 'Calle Larga', 6),
(47, 'Los Andes', 6),
(48, 'Rinconada', 6),
(49, 'San Esteban', 6),
(50, 'La Ligua', 6),
(51, 'Papudo', 6),
(52, 'Petorca', 6),
(53, 'Zapallar', 6),
(54, 'Hijuelas', 6),
(55, 'La Calera', 6),
(56, 'La Cruz', 6),
(57, 'Limache', 6),
(58, 'Nogales', 6),
(59, 'Olmué', 6),
(60, 'Quillota', 6),
(61, 'Algarrobo', 6),
(62, 'Cartagena', 6),
(63, 'El Quisco', 6),
(64, 'El Tabo', 6),
(65, 'San Antonio', 6),
(66, 'Santo Domingo', 6),
(67, 'Catemu', 6),
(68, 'Llaillay', 6),
(69, 'Panquehue', 6),
(70, 'Putaendo', 6),
(71, 'San Felipe', 6),
(72, 'Santa María', 6),
(73, 'Casablanca', 6),
(74, 'Concón', 6),
(75, 'Juan Fernández', 6),
(76, 'Puchuncaví', 6),
(77, 'Quilpué', 6),
(78, 'Quintero', 6),
(79, 'Valparaíso', 6),
(80, 'Villa Alemana', 6),
(81, 'Viña del Mar', 6),
(82, 'Colina', 7),
(83, 'Lampa', 7),
(84, 'Tiltil', 7),
(85, 'Pirque', 7),
(86, 'Puente Alto', 7),
(87, 'San José de Maipo', 7),
(88, 'Buin', 7),
(89, 'Calera de Tango', 7),
(90, 'Paine', 7),
(91, 'San Bernardo', 7),
(92, 'Alhué', 7),
(93, 'Curacaví', 7),
(94, 'María Pinto', 7),
(95, 'Melipilla', 7),
(96, 'San Pedro', 7),
(97, 'Cerrillos', 7),
(98, 'Cerro Navia', 7),
(99, 'Conchalí', 7),
(100, 'El Bosque', 7),
(101, 'Estación Central', 7),
(102, 'Huechuraba', 7),
(103, 'Independencia', 25),
(104, 'La Cisterna', 7),
(105, 'La Granja', 7),
(106, 'La Florida', 7),
(107, 'La Pintana', 7),
(108, 'La Reina', 7),
(109, 'Las Condes', 7),
(110, 'Lo Barnechea', 7),
(111, 'Lo Espejo', 7),
(112, 'Lo Prado', 7),
(113, 'Macul', 7),
(114, 'Maipú', 7),
(115, 'Ñuñoa', 7),
(116, 'Pedro Aguirre Cerda', 7),
(117, 'Peñalolén', 7),
(118, 'Providencia', 7),
(119, 'Pudahuel', 7),
(120, 'Quilicura', 7),
(121, 'Quinta Normal', 7),
(122, 'Recoleta', 7),
(123, 'Renca', 7),
(124, 'San Miguel', 7),
(125, 'San Joaquín', 7),
(126, 'San Ramón', 7),
(127, 'Santiago', 7),
(128, 'Vitacura', 7),
(129, 'El Monte', 7),
(130, 'Isla de Maipo', 7),
(131, 'Padre Hurtado', 7),
(132, 'Peñaflor', 7),
(133, 'Talagante', 7),
(134, 'Codegua', 8),
(135, 'Coínco', 8),
(136, 'Coltauco', 8),
(137, 'Doñihue', 8),
(138, 'Graneros', 8),
(139, 'Las Cabras', 8),
(140, 'Machalí', 8),
(141, 'Malloa', 8),
(142, 'Mostazal', 8),
(143, 'Olivar', 8),
(144, 'Peumo', 8),
(145, 'Pichidegua', 8),
(146, 'Quinta de Tilcoco', 8),
(147, 'Rancagua', 8),
(148, 'Rengo', 8),
(149, 'Requínoa', 8),
(150, 'San Vicente de Tagua Tagua', 8),
(151, 'La Estrella', 8),
(152, 'Litueche', 8),
(153, 'Marchihue', 8),
(154, 'Navidad', 8),
(155, 'Peredones', 8),
(156, 'Pichilemu', 8),
(157, 'Chépica', 8),
(158, 'Chimbarongo', 8),
(159, 'Lolol', 8),
(160, 'Nancagua', 8),
(161, 'Palmilla', 8),
(162, 'Peralillo', 8),
(163, 'Placilla', 8),
(164, 'Pumanque', 8),
(165, 'San Fernando', 8),
(166, 'Santa Cruz', 8),
(167, 'Cauquenes', 9),
(168, 'Chanco', 9),
(169, 'Pelluhue', 9),
(170, 'Curicó', 9),
(171, 'Hualañé', 9),
(172, 'Licantén', 9),
(173, 'Molina', 9),
(174, 'Rauco', 9),
(175, 'Romeral', 9),
(176, 'Sagrada Familia', 9),
(177, 'Teno', 9),
(178, 'Vichuquén', 9),
(179, 'Colbún', 9),
(180, 'Linares', 9),
(181, 'Longaví', 9),
(182, 'Parral', 9),
(183, 'Retiro', 9),
(184, 'San Javier', 9),
(185, 'Villa Alegre', 9),
(186, 'Yerbas Buenas', 9),
(187, 'Constitución', 9),
(188, 'Curepto', 9),
(189, 'Empedrado', 9),
(190, 'Maule', 9),
(191, 'Pelarco', 9),
(192, 'Pencahue', 9),
(193, 'Río Claro', 9),
(194, 'San Clemente', 9),
(195, 'San Rafael', 9),
(196, 'Talca', 9),
(197, 'Arauco', 11),
(198, 'Cañete', 11),
(199, 'Contulmo', 11),
(200, 'Curanilahue', 11),
(201, 'Lebu', 11),
(202, 'Los Álamos', 11),
(203, 'Tirúa', 11),
(204, 'Alto Biobío', 11),
(205, 'Antuco', 11),
(206, 'Cabrero', 11),
(207, 'Laja', 11),
(208, 'Los Ángeles', 11),
(209, 'Mulchén', 11),
(210, 'Nacimiento', 11),
(211, 'Negrete', 11),
(212, 'Quilaco', 11),
(213, 'Quilleco', 11),
(214, 'San Rosendo', 11),
(215, 'Santa Bárbara', 11),
(216, 'Tucapel', 11),
(217, 'Yumbel', 11),
(218, 'Chiguayante', 11),
(219, 'Concepción', 11),
(220, 'Coronel', 11),
(221, 'Florida', 11),
(222, 'Hualpén', 11),
(223, 'Hualqui', 11),
(224, 'Lota', 11),
(225, 'Penco', 11),
(226, 'San Pedro de La Paz', 11),
(227, 'Santa Juana', 11),
(228, 'Talcahuano', 11),
(229, 'Tomé', 11),
(230, 'Bulnes', 10),
(231, 'Chillán', 10),
(232, 'Chillán Viejo', 10),
(233, 'Cobquecura', 10),
(234, 'Coelemu', 10),
(235, 'Coihueco', 10),
(236, 'El Carmen', 10),
(237, 'Ninhue', 10),
(238, 'Ñiquen', 10),
(239, 'Pemuco', 10),
(240, 'Pinto', 10),
(241, 'Portezuelo', 10),
(242, 'Quillón', 10),
(243, 'Quirihue', 10),
(244, 'Ránquil', 10),
(245, 'San Carlos', 10),
(246, 'San Fabián', 10),
(247, 'San Ignacio', 10),
(248, 'San Nicolás', 10),
(249, 'Treguaco', 10),
(250, 'Yungay', 10),
(251, 'Carahue', 12),
(252, 'Cholchol', 12),
(253, 'Cunco', 12),
(254, 'Curarrehue', 12),
(255, 'Freire', 12),
(256, 'Galvarino', 12),
(257, 'Gorbea', 12),
(258, 'Lautaro', 12),
(259, 'Loncoche', 12),
(260, 'Melipeuco', 12),
(261, 'Nueva Imperial', 12),
(262, 'Padre Las Casas', 12),
(263, 'Perquenco', 12),
(264, 'Pitrufquén', 12),
(265, 'Pucón', 12),
(266, 'Saavedra', 12),
(267, 'Temuco', 12),
(268, 'Teodoro Schmidt', 12),
(269, 'Toltén', 12),
(270, 'Vilcún', 12),
(271, 'Villarrica', 12),
(272, 'Angol', 12),
(273, 'Collipulli', 12),
(274, 'Curacautín', 12),
(275, 'Ercilla', 12),
(276, 'Lonquimay', 12),
(277, 'Los Sauces', 12),
(278, 'Lumaco', 12),
(279, 'Purén', 12),
(280, 'Renaico', 12),
(281, 'Traiguén', 12),
(282, 'Victoria', 12),
(283, 'Corral', 13),
(284, 'Lanco', 13),
(285, 'Los Lagos', 13),
(286, 'Máfil', 13),
(287, 'Mariquina', 13),
(288, 'Paillaco', 13),
(289, 'Panguipulli', 13),
(290, 'Valdivia', 13),
(291, 'Futrono', 13),
(292, 'La Unión', 13),
(293, 'Lago Ranco', 13),
(294, 'Río Bueno', 13),
(295, 'Ancud', 14),
(296, 'Castro', 14),
(297, 'Chonchi', 14),
(298, 'Curaco de Vélez', 14),
(299, 'Dalcahue', 14),
(300, 'Puqueldón', 14),
(301, 'Queilén', 14),
(302, 'Quemchi', 14),
(303, 'Quellón', 14),
(304, 'Quinchao', 14),
(305, 'Calbuco', 14),
(306, 'Cochamó', 14),
(307, 'Fresia', 14),
(308, 'Frutillar', 14),
(309, 'Llanquihue', 14),
(310, 'Los Muermos', 14),
(311, 'Maullín', 14),
(312, 'Puerto Montt', 14),
(313, 'Puerto Varas', 14),
(314, 'Osorno', 14),
(315, 'Puero Octay', 14),
(316, 'Purranque', 14),
(317, 'Puyehue', 14),
(318, 'Río Negro', 14),
(319, 'San Juan de la Costa', 14),
(320, 'San Pablo', 14),
(321, 'Chaitén', 14),
(322, 'Futaleufú', 14),
(323, 'Hualaihué', 14),
(324, 'Palena', 14),
(325, 'Aisén', 15),
(326, 'Cisnes', 15),
(327, 'Guaitecas', 15),
(328, 'Cochrane', 15),
(329, 'O\'higgins', 15),
(330, 'Tortel', 15),
(331, 'Coihaique', 15),
(332, 'Lago Verde', 15),
(333, 'Chile Chico', 15),
(334, 'Río Ibáñez', 15),
(335, 'Antártica', 16),
(336, 'Cabo de Hornos', 16),
(337, 'Laguna Blanca', 16),
(338, 'Punta Arenas', 16),
(339, 'Río Verde', 16),
(340, 'San Gregorio', 16),
(341, 'Porvenir', 16),
(342, 'Primavera', 16),
(343, 'Timaukel', 16),
(344, 'Natales', 16),
(345, 'Torres del Paine', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(10) NOT NULL,
  `comprador` text NOT NULL,
  `fecha_compra` date NOT NULL,
  `total_compra` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `comprador`, `fecha_compra`, `total_compra`) VALUES
(10, 'jaimeL@gmail.com', '0000-00-00', 35960),
(11, 'jaimeL@gmail.com', '0000-00-00', 116970),
(12, 'jaimeL@gmail.com', '0000-00-00', 35960),
(13, 'jaimeL@gmail.com', '0000-00-00', 29950);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` int(10) NOT NULL,
  `stock` int(10) NOT NULL,
  `comentarios` text DEFAULT NULL,
  `calificacion` float DEFAULT NULL,
  `src_imagen` varchar(100) NOT NULL,
  `categoria_principal_id` int(10) NOT NULL,
  `subcategoria_id` int(10) NOT NULL,
  `descripcion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `stock`, `comentarios`, `calificacion`, `src_imagen`, `categoria_principal_id`, `subcategoria_id`, `descripcion`) VALUES
(1, 'Traje de Murcielago para Gato', 15990, 25, NULL, 0, './../../../assets/gato-murcielago.jpg', 2, 9, '¡Cuidado! Este tierno murciélago asusta de verdad!'),
(2, 'Traje Sushi para Gatitos', 20990, 35, NULL, 3, './../../../assets/gato-sushi.jpg', 2, 9, 'Convierte a tu gato en un lindo sushigato con este disfraz.'),
(3, 'Traje de Chewbacca para Perros', 38990, 15, NULL, 0, './../../../assets/perro-chewbacca.jpg', 1, 9, 'Para los fanáticos de Star Wars'),
(4, 'Traje de Abeja para Gatos', 26990, 15, NULL, 0, './../../../assets/gato-abeja.jpg', 2, 9, 'Solo para gatos que les encanta estar afuera entremedio de las plantas, no incluye miel'),
(5, 'Traje de Chucky perro', 2500, 3, NULL, 0, './../../../assets/perro-chucky.jpg', 1, 9, 'Traje de Halloween para asustar a tu familia con un tenebroso perrito'),
(6, 'Sombrero de Mariachi para Gato', 5990, 8, NULL, 2, './../../../assets/gato-sombrero-mariachi.jpg', 2, 3, 'Sobrero mariachi, tu gatito se vera di-vi-no'),
(7, 'Par de Calcetines para Perros', 8990, 16, NULL, 0, './../../../assets/calcetines-perro.jpg', 1, 5, '1 par de calcetines de osito para que tu perro se vea adorable'),
(8, 'Sombrero de Mariachi para Perro', 5990, 7, NULL, 0, './../../../assets/perro-mariachi.jpg', 1, 3, 'Con este sombrero enseñales a todos que los mariachis son aceptados a tu alrededor y listos para buena música'),
(9, 'Traje de León para perro', 5600, 4, NULL, 0, './../../../assets/perro-leon.jpg', 1, 9, '¡Rawr! Ahora no solamente tienen que tener cuidado de un perro, sino de un perro-león'),
(10, 'Traje de Dinosaurio para gato', 8000, 0, NULL, 0, './../../../assets/gato-dinosaurio.jpg', 2, 9, 'Imaginamos que se había extinguido, pero aquí está tu... ¿DinoGato?');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `region_id` int(11) NOT NULL,
  `region_nombre` varchar(64) NOT NULL,
  `region_ordinal` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`region_id`, `region_nombre`, `region_ordinal`) VALUES
(1, 'Arica y Parinacota', 'XV'),
(2, 'Tarapacá', 'I'),
(3, 'Antofagasta', 'II'),
(4, 'Atacama', 'III'),
(5, 'Coquimbo', 'IV'),
(6, 'Valparaiso', 'V'),
(7, 'Metropolitana de Santiago', 'RM'),
(8, 'Libertador General Bernardo O\'Higgins', 'VI'),
(9, 'Maule', 'VII'),
(10, 'Ñuble', 'XVI'),
(11, 'Biobío', 'VIII'),
(12, 'La Araucanía', 'IX'),
(13, 'Los Ríos', 'XIV'),
(14, 'Los Lagos', 'X'),
(15, 'Aisén del General Carlos Ibáñez del Campo', 'XI'),
(16, 'Magallanes y de la Antártica Chilena', 'XII');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `correo` varchar(200) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `password` varchar(32) NOT NULL,
  `region_id` int(11) NOT NULL,
  `comuna_id` int(11) NOT NULL,
  `pregunta_secreta` text NOT NULL,
  `respuesta_secreta` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`correo`, `nombres`, `apellidos`, `rut`, `password`, `region_id`, `comuna_id`, `pregunta_secreta`, `respuesta_secreta`) VALUES
('example@gmail.com', 'probando', 'probadul gutierrez', '5634289-5', '4eae18cf9e54a0f62b44176d074cbe2f', 5, 41, '¿Cuál es su juego favorito?', '9cdfb439c7876e703e307864c9167a15'),
('jaimeL@gmail.com', 'Jaime', 'Lannister', '15369145-k', 'c2c32f273bd629bcb4634b499c39dfb9', 3, 15, '¿Donde fue su primer romance?', '1c6c87e0931b2f5dc302f1a6dcdca5a2'),
('robertoisla92@gmail.com', 'Roberto Cristobal', 'Isla Henriquez', '20184001-5', '36de38f984a5140b553df0bf2440ec34', 6, 81, '¿Cómo se llamó su segunda mascota?', '2405f7f7c6c31378a8c72fbafd723535'),
('uwu@gmail.com', 'Samuel', 'Deluque', '15245699-4', '978d7cec9149bf4ac6a718102adb8f43', 5, 32, '¿Cuál es su juego favorito?', '0ef3c40d5c2a0a04c3154e7190c818dd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_admin`
--

CREATE TABLE `usuario_admin` (
  `nombre_admin` varchar(150) NOT NULL,
  `pass_admin` varchar(32) NOT NULL,
  `correo_electronico_admin` text DEFAULT NULL,
  `contacto_admin` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_admin`
--

INSERT INTO `usuario_admin` (`nombre_admin`, `pass_admin`, `correo_electronico_admin`, `contacto_admin`) VALUES
('Roberto Cristobal', '36de38f984a5140b553df0bf2440ec34', 'robertoisla92@gmail.com', '+56951931136');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_parcial`);

--
-- Indices de la tabla `comunas`
--
ALTER TABLE `comunas`
  ADD PRIMARY KEY (`comuna_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_categoria_principal` (`categoria_principal_id`),
  ADD KEY `FK_subCategoria` (`subcategoria_id`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`region_id`) USING BTREE;

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correo`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD KEY `FK_region` (`region_id`),
  ADD KEY `FK_comuna` (`comuna_id`);

--
-- Indices de la tabla `usuario_admin`
--
ALTER TABLE `usuario_admin`
  ADD PRIMARY KEY (`nombre_admin`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_parcial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `comunas`
--
ALTER TABLE `comunas`
  MODIFY `comuna_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK_categoria_principal` FOREIGN KEY (`categoria_principal_id`) REFERENCES `categorias` (`categoria_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_subCategoria` FOREIGN KEY (`subcategoria_id`) REFERENCES `categorias` (`categoria_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_comuna` FOREIGN KEY (`comuna_id`) REFERENCES `comunas` (`comuna_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_region` FOREIGN KEY (`region_id`) REFERENCES `regiones` (`region_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
