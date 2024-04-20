
let count = 0;

export const mockRequest = async () => {
  if (count >= 5) {
    return [];
  }
  await new Promise(resolve => setTimeout(resolve, 2000)); // Using setTimeout instead of sleep
  count++;
 
  return new Array(10).fill().map((_, index) => (
    {
        title: "groccesory " + index ,
        date: '20-04-2024',
        price: 100 + index,
        description: "dal, chaval, salt " + index
    }
  ));
};