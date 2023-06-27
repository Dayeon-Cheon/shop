function Category(props) {
  let queryParameters = new URLSearchParams(window.location.search);
  let cat = queryParameters.get("cat");

  // 카테고리 필터
  console.log(cat);

  let category = "";

  if (cat === "fresh-food") {
    category = "Fresh food";
  }
  if (cat === "food-cupboard") {
    category = "Food cupboard ";
  }
  if (cat === "drinks") {
    category = "Drinks";
  }

  console.log(category);

  //   console.log(props.item);

  // const filteredItem = props.item.filter((i) => i.catagory === cat);

  //   const filteredItem = props.item.filter((e) => {
  //     return e.category === cat;
  //   });

  let filteredItem = props.item.filter(function (i) {
    return i.category === cat;
  });

  console.log(filteredItem);
  return <div>{cat}</div>;
}

export default Category;
