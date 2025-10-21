<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'bitsenbyte_1_wp_imker_gs2x6' );

/** Database username */
define( 'DB_USER', 'bitsenbyte_1_bitse_wp_imker' );

/** Database password */
define( 'DB_PASSWORD', 'li5_fC690' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '/0F169z668a#gDiEs6Y|71-vBMM8DyCbnO~2F55n:#E6[KnM#@eWx/x*F|l8iP4Q');
define('SECURE_AUTH_KEY', ')Tb5aM5uc+S|M5z20hqv#NdZk!8t6)~[5PuT78/e77q1jR1Sp(m7Lr1lG*4/K676');
define('LOGGED_IN_KEY', '4k1EAd6N1@akHWe~Y;!7[F)x~StF49Cqwb7_0Vm])gbx-_BHH8sd26Z-))pYO#Lf');
define('NONCE_KEY', 'B6(#6x|cvdm4xB;X8[8ze@gabNee5144oi[DPfxIL%R((0eLLM;-iuv(6ioW+CNG');
define('AUTH_SALT', 'z]%b52!dw*|z]9o|C675Me8tSX3s3/+!]1ghKRtC0Ye96:p]38/N&1xb*8Oac9w7');
define('SECURE_AUTH_SALT', 'KBm27%+4lX43:;c&M#C[KlXBBG(1ARr*g5l/~d@@8N4I-)oE71D2*|9Fme3V8zT9');
define('LOGGED_IN_SALT', 'De#v(0kQRo[]M0e))-/aTR7-N8j|3T30P_!6Sm~3Q%&0/6TQ[6~(*A70+344#2J!');
define('NONCE_SALT', 'B7/Xq8y%jUChRq7[]Js9j@:37VL(mv25NoUc-/9871**id(t0boffdP~u%CK2;]a');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'dGinXuHMb_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

include_once(plugin_dir_path(__FILE__) . 'zip-code-plugin/api.php');