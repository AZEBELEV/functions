
// Constructor for object Product

function Product(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.sizes = sizes || [];
  this.activeSize = activeSize;
  this.quantity = quantity;
  this.date = new Date(date);
  this.images = images || [];
  this.reviews = reviews || [];

  //Getters and setters for each property

  this.setID = (ID) => this.ID = ID;
  this.getID = () => this.ID;
  this.setName = (name) => this.name = name;
  this.getName = () => this.name;
  this.setDescription = (description) => this.description = description;
  this.getDescription = () => this.description;
  this.setPrice = (price) => this.price = price;
  this.getPrice = () => this.price;
  this.setBrand = (brand) => this.brand = brand;
  this.getBrand = () => this.brand;
  this.setSizes = (sizes) => this.sizes = sizes;
  this.getSizes = () => this.sizes;
  this.setActiveSize = (activeSize) => this.activeSize = activeSize;
  this.getActiveSize = () => this.activeSize;
  this.setQuantity = (quantity) => this.quantity = quantity;
  this.getQuantity = () => this.quantity;
  this.setReviews = (reviews) => this.reviews = reviews;
  this.getReviews = () => this.reviews;
  this.setImages = (images) => this.images = images;
  this.getImages = () => this.images;

  // Function witch returns item of array reviews(single object review)  
  Review = (ID, author, comment, date, rating) => {
    return {
      ID, author, comment,
      date: new Date(date),
      //object rating with it's properties
      rating: {
        service: rating.service,
        price: rating.value,
        value: rating.value,
        quality: rating.quality
      }
    };
  }

  //Methods for modification of Product properties

  this.getReviewByID = (ID) => {
    for (let review of reviews) {
      if (review.ID == ID) return review;
    }
  }

  this.addReview = (ID, author, date, comment, rating) => {
    this.reviews.push(Review(ID, author, date, comment, rating))
    return this;
  }

  this.deleteReview = (ID) => {
    this.reviews = this.reviews.filter(review => review.ID !== ID);
  }

  this.getAverageRating = () => {
    let propertyCounter = 0;
    let ratingSum = 0;
    this.reviews.forEach(review => {
      for (let property in review.rating) {
        if (review.rating[property] !== undefined) {
          propertyCounter++;
          ratingSum += +review.rating[property];
        }
      }
    });
    return ratingSum / propertyCounter;
  }

  this.addSize = (size) => this.sizes.push(size);

  this.deleteSize = (size) => {
    for (let i = 0; i < this.sizes.length; i++) {
      if (this.sizes[i] == size) {
        this.sizes.splice(i, 1);
        return;
      }
    }

  }

  this.getImage = (numberOfImage) => {
    if (numberOfImage == undefined) {
      return this.images[0];
    } else return this.images[numberOfImage];
  }
}

function search(products, searchString) {
  let searchResult = [];
  products.forEach(product => {
    if (product instanceof Product) {
      if (product.name.startsWith(searchString) || product.description.includes(searchString)) searchResult.push(product);
    }
  });
  return searchResult;
}

function sortProducts(products, sortRule) {
  let sortedProducts;

  switch (sortRule) {
    case ("ID"): sortedProducts = products.sort((a, b) => a.ID - b.ID);
      break;
    case ("name"): sortedProducts = products.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
      break;
    case ("price"): sortedProducts = products.sort((a, b) => a.price - b.price);
      break;
    default: console.log("invalid rule for sort");
  }
  return sortedProducts;
}

// Tests 

console.log(new Product("1", "asd").addReview("1", "Andrew", "s", "1990 12 ",
  { service: "5", quality: "4", price: "100", value: "10" }).reviews[0].rating.quality);
let t_shot = new Product("1", "футболка", "для спорта");

let sportFood = new Product("2", "спортивное питание", "для футболиста");
t_shot.addReview("2", "Andrew", "s", "1990 12 ",
  { service: "5", quality: "4", price: "100", value: "10" });
console.log(t_shot.reviews[0].rating.service);

t_shot.addReview("1", "Sеrgey", "s", "1999 2",
  { service: "1", quality: "1", price: "10", value: "15" });
console.log(t_shot.getAverageRating());
t_shot.setBrand("adidas");
console.log(t_shot.getBrand());
t_shot.setSizes(["XL", "XXL", "L"]);
t_shot.addSize("S");
t_shot.deleteSize("XL");
t_shot.addSize("XL");
t_shot.addSize("XXL");
console.log(t_shot.getSizes());
t_shot.setImages(["image1", "image2", "image3"]);
console.log(t_shot.getImage());

console.log(search([t_shot, sportFood], "бол")[0].name);
let sortedProducts = sortProducts([t_shot, sportFood], "ID");
console.log(sortedProducts[0].name);
