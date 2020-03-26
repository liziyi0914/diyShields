import react from 'react';
import {
	Form,
	Input,
	Button
} from 'antd';
import B from 'av2bv';

class BilibiliTemplate extends react.Component {

	static defaultProps = {
		handleTemplate: ()=>{}
	};

	onSubmit(id) {
		if(id.startsWith('BV')) {
			id = B.BV2av(id);
		} else if(id.startsWith('av')) {
			id = id.replace('av','');
		}
		var url = 'http://api.bilibili.com/archive_stat/stat?aid='+id;
		this.props.handleTemplate([
			{
				id: 'Bilibili播放量',
				label: '播放',
				type: 'json',
				url: url,
				query: '$.data.view',
				color: '#FA7298'
			},
			{
				id: 'Bilibili点赞数',
				label: '点赞',
				type: 'json',
				url: url,
				query: '$.data.like',
				color: '#FA7298'
			},
			{
				id: 'Bilibili硬币数',
				label: '硬币',
				type: 'json',
				url: url,
				query: '$.data.coin',
				color: '#FA7298'
			},
			{
				id: 'Bilibili收藏数',
				label: '收藏',
				type: 'json',
				url: url,
				query: '$.data.favorite',
				color: '#FA7298'
			}
		]);
	}

	render() {
		return (
		<Form
			onFinish={v=>this.onSubmit(v.id)}
		>
			<Form.Item
				label='av/BV号'
				name='id'
				rules={[
					{
						required: true,
						message: '请输入av/BV号!'
					}
				]}
			><Input/></Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>插入</Button>
			</Form.Item>
		</Form>
		);
	}

}

export default BilibiliTemplate;
