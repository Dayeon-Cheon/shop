import { useParams } from "react-router-dom";

// import styled from "styled-components";

function Category(props) {
  let { params } = useParams();
  const filtered = props.item.filter((item) => {
    return item.category === { params };
  });

  console.log(params);
  console.log(filtered);

  //　배열 해당 카테고리 아이템만 남기기
  return <div>hey</div>;
}

export default Category;
