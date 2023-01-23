<?php get_header(); ?>


<section class="section hero-photo">
  <div class="heading">
    <h1>Input your code:</h1>
    <form class="photos_input_form" action='http://esteproject.local/photos-gallery/' method='POST'>
      <br >
      <input class="photo-input" autofocus type="text" name="foldername"/>
      <input class="submit" type="submit" value="Submit">  
    </form>
  </div>
</section>


<?php get_footer(); ?>