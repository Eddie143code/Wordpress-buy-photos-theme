import axios from "axios";

class ProductModal {
  // constructor
  constructor() {
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

    this.payoutButton = document.querySelector(".payout_button");
    this.paymentModal = document.querySelector(".payment_modal");
    this.closePaymentModal = document.querySelector(".close_payment_form");
    this.submitPaymentButton = document.querySelector(".submit_payment_form");

    axios.defaults.headers.common["X-WP-Nonce"] = websiteData.nonce;

    this.events();
  }

  // events
  events() {
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

    // add a click event to open the payment modal
    this.payoutButton.addEventListener("click", () =>
      this.paymentModal.classList.add("show_payment_modal")
    );

    // add a click event to close the payment modal
    this.closePaymentModal.addEventListener("click", () =>
      this.paymentModal.classList.remove("show_payment_modal")
    );

    // add a click event to submit the payment form
    this.submitPaymentButton.addEventListener("click", () => {
      this.post_order_to_db();
    });
  }

  clickProduct(e) {
    // checks if produt modal is already shown and then removes it, and if not it shows the product modal
    if (this.modal.classList.contains("show-other_products_modal")) {
      this.cartButton.disabled = false;
      this.modal.classList.remove("show-other_products_modal");
      this.otherProductButton.forEach((e) => (e.disabled = false));
      this.addMainProductToCart.forEach((e) => (e.disabled = false));
      document.body.style.backgroundColor = "rgba(224, 224, 224, 1)";
      this.allImages.forEach((e) => (e.style.opacity = 1));
    } else {
      this.cartButton.disabled = true;
      this.modal.classList.add("show-other_products_modal");
      this.otherProductButton.forEach((e) => (e.disabled = true));
      this.addMainProductToCart.forEach((e) => (e.disabled = true));
      document.body.style.backgroundColor = "rgba(224, 224, 224, 0.5)";

      this.allImages.forEach((e) => (e.style.opacity = 0.5));
      this.currentOtherProductImage = e.target.id;
    }
  }

  clickCart(e) {
    console.log(this.cartModal);
    // checks if cart is already shown and then removes it, and if not it shows the cart
    if (this.cartModal.classList.contains("show-cart")) {
      this.cartButton.disabled = false;
      this.cartModal.classList.remove("show-cart");
      this.otherProductButton.forEach((e) => (e.disabled = false));
      document.body.style.backgroundColor = "rgba(224, 224, 224, 1)";
      this.allImages.forEach((e) => (e.style.opacity = 1));
    } else {
      this.cartButton.disabled = true;
      this.cartModal.classList.add("show-cart");
      this.otherProductButton.forEach((e) => (e.disabled = true));
      document.body.style.backgroundColor = "rgba(224, 224, 224, 0.5)";
      this.allImages.forEach((e) => (e.style.opacity = 0.5));
    }
  }

  // add a main product to the cart

  add_main_product_to_cart(e) {
    // check if element already exists and remove it

    let tempTotal = document.getElementById("cart-total");
    if (tempTotal) {
      tempTotal.remove();
    }

    let item = document.createElement("li");
    let product = document.createElement("span");
    product.innerText = this.allMainProducts[e.target.id].textContent;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";

    let cartItem = this.allMainProducts[e.target.id].textContent.split(": ");

    cartItem = cartItem[1].split("R");

    if (this.cartItems.length === 0) {
      this.cartItems.push({
        id: 1,
        item: Number(cartItem[1]),
      });
      deleteButton.id = 1;
    } else {
      this.cartItems.push({
        id: Number(this.cartItems.length) + 1,
        item: Number(cartItem[1]),
      });
      deleteButton.id = Number(this.cartItems.length) + 1;
    }

    item.append(product);
    item.append(deleteButton);
    this.cartList.append(item);

    console.log(this.cartItems);

    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current.item, 0);
    totalDiv.innerText = `TOTAL: R${total}`;
    totalDiv.id = "cart-total";
    this.cartModal.append(totalDiv);
  }

  // add an other product to the cart

  add_other_product_to_cart(e) {
    // check if element already exists and remove it

    let tempTotal = document.getElementById("cart-total");
    if (tempTotal) {
      tempTotal.remove();
    }

    // create elements
    let item = document.createElement("li");
    let image = document.createElement("img");
    image.src = `${this.allImages[this.currentOtherProductImage].src}`;
    let product = document.createElement("span");
    product.innerText = this.allOtherProducts[e.target.id].textContent;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";

    let cartItem = this.allOtherProducts[e.target.id].textContent.split(" ");
    cartItem = cartItem[1].split("R");

    if (this.cartItems.length == 0) {
      deleteButton.id = 1;
      this.cartItems.push({
        id: 1,
        item: Number(cartItem[1]),
      });
    } else {
      console.log(Number(this.cartItems.length) + 1);
      deleteButton.id = Number(this.cartItems.length) + 1;
      this.cartItems.push({
        id: Number(this.cartItems.length) + 1,
        item: Number(cartItem[1]),
      });
    }
    deleteButton.addEventListener("click", (e) => this.delete_cart_item(e));
    console.log(deleteButton);

    // append elements to cart
    item.append(image);
    item.append(product);
    item.append(deleteButton);
    this.cartList.append(item);

    console.log(this.cartItems);

    // total div to keep track of cart total
    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current.item, 0);
    totalDiv.innerText = `TOTAL: R${total}`;
    totalDiv.id = "cart-total";
    this.cartModal.append(totalDiv);
  }

  delete_cart_item(e) {
    console.log("delete button clicked. id: ", e.target.id);

    let tempTotal = document.querySelector("#cart-total");
    tempTotal.remove();

    let itemList = document.querySelector(".list-container").children;

    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].children[2].id == e.target.id) {
        this.cartItems = this.cartItems.filter((item) => {
          return item.id != e.target.id;
        });
        let element = document.getElementById(`${e.target.id}`);
        element.parentElement.remove();
      }
    }
    console.log(this.cartItems);

    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current.item, 0);
    totalDiv.innerHTML = `TOTAL: R${total}`;
    totalDiv.id = "cart-total";
    this.cartModal.append(totalDiv);
  }

  post_order_to_db(e) {
    const date = new Date();
    let ourNewPost = {
      title: date,
      content: document.querySelector(".container-cart").innerHTML,
      status: "draft",
    };

    const post = async () => {
      try {
        const response = await axios.post(
          websiteData.root_url + "/wp-json/wp/v2/orders",
          ourNewPost
        );
        console.log("successful post");
      } catch (error) {
        console.log("failed to post");
      }
    };

    post();
  }

  // methods
}

export default ProductModal;
