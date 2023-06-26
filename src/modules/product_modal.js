import axios from "axios";
class ProductModal {
  constructor() {
    this.modal = document.querySelector(".container-other_products");
    this.allMainProducts = document.querySelectorAll(".single_main_product");
    this.allOtherProducts = document.querySelectorAll(".single_other_product");
    this.allImages = document.querySelectorAll(".img-single");
    this.cartItems = [];
    this.cartModal = document.querySelector(".container-cart");
    this.cartList = document.querySelector(".list-container");
    this.cartButton = document.querySelector(".cart_button");
    this.paymentModal = document.querySelector(".payment_modal");

    this.addEventListeners();
  }

  addEventListeners() {
    document.querySelectorAll(".product_button").forEach((button) => {
      button.addEventListener("click", () => this.toggleProductModal());
    });

    document
      .querySelector(".close_product_button")
      .addEventListener("click", () => {
        this.toggleProductModal();
      });

    this.cartButton.addEventListener("click", () => {
      this.toggleCartModal();
    });

    document
      .querySelector(".close_cart_button")
      .addEventListener("click", () => {
        this.toggleCartModal();
      });

    document
      .querySelectorAll(".add_other_product_to_cart")
      .forEach((button, index) => {
        button.addEventListener("click", () => {
          this.addProductToCart(
            this.allOtherProducts[index],
            this.allImages[index]
          );
        });
      });

    document
      .querySelectorAll(".add_main_product_to_cart")
      .forEach((button, index) => {
        button.addEventListener("click", () => {
          this.addProductToCart(this.allMainProducts[index]);
        });
      });

    document.querySelector(".payout_button").addEventListener("click", () => {
      this.paymentModal.classList.add("show_payment_modal");
    });

    document
      .querySelector(".close_payment_form")
      .addEventListener("click", () => {
        this.paymentModal.classList.remove("show_payment_modal");
      });

    document
      .querySelector(".submit_payment_form")
      .addEventListener("click", () => {
        this.postOrderToDB();
      });
  }

  toggleProductModal() {
    const isOpen = this.modal.classList.contains("show-other_products_modal");
    this.cartButton.disabled = !isOpen;
    this.modal.classList.toggle("show-other_products_modal");
  }

  toggleCartModal() {
    const isOpen = this.cartModal.classList.contains("show-cart");
    this.cartButton.disabled = !isOpen;
    this.cartModal.classList.toggle("show-cart");
    /*    this.allImages.forEach((image) => {
      image.style.opacity = isOpen ? 1 : 0.5;
    }); */
  }

  addProductToCart(product, image = null) {
    const item = document.createElement("li");
    if (image) {
      const imageElement = document.createElement("img");
      imageElement.src = image.src;
      item.appendChild(imageElement);
    }
    const productText = document.createElement("span");
    productText.textContent = product.textContent;
    item.appendChild(productText);

    this.cartList.appendChild(item);

    const cartItem = product.textContent.split(": ")[1].split("R");
    const itemId = this.cartItems.length + 1;

    this.cartItems.push({
      id: itemId,
      item: Number(cartItem[1]),
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
      this.deleteCartItem(item);
    });
    deleteButton.id = itemId;
    item.appendChild(deleteButton);

    this.updateCartTotal();
  }

  deleteCartItem(item) {
    const itemId = item.querySelector("button").id;
    console.log(itemId);
    this.cartItems = this.cartItems.filter((i) => {
      return i.id != itemId;
    });
    item.remove();
    this.updateCartTotal();
  }

  updateCartTotal() {
    if (this.cartTotalElement) {
      this.cartTotalElement.remove();
    }

    const total = this.cartItems.reduce(
      (sum, current) => sum + current.item,
      0
    );

    this.cartTotalElement = document.createElement("div");
    this.cartTotalElement.innerText = `TOTAL: R${total.toFixed(2)}`;
    this.cartTotalElement.id = "cart-total";
    this.cartModal.appendChild(this.cartTotalElement);
  }

  postOrderToDB() {
    const date = new Date();
    const ourNewPost = {
      title: date,
      content: this.cartModal.innerHTML,
      status: "draft",
    };

    axios
      .post(websiteData.root_url + "/wp-json/wp/v2/orders", ourNewPost)
      .then((response) => {
        console.log("Successful post");
      })
      .catch((error) => {
        console.log("Failed to post");
      });
  }
}

export default ProductModal;
