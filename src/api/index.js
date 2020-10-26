import ajax from './axios';
let baseUrl='';

//顶部大区列表
export const reqHeadAreaData = () => ajax.get(baseUrl+`/mobile/jwApp/sjyh/area_all`)
// 顶部卡片内容
export const reqHeadCardData = (JWALL) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/top_data/${JWALL}`)
// 折线图筛选列表  全量接入 西三旗接入 嘉定接入
export const reqEchartBtnsData = (JWALL) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/filter_list/${JWALL}`)
 // 折线图
export const reqAllLineEchartsData = (area_code,time_code,mark_code) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/line_chart?area_code=${area_code}`+`&time_code=${time_code}`+`&mark_code=${mark_code}`)
//报警数量
export const reqAlertCountData = () => ajax.get(baseUrl+`/mobile/jwApp/sjyh/alert_count`)



// 二级页面

// 报警大分类
export const reqWarnigSwitchData = () => ajax.get(baseUrl+`/mobile/jwApp/sjyh/alert/top_category`)
// 报警位置分类
// export const reqLocationBtnsData = (F_WAPB) => ajax.get(baseUrl+`/mobile/fhApp/jw/alert_area_code/${F_WAPB}`)
// 报警地区统计                                              
export const reqAreasData = (F_MBANKP_FOVA) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/alert/region_statistics/${F_MBANKP_FOVA}`)
// 灰度报警地区统计                                             
export const reqGrayAreasData = (F_WAPB) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/alert/region_statistics/${F_WAPB}`)


// 报警内容列表 
                                                            
export const reqContentData = (F_MBANKP_FOVA,jd,mz) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/alert/info_list/${F_MBANKP_FOVA}/${mz}?loc_code=${jd}`)
export const reqGrayContentData = (F_WAPB,mz) => ajax.get(baseUrl+`/mobile/jwApp/sjyh/alert/info_list/${F_WAPB}/${mz}`)

// 变更信息
export const reqUpdataData = () => ajax.get(baseUrl+`/mobile/jwApp/sjyh/change/info_list`)
