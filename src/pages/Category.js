function Category(props) {
  let queryParameters = new URLSearchParams(window.location.search);
  let cat = queryParameters.get("cat");

  // category filter
  let filteredItem = props.item.filter(function (i) {
    return i.category === cat;
  });

  console.log(filteredItem);

  //   filteredItem.map(function (a, i) {
  return (
    <div className="col-md-4">
      <img
        className="item-img-main"
        src={process.env.PUBLIC_URL + "/img/" + filteredItem[0].id + ".jpg"}
      />
      <h4>{filteredItem[0].title}</h4>
      <p>£{filteredItem[0].price}</p>
    </div>
  );
  //   });
}

export default Category;
