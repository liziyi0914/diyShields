function BasicLayout(props) {
  return (
    <div style={{textAlign:'center'}}>
      <h1>diy Shields</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
