<?php
/**
 * Plugin Name: Ajax Polka
 * Description: Ajax добавление книг в библиотечку через localstorage
 * Author: ProvokatorDark
 */
add_action('wp_ajax_polka', 'say_hello');
add_action('wp_ajax_nopriv_polka', 'say_hello');
function say_hello()
{
    if (empty($_GET['name'])) {
        echo "Здесь будут хранится ссылки на слушаемые вами книги, после того, как вы их добавите на полку";
        wp_die();
    } else {
        $arra = ($_GET['name']);
        $str = "";
        foreach($arra as $element):
            $link = get_home_url( )."/?p=" . $element;
            $img = get_the_post_thumbnail_url($element);
            if (!$img)($img=get_home_url( ).'/wp-content/uploads/cover-polka.jpg');
            $post_id = get_post($element, ARRAY_A);
            $title = $post_id['post_title'];
            $str.="<div class=\"block\" id=$element>
                    <div class='top'>
                    <a href=$link><img  src=$img width=\"160\" height=\"160\"></a>
                    <p>$title</p>
                    </div>
                    <div class=\"remove\">
                        <button class='polkabutton'>Удалить</button>
                    </div>
                    </div>";
        endforeach;
        echo $str;}
    wp_die();
}

add_action('wp_enqueue_scripts', 'my_assets',2);
function my_assets()
{
    wp_enqueue_script('custom', plugins_url('polka.js', __FILE__), array('jquery'));
    wp_enqueue_style( 'main', plugins_url( 'polka.css', __FILE__ ) );
    wp_localize_script('custom', 'myPlugin', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'name' => wp_get_current_user()->display_name
    ));
}
