import react from 'react';
import {
	Card,
	Row,
	Col,
	Form,
	Input,
	Button,
	Radio
} from 'antd';

class Shield extends react.Component {

	form = react.createRef();

	static defaultProps = {
		label: '',
		type: 'json',
		url: '',
		query: '',
		color: '',
		prefix: '',
		suffix: '',
		onRemove: ()=>{},
		submitRef: (ref)=>{}
	};

	constructor() {
		super();
	}

	submit(callback) {
		this.form.current.validateFields().then(v=>{
			var en = encodeURIComponent;
			var ps = (v.prefix==''?'':'&prefix='+en(v.prefix))+(v.suffix==''?'':'&suffix='+en(v.suffix));
			callback(`https://img.shields.io/badge/dynamic/${v.type}?url=${en(v.url)}&label=${en(v.label)}&query=${v.query}&color=${en(v.color)}${ps}`);
		});
	}

	render() {
		this.props.submitRef((cb)=>this.submit(cb));
		return (
		<Card style={{margin:'1em'}}>
			<Form
				labelCol={{span: 4}}
				wrapperCol={{span: 20}}
				ref={this.form}
				initialValues={this.props}
			>
				<Form.Item
					label='标签'
					name='label'
					rules={[
						{
							required: true,
							message: '请输入标签!',
						},
					]}
				><Input/></Form.Item>
				<Form.Item
					label='类型'
					name='type'
					rules={[
						{
							required: true,
							message: '请选择类型!',
						},
					]}
				>
					<Radio.Group>
						<Radio value='json'>json</Radio>
						<Radio value='xml'>xml</Radio>
						<Radio value='yaml'>yaml</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label='URL'
					name='url'
					rules={[
						{
							required: true,
							message: '请输入URL!',
						},
					]}
				><Input/></Form.Item>
				<Form.Item
					label='Query'
					name='query'
					rules={[
						{
							required: true,
							message: '请输入Query!',
						},
					]}
				><Input/></Form.Item>
				<Form.Item
					label='颜色'
					name='color'
					rules={[
						{
							required: true,
							message: '请输入颜色!',
						},
					]}
				><Input/></Form.Item>
				<Form.Item
					label='前缀'
					name='prefix'
				><Input/></Form.Item>
				<Form.Item
					label='后缀'
					name='suffix'
				><Input/></Form.Item>
				<Form.Item>
					<Button onClick={()=>this.props.onRemove()} type='primary' danger>X</Button>
				</Form.Item>
			</Form>
		</Card>
		);
	}

}

export default Shield;
