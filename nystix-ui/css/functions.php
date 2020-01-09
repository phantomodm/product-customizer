<?php
/**
 * Loads parent and child theme scripts.
 */
function shoptimizer_child_enqueue_scripts() {
	$parent_style    = 'shoptimizer-style';
	$parent_base_dir = 'shoptimizer';
	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css', array(), wp_get_theme( $parent_base_dir ) ? wp_get_theme( $parent_base_dir )->get( 'Version' ) : '' );
    wp_enqueue_style( 'shoptimizer-child-style', get_stylesheet_directory_uri() . '/style.css', array( $parent_style ), wp_get_theme()->get('Version') );
    
}

add_action( 'wp_enqueue_scripts', 'shoptimizer_child_enqueue_scripts' );


/**
 * Change the continue shopping link to point to the store homepage as outlined here:
 * https://app.asana.com/0/1130137900102161/1130137900102173/f
 * @return string
 */
function ninep__change_continue_shopping() {
    return wc_get_page_permalink( 'shop' );
}
add_filter( 'woocommerce_continue_shopping_redirect', 'ninep__change_continue_shopping' );




/**
 * Removes the default order from the sort menu
 * https://app.asana.com/0/1130137900102161/1130137900102165/f
 * @param $options
 * @return mixed
 */
function ninep__remove_sorting_option_woocommerce_shop( $options ) {
    unset( $options['menu_order'] );
    return $options;
}
add_filter( 'woocommerce_catalog_orderby', 'ninep__remove_sorting_option_woocommerce_shop' );


/**
 * Implements secure payments image
 * https://app.asana.com/0/0/1130137900102222/f
 * https://app.asana.com/0/1130137900102161/1130137900102171/f
 */
function ninep__trust_place_order() {
    echo '<img src="https://media.9positions.com/wp-content/uploads/2019/07/28212745/powered_by_stripe%402x.png" style="margin: 1em auto">';
}
add_action( 'woocommerce_review_order_after_submit', 'ninep__trust_place_order', 10 );

/**
 * Disable Tracking if Order Failed @ Thank You Page
 * https://app.asana.com/0/1130137900102161/1130137900102168/f
 * @param $order_id
 */
function ninep__tracking_exclude_failed_orders( $order_id ) {
    global $wp;
    // ONLY RUN ON THANK YOU PAGE
    if ( ! is_wc_endpoint_url( 'order-received' ) ) return;
    // GET ORDER ID FROM URL
    $order_id = absint( $wp->query_vars['order-received'] );
    $order = wc_get_order( $order_id );
    if ( $order->has_status( 'failed' ) ) {
        // DISABLE ANY FUNCTION HOOKED TO "woocommerce_thankyou"
        remove_all_actions( 'woocommerce_thankyou' );
    }
}
add_action( 'wp_head', 'ninep__tracking_exclude_failed_orders' );

/**
 * Implements the checkout and cart on same page
 * https://app.asana.com/0/1130137900102161/1130137900102169/f
 */
function ninep__cart_on_checkout_page_only() {
    if ( is_wc_endpoint_url( 'order-received' ) ) return;
    echo do_shortcode('[woocommerce_cart]');
}

add_action( 'woocommerce_before_checkout_form', 'ninep__cart_on_checkout_page_only', 5 );
add_filter( 'woocommerce_widget_cart_is_hidden', '__return_true' );

/**
 * @snippet       Change "Add to Cart" Button Label if Product Already @ Cart
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @source        https://businessbloomer.com/?p=73974
 * @author        Rodolfo Melogli
 * @compatible    WC 3.5.4
 * @donate $9     https://businessbloomer.com/bloomer-armada/
 */

// Part 1
// Edit Single Product Page Add to Cart

add_filter( 'woocommerce_product_single_add_to_cart_text', 'ninep_custom_add_cart_button_single_product' );

function ninep_custom_add_cart_button_single_product( $label ) {

    foreach( WC()->cart->get_cart() as $cart_item_key => $values ) {
        $product = $values['data'];
        if( get_the_ID() == $product->get_id() ) {
            $label = __('Already in Cart. Add again?', 'woocommerce');
        }
    }

    return $label;

}

// Part 2
// Edit Loop Pages Add to Cart

add_filter( 'woocommerce_product_add_to_cart_text', 'ninep_custom_add_cart_button_loop', 99, 2 );

function ninep_custom_add_cart_button_loop( $label, $product ) {

    if ( $product->get_type() == 'simple' && $product->is_purchasable() && $product->is_in_stock() ) {

        foreach( WC()->cart->get_cart() as $cart_item_key => $values ) {
            $_product = $values['data'];
            if( get_the_ID() == $_product->get_id() ) {
                $label = __('Already in Cart. Add again?', 'woocommerce');
            }
        }

    }

    return $label;

}

function ninep__product_sold_count() {
    global $product;
    $units_sold = get_post_meta( $product->get_id(), 'total_sales', true );
    if ( $units_sold >= 10 ) echo '<p>' . sprintf( __( 'Units Sold: %s', 'woocommerce' ), $units_sold ) . '</p>';
}
add_action( 'woocommerce_single_product_summary', 'ninep__product_sold_count', 11 );

/**
 * @snippet       Edit Order Functionality @ WooCommerce My Account Page
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @sourcecode    https://businessbloomer.com/?p=91893
 * @author        Rodolfo Melogli
 * @compatible    WooCommerce 3.5.7
 * @donate $9     https://businessbloomer.com/bloomer-armada/
 */

// ----------------
// 1. Allow Order Again for Processing Status

add_filter( 'woocommerce_valid_order_statuses_for_order_again', 'ninep_order_again_statuses' );

function ninep_order_again_statuses( $statuses ) {
    $statuses[] = 'processing';
    return $statuses;
}

// ----------------
// 2. Add Order Actions @ My Account

add_filter( 'woocommerce_my_account_my_orders_actions', 'ninep_add_edit_order_my_account_orders_actions', 50, 2 );

function ninep_add_edit_order_my_account_orders_actions( $actions, $order ) {
    if ( $order->has_status( 'processing' ) ) {
        $actions['edit-order'] = array(
            'url'  => wp_nonce_url( add_query_arg( array( 'order_again' => $order->get_id(), 'edit_order' => $order->get_id() ) ), 'woocommerce-order_again' ),
            'name' => __( 'Edit Order', 'woocommerce' )
        );
    }
    return $actions;
}

// ----------------
// 3. Detect Edit Order Action and Store in Session

add_action( 'woocommerce_cart_loaded_from_session', 'ninep_detect_edit_order' );

function ninep_detect_edit_order( $cart ) {
    if ( isset( $_GET['edit_order'] ) ) WC()->session->set( 'edit_order', absint( $_GET['edit_order'] ) );
}

// ----------------
// 4. Display Cart Notice re: Edited Order

add_action( 'woocommerce_before_cart', 'ninep_show_me_session' );

function ninep_show_me_session() {
    if ( ! is_cart() ) return;
    $edited = WC()->session->get('edit_order');
    if ( ! empty( $edited ) ) {
        $order = new WC_Order( $edited );
        $credit = $order->get_total();
        wc_print_notice( 'A credit of ' . wc_price($credit) . ' has been applied to this new order. Feel free to add products to it or change other details such as delivery date.', 'notice' );
    }
}

// ----------------
// 5. Calculate New Total if Edited Order

add_action( 'woocommerce_cart_calculate_fees', 'ninep_use_edit_order_total', 20, 1 );

function ninep_use_edit_order_total( $cart ) {

    if ( is_admin() && ! defined( 'DOING_AJAX' ) ) return;

    $edited = WC()->session->get('edit_order');
    if ( ! empty( $edited ) ) {
        $order = new WC_Order( $edited );
        $credit = -1 * $order->get_total();
        $cart->add_fee( 'Credit', $credit );
    }

}

// ----------------
// 6. Save Order Action if New Order is Placed

add_action( 'woocommerce_checkout_update_order_meta', 'ninep_save_edit_order' );

function ninep_save_edit_order( $order_id ) {
    $edited = WC()->session->get('edit_order');
    if ( ! empty( $edited ) ) {
        // update this new order
        update_post_meta( $order_id, '_edit_order', $edited );
        $neworder = new WC_Order( $order_id );
        $oldorder_edit = get_edit_post_link( $edited );
        $neworder->add_order_note( 'Order placed after editing. Old order number: <a href="' . $oldorder_edit . '">' . $edited . '</a>' );
        // cancel previous order
        $oldorder = new WC_Order( $edited );
        $neworder_edit = get_edit_post_link( $order_id );
        $oldorder->update_status( 'cancelled', 'Order cancelled after editing. New order number: <a href="' . $neworder_edit . '">' . $order_id . '</a> -' );
    }
}

/**
 * @snippet       Add new textarea to Product Category Pages - WooCommerce
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @author        Rodolfo Melogli
 * @compatible    WooCommerce 3.6.3
 * @donate $9     https://businessbloomer.com/bloomer-armada/
 */

// ---------------
// 1. Display field on "Add new product category" admin page

add_action( 'product_cat_add_form_fields', 'ninep_wp_editor_add', 10, 2 );

function ninep_wp_editor_add() {
    ?>
    <div class="form-field">
        <label for="seconddesc"><?php echo __( 'Second Description', 'woocommerce' ); ?></label>

        <?php
        $settings = array(
            'textarea_name' => 'seconddesc',
            'quicktags' => array( 'buttons' => 'em,strong,link' ),
            'tinymce' => array(
                'theme_advanced_buttons1' => 'bold,italic,strikethrough,separator,bullist,numlist,separator,blockquote,separator,justifyleft,justifycenter,justifyright,separator,link,unlink,separator,undo,redo,separator',
                'theme_advanced_buttons2' => '',
            ),
            'editor_css' => '<style>#wp-excerpt-editor-container .wp-editor-area{height:175px; width:100%;}</style>',
        );

        wp_editor( '', 'seconddesc', $settings );
        ?>

        <p class="description"><?php echo __( 'This is the description that goes BELOW products on the category page', 'woocommerce' ); ?></p>
    </div>
    <?php
}

// ---------------
// 2. Display field on "Edit product category" admin page

add_action( 'product_cat_edit_form_fields', 'ninep_wp_editor_edit', 10, 2 );

function ninep_wp_editor_edit( $term ) {
    $second_desc = htmlspecialchars_decode( get_woocommerce_term_meta( $term->term_id, 'seconddesc', true ) );
    ?>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="second-desc"><?php echo __( 'Second Description', 'woocommerce' ); ?></label></th>
        <td>
            <?php

            $settings = array(
                'textarea_name' => 'seconddesc',
                'quicktags' => array( 'buttons' => 'em,strong,link' ),
                'tinymce' => array(
                    'theme_advanced_buttons1' => 'bold,italic,strikethrough,separator,bullist,numlist,separator,blockquote,separator,justifyleft,justifycenter,justifyright,separator,link,unlink,separator,undo,redo,separator',
                    'theme_advanced_buttons2' => '',
                ),
                'editor_css' => '<style>#wp-excerpt-editor-container .wp-editor-area{height:175px; width:100%;}</style>',
            );

            wp_editor( $second_desc, 'seconddesc', $settings );
            ?>

            <p class="description"><?php echo __( 'This is the description that goes BELOW products on the category page', 'woocommerce' ); ?></p>
        </td>
    </tr>
    <?php
}

// ---------------
// 3. Save field @ admin page

add_action( 'edit_term', 'ninep_save_wp_editor', 10, 3 );
add_action( 'created_term', 'ninep_save_wp_editor', 10, 3 );

function ninep_save_wp_editor( $term_id, $tt_id = '', $taxonomy = '' ) {
    if ( isset( $_POST['seconddesc'] ) && 'product_cat' === $taxonomy ) {
        update_woocommerce_term_meta( $term_id, 'seconddesc', esc_attr( $_POST['seconddesc'] ) );
    }
}

// ---------------
// 4. Display field under products @ Product Category pages

add_action( 'woocommerce_after_shop_loop', 'ninep_display_wp_editor_content', 5 );

function ninep_display_wp_editor_content() {
    if ( is_product_taxonomy() ) {
        $term = get_queried_object();
        if ( $term && ! empty( get_woocommerce_term_meta( $term->term_id, 'seconddesc', true ) ) ) {
            echo '<p class="term-description">' . wc_format_content( htmlspecialchars_decode( get_woocommerce_term_meta( $term->term_id, 'seconddesc', true ) ) ) . '</p>';
        }
    }
}

// function ninep_remove_search_branding(){
//     if ( class_exists( 'WooCommerce' ) ) {
//         remove_action('shoptimizer-header','shoptimizer_product_search',99);
//     }
// }

// add_action( 'wp_enqueue_scripts','ninep_remove_search_branding' );

/**
 * Minimal checkout template - remove several hooks.
 */
function ninep_remove_search_branding() {

		if ( class_exists( 'WooCommerce' ) ) {
			
            // remove_action( 'shoptimizer_header', 'shoptimizer_primary_navigation', 99 );
            // remove_action( 'shoptimizer_header', 'shoptimizer_secondary_navigation', 30 );

            // remove_action( 'shoptimizer_navigation', 'shoptimizer_primary_navigation_wrapper', 42 );
            // remove_action( 'shoptimizer_navigation', 'shoptimizer_header_cart', 60 );
            // remove_action( 'shoptimizer_navigation', 'shoptimizer_primary_navigation_wrapper_close', 68 );
            
            // remove_action( 'shoptimizer_header', 'shoptimizer_header_cart', 50 );
            // remove_action( 'shoptimizer_header', 'shoptimizer_header_cart', 60 );
            remove_action( 'shoptimizer_header', 'shoptimizer_product_search', 25 );
            remove_action( 'shoptimizer_header', 'shoptimizer_site_branding', 20 );
            // remove_action( 'shoptimizer_page_start', 'shoptimizer_page_header', 10 );
            // remove_action( 'shoptimizer_before_footer', 'shoptimizer_below_content', 10 );
            // remove_action( 'shoptimizer_footer', 'shoptimizer_footer_widgets', 20 );
            // remove_action( 'shoptimizer_footer', 'shoptimizer_footer_copyright', 30 );

            // if ( 'header-4' === $shoptimizer_header_layout ) {
            // 	remove_action( 'shoptimizer_navigation', 'shoptimizer_search_modal', 50 );
            // }
        
		}

}
add_action( 'wp_enqueue_scripts', 'ninep_remove_search_branding' );

/**
 * Move site-logo to navigation bar
 */
function ninep_move_site_branding(){
    if( class_exists( 'WooCommerce' ) ){
        add_action('shoptimizer_navigation', 'shoptimizer_site_branding',45);
    }

}
add_action( 'wp_enqueue_scripts', 'ninep_move_site_branding');



/**
 * @snippet Setup NYStix Quick Order Environment
*/
//----------
// 1. Add Bootstap and apply flexbox to product container

function ninep_add_base_ref(){
    if (is_single('10686')){
        ?>
        <base href="/wp-content/themes/ninep-theme/assets/ninep-glove-customizer/"
        <?php
        // wp_enqueue_style( 'ninep_glove_app', get_stylesheet_directory_uri().'/assets/css/ninep-full-custom-wp.css' );
        // wp_enqueue_style( 'google_fonts','https://fonts.googleapis.com/css?family=Roboto:300,400,500' );
        // wp_enqueue_style( 'google_icons','https://fonts.googleapis.com/icon?family=Material+Icons' );
        // wp_enqueue_style( 'ninep', get_stylesheet_directory_uri().'/assets/ninep-glove-customizer/assets/css/styles-ninep.css' );
        // wp_enqueue_script('ninep_web_runtime',get_stylesheet_directory_uri().'/assets/ninep-glove-customizer/assets/js/ninep-customizer.js',array(),'',true);
    }
}
add_action('wp_head', 'ninep_add_base_ref',1);


//------------
// 2. Remove the default product photos container
add_action( 'wp','ninep_remove_product_photo', 99);
function ninep_remove_product_photo() {

    if ( is_single('10686') ) {
        remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
    }elseif (is_product() && has_term('Quick Custom Gloves','product_cat')){
        remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
        add_action('woocommerce_before_single_product_summary','ninep_add_svg_container_quick_order', 25);
    }
}

add_action('woocommerce_before_single_product_summary','ninep_add_glove_wizard_web_component',25);
function ninep_add_glove_wizard_web_component(){
    global $product;    
    
    if (is_single('10686')){
    ?>
        <div style="width:60%; margin-right:10px"> 
            <
            <h1 class="product_title entry-title">
                <?php echo $product->get_name();  ?> 
            </h1> 
            <ninep-glove-customizer></ninep-glove-customizer>
        </div>

    <?php
    }   
}

add_action('wp_enqueue_scripts','ninep_add_glove_tool_config',100);
function ninep_add_glove_tool_config(){
    if (is_single('10686')){
        
        wp_enqueue_style( 'ninep_glove_app', get_stylesheet_directory_uri().'/assets/css/ninep-full-custom-wp.css' );
        wp_enqueue_style( 'google_fonts','https://fonts.googleapis.com/css?family=Roboto:300,400,500' );
        wp_enqueue_style( 'google_icons','https://fonts.googleapis.com/icon?family=Material+Icons' );
        wp_enqueue_style( 'ninep', get_stylesheet_directory_uri().'/assets/ninep-glove-customizer/assets/css/styles-ninep.css' );
        wp_enqueue_script('ninep_web_runtime',get_stylesheet_directory_uri().'/assets/ninep-glove-customizer/assets/js/ninep-customizer.js',array(),'',true);
        
    }

}


function ninep_add_svg_container_quick_order(){
    global $product;
    if ( is_product() && has_term( 'Quick Custom Gloves', 'product_cat' ) ){
        add_action('wp_enqueue_scripts','ninep_add_bootstrap_qo',100);        
        ?>
                
        <div id="quickCustomGloves" class="carousel slide" data-ride="carousel" data-touch=true>
            <ol class="carousel-indicators">
                <li data-target="#quickCustomsIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#quickCustomsIndicators" data-slide-to="1"></li>
                <li data-target="#quickCustomsIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <svg  class="d-block w-100" alt="Glove Back View"></svg>
            </div>
            <div class="carousel-item">
                <svg  class="d-block w-100" alt="Glove Inside View"></svg>
            </div>
            <div class="carousel-item">
                <svg  class="d-block w-100" alt="Glove Side View"></svg>
            </div>
            </div>
            <a class="carousel-control-prev" href="#quickCustomsControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#quickCustomsControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
        <ninep-quick-order 
        profile="<?php echo $product->get_attribute('quick-order-profile');  ?>" 
        glove="<?php echo $product->get_attribute('glove-type');  ?>">
        </ninep-quick-order>
        <?php
    }

}

add_action('wp_enqueue_scripts','ninep_add_bootstrap_qo',100);
function ninep_add_bootstrap_qo(){
    wp_enqueue_style( 'ninep_glove_app', get_stylesheet_directory_uri().'/assets/css/ninep-quick-order.css' );
    wp_enqueue_style( 'bootstrap_min_css', get_stylesheet_directory_uri().'/assets/css/bootstrap.min.css' );    
    //Registering Bootstrap Script
    wp_enqueue_script( 'bootstrap_min', get_stylesheet_directory_uri() . '/assets/js/bootstrap.min.js', array('jquery'), '', true );
    //wp_enqueue_script( 'bootstrap_min', get_stylesheet_directory_uri() . '/assets/ninep-quick-order/assets/js/ninep-quick-order.js', array('jquery'), '', true );
}

// add_action( 'woocommerce_product_options_pricing', 'ninep_add_custom_field_to_products' );      
 
// function ninep_add_custom_field_to_products() {          
// 	woocommerce_wp_text_input( array( 
// 	'id' => 'glove_type_description', 
// 	'class' => 'short', 
// 	'label' => __( 'Glove Type', 'woocommerce' ),
// 	'data_type' => 'text') 
// 	);      
// }
// add_action('ninep_save_custom_field','ninep_save_custom_field');

// function ninep_save_custom_field($product_id){
//     global $pagenow, $typenow;
// 	if ( 'post.php' !== $pagenow || 'product' !== $typenow ) return;
// 	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
// 	if ( isset( $_POST['glove_type_description'] ) ) {
// 	if ( $_POST['glove_type_description'] )
// 	   update_post_meta( $product_id, 'glove_type_description', $_POST['glove_type_description'] );
// 	} else delete_post_meta( $product_id, 'glove_type_description' );
// }




