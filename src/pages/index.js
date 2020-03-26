import react from 'react';
import {
	Button,
	Modal,
	Tabs,
	Input
} from 'antd';
import Shield from '../components/Shield';
import Bilibili from '../components/templates/Bilibili';

const { TabPane } = Tabs;
const { TextArea } = Input;

class IndexPage extends react.Component {

	smap = {};
	values = [];

	k = 0;

	constructor() {
		super();
		this.state = {
			shields: [],
			genModal: false,
			templateModal: false,
			markdown: [],
			discuz: [],
			links: []
		};
	}

	bindSubmit(id,ref) {
		this.smap[id] = ref;
	}

	callSubmit(id) {
		this.smap[id](v=>this.handleValues(id,v));
	}

	handleValues(id,values) {
		this.values.push(values);
		this.setState({
			markdown: [
				...this.state.markdown,
				`![img](${values})`
			],
			discuz: [
				...this.state.discuz,
				`[img]${values}[/img]`
			],
			links: [
				...this.state.links,
				values
			]
		});
	}

	callRemove(id) {
		delete(this.smap[id]);
		this.setState({shields:this.state.shields.filter(i=>i.id!=id)});
	}

	removeAll() {
		this.smap = {};
		this.setState({shields:[]});
	}

	submitAll() {
		this.values = [];
		this.state.shields.forEach(s=>this.callSubmit(s.id));
	}

	add() {
		this.k++;
		this.setState({shields:[...this.state.shields,{id:this.k}]});
	}

	generate() {
		this.setState({markdown:[],discuz:[],links:[]});
		this.submitAll();
		this.setState({
			genModal: true,
		});
	}

	closeGen() {
		this.setState({genModal:false});
	}

	closeTemplate() {
		this.setState({templateModal:false});
	}

	handleTemplate(shields) {
		this.closeTemplate();
		this.setState({
			shields: [
				...this.state.shields,
				...shields
			]
		});
	}

	render() {
		return (
		<div>
			<Button type='primary' onClick={()=>this.generate()} style={{margin:'1em'}}>生成</Button>
			<br/>
			<Button onClick={()=>this.add()}>新增</Button>
			<Button onClick={()=>this.setState({templateModal: true})} style={{margin:'0 1em'}}>模板</Button>
			<Button onClick={()=>this.removeAll()} danger>清除</Button>
			{this.state.shields.map(shield=>(<Shield submitRef={ref=>this.bindSubmit(shield.id,ref)} onRemove={()=>this.callRemove(shield.id)} {...shield}/>))}
			<Modal
				title='生成'
				visible={this.state.genModal}
				onCancel={()=>this.closeGen()}
				onOk={()=>this.closeGen()}
			>
				{this.state.links.map(link=>(<img src={link}/>))}
				<Tabs>
					<TabPane tab='Markdown' key='markdown'>
						<TextArea value={this.state.markdown.join('\n')} autoSize/>
					</TabPane>
					<TabPane tab='Discuz' key='discuz'>
			            <TextArea value={this.state.discuz.join('\n')} autoSize/>
					</TabPane>
				</Tabs>
			</Modal>
			<Modal
				title='模板'
				visible={this.state.templateModal}
				onCancel={()=>this.closeTemplate()}
				footer={null}
			>
				<Tabs>
					<TabPane tab='Bilibili' key='bilibili'>
						<Bilibili handleTemplate={sh=>this.handleTemplate(sh)}/>
					</TabPane>
				</Tabs>
			</Modal>
		</div>
		);
	}

}

export default IndexPage;
