class ProductModal {
  // constructor
  constructor() {
    console.log("ready");
    this.modal = document.querySelector(".container-other_products");
    this.addMainProductToCart = document.querySelectorAll(
      ".add_main_product_to_cart"
    );
    this.allMainProducts = document.querySelectorAll(".single_main_product");
    this.otherProductButton = document.querySelectorAll(".product_button");
    this.currentOtherProductImage;
    this.closeProductButton = document.querySelector(".close_product_button");
    this.closeCartButton = document.querySelector(".close_cart_button");
    this.allImages = document.querySelectorAll(".img-single");
    this.allOtherProducts = document.querySelectorAll(".single_other_product");
    this.cartItems = [];
    this.cartModal = document.querySelector(".container-cart");
    this.cartList = document.querySelector(".list-container");
    this.cartButton = document.querySelector(".cart_button");
    this.addOtherProductToCart = document.querySelectorAll(
      ".add_other_product_to_cart"
    );

    this.events();
  }

  // events
  events() {
    console.log("in events");

    // adds a click event to every product button to open the modal
    this.otherProductButton.forEach((e) =>
      e.addEventListener("click", (e) => this.clickProduct(e))
    );

    // adds a click event to close the product modal
    this.closeProductButton.addEventListener("click", (e) =>
      this.clickProduct(e)
    );

    // adds a click event to OPEN the cart modal
    this.cartButton.addEventListener("click", (e) => this.clickCart(e));

    // adds a click event to CLOSE the cart modal
    this.closeCartButton.addEventListener("click", (e) => this.clickCart(e));

    // adds a click event to add an other product to the cart

    this.addOtherProductToCart.forEach((e, i) => {
      e.addEventListener("click", (e) => {
        e.target.id = i;
        this.add_other_product_to_cart(e);
      });
    });

    this.addMainProductToCart.forEach((e, i) => {
      e.addEventListener("click", (e) => {
        e.target.id = i;
        this.add_main_product_to_cart(e);
      });
    });
  }

  clickProduct(e) {
    console.log("in clickProductHandler ", e.target.id);

    // checks if produt modal is already shown and then removes it, and if not it shows the product modal
    if (this.modal.classList.contains("show-other_products_modal")) {
      this.cartButton.disabled = false;
      this.modal.classList.remove("show-other_products_modal");
      this.otherProductButton.forEach((e) => (e.disabled = false));
      document.body.style.backgroundColor = "rgba(255, 255, 255, 1)";
    } else {
      this.cartButton.disabled = true;
      this.modal.classList.add("show-other_products_modal");
      this.otherProductButton.forEach((e) => (e.disabled = true));
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      this.currentOtherProductImage = e.target.id;
    }
  }

  clickCart(e) {
    console.log("in clickCartHandler ", e.target.id);

    // checks if cart is already shown and then removes it, and if not it shows the cart
    if (this.cartModal.classList.contains("show-cart")) {
      this.cartButton.disabled = false;
      this.cartModal.classList.remove("show-cart");
      this.otherProductButton.forEach((e) => (e.disabled = false));
      document.body.style.backgroundColor = "rgba(255, 255, 255, 1)";
    } else {
      this.cartButton.disabled = true;
      this.cartModal.classList.add("show-cart");
      this.otherProductButton.forEach((e) => (e.disabled = true));
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }
  }

  // add a main product to the cart

  add_main_product_to_cart(e) {
    // check if element already exists and remove it

    let tempTotal = document.getElementById("temp");
    if (tempTotal) {
      tempTotal.remove();
    }

    let item = document.createElement("li");
    let product = document.createElement("span");
    product.innerText = this.allMainProducts[e.target.id].textContent;

    item.append(product);
    this.cartList.append(item);

    let cartItem = this.allMainProducts[e.target.id].textContent.split(": ");

    cartItem = cartItem[1].split("R");

    console.log(cartItem);

    this.cartItems.push(Number(cartItem[1]));

    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current, 0);
    totalDiv.innerText = `${total}`;
    totalDiv.id = "temp";
    this.cartModal.append(totalDiv);
  }

  // add an other product to the cart

  add_other_product_to_cart(e) {
    console.log("added ");
    console.log(e.target.id);

    // check if element already exists and remove it

    let tempTotal = document.getElementById("temp");
    if (tempTotal) {
      tempTotal.remove();
    }

    // create elements
    let item = document.createElement("li");
    let image = document.createElement("img");
    image.src = `${this.allImages[this.currentOtherProductImage].src}`;
    let product = document.createElement("span");
    product.innerText = this.allOtherProducts[e.target.id].textContent;

    // append elements to cart
    item.append(image);
    item.append(product);
    this.cartList.append(item);

    let cartItem = this.allOtherProducts[e.target.id].textContent.split(" ");
    cartItem = cartItem[1].split("R");
    this.cartItems.push(Number(cartItem[1]));

    // total div to keep track of cart total
    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current, 0);
    totalDiv.innerText = `${total}`;
    totalDiv.id = "temp";
    this.cartModal.append(totalDiv);
    console.log(totalDiv);
    console.log(this.cartItems);
  }

  // methods
}

export default ProductModal;
