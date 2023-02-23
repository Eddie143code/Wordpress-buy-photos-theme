<?php
    get_header(); 
?>
<section id="photo-page" class="section_photos gallery-photo">


    <aside class="container-cart_button">
        <button  class="cart_button cart-image">

        </button>
    </aside>

    <article class="container-cart">
        <div style="text-align: left"><button class="close_cart_button">X</button></div>

        <ul class="list-container"></ul>
        <button class="payout_button">Payout</button>    
    </article>

    <article class="payment_modal">
        <form class="payment-form" action="/photos-input" method="post">
            <div class="flex-container">
                <div class="flex-item_1"><span>Edit payment method</span></div>
                <div class="flex-item_2"><button type="button" class="close_payment_form flex-button">X</button></div>
            </div>

            <div><label for="card-holder-input">Card Holder</label></div>
            <div><input type="text" name="card-holder-input"></div>

            <div><label for="card-number">Credit/debit card number</label></div>
            <div><input type="text" name="card-number"></div>
            
            <div class="flex-form">
                <div><label class="date-cvc" for="expiration-date">Expiration month and year</label><input type="text" name="expiration-date"> </div>
                <div><label class="date-cvc" for="CVC">CVC</label><input type="text" name="CVC"></div>
            </div>
            


            <input type="hidden" name="merchant_id" value="">
            <input type="hidden" name="merchant_key" value="">
            <input type="hidden" name="amount" value="">
            <input type="hidden" name="item_name" value="Test Product">
            <input class="submit_payment_form" type="submit">
        </form>
    </article>

    <article class="container-main_products">
        <div class="main_products">
<?php


if($_POST){

    global $wpdb;
    $query = $wpdb->prepare("SELECT * FROM {$wpdb->prefix}fbv WHERE NAME = '{$_POST['foldername']}'");
    $folders = $wpdb->get_results($query);

    if($folders) {

            //fetch and show main products available


            $mainProducts = new WP_Query(array(
                'post_type' => 'Main Products',
                'posts_per_page' => -1,
                ));

            

                while ($mainProducts->have_posts()) {

                    $mainProducts->the_post(); ?>
                    
                    <div class="container-single_main_product"><span class="single_main_product"><?php echo get_the_title(); ?>: R<?php echo get_field('Price'); ?>  </span> <button class="add_main_product_to_cart">add</button></div>
                    
                    <?php
                };

                ?>
        </div>
    </article>
    <article class="container-other_products ">
                <button class="close_product_button">X</button>
            <?php

            //fetch and show other products available

            $otherProducts = new WP_Query(array(
            'post_type' => 'Other Products',
            'posts_per_page' => -1,
            ));
            $id = 0;
            while($otherProducts->have_posts()){
                 
                $otherProducts->the_post(); ?>
                    
                    <div class="container-single_other_product"> <span class="single_other_product"><?php echo get_the_title(); ?>: R<?php echo get_field('Price'); ?></span> <button class="add_other_product_to_cart">add</button></div>

                <?php
               $id = $id++;

            }

            ?>

    </article>
    <article class="container-photos">
            <div class="photos">



                <?php

            //fetch and display images

            $id = $folders[0]->id;

            $query = $wpdb->prepare("SELECT attachment_id FROM {$wpdb->prefix}fbv_attachment_folder where folder_id = {$id}");

            $all_folders_ids = $wpdb->get_results($query);

            $image_args = array(
                    'post_type' => 'attachment',
                    'post_status' => 'inherit',
                    'posts_per_page' => -1,
                    'orderby' => 'rand',
                );

            $all_images = new WP_Query($image_args);

            $sizeofarray = sizeof($all_folders_ids);

            for ($i = 0; $i < $sizeofarray; $i++) {

                $post = wp_get_attachment_image_src($all_folders_ids[$i]->attachment_id);
                                
                ?>
                    <span  class="photos-single"> <img id= '<?php $i ?>' class="img-single" alt="1" src=<?php echo $post[0] ?>  /> <button id=<?php echo $i ?> class="product_button">product</button> </span>
                <?php
            }
    }
    ?>
            </div>
    </article>

    <article>

    </article>
    
    <?php
}

else {
    ?>

        <div>No Photos</div>
    
    <?php
}






?>

</section>
 

<?php
  get_footer();
?>



