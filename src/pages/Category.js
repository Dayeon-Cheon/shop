function Category(props) {
  let queryParameters = new URLSearchParams(window.location.search);
  let cat = queryParameters.get("cat");

  // 카테고리 필터

  //   console.log();

  return <div>{cat}</div>;
}

export default Category;
