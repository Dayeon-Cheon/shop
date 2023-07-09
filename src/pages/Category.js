function Category(props) {
  let queryParameters = new URLSearchParams(window.location.search);
  let cat = queryParameters.get("cat");

  // category filter
  let filteredItem = props.item.filter(function (i) {
    return i.category === cat;
  });

  console.log(filteredItem);

  filteredItem.map(function (a, i) {
    return (
      <div className="col-md-4">
        <div>{filteredItem[0].title}</div>
        <img
          className="item-img-main"
          src={process.env.PUBLIC_URL + "/img/" + filteredItem.id + ".jpg"}
        />
        <h4>{filteredItem.title}</h4>
        <p>£{filteredItem.price}</p>
      </div>
    );
  });
}

export default Category;
