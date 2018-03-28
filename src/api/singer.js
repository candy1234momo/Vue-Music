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
export function getSingerDetail(singerId){

	const data = Object.assign({}, commonParams,{
        hostUin:0,
        needNewCode:0,
        platform:'yqq',
        order:'listen',
        begin:0,
        num:80,
        songstatus:1,
        singermid:singerId
	})

	return axios.get('/api/getSingerDetail',{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}