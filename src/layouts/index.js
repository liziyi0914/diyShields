function BasicLayout(props) {
  return (
    <div style={{textAlign:'center'}}>
      <h1>Easy Shields</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
