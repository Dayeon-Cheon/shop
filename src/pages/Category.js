function Category(props) {
  let queryParameters = new URLSearchParams(window.location.search);
  let cat = queryParameters.get("cat");

  // category filter
  let filteredItem = props.item.filter(function (i) {
    return i.category === cat;
  });

  //   console.log(filteredItem);

  filteredItem.map(function (a, i) {
    return (
      <div>hi</div>
      //   <div className="col-md-4">
      //     <img
      //       className="item-img-main"
      //       src={process.env.PUBLIC_URL + "/img/" + props.picNum + ".jpg"}
      //     />
      //     <h4>{props.item.title}</h4>
      //     <p>£{props.item.price}</p>
      //   </div>
    );
  });
}

export default Category;
