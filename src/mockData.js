const mockProducts = [
    {
      id: 1,
      title: "Smartphone",
      description: "Un excelente smartphone con pantalla OLED.",
      price: 699,
      pictureUrl: "https://static.chollometro.com/threads/raw/nnOgy/1304571_1/re/150x150/qt/55/1304571_1.jpg",
      category: "electronics",
    },
    {
      id: 2,
      title: "Laptop",
      description: "Laptop potente para trabajo y gaming.",
      price: 1299,
      pictureUrl: "https://ramtvcenter.com/wp-content/uploads/2024/08/MSI-Thin-15-Intel-Core-i7-12650H-40CM-FHD-144Hz-Gaming-Laptop-150x150.jpg",
      category: "electronics",
    },
    {
      id: 3,
      title: "Camisa",
      description: "Camisa de lino excelente para el verano.",
      price: 100,
      pictureUrl: "https://huapi.com.ar/wp-content/uploads/00094009390110_1-150x150.jpg",
      category: "clothing",
    },
  ];
  
  export const fetchProducts = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 2000);
    });
  
  export const fetchSingleProduct = (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts.find((product) => product.id === parseInt(id)));
      }, 2000);
    });
  