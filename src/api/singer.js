import {commonParams} from './config'
import axios from 'axios'

export function getSingerList(){
	const data = Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		hostUin:0,
		platfrom:'yqq'
	})
	return axios.get('/api/getSingerList',{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}