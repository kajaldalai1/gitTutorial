// Using Promises
const getButter = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Husband got butter");
      resolve("butter");
    }, 2000);
  });
  
  const getColdDrinks = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Husband got cold drinks");
      resolve("cold drinks");
    }, 1000);
  });
  
  getButter
    .then((result) => {
      console.log(result);
      return getColdDrinks;
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  
  // Using async/await
  async function buyGroceries() {
    try {
      const butter = await getButter;
      console.log(butter);
      const coldDrinks = await getColdDrinks;
      console.log(coldDrinks);
    } catch (error) {
      console.error(error);
    }
  }
  
  buyGroceries();
  